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
    const ratio = SG.W / SG.H;
    let w = window.innerWidth, h = window.innerHeight;
    if (w / h > ratio) w = h * ratio; else h = w / ratio;
    this.canevas.style.width = w + 'px';
    this.canevas.style.height = h + 'px';
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.echelle = Math.min(2, (w * dpr) / SG.W);
    this.canevas.width = Math.round(SG.W * this.echelle);
    this.canevas.height = Math.round(SG.H * this.echelle);
    this.fonds = {};
  }

  // ------------------------------------------------------------ sauvegarde
  static lireSauvegarde() {
    try { const s = localStorage.getItem('spirit-sauvegarde'); return s ? JSON.parse(s) : null; } catch (e) { return null; }
  }
  sauver() {
    const s = {
      mode: this.mode, vieMax: this.vieMax, pixels: this.pixels, ampli: this.ampli,
      fragments: this.fragments, secrets: [...this.secretsPris], ecran: this.ecran === 'grotte' ? SG.SORTIE_GROTTE.ecran : this.ecran,
      x: this.ecran === 'grotte' ? SG.SORTIE_GROTTE.x : this.spirit.x, y: this.ecran === 'grotte' ? SG.SORTIE_GROTTE.y : this.spirit.y,
      ermiteVu: this.ermiteVu, visites: [...(this.visites || [])],
    };
    try { localStorage.setItem('spirit-sauvegarde', JSON.stringify(s)); } catch (e) { /* stockage indisponible */ }
  }

  nouvellePartie(mode) {
    this.mode = mode;
    this.vieMax = 12; this.vie = 12;          // la vie se compte en quarts de cœur
    this.pixels = 0; this.ampli = false; this.fragments = 0;
    this.secretsPris = new Set();
    this.ermiteVu = 0;
    this.visites = new Set();
    this.spirit = new SG.Spirit(SG.DEPART.x, SG.DEPART.y);
    this.spirit.dir = 'haut';
    this.entrerEcran(SG.ECRAN_DEPART);
    this.sauver();
  }

  continuer(s) {
    this.mode = s.mode; this.vieMax = s.vieMax; this.vie = s.vieMax;
    this.pixels = s.pixels; this.ampli = s.ampli; this.fragments = s.fragments;
    this.secretsPris = new Set(s.secrets || []);
    this.ermiteVu = s.ermiteVu || 0;
    this.visites = new Set(s.visites || []);
    this.spirit = new SG.Spirit(s.x, s.y);
    this.entrerEcran(SG.MONDE[s.ecran] ? s.ecran : SG.ECRAN_DEPART);
    this.etat = 'jeu';
    SG.Son.jouerMusique(this.ecran === 'grotte' ? 'grotte' : 'plaine');
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
    if (cle !== 'grotte') { if (!this.visites) this.visites = new Set(); this.visites.add(cle); }
    this.coupes = new Set();
    this.effets = []; this.projectiles = []; this.butins = []; this.monstres = []; this.pnj = [];
    if (cle === 'grotte') {
      this.pnj.push(new SG.Ermite(SG.GROTTE.ermite.x, SG.GROTTE.ermite.y));
      this.feux = [new SG.Feu(641, 352, 1.6), new SG.Feu(436, 88, 0.8), new SG.Feu(838, 88, 0.8)];
      SG.Son.jouerMusique('grotte');
      return;
    }
    SG.Son.jouerMusique('plaine');
    const e = SG.MONDE[cle];
    for (const [type, c, r] of e.ennemis || []) {
      const m = SG.creerMonstre(type, c * SG.T + 40, r * SG.T + 62);
      m.apparition = 0; // apparition désactivée en attendant les images de faille
      this.placerLibre(m);
      this.monstres.push(m);
    }
    // les secrets déjà trouvés n'apparaissent plus, et leur buisson non plus
    for (const k in e.secrets || {}) if (this.secretsPris.has(cle + ':' + k)) this.coupes.add(k);
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

  caseEn(c, r) {
    if (this.ecran === 'grotte') return '.';
    const e = SG.MONDE[this.ecran];
    if (r < 0 || r >= SG.ROWS || c < 0 || c >= SG.COLS) return null;
    const ch = e.carte[r][c];
    if (SG.CASES_DESTRUCTIBLES.has(ch) && this.coupes.has(c + ',' + r)) return '.';
    return ch;
  }

  voisin(dir) {
    if (this.ecran === 'grotte') return null;
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
        if (SG.CASES_PLEINES.has(ch)) return true;
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
    return ch !== null && ch !== '~' && SG.CASES_PLEINES.has(ch);
  }

  // l'onde touche monstres, buissons et herbes dans la zone
  frapperZone(zone, degats, sx, sy) {
    for (const m of this.monstres) if (!m.mort && SG.boitesSeTouchent(zone, m.corps())) m.toucher(this, degats, sx, sy);
    for (const p of this.projectiles) if (!p.ami && SG.boitesSeTouchent(zone, p.boite())) { p.fini = true; this.effets.push(p instanceof SG.Pierre ? new SG.EclatPierre(p.x, p.y) : new SG.Eclat(p.x, p.y)); }
    this.couperDecor(zone);
  }

  // coupe les buissons et hautes herbes dans la zone ; renvoie le nombre de cases coupées
  couperDecor(zone) {
    if (this.ecran === 'grotte') return 0;
    let n = 0;
    const e = SG.MONDE[this.ecran];
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
        this.effets.push(new SG.Feuilles(c * SG.T + 40, r * SG.T + 50));
        SG.Son.effet('feuilles');
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
    else if (b.type === 'fragment') {
      this.fragments++;
      if (this.fragments % 4 === 0) { this.vieMax += 4; }
      this.vie = this.vieMax;
      this.montrerObjet('fragment', SG.TEXTES.fragment(this.fragments));
    }
    if (b.cleSecret) { this.secretsPris.add(b.cleSecret); this.sauver(); }
  }

  // ------------------------------------------------------------ dialogues et objets
  dialogue(lignes, ensuite) {
    this.dlg = { lignes, i: 0, car: 0, ensuite };
    this.etat = 'dialogue';
  }

  montrerObjet(type, texte, ensuite) {
    this.objet = { type, texte, t: 0, ensuite };
    this.spirit.brandit = true;
    this.spirit.dir = 'bas';
    this.etat = 'objet';
    this.dlg = { lignes: [[null, texte]], i: 0, car: 0 };
    SG.Son.effet('objet');
  }

  parler() {
    const s = this.spirit, d = SG.DIRS[s.dir];
    const px = s.x + d.x * 50, py = s.y - 20 + d.y * 50;
    for (const p of this.pnj) {
      if (SG.dist(px, py, p.x, p.y - 30) < 90) {
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
    if (this.ecran !== 'grotte') {
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
    c.width = this.canevas.width; c.height = this.canevas.height;
    const x = c.getContext('2d');
    x.setTransform(this.echelle, 0, 0, this.echelle, 0, 0);
    this.dessinerScene(x);
    return c;
  }

  glisserVers(dir) {
    const cle = this.voisin(dir);
    const avant = this.capturer();
    const s = this.spirit;
    if (dir === 'gauche') s.x = SG.W - s.pw / 2 - 2;
    if (dir === 'droite') s.x = s.pw / 2 + 2;
    if (dir === 'haut') s.y = SG.H - 4;
    if (dir === 'bas') s.y = s.ph + 4;
    s.recul = null;
    this.entrerEcran(cle);
    const apres = this.capturer();
    this.transition = { type: 'glisse', dir, avant, apres, t: 0, duree: 0.55 };
    this.etat = 'transition';
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
    if (C.appuis.menu) { this.etat = 'pause'; this.menuChoix = 0; SG.Son.effet('choix'); return; }
    if (C.appuis.carte) { this.etat = 'carte'; SG.Son.effet('choix'); return; }
    if (C.appuis.A) {
      if (!this.parler()) {
        if (this.ampli) s.attaquer(this);
        else if (!this.dejaPrevenu && this.ecran !== 'grotte') { this.dejaPrevenu = true; this.dialogue([[null, SG.TEXTES.sansAmpli]]); return; }
      }
    }
    s.maj(this, dt);
    for (const m of this.monstres) if (!m.mort) m.maj(this, dt);
    this.monstres = this.monstres.filter((m) => !m.mort);
    for (const p of this.projectiles) p.maj(this, dt);
    this.projectiles = this.projectiles.filter((p) => !p.fini);
    for (const b of this.butins) b.maj(this, dt);
    this.butins = this.butins.filter((b) => !b.fini);
    for (const e of this.effets) e.maj(this, dt);
    this.effets = this.effets.filter((e) => !e.fini);
    for (const p of this.pnj) p.maj(this, dt);
    if (this.ecran === 'grotte' && this.feux) for (const f of this.feux) f.maj(dt);
    if (this.etat !== 'jeu') return;

    // sorties d'écran et grotte
    if (this.ecran === 'grotte') {
      if (s.y > SG.H - 60) this.fonduVers(() => {
        this.spirit.x = SG.SORTIE_GROTTE.x; this.spirit.y = SG.SORTIE_GROTTE.y; this.spirit.dir = 'bas';
        this.entrerEcran(SG.SORTIE_GROTTE.ecran);
      });
      return;
    }
    const c = Math.floor(s.x / SG.T), r = Math.floor((s.y - 6) / SG.T);
    if (this.caseEn(c, r) === 'E' && s.dir === 'haut') {
      this.fonduVers(() => {
        this.entrerEcran('grotte');
        this.spirit.x = SG.GROTTE.entree.x; this.spirit.y = SG.GROTTE.entree.y; this.spirit.dir = 'haut';
      });
      return;
    }
    if (s.x < 4 && this.voisin('gauche')) this.glisserVers('gauche');
    else if (s.x > SG.W - 4 && this.voisin('droite')) this.glisserVers('droite');
    else if (s.y - s.ph < 2 && this.voisin('haut')) this.glisserVers('haut');
    else if (s.y > SG.H - 2 && this.voisin('bas')) this.glisserVers('bas');
    else { s.x = SG.clamp(s.x, s.pw / 2, SG.W - s.pw / 2); s.y = SG.clamp(s.y, s.ph, SG.H); }
  }

  majFeux(dt) { if (this.ecran === 'grotte' && this.feux) for (const f of this.feux) f.maj(dt); }

  majTransition(dt) {
    const tr = this.transition;
    tr.t += dt;
    if (tr.type === 'fondu' && !tr.fait && tr.t >= tr.duree / 2) { tr.fait = true; tr.action(); }
    if (tr.t >= tr.duree) { this.transition = null; this.etat = 'jeu'; }
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
    const zones = [0, 1].map((i) => ({ x: 170 + i * 490, y: 250, w: 450, h: 300 }));
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

  majPause(C, clics) {
    const opts = ['Reprendre', 'Carte', SG.Son.muet ? 'Activer le son' : 'Couper le son', 'Plein écran', 'Retour au titre'];
    const zones = opts.map((_, i) => ({ x: 860, y: 170 + i * 84 - 34, w: 330, h: 68 }));
    if (C.appuis.carte) { this.etat = 'carte'; return; }
    if (C.appuis.menu && clics.length === 0) { this.etat = 'jeu'; return; }
    const choix = this.choixMenu({ appuis: { ...C.appuis, menu: false } }, clics, opts.length, zones);
    if (choix < 0) return;
    SG.Son.effet('valide');
    if (choix === 0) this.etat = 'jeu';
    else if (choix === 1) this.etat = 'carte';
    else if (choix === 2) SG.Son.basculer();
    else if (choix === 3) SG.pleinEcran();
    else if (choix === 4) { this.sauver(); this.allerTitre(); }
  }

  majFin(dt, C, clics) {
    this.tFin += dt;
    if (this.tFin < 1.2) return;
    if (C.appuis.A || clics.length) {
      SG.Son.effet('valide');
      this.vie = this.vieMax;
      this.spirit = new SG.Spirit(SG.DEPART.x, SG.DEPART.y);
      this.entrerEcran(SG.ECRAN_DEPART);
      this.etat = 'jeu';
    }
  }

  allerTitre() {
    this.etat = 'titre'; this.menuChoix = 0;
    SG.Son.jouerMusique('titre');
  }

  // ------------------------------------------------------------ dessin
  dessiner() {
    const ctx = this.ctx;
    ctx.setTransform(this.echelle, 0, 0, this.echelle, 0, 0);
    ctx.imageSmoothingQuality = 'high';
    switch (this.etat) {
      case 'chargement': this.dessinerChargement(ctx); return;
      case 'titre': this.dessinerTitre(ctx); return;
      case 'mode': this.dessinerMode(ctx); return;
      case 'intro': this.dessinerIntro(ctx); return;
    }
    if (this.etat === 'transition' && this.transition.type === 'glisse') {
      const tr = this.transition, u = SG.clamp(tr.t / tr.duree, 0, 1);
      const e = u < 0.5 ? 2 * u * u : 1 - Math.pow(-2 * u + 2, 2) / 2;
      const d = SG.DIRS[tr.dir];
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      const W = this.canevas.width, H = this.canevas.height;
      ctx.drawImage(tr.avant, -d.x * W * e, -d.y * H * e);
      ctx.drawImage(tr.apres, d.x * W * (1 - e), d.y * H * (1 - e));
      ctx.setTransform(this.echelle, 0, 0, this.echelle, 0, 0);
      this.dessinerHUD(ctx);
      return;
    }
    this.dessinerScene(ctx);
    this.dessinerHUD(ctx);
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

  dessinerScene(ctx) {
    if (this.ecran === 'grotte') {
      ctx.drawImage(SG.img.grotte, 0, 0, SG.W, SG.H);
      if (!this.ampli) {
        // l'Ampli posé près de l'ermite, qui brille
        const b = Math.sin(this.t * 4) * 4;
        ctx.save(); ctx.globalAlpha = 0.35 + Math.sin(this.t * 4) * 0.15;
        ctx.fillStyle = '#7fe8ff'; ctx.beginPath(); ctx.arc(760, 250 + b - 20, 36, 0, Math.PI * 2); ctx.fill(); ctx.restore();
        SG.dessinerPied(ctx, SG.img.ampli, 760, 262 + b, { echelle: 0.8 });
      }
      this.dessinerFlammes(ctx);
    } else {
      ctx.drawImage(this.fond(this.ecran), 0, 0, SG.W, SG.H);
    }
    // tout ce qui a une hauteur est trié par la position des pieds
    const liste = [];
    if (this.ecran !== 'grotte') this.objetsDecor(liste);
    for (const b of this.butins) liste.push(b);
    for (const m of this.monstres) liste.push(m);
    for (const p of this.pnj) liste.push(p);
    if (this.spirit) liste.push(this.spirit);
    liste.sort((a, b) => a.y - b.y);
    for (const o of liste) o.dessiner(ctx);
    // silhouettes par-dessus le décor : Spirit et les monstres restent visibles derrière les arbres
    ctx.save();
    ctx.globalAlpha = 0.38;
    for (const m of this.monstres) if (!m.apparition || m.apparition <= 0) m.dessiner(ctx);
    if (this.spirit) { ctx.globalAlpha = 0.5; this.spirit.dessiner(ctx); }
    ctx.restore();
    for (const p of this.projectiles) p.dessiner(ctx);
    for (const e of this.effets) e.dessiner(ctx);
    if (this.ecran === 'grotte') this.dessinerLumiereGrotte(ctx);
    else {
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
    for (let r = 0; r < SG.ROWS; r++) {
      for (let c = 0; c < SG.COLS; c++) {
        const ch = this.caseEn(c, r);
        const x = c * SG.T + 40, y = r * SG.T + SG.T;
        const graine = (c * 31 + r * 17 + this.ecran.length) % 7;
        let im = null, dx = 0, dy = 0, retourne = graine % 2 === 0;
        switch (ch) {
          case 'T': im = I.arbre; dy = 6; break;
          case 'S': im = I['arbre-sombre']; dy = r === SG.ROWS - 1 ? 45 : 10; dx = (graine - 3) * 3; break;
          case 'b': im = I.buisson; dy = -4; break;
          case 'h': im = I.herbes; dy = -8; break;
          case 'r': im = I.rocher; dy = -6; break;
          case 'x': im = I['rocher-fissure']; dy = -4; retourne = false; break;
          case 'P': im = I.panneau; dy = -6; retourne = false; break;
          case 'M': if (this.caseEn(c - 1, r) !== 'M') { im = I['amas-rochers']; dx = 40; dy = 4; } break;
          case 'E': im = I['falaise-grotte']; dy = 2; retourne = false; break;
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
      for (let r = 0; r < SG.ROWS; r++) for (let c = 0; c < SG.COLS; c++) if (e.carte[r][c] === car) cases.push([c, r]);
      const est = (c, r) => {
        if (c < 0 || c >= SG.COLS || r < 0 || r >= SG.ROWS) {
          const cc = SG.clamp(c, 0, SG.COLS - 1), rr = SG.clamp(r, 0, SG.ROWS - 1);
          return e.carte[rr][cc] === car;
        }
        return e.carte[r][c] === car;
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
    // emplacements A et B
    const case_ = (x, lettre, contenu) => {
      SG.cadre(ctx, SG.img['ui-portrait'], x, 12, 82, 80, 200, 20);
      if (contenu) {
        const g = ctx.createRadialGradient(x + 41, 52, 2, x + 41, 52, 30);
        g.addColorStop(0, 'rgba(200,240,255,0.9)'); g.addColorStop(1, 'rgba(40,110,180,0)');
        ctx.fillStyle = g; ctx.fillRect(x + 16, 28, 50, 48);
      }
      if (contenu) SG.dessinerPied(ctx, contenu, x + 41, 74, { echelle: 0.62 });
      SG.texte(ctx, lettre, x + 16, 34, 20, '#7fe8ff', 'left', null, null, true);
    };
    case_(SG.W - 180, 'B', null);
    case_(SG.W - 96, 'A', this.ampli ? SG.img.ampli : null);
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
    if (o.type === 'ampli') SG.dessinerPied(ctx, SG.img.ampli, x, y + 28 + flotte, { echelle: 1.1 });
    else SG.dessinerButin(ctx, o.type, x, y + 10 + flotte, 1.3);
  }

  dessinerDialogue(ctx) {
    const d = this.dlg;
    const [qui, texte] = d.lignes[d.i];
    const x = 50, y = SG.H - 214, w = SG.W - 100, h = 196;
    SG.cadre(ctx, SG.img['ui-dialogue'], x, y, w, h, 110, 44);
    let tx = x + 50;
    if (qui) {
      const parle = d.car < texte.length && Math.floor(this.t * 8) % 2 === 0;
      const im = qui === 'spirit' ? SG.img[parle ? 'portrait-spirit-parle' : 'portrait-spirit'] : SG.img['portrait-ermite'];
      const px = x + 22, py = y - 62, pw = 214, ph = 214;
      SG.cadre(ctx, SG.img['ui-portrait'], px, py, pw, ph, 200, 38);
      ctx.save();
      ctx.beginPath(); ctx.roundRect(px + 26, py + 26, pw - 52, ph - 52, 10); ctx.clip();
      SG.dessinerPied(ctx, im, px + pw / 2, py + ph - 20, { echelle: 0.8 });
      ctx.restore();
      SG.texte(ctx, qui === 'spirit' ? 'Spirit' : 'L\'ermite', x + 262, y + 58, 30, '#7fe8ff', 'left', null, null, true);
      tx = x + 262;
    }
    SG.texteMultiligne(ctx, texte.slice(0, Math.floor(d.car)), tx, y + (qui ? 100 : 76), w - (tx - x) - 60, 28, 36, '#ffffff');
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
    // les emplacements d'objets : un par donjon, comme dans Zelda
    const objets = [
      ['Ampli', this.ampli ? SG.img.ampli : null, 'A'],
      ['?', null], ['?', null], ['?', null], ['?', null], ['?', null], ['?', null], ['?', null], ['?', null],
    ];
    const taille = 112, ecart = 22, ox = 100, oy = 112;
    objets.forEach(([nom, im, touche], i) => {
      const x = ox + (i % 3) * (taille + ecart), y = oy + Math.floor(i / 3) * (taille + 44);
      ctx.save(); if (!im) ctx.globalAlpha = 0.45;
      SG.cadre(ctx, SG.img['ui-portrait'], x, y, taille, taille, 200, 26);
      ctx.restore();
      if (im) {
        // fond clair derrière l'objet pour qu'il ressorte
        const g = ctx.createRadialGradient(x + taille / 2, y + taille / 2, 4, x + taille / 2, y + taille / 2, taille * 0.42);
        g.addColorStop(0, 'rgba(200,240,255,0.95)'); g.addColorStop(0.6, 'rgba(120,200,240,0.55)'); g.addColorStop(1, 'rgba(40,110,180,0)');
        ctx.fillStyle = g;
        ctx.beginPath(); ctx.roundRect(x + 22, y + 22, taille - 44, taille - 44, 8); ctx.fill();
      }
      if (im) {
        // objet centré dans la case, nom sous la case
        SG.dessinerEffet(ctx, im, x + taille / 2, y + taille / 2, 0, 0.95, 1, false);
        if (!touche) SG.texte(ctx, nom, x + taille / 2, y + taille + 24, 18, '#cfe8ff', 'center');
        if (touche) SG.texte(ctx, nom + ' (' + touche + ')', x + taille / 2, y + taille + 24, 18, '#cfe8ff', 'center');
      }
    });
    // état de Spirit
    const ex = 560;
    SG.texte(ctx, 'Spirit', ex, 150, 30, '#7fe8ff', 'left', null, null, true);
    SG.dessinerPied(ctx, SG.img['spirit-face'], ex + 90, 360, { echelle: 1.5 });
    SG.dessinerCoeur(ctx, ex + 16, 420, 44, 0.25 * (this.fragments % 4));
    SG.texte(ctx, `Fragments : ${this.fragments % 4}/4`, ex + 48, 429, 22, '#fff', 'left');
    SG.dessinerButin(ctx, 'pixel', ex + 16, 476, 0.9);
    SG.texte(ctx, `Pixels : ${this.pixels}`, ex + 48, 485, 22, '#fff', 'left');
    SG.texte(ctx, `Cœurs : ${this.vieMax / 4}`, ex + 48, 535, 22, '#fff', 'left');
    SG.dessinerCoeur(ctx, ex + 16, 526, 36, 1);
    const opts = ['Reprendre', 'Carte', SG.Son.muet ? 'Activer le son' : 'Couper le son', 'Plein écran', 'Retour au titre'];
    opts.forEach((o, i) => SG.boutonMenu(ctx, o, 1025, 170 + i * 84, i === this.menuChoix, 330));
    SG.texte(ctx, 'Tab : carte', 1025, 640, 18, '#9fc4e8', 'center');
  }

  dessinerEcranCarte(ctx) {
    ctx.fillStyle = 'rgba(3,8,20,0.8)';
    ctx.fillRect(0, 0, SG.W, SG.H);
    this.dessinerCarte(ctx, 70, 40, SG.W - 140, 610);
    const lieu = this.ecran === 'grotte' ? 'La grotte de l\'ermite' : SG.MONDE[this.ecran].nom;
    SG.texte(ctx, 'Tu es ici : ' + lieu, SG.W / 2, 695, 22, '#ffffff', 'center');
  }

  dessinerFin(ctx) {
    const u = SG.clamp(this.tFin / 1.2, 0, 1);
    ctx.fillStyle = `rgba(20,0,30,${0.85 * u})`;
    ctx.fillRect(0, 0, SG.W, SG.H);
    if (u < 1) return;
    SG.texte(ctx, 'Spirit est à plat...', SG.W / 2, 300, 56, '#fff', 'center');
    SG.texte(ctx, 'Appuie sur A pour repartir de la Clairière', SG.W / 2, 400, 28, '#2ad4ff', 'center');
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
    SG.texte(ctx, 'Choisis ta difficulté', SG.W / 2, 160, 54, '#fff', 'center', '#0a2a5a', 8, true);
    const modes = [
      ['Héros', ['Le jeu tel qu\'il est pensé :', 'les monstres font vraiment mal.', 'Pour les joueurs qui aiment', 'le défi.']],
      ['Découverte', ['Les monstres font moitié', 'moins de dégâts.', 'Pour profiter de l\'aventure', 'sans rester bloqué.']],
    ];
    modes.forEach(([nom, lignes], i) => {
      const x = 170 + i * 490, y = 250, sel = i === this.menuChoix;
      ctx.save();
      if (!sel) ctx.globalAlpha = 0.7;
      SG.cadre(ctx, SG.img['ui-panneau'], x, y, 450, 300, 150, 44);
      ctx.restore();
      if (sel) { ctx.save(); ctx.globalCompositeOperation = 'lighter'; ctx.fillStyle = 'rgba(42,180,255,0.08)'; ctx.fillRect(x + 30, y + 40, 390, 230); ctx.restore(); }
      SG.texte(ctx, nom, x + 225, y + 90, 44, sel ? '#7fe8ff' : '#fff', 'center', null, null, true);
      lignes.forEach((l, j) => SG.texte(ctx, l, x + 225, y + 150 + j * 34, 24, '#dde', 'center'));
    });
    SG.texte(ctx, 'Gauche / droite pour choisir, Espace pour valider', SG.W / 2, 640, 24, '#aabbcc', 'center');
  }

  dessinerIntro(ctx) {
    ctx.fillStyle = '#06091a'; ctx.fillRect(0, 0, SG.W, SG.H);
    const i = Math.min(this.intro.i, SG.TEXTES.intro.length - 1);
    const a = SG.clamp(this.intro.t * 2, 0, 1);
    ctx.save(); ctx.globalAlpha = a;
    SG.texteMultiligne(ctx, SG.TEXTES.intro[i], SG.W / 2, 300, 900, 36, 52, '#ffffff', 'center');
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
