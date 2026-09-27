// Spirit et le Roi Clickbait : boucle de jeu, écrans, menus, dialogues, sauvegarde.
'use strict';

SG.Jeu = class {
  constructor(canevas) {
    this.canevas = canevas;
    this.ctx = canevas.getContext('2d');
    this.etat = 'chargement';
    this.chargement = 0;
    this.t = 0;
    this.effets = [];
    this.projectiles = [];
    this.monstres = [];
    this.butins = [];
    this.pnj = [];
    this.coupes = new Set();   // buissons et herbes coupés sur l'écran actuel
    this.fonds = {};           // sol pré-dessiné de chaque écran
    this.menuChoix = 0;
    this.redimensionner();
    window.addEventListener('resize', () => this.redimensionner());
  }

  // ------------------------------------------------------------ affichage net sur tous les écrans
  redimensionner() {
    const ratio = SG.W / SG.HT;
    let w = window.innerWidth, h = window.innerHeight;
    if (w / h > ratio) w = h * ratio; else h = w / ratio;
    this.canevas.style.width = w + 'px';
    this.canevas.style.height = h + 'px';
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.echelle = Math.min(2, (w * dpr) / SG.W);
    this.canevas.width = Math.round(SG.W * this.echelle);
    this.canevas.height = Math.round(SG.HT * this.echelle);
    this.fonds = {};
  }

  // ------------------------------------------------------------ sauvegarde
  static lireSauvegarde() {
    try {
      const s = localStorage.getItem('spirit-sauvegarde');
      if (!s) return null;
      const d = JSON.parse(s);
      // après une mise à jour du jeu, seul le donjon repart de zéro (le reste de la partie est gardé)
      if (d.version !== SG.VERSION) {
        if (d.d1 && d.d1.fini) d.vieMax = Math.max(12, d.vieMax - 4);   // le cœur d'or du boss sera regagné
        d.version = SG.VERSION; d.d1 = null; d.manette = false; d.objetB = null; d.source = 0; d.barriere = false;
        if (typeof d.ecran === 'string' && d.ecran.startsWith('d1:')) { d.ecran = '0,0'; d.x = 8.5 * SG.T; d.y = 3.6 * SG.T; }
        localStorage.setItem('spirit-sauvegarde', JSON.stringify(d));
      }
      return d;
    } catch (e) { return null; }
  }
  sauver() {
    if (!this.spirit) return;
    const donjon = this.estDonjon();
    const s = {
      mode: this.mode, vieMax: this.vieMax, pixels: this.pixels, ampli: this.ampli,
      fragments: this.fragments, secrets: [...this.secretsPris], ecran: this.ecran === 'grotte' ? SG.SORTIE_GROTTE.ecran : this.ecran,
      x: this.ecran === 'grotte' ? SG.SORTIE_GROTTE.x : this.spirit.x, y: this.ecran === 'grotte' ? SG.SORTIE_GROTTE.y : this.spirit.y,
      ermiteVu: this.ermiteVu, visites: [...(this.visites || [])],
      version: SG.VERSION, d1: this.d1 || null, manette: !!this.manette, objetB: this.objetB || null, source: this.source || 0, barriere: !!this.barriere,
      qg: this.qg || null, portail: !!this.porteLoge,
    };
    if (donjon) { s.ecran = 'd1:' + SG.DONJON1.entree.salle; s.x = SG.DONJON1.entree.x; s.y = SG.DONJON1.entree.y; }
    try { localStorage.setItem('spirit-sauvegarde', JSON.stringify(s)); } catch (e) { /* stockage indisponible */ }
  }

  nouvellePartie(mode) {
    this.mode = mode;
    this.vieMax = 12; this.vie = 12;          // la vie se compte en quarts de cœur
    this.pixels = 0; this.ampli = false; this.fragments = 0;
    this.secretsPris = new Set();
    this.ermiteVu = 0;
    this.visites = new Set();
    this.d1 = null; this.manette = false; this.objetB = null; this.source = 0; this.barriere = false;
    this.spirit = new SG.Spirit(SG.LOGE.reveil.x, SG.LOGE.reveil.y);
    this.spirit.dir = 'bas';
    this.porteLoge = false;
    this.qg = { lynx: false, gus: false };
    this.reveil = { t: 0, parle: false };
    this.entrerEcran('loge');
  }

  continuer(s) {
    this.mode = s.mode; this.vieMax = s.vieMax; this.vie = s.vieMax;
    this.pixels = s.pixels; this.ampli = s.ampli; this.fragments = s.fragments;
    this.secretsPris = new Set(s.secrets || []);
    this.ermiteVu = s.ermiteVu || 0;
    this.visites = new Set(s.visites || []);
    this.d1 = s.d1 || null; this.manette = !!s.manette; this.objetB = s.objetB || null; this.source = s.source || 0; this.barriere = !!s.barriere;
    this.spirit = new SG.Spirit(s.x, s.y);
    this.reveil = null;
    this.qg = s.qg || { lynx: true, gus: true };
    this.porteLoge = !!this.qg.gus && (s.ecran !== 'loge' || !!s.portail);   // le portail reste ouvert une fois apparu
    const ok = SG.MONDE[s.ecran] || (this.estDonjon(s.ecran) && SG.DONJON1.salles[s.ecran.slice(3)]);
    this.entrerEcran(ok ? s.ecran : SG.ECRAN_DEPART);
    this.etat = 'jeu';
  }

  degats(d) { return this.mode === 'decouverte' ? Math.max(1, Math.round(d / 2)) : d; }

  perdreVie(q) {
    this.vie = Math.max(0, this.vie - q);
    if (this.vie <= 0) {
      this.etat = 'finPartie'; this.tFin = 0; this.menuChoix = 0;
      SG.Son.arreterMusique(); SG.Son.effet('fin');
    }
  }

  // ------------------------------------------------------------ écrans
  entrerEcran(cle) {
    this.ecran = cle;
    this.feux = [];
    if (this.estDonjon(cle)) { this.entrerSalle(cle); return; }
    if (cle !== 'grotte') { if (!this.visites) this.visites = new Set(); this.visites.add(cle); }
    this.coupes = new Set();
    this.effets = []; this.projectiles = []; this.butins = []; this.monstres = []; this.pnj = [];
    if (cle === 'grotte') {
      this.pnj.push(new SG.Ermite(SG.GROTTE.ermite.x, SG.GROTTE.ermite.y));
      this.feux = [new SG.Feu(641, 352, 1.6), new SG.Feu(436, 88, 0.8), new SG.Feu(838, 88, 0.8)];
      SG.Son.jouerMusique('grotte');
      return;
    }
    const e = SG.MONDE[cle];
    SG.Son.jouerMusique(e.interieur ? 'titre' : 'plaine');
    if (cle === 'bureau-lynx') this.pnj.push(new SG.Personnage(SG.QG.lynx.x, SG.QG.lynx.y, 'lynx'));
    if (cle === 'hall') this.pnj.push(new SG.Personnage(SG.QG.gus.x, SG.QG.gus.y, 'gus'));
    // quitter le donjon fait revenir ses ennemis ; dehors, un ennemi vaincu revient après 2 minutes
    this.mortsDonjon = {};
    const mortsIci = (this.mortsDehors && this.mortsDehors[cle]) || {};
    for (const [i, [type, c, r]] of (e.ennemis || []).entries()) {
      if (mortsIci[i] !== undefined && this.t - mortsIci[i] < 120) continue;
      const m = SG.creerMonstre(type, c * SG.T + 40, r * SG.T + 62);
      m.indexSpawn = i;
      m.apparition = 0; // apparition désactivée en attendant les images de faille
      this.placerLibre(m);
      this.monstres.push(m);
    }
    // les secrets déjà trouvés n'apparaissent plus, et leur buisson non plus
    for (const k in e.secrets || {}) if (this.secretsPris.has(cle + ':' + k)) { this.coupes.add(k); const i = this.touffeSecrete(cle, k); if (i >= 0) this.coupes.add('t' + i); }
    this.sauver();
  }

  // si la case prévue est occupée, on cherche la case libre la plus proche
  placerLibre(m) {
    if (!this.collision(SG.boitePieds(m), m)) return;
    const c0 = Math.floor(m.x / SG.T), r0 = Math.floor(m.y / SG.T);
    for (let rayon = 1; rayon < 6; rayon++) {
      for (let dr = -rayon; dr <= rayon; dr++) {
        for (let dc = -rayon; dc <= rayon; dc++) {
          const x = (c0 + dc) * SG.T + 40, y = (r0 + dr) * SG.T + 62;
          if (!this.collision(SG.boitePieds(m, x, y), m)) { m.x = x; m.y = y; return; }
        }
      }
    }
  }

  // masque d'obstacles de l'écran peint en cours (cellules de 20 px), ou null
  masque() {
    if (this.ecran === 'grotte') return null;
    if (this.estDonjon()) return this.masqueSalle ? this.masqueSalle() : null;
    const e = SG.MONDE[this.ecran];
    if (this.ecran === 'loge') return SG.MASQUES[this.porteLoge || !this.reveil ? 'loge-ouverte' : 'loge'];
    const v = this.varianteQG(this.ecran);
    if (v) return SG.MASQUES[v];
    return e && e.image && SG.img[e.image] && SG.img[e.image].width ? SG.MASQUES[this.ecran] || null : null;
  }

  // porte du QG près de laquelle se tient Spirit : elle s'ouvre (image et passage)
  varianteQG(cle) {
    const portes = SG.QG[cle], s = this.spirit;
    if (!portes || !s) return null;
    for (const p of portes) if (p.variante && s.y < 250 && Math.abs(s.x - p.cx) < 95) return SG.img[p.variante] && SG.img[p.variante].width ? p.variante : null;
    return null;
  }

  // la boîte touche-t-elle un obstacle du masque ? (hors de l'écran : on prolonge la cellule du bord)
  collisionMasque(mq, b, entite) {
    const c0 = Math.floor(b.x / 20), c1 = Math.floor((b.x + b.w - 0.01) / 20);
    const r0 = Math.floor(b.y / 20), r1 = Math.floor((b.y + b.h - 0.01) / 20);
    for (let r = r0; r <= r1; r++) {
      const ligne = mq[SG.clamp(r, 0, mq.length - 1)];
      for (let c = c0; c <= c1; c++) {
        const ch = ligne[SG.clamp(c, 0, ligne.length - 1)];
        if (ch === '#' || ch === '~') return true;
        if (ch === 'v' && !(entite && (entite.vole || entite === this.spirit))) return true;
      }
    }
    return false;
  }

  caseEn(c, r) {
    if (this.ecran === 'grotte') return '.';
    if (this.estDonjon()) return this.caseSalle(c, r);
    const e = SG.MONDE[this.ecran];
    if (r < 0 || r >= SG.ROWS || c < 0 || c >= SG.COLS) return null;
    const ch = e.carte[r][c];
    if (SG.CASES_DESTRUCTIBLES.has(ch) && this.coupes.has(c + ',' + r)) return '.';
    if (ch === 'G' && this.barriere) return ':';
    return ch;
  }

  voisin(dir) {
    if (this.ecran === 'grotte') return null;
    if (this.estDonjon()) return this.voisinSalle(dir);
    const [x, y] = this.ecran.split(',').map(Number);
    const d = SG.DIRS[dir];
    const cle = (x + d.x) + ',' + (y + d.y);
    return SG.MONDE[cle] ? cle : null;
  }

  // la boîte touche-t-elle un obstacle ? (les monstres ne sortent pas de l'écran)
  collision(b, entite) {
    if (this.ecran === 'grotte') return this.collisionGrotte(b);
    const estSpirit = entite === this.spirit;
    if (b.x < 0 || b.y < 0 || b.x + b.w > SG.W || b.y + b.h > SG.H) {
      if (!estSpirit) return true;
    }
    const c0 = Math.floor(b.x / SG.T), c1 = Math.floor((b.x + b.w - 0.01) / SG.T);
    const r0 = Math.floor(b.y / SG.T), r1 = Math.floor((b.y + b.h - 0.01) / SG.T);
    for (let r = r0; r <= r1; r++) {
      for (let c = c0; c <= c1; c++) {
        let ch = this.caseEn(c, r);
        if (ch === null) {
          // hors de l'écran : on prolonge la case du bord (sortie ouverte si le chemin continue)
          ch = this.caseEn(SG.clamp(c, 0, SG.COLS - 1), SG.clamp(r, 0, SG.ROWS - 1));
          if (!estSpirit) return true;
        }
        if (ch === 'v' && entite && (entite.vole || entite === this.spirit)) continue;
        if ((this.estDonjon() ? SG.CASES_SALLE_MURS : SG.CASES_PLEINES).has(ch)) return true;
      }
    }
    // dans un donjon, seul le pied des objets arrête : on peut passer derrière une statue, un bloc ou un brasero
    if (this.estDonjon() && this.piedObjetTouche(b)) return true;
    const mq = this.masque();
    if (mq && this.collisionMasque(mq, b, entite)) return true;
    // dehors, le feuillage des arbres déborde de leur case : personne ne passe dessous
    if (!this.estDonjon() && !mq) {
      const x0 = b.x - 18, x1 = b.x + b.w + 18, y0 = b.y - 8, y1 = b.y + b.h + 66;
      for (let r = Math.floor(y0 / SG.T); r <= Math.floor((y1 - 0.01) / SG.T); r++) {
        for (let c = Math.floor(x0 / SG.T); c <= Math.floor((x1 - 0.01) / SG.T); c++) {
          const ch = this.caseEn(c, r);
          if (ch !== 'T' && ch !== 'S') continue;
          // arbres des bords gauche et droit : seulement la marge de côté (les chemins de sortie passent entre eux)
          if (ch === 'S' && (c === 0 || c === SG.COLS - 1) && (r * SG.T >= b.y + b.h || (r + 1) * SG.T <= b.y)) continue;
          return true;
        }
      }
    }
    for (const p of this.pnj) if (SG.boitesSeTouchent(b, SG.boitePieds(p))) return true;
    return false;
  }

  collisionGrotte(b) {
    const G = SG.GROTTE;
    const dedans = (x, y) => {
      let ok = false;
      for (let i = 0, j = G.sol.length - 1; i < G.sol.length; j = i++) {
        const [xi, yi] = G.sol[i], [xj, yj] = G.sol[j];
        if ((yi > y) !== (yj > y) && x < (xj - xi) * (y - yi) / (yj - yi) + xi) ok = !ok;
      }
      return ok;
    };
    for (const [x, y] of [[b.x, b.y], [b.x + b.w, b.y], [b.x, b.y + b.h], [b.x + b.w, b.y + b.h]]) if (!dedans(x, y)) return true;
    for (const c of G.cercles) {
      const px = SG.clamp(c.x, b.x, b.x + b.w), py = SG.clamp(c.y, b.y, b.y + b.h);
      if (Math.hypot(px - c.x, py - c.y) < c.r) return true;
    }
    for (const r of G.rects) if (SG.boitesSeTouchent(b, r)) return true;
    for (const p of this.pnj) if (SG.boitesSeTouchent(b, SG.boitePieds(p))) return true;
    return false;
  }

  // obstacle qui arrête un projectile (arbres, rochers, bords ; pas l'eau ni les herbes)
  obstacleHaut(x, y) {
    if (this.ecran === 'grotte') return this.collisionGrotte({ x: x - 2, y: y - 2, w: 4, h: 4 });
    const ch = this.caseEn(Math.floor(x / SG.T), Math.floor(y / SG.T));
    const mq = this.masque();
    if (mq) { const l = mq[SG.clamp(Math.floor(y / 20), 0, mq.length - 1)]; if (l[SG.clamp(Math.floor(x / 20), 0, l.length - 1)] === '#') return true; }
    if (this.estDonjon()) return ch === '#' || this.piedObjetTouche({ x: x - 2, y: y - 2, w: 4, h: 4 });
    return ch !== null && ch !== '~' && SG.CASES_PLEINES.has(ch);
  }

  // l'onde touche monstres, buissons et herbes dans la zone
  frapperZone(zone, degats, sx, sy) {
    for (const m of this.monstres) if (!m.mort && SG.boitesSeTouchent(zone, m.corps())) m.toucher(this, degats, sx, sy);
    for (const p of this.projectiles) if (!p.ami && SG.boitesSeTouchent(zone, p.boite())) { p.fini = true; this.effets.push(p instanceof SG.Pierre ? new SG.EclatPierre(p.x, p.y) : new SG.Eclat(p.x, p.y)); }
    this.couperDecor(zone);
    const c0 = Math.floor(zone.x / SG.T), c1 = Math.floor((zone.x + zone.w) / SG.T);
    const r0 = Math.floor(zone.y / SG.T), r1 = Math.floor((zone.y + zone.h) / SG.T);
    for (let r = r0; r <= r1; r++) for (let c = c0; c <= c1; c++) if (this.caseEn(c, r) === 'X') this.toucherCristalEn(c * SG.T + 40, r * SG.T + 40);
  }

  // coupe les buissons et hautes herbes dans la zone ; renvoie le nombre de cases coupées
  // touffe peinte qui porte le secret d'une case (la plus proche du centre de la case)
  touffeSecrete(ecran, k) {
    const D = SG.DECOUPES && SG.DECOUPES[ecran];
    if (!D) return -1;
    const [c, r] = k.split(',').map(Number), x = c * SG.T + 40, y = r * SG.T + 60;
    let mi = -1, md = Infinity;
    D.forEach((p, i) => { if (p.t !== 'h') return; const d = Math.hypot(p.d[0] + p.d[2] / 2 - x, p.b - y); if (d < md) { md = d; mi = i; } });
    return mi;
  }

  couperDecor(zone) {
    if (this.ecran === 'grotte') return 0;
    let n = 0;
    const e = SG.MONDE[this.ecran] || {};
    const D = SG.DECOUPES && SG.DECOUPES[this.ecran];
    if (D) D.forEach((p, i) => {
      if (p.t !== 'h' || this.coupes.has('t' + i)) return;
      const [x, y, w, h] = p.d;
      if (!SG.boitesSeTouchent(zone, { x: x + w * 0.15, y: y + h * 0.3, w: w * 0.7, h: h * 0.7 })) return;
      this.coupes.add('t' + i);
      n++;
      this.effets.push(new SG.Herbe(x + w / 2, p.b - h * 0.35, p.c, w));
      SG.Son.effet('feuilles');
      const k = e.secrets && Object.keys(e.secrets).find((q) => this.touffeSecrete(this.ecran, q) === i);
      if (k && !this.secretsPris.has(this.ecran + ':' + k)) {
        const b = new SG.Butin(e.secrets[k], x + w / 2, p.b + 4, true);
        b.cleSecret = this.ecran + ':' + k;
        this.butins.push(b);
      } else if (Math.random() < 0.15) this.lacherObjet(x + w / 2, p.b + 4, true);
    });
    const c0 = Math.floor(zone.x / SG.T), c1 = Math.floor((zone.x + zone.w) / SG.T);
    const r0 = Math.floor(zone.y / SG.T), r1 = Math.floor((zone.y + zone.h) / SG.T);
    for (let r = r0; r <= r1; r++) {
      for (let c = c0; c <= c1; c++) {
        const ch = this.caseEn(c, r);
        if (!ch || !SG.CASES_DESTRUCTIBLES.has(ch)) continue;
        const centre = { x: c * SG.T + 10, y: r * SG.T + 10, w: 60, h: 60 };
        if (!SG.boitesSeTouchent(zone, centre)) continue;
        this.coupes.add(c + ',' + r);
        n++;
        if (ch === 'p') { this.effets.push(new SG.EclatPierre(c * SG.T + 40, r * SG.T + 40)); SG.Son.effet('touche'); }
        else { this.effets.push(new SG.Feuilles(c * SG.T + 40, r * SG.T + 50)); SG.Son.effet('feuilles'); }
        const k = c + ',' + r;
        const secret = e.secrets && e.secrets[k];
        if (secret && !this.secretsPris.has(this.ecran + ':' + k)) {
          const b = new SG.Butin(secret, c * SG.T + 40, r * SG.T + 62, true);
          b.cleSecret = this.ecran + ':' + k;
          this.butins.push(b);
        } else if (Math.random() < 0.3) {
          this.lacherObjet(c * SG.T + 40, r * SG.T + 62, true);
        }
      }
    }
    return n;
  }

  activerCristalPlaine() {
    if (this.barriere) return;
    this.barriere = true;
    SG.Son.effet('objet');
    this.effets.push(new SG.Eclat(1000, 200));
    this.sauver();
    this.dialogue([[null, SG.TEXTES.barriere]]);
  }

  lacherObjet(x, y, garanti) {
    const r = garanti ? Math.random() * 0.62 : Math.random();
    const manque = this.vie < this.vieMax;
    if (r < (manque ? 0.22 : 0.08)) this.butins.push(new SG.Butin('coeur', x, y));
    else if (r < 0.55) this.butins.push(new SG.Butin('pixel', x, y));
    else if (r < 0.62) this.butins.push(new SG.Butin('pixels5', x, y));
  }

  ramasser(b) {
    if (b.type === 'coeur') { this.vie = Math.min(this.vieMax, this.vie + 4); SG.Son.effet('coeur'); }
    else if (b.type === 'pixel') { this.pixels = Math.min(999, this.pixels + 1); SG.Son.effet('pixel'); }
    else if (b.type === 'pixels5') { this.pixels = Math.min(999, this.pixels + 5); SG.Son.effet('pixel'); }
    else if (b.type === 'receptacle') {
      this.vieMax += 4; this.vie = this.vieMax;
      this.montrerObjet('receptacle', SG.TEXTES.donjon.coeurOr);
    }
    else if (b.type === 'fragment') {
      this.fragments++;
      if (this.fragments % 4 === 0) { this.vieMax += 4; }
      this.vie = this.vieMax;
      this.montrerObjet('fragment', SG.TEXTES.fragment(this.fragments));
    }
    if (b.cleSecret) { this.secretsPris.add(b.cleSecret); this.sauver(); }
  }

  // ------------------------------------------------------------ dialogues et objets
  // découpe les répliques trop longues en plusieurs pages de 3 lignes au plus
  paginer(lignes) {
    const out = [];
    for (const [qui, texte] of lignes) {
      const largeur = qui ? SG.W - 100 - 262 - 70 : SG.W - 100 - 50 - 70;
      for (const page of SG.decouperTexte(texte, largeur, 26, 3)) out.push([qui, page]);
    }
    return out;
  }

  dialogue(lignes, ensuite) {
    this.dlg = { lignes: this.paginer(lignes), i: 0, car: 0, ensuite };
    this.etat = 'dialogue';
  }

  montrerObjet(type, texte, ensuite) {
    this.objet = { type, texte, t: 0, ensuite };
    this.spirit.brandit = true;
    this.spirit.dir = 'bas';
    this.etat = 'objet';
    this.dlg = { lignes: this.paginer([[null, texte]]), i: 0, car: 0 };
    SG.Son.effet('objet');
  }

  parlerQG(p) {
    const q = this.qg || (this.qg = { lynx: false, gus: false });
    if (p.nom === 'lynx') {
      const t = q.gus ? SG.TEXTES.lynxFin : q.lynx ? SG.TEXTES.lynxApres : SG.TEXTES.lynx;
      this.dialogue(t, () => { q.lynx = true; this.sauver(); });
    } else {
      this.dialogue(q.gus ? SG.TEXTES.gusApres : SG.TEXTES.gus, () => { q.gus = true; this.sauver(); });
    }
  }

  parler() {
    const s = this.spirit, d = SG.DIRS[s.dir];
    const px = s.x + d.x * 50, py = s.y - 20 + d.y * 50;
    for (const p of this.pnj) {
      if (SG.dist(px, py, p.x, p.y - 30) < 90) {
        if (p instanceof SG.Flash) { this.parlerFlash(); return true; }
        if (p instanceof SG.Personnage) { this.parlerQG(p); return true; }
        if (!this.ampli) {
          this.dialogue(SG.TEXTES.ermiteDon, () => {
            this.ampli = true;
            this.montrerObjet('ampli', SG.TEXTES.ampli, () => this.dialogue(SG.TEXTES.ermiteApres, () => { this.ermiteVu = 1; this.sauver(); }));
          });
        } else {
          this.vie = this.vieMax;
          this.dialogue(this.ermiteVu ? SG.TEXTES.ermiteRevoir : SG.TEXTES.ermiteApres, () => { this.ermiteVu = 1; this.sauver(); });
        }
        return true;
      }
    }
    if (this.ecran !== 'grotte' && !this.estDonjon()) {
      const c = Math.floor(px / SG.T), r = Math.floor(py / SG.T);
      const e = SG.MONDE[this.ecran];
      if (this.caseEn(c, r) === 'P' && e.panneaux && e.panneaux[c + ',' + r]) {
        this.dialogue([[null, e.panneaux[c + ',' + r]]]);
        return true;
      }
    }
    return false;
  }

  // ------------------------------------------------------------ transitions
  capturer() {
    const c = document.createElement('canvas');
    c.width = this.canevas.width; c.height = Math.round(SG.H * this.echelle);
    const x = c.getContext('2d');
    x.setTransform(this.echelle, 0, 0, this.echelle, 0, 0);
    this.cacherSpirit = true;
    this.dessinerScene(x);
    this.cacherSpirit = false;
    return c;
  }

  glisserVers(dir) {
    const cle = this.voisin(dir);
    const avant = this.capturer();
    const s = this.spirit;
    const depart = { x: s.x, y: s.y };
    // dans un donjon, on entre d'une case pour ne pas rester dans l'encadrement de la porte
    // (le dessin de Spirit est plus large que ses pieds : on le pose franchement sur le sol de la salle)
    const don = this.estDonjon(cle), m = don ? SG.T + 34 : 0;
    if (dir === 'gauche') s.x = SG.W - s.pw / 2 - 2 - m;
    if (dir === 'droite') s.x = s.pw / 2 + 2 + m;
    if (dir === 'haut') s.y = don ? SG.H - SG.T - 12 : SG.H - 4;
    if (dir === 'bas') s.y = don ? SG.T + 130 : s.ph + 4;
    s.recul = null;
    this.entrerEcran(cle);
    if (this.collision(SG.boitePieds(s), s)) {
      const horiz = dir === 'gauche' || dir === 'droite', x0 = s.x, y0 = s.y;
      chercher: for (let d = 10; d <= 200; d += 10) for (const sg of [1, -1]) {
        const nx = horiz ? x0 : x0 + sg * d, ny = horiz ? y0 + sg * d : y0;
        if (!this.collision(SG.boitePieds(s, nx, ny), s)) { s.x = nx; s.y = ny; break chercher; }
      }
    }
    const apres = this.capturer();
    this.transition = { type: 'glisse', dir, avant, apres, t: 0, duree: 0.55, depart, arrivee: { x: s.x, y: s.y } };
    this.etat = 'transition';
  }

  // passage par le portail de la loge : tunnel de lumière, éclair blanc, puis arrivée dans la Plaine
  passerPortail(action, ensuite) {
    this.transition = { type: 'portail', t: 0, duree: 3.4, action, ensuite, fait: false, grains: [] };
    for (let i = 0; i < 70; i++) this.transition.grains.push({ a: Math.random() * Math.PI * 2, r: SG.hasard(0, 1), v: SG.hasard(0.4, 1.4), c: SG.choisir(['#5ff3ff', '#8a4dff', '#ffffff', '#3f8cff']), t: SG.hasard(3, 9) });
    this.etat = 'transition';
    SG.Son.effet('objet');
  }

  fonduVers(action) {
    this.transition = { type: 'fondu', t: 0, duree: 0.7, action, fait: false };
    this.etat = 'transition';
    SG.Son.effet('porte');
  }

  // ------------------------------------------------------------ mise à jour
  maj(dt) {
    this.t += dt;
    const C = SG.Commandes;
    C.maj();
    const clics = C.prendreClics();
    switch (this.etat) {
      case 'chargement': break;
      case 'titre': this.majTitre(C, clics); break;
      case 'mode': this.majMode(C, clics); break;
      case 'intro': this.majIntro(dt, C, clics); break;
      case 'jeu': this.majJeu(dt, C); break;
      case 'dialogue': this.majFeux(dt); this.majDialogue(dt, C, clics); break;
      case 'objet': this.majFeux(dt); this.objet.t += dt; if (this.objet.t > 0.8) this.majDialogue(dt, C, clics); break;
      case 'pause': this.majPause(C, clics); break;
      case 'carte': if (C.appuis.carte || C.appuis.menu || C.appuis.A || C.appuis.B || clics.length) { SG.Son.effet('choix'); this.etat = 'jeu'; } break;
      case 'transition': this.majTransition(dt); break;
      case 'finPartie': this.majFin(dt, C, clics); break;
    }
  }

  majJeu(dt, C) {
    const s = this.spirit;
    if (this.reveil) {
      // Spirit dort, s'étire, puis entend le signal : on ne bouge pas encore
      this.reveil.t += dt;
      if (this.reveil.t > 4.2 && !this.reveil.parle) {
        this.reveil.parle = true;
        this.dialogue(SG.TEXTES.reveil, () => {
          this.reveil = null;
          s.x = SG.LOGE.depart.x; s.y = SG.LOGE.depart.y; s.dir = 'bas';
          this.sauver();
        });
      }
      return;
    }
    if (this.evtPortail) {
      // retour dans la loge après avoir vu Gus : la porte devient un portail
      const ev = this.evtPortail;
      ev.t += dt;
      this.secousse = ev.t < 1.4 ? 6 * (1 - ev.t / 1.4) : 0;
      if (ev.t > 1.0 && !this.porteLoge) { this.porteLoge = true; this.flash = 1; SG.Son.effet('objet'); }
      if (ev.t > 1.9) { this.evtPortail = null; this.dialogue(SG.TEXTES.portailOuvert, () => this.sauver()); }
      return;
    }
    if (C.appuis.menu) { this.etat = 'pause'; this.menuChoix = 0; this.focusPause = 'objets'; this.selObjet = 0; SG.Son.effet('choix'); return; }
    if (C.appuis.carte) { this.etat = 'carte'; SG.Son.effet('choix'); return; }
    if (C.appuis.B && this.objetB === 'manette') this.lancerManette();
    if (C.appuis.A) {
      if (!this.parler() && !this.ouvrirCoffre()) {
        if (this.ampli) s.attaquer(this);
        else if (!this.dejaPrevenu && this.ecran !== 'grotte' && this.ecran !== 'loge') { this.dejaPrevenu = true; this.dialogue([[null, SG.TEXTES.sansAmpli]]); return; }
      }
    }
    s.maj(this, dt);
    for (const m of this.monstres) if (!m.mort) m.maj(this, dt);
    // mémoriser les ennemis vaincus : ils ne reviennent pas tout de suite
    for (const m of this.monstres) {
      if (!m.mort || m.indexSpawn === undefined || m.compte) continue;
      m.compte = true;
      if (this.estDonjon()) {
        const k = this.salleCle();
        if (!this.mortsDonjon) this.mortsDonjon = {};
        (this.mortsDonjon[k] = this.mortsDonjon[k] || []).push(m.indexSpawn);
      } else {
        if (!this.mortsDehors) this.mortsDehors = {};
        (this.mortsDehors[this.ecran] = this.mortsDehors[this.ecran] || {})[m.indexSpawn] = this.t;
      }
    }
    this.monstres = this.monstres.filter((m) => !m.mort);
    for (const p of this.projectiles) p.maj(this, dt);
    this.projectiles = this.projectiles.filter((p) => !p.fini);
    for (const b of this.butins) b.maj(this, dt);
    this.butins = this.butins.filter((b) => !b.fini);
    for (const e of this.effets) e.maj(this, dt);
    this.effets = this.effets.filter((e) => !e.fini);
    for (const p of this.pnj) p.maj(this, dt);
    if (this.ecran === 'grotte' && this.feux) for (const f of this.feux) f.maj(dt);
    if (this.estDonjon() && this.etat === 'jeu') this.majDonjon(dt, C);
    if (this.etat !== 'jeu') return;
    if (this.estDonjon()) {
      if (this.salleCle() === SG.DONJON1.entree.salle && s.y > SG.H - 2) {
        this.fonduVers(() => {
          const o = SG.DONJON1.sortie;
          this.spirit.x = o.x; this.spirit.y = o.y; this.spirit.dir = 'bas';
          this.entrerEcran(o.ecran);
        });
        return;
      }
    }

    // sorties d'écran et grotte
    if (this.ecran === 'grotte') {
      if (s.y > SG.H - 60) this.fonduVers(() => {
        this.spirit.x = SG.SORTIE_GROTTE.x; this.spirit.y = SG.SORTIE_GROTTE.y; this.spirit.dir = 'bas';
        this.entrerEcran(SG.SORTIE_GROTTE.ecran);
      });
      return;
    }
    const c = Math.floor(s.x / SG.T), r = Math.floor((s.y - 6) / SG.T);
    if (this.caseEn(c, r) === 'D' && s.dir === 'haut') {
      this.fonduVers(() => {
        const o = SG.DONJON1.entree;
        this.spirit.x = o.x; this.spirit.y = o.y; this.spirit.dir = 'haut';
        this.entrerEcran('d1:' + o.salle);
        if (!this.etatDonjon().annonce) { this.etatDonjon().annonce = true; this.dialogue([[null, SG.TEXTES.donjon.entree]]); }
      });
      return;
    }
    if (this.ecran === '1,0' && this.barriere && s.y - s.ph < 4 && !this.messageForet) {
      this.messageForet = true;
      this.dialogue([[null, SG.TEXTES.foretBientot]], () => { this.spirit.y += 30; setTimeout(() => { this.messageForet = false; }, 2000); });
      return;
    }
    if (this.ecran === 'loge' && this.porteLoge) {
      const P = SG.LOGE.portail;
      if (s.y > P.y && s.x > P.x0 && s.x < P.x1) {
        this.passerPortail(() => {
          const A = SG.ARRIVEE_PLAINE;
          this.spirit.x = A.x; this.spirit.y = A.y; this.spirit.dir = 'bas';
          this.entrerEcran(A.ecran);
        }, () => this.dialogue(SG.TEXTES.arriveePlaine));
        return;
      }
    } else if (SG.QG[this.ecran]) {
      for (const p of SG.QG[this.ecran]) {
        if (s.x < p.x0 || s.x > p.x1) continue;
        if ((p.haut && s.y < p.haut) || (p.bas && s.y > p.bas)) {
          this.fonduVers(() => {
            const [x, y, dir] = p.arrivee;
            this.spirit.x = x; this.spirit.y = y; this.spirit.dir = dir;
            this.entrerEcran(p.vers);
            if (p.vers === 'loge' && this.qg && this.qg.gus && !this.porteLoge) this.evtPortail = { t: -0.4 };
          });
          return;
        }
      }
      const H = SG.QG.portesHall;
      if (this.ecran === 'hall' && s.y > H.y && s.x > H.x0 && s.x < H.x1 && s.dir === 'bas') {
        if (!this.messageHall) { this.messageHall = true; this.dialogue([[null, SG.TEXTES.portesHall]], () => { this.spirit.y -= 20; setTimeout(() => { this.messageHall = false; }, 1500); }); }
        return;
      }
    }
    const eg = SG.MONDE[this.ecran] && SG.MONDE[this.ecran].grotte;
    if ((this.caseEn(c, r) === 'E' || (eg && s.x > eg.x0 && s.x < eg.x1 && s.y < eg.y)) && s.dir === 'haut') {
      this.fonduVers(() => {
        this.entrerEcran('grotte');
        this.spirit.x = SG.GROTTE.entree.x; this.spirit.y = SG.GROTTE.entree.y; this.spirit.dir = 'haut';
      });
      return;
    }
    if (s.x - s.pw / 2 < 2 && this.voisin('gauche')) this.glisserVers('gauche');
    else if (s.x + s.pw / 2 > SG.W - 2 && this.voisin('droite')) this.glisserVers('droite');
    else if (s.y - s.ph < 2 && this.voisin('haut')) this.glisserVers('haut');
    else if (s.y > SG.H - 2 && this.voisin('bas')) this.glisserVers('bas');
    else { s.x = SG.clamp(s.x, s.pw / 2, SG.W - s.pw / 2); s.y = SG.clamp(s.y, s.ph, SG.H); }
  }

  majFeux(dt) { if (this.feux && (this.ecran === 'grotte' || this.estDonjon())) for (const f of this.feux) f.maj(dt); }

  majTransition(dt) {
    const tr = this.transition;
    tr.t += dt;
    if (tr.type === 'fondu' && !tr.fait && tr.t >= tr.duree / 2) { tr.fait = true; tr.action(); }
    if (tr.type === 'portail') {
      if (!tr.fait && tr.t >= 1.7) { tr.fait = true; tr.action(); SG.Son.effet('porte'); }
      this.cacherSpirit = tr.t < 2.55;
    }
    if (tr.t >= tr.duree) {
      this.transition = null; this.etat = 'jeu';
      if (tr.type === 'portail') { this.cacherSpirit = false; if (tr.ensuite) tr.ensuite(); }
    }
  }

  majDialogue(dt, C, clics) {
    const d = this.dlg;
    const texte = d.lignes[d.i][1];
    const avant = Math.floor(d.car);
    d.car = Math.min(texte.length, d.car + dt * 55);
    if (Math.floor(d.car) > avant && Math.floor(d.car) % 3 === 0) SG.Son.effet('texte');
    if (C.appuis.A || C.appuis.B || clics.length) {
      if (d.car < texte.length) { d.car = texte.length; return; }
      SG.Son.effet('choix');
      d.i++; d.car = 0;
      if (d.i >= d.lignes.length) {
        const suite = this.etat === 'objet' ? this.objet.ensuite : d.ensuite;
        if (this.etat === 'objet') { this.spirit.brandit = false; this.objet = null; }
        this.dlg = null;
        this.etat = 'jeu';
        if (suite) suite();
      }
    }
  }

  // ------------------------------------------------------------ menus
  choixMenu(C, clics, nb, zones) {
    if (C.appuis.haut) { this.menuChoix = (this.menuChoix + nb - 1) % nb; SG.Son.effet('choix'); }
    if (C.appuis.bas) { this.menuChoix = (this.menuChoix + 1) % nb; SG.Son.effet('choix'); }
    for (const c of clics) {
      for (let i = 0; i < zones.length; i++) {
        const z = zones[i];
        if (c.x >= z.x && c.x <= z.x + z.w && c.y >= z.y && c.y <= z.y + z.h) { this.menuChoix = i; return i; }
      }
    }
    if (C.appuis.A || C.appuis.menu) return this.menuChoix;
    return -1;
  }

  optionsTitre() {
    const o = [];
    this.sauvegarde = SG.Jeu.lireSauvegarde();
    if (this.sauvegarde) o.push('Continuer');
    o.push('Nouvelle partie', 'Plein écran');
    return o;
  }

  majTitre(C, clics) {
    const opts = this.optionsTitre();
    const zones = opts.map((_, i) => ({ x: 460, y: 470 + i * 76 - 34, w: 360, h: 68 }));
    const choix = this.choixMenu(C, clics, opts.length, zones);
    if (choix < 0) return;
    const o = opts[choix];
    SG.Son.effet('valide');
    if (o === 'Continuer') this.continuer(this.sauvegarde);
    else if (o === 'Nouvelle partie') { this.etat = 'mode'; this.menuChoix = 0; }
    else if (o === 'Plein écran') SG.pleinEcran();
  }

  majMode(C, clics) {
    const zones = [0, 1].map((i) => ({ x: 170 + i * 490, y: 200, w: 450, h: 400 }));
    if (C.appuis.gauche || C.appuis.droite) { this.menuChoix = 1 - this.menuChoix; SG.Son.effet('choix'); }
    let choix = -1;
    for (const c of clics) zones.forEach((z, i) => { if (c.x >= z.x && c.x <= z.x + z.w && c.y >= z.y && c.y <= z.y + z.h) choix = i; });
    if (C.appuis.A) choix = this.menuChoix;
    if (C.appuis.B) { this.etat = 'titre'; this.menuChoix = 0; return; }
    if (choix < 0) return;
    SG.Son.effet('valide');
    this.nouvellePartie(choix === 0 ? 'heros' : 'decouverte');
    this.intro = { i: 0, t: 0 };
    this.etat = 'intro';
  }

  majIntro(dt, C, clics) {
    this.intro.t += dt;
    if (C.appuis.menu) { this.intro.i = SG.TEXTES.intro.length; }
    else if ((C.appuis.A || clics.length) && this.intro.t > 0.3) { this.intro.i++; this.intro.t = 0; SG.Son.effet('choix'); }
    if (this.intro.i >= SG.TEXTES.intro.length) {
      this.etat = 'jeu';
      SG.Son.jouerMusique('plaine');
    }
  }

  // objets de l'écran des objets, dans l'ordre des donjons
  listeObjets() {
    return [
      this.ampli ? 'ampli' : null, this.manette ? 'manette' : null,
      null, null, null, null, null, null, null,
    ];
  }

  majPause(C, clics) {
    const opts = ['Reprendre', 'Carte', SG.Son.muet ? 'Activer le son' : 'Couper le son', 'Plein écran', 'Retour au titre'];
    const zones = opts.map((_, i) => ({ x: 860, y: 170 + i * 84 - 34, w: 330, h: 68 }));
    if (this.focusPause === undefined) { this.focusPause = 'objets'; this.selObjet = 0; }
    if (C.appuis.carte) { this.etat = 'carte'; return; }
    if (C.appuis.menu && clics.length === 0) { this.etat = 'jeu'; return; }
    // clic sur une case d'objet
    for (const c of clics) {
      for (let i = 0; i < 9; i++) {
        const x = 100 + (i % 3) * 134, y = 112 + Math.floor(i / 3) * 156;
        if (c.x >= x && c.x <= x + 112 && c.y >= y && c.y <= y + 112) { this.focusPause = 'objets'; this.selObjet = i; this.equiper(i); SG.Son.effet('choix'); return; }
      }
    }
    if (this.focusPause === 'objets' && clics.length === 0) {
      const i = this.selObjet;
      if (C.appuis.gauche && i % 3 > 0) this.selObjet--;
      if (C.appuis.droite) { if (i % 3 < 2) this.selObjet++; else { this.focusPause = 'boutons'; this.menuChoix = 0; } }
      if (C.appuis.haut && i >= 3) this.selObjet -= 3;
      if (C.appuis.bas && i < 6) this.selObjet += 3;
      if (C.appuis.gauche || C.appuis.droite || C.appuis.haut || C.appuis.bas) SG.Son.effet('choix');
      if (C.appuis.A) this.equiper(this.selObjet);
      return;
    }
    if (C.appuis.gauche && clics.length === 0) { this.focusPause = 'objets'; SG.Son.effet('choix'); return; }
    const choix = this.choixMenu({ appuis: { ...C.appuis, menu: false } }, clics, opts.length, zones);
    if (choix < 0) return;
    this.focusPause = 'boutons';
    SG.Son.effet('valide');
    if (choix === 0) this.etat = 'jeu';
    else if (choix === 1) this.etat = 'carte';
    else if (choix === 2) SG.Son.basculer();
    else if (choix === 3) SG.pleinEcran();
    else if (choix === 4) { this.sauver(); this.allerTitre(); }
  }

  // équipe l'objet choisi sur le bouton B (l'Ampli reste sur A)
  equiper(i) {
    const o = this.listeObjets()[i];
    if (o && o !== 'ampli') { this.objetB = o; SG.Son.effet('valide'); }
  }

  majFin(dt, C, clics) {
    this.tFin += dt;
    if (this.tFin < 1.2) return;
    if (C.appuis.A || clics.length) {
      SG.Son.effet('valide');
      this.vie = this.vieMax;
      if (this.estDonjon()) {
        const o = SG.DONJON1.entree;
        this.spirit = new SG.Spirit(o.x, o.y); this.spirit.dir = 'haut';
        this.entrerEcran('d1:' + o.salle);
      } else {
        this.spirit = new SG.Spirit(SG.DEPART.x, SG.DEPART.y);
        this.entrerEcran(SG.ECRAN_DEPART);
      }
      this.etat = 'jeu';
    }
  }

  allerTitre() {
    this.etat = 'titre'; this.menuChoix = 0;
    SG.Son.jouerMusique('titre');
  }

  // ------------------------------------------------------------ dessin
  dessiner() {
    const ctx = this.ctx, k = this.echelle;
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.fillStyle = '#03060f'; ctx.fillRect(0, 0, this.canevas.width, this.canevas.height);
    ctx.imageSmoothingQuality = 'high';
    const menu = { chargement: 'dessinerChargement', titre: 'dessinerTitre', mode: 'dessinerMode', intro: 'dessinerIntro' }[this.etat];
    if (menu) {
      // écrans hors jeu : centrés verticalement
      SG.decalY = SG.BANDE / 2;
      ctx.setTransform(k, 0, 0, k, 0, SG.decalY * k);
      this[menu](ctx);
      return;
    }
    SG.decalY = SG.BANDE;
    ctx.setTransform(k, 0, 0, k, 0, 0);
    this.dessinerBande(ctx);
    ctx.setTransform(k, 0, 0, k, 0, SG.BANDE * k);
    ctx.save(); ctx.beginPath(); ctx.rect(0, 0, SG.W, SG.H); ctx.clip();
    if (this.etat === 'transition' && this.transition.type === 'glisse') {
      const tr = this.transition, u = SG.clamp(tr.t / tr.duree, 0, 1);
      const e = u < 0.5 ? 2 * u * u : 1 - Math.pow(-2 * u + 2, 2) / 2;
      const d = SG.DIRS[tr.dir];
      ctx.drawImage(tr.avant, -d.x * SG.W * e, -d.y * SG.H * e, SG.W, SG.H);
      ctx.drawImage(tr.apres, d.x * SG.W * (1 - e), d.y * SG.H * (1 - e), SG.W, SG.H);
      // Spirit traverse d'un écran à l'autre
      const s = this.spirit, x0 = s.x, y0 = s.y;
      const ax = tr.depart.x - d.x * SG.W * e, ay = tr.depart.y - d.y * SG.H * e;
      const bx = tr.arrivee.x + d.x * SG.W * (1 - e), by = tr.arrivee.y + d.y * SG.H * (1 - e);
      s.x = SG.lerp(ax, bx, u); s.y = SG.lerp(ay, by, u); s.bouge = true; s.tempsMarche += 1 / 60;
      s.dessiner(ctx);
      s.x = x0; s.y = y0;
      ctx.restore();
      return;
    }
    if (this.secousse > 0) ctx.translate(SG.hasard(-1, 1) * this.secousse, SG.hasard(-1, 1) * this.secousse);
    this.dessinerScene(ctx);
    if (this.etat === 'transition' && this.transition.type === 'portail') this.dessinerPortail(ctx, this.transition);
    if (this.flash > 0) { ctx.fillStyle = `rgba(230,250,255,${this.flash})`; ctx.fillRect(-20, -20, SG.W + 40, SG.H + 40); this.flash = Math.max(0, this.flash - 0.04); }
    ctx.restore();
    if (this.etat === 'transition' && this.transition.type === 'fondu') {
      const tr = this.transition, u = tr.t / tr.duree;
      ctx.fillStyle = `rgba(0,0,0,${1 - Math.abs(u * 2 - 1)})`;
      ctx.fillRect(0, 0, SG.W, SG.H);
    }
    if (this.etat === 'objet') this.dessinerObjetBrandi(ctx);
    if (this.dlg && (this.etat === 'dialogue' || (this.etat === 'objet' && this.objet.t > 0.8))) this.dessinerDialogue(ctx);
    if (this.etat === 'pause') this.dessinerPause(ctx);
    if (this.etat === 'carte') this.dessinerEcranCarte(ctx);
    if (this.etat === 'finPartie') this.dessinerFin(ctx);
  }

  dessinerPortail(ctx, tr) {
    const t = tr.t, cx = SG.W / 2, cy = SG.H / 2;
    if (t < 1.75) {
      // le tunnel : on est aspiré dans la lumière
      const a = SG.clamp(t / 0.5, 0, 1);
      ctx.save();
      ctx.globalAlpha = a;
      const im = SG.img['portail-tunnel'];
      if (im && im.width) {
        const z = 1 + t * 0.5;
        ctx.translate(cx, cy); ctx.rotate(t * 0.35); ctx.scale(z, z);
        ctx.drawImage(im, -SG.W / 2 - 60, -SG.H / 2 - 40, SG.W + 120, SG.H + 80);
      } else {
        const g = ctx.createRadialGradient(cx, cy, 10, cx, cy, 760);
        g.addColorStop(0, '#e8fbff'); g.addColorStop(0.12, '#5ff3ff'); g.addColorStop(0.45, '#2a2a8f'); g.addColorStop(1, '#05030f');
        ctx.fillStyle = g; ctx.fillRect(0, 0, SG.W, SG.H);
        ctx.lineCap = 'round';
        for (let i = 0; i < 9; i++) {
          const r = ((i / 9 + t * 0.55) % 1) ** 2 * 900;
          ctx.strokeStyle = i % 2 ? 'rgba(138,77,255,0.55)' : 'rgba(95,243,255,0.55)';
          ctx.lineWidth = 3 + r / 60;
          ctx.beginPath(); ctx.ellipse(cx, cy, r, r * 0.62, t * (i % 2 ? 0.8 : -0.8), 0, Math.PI * 2); ctx.stroke();
        }
        for (const g2 of tr.grains) {
          const r = ((g2.r + t * g2.v) % 1) ** 2 * 900, l = 10 + r / 8;
          ctx.strokeStyle = g2.c; ctx.lineWidth = 2 + r / 200;
          ctx.beginPath(); ctx.moveTo(cx + Math.cos(g2.a) * r, cy + Math.sin(g2.a) * r * 0.62);
          ctx.lineTo(cx + Math.cos(g2.a) * (r + l), cy + Math.sin(g2.a) * (r + l) * 0.62); ctx.stroke();
        }
      }
      ctx.restore();
      // Spirit tombe dans le tunnel
      const im2 = SG.img['spirit-face'];
      if (im2 && im2.width && t > 0.2) {
        const e = SG.clamp(1 - (t - 0.2) / 1.5, 0.05, 1);
        ctx.save(); ctx.translate(cx, cy + 40); ctx.rotate(t * 3); ctx.globalAlpha = SG.clamp(e * 1.4, 0, 1);
        SG.dessinerPied(ctx, im2, 0, 50 * e, { echelle: e });
        ctx.restore();
      }
      if (t > 1.45) { ctx.fillStyle = `rgba(240,252,255,${SG.clamp((t - 1.45) / 0.3, 0, 1)})`; ctx.fillRect(0, 0, SG.W, SG.H); }
      return;
    }
    // l'arrivée : l'éclair retombe, une colonne de lumière dépose Spirit
    const s = this.spirit, u = t - 1.75;
    const arr = SG.img['arrivee-plaine'];
    if (arr && arr.width && u < 1.2) { ctx.save(); ctx.globalAlpha = SG.clamp(1 - (u - 0.5) / 0.7, 0, 1); ctx.drawImage(arr, 0, 0, SG.W, SG.H); ctx.restore(); }
    const col = SG.clamp(1 - Math.max(0, u - 0.9) / 0.75, 0, 1);
    ctx.save();
    ctx.globalCompositeOperation = 'lighter';
    const g = ctx.createLinearGradient(s.x - 60, 0, s.x + 60, 0);
    g.addColorStop(0, 'rgba(95,243,255,0)'); g.addColorStop(0.5, `rgba(200,250,255,${0.85 * col})`); g.addColorStop(1, 'rgba(95,243,255,0)');
    ctx.fillStyle = g; ctx.fillRect(s.x - 60, 0, 120, s.y + 10);
    ctx.fillStyle = `rgba(160,240,255,${0.5 * col})`; ctx.beginPath(); ctx.ellipse(s.x, s.y, 70 + u * 30, 18 + u * 6, 0, 0, Math.PI * 2); ctx.fill();
    for (const g2 of tr.grains) {
      const k = SG.clamp(1 - u / 0.9, 0, 1), r = 30 + g2.r * 220 * k;
      ctx.fillStyle = g2.c; ctx.globalAlpha = col;
      ctx.fillRect(s.x + Math.cos(g2.a) * r - 3, s.y - 50 + Math.sin(g2.a) * r * 0.7 - 3, 6, 6);
    }
    ctx.restore();
    if (u > 0.8) { ctx.save(); ctx.globalAlpha = SG.clamp((u - 0.8) / 0.5, 0, 1); s.dessiner(ctx); ctx.restore(); }
    if (u < 0.45) { ctx.fillStyle = `rgba(240,252,255,${1 - u / 0.45})`; ctx.fillRect(0, 0, SG.W, SG.H); }
  }

  dessinerScene(ctx) {
    if (this.ecran === 'grotte') {
      ctx.drawImage(SG.img.grotte, 0, 0, SG.W, SG.H);
      this.dessinerFlammes(ctx);
    } else if (this.estDonjon()) {
      ctx.drawImage(this.fondSalle(this.ecran), 0, 0, SG.W, SG.H);
    } else {
      ctx.drawImage(this.fond(this.ecran), 0, 0, SG.W, SG.H);
    }
    // tout ce qui a une hauteur est trié par la position des pieds
    const liste = [];
    if (this.estDonjon()) this.objetsSalle(liste);
    else if (this.ecran !== 'grotte') this.objetsDecor(liste);
    for (const b of this.butins) liste.push(b);
    for (const m of this.monstres) {
      if (!this.estDonjon()) { liste.push(m); continue; }
      liste.push({ y: m.y, dessiner: (c) => { c.save(); c.filter = 'drop-shadow(0 0 2px rgba(255,255,255,0.95)) drop-shadow(0 0 7px rgba(255,210,90,0.7))'; m.dessiner(c); c.restore(); } });
    }
    for (const p of this.pnj) liste.push(p);
    if (this.reveil && this.spirit) {
      const t = this.reveil.t, R = SG.LOGE.depart, Ch = SG.LOGE.chaise;
      if (t < 1.8) {
        // endormi dans sa chaise, face à l'écran : on voit sa tête penchée au-dessus du dossier, et les « z »
        liste.push({ y: SG.H + 50, dessiner: (ctx) => {
          const dos = SG.img['spirit-dos'];
          if (dos && dos.width) {
            ctx.save();
            ctx.beginPath(); ctx.rect(Ch.x - 90, Ch.y - 140, 180, 150); ctx.clip();
            ctx.translate(Ch.x, Ch.y + 70); ctx.rotate(-0.28 + Math.sin(t * 1.6) * 0.02);
            SG.dessinerPied(ctx, dos, 0, 0, {});
            ctx.restore();
          }
          for (let i = 0; i < 3; i++) {
            const u = ((t * 0.7 + i / 3) % 1);
            ctx.save(); ctx.globalAlpha = Math.sin(u * Math.PI);
            SG.texte(ctx, 'z', Ch.x + 30 + u * 34, Ch.y - 70 - u * 60, 22 + i * 6, '#cfe8ff', 'center', 'rgba(0,0,30,0.8)', 4, true);
            ctx.restore();
          }
        } });
      } else {
        const im = SG.img[t < 3.2 ? 'spirit-etire' : 'spirit-signal'];
        liste.push({ y: R.y, dessiner: (ctx) => { SG.ombre(ctx, R.x, R.y, 30, 0.3); if (im && im.width) SG.dessinerPied(ctx, im, R.x, R.y, {}); } });
      }
    } else if (this.spirit && !this.cacherSpirit) liste.push(this.spirit);
    liste.sort((a, b) => a.y - b.y);
    for (const o of liste) o.dessiner(ctx);
    if (this.estDonjon()) this.dessinerFlammes(ctx);
    // monstres étourdis : étoiles qui tournent
    for (const m of this.monstres) if (m.etourdi > 0) {
      for (let i = 0; i < 3; i++) {
        const a = this.t * 5 + i * 2.1, sx = m.x + Math.cos(a) * 22, sy = m.y - m.ch - 14 + Math.sin(a) * 6;
        ctx.fillStyle = '#ffe24a'; ctx.strokeStyle = '#3a2a00'; ctx.lineWidth = 2;
        ctx.beginPath(); for (let j = 0; j < 10; j++) { const rr = j % 2 ? 3 : 8, aa = j / 10 * Math.PI * 2; ctx.lineTo(sx + Math.cos(aa) * rr, sy + Math.sin(aa) * rr); } ctx.closePath(); ctx.fill(); ctx.stroke();
      }
    }
    // silhouettes par-dessus le décor : Spirit et les monstres restent visibles derrière les arbres
    ctx.save();
    ctx.globalAlpha = 0.38;
    for (const m of this.monstres) if (!m.apparition || m.apparition <= 0) m.dessiner(ctx);
    if (this.spirit && !this.cacherSpirit && !this.reveil && !this.estDonjon() && !this.masque()) { ctx.globalAlpha = 0.5; this.spirit.dessiner(ctx); }
    ctx.restore();
    for (const p of this.projectiles) p.dessiner(ctx);
    for (const e of this.effets) e.dessiner(ctx);
    // la distorsion de l'onde part de Spirit : on le redessine par-dessus pour qu'elle ne lui efface pas la tête
    if (this.spirit && !this.cacherSpirit && !this.reveil && this.spirit.attaque > 0) this.spirit.dessiner(ctx);
    if (this.ecran === 'grotte') this.dessinerLumiereGrotte(ctx);
    else if (this.estDonjon()) {
      const g = ctx.createRadialGradient(640, 360, 300, 640, 360, 800);
      g.addColorStop(0, 'rgba(0,0,0,0)'); g.addColorStop(1, 'rgba(10,0,25,0.55)');
      ctx.fillStyle = g; ctx.fillRect(0, 0, SG.W, SG.H);
    } else {
      const g = ctx.createRadialGradient(640, 360, 380, 640, 360, 820);
      g.addColorStop(0, 'rgba(0,0,0,0)'); g.addColorStop(1, 'rgba(0,20,10,0.35)');
      ctx.fillStyle = g; ctx.fillRect(0, 0, SG.W, SG.H);
    }
  }

  dessinerFlammes(ctx) {
    if (this.feux) for (const f of this.feux) f.dessiner(ctx);
  }

  dessinerLumiereGrotte(ctx) {
    const g = ctx.createRadialGradient(640, 360, 250, 640, 360, 760);
    g.addColorStop(0, 'rgba(0,0,0,0)'); g.addColorStop(1, 'rgba(0,0,0,0.45)');
    ctx.fillStyle = g; ctx.fillRect(0, 0, SG.W, SG.H);
  }

  objetsDecor(liste) {
    const e = SG.MONDE[this.ecran];
    const I = SG.img;
    // rochers et touffes découpés dans l'écran peint : mêmes pixels, triés avec les personnages
    const D = SG.DECOUPES && SG.DECOUPES[this.ecran], pl = I['decoupes-' + this.ecran.replace(',', '-')];
    if (D && pl && pl.width) D.forEach((p, i) => {
      const [sx, sy, sw, sh] = p.s, [x, y, w, h] = p.d;
      if (p.t === 'h' && this.coupes.has('t' + i)) {
        // touffe coupée : il reste le pied, ras du sol
        const k = 0.3;
        liste.push({ y: -40, dessiner: (ctx) => ctx.drawImage(pl, sx, sy + sh * (1 - k), sw, sh * k, x, y + h * (1 - k), w, h * k) });
        return;
      }
      liste.push({ y: p.b - (p.t === 'h' ? 6 : 0), dessiner: (ctx) => ctx.drawImage(pl, sx, sy, sw, sh, x, y, w, h) });
    });
    for (let r = 0; r < SG.ROWS; r++) {
      for (let c = 0; c < SG.COLS; c++) {
        const ch = this.caseEn(c, r);
        if (e.image && 'TSrMEg~:,'.includes(ch)) continue;
        const x = c * SG.T + 40 + (ch === 'X' && e.cristal ? e.cristal.dx : 0), y = r * SG.T + SG.T;
        const graine = (c * 31 + r * 17 + this.ecran.length) % 7;
        let im = null, dx = 0, dy = 0, retourne = graine % 2 === 0;
        switch (ch) {
          case 'T': im = I['arbre-sombre']; dy = 10; dx = (graine - 3) * 3; break;
          case 'S': im = I['arbre-sombre']; dy = r === SG.ROWS - 1 ? 45 : 10; dx = (graine - 3) * 3; break;
          case 'b': im = I.buisson; dy = -4; break;
          case 'h': im = I.herbes; dy = -8; break;
          case 'r': im = I.rocher; dy = -6; break;
          case 'x': im = I['rocher-fissure']; dy = -4; retourne = false; break;
          case 'P': im = I.panneau; dy = -6; retourne = false; break;
          case 'M': if (this.caseEn(c - 1, r) !== 'M') { im = I['amas-rochers']; dx = 40; dy = 4; } break;
          case 'E': im = I['falaise-grotte']; dy = 2; retourne = false; break;
          case 'D':
            if (I['entree-terrier'] && I['entree-terrier'].width) {
              // la paroi du terrier remplace la lisière d'arbres sur toute la largeur de l'écran
              const ter = I['entree-terrier'];
              liste.push({ y: y + 10, dessiner: (ctx) => SG.dessinerPied(ctx, ter, 680, y + 12, { sy: 0.78 }) });
              // pied de la paroi : touffes et cailloux décoratifs (indestructibles) pour fondre la jonction avec l'herbe
              const al = SG.graine(77);
              const deco = [];
              for (let xx = 110; xx < 1250; xx += 26 + al() * 22) {
                if (xx > 600 && xx < 760) continue; // devant l'entrée
                deco.push({ x: xx + al() * 10, r: al() < 0.25, e: 0.35 + al() * 0.25, v: al() < 0.5, dy: al() * 10 });
              }
              liste.push({ y: y + 14, dessiner: (ctx) => {
                for (const d of deco) SG.dessinerPied(ctx, d.r ? I.rocher : I.herbes, d.x, y + 16 + d.dy, { echelle: d.r ? d.e * 0.6 : d.e, retourne: d.v });
              } });
            } else { im = I['falaise-grotte']; dy = 14; retourne = false; }
            break;
          case 'X': liste.push({ y, dessiner: (ctx) => SG.dessinCristal(ctx, x, y, this.barriere, this.t) }); break;
          case 'G': liste.push({ y: y + 30, dessiner: (ctx) => SG.dessinBarriere(ctx, x, y, this.t) }); break;
        }
        if (im) {
          const r = ch === 'T' || ch === 'S' ? 58 : ch === 'M' ? 70 : ch === 'E' ? 0 : 30;
          liste.push({ y: y + dy - 1, dessiner: (ctx) => { if (r) SG.ombre(ctx, x + dx, y + dy - 2, r, 0.28); SG.dessinerPied(ctx, im, x + dx, y + dy, { retourne }); } });
        }
      }
    }
    return e;
  }

  // sol dessiné une seule fois par écran : herbe, fleurs, chemins, eau
  fond(cle) {
    if (this.fonds[cle]) return this.fonds[cle];
    const e = SG.MONDE[cle];
    const nomImage = cle === 'loge' && this.porteLoge ? 'loge-portail' : (this.varianteQG(cle) || e.image);
    if (cle === 'loge' && this.reveil && this.reveil.t < 1.8 && SG.img['loge-endormi'] && SG.img['loge-endormi'].width) return SG.img['loge-endormi'];
    if (nomImage && SG.img[nomImage] && SG.img[nomImage].width) return SG.img[nomImage];
    const k = Math.min(2, this.echelle);
    const cv = document.createElement('canvas');
    cv.width = SG.W * k; cv.height = SG.H * k;
    let ctx = cv.getContext('2d');
    ctx.scale(k, k);
    const alea = SG.graine(cle.charCodeAt(0) * 97 + cle.charCodeAt(2) * 13 + 5);
    const T = SG.T;
    const motif = (nom, echelle) => {
      const im = SG.img['sol-' + nom];
      const p = ctx.createPattern(im, 'repeat');
      p.setTransform(new DOMMatrix().scale(echelle / SG.ECHELLE_IMG));
      return p;
    };
    // herbe : texture adoucie pour que les personnages ressortent
    ctx.fillStyle = motif('herbe', 0.5);
    ctx.fillRect(0, 0, SG.W, SG.H);
    ctx.fillStyle = 'rgba(95,175,70,0.38)';
    ctx.fillRect(0, 0, SG.W, SG.H);
    // taches : chemin et eau, en blocs arrondis soudés entre eux
    const tache = (car, contour, fond, clair, texture) => {
      const cases = [];
      const egal = (ch) => ch === car || (car === ':' && (ch === 'G' || ch === 'D')) || (car === '~' && ch === 'X');
      for (let r = 0; r < SG.ROWS; r++) for (let c = 0; c < SG.COLS; c++) if (egal(e.carte[r][c])) cases.push([c, r]);
      const est = (c, r) => {
        if (c < 0 || c >= SG.COLS || r < 0 || r >= SG.ROWS) {
          const cc = SG.clamp(c, 0, SG.COLS - 1), rr = SG.clamp(r, 0, SG.ROWS - 1);
          return egal(e.carte[rr][cc]);
        }
        return egal(e.carte[r][c]);
      };
      const passe = (marge, couleur) => {
        ctx.fillStyle = couleur;
        if (car === '~') {
          // l'eau prend une forme arrondie : des disques soudés entre eux
          for (const [c, r] of cases) {
            ctx.beginPath(); ctx.arc(c * T + 40, r * T + 40, 50 + marge, 0, Math.PI * 2); ctx.fill();
            if (est(c + 1, r)) ctx.fillRect(c * T + 40, r * T + 40 - 34 - marge, T, 68 + marge * 2);
            if (est(c, r + 1)) ctx.fillRect(c * T + 40 - 34 - marge, r * T + 40, 68 + marge * 2, T);
            if (est(c + 1, r) && est(c, r + 1) && est(c + 1, r + 1)) ctx.fillRect(c * T + 40, r * T + 40, T, T);
          }
          return;
        }
        for (const [c, r] of cases) {
          const x = c * T, y = r * T;
          ctx.beginPath(); ctx.roundRect(x + 8 - marge, y + 8 - marge, T - 16 + marge * 2, T - 16 + marge * 2, 26 + marge); ctx.fill();
          if (est(c + 1, r)) ctx.fillRect(x + 40, y + 8 - marge, T, T - 16 + marge * 2);
          if (est(c, r + 1)) ctx.fillRect(x + 8 - marge, y + 40, T - 16 + marge * 2, T);
          if (est(c - 1, r) && c === 0) ctx.fillRect(x - 40, y + 8 - marge, T, T - 16 + marge * 2);
          if (est(c, r - 1) && r === 0) ctx.fillRect(x + 8 - marge, y - 40, T - 16 + marge * 2, T);
          if (est(c + 1, r) && est(c, r + 1) && est(c + 1, r + 1)) ctx.fillRect(x + 40, y + 40, T, T);
          // bords de l'écran : on prolonge sans laisser de trou entre deux cases voisines
          if (r === 0 && est(c, -1) && est(c + 1, r) && est(c + 1, -1)) ctx.fillRect(x + 40, y - 40, T, T);
          if (r === SG.ROWS - 1 && est(c, r + 1) && est(c + 1, r) && est(c + 1, r + 1)) ctx.fillRect(x + 40, y + 40, T, T);
          if (c === 0 && est(-1, r) && est(c, r + 1) && est(-1, r + 1)) ctx.fillRect(x - 40, y + 40, T, T);
          if (c === SG.COLS - 1 && est(c + 1, r) && est(c, r + 1) && est(c + 1, r + 1)) ctx.fillRect(x + 40, y + 40, T, T);
          if (r === SG.ROWS - 1 && est(c, r + 1)) ctx.fillRect(x + 8 - marge, y + 40, T - 16 + marge * 2, T);
          if (c === SG.COLS - 1 && est(c + 1, r)) ctx.fillRect(x + 40, y + 8 - marge, T, T - 16 + marge * 2);
        }
      };
      // pochoir de la forme
      const cv2 = document.createElement('canvas'); cv2.width = cv.width; cv2.height = cv.height;
      const c2 = cv2.getContext('2d'); c2.scale(k, k);
      const ctxAvant = ctx; ctx = c2; passe(0, '#fff'); ctx = ctxAvant;
      // bord adouci : la forme est floutée, pas de trait
      const cv3 = document.createElement('canvas'); cv3.width = cv.width; cv3.height = cv.height;
      const c3 = cv3.getContext('2d');
      c3.filter = `blur(${(car === '~' ? 2 : 5) * k}px)`;
      c3.drawImage(cv2, 0, 0);
      c3.filter = 'none';
      if (car === '~') {
        // berge : bande de terre humide sous l'eau
        const cb = document.createElement('canvas'); cb.width = cv.width; cb.height = cv.height;
        const b2 = cb.getContext('2d'); b2.scale(k, k);
        ctx = b2; passe(10, '#fff'); ctx = ctxAvant;
        const b3 = document.createElement('canvas'); b3.width = cv.width; b3.height = cv.height;
        const b4 = b3.getContext('2d'); b4.filter = `blur(${6 * k}px)`; b4.drawImage(cb, 0, 0); b4.filter = 'none';
        b4.globalCompositeOperation = 'source-in'; b4.setTransform(k, 0, 0, k, 0, 0);
        b4.fillStyle = motif('terre', 0.5); b4.fillRect(0, 0, SG.W, SG.H);
        b4.fillStyle = 'rgba(40,25,10,0.35)'; b4.fillRect(0, 0, SG.W, SG.H);
        ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.drawImage(b3, 0, 0); ctx.restore();
      }
      c3.globalCompositeOperation = 'source-in';
      c3.setTransform(k, 0, 0, k, 0, 0);
      c3.fillStyle = texture; c3.fillRect(0, 0, SG.W, SG.H);
      if (car === '~') {
        // eau plus sombre au bord, plus claire au centre
        c3.globalCompositeOperation = 'source-atop';
        c3.shadowColor = 'rgba(0,30,60,0.6)'; c3.shadowBlur = 18 * k;
      }
      ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.drawImage(cv3, 0, 0); ctx.restore();
      // touffes d'herbe qui débordent sur le bord, pour fondre la limite
      const tuf = SG.img.herbes;
      for (const [c, r] of cases) {
        for (const [dc, dr] of [[0, -1], [0, 1], [-1, 0], [1, 0]]) {
          const cc = c + dc, rr = r + dr;
          if (cc < 0 || rr < 0 || cc >= SG.COLS || rr >= SG.ROWS) continue;
          if (est(cc, rr) || SG.CASES_PLEINES.has(e.carte[rr][cc]) && e.carte[rr][cc] !== 'b') continue;
          const n = 1 + Math.floor(alea() * 2);
          for (let i = 0; i < n; i++) {
            const bx = c * T + 40 + dc * (car === '~' ? 44 : 36) + (dr ? (alea() - 0.5) * 70 : (alea() - 0.5) * 8);
            const by = r * T + 40 + dr * (car === '~' ? 44 : 36) + (dc ? (alea() - 0.5) * 70 : (alea() - 0.5) * 8) + 12;
            const ech = 0.28 + alea() * 0.18;
            SG.dessinerPied(ctx, tuf, bx, by, { echelle: ech, retourne: alea() < 0.5 });
          }
        }
      }
      if (clair) {
        ctx.save(); ctx.globalAlpha = 0.5;
        for (const [c, r] of cases) {
          if (alea() < 0.6) { ctx.fillStyle = clair; ctx.beginPath(); ctx.ellipse(c * T + 20 + alea() * 40, r * T + 20 + alea() * 40, 6 + alea() * 8, 3 + alea() * 4, 0, 0, Math.PI * 2); ctx.fill(); }
        }
        ctx.restore();
      }
    };
    tache(':', '#4a3120', null, null, motif('terre', 0.5));
    tache('~', '#0e3560', null, null, motif('eau', 0.5));
    this.fonds[cle] = cv;
    return cv;
  }

  // ------------------------------------------------------------ interface
  // bandeau du haut, comme dans Zelda : mini-carte, compteurs, objets B et A, vie
  dessinerBande(ctx) {
    const H = SG.BANDE;
    ctx.fillStyle = '#03060f'; ctx.fillRect(0, 0, SG.W, H);
    // cadre du bandeau (même habillage que les menus)
    SG.cadre(ctx, SG.img['ui-panneau'], 4, 2, SG.W - 8, H - 4, 150, 34);
    const titre = (t, x, y) => SG.texte(ctx, t, x, y, 17, '#7fe8ff', 'center', '#02102a', 4, true);
    // 1. mini-carte
    const mx = 46, my = 60, mw = 170, mh = 48;
    titre(this.estDonjon() ? 'TERRIER' : (SG.MONDE[this.ecran] && SG.MONDE[this.ecran].interieur) ? 'QG' : 'PLAINE', mx + mw / 2, 53);
    ctx.fillStyle = 'rgba(5,15,35,0.9)'; ctx.beginPath(); ctx.roundRect(mx, my, mw, mh, 6); ctx.fill();
    ctx.strokeStyle = 'rgba(42,212,255,0.6)'; ctx.lineWidth = 2; ctx.stroke();
    if (this.estDonjon()) {
      const D = this.etatDonjon(), cw = mw / 3, chh = mh / 4;
      for (const kk in SG.DONJON1.salles) {
        const [cx, cy] = kk.split(',').map(Number);
        if (!D.visites.includes(kk) && !D.carte) continue;
        ctx.fillStyle = D.visites.includes(kk) ? '#5b6fa8' : '#2e3858';
        ctx.fillRect(mx + cx * cw + 5, my + cy * chh + 3, cw - 10, chh - 6);
        if (D.boussole && SG.DONJON1.salles[kk].boss && !D.fini) { ctx.fillStyle = '#ff3050'; ctx.fillRect(mx + cx * cw + cw / 2 - 4, my + cy * chh + chh / 2 - 3, 8, 6); }
      }
      const [ex, ey] = this.salleCle().split(',').map(Number);
      ctx.fillStyle = '#7dff5a'; ctx.beginPath(); ctx.arc(mx + ex * cw + cw / 2, my + ey * chh + chh / 2, 5, 0, 7); ctx.fill();
    } else {
      const cw = mw / 3, chh = mh / 3;
      for (const kk in SG.MONDE) {
        const [cx, cy] = kk.split(',').map(Number);
        ctx.fillStyle = this.visites && this.visites.has(kk) ? '#4f7a4a' : '#232c46';
        ctx.fillRect(mx + cx * cw + 3, my + cy * chh + 2, cw - 6, chh - 4);
      }
      const ici = this.ecran === 'grotte' ? SG.SORTIE_GROTTE.ecran : this.ecran;
      const [ex, ey] = ici.split(',').map(Number);
      const sx = this.ecran === 'grotte' ? SG.SORTIE_GROTTE.x : this.spirit.x, sy = this.ecran === 'grotte' ? SG.SORTIE_GROTTE.y : this.spirit.y;
      ctx.fillStyle = '#7dff5a'; ctx.beginPath(); ctx.arc(mx + ex * cw + sx / SG.W * cw, my + ey * chh + sy / SG.H * chh, 5, 0, 7); ctx.fill();
    }
    // 2. compteurs
    const cx0 = 260;
    titre('INVENTAIRE', cx0 + 70, 53);
    SG.dessinerButin(ctx, 'pixel', cx0 + 20, 75, 0.72);
    SG.texte(ctx, '× ' + this.pixels, cx0 + 42, 84, 21, '#fff', 'left', '#000', 4, true);
    if (this.estDonjon()) {
      SG.dessinerIcone(ctx, 'cle', cx0 + 20, 100, 24);
      SG.texte(ctx, '× ' + this.etatDonjon().cles, cx0 + 42, 108, 21, '#fff', 'left', '#000', 4, true);
    }
    if (this.estDonjon() && this.etatDonjon().cleBoss) SG.dessinerIcone(ctx, 'cleBoss', cx0 + 115, 100, 28);
    SG.dessinerIcone(ctx, 'source', cx0 + 115, 75, 22);
    SG.texte(ctx, (this.source || 0) + '/8', cx0 + 132, 84, 19, '#ffe9a0', 'left', '#000', 4, true);
    // 3. objets B et A
    const case_ = (x, lettre, type) => {
      const t = 62, y = 78 - t / 2;
      titre(lettre, x - 16, y + t / 2 + 6);
      SG.cadre(ctx, SG.img['ui-portrait'], x - 6, y - 4, t + 12, t + 12, 200, 20);
      const g2 = ctx.createRadialGradient(x + t / 2, y + t / 2, 3, x + t / 2, y + t / 2, t * 0.5);
      g2.addColorStop(0, '#ffffff'); g2.addColorStop(1, '#a8e2ff');
      ctx.fillStyle = g2; ctx.beginPath(); ctx.roundRect(x + 8, y + 8, t - 16, t - 16, 8); ctx.fill();
      if (type) SG.dessinerIcone(ctx, type, x + t / 2, y + t / 2 + 1, 44);
    };
    case_(520, 'B', this.objetB);
    case_(640, 'A', this.ampli ? 'ampli' : null);
    // 4. vie
    const n = this.vieMax / 4;
    titre('VIE', 760 + Math.min(n, 10) * 18, 53);
    for (let i = 0; i < n; i++) {
      const reste = SG.clamp((this.vie - i * 4) / 4, 0, 1);
      const col = i % 10, lig = Math.floor(i / 10);
      SG.dessinerCoeur(ctx, 778 + col * 36, (n > 10 ? 74 : 84) + lig * 26, 32, reste);
    }
    if (this.fragments % 4) SG.texte(ctx, 'Fragments ' + (this.fragments % 4) + '/4', 775, 116, 15, '#ffd0dd', 'left');
    // 5. logo du jeu
    const L = SG.img.logo;
    if (L && L.width) {
      // le logo tient dans la zone intérieure du cadre (entre y = 36 et y = H - 26)
      const hMax = H - 76, wMax = 190, e = Math.min(hMax / L.height, wMax / L.width);
      const lw = L.width * e, lh = L.height * e;
      ctx.drawImage(L, SG.W - 44 - lw, 78 - lh / 2, lw, lh);
    }
  }

  dessinerHUD(ctx) {
    // cœurs
    const n = this.vieMax / 4;
    for (let i = 0; i < n; i++) {
      const reste = SG.clamp((this.vie - i * 4) / 4, 0, 1);
      SG.dessinerCoeur(ctx, 40 + i * 44, 42, 38, reste);
    }
    // pixels
    SG.dessinerButin(ctx, 'pixel', 42, 92, 0.85);
    SG.texte(ctx, '× ' + this.pixels, 62, 102, 26, '#fff', 'left');
    if (this.fragments % 4) SG.texte(ctx, 'Fragments ' + (this.fragments % 4) + '/4', 140, 102, 20, '#ffd0dd', 'left');
    // clés du donjon
    if (this.estDonjon()) {
      const D = this.etatDonjon();
      SG.dessinerIcone(ctx, 'cle', 44, 140, 34);
      SG.texte(ctx, '× ' + D.cles, 66, 150, 24, '#fff', 'left');
      if (D.cleBoss) SG.dessinerIcone(ctx, 'cleBoss', 130, 140, 40);
    }
    // emplacements A et B, comme dans Zelda : pastille ronde claire, lettre blanche bien visible
    const case_ = (cx, lettre, type) => {
      const r = 46, cy = 58;
      ctx.save();
      ctx.fillStyle = 'rgba(4,12,30,0.75)';
      ctx.beginPath(); ctx.arc(cx, cy, r + 8, 0, 7); ctx.fill();
      ctx.lineWidth = 5; ctx.strokeStyle = '#2ad4ff';
      ctx.beginPath(); ctx.arc(cx, cy, r + 4, 0, 7); ctx.stroke();
      if (type) {
        const g = ctx.createRadialGradient(cx, cy, 4, cx, cy, r);
        g.addColorStop(0, '#ffffff'); g.addColorStop(0.7, '#d8f4ff'); g.addColorStop(1, '#8fd8ff');
        ctx.fillStyle = g; ctx.beginPath(); ctx.arc(cx, cy, r - 2, 0, 7); ctx.fill();
        SG.dessinerIcone(ctx, type, cx, cy + 2, 70);
      }
      // lettre dans une pastille en bas à gauche
      ctx.fillStyle = '#0a2a5a'; ctx.strokeStyle = '#ffffff'; ctx.lineWidth = 3;
      ctx.beginPath(); ctx.arc(cx - r + 6, cy + r - 6, 19, 0, 7); ctx.fill(); ctx.stroke();
      ctx.restore();
      SG.texte(ctx, lettre, cx - r + 6, cy + r + 4, 28, '#ffffff', 'center', '#000', 4, true);
    };
    case_(SG.W - 190, 'B', this.objetB);
    case_(SG.W - 70, 'A', this.ampli ? 'ampli' : null);
  }

  dessinerObjetBrandi(ctx) {
    const s = this.spirit, o = this.objet;
    const x = s.x, y = s.y - 158;
    const u = SG.clamp(o.t / 0.5, 0, 1);
    ctx.save();
    ctx.globalCompositeOperation = 'lighter';
    const g = ctx.createRadialGradient(x, y, 0, x, y, 90);
    g.addColorStop(0, `rgba(160,240,255,${0.45 * u})`);
    g.addColorStop(0.5, `rgba(60,170,255,${0.18 * u})`);
    g.addColorStop(1, 'rgba(0,80,200,0)');
    ctx.fillStyle = g; ctx.fillRect(x - 90, y - 90, 180, 180);
    // étincelles en forme d'étoile qui tournent autour de l'objet
    for (let i = 0; i < 7; i++) {
      const a = i / 7 * Math.PI * 2 + o.t * 1.2;
      const r = 50 + Math.sin(o.t * 3 + i) * 10;
      const px = x + Math.cos(a) * r, py = y + Math.sin(a) * r * 0.7;
      const b = (Math.sin(o.t * 6 + i * 1.7) + 1) / 2;
      const t = 4 + b * 7;
      ctx.fillStyle = `rgba(220,250,255,${(0.3 + b * 0.7) * u})`;
      ctx.beginPath();
      ctx.moveTo(px, py - t); ctx.quadraticCurveTo(px, py, px + t, py); ctx.quadraticCurveTo(px, py, px, py + t);
      ctx.quadraticCurveTo(px, py, px - t, py); ctx.quadraticCurveTo(px, py, px, py - t); ctx.fill();
    }
    ctx.restore();
    const flotte = Math.sin(o.t * 3) * 3;
    if (['coeur', 'pixel', 'pixels5', 'fragment'].includes(o.type)) SG.dessinerButin(ctx, o.type, x, y + 10 + flotte, 1.3);
    else SG.dessinerIcone(ctx, o.type, x, y + flotte, 80);
  }

  dessinerDialogue(ctx) {
    const d = this.dlg;
    const [qui, texte] = d.lignes[d.i];
    const x = 50, y = SG.H - 214, w = SG.W - 100, h = 196;
    SG.cadre(ctx, SG.img['ui-dialogue'], x, y, w, h, 110, 44);
    let tx = x + 50;
    if (qui) {
      const parle = d.car < texte.length && Math.floor(this.t * 8) % 2 === 0;
      const portraits = { spirit: parle ? 'portrait-spirit-parle' : 'portrait-spirit', ermite: 'portrait-ermite', flash: 'portrait-flash', lynx: 'portrait-lynx', gus: 'portrait-gus' };
      const im = SG.img[portraits[qui]];
      const px = x + 22, py = y - 62, pw = 214, ph = 214;
      SG.cadre(ctx, SG.img['ui-portrait'], px, py, pw, ph, 200, 38);
      ctx.save();
      ctx.beginPath(); ctx.roundRect(px + 26, py + 26, pw - 52, ph - 52, 10); ctx.clip();
      if (im && im.width) SG.dessinerPied(ctx, im, px + pw / 2, py + ph - 20, { echelle: 0.8 });
      else if (qui === 'flash') { ctx.translate(px + pw / 2, py + ph / 2 + 60); ctx.scale(1.3, 1.3); new SG.Flash(0, 0).dessiner(ctx); }
      ctx.restore();
      SG.texte(ctx, { spirit: 'Spirit', ermite: 'L\'ermite', flash: 'Flash', lynx: 'Mika', gus: 'Gus' }[qui], x + 262, y + 58, 30, '#7fe8ff', 'left', null, null, true);
      tx = x + 262;
    }
    SG.texteMultiligne(ctx, texte.slice(0, Math.floor(d.car)), tx, y + (qui ? 96 : 80), w - (tx - x) - 70, 26, 34, '#ffffff');
    if (d.car >= texte.length) {
      const b2 = Math.sin(this.t * 6) * 3;
      SG.texte(ctx, '▼', x + w - 58, y + h - 36 + b2, 24, '#7fe8ff', 'center');
    }
  }

  // petite carte de la Plaine sur le parchemin
  vignette(cle) {
    if (!this.vignettes) this.vignettes = {};
    if (this.vignettes[cle]) return this.vignettes[cle];
    const cv = document.createElement('canvas');
    cv.width = 320; cv.height = 180;
    const c = cv.getContext('2d');
    c.scale(0.25, 0.25);
    c.drawImage(this.fond(cle), 0, 0, SG.W, SG.H);
    const avant = [this.ecran, this.coupes];
    this.ecran = cle; this.coupes = new Set();
    const liste = [];
    this.objetsDecor(liste);
    [this.ecran, this.coupes] = avant;
    liste.sort((p, q) => p.y - q.y);
    for (const o of liste) o.dessiner(c);
    this.vignettes[cle] = cv;
    return cv;
  }

  dessinerCarte(ctx, x, y, w, h) {
    ctx.drawImage(SG.img['ui-parchemin'], x, y, w, h);
    const ch = h * 0.24, cw = ch * 16 / 9;
    const ox = x + (w - cw * 3) / 2, oy = y + (h - ch * 3) / 2 + h * 0.03;
    for (const cle in SG.MONDE) {
      const [cx, cy] = cle.split(',').map(Number);
      const vx = ox + cx * cw, vy = oy + cy * ch;
      if (this.visites && this.visites.has(cle)) {
        ctx.save();
        ctx.filter = 'sepia(0.55) saturate(0.85) brightness(1.05)';
        ctx.globalAlpha = 0.92;
        ctx.drawImage(this.vignette(cle), vx, vy, cw, ch);
        ctx.restore();
      } else {
        ctx.save();
        ctx.fillStyle = 'rgba(120,85,40,0.12)';
        ctx.fillRect(vx + 3, vy + 3, cw - 6, ch - 6);
        SG.texte(ctx, '?', vx + cw / 2, vy + ch / 2 + 12, 34, 'rgba(110,75,35,0.55)', 'center', 'rgba(0,0,0,0)', 1, true);
        ctx.restore();
      }
      ctx.strokeStyle = 'rgba(90,55,20,0.55)'; ctx.lineWidth = 2;
      ctx.strokeRect(vx, vy, cw, ch);
    }
    // la grotte
    if (this.visites && this.visites.has('1,2')) {
      const gx = ox + cw + 3.5 * 80 * cw / SG.W, gy = oy + 2 * ch + 1.2 * 80 * ch / SG.H;
      ctx.fillStyle = '#3a2410'; ctx.beginPath(); ctx.arc(gx, gy, 6, 0, Math.PI * 2); ctx.fill();
    }
    // Spirit
    const ici = this.ecran === 'grotte' ? SG.SORTIE_GROTTE.ecran : this.ecran;
    const [ex, ey] = ici.split(',').map(Number);
    const sx = this.ecran === 'grotte' ? SG.SORTIE_GROTTE.x : this.spirit.x;
    const sy = this.ecran === 'grotte' ? SG.SORTIE_GROTTE.y : this.spirit.y;
    const mx = ox + ex * cw + sx / SG.W * cw, my = oy + ey * ch + sy / SG.H * ch;
    const p = 1 + Math.sin(this.t * 6) * 0.25;
    ctx.save();
    ctx.fillStyle = 'rgba(220,30,40,0.35)'; ctx.beginPath(); ctx.arc(mx, my, 13 * p, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#d8202e'; ctx.strokeStyle = '#3a0a0a'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.arc(mx, my, 6, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
    ctx.restore();
    SG.texte(ctx, 'Plaine des Pixels', x + w / 2, y + h * 0.11, Math.round(h * 0.06), '#5a3810', 'center', 'rgba(255,240,200,0.8)', 4, true);
  }

  dessinerPause(ctx) {
    ctx.fillStyle = 'rgba(3,8,20,0.7)';
    ctx.fillRect(0, 0, SG.W, SG.H);
    SG.cadre(ctx, SG.img['ui-panneau'], 30, 24, SG.W - 60, SG.H - 48, 150, 60);
    SG.texte(ctx, 'OBJETS', SG.W / 2, 78, 40, '#ffffff', 'center', '#0a2a5a', 6, true);
    const objets = this.listeObjets();
    const taille = 112;
    objets.forEach((type, i) => {
      const x = 100 + (i % 3) * 134, y = 112 + Math.floor(i / 3) * 156;
      const sel = this.focusPause !== 'boutons' && i === this.selObjet;
      ctx.save(); if (!type && !sel) ctx.globalAlpha = 0.45;
      SG.cadre(ctx, SG.img['ui-portrait'], x, y, taille, taille, 200, 26);
      ctx.restore();
      if (sel) {
        ctx.save(); ctx.globalCompositeOperation = 'lighter'; ctx.strokeStyle = `rgba(120,230,255,${0.6 + Math.sin(this.t * 6) * 0.3})`; ctx.lineWidth = 5;
        ctx.beginPath(); ctx.roundRect(x - 4, y - 4, taille + 8, taille + 8, 16); ctx.stroke(); ctx.restore();
      }
      if (type) {
        const g = ctx.createRadialGradient(x + taille / 2, y + taille / 2, 4, x + taille / 2, y + taille / 2, taille * 0.42);
        g.addColorStop(0, '#ffffff'); g.addColorStop(0.7, '#d8f4ff'); g.addColorStop(1, '#8fd8ff');
        ctx.fillStyle = g; ctx.beginPath(); ctx.roundRect(x + 20, y + 20, taille - 40, taille - 40, 10); ctx.fill();
        SG.dessinerIcone(ctx, type, x + taille / 2, y + taille / 2, 72);
        const O = SG.OBJETS[type];
        const equipe = type === 'ampli' || this.objetB === type;
        SG.texte(ctx, O.nom + (equipe ? ' (' + O.touche + ')' : ''), x + taille / 2, y + taille + 24, 17, equipe ? '#7fe8ff' : '#cfe8ff', 'center');
      }
    });
    // description de l'objet sélectionné
    const type = objets[this.selObjet || 0];
    const px = 540;
    if (type) {
      const O = SG.OBJETS[type];
      SG.texte(ctx, O.nom, px, 150, 28, '#7fe8ff', 'left', null, null, true);
      SG.texte(ctx, 'Bouton ' + O.touche, px, 182, 20, '#ffd23a', 'left');
      SG.texteMultiligne(ctx, O.texte, px, 220, 290, 19, 27, '#e8f2ff');
      if (type !== 'ampli' && this.objetB !== type) SG.texte(ctx, 'Espace : équiper sur B', px, 350, 18, '#ffd23a', 'left');
    } else {
      SG.texte(ctx, '?', px, 150, 28, '#7fa0c0', 'left', null, null, true);
      SG.texteMultiligne(ctx, 'Un objet t\'attend au fond d\'un donjon. Chaque objet ouvre de nouveaux passages dans le monde.', px, 190, 290, 19, 27, '#9fb4d0');
    }
    // équipement actuel, en grand
    const eq = (cx, lettre, t) => {
      const r = 40, cy = 430;
      ctx.fillStyle = 'rgba(4,12,30,0.8)'; ctx.beginPath(); ctx.arc(cx, cy, r + 6, 0, 7); ctx.fill();
      ctx.strokeStyle = '#2ad4ff'; ctx.lineWidth = 4; ctx.beginPath(); ctx.arc(cx, cy, r + 3, 0, 7); ctx.stroke();
      if (t) {
        const g = ctx.createRadialGradient(cx, cy, 4, cx, cy, r);
        g.addColorStop(0, '#ffffff'); g.addColorStop(1, '#8fd8ff');
        ctx.fillStyle = g; ctx.beginPath(); ctx.arc(cx, cy, r - 2, 0, 7); ctx.fill();
        SG.dessinerIcone(ctx, t, cx, cy + 2, 60);
      }
      SG.texte(ctx, lettre, cx, cy - r - 12, 26, '#ffffff', 'center', '#000', 4, true);
    };
    eq(px + 60, 'B', this.objetB);
    eq(px + 200, 'A', this.ampli ? 'ampli' : null);
    // état de Spirit
    SG.dessinerCoeur(ctx, px + 16, 520, 40, 0.25 * (this.fragments % 4));
    SG.texte(ctx, `Fragments de cœur : ${this.fragments % 4}/4`, px + 46, 528, 19, '#fff', 'left');
    SG.dessinerButin(ctx, 'pixel', px + 16, 560, 0.85);
    SG.texte(ctx, `Pixels : ${this.pixels}`, px + 46, 568, 19, '#fff', 'left');
    SG.dessinerIcone(ctx, 'source', px + 16, 598, 30);
    SG.texte(ctx, `Fragments de Source : ${this.source || 0}/8`, px + 46, 606, 19, '#fff', 'left');
    const opts = ['Reprendre', 'Carte', SG.Son.muet ? 'Activer le son' : 'Couper le son', 'Plein écran', 'Retour au titre'];
    opts.forEach((o, i) => SG.boutonMenu(ctx, o, 1025, 170 + i * 84, this.focusPause === 'boutons' && i === this.menuChoix, 330));
    SG.texte(ctx, 'Flèches : choisir    Tab : carte', 1025, 640, 17, '#9fc4e8', 'center');
  }

  dessinerEcranCarte(ctx) {
    ctx.fillStyle = 'rgba(3,8,20,0.8)';
    ctx.fillRect(0, 0, SG.W, SG.H);
    if (this.estDonjon()) this.dessinerCarteDonjon(ctx, 70, 40, SG.W - 140, 610);
    else this.dessinerCarte(ctx, 70, 40, SG.W - 140, 610);
    const lieu = this.ecran === 'grotte' ? 'La grotte de l\'ermite' : this.estDonjon() ? this.salle().nom : SG.MONDE[this.ecran].nom;
    SG.texte(ctx, 'Tu es ici : ' + lieu, SG.W / 2, 695, 22, '#ffffff', 'center');
  }

  dessinerFin(ctx) {
    const u = SG.clamp(this.tFin / 1.2, 0, 1);
    ctx.fillStyle = `rgba(20,0,30,${0.85 * u})`;
    ctx.fillRect(0, 0, SG.W, SG.H);
    const F = SG.img['fin-de-partie'];
    if (F && F.width) { ctx.save(); ctx.globalAlpha = u; ctx.drawImage(F, 0, 0, SG.W, SG.H); ctx.restore(); }
    if (u < 1) return;
    ctx.fillStyle = 'rgba(10,0,20,0.55)'; ctx.fillRect(0, 520, SG.W, 200);
    SG.texte(ctx, 'Spirit est à plat...', SG.W / 2, 600, 56, '#fff', 'center');
    SG.texte(ctx, this.estDonjon() ? 'Appuie sur A pour repartir de l\'entrée du donjon' : 'Appuie sur A pour repartir de la Clairière', SG.W / 2, 666, 28, '#2ad4ff', 'center');
  }

  dessinerChargement(ctx) {
    ctx.fillStyle = '#0b1530'; ctx.fillRect(0, 0, SG.W, SG.H);
    SG.texte(ctx, 'Chargement...', SG.W / 2, 330, 36, '#fff', 'center');
    ctx.strokeStyle = '#2ad4ff'; ctx.lineWidth = 4;
    ctx.strokeRect(390, 380, 500, 30);
    ctx.fillStyle = '#2ad4ff'; ctx.fillRect(396, 386, 488 * this.chargement, 18);
  }

  dessinerTitre(ctx) {
    // illustration avec un très léger zoom lent
    const F = SG.img['titre-fond'];
    const z = 1.03 + Math.sin(this.t * 0.15) * 0.02;
    ctx.drawImage(F, SG.W / 2 - SG.W * z / 2, SG.H / 2 - SG.H * z / 2, SG.W * z, SG.H * z);
    // lueur de la tour qui pulse
    ctx.save();
    ctx.globalCompositeOperation = 'lighter';
    const tx = 885, ty = 242, a = 0.18 + Math.sin(this.t * 2.2) * 0.1;
    const g = ctx.createRadialGradient(tx, ty, 0, tx, ty, 90);
    g.addColorStop(0, `rgba(90,230,255,${a})`); g.addColorStop(1, 'rgba(0,120,255,0)');
    ctx.fillStyle = g; ctx.fillRect(tx - 90, ty - 90, 180, 180);
    // éclats violets qui tombent de la faille
    if (!this.eclatsTitre) this.eclatsTitre = [];
    if (Math.random() < 0.25) this.eclatsTitre.push({ x: SG.hasard(760, 1260), y: SG.hasard(0, 120), v: SG.hasard(30, 70), r: SG.hasard(3, 7), a: Math.random() * 6 });
    for (const e of this.eclatsTitre) {
      e.y += e.v / 60; e.x -= e.v / 200; e.a += 0.03;
      ctx.save(); ctx.translate(e.x, e.y); ctx.rotate(e.a);
      ctx.fillStyle = 'rgba(200,120,255,0.8)';
      ctx.beginPath(); ctx.moveTo(0, -e.r * 1.6); ctx.lineTo(e.r * 0.6, 0); ctx.lineTo(0, e.r * 1.6); ctx.lineTo(-e.r * 0.6, 0); ctx.closePath(); ctx.fill();
      ctx.restore();
    }
    this.eclatsTitre = this.eclatsTitre.filter((e) => e.y < 520);
    ctx.restore();
    // voile sombre en bas pour les boutons
    const v = ctx.createLinearGradient(0, 380, 0, SG.H);
    v.addColorStop(0, 'rgba(4,10,30,0)'); v.addColorStop(1, 'rgba(4,10,30,0.6)');
    ctx.fillStyle = v; ctx.fillRect(0, 380, SG.W, SG.H - 380);
    const L = SG.img.logo;
    if (L && L.width) { const lw = 560, lh = lw * L.height / L.width; ctx.drawImage(L, 330 - lw / 2, 20 + Math.sin(this.t * 1.5) * 4, lw, lh); }
    const opts = this.optionsTitre();
    opts.forEach((o, i) => SG.boutonMenu(ctx, o, SG.W / 2, 470 + i * 76, i === this.menuChoix, 360));
    SG.texte(ctx, 'Flèches ou ZQSD : bouger    Espace : action    Entrée : objets    Tab : carte    F : plein écran    M : son', SG.W / 2, 706, 17, '#dbe8f8', 'center');
  }

  dessinerMode(ctx) {
    ctx.drawImage(this.fond(SG.ECRAN_DEPART), 0, 0, SG.W, SG.H);
    ctx.fillStyle = 'rgba(5,15,40,0.8)'; ctx.fillRect(0, 0, SG.W, SG.H);
    SG.texte(ctx, 'Choisis ta difficulté', SG.W / 2, 150, 54, '#fff', 'center', '#0a2a5a', 8, true);
    const modes = [
      ['Héros', ['Le jeu tel qu\'il est pensé :', 'les monstres font vraiment mal.', 'Pour les joueurs qui aiment', 'le défi.']],
      ['Découverte', ['Les monstres font moitié', 'moins de dégâts.', 'Pour profiter de l\'aventure', 'sans rester bloqué.']],
    ];
    modes.forEach(([nom, lignes], i) => {
      const x = 170 + i * 490, y = 200, sel = i === this.menuChoix;
      ctx.save();
      if (!sel) ctx.globalAlpha = 0.7;
      SG.cadre(ctx, SG.img['ui-panneau'], x, y, 450, 400, 150, 44);
      const ill = SG.img[i === 0 ? 'mode-heros' : 'mode-decouverte'];
      if (ill && ill.width) {
        ctx.save(); ctx.beginPath(); ctx.roundRect(x + 145, y + 34, 160, 160, 14); ctx.clip();
        ctx.drawImage(ill, x + 145, y + 34, 160, 160); ctx.restore();
        ctx.strokeStyle = sel ? '#7fe8ff' : '#3a5a8a'; ctx.lineWidth = 3; ctx.beginPath(); ctx.roundRect(x + 145, y + 34, 160, 160, 14); ctx.stroke();
      }
      ctx.restore();
      SG.texte(ctx, nom, x + 225, y + 245, 42, sel ? '#7fe8ff' : '#fff', 'center', null, null, true);
      lignes.forEach((l, j) => SG.texte(ctx, l, x + 225, y + 285 + j * 27, 21, '#dde', 'center'));
    });
    SG.texte(ctx, 'Gauche / droite pour choisir, Espace pour valider', SG.W / 2, 640, 24, '#aabbcc', 'center');
  }

  dessinerIntro(ctx) {
    ctx.fillStyle = '#06091a'; ctx.fillRect(0, 0, SG.W, SG.H);
    const i = Math.min(this.intro.i, SG.TEXTES.intro.length - 1);
    const a = SG.clamp(this.intro.t * 2, 0, 1);
    const ill = SG.img[{ 1: 'intro-2', 2: 'intro-3' }[i]];
    ctx.save(); ctx.globalAlpha = a;
    if (ill && ill.width) {
      // illustration plein écran, légère avancée, texte sur un bandeau sombre en bas
      const z = 1 + this.intro.t * 0.01;
      ctx.drawImage(ill, SG.W / 2 - SG.W * z / 2, SG.H / 2 - SG.H * z / 2, SG.W * z, SG.H * z);
      const g = ctx.createLinearGradient(0, 430, 0, SG.H);
      g.addColorStop(0, 'rgba(6,9,26,0)'); g.addColorStop(0.35, 'rgba(6,9,26,0.85)'); g.addColorStop(1, 'rgba(6,9,26,0.95)');
      ctx.fillStyle = g; ctx.fillRect(0, 430, SG.W, SG.H - 430);
      SG.texteMultiligne(ctx, SG.TEXTES.intro[i], SG.W / 2, 560, 1000, 32, 44, '#ffffff', 'center');
    } else SG.texteMultiligne(ctx, SG.TEXTES.intro[i], SG.W / 2, 300, 900, 36, 52, '#ffffff', 'center');
    ctx.restore();
    SG.texte(ctx, 'Espace pour continuer    Entrée pour passer', SG.W / 2, 660, 22, '#6f86a8', 'center');
  }
};

// ---------------------------------------------------------------- texte
SG.POLICE = '"Nunito", "Trebuchet MS", "Segoe UI", Verdana, sans-serif';
SG.POLICE_TITRE = '"Lilita One", "Trebuchet MS", Verdana, sans-serif';
SG.texte = function (ctx, t, x, y, taille, couleur, align, contour, ep, titre) {
  ctx.save();
  ctx.font = titre ? `${taille}px ${SG.POLICE_TITRE}` : `800 ${taille}px ${SG.POLICE}`;
  ctx.textAlign = align || 'left';
  ctx.textBaseline = 'alphabetic';
  ctx.lineJoin = 'round';
  ctx.strokeStyle = contour || 'rgba(0,0,0,0.85)';
  ctx.lineWidth = ep || Math.max(3, taille / 7);
  ctx.strokeText(t, x, y);
  ctx.fillStyle = couleur;
  ctx.fillText(t, x, y);
  ctx.restore();
};
SG.decouperTexte = function (t, largeurMax, taille, maxLignes) {
  const c = document.createElement('canvas').getContext('2d');
  c.font = `800 ${taille}px ${SG.POLICE}`;
  const lignes = [];
  let l = '';
  for (const m of t.split(' ')) {
    const essai = l ? l + ' ' + m : m;
    if (c.measureText(essai).width > largeurMax && l) { lignes.push(l); l = m; } else l = essai;
  }
  if (l) lignes.push(l);
  const pages = [];
  for (let i = 0; i < lignes.length; i += maxLignes) pages.push(lignes.slice(i, i + maxLignes).join(' '));
  return pages.length ? pages : [''];
};
SG.texteMultiligne = function (ctx, t, x, y, largeurMax, taille, interligne, couleur, align) {
  ctx.save();
  ctx.font = `800 ${taille}px ${SG.POLICE}`;
  const mots = t.split(' ');
  const lignes = [];
  let l = '';
  for (const m of mots) {
    const essai = l ? l + ' ' + m : m;
    if (ctx.measureText(essai).width > largeurMax && l) { lignes.push(l); l = m; } else l = essai;
  }
  if (l) lignes.push(l);
  ctx.restore();
  lignes.forEach((li, i) => SG.texte(ctx, li, x, y + i * interligne, taille, couleur, align || 'left'));
};
SG.boutonMenu = function (ctx, t, x, y, actif, largeur) {
  const w = largeur || 380, h = 68;
  const im = SG.img[actif ? 'ui-bouton-actif' : 'ui-bouton'];
  SG.bouton3(ctx, im, x - w / 2, y - h / 2, w, h, 190);
  SG.texte(ctx, t, x, y + 10, 28, actif ? '#ffffff' : '#b8d4f0', 'center', '#04122e', 5, true);
};

// cadre en 9 parties : les coins gardent leur taille, les bords et le centre s'étirent
SG.cadre = function (ctx, im, x, y, w, h, bs, bd) {
  if (!im || !im.width) return;
  const W = im.width, H = im.height;
  const xs = [0, bs, W - bs, W], ys = [0, bs, H - bs, H];
  const xd = [x, x + bd, x + w - bd, x + w], yd = [y, y + bd, y + h - bd, y + h];
  for (let i = 0; i < 3; i++) for (let j = 0; j < 3; j++) {
    const sw = xs[i + 1] - xs[i], sh = ys[j + 1] - ys[j], dw = xd[i + 1] - xd[i], dh = yd[j + 1] - yd[j];
    if (sw > 0 && sh > 0 && dw > 0 && dh > 0) ctx.drawImage(im, xs[i], ys[j], sw, sh, xd[i], yd[j], dw, dh);
  }
};

// bouton en 3 parties horizontales
SG.bouton3 = function (ctx, im, x, y, w, h, bs) {
  if (!im || !im.width) return;
  const k = h / im.height, bd = bs * k;
  ctx.drawImage(im, 0, 0, bs, im.height, x, y, bd, h);
  ctx.drawImage(im, bs, 0, im.width - bs * 2, im.height, x + bd, y, w - bd * 2, h);
  ctx.drawImage(im, im.width - bs, 0, bs, im.height, x + w - bd, y, bd, h);
};

// ---------------------------------------------------------------- démarrage
document.addEventListener('DOMContentLoaded', () => {
  const canevas = document.getElementById('jeu');
  const jeu = new SG.Jeu(canevas);
  SG.jeu = jeu;
  SG.Commandes.init(canevas);
  if (window.matchMedia && window.matchMedia('(pointer: coarse)').matches) document.body.classList.add('tactile');
  let avant = performance.now();
  const boucle = (maintenant) => {
    const dt = Math.min(0.05, (maintenant - avant) / 1000);
    avant = maintenant;
    jeu.maj(dt);
    jeu.dessiner();
    requestAnimationFrame(boucle);
  };
  requestAnimationFrame(boucle);
  SG.chargerImages((p) => { jeu.chargement = p; }).then(() => { jeu.allerTitre(); });
});
