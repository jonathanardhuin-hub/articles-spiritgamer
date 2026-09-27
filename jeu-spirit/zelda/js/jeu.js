// Le moteur : écrans en tuiles qui glissent comme dans Zelda, Spirit, monstres, dialogues.
'use strict';

(() => {
  const T = SG.T, W = SG.W, H = SG.H, B = SG.BANDE;
  const Art = SG.Art;
  const DIR = { haut: [0, -1], bas: [0, 1], gauche: [-1, 0], droite: [1, 0] };
  const FRONT = new Set(['p', '~', 'E', 'N']);          // tuiles qui ne sont pas de l'herbe

  const J = SG.Jeu = {
    ecran: null, ctx: null, cv: null, cvx: null, S: 1, dpr: 1,
    t: 0, zone: 'plaine', ex: 1, ey: 1,
    tuiles: {}, ennemis: [], tirs: [], effets: [], butins: [],
    dlg: null, trans: null, fondu: null, pause: false, brandit: null, deja: {},

    // ------------------------------------------------------------ démarrage
    init() {
      this.cv = document.getElementById('jeu');
      this.cvx = this.cv.getContext('2d');
      this.ecran = document.createElement('canvas');
      this.ecran.width = W; this.ecran.height = SG.HT;
      this.ctx = this.ecran.getContext('2d');
      this.ctx.imageSmoothingEnabled = false;
      if ('ontouchstart' in window || navigator.maxTouchPoints > 0) document.body.classList.add('tactile');
      SG.Commandes.init(this.cv);
      window.addEventListener('resize', () => this.taille());
      this.taille();
      // copie modifiable de la carte (buissons coupés…)
      for (const k in SG.CARTE.plaine.ecrans) this.tuiles['plaine:' + k] = SG.CARTE.plaine.ecrans[k].tuiles.map((l) => l.split(''));
      this.tuiles.grotte = SG.CARTE.grotte.tuiles.map((l) => l.split(''));
      this.sp = { x: 9 * T, y: 6 * T + 12, dir: 'bas', pas: 0, attaque: 0, invu: 0, recul: null, vie: 6, vieMax: 6, pixels: 0, ampli: false };
      this.entrer('plaine', 1, 1);
      this.dire(SG.TEXTES.arrivee);
      let avant = performance.now(), reste = 0;
      const boucle = (m) => {
        reste = Math.min(reste + (m - avant), 100); avant = m;
        while (reste >= 1000 / 60) { this.maj(); reste -= 1000 / 60; }
        this.dessiner();
        requestAnimationFrame(boucle);
      };
      requestAnimationFrame(boucle);
    },

    taille() {
      const w = window.innerWidth, h = window.innerHeight;
      let s = Math.min(w / W, h / SG.HT);
      if (s >= 2) s = Math.floor(s);
      this.S = s; this.dpr = window.devicePixelRatio || 1;
      this.cv.style.width = Math.round(W * s) + 'px';
      this.cv.style.height = Math.round(SG.HT * s) + 'px';
      this.cv.width = Math.round(W * s * this.dpr);
      this.cv.height = Math.round(SG.HT * s * this.dpr);
    },

    // ------------------------------------------------------------ carte
    grille(zone, ex, ey) { return zone === 'grotte' ? this.tuiles.grotte : this.tuiles[`plaine:${ex},${ey}`]; },
    lire(x, y, zone = this.zone, ex = this.ex, ey = this.ey) {
      if (zone === 'plaine') {
        // les voisins d'un bord se lisent sur l'écran d'à côté, pour que les bords se raccordent
        if (x < 0) { ex--; x += 16; } else if (x > 15) { ex++; x -= 16; }
        if (y < 0) { ey--; y += 11; } else if (y > 10) { ey++; y -= 11; }
      }
      const g = this.grille(zone, ex, ey);
      if (!g || y < 0 || y > 10 || x < 0 || x > 15) return null;
      return g[y][x];
    },
    solide(px, py, pourTir) {
      const tx = Math.floor(px / T), ty = Math.floor(py / T);
      if (tx < 0 || ty < 0 || tx > 15 || ty > 10) return false;
      const c = this.grille(this.zone, this.ex, this.ey)[ty][tx];
      if (pourTir) return c !== '~' && SG.SOLIDES.has(c);
      return SG.SOLIDES.has(c);
    },
    boiteLibre(b, pourTir) {
      for (const [x, y] of [[b.x, b.y], [b.x + b.w - 0.01, b.y], [b.x, b.y + b.h - 0.01], [b.x + b.w - 0.01, b.y + b.h - 0.01], [b.x + b.w / 2, b.y], [b.x + b.w / 2, b.y + b.h - 0.01]])
        if (this.solide(x, y, pourTir)) return false;
      return true;
    },

    entrer(zone, ex, ey) {
      this.zone = zone; this.ex = ex; this.ey = ey;
      this.ennemis = []; this.tirs = []; this.butins = []; this.effets = [];
      if (zone === 'plaine') {
        for (const [type, tx, ty] of SG.CARTE.plaine.ecrans[`${ex},${ey}`].monstres) this.ennemis.push(new Crache(tx * T + 8, ty * T + 14));
        SG.Son.jouerMusique('plaine');
      } else SG.Son.jouerMusique('grotte');
    },

    // ------------------------------------------------------------ dialogues
    dire(lignes, apres) {
      if (typeof lignes === 'string') lignes = [[null, lignes]];
      this.dlg = { lignes: lignes.slice(), i: 0, n: 0, apres };
    },

    // ------------------------------------------------------------ mise à jour
    maj() {
      const C = SG.Commandes;
      C.maj();
      this.t++;
      if (this.fondu) { this.fondu.t++; if (this.fondu.t === 20) this.fondu.milieu(); if (this.fondu.t >= 40) this.fondu = null; return; }
      if (this.trans) { this.majTransition(); return; }
      if (C.appuis.menu) this.pause = !this.pause;
      if (this.pause) return;
      if (this.brandit) { if (--this.brandit.t <= 0) { const f = this.brandit.fin; this.brandit = null; f(); } return; }
      if (this.dlg) { this.majDialogue(); return; }
      this.majSpirit();
      for (const e of this.ennemis) e.maj(this);
      this.ennemis = this.ennemis.filter((e) => !e.mort);
      for (const p of this.tirs) p.maj(this);
      this.tirs = this.tirs.filter((p) => !p.fini);
      for (const f of this.effets) f.t++;
      this.effets = this.effets.filter((f) => f.t < f.duree);
      this.majButins();
    },

    majDialogue() {
      const d = this.dlg, C = SG.Commandes, texte = d.lignes[d.i][1];
      if (d.n < texte.length) {
        d.n += 1;
        if (d.n % 3 === 0) SG.Son.effet('texte');
        if (C.appuis.A || C.appuis.B) d.n = texte.length;
        return;
      }
      if (C.appuis.A || C.appuis.B) {
        SG.Son.effet('choix');
        d.i++; d.n = 0;
        if (d.i >= d.lignes.length) { this.dlg = null; if (d.apres) d.apres(); }
      }
    },

    majSpirit() {
      const sp = this.sp, C = SG.Commandes;
      if (sp.invu > 0) sp.invu--;
      if (sp.recul) {
        this.bouger(sp, sp.recul.x, sp.recul.y);
        if (--sp.recul.t <= 0) sp.recul = null;
        return;
      }
      if (sp.attaque > 0) {
        sp.attaque--;
        if (sp.attaque >= 6 && sp.attaque <= 14) this.frapper(sp);
        return;
      }
      // A : lire, parler, ou attaquer
      if (C.appuis.A) {
        if (this.interagir()) return;
        if (sp.ampli) {
          sp.attaque = 18;
          SG.Son.effet('onde');
          this.effets.push({ type: 'onde', x: sp.x, y: sp.y, dir: sp.dir, t: 0, duree: 12 });
          if (sp.vie >= sp.vieMax) { this.tirs.push(new OndeLoin(sp.x, sp.y - 8, sp.dir)); SG.Son.effet('onde-loin'); }
          return;
        }
      }
      const a = C.axe();
      if (a.x || a.y) {
        if (Math.abs(a.x) > Math.abs(a.y) + 0.01) sp.dir = a.x < 0 ? 'gauche' : 'droite';
        else if (Math.abs(a.y) > 0.01) sp.dir = a.y < 0 ? 'haut' : 'bas';
        this.bouger(sp, a.x * 1.25, a.y * 1.25, true);
        sp.pas++;
      } else sp.pas = 0;
      this.sorties();
    },

    pieds(e, x = e.x, y = e.y) { return { x: x - 5, y: y - 6, w: 10, h: 6 }; },

    bouger(e, dx, dy, aide) {
      const essai = (nx, ny) => this.boiteLibre(this.pieds(e, nx, ny));
      if (dx && essai(e.x + dx, e.y)) e.x += dx;
      else if (dx && aide && !dy) this.glisser(e, 'y', (o) => essai(e.x + dx, e.y + o));
      if (dy && essai(e.x, e.y + dy)) e.y += dy;
      else if (dy && aide && !dx) this.glisser(e, 'x', (o) => essai(e.x + o, e.y + dy));
      if (this.zone === 'grotte') { e.x = SG.clamp(e.x, 6, W - 6); e.y = SG.clamp(e.y, 8, H); }
    },

    // comme dans Zelda : bloqué de peu contre un coin, Spirit glisse vers le passage
    glisser(e, axe, libre) {
      for (let d = 1; d <= 8; d++) for (const s of [-1, 1]) if (libre(s * d)) { e[axe] += s; return; }
    },

    // bords d'écran, entrées de grotte et du Terrier
    sorties() {
      const sp = this.sp, tx = Math.floor(sp.x / T), ty = Math.floor((sp.y - 3) / T);
      const c = tx >= 0 && tx < 16 && ty >= 0 && ty < 11 ? this.grille(this.zone, this.ex, this.ey)[ty][tx] : null;
      if (c === 'E') {
        this.fondu = { t: 0, milieu: () => { this.entrer('grotte'); sp.x = 8 * T; sp.y = 8 * T + 12; sp.dir = 'haut'; } };
        return;
      }
      if (c === 'X') {
        this.fondu = { t: 0, milieu: () => { this.entrer('plaine', 1, 0); sp.x = 5 * T; sp.y = 4 * T + 12; sp.dir = 'bas'; } };
        return;
      }
      if (c === 'N') { sp.y = 4 * T + 10; sp.dir = 'bas'; this.dire(SG.TEXTES.terrier); return; }
      if (this.zone !== 'plaine') return;
      let vx = 0, vy = 0;
      if (sp.x < 0) vx = -1; else if (sp.x > W) vx = 1; else if (sp.y - 6 < 0) vy = -1; else if (sp.y > H) vy = 1;
      if (!vx && !vy) return;
      const nx = this.ex + vx, ny = this.ey + vy;
      if (!SG.CARTE.plaine.ecrans[`${nx},${ny}`]) { sp.x = SG.clamp(sp.x, 0, W); sp.y = SG.clamp(sp.y, 6, H); return; }
      this.trans = { vx, vy, t: 0, duree: vx ? 64 : 44, ancien: { ex: this.ex, ey: this.ey }, ennemis: this.ennemis };
      this.entrer('plaine', nx, ny);
    },

    majTransition() {
      const tr = this.trans, sp = this.sp;
      tr.t++;
      // Spirit avance avec le décor : il finit juste à l'intérieur du nouvel écran
      const fin = { x: tr.vx < 0 ? W - 8 : tr.vx > 0 ? 8 : sp.x, y: tr.vy < 0 ? H - 2 : tr.vy > 0 ? 16 : sp.y };
      if (!tr.depart) tr.depart = { x: sp.x - tr.vx * W, y: sp.y - tr.vy * H };
      const k = tr.t / tr.duree;
      sp.x = tr.depart.x + (fin.x - tr.depart.x) * k;
      sp.y = tr.depart.y + (fin.y - tr.depart.y) * k;
      sp.pas++;
      if (tr.t >= tr.duree) this.trans = null;
    },

    // l'onde touche ce qui est devant Spirit
    zoneOnde(sp) {
      return {
        bas: { x: sp.x - 8, y: sp.y - 2, w: 16, h: 16 }, haut: { x: sp.x - 8, y: sp.y - 30, w: 16, h: 16 },
        droite: { x: sp.x + 4, y: sp.y - 16, w: 16, h: 14 }, gauche: { x: sp.x - 20, y: sp.y - 16, w: 16, h: 14 },
      }[sp.dir];
    },
    frapper(sp) {
      const z = this.zoneOnde(sp);
      this.couper(z);
      for (const e of this.ennemis) if (SG.boitesSeTouchent(z, e.boite())) e.blesser(this, 1, sp.dir);
      for (const p of this.tirs) if (p.ennemi && SG.boitesSeTouchent(z, p.boite())) { p.fini = true; this.effets.push({ type: 'eclat', x: p.x, y: p.y, t: 0, duree: 10 }); SG.Son.effet('touche'); }
    },
    couper(z) {
      const g = this.grille(this.zone, this.ex, this.ey);
      for (let ty = Math.floor(z.y / T); ty <= Math.floor((z.y + z.h - 1) / T); ty++)
        for (let tx = Math.floor(z.x / T); tx <= Math.floor((z.x + z.w - 1) / T); tx++) {
          if (ty < 0 || tx < 0 || ty > 10 || tx > 15) continue;
          const c = g[ty][tx];
          // la tuile doit être bien dans la zone (au moins la moitié)
          const r = { x: tx * T + 4, y: ty * T + 4, w: 8, h: 8 };
          if (!SG.boitesSeTouchent(z, r)) continue;
          if (c === 'b' || c === 'h') {
            g[ty][tx] = c === 'b' ? 'c' : 'k';
            SG.Son.effet('feuilles');
            for (let i = 0; i < 6; i++) this.effets.push({ type: 'feuille', x: tx * T + 8, y: ty * T + 8, vx: SG.hasard(-1.2, 1.2), vy: SG.hasard(-2, -0.4), t: 0, duree: 26 });
            this.lacherButin(tx * T + 8, ty * T + 12, c === 'b' ? 0.3 : 0.18);
          }
        }
    },

    lacherButin(x, y, chance) {
      if (Math.random() > chance) return;
      const r = Math.random();
      const type = r < 0.4 && this.sp.vie < this.sp.vieMax ? 'coeur' : r < 0.9 ? 'pixel-bleu' : 'pixel-rose';
      this.butins.push({ type, x, y, t: 0 });
    },
    majButins() {
      const sp = this.sp, b = { x: sp.x - 6, y: sp.y - 14, w: 12, h: 14 };
      for (const o of this.butins) {
        o.t++;
        if (SG.boitesSeTouchent(b, { x: o.x - 4, y: o.y - 6, w: 8, h: 7 })) {
          o.pris = true;
          if (o.type === 'coeur') { sp.vie = Math.min(sp.vieMax, sp.vie + 2); SG.Son.effet('coeur'); }
          else { sp.pixels = Math.min(999, sp.pixels + (o.type === 'pixel-rose' ? 5 : 1)); SG.Son.effet('pixel'); }
        }
      }
      this.butins = this.butins.filter((o) => !o.pris && o.t < 600);
    },

    blesserSpirit(degats, depuisX, depuisY) {
      const sp = this.sp;
      if (sp.invu > 0) return;
      sp.vie -= degats; sp.invu = 60;
      SG.Son.effet('aie');
      const dx = sp.x - depuisX, dy = sp.y - depuisY, d = Math.hypot(dx, dy) || 1;
      sp.recul = { x: dx / d * 2.5, y: dy / d * 2.5, t: 10 };
      sp.attaque = 0;
      if (!sp.ampli && !this.deja.sansAmpli) { this.deja.sansAmpli = true; this.dire(SG.TEXTES.sansAmpli); }
      if (sp.vie <= 0) {
        sp.recul = null;
        this.dire(SG.TEXTES.fin, () => {
          this.fondu = { t: 0, milieu: () => { sp.vie = sp.vieMax; sp.x = 9 * T; sp.y = 6 * T + 12; sp.dir = 'bas'; this.entrer('plaine', 1, 1); } };
        });
      }
    },

    // lire un panneau, parler à l'ermite
    interagir() {
      const sp = this.sp, [dx, dy] = DIR[sp.dir];
      const px = sp.x + dx * 10, py = sp.y - 3 + dy * 10;
      // on regarde la case devant Spirit, et ses deux voisines si Spirit est à cheval
      let tx, ty, c = null;
      for (const o of [0, -6, 6]) {
        tx = Math.floor((px + (dy ? o : 0)) / T); ty = Math.floor((py + (dx ? o : 0)) / T);
        if (tx < 0 || ty < 0 || tx > 15 || ty > 10) continue;
        c = this.grille(this.zone, this.ex, this.ey)[ty][tx];
        if (c === 'P' || c === 'H') break;
      }
      if (c === 'P') {
        const pan = SG.CARTE.plaine.ecrans[`${this.ex},${this.ey}`].panneaux || {};
        this.dire(pan[`${tx},${ty}`] || '...');
        return true;
      }
      if (c === 'H') { this.parlerErmite(); return true; }
      return false;
    },

    parlerErmite() {
      const sp = this.sp;
      if (!sp.ampli) {
        this.dire(SG.TEXTES.ermiteDon, () => {
          sp.ampli = true; sp.dir = 'bas';
          SG.Son.effet('objet');
          this.brandit = { objet: 'ampli', t: 110, fin: () => this.dire(SG.TEXTES.ampli, () => this.dire(SG.TEXTES.ermiteApres)) };
        });
      } else {
        sp.vie = sp.vieMax;
        this.dire(SG.TEXTES.ermiteRevoir.concat(SG.TEXTES.soin));
        SG.Son.effet('coeur');
      }
    },

    // ------------------------------------------------------------ dessin
    dessiner() {
      const c = this.ctx;
      c.fillStyle = '#000'; c.fillRect(0, 0, W, SG.HT);
      c.save();
      c.translate(0, B);
      c.beginPath(); c.rect(0, 0, W, H); c.clip();
      if (this.trans) {
        const tr = this.trans, k = tr.t / tr.duree;
        const ox = -tr.vx * W * k, oy = -tr.vy * H * k;
        c.save(); c.translate(Math.round(ox), Math.round(oy)); this.dessinerEcran(c, 'plaine', tr.ancien.ex, tr.ancien.ey); c.restore();
        c.save(); c.translate(Math.round(ox + tr.vx * W), Math.round(oy + tr.vy * H)); this.dessinerEcran(c, 'plaine', this.ex, this.ey); this.dessinerSpirit(c); c.restore();
      } else {
        this.dessinerEcran(c, this.zone, this.ex, this.ey);
        this.dessinerEntites(c);
      }
      c.restore();
      this.dessinerBande(c);
      if (this.dlg) this.dessinerCadreDialogue(c);
      if (this.fondu) { c.fillStyle = `rgba(0,0,0,${1 - Math.abs(this.fondu.t - 20) / 20})`; c.fillRect(0, 0, W, SG.HT); }
      if (this.pause) { c.fillStyle = 'rgba(5,10,25,0.7)'; c.fillRect(0, B, W, H); }
      // mise à l'échelle, pixels nets
      const x = this.cvx;
      x.imageSmoothingEnabled = false;
      x.drawImage(this.ecran, 0, 0, this.cv.width, this.cv.height);
      this.dessinerTextes(x);
    },

    dessinerEcran(c, zone, ex, ey) {
      const lire = (x, y) => this.lire(x, y, zone, ex, ey);
      const g = this.grille(zone, ex, ey);
      const eauF = Art.tuiles.eau[Math.floor(this.t / 40) % 2];
      for (let y = 0; y < 11; y++) for (let x = 0; x < 16; x++) {
        const ch = g[y][x], px = x * T, py = y * T;
        if (zone === 'grotte') {
          if (ch === 'W') {
            const dessous = y < 10 ? g[y + 1][x] : 'W';
            c.drawImage(dessous !== 'W' ? Art.tuiles['mur-face'] : Art.tuiles.mur, px, py);
          } else {
            c.drawImage(Art.tuiles['sol-grotte'], px, py);
            if (ch === 'X') { c.fillStyle = y === 10 ? '#000' : 'rgba(0,0,0,0.5)'; c.fillRect(px, py, T, T); }
          }
          continue;
        }
        if (ch === '~') {
          c.drawImage(eauF, px, py);
          this.bords(c, lire, x, y, (v) => v === '~' || v === null, 'eau');
        } else if (ch === 'p' || ch === 'E' || ch === 'N') {
          c.drawImage(Art.tuiles.terre, px, py);
          this.bords(c, lire, x, y, (v) => v === null || FRONT.has(v), 'terre');
        } else {
          c.drawImage(ch === 'f' ? Art.tuiles.fleurs : (x * 7 + y * 13) % 5 === 0 ? Art.tuiles.herbe2 : Art.tuiles.herbe, px, py);
          const deco = { b: 'buisson', c: 'souche', h: 'hautes', k: 'coupees', r: 'rocher', P: 'panneau' }[ch];
          if (deco) c.drawImage(Art.tuiles[deco], px, py);
        }
      }
      // grands éléments (2 × 2 tuiles)
      for (let y = 0; y < 11; y++) for (let x = 0; x < 16; x++) {
        const ch = g[y][x];
        if (ch === 'A') c.drawImage(Art.tuiles.arbre, x * T, y * T);
        if (ch === 'G') c.drawImage(Art.tuiles.grotte, x * T, y * T);
        if (ch === 'M') c.drawImage(Art.tuiles.terrier, x * T, y * T);
        if (ch === 'F') c.drawImage(Art.spr['feu-' + (Math.floor(this.t / 8) % 3)], x * T, y * T);
      }
    },

    // bords d'herbe autour du chemin ou de l'eau
    bords(c, lire, x, y, meme, fond) {
      const px = x * T, py = y * T;
      const h = !meme(lire(x, y - 1)), b = !meme(lire(x, y + 1)), g = !meme(lire(x - 1, y)), d = !meme(lire(x + 1, y));
      if (h) c.drawImage(Art.tuiles[`bord-${fond}-h`], px, py);
      if (b) c.drawImage(Art.tuiles[`bord-${fond}-b`], px, py);
      if (g) c.drawImage(Art.tuiles[`bord-${fond}-g`], px, py);
      if (d) c.drawImage(Art.tuiles[`bord-${fond}-d`], px, py);
      if (!h && !g && !meme(lire(x - 1, y - 1))) c.drawImage(Art.tuiles[`coin-${fond}-hg`], px, py);
      if (!h && !d && !meme(lire(x + 1, y - 1))) c.drawImage(Art.tuiles[`coin-${fond}-hd`], px, py);
      if (!b && !g && !meme(lire(x - 1, y + 1))) c.drawImage(Art.tuiles[`coin-${fond}-bg`], px, py);
      if (!b && !d && !meme(lire(x + 1, y + 1))) c.drawImage(Art.tuiles[`coin-${fond}-bd`], px, py);
    },

    dessinerEntites(c) {
      const liste = [];
      for (const o of this.butins) liste.push({ y: o.y, d: () => { if (o.t > 420 && Math.floor(o.t / 4) % 2) return; c.drawImage(Art.spr[o.type], Math.round(o.x - Art.spr[o.type].width / 2), Math.round(o.y - 7 - Math.max(0, 6 - o.t) )); } });
      for (const e of this.ennemis) liste.push({ y: e.y, d: () => e.dessiner(c, this) });
      if (this.zone === 'grotte') {
        const g = this.tuiles.grotte;
        for (let y = 0; y < 11; y++) for (let x = 0; x < 16; x++) if (g[y][x] === 'H') liste.push({ y: y * T + 15, d: () => c.drawImage(Art.spr.ermite, x * T - 1, y * T - 8) });
      }
      liste.push({ y: this.sp.y, d: () => this.dessinerSpirit(c) });
      liste.sort((a, b) => a.y - b.y).forEach((o) => o.d());
      for (const p of this.tirs) p.dessiner(c, this);
      for (const f of this.effets) this.dessinerEffet(c, f);
    },

    dessinerSpirit(c) {
      const sp = this.sp;
      if (sp.invu > 0 && Math.floor(sp.invu / 3) % 2) return;
      let nom;
      if (this.brandit) nom = 'spirit-bas0';
      else if (sp.attaque > 0) nom = `spirit-${sp.dir}A`;
      else if (sp.pas) nom = `spirit-${sp.dir}${1 + (Math.floor(sp.pas / 8) % 2)}`;
      else nom = `spirit-${sp.dir}0`;
      const im = Art.spr[nom] || Art.spr['spirit-bas0'];
      c.fillStyle = 'rgba(0,0,0,0.22)'; c.fillRect(Math.round(sp.x - 5), Math.round(sp.y - 1), 10, 2);
      c.drawImage(im, Math.round(sp.x - 8), Math.round(sp.y - im.height));
      if (this.brandit) c.drawImage(Art.spr[this.brandit.objet], Math.round(sp.x - 6), Math.round(sp.y - im.height - 12));
    },

    dessinerEffet(c, f) {
      if (f.type === 'onde') {
        const sp = this.sp, im = Art.spr['onde-' + Math.min(2, Math.floor(f.t / 4))];
        const z = this.zoneOnde({ x: sp.x, y: sp.y, dir: f.dir });
        c.save();
        c.translate(Math.round(z.x + z.w / 2), Math.round(z.y + z.h / 2));
        c.rotate({ droite: 0, bas: Math.PI / 2, gauche: Math.PI, haut: -Math.PI / 2 }[f.dir]);
        c.drawImage(im, -8, -8);
        c.restore();
      } else if (f.type === 'feuille') {
        c.drawImage(Art.spr.feuille, Math.round(f.x + f.vx * f.t), Math.round(f.y + f.vy * f.t + 0.08 * f.t * f.t));
      } else if (f.type === 'fumee') {
        c.drawImage(Art.spr['fumee-' + Math.min(2, Math.floor(f.t / 6))], Math.round(f.x - 8), Math.round(f.y - 12));
      } else if (f.type === 'eclat') {
        c.fillStyle = '#ffffff';
        for (let i = 0; i < 4; i++) { const a = i * Math.PI / 2 + 0.7; c.fillRect(Math.round(f.x + Math.cos(a) * f.t), Math.round(f.y + Math.sin(a) * f.t), 1, 1); }
      }
    },

    // bandeau du haut : cœurs, Pixels, objet de A
    dessinerBande(c) {
      c.fillStyle = '#0b1226'; c.fillRect(0, 0, W, B);
      c.fillStyle = '#1d2a50'; c.fillRect(0, B - 1, W, 1);
      const sp = this.sp;
      for (let i = 0; i < sp.vieMax / 2; i++) {
        const reste = sp.vie - i * 2;
        c.drawImage(Art.spr[reste >= 2 ? 'coeur' : reste === 1 ? 'coeur-demi' : 'coeur-vide'], 8 + i * 9, 12);
      }
      c.drawImage(Art.spr['pixel-bleu'], 100, 11);
      // case de l'objet A
      c.fillStyle = '#1d2a50'; c.fillRect(220, 3, 18, 18);
      c.fillStyle = '#0b1226'; c.fillRect(221, 4, 16, 16);
      if (sp.ampli) c.drawImage(Art.spr.ampli, 223, 7);
    },

    dessinerCadreDialogue(c) {
      const y = this.sp.y > H * 0.6 ? B + 6 : SG.HT - 58;
      this.dlgY = y;
      c.fillStyle = '#ffffff'; c.fillRect(8, y, W - 16, 52);
      c.fillStyle = '#10204a'; c.fillRect(9, y + 1, W - 18, 50);
      c.fillStyle = '#35d6ff'; c.fillRect(10, y + 2, W - 20, 1);
    },

    // textes dessinés à pleine résolution, par-dessus l'image agrandie
    dessinerTextes(x) {
      const k = this.S * this.dpr;
      const police = (px) => `${Math.round(px * k)}px "Pixelify Sans", "Courier New", monospace`;
      x.textBaseline = 'top';
      x.fillStyle = '#ffffff';
      x.font = police(9);
      x.fillText('×' + String(this.sp.pixels).padStart(3, '0'), 108 * k, 10 * k);
      x.fillStyle = '#9fb0cb'; x.font = police(7);
      x.fillText('A', 212 * k, 8 * k);
      if (this.pause) { x.fillStyle = '#fff'; x.font = police(14); x.textAlign = 'center'; x.fillText('Pause', W / 2 * k, (B + H / 2 - 7) * k); x.textAlign = 'left'; }
      if (!this.dlg) return;
      const d = this.dlg, [qui, texte] = d.lignes[d.i], y = this.dlgY;
      let ty = y + 6;
      if (qui) { x.fillStyle = '#35d6ff'; x.font = police(8); x.fillText(qui, 16 * k, ty * k); ty += 10; }
      x.fillStyle = '#ffffff'; x.font = police(8.5);
      const lignes = [];
      // on coupe d'après le texte complet pour que les mots ne sautent pas de ligne en s'écrivant
      const tous = texte.split(' ');
      let lg = [], cur = '';
      for (const m of tous) { const e = cur ? cur + ' ' + m : m; if (x.measureText(e).width > (W - 34) * k) { lg.push(cur); cur = m; } else cur = e; }
      lg.push(cur);
      let restant = d.n;
      for (const ligne of lg) { if (restant <= 0) break; lignes.push(ligne.slice(0, restant)); restant -= ligne.length + 1; }
      const max = qui ? 3 : 4;
      lignes.slice(0, max).forEach((t, i) => x.fillText(t, 16 * k, (ty + i * 10) * k));
      if (d.n >= texte.length && Math.floor(this.t / 20) % 2) { x.fillStyle = '#35d6ff'; x.fillText('▼', (W - 22) * k, (y + 41) * k); }
    },
  };

  // ---------------------------------------------------------------- monstres
  class Crache {
    constructor(x, y) { Object.assign(this, { x, y, dir: 'bas', t: 30 + Math.random() * 60, etat: 'pause', vie: 2, recul: null, flash: 0, mort: false }); }
    boite() { return { x: this.x - 7, y: this.y - 13, w: 14, h: 13 }; }
    pieds(x = this.x, y = this.y) { return { x: x - 6, y: y - 7, w: 12, h: 7 }; }
    libre(J, x, y) { const b = this.pieds(x, y); return b.x >= 0 && b.y >= 0 && b.x + b.w <= W && b.y + b.h <= H && J.boiteLibre(b); }
    maj(J) {
      if (this.flash) this.flash--;
      if (this.recul) {
        const nx = this.x + this.recul.x, ny = this.y + this.recul.y;
        if (this.libre(J, nx, ny)) { this.x = nx; this.y = ny; }
        if (--this.recul.t <= 0) this.recul = null;
      } else if (this.etat === 'marche') {
        const [dx, dy] = DIR[this.dir];
        if (this.libre(J, this.x + dx * 0.6, this.y + dy * 0.6)) { this.x += dx * 0.6; this.y += dy * 0.6; } else this.t = 0;
        if (--this.t <= 0) { this.etat = 'pause'; this.t = 20 + Math.random() * 40; this.tir = Math.random() < 0.5; }
      } else {
        if (this.tir && this.t === 10) { J.tirs.push(new Pierre(this.x, this.y - 6, this.dir)); SG.Son.effet('crache'); }
        if (--this.t <= 0) {
          this.etat = 'marche'; this.t = 30 + Math.random() * 50;
          // se tourne de préférence vers Spirit
          const sp = J.sp;
          this.dir = Math.random() < 0.5 ? (Math.abs(sp.x - this.x) > Math.abs(sp.y - this.y) ? (sp.x < this.x ? 'gauche' : 'droite') : (sp.y < this.y ? 'haut' : 'bas')) : SG.choisir(['haut', 'bas', 'gauche', 'droite']);
        }
      }
      const sp = J.sp;
      if (sp.invu === 0 && SG.boitesSeTouchent(this.boite(), { x: sp.x - 5, y: sp.y - 13, w: 10, h: 12 })) J.blesserSpirit(1, this.x, this.y);
    }
    blesser(J, n, dir) {
      if (this.flash) return;
      this.vie -= n; this.flash = 16;
      const [dx, dy] = DIR[dir];
      this.recul = { x: dx * 2.4, y: dy * 2.4, t: 8 };
      SG.Son.effet('touche');
      if (this.vie <= 0) {
        this.mort = true;
        SG.Son.effet('fumee');
        J.effets.push({ type: 'fumee', x: this.x, y: this.y, t: 0, duree: 18 });
        J.lacherButin(this.x, this.y, 0.6);
      }
    }
    dessiner(c, J) {
      const im = Art.spr['crache-' + (this.etat === 'marche' ? Math.floor(J.t / 10) % 2 : 0)];
      c.fillStyle = 'rgba(0,0,0,0.22)'; c.fillRect(Math.round(this.x - 6), Math.round(this.y - 1), 12, 2);
      if (this.flash && Math.floor(this.flash / 2) % 2) c.globalCompositeOperation = 'lighter';
      c.drawImage(im, Math.round(this.x - 8), Math.round(this.y - 15));
      c.globalCompositeOperation = 'source-over';
    }
  }

  class Pierre {
    constructor(x, y, dir) { const [dx, dy] = DIR[dir]; Object.assign(this, { x, y, vx: dx * 2, vy: dy * 2, ennemi: true, fini: false }); }
    boite() { return { x: this.x - 3, y: this.y - 3, w: 6, h: 6 }; }
    maj(J) {
      this.x += this.vx; this.y += this.vy;
      if (this.x < -8 || this.y < -8 || this.x > W + 8 || this.y > H + 8 || J.solide(this.x, this.y, true)) { this.fini = true; J.effets.push({ type: 'eclat', x: this.x, y: this.y, t: 0, duree: 10 }); return; }
      const sp = J.sp;
      if (SG.boitesSeTouchent(this.boite(), { x: sp.x - 5, y: sp.y - 14, w: 10, h: 14 })) {
        this.fini = true;
        J.blesserSpirit(1, this.x - this.vx * 4, this.y - this.vy * 4);
      }
    }
    dessiner(c) { c.drawImage(Art.spr.pierre, Math.round(this.x - 4), Math.round(this.y - 4)); }
  }

  // l'onde qui part au loin quand les cœurs sont pleins
  class OndeLoin {
    constructor(x, y, dir) { const [dx, dy] = DIR[dir]; Object.assign(this, { x: x + dx * 12, y: y + dy * 12, vx: dx * 3, vy: dy * 3, dir, t: 0, fini: false }); }
    boite() { return { x: this.x - 5, y: this.y - 5, w: 10, h: 10 }; }
    maj(J) {
      this.x += this.vx; this.y += this.vy; this.t++;
      if (this.t > 50 || this.x < -8 || this.y < -8 || this.x > W + 8 || this.y > H + 8 || J.solide(this.x, this.y, true)) { this.fini = true; return; }
      for (const e of J.ennemis) if (SG.boitesSeTouchent(this.boite(), e.boite())) { e.blesser(J, 1, this.dir); this.fini = true; return; }
    }
    dessiner(c, J) {
      c.save();
      c.translate(Math.round(this.x), Math.round(this.y));
      c.rotate({ droite: 0, bas: Math.PI / 2, gauche: Math.PI, haut: -Math.PI / 2 }[this.dir]);
      c.globalAlpha = 0.85;
      c.drawImage(Art.spr['onde-' + (Math.floor(J.t / 4) % 3)], -8, -8);
      c.restore();
    }
  }
})();

window.addEventListener('load', () => SG.Jeu.init());
