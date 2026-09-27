// Spirit et le Roi Clickbait : le donjon 1, le Terrier des Pop-ups.
// Salles, portes, clés, blocs, plaques, cristaux, coffres, Manette Retour et boss.
'use strict';

// ---------------------------------------------------------------- plan du donjon
// Légende des salles (16 × 9, bordure de murs incluse)
//  #  mur          .  sol           v  trou (on ne marche pas dessus, les projectiles passent)
//  o  statue       F  brasero       p  pot (l'onde le casse)     B  bloc à pousser
//  G  gargouille à pousser (sur la plaque)
//  I  plaque au sol                 X  cristal (à frapper)       C  place d'un coffre (voir coffre)
SG.DONJON1 = {
  nom: 'Le Terrier des Pop-ups',
  entree: { salle: '1,3', x: 640, y: 628 },
  sortie: { ecran: '0,0', x: 680, y: 236 },
  salles: {
    '1,3': {
      nom: 'Le Hall d\'entrée',
      plan: [
        '################',
        '#..............#',
        '#.F..........F.#',
        '#...p......p...#',
        '#..............#',
        '#...p......p...#',
        '#.F..........F.#',
        '#..............#',
        '################',
      ],
      ennemis: [],
    },
    '0,3': {
      nom: 'La Salle des Spams',
      plan: [
        '################',
        '#..............#',
        '#...o......o...#',
        '#..............#',
        '#..............#',
        '#..............#',
        '#...o......o...#',
        '#..............#',
        '################',
      ],
      combat: true,
      ennemis: [['spamling', 2, 1], ['spamling', 13, 1], ['spamling', 2, 7], ['spamling', 13, 7]],
      coffre: { c: 7, r: 4, contenu: 'cle', cache: true },
    },
    '2,3': {
      nom: 'La Salle du Bloc',
      image: 'salle-mur-fele', murees: ['droite'],
      plan: [
        '################',
        '#..............#',
        '#..o........o..#',
        '#..............#',
        '#......B.......#',
        '#.p..........p.#',
        '#..o........o..#',
        '#..............#',
        '################',
      ],
      condition: 'bloc',
      ennemis: [['clic', 3, 2], ['clic', 12, 6]],
      coffre: { c: 13, r: 2, contenu: 'boussole', cache: true },
    },
    '1,2': {
      nom: 'La Fosse',
      plan: [
        '################',
        '#..............#',
        '#.F..........F.#',
        '#....o....o....#',
        '#..............#',
        '#....o....o....#',
        '#.F..........F.#',
        '#..............#',
        '################',
      ],
      combat: true,
      ennemis: [['popup', 3, 3], ['popup', 12, 3], ['popup', 12, 6]],
      coffre: { c: 3, r: 4, contenu: 'carte', cache: true },
    },
    '2,2': {
      nom: 'La Salle des Plaques',
      image: 'salle-plaque', imageResolue: 'salle-plaque-enfoncee', decalBloc: 40, decalBlocY: -22, decalObjets: 40, decalObjetsY: -22,
      plan: [
        '################',
        '#..............#',
        '#.o..G...o..o..#',
        '#..............#',
        '#......I.......#',
        '#..............#',
        '#.o..o...o..o..#',
        '#..............#',
        '################',
      ],
      condition: 'plaque',
      ennemis: [['spamling', 3, 3], ['spamling', 12, 5]],
      coffre: { c: 13, r: 4, contenu: 'cle', cache: true },
    },
    '1,1': {
      nom: 'Le Carrefour des Clics',
      plan: [
        '################',
        '#..............#',
        '#..p........p..#',
        '#.....F..F.....#',
        '#..............#',
        '#.....F..F.....#',
        '#..p........p..#',
        '#..............#',
        '################',
      ],
      ennemis: [['clic', 2, 4], ['clic', 13, 4], ['popup', 7, 1]],
    },
    '0,1': {
      nom: 'La Salle de la Manette',
      plan: [
        '################',
        '#..............#',
        '#..F........F..#',
        '#..............#',
        '#..............#',
        '#..............#',
        '#..F........F..#',
        '#..............#',
        '################',
      ],
      combat: true,
      ennemis: [['spamling', 3, 2], ['spamling', 12, 2], ['spamling', 7, 6], ['clic', 2, 6], ['clic', 13, 6]],
      coffre: { c: 7, r: 4, contenu: 'manette', cache: true },
    },
    '2,1': {
      nom: 'Le Cristal',
      image: 'salle-gouffre', cristalDx: 40, gouffre: [515, 118, 762, 600], ilot: [582, 285, 700, 400],
      plan: [
        '################',
        '#..............#',
        '#..............#',
        '#..............#',
        '#......X.......#',
        '#..............#',
        '#..............#',
        '#..............#',
        '################',
      ],
      condition: 'cristal',
      ennemis: [['popup', 4, 2], ['popup', 4, 6]],
      coffre: { c: 3, r: 4, contenu: 'cleBoss', cache: true },
    },
    '1,0': {
      nom: 'Le Trône de la Reine',
      image: 'salle-boss', imageFinie: 'salle-gardien',
      plan: [
        '################',
        '#..............#',
        '#.F..........F.#',
        '#..............#',
        '#..............#',
        '#..............#',
        '#.F..........F.#',
        '#..............#',
        '################',
      ],
      boss: true,
    },
  },
  // portes entre deux salles (clé : les deux salles triées)
  portes: {
    '1,2|1,3': 'cle',
    '0,3|1,3': 'o',
    '1,3|2,3': 'o',
    '2,2|2,3': 'enigme:2,3',
    '1,2|2,2': 'o',
    '1,1|1,2': 'o',
    '0,1|1,1': 'o',
    '1,1|2,1': 'cle',
    '1,0|1,1': 'boss',
  },
};

SG.CASES_SALLE_PLEINES = new Set(['#', 'o', 'F', 'p', 'C', 'X', 'B', 'v']);
SG.CASES_SALLE_MURS = new Set(['#', 'v']);
// dans les salles peintes, statues et braseros se placent au milieu des dalles du sol (dalles de 131,5 px à partir de x = 114)
SG.xDalle = (x) => 114 + 131.5 * (Math.round((x - 114 - 65.75) / 131.5)) + 65.75;
// empreinte au sol des objets (demi-largeur, hauteur) : seul le pied arrête, on passe derrière le reste
SG.PIEDS_OBJETS = { o: [30, 30], F: [26, 26], p: [22, 24], C: [36, 32], X: [22, 26], B: [36, 42] };

SG.cleSalles = (a, b) => [a, b].sort().join('|');

// ---------------------------------------------------------------- textes du donjon
SG.TEXTES.donjon = {
  entree: 'Le Terrier des Pop-ups. Le Bruit a creusé ce repaire sous le Bois. Quelque part au fond, le Gardien Flash est retenu prisonnier.',
  verrou: 'La porte est verrouillée. Il faut une petite clé.',
  verrouBoss: 'Une grande porte scellée par le Bruit. Il faut la grande clé du donjon.',
  cle: 'Tu as trouvé une petite clé ! Elle ouvre une porte verrouillée de ce donjon. Chaque clé ne sert qu\'une fois.',
  carte: 'Tu as trouvé la carte du Terrier ! Appuie sur Tab (ou le bouton carte) pour voir toutes les salles du donjon.',
  boussole: 'Tu as trouvé la boussole ! Sur la carte, elle montre les coffres pas encore ouverts et la salle du boss.',
  cleBoss: 'Tu as trouvé la grande clé ! Elle ouvre la porte de la Reine Pop-up.',
  manette: 'Tu as obtenu la Manette Retour ! Appuie sur B (C au clavier) pour la lancer : elle revient toujours dans ta main. Elle étourdit les monstres, active les cristaux à distance et rapporte les objets hors de portée.',
  resolu: 'Un déclic résonne dans la salle.',
  coeurOr: 'Tu as obtenu un Cœur d\'or ! Ta vie augmente d\'un cœur, et elle est entièrement rechargée.',
  bossDebut: [[null, 'La Reine Pop-up surgit dans un fracas de fenêtres ! Son écran est protégé : il faudra l\'étourdir pour l\'atteindre.']],
  flash: [
    ['flash', 'Hou hou ! Enfin libre ! Merci, petit. Je suis Flash, le Gardien de l\'Actu.'],
    ['flash', 'La Reine Pop-up me forçait à crier des titres mensongers toute la journée. Mes plumes en frémissent encore.'],
    ['spirit', 'Tu sais où sont les autres Gardiens ?'],
    ['flash', 'La Gardienne des Tests est retenue au nord, dans la Forêt des Forums. Une barrière de Bruit ferme la route, près de l\'étang du nord.'],
    ['flash', 'Ta Manette peut frapper le cristal qui la commande, de l\'autre côté de l\'eau. Et prends ceci : c\'est un fragment de la Source.'],
  ],
  source: 'Tu as obtenu le premier fragment de la Source ! Plus que sept. Le Roi Clickbait commence à perdre des forces.',
  apresFlash: 'Flash t\'ouvre un passage de lumière vers la sortie.',
};

// descriptions des objets, pour l'écran des objets
SG.OBJETS = {
  ampli: { nom: 'Ampli', touche: 'A', texte: 'Transforme ta voix en onde sonore. Elle bat les monstres, coupe l\'herbe, casse les pots et détruit les projectiles. Cœurs pleins : l\'onde part au loin.' },
  manette: { nom: 'Manette Retour', touche: 'B', texte: 'Lance-la, elle revient dans ta main. Elle étourdit les monstres, frappe les cristaux à distance et rapporte les objets hors de portée.' },
};

// ---------------------------------------------------------------- monstres du donjon
// Le Pop-up : fenêtre volante qui fonce par à-coups, passe au-dessus des trous
SG.Popup = class extends SG.Monstre {
  constructor(x, y) {
    super('popup', x, y);
    this.pv = 2; this.cw = 56; this.ch = 70; this.pw = 40; this.ph = 20;
    this.degatsContact = 2; this.vole = true;
    this.cible = null; this.tPause = SG.hasard(0.3, 1);
    this.apparition = 0;
  }
  maj(jeu, dt) {
    if (!this.majCommune(jeu, dt)) return;
    this.tPause -= dt;
    if (this.tPause <= 0 && !this.cible) {
      const s = jeu.spirit;
      const a = Math.atan2(s.y - this.y, s.x - this.x) + SG.hasard(-0.7, 0.7);
      const d = SG.hasard(120, 200);
      this.cible = { x: this.x + Math.cos(a) * d, y: this.y + Math.sin(a) * d, t: 0.55 };
    }
    if (this.cible) {
      const c = this.cible;
      c.t -= dt;
      const bloque = SG.deplacer(jeu, this, (c.x - this.x) * dt * 4, (c.y - this.y) * dt * 4);
      if (c.t <= 0 || bloque) { this.cible = null; this.tPause = SG.hasard(0.4, 1) * (jeu.mode === 'decouverte' ? 1.4 : 1); }
    }
    this.contact(jeu);
  }
  dessiner(ctx) {
    const h = 26 + Math.sin(this.t * 5) * 6;
    SG.ombre(ctx, this.x, this.y, 22, 0.25);
    this.dessinerFlash(ctx, () => SG.dessinerPied(ctx, SG.img.popup, this.x, this.y - h, { sy: 1 + Math.sin(this.t * 10) * 0.03 }));
  }
};

// Le Spamling : enveloppe qui bondit vers Spirit
SG.Spamling = class extends SG.Monstre {
  constructor(x, y) {
    super('spamling', x, y);
    this.pv = 1; this.cw = 50; this.ch = 50; this.pw = 40; this.ph = 20;
    this.degatsContact = 2; this.apparition = 0;
    this.phase = 'repos'; this.tPhase = SG.hasard(0.2, 1); this.h = 0;
  }
  maj(jeu, dt) {
    if (!this.majCommune(jeu, dt)) { this.h = 0; return; }
    this.tPhase -= dt;
    if (this.phase === 'repos' && this.tPhase <= 0) {
      const s = jeu.spirit;
      const a = Math.atan2(s.y - this.y, s.x - this.x) + SG.hasard(-0.4, 0.4);
      this.saut = { vx: Math.cos(a) * 260, vy: Math.sin(a) * 260 };
      this.phase = 'saut'; this.tPhase = 0.4;
    } else if (this.phase === 'saut') {
      this.h = Math.sin(Math.PI * (1 - this.tPhase / 0.4)) * 30;
      SG.deplacer(jeu, this, this.saut.vx * dt, this.saut.vy * dt);
      if (this.tPhase <= 0) { this.phase = 'repos'; this.h = 0; this.tPhase = SG.hasard(0.3, 0.8) * (jeu.mode === 'decouverte' ? 1.5 : 1); }
    }
    this.contact(jeu);
  }
  dessiner(ctx) {
    SG.ombre(ctx, this.x, this.y, 22 * (1 - this.h / 90), 0.25);
    const sy = this.phase === 'repos' ? 1 - Math.max(0, 0.15 - this.tPhase) : 1.08;
    this.dessinerFlash(ctx, () => SG.dessinerPied(ctx, SG.img.spamling, this.x, this.y - this.h, { sy, sx: 1 / Math.sqrt(sy) }));
  }
};

// Le Clic : curseur qui fonce en ligne droite dès que Spirit est dans son axe
SG.Clic = class extends SG.Monstre {
  constructor(x, y) {
    super('clic', x, y);
    this.pv = 2; this.cw = 44; this.ch = 64; this.pw = 36; this.ph = 20;
    this.degatsContact = 3; this.apparition = 0;
    this.dir = SG.choisir(['haut', 'bas', 'gauche', 'droite']);
    this.tDir = SG.hasard(0.5, 1.5); this.charge = false; this.sonne = 0;
  }
  maj(jeu, dt) {
    if (!this.majCommune(jeu, dt)) return;
    if (this.sonne > 0) { this.sonne -= dt; this.contact(jeu); return; }
    const s = jeu.spirit;
    if (!this.charge) {
      this.repos = Math.max(0, (this.repos || 0) - dt);
      const loin = Math.hypot(s.x - this.x, s.y - this.y);
      if (this.repos <= 0 && loin < 420 && (Math.abs(s.x - this.x) < 26 || Math.abs(s.y - this.y) < 26)) {
        this.dir = SG.dirDepuis(s.x - this.x, s.y - this.y);
        this.charge = true; SG.Son.effet('lance');
      } else {
        this.tDir -= dt;
        const d = SG.DIRS[this.dir];
        if (this.tDir <= 0 || SG.deplacer(jeu, this, d.x * 70 * dt, d.y * 70 * dt)) { this.dir = SG.choisir(['haut', 'bas', 'gauche', 'droite']); this.tDir = SG.hasard(0.5, 1.5); }
      }
    } else {
      const d = SG.DIRS[this.dir];
      const v = jeu.mode === 'decouverte' ? 300 : 400;
      if (SG.deplacer(jeu, this, d.x * v * dt, d.y * v * dt)) { this.charge = false; this.sonne = 1.0; this.repos = 1.4; }
    }
    this.contact(jeu);
  }
  dessiner(ctx) {
    SG.ombre(ctx, this.x, this.y, 20, 0.25);
    const d = SG.DIRS[this.dir];
    const pente = this.charge ? d.x * 0.25 : Math.sin(this.t * 8) * 0.05;
    this.dessinerFlash(ctx, () => {
      ctx.save(); ctx.translate(this.x, this.y); ctx.rotate(pente);
      const pas = this.sonne > 0 ? 0 : Math.floor(this.t * (this.charge ? 14 : 6)) % 2;
      const im = pas && SG.img['clic-b'] && SG.img['clic-b'].width ? SG.img['clic-b'] : SG.img.clic;
      SG.dessinerPied(ctx, im, 0, (this.sonne > 0 ? -2 : 0) - pas * 3, { retourne: d.x < 0 });
      ctx.restore();
    });
  }
};

// La Reine Pop-up : le boss. Son écran la protège ; la Manette l'étourdit, et elle devient vulnérable.
SG.ReinePopup = class extends SG.Monstre {
  constructor(x, y) {
    super('reine', x, y);
    this.pvMax = 8; this.pv = 8;
    this.cw = 150; this.ch = 170; this.pw = 110; this.ph = 30;
    this.degatsContact = 4; this.vole = true; this.apparition = 0;
    this.base = { x, y }; this.tAppel = 3; this.tTir = 2; this.vulnerable = 0; this.boss = true;
  }
  maj(jeu, dt) {
    this.t += dt;
    this.flash = Math.max(0, this.flash - dt);
    if (this.etourdi > 0) { this.etourdi -= dt; this.vulnerable = this.etourdi; this.contact(jeu); return; }
    const rage = this.pv <= 4 ? 1.5 : 1;
    // vol en huit dans la salle
    this.x = 640 + Math.sin(this.t * 0.7 * rage) * 380;
    this.y = 440 + Math.sin(this.t * 1.4 * rage) * 80;
    this.tAppel -= dt;
    if (this.tAppel <= 0) {
      this.tAppel = 5 / rage;
      if (jeu.monstres.filter((m) => m instanceof SG.Popup).length < 3) {
        for (const dx of [-90, 90]) { const p = new SG.Popup(this.x + dx, this.y + 20); jeu.monstres.push(p); }
        SG.Son.effet('apparition');
      }
    }
    this.tTir -= dt;
    if (this.tTir <= 0) {
      this.tTir = 2.4 / rage;
      for (const dir of ['bas', 'gauche', 'droite']) jeu.projectiles.push(new SG.Pub(this.x, this.y - 60, dir));
      SG.Son.effet('crache');
    }
    this.contact(jeu);
  }
  toucher(jeu, degats, sx, sy, source) {
    if (this.flash > 0) return false;
    if (source === 'manette') { this.etourdi = 3.2; SG.Son.effet('touche'); this.flash = 0.2; return true; }
    if (!(this.etourdi > 0)) { jeu.effets.push(new SG.Eclat(this.x, this.y - 90)); SG.Son.effet('porte'); return true; }
    this.pv -= degats; this.flash = 0.35;
    if (this.pv <= 0) { this.mort = true; this.quandMeurt(jeu); } else SG.Son.effet('touche');
    return true;
  }
  quandMeurt(jeu) {
    for (let i = 0; i < 6; i++) jeu.effets.push(new SG.Fumee(this.x + SG.hasard(-80, 80), this.y - SG.hasard(20, 150), 150));
    SG.Son.effet('fumee');
    for (const m of jeu.monstres) if (m !== this && !m.mort) { m.mort = true; jeu.effets.push(new SG.Fumee(m.x, m.y - 30, 60)); }
    jeu.bossVaincu();
  }
  dessiner(ctx) {
    const h = 60 + Math.sin(this.t * 3) * 8;
    SG.ombre(ctx, this.x, this.y, 70, 0.3);
    const vuln = this.etourdi > 0;
    this.dessinerFlash(ctx, () => {
      ctx.save();
      if (!vuln) {
        // bouclier : écran lumineux violet
        ctx.globalCompositeOperation = 'lighter';
        const g = ctx.createRadialGradient(this.x, this.y - h - 80, 20, this.x, this.y - h - 80, 120);
        g.addColorStop(0, 'rgba(180,80,255,0.25)'); g.addColorStop(1, 'rgba(120,40,200,0)');
        ctx.fillStyle = g; ctx.fillRect(this.x - 130, this.y - h - 200, 260, 240);
        ctx.globalCompositeOperation = 'source-over';
      }
      if (SG.img.reine && SG.img.reine.width) { SG.dessinerPied(ctx, SG.img.reine, this.x, this.y - h + 40, { sy: 1 + Math.sin(this.t * 6) * 0.02 }); ctx.restore(); return; }
      SG.dessinerPied(ctx, SG.img.popup, this.x, this.y - h, { echelle: 2.5, sy: 1 + Math.sin(this.t * 6) * 0.02 });
      // couronne
      ctx.translate(this.x, this.y - h - 170);
      ctx.fillStyle = '#ffd23a'; ctx.strokeStyle = '#1a1000'; ctx.lineWidth = 4;
      ctx.beginPath(); ctx.moveTo(-45, 20); ctx.lineTo(-45, -10); ctx.lineTo(-22, 8); ctx.lineTo(0, -22); ctx.lineTo(22, 8); ctx.lineTo(45, -10); ctx.lineTo(45, 20); ctx.closePath();
      ctx.fill(); ctx.stroke();
      ctx.restore();
    });
    // barre de vie du boss
    const w = 400, x = 640 - w / 2, y = 96;
    ctx.fillStyle = 'rgba(0,0,0,0.6)'; ctx.fillRect(x - 4, y - 4, w + 8, 20);
    ctx.fillStyle = vuln ? '#ffd23a' : '#b04dff'; ctx.fillRect(x, y, w * Math.max(0, this.pv) / this.pvMax, 12);
  }
};

// les « pubs » lancées par la Reine
SG.Pub = class extends SG.Projectile {
  constructor(x, y, dir) { super(x, y, dir, 330); this.r = 16; this.degats = 2; }
  dessiner(ctx) {
    ctx.save(); ctx.translate(this.x, this.y); ctx.rotate(Math.sin(this.t * 10) * 0.2);
    ctx.fillStyle = '#f4f4f8'; ctx.strokeStyle = '#111'; ctx.lineWidth = 3;
    ctx.beginPath(); ctx.roundRect(-16, -12, 32, 24, 4); ctx.fill(); ctx.stroke();
    ctx.fillStyle = '#e8303a'; ctx.fillRect(-16, -12, 32, 7); ctx.strokeRect(-16, -12, 32, 7);
    ctx.restore();
  }
};

(() => {
  const creerAvant = SG.creerMonstre;
  SG.creerMonstre = function (type, x, y) {
    if (type === 'popup') return new SG.Popup(x, y);
    if (type === 'spamling') return new SG.Spamling(x, y);
    if (type === 'clic') return new SG.Clic(x, y);
    return creerAvant(type, x, y);
  };
})();

// ---------------------------------------------------------------- la Manette Retour
SG.Manette = class {
  constructor(jeu, dir) {
    const s = jeu.spirit, d = SG.DIRS[dir];
    this.x = s.x + d.x * 30; this.y = s.y - 40 + d.y * 20;
    this.vx = d.x * 620; this.vy = d.y * 620;
    this.retour = false; this.dist = 0; this.t = 0; this.r = 18;
    this.ami = true; this.fini = false; this.porte = [];
  }
  boite() { return { x: this.x - this.r, y: this.y - this.r, w: this.r * 2, h: this.r * 2 }; }
  maj(jeu, dt) {
    this.t += dt;
    const s = jeu.spirit;
    if (!this.retour) {
      this.x += this.vx * dt; this.y += this.vy * dt;
      this.dist += Math.hypot(this.vx, this.vy) * dt;
      if (this.dist > 380 || this.x < 10 || this.x > SG.W - 10 || this.y < 10 || this.y > SG.H - 10) this.retour = true;
      if (jeu.toucherCristalEn && jeu.toucherCristalEn(this.x, this.y + 30)) this.retour = true;
      else if (jeu.obstacleHaut(this.x, this.y + 30)) { this.retour = true; jeu.effets.push(new SG.Eclat(this.x, this.y)); }
    } else {
      const dx = s.x - this.x, dy = (s.y - 40) - this.y, d = Math.hypot(dx, dy) || 1;
      this.x += dx / d * 700 * dt; this.y += dy / d * 700 * dt;
      if (d < 30) { this.fini = true; for (const b of this.porte) { b.fini = true; jeu.ramasser(b); } }
    }
    for (const m of jeu.monstres) {
      if (m.mort || (m.etourdi > 0 && !m.boss) || !SG.boitesSeTouchent(this.boite(), m.corps())) continue;
      if (m.boss) { m.toucher(jeu, 0, this.x, this.y, 'manette'); this.retour = true; continue; }
      if (m instanceof SG.Popup) m.toucher(jeu, 1, this.x - this.vx * 0.01, this.y - this.vy * 0.01);
      else { m.etourdi = 2.4; SG.Son.effet('touche'); }
      this.retour = true;
    }
    for (const b of jeu.butins) if (!b.fini && !this.porte.includes(b) && SG.boitesSeTouchent(this.boite(), b.boite())) this.porte.push(b);
    for (const b of this.porte) { b.x = this.x; b.y = this.y + 20; b.t = 1; }
    if (Math.floor(this.t * 12) % 2 === 0) SG.Son.note && SG.Son.note(900, 0, 0.02, 'triangle', 0.03);
  }
  dessiner(ctx) {
    const im = SG.img.manette;
    if (im && im.width) { SG.dessinerEffet(ctx, im, this.x, this.y, this.t * 18, 0.9, 1, false); return; }
    ctx.save(); ctx.translate(this.x, this.y); ctx.rotate(this.t * 18);
    ctx.fillStyle = '#1b2a4a'; ctx.strokeStyle = '#000'; ctx.lineWidth = 3;
    ctx.beginPath(); ctx.roundRect(-20, -10, 40, 20, 10); ctx.fill(); ctx.stroke();
    ctx.fillStyle = '#2ad4ff'; ctx.beginPath(); ctx.arc(-10, 0, 4, 0, 7); ctx.arc(10, 0, 4, 0, 7); ctx.fill();
    ctx.restore();
  }
};

// ---------------------------------------------------------------- le Gardien Flash (en attendant son image)
SG.Flash = class {
  constructor(x, y) { this.x = x; this.y = y; this.pw = 60; this.ph = 30; this.t = 0; this.nom = 'flash'; }
  corps() { return { x: this.x - 35, y: this.y - 110, w: 70, h: 110 }; }
  maj(jeu, dt) { this.t += dt; }
  dessiner(ctx) {
    SG.ombre(ctx, this.x, this.y, 34);
    const im = SG.img.flash;
    if (im && im.width) {
      // il sautille sur place ; de temps en temps il note quelque chose dans son carnet
      const carnet = SG.img['flash-carnet'] && Math.floor(this.t / 2.5) % 2 === 1 ? SG.img['flash-carnet'] : im;
      const saut = Math.abs(Math.sin(this.t * 3)) * 8;
      SG.dessinerPied(ctx, carnet, this.x, this.y - saut, { sy: 1 - (saut < 1 ? 0.04 : 0) });
      return;
    }
    ctx.save(); ctx.translate(this.x, this.y - 55 - Math.abs(Math.sin(this.t * 2)) * 4);
    ctx.fillStyle = '#8a5a2a'; ctx.strokeStyle = '#111'; ctx.lineWidth = 4;
    ctx.beginPath(); ctx.ellipse(0, 0, 38, 48, 0, 0, 7); ctx.fill(); ctx.stroke();
    ctx.fillStyle = '#f2e2c0'; ctx.beginPath(); ctx.ellipse(0, 12, 24, 30, 0, 0, 7); ctx.fill();
    for (const dx of [-15, 15]) { ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(dx, -16, 12, 0, 7); ctx.fill(); ctx.stroke(); ctx.fillStyle = '#111'; ctx.beginPath(); ctx.arc(dx, -16, 5, 0, 7); ctx.fill(); }
    ctx.fillStyle = '#f0a020'; ctx.beginPath(); ctx.moveTo(-6, -4); ctx.lineTo(6, -4); ctx.lineTo(0, 6); ctx.closePath(); ctx.fill(); ctx.stroke();
    ctx.restore();
  }
};

// ---------------------------------------------------------------- méthodes ajoutées au jeu
Object.assign(SG.Jeu.prototype, {
  estDonjon(cle) { return typeof (cle ?? this.ecran) === 'string' && (cle ?? this.ecran).startsWith('d1:'); },
  salleCle() { return this.ecran.slice(3); },
  salle(k) { return SG.DONJON1.salles[k ?? this.salleCle()]; },

  etatDonjon() {
    if (!this.d1) this.d1 = { cles: 0, cleBoss: false, carte: false, boussole: false, ouvertes: [], resolues: [], coffres: [], visites: [], fini: false };
    return this.d1;
  },

  entrerSalle(cle) {
    const k = cle.slice(3), S = this.salle(k), D = this.etatDonjon();
    if (!D.visites.includes(k)) D.visites.push(k);
    this.coupes = new Set();
    this.effets = []; this.projectiles = []; this.butins = []; this.monstres = []; this.pnj = [];
    this.pousse = 0;
    this.entreeSalle = null;
    this.tSalle = 0;             // temps passé dans la salle : les grilles se ferment juste après l'entrée
    // blocs mobiles : position de départ, ou sur la plaque si l'énigme est résolue
    this.blocs = [];
    S.plan.forEach((ligne, r) => [...ligne].forEach((ch, c) => { if (ch === 'B' || ch === 'G') this.blocs.push({ c, r, anim: 0, dc: 0, dr: 0, statue: ch === 'G' }); }));
    if (S.condition === 'bloc' && D.resolues.includes(k) && this.blocs[0]) { this.blocs[0].r -= 1; this.blocs[0].pousse = true; }
    // énigme résolue : la gargouille est restée sur la plaque
    if (S.condition === 'plaque' && D.resolues.includes(k) && this.blocs[0]) {
      S.plan.forEach((ligne, r) => [...ligne].forEach((ch, c) => { if (ch === 'I') { this.blocs[0].c = c; this.blocs[0].r = r; this.blocs[0].pousse = true; } }));
    }
    this.cristalFrappe = D.resolues.includes(k) && S.condition === 'cristal';
    // braseros
    this.feux = [];
    S.plan.forEach((ligne, r) => [...ligne].forEach((ch, c) => { if (ch === 'F') this.feux.push(new SG.Feu(this.imageSalle() ? SG.xDalle(c * SG.T + 40) : c * SG.T + 40, r * SG.T + 34, 0.7)); }));
    if (S.boss) {
      if (!D.fini) {
        SG.Son.jouerMusique('boss');
        this.monstres.push(new SG.ReinePopup(640, 440));
        this.bossDialogue = true;
      } else {
        SG.Son.jouerMusique('donjon');
        if (!D.flashVu) this.pnj.push(new SG.Flash(640, 300));
      }
    } else {
      SG.Son.jouerMusique('donjon');
      if (!this.mortsDonjon) this.mortsDonjon = {};
      const morts = this.mortsDonjon[k] || [];
      (S.ennemis || []).forEach(([type, c, r], i) => {
        if (morts.includes(i)) return;
        const m = SG.creerMonstre(type, c * SG.T + 40, r * SG.T + 62);
        m.indexSpawn = i; m.salleSpawn = cle;
        this.placerLibre(m);
        this.monstres.push(m);
      });
    }
    this.sallePleine = this.monstres.length > 0;
    this.sauver();
  },

  // la salle bloque-t-elle ses portes (combat ou boss en cours) ?
  sallePortesFermees() {
    const S = this.salle(), k = this.salleCle(), D = this.etatDonjon();
    const piege = (S.boss && !D.fini) || !!(S.combat && !D.resolues.includes(k) && this.monstres.length > 0);
    return piege && (this.tSalle || 0) >= SG.DELAI_GRILLES;
  },

  porteVers(dir) {
    const [x, y] = this.salleCle().split(',').map(Number), d = SG.DIRS[dir];
    const voisine = (x + d.x) + ',' + (y + d.y);
    if (this.salleCle() === SG.DONJON1.entree.salle && dir === 'bas') return { type: 'sortie', voisine: null };
    const type = SG.DONJON1.portes[SG.cleSalles(this.salleCle(), voisine)];
    return type ? { type, voisine, cle: SG.cleSalles(this.salleCle(), voisine) } : null;
  },

  porteOuverte(dir) {
    const p = this.porteVers(dir);
    if (!p) return false;
    if (p.type === 'sortie') return !this.sallePortesFermees();
    const D = this.etatDonjon();
    if (this.sallePortesFermees()) return false;
    if (p.type === 'o') return true;
    if (p.type === 'cle' || p.type === 'boss') return D.ouvertes.includes(p.cle);
    if (p.type.startsWith('enigme:')) return D.resolues.includes(p.type.slice(7));
    return false;
  },

  // cases de porte sur la bordure
  dirPorte(c, r) {
    if (r === 0 && (c === 7 || c === 8)) return 'haut';
    if (r === SG.ROWS - 1 && (c === 7 || c === 8)) return 'bas';
    if (c === 0 && r === 4) return 'gauche';
    if (c === SG.COLS - 1 && r === 4) return 'droite';
    return null;
  },

  // image peinte de la salle courante (selon l'état de l'énigme ou du boss), ou null si elle n'est pas chargée
  imageSalle(k) {
    const S = this.salle(k), D = this.etatDonjon(), cle = k || this.salleCle();
    let n = S.image || 'salle-base';
    if (S.imageResolue && D.resolues.includes(cle)) n = S.imageResolue;
    if (S.imageFinie && D.fini) n = S.imageFinie;
    const im = SG.img[n];
    return im && im.width ? im : null;
  },

  // obstacles des murs peints (cellules de 20 px) : sol entre 120 et 1160 × 120 et 600, couloirs des quatre portes
  masqueSalle() {
    const S = this.salle(), k = this.salleCle();
    if (!this.imageSalle()) return null;
    this.masques = this.masques || {};
    // une porte fermée (verrou, volets, grille) bouche son embrasure : Spirit ne marche jamais dans une porte close
    const dirs = ['haut', 'bas', 'gauche', 'droite'], ouv = dirs.map((d) => this.porteOuverte(d) ? '1' : '0').join('');
    const cm = k + '|' + ouv;
    if (this.masques[cm]) return this.masques[cm];
    const libre = (x, y, r) => x >= r[0] && x < r[2] && y >= r[1] && y < r[3];
    const couloirs = [[580, 0, 700, 120], [580, 600, 700, 720], [0, 320, 120, 400], [1160, 320, 1280, 400]].filter((q, i) => ouv[i] === '1');
    const m = [];
    for (let r = 0; r < 36; r++) {
      let l = '';
      for (let c = 0; c < 64; c++) {
        const x = c * 20 + 10, y = r * 20 + 10;
        let ch = libre(x, y, [120, 120, 1160, 600]) || couloirs.some((q) => libre(x, y, q)) ? '.' : '#';
        if (S.murees && S.murees.includes('droite') && x > 1150) ch = '#';
        if (S.gouffre && libre(x, y, S.gouffre)) ch = S.ilot && libre(x, y, S.ilot) ? '#' : 'v';
        l += ch;
      }
      m.push(l);
    }
    return (this.masques[cm] = m);
  },

  caseSalle(c, r) {
    if (r < 0 || r >= SG.ROWS || c < 0 || c >= SG.COLS) return null;
    const S = this.salle(), k = this.salleCle(), D = this.etatDonjon();
    let ch = S.plan[r][c];
    const dp = this.dirPorte(c, r);
    if (dp) return this.porteOuverte(dp) ? '.' : '#';
    if (ch === 'B' || ch === 'G') ch = '.';
    for (const b of this.blocs || []) if (b.r === r && (b.c === c || (S.decalBloc && b.c + 1 === c))) return 'B';
    if (ch === 'p' && this.coupes.has(c + ',' + r)) return '.';
    const cf = S.coffre;
    if (cf && cf.c === c && cf.r === r && (!cf.cache || D.resolues.includes(k))) return 'C';
    return ch;
  },

  // la boîte touche-t-elle le pied d'une statue, d'un brasero, d'un pot, d'un coffre, du cristal ou d'un bloc ?
  piedObjetTouche(b) {
    const S = this.salle(), T = SG.T;
    const c0 = Math.floor(b.x / T) - 1, c1 = Math.floor((b.x + b.w) / T) + 1;
    const r0 = Math.floor(b.y / T), r1 = Math.floor((b.y + b.h) / T) + 1;
    for (let r = r0; r <= r1; r++) for (let c = c0; c <= c1; c++) {
      const ch = this.caseSalle(c, r), pied = ch && SG.PIEDS_OBJETS[ch];
      if (!pied) continue;
      let cx = c * T + 40;
      if (ch === 'X') cx += S.cristalDx || 0;
      if ((ch === 'o' || ch === 'F') && S.decalObjets) cx += S.decalObjets;
      else if ((ch === 'o' || ch === 'F') && this.imageSalle()) cx = SG.xDalle(cx);
      if (ch === 'B') {
        const bl = (this.blocs || []).find((q) => q.r === r && (q.c === c || (S.decalBloc && q.c + 1 === c)));
        if (bl) { if (bl.c !== c) continue; cx = bl.c * T + 40 + (S.decalBloc || 0); }
        if (bl) { const [hw, hh] = pied, yb = r * T + T - 4 + (S.decalBlocY || 0); if (SG.boitesSeTouchent(b, { x: cx - hw, y: yb - hh, w: hw * 2, h: hh })) return true; continue; }
      }
      const [hw, hh] = pied, dy = ch === 'o' && S.decalObjetsY ? S.decalObjetsY : 0;
      if (SG.boitesSeTouchent(b, { x: cx - hw, y: r * T + T - 4 - hh + dy, w: hw * 2, h: hh })) return true;
    }
    return false;
  },

  voisinSalle(dir) {
    const p = this.porteVers(dir);
    if (!p || p.type === 'sortie' || !this.porteOuverte(dir)) return null;
    return 'd1:' + p.voisine;
  },

  resoudre(k) {
    const D = this.etatDonjon();
    if (D.resolues.includes(k)) return;
    D.resolues.push(k);
    SG.Son.effet('coeur');
    const S = this.salle(k);
    if (S.coffre && S.coffre.cache) this.effets.push(new SG.Eclat(S.coffre.c * SG.T + 40, S.coffre.r * SG.T + 40));
    // les grilles qui s'ouvrent grâce à cette énigme scintillent, pour qu'on voie ce qui a changé
    if (k === this.salleCle()) for (const dir of ['haut', 'bas', 'gauche', 'droite']) {
      const p = this.porteVers(dir);
      if (p && p.type === 'enigme:' + k) {
        const c = { haut: [640, 40], bas: [640, SG.H - 40], gauche: [40, 360], droite: [SG.W - 40, 360] }[dir];
        this.effets.push(new SG.Eclat(c[0], c[1]));
      }
    }
    this.sauver();
  },

  toucherCristalEn(x, y) {
    if (!this.estDonjon()) {
      const ch = this.caseEn(Math.floor(x / SG.T), Math.floor(y / SG.T));
      if (ch === 'X') { this.activerCristalPlaine(); return true; }
      return false;
    }
    const rr = Math.floor(y / SG.T), dx = this.salle().cristalDx || 0;
    if (this.caseSalle(Math.floor(x / SG.T), rr) !== 'X' && this.caseSalle(Math.floor((x - dx) / SG.T), rr) !== 'X') return false;
    if (!this.cristalFrappe) { this.cristalFrappe = true; this.effets.push(new SG.Eclat(x, y - 30)); this.resoudre(this.salleCle()); }
    return true;
  },

  // mise à jour propre au donjon, appelée à chaque image de jeu
  majDonjon(dt, C) {
    const avant = this.tSalle || 0;
    this.tSalle = avant + dt;
    if (avant < SG.DELAI_GRILLES && this.tSalle >= SG.DELAI_GRILLES && this.sallePortesFermees()) SG.Son.effet('porte');
    const S = this.salle(), k = this.salleCle(), D = this.etatDonjon(), s = this.spirit;
    if (!this.entreeSalle) this.entreeSalle = { x: s.x, y: s.y };
    // salle piège : avant que les grilles tombent, Spirit fait quelques pas dans la salle (jamais coincé dans l'embrasure)
    // (et de même si la porte par laquelle il est entré est fermée, par exemple des volets qui attendent la plaque)
    const piege = (S.boss && !D.fini) || !!(S.combat && !D.resolues.includes(k) && this.monstres.length > 0);
    const cote = s.y > 604 ? 'bas' : s.y - s.ph < 116 ? 'haut' : s.x < 116 ? 'gauche' : s.x > 1164 ? 'droite' : null;
    if (cote && (piege || (!this.porteOuverte(cote) && this.tSalle < 1.2)) && this.imageSalle()) {
      const cible = { x: SG.clamp(s.x, 150, 1130), y: SG.clamp(s.y, 150 + s.ph, 590) };
      const dx = cible.x - s.x, dy = cible.y - s.y, d = Math.hypot(dx, dy);
      if (d > 1) {
        const v = Math.min(d, 380 * dt);
        s.x += dx / d * v; s.y += dy / d * v;
        s.dir = Math.abs(dx) > Math.abs(dy) ? (dx > 0 ? 'droite' : 'gauche') : (dy > 0 ? 'bas' : 'haut');
        s.bouge = true; s.tempsMarche = (s.tempsMarche || 0) + dt;
        if (this.tSalle >= SG.DELAI_GRILLES) this.tSalle = SG.DELAI_GRILLES - 0.01;
        return;
      }
    }
    if (s.chute > 0) {
      s.chute -= dt;
      if (s.chute <= 0) {
        s.chute = 0;
        s.x = this.entreeSalle.x; s.y = this.entreeSalle.y; s.invincible = 1.2;
        this.perdreVie(this.degats(2));
      }
      return;
    }
    if (!s.recul || true) {
      const cc = Math.floor(s.x / SG.T), rr = Math.floor((s.y - 10) / SG.T);
      const mq = this.masqueSalle(), lq = mq && mq[SG.clamp(Math.floor((s.y - 10) / 20), 0, 35)];
      if (this.caseSalle(cc, rr) === 'v' || (lq && lq[SG.clamp(Math.floor(s.x / 20), 0, 63)] === 'v')) { s.chute = 0.7; s.attaque = 0; s.recul = null; SG.Son.effet('fin'); return; }
    }
    if (this.bossDialogue) { this.bossDialogue = false; this.dialogue(SG.TEXTES.donjon.bossDebut); return; }
    if (S.combat && this.sallePleine && this.monstres.length === 0 && !D.resolues.includes(k)) this.resoudre(k);
    // plaque : il faut y poser quelque chose de lourd (la gargouille), le poids de Spirit ne suffit pas
    if (S.condition === 'plaque' && !D.resolues.includes(k)) {
      for (const b of this.blocs) if (b.anim <= 0 && S.plan[b.r][b.c] === 'I') this.resoudre(k);
    }
    if (S.condition === 'bloc' && !D.resolues.includes(k)) {
      for (const b of this.blocs) if (b.pousse && b.anim <= 0) this.resoudre(k);
    }
    for (const b of this.blocs) b.anim = Math.max(0, b.anim - dt * 4);
    // un butin ne reste jamais pris dans un objet (coffre apparu dessus, statue, bloc) : on le pousse sur la case libre la plus proche
    for (const bt of this.butins) {
      const c = Math.floor(bt.x / SG.T), r = Math.floor((bt.y - 10) / SG.T);
      const libre = (cc, rr) => { const ch = this.caseSalle(cc, rr); return ch !== null && !SG.CASES_SALLE_PLEINES.has(ch); };
      if (libre(c, r)) continue;
      let mieux = null;
      for (const [dc, dr] of [[0, 1], [1, 0], [-1, 0], [0, -1], [1, 1], [-1, 1], [1, -1], [-1, -1]]) {
        if (libre(c + dc, r + dr)) { mieux = [c + dc, r + dr]; break; }
      }
      if (mieux) { bt.x = mieux[0] * SG.T + 40; bt.y = mieux[1] * SG.T + 50; }
    }
    // pousser un bloc, ouvrir une porte verrouillée
    const a = C.axe();
    if (a.x || a.y) {
      const d = SG.DIRS[s.dir];
      const fc = Math.floor((s.x + d.x * 34) / SG.T), fr = Math.floor((s.y - 11 + (d.y > 0 ? 46 : d.y * 24)) / SG.T);
      const ch = this.caseSalle(fc, fr);
      if (ch === 'B') {
        this.pousse += dt;
        if (this.pousse > 0.35) {
          this.pousse = 0;
          const b = this.blocs.find((q) => q.r === fr && (q.c === fc || (S.decalBloc && q.c + 1 === fc)));
          const bc = b ? b.c : fc, nc = bc + d.x, nr = fr + d.y, cible = this.caseSalle(nc, nr), cible2 = S.decalBloc ? this.caseSalle(nc + 1, nr) : '.';
          const libre = (cible === '.' || cible === 'I' || (S.decalBloc && d.x > 0 && cible === 'B')) && (cible2 === '.' || cible2 === 'I' || (S.decalBloc && d.x < 0 && cible2 === 'B')) && !this.dirPorte(nc, nr) && !this.monstres.some((m) => Math.floor(m.x / SG.T) === nc && Math.floor((m.y - 5) / SG.T) === nr);
          if (b && libre && !((S.condition === 'bloc' || S.condition === 'plaque') && D.resolues.includes(k))) { b.c = nc; b.r = nr; b.dc = d.x; b.dr = d.y; b.anim = 1; b.pousse = true; SG.Son.effet('porte'); }
        }
      } else this.pousse = 0;
      // la porte se cherche un peu plus loin que le bloc : Spirit bute contre l'embrasure, pas dedans
      const dp = this.dirPorte(Math.floor((s.x + d.x * 70) / SG.T), Math.floor((s.y - 11 + (d.y > 0 ? 60 : d.y * 60)) / SG.T));
      if (dp && dp === s.dir && !this.porteOuverte(dp) && !this.sallePortesFermees() && !this.messageVerrou) {
        const p = this.porteVers(dp);
        if (p && p.type === 'cle') {
          if (D.cles > 0) { D.cles--; D.ouvertes.push(p.cle); SG.Son.effet('valide'); this.sauver(); }
          else { this.messageVerrou = true; this.dialogue([[null, SG.TEXTES.donjon.verrou]], () => { setTimeout(() => { this.messageVerrou = false; }, 1500); }); }
        } else if (p && p.type === 'boss') {
          if (D.cleBoss) { D.ouvertes.push(p.cle); SG.Son.effet('objet'); this.sauver(); }
          else { this.messageVerrou = true; this.dialogue([[null, SG.TEXTES.donjon.verrouBoss]], () => { setTimeout(() => { this.messageVerrou = false; }, 1500); }); }
        }
      }
    } else this.pousse = 0;
    for (const f of this.feux || []) f.maj(dt);
  },

  // ouvrir un coffre placé devant Spirit
  ouvrirCoffre() {
    if (!this.estDonjon()) return false;
    const S = this.salle(), k = this.salleCle(), D = this.etatDonjon(), s = this.spirit, d = SG.DIRS[s.dir];
    const cf = S.coffre;
    if (!cf || D.coffres.includes(k)) return false;
    const fc = Math.floor((s.x + d.x * 60) / SG.T), fr = Math.floor((s.y - 11 + d.y * 70) / SG.T);
    if (fc !== cf.c || fr !== cf.r || this.caseSalle(fc, fr) !== 'C') return false;
    D.coffres.push(k);
    const T = SG.TEXTES.donjon;
    const contenu = cf.contenu;
    if (contenu === 'cle') { D.cles++; this.montrerObjet('cle', T.cle); }
    else if (contenu === 'carte') { D.carte = true; this.montrerObjet('carte', T.carte); }
    else if (contenu === 'boussole') { D.boussole = true; this.montrerObjet('boussole', T.boussole); }
    else if (contenu === 'cleBoss') { D.cleBoss = true; this.montrerObjet('cleBoss', T.cleBoss); }
    else if (contenu === 'manette') { this.manette = true; this.objetB = 'manette'; this.montrerObjet('manette', T.manette); }
    this.sauver();
    return true;
  },

  lancerManette() {
    if (this.objetB !== 'manette' || this.projectiles.some((p) => p instanceof SG.Manette)) return;
    this.projectiles.push(new SG.Manette(this, this.spirit.dir));
    SG.Son.effet('lance');
    this.spirit.attaque = 0.18;
  },

  bossVaincu() {
    const D = this.etatDonjon();
    D.fini = true;
    SG.Son.jouerMusique('donjon');
    const b = new SG.Butin('receptacle', 640, 420, true);
    this.butins.push(b);
    this.pnj.push(new SG.Flash(640, 300));
    this.sauver();
  },

  parlerFlash() {
    const D = this.etatDonjon();
    this.dialogue(SG.TEXTES.donjon.flash, () => {
      this.source = (this.source || 0) + 1;
      D.flashVu = true;
      this.montrerObjet('source', SG.TEXTES.donjon.source, () => {
        this.dialogue([[null, SG.TEXTES.donjon.apresFlash]], () => {
          this.fonduVers(() => {
            const o = SG.DONJON1.sortie;
            this.spirit.x = o.x; this.spirit.y = o.y; this.spirit.dir = 'bas';
            this.entrerEcran(o.ecran);
          });
        });
      });
    });
  },

  // ---------------------------------------------------------------- dessin des salles
  fondSalle(cle) {
    const peinte = this.imageSalle(cle.slice(3));
    const nomFond = cle + '|' + (peinte ? peinte.src : '');
    if (this.fonds[nomFond]) return this.fonds[nomFond];
    if (peinte) {
      const S0 = this.salle(cle.slice(3));
      const cv = document.createElement('canvas');
      const k = Math.min(2, this.echelle);
      cv.width = SG.W * k; cv.height = SG.H * k;
      const ctx = cv.getContext('2d');
      ctx.scale(k, k);
      ctx.drawImage(peinte, 0, 0, SG.W, SG.H);
      // ouvertures sans porte : murées avec un morceau du même mur, pris juste à côté
      const q = peinte.width / SG.W;
      const ouv = { haut: [572, 0, 136, 120, 300, 0], bas: [572, 600, 136, 120, 300, 600], gauche: [0, 306, 124, 112, 0, 180], droite: [1156, 306, 124, 112, 1156, 180] };
      const [sx0, sy0] = cle.slice(3).split(',').map(Number);
      for (const dir in ouv) {
        const d = SG.DIRS[dir], voisine = (sx0 + d.x) + ',' + (sy0 + d.y);
        const aPorte = SG.DONJON1.portes[SG.cleSalles(cle.slice(3), voisine)] || (cle.slice(3) === SG.DONJON1.entree.salle && dir === 'bas');
        if (aPorte || (S0.murees && S0.murees.includes(dir))) continue;
        const [x, y, w, h, sx, sy] = ouv[dir];
        ctx.drawImage(peinte, sx * q, sy * q, w * q, h * q, x, y, w, h);
      }
      this.fonds[nomFond] = cv;
      return cv;
    }
    if (this.fonds[cle]) return this.fonds[cle];
    const S = this.salle(cle.slice(3));
    const k = Math.min(2, this.echelle), T = SG.T;
    const cv = document.createElement('canvas');
    cv.width = SG.W * k; cv.height = SG.H * k;
    const ctx = cv.getContext('2d');
    ctx.scale(k, k);
    const im = SG.img['salle-donjon'];
    const sv = SG.img['salle-vide'];
    if (sv && sv.width) {
      // salle sans porte : son sol intérieur (152..1521 × 152..785) tombe exactement sur la grille de jeu
      SG.cadre(ctx, sv, 0, 0, SG.W, SG.H, 152, 80);
    } else if (im && im.width) {
      // l'image est calée pour que son sol corresponde exactement à la grille de la salle (cases 1 à 14, lignes 1 à 7)
      ctx.drawImage(im, -42, -41, 1365, 811);
      // les ouvertures sans porte sont murées avec un morceau du mur voisin
      // chaque morceau : [x, y, largeur, hauteur, source x, source y] ; tout l'encadrement de la porte est recouvert
      const ouv = {
        haut: [[503, 0, 274, 92, 223, 0]],
        bas: [[503, 628, 274, 92, 223, 628]],
        gauche: [[0, 224, 92, 124, 0, 96], [0, 348, 92, 126, 0, 476]],
        droite: [[1188, 224, 92, 124, 1188, 96], [1188, 348, 92, 126, 1188, 476]],
      };
      for (const dir in (sv && sv.width ? {} : ouv)) {
        if (this.porteVers(dir)) continue;
        for (const [x, y, w, h, sx, sy] of ouv[dir]) ctx.drawImage(cv, sx * k, sy * k, w * k, h * k, x, y, w, h);
      }
    } else {
      // dalles sombres veinées de violet
      const alea = SG.graine(cle.length * 31 + cle.charCodeAt(3) * 7 + cle.charCodeAt(5));
      ctx.fillStyle = '#1d1a2e'; ctx.fillRect(0, 0, SG.W, SG.H);
      for (let r = 1; r < SG.ROWS - 1; r++) for (let c = 1; c < SG.COLS - 1; c++) {
        const v = 38 + Math.floor(alea() * 12);
        ctx.fillStyle = `rgb(${v},${v - 4},${v + 18})`;
        ctx.fillRect(c * T + 2, r * T + 2, T - 4, T - 4);
        ctx.fillStyle = 'rgba(255,255,255,0.06)'; ctx.fillRect(c * T + 2, r * T + 2, T - 4, 6);
        if (alea() < 0.12) { ctx.strokeStyle = 'rgba(170,80,255,0.5)'; ctx.lineWidth = 2; ctx.beginPath(); const x = c * T + 10 + alea() * 50, y = r * T + 10 + alea() * 50; ctx.moveTo(x, y); ctx.lineTo(x + 12, y + 8); ctx.lineTo(x + 20, y + 4); ctx.stroke(); }
      }
      // murs épais en pierre
      const mur = (x, y, w, h) => {
        ctx.fillStyle = '#2c2842'; ctx.fillRect(x, y, w, h);
        ctx.strokeStyle = '#151222'; ctx.lineWidth = 3;
        for (let yy = y; yy < y + h; yy += 26) for (let xx = x + ((yy / 26) % 2) * 20; xx < x + w; xx += 40) ctx.strokeRect(xx, yy, 40, 26);
      };
      mur(0, 0, SG.W, T); mur(0, SG.H - T, SG.W, T); mur(0, 0, T, SG.H); mur(SG.W - T, 0, T, SG.H);
      ctx.fillStyle = 'rgba(0,0,0,0.35)'; ctx.fillRect(T, T, SG.W - 2 * T, 14); ctx.fillRect(T, T, 14, SG.H - 2 * T);
    }
    // gouffres : l'image est étirée sur chaque groupe de cases de trou
    const gf = SG.img.gouffre;
    if (gf && gf.width) {
      const vu = new Set();
      const estTrou = (c, r) => S.plan[r] && (S.plan[r][c] === 'v' || S.plan[r][c] === 'X');
      for (let r = 0; r < SG.ROWS; r++) for (let c = 0; c < SG.COLS; c++) {
        if (S.plan[r][c] !== 'v' || vu.has(c + ',' + r)) continue;
        let c0 = c, c1 = c, r0 = r, r1 = r;
        const pile = [[c, r]];
        while (pile.length) {
          const [x, y] = pile.pop();
          if (vu.has(x + ',' + y) || !estTrou(x, y)) continue;
          vu.add(x + ',' + y);
          c0 = Math.min(c0, x); c1 = Math.max(c1, x); r0 = Math.min(r0, y); r1 = Math.max(r1, y);
          pile.push([x + 1, y], [x - 1, y], [x, y + 1], [x, y - 1]);
        }
        const gx = c0 * T, gy = r0 * T, gw = (c1 - c0 + 1) * T, gh = (r1 - r0 + 1) * T;
        SG.cadre(ctx, gf, gx, gy, gw, gh, Math.round(gf.width * 0.3), 24);
        // bord supérieur plus sombre : le sol surplombe le trou
        const og = ctx.createLinearGradient(0, gy, 0, gy + 22);
        og.addColorStop(0, 'rgba(0,0,0,0.6)'); og.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = og; ctx.fillRect(gx, gy, gw, 22);
        ctx.strokeStyle = 'rgba(10,5,20,0.9)'; ctx.lineWidth = 3; ctx.strokeRect(gx + 1, gy + 1, gw - 2, gh - 2);
      }
    }
    // trous et plaques
    for (let r = 0; r < SG.ROWS; r++) for (let c = 0; c < SG.COLS; c++) {
      const ch = S.plan[r][c];
      if (ch === 'v' && !(gf && gf.width)) {
        ctx.fillStyle = '#05030a'; ctx.fillRect(c * T, r * T, T, T);
        const g = ctx.createLinearGradient(0, r * T, 0, r * T + 26);
        g.addColorStop(0, 'rgba(90,60,140,0.6)'); g.addColorStop(1, 'rgba(0,0,0,0)');
        if (S.plan[r - 1] && S.plan[r - 1][c] !== 'v') { ctx.fillStyle = g; ctx.fillRect(c * T, r * T, T, 26); }
      }
      if (ch === 'I') {
        ctx.fillStyle = '#2a2440'; ctx.strokeStyle = '#0b0914'; ctx.lineWidth = 4;
        ctx.beginPath(); ctx.roundRect(c * T + 6, r * T + 6, T - 12, T - 12, 10); ctx.fill(); ctx.stroke();
        ctx.strokeStyle = '#8a4dff'; ctx.lineWidth = 3;
        ctx.beginPath(); ctx.roundRect(c * T + 16, r * T + 16, T - 32, T - 32, 6); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(c * T + 40, r * T + 20); ctx.lineTo(c * T + 60, r * T + 40); ctx.lineTo(c * T + 40, r * T + 60); ctx.lineTo(c * T + 20, r * T + 40); ctx.closePath(); ctx.stroke();
      }
    }
    this.fonds[cle] = cv;
    return cv;
  },

  objetsSalle(liste) {
    const S = this.salle(), k = this.salleCle(), D = this.etatDonjon(), T = SG.T;
    for (let r = 0; r < SG.ROWS; r++) for (let c = 0; c < SG.COLS; c++) {
      const ch = this.caseSalle(c, r), x = c * T + 40, y = r * T + T;
      // alignement : décalage propre à la salle (statues alignées sur la gargouille et la plaque), sinon milieu des dalles
      const xd = (ch === 'o' || ch === 'F') && S.decalObjets ? x + S.decalObjets : this.imageSalle() ? SG.xDalle(x) : x;
      const yd = ch === 'o' && S.decalObjetsY ? y + S.decalObjetsY : y;
      if (ch === 'o') liste.push({ y: yd, dessiner: (ctx) => SG.dessinStatue(ctx, xd, yd) });
      else if (ch === 'F') liste.push({ y, dessiner: (ctx) => SG.dessinBrasero(ctx, xd, y) });
      else if (ch === 'p') liste.push({ y, dessiner: (ctx) => SG.dessinPot(ctx, x, y) });
      else if (ch === 'C') liste.push({ y, dessiner: (ctx) => SG.dessinCoffre(ctx, x, y, D.coffres.includes(k)) });
      else if (ch === 'X') liste.push({ y, dessiner: (ctx) => SG.dessinCristal(ctx, x + (S.cristalDx || 0), y, this.cristalFrappe, this.t) });
    }
    // plaque enfoncée par la gargouille : elle s'illumine
    if (S.condition === 'plaque' && D.resolues.includes(k) && !this.imageSalle()) {
      S.plan.forEach((ligne, r) => [...ligne].forEach((ch, c) => {
        if (ch === 'I') liste.push({ y: -60, dessiner: (ctx) => { ctx.save(); ctx.shadowColor = '#5ff3ff'; ctx.shadowBlur = 24; ctx.strokeStyle = '#5ff3ff'; ctx.lineWidth = 4; ctx.beginPath(); ctx.roundRect(c * T + 8, r * T + 8, T - 16, T - 16, 10); ctx.stroke(); ctx.restore(); } });
      }));
    }
    for (const b of this.blocs || []) {
      const tremble = this.pousse > 0.05 && SG.dist(this.spirit.x, this.spirit.y, b.c * T + 40, b.r * T + 40) < 130 ? Math.sin(this.t * 70) * 2.5 : 0;
      const x = b.c * T + 40 + (S.decalBloc || 0) - b.dc * b.anim * T + tremble, y = b.r * T + T + (S.decalBlocY || 0) - b.dr * b.anim * T;
      // traces de frottement au sol : le bloc a déjà bougé, il peut bouger encore
      liste.push({ y, dessiner: (ctx) => {
        if (!b.statue) { SG.dessinBloc(ctx, x, y); return; }
        if (SG.img['gargouille-poussable'] && SG.img['gargouille-poussable'].width) { SG.dessinerPied(ctx, SG.img['gargouille-poussable'], x, y); return; }
        // la gargouille à pousser ressemble exactement aux autres : au joueur de la trouver
        SG.dessinStatue(ctx, x, y);
      } });
    }
    // portes (toujours derrière les personnages : dessinées sur le fond)
    for (const dir of ['haut', 'bas', 'gauche', 'droite']) {
      const p = this.porteVers(dir);
      liste.push({ y: dir === 'bas' ? SG.H + 100 : -100, dessiner: (ctx) => SG.dessinPorte(ctx, dir, p, this.porteOuverte(dir), this.sallePortesFermees(), !!this.imageSalle(), SG.clamp(((this.tSalle || 0) - SG.DELAI_GRILLES) / 0.22, 0, 1)) });
    }
    this.avantPortes(liste);
  },

  // quand Spirit s'engage dans une porte peinte, le linteau et les montants passent devant lui : il entre DANS la porte
  avantPortes(liste) {
    const sp = this.spirit;
    if (!sp || !this.imageSalle()) return;
    const zones = [];
    // portes de côté : le mur au-dessus de l'ouverture est derrière Spirit, rien ne passe devant lui
    if (sp.y < 124 && this.porteOuverte('haut')) zones.push([522, 0, 58, 124], [700, 0, 58, 124]);
    if (sp.y > 606 && this.porteOuverte('bas')) zones.push([566, 680, 148, 40], [522, 588, 66, 132], [692, 588, 66, 132]);
    if (!zones.length) return;
    const cv = this.fondSalle(this.ecran), k = cv.width / SG.W;
    liste.push({ y: sp.y + 0.5, dessiner: (ctx) => { for (const [x, y, w, h] of zones) ctx.drawImage(cv, x * k, y * k, w * k, h * k, x, y, w, h); } });
  },

  // ---------------------------------------------------------------- carte du donjon
  dessinerCarteDonjon(ctx, x, y, w, h) {
    ctx.drawImage(SG.img['ui-parchemin'], x, y, w, h);
    const D = this.etatDonjon();
    SG.texte(ctx, SG.DONJON1.nom, x + w / 2, y + h * 0.11, Math.round(h * 0.055), '#5a3810', 'center', 'rgba(255,240,200,0.8)', 4, true);
    const cw = h * 0.16 * 16 / 9, ch = h * 0.16;
    const ox = x + (w - cw * 3) / 2, oy = y + h * 0.16;
    for (const k in SG.DONJON1.salles) {
      const [cx, cy] = k.split(',').map(Number);
      const vue = D.visites.includes(k);
      if (!vue && !D.carte) continue;
      const vx = ox + cx * cw, vy = oy + cy * ch;
      ctx.fillStyle = vue ? 'rgba(90,60,30,0.55)' : 'rgba(90,60,30,0.18)';
      ctx.fillRect(vx + 6, vy + 6, cw - 12, ch - 12);
      ctx.strokeStyle = '#4a2c10'; ctx.lineWidth = 3; ctx.strokeRect(vx + 6, vy + 6, cw - 12, ch - 12);
      const S = SG.DONJON1.salles[k];
      if (D.boussole && S.coffre && !D.coffres.includes(k)) { ctx.fillStyle = '#e0a020'; ctx.fillRect(vx + cw / 2 - 8, vy + ch / 2 - 6, 16, 12); }
      if (D.boussole && S.boss && !D.fini) { ctx.fillStyle = '#b01030'; ctx.beginPath(); ctx.arc(vx + cw / 2, vy + ch / 2, 10, 0, 7); ctx.fill(); }
    }
    // liaisons entre salles
    for (const pk in SG.DONJON1.portes) {
      const [a, b] = pk.split('|');
      if (!(D.visites.includes(a) || D.carte) || !(D.visites.includes(b) || D.carte)) continue;
      const [ax, ay] = a.split(',').map(Number), [bx, by] = b.split(',').map(Number);
      const mx = ox + (ax + bx + 1) / 2 * cw, my = oy + (ay + by + 1) / 2 * ch;
      ctx.fillStyle = '#4a2c10'; ctx.fillRect(mx - 6, my - 6, 12, 12);
    }
    const [ex, ey] = this.salleCle().split(',').map(Number);
    const mx = ox + ex * cw + this.spirit.x / SG.W * cw, my = oy + ey * ch + this.spirit.y / SG.H * ch;
    const p = 1 + Math.sin(this.t * 6) * 0.25;
    ctx.fillStyle = 'rgba(220,30,40,0.35)'; ctx.beginPath(); ctx.arc(mx, my, 12 * p, 0, 7); ctx.fill();
    ctx.fillStyle = '#d8202e'; ctx.beginPath(); ctx.arc(mx, my, 6, 0, 7); ctx.fill();
    const lig = [`Clés : ${D.cles}`, D.cleBoss ? 'Grande clé : oui' : 'Grande clé : non', D.carte ? 'Carte : oui' : 'Carte : non', D.boussole ? 'Boussole : oui' : 'Boussole : non'];
    SG.texte(ctx, lig.join('     '), x + w / 2, y + h - h * 0.08, Math.round(h * 0.035), '#5a3810', 'center', 'rgba(255,240,200,0.8)', 3);
  },
});

// ---------------------------------------------------------------- dessins provisoires des éléments de donjon
// (remplacés par les images générées dès qu'elles sont disponibles)
SG.dessinImageOu = function (nom, ctx, x, y, secours, opts) {
  const im = SG.img[nom];
  if (im && im.width) { SG.dessinerPied(ctx, im, x, y, opts); return; }
  secours();
};
SG.tracesBloc = function (ctx, x, y) {
  ctx.save();
  ctx.strokeStyle = 'rgba(190,180,230,0.35)'; ctx.lineWidth = 3; ctx.lineCap = 'round';
  for (const dx of [-26, -8, 10, 28]) {
    ctx.beginPath(); ctx.moveTo(x + dx, y - 44); ctx.lineTo(x + dx + 2, y - 78); ctx.stroke();
  }
  ctx.restore();
};
SG.dessinBloc = function (ctx, x, y) {
  SG.dessinImageOu('bloc', ctx, x, y, () => {
    ctx.save(); ctx.fillStyle = '#6a6284'; ctx.strokeStyle = '#120f1d'; ctx.lineWidth = 4;
    ctx.beginPath(); ctx.roundRect(x - 38, y - 92, 76, 88, 8); ctx.fill(); ctx.stroke();
    ctx.fillStyle = '#8c84a8'; ctx.beginPath(); ctx.roundRect(x - 34, y - 88, 68, 30, 6); ctx.fill();
    ctx.strokeStyle = 'rgba(0,0,0,0.3)'; ctx.beginPath(); ctx.moveTo(x - 20, y - 40); ctx.lineTo(x + 20, y - 40); ctx.stroke();
    ctx.restore();
  });
};
SG.dessinStatue = function (ctx, x, y) {
  SG.dessinImageOu('statue', ctx, x, y, () => {
    ctx.save(); ctx.fillStyle = '#3e3856'; ctx.strokeStyle = '#0d0b16'; ctx.lineWidth = 4;
    ctx.beginPath(); ctx.roundRect(x - 34, y - 40, 68, 36, 6); ctx.fill(); ctx.stroke();
    ctx.fillStyle = '#524a70'; ctx.beginPath(); ctx.roundRect(x - 24, y - 110, 48, 74, 12); ctx.fill(); ctx.stroke();
    ctx.fillStyle = '#c070ff'; ctx.beginPath(); ctx.arc(x - 8, y - 88, 4, 0, 7); ctx.arc(x + 8, y - 88, 4, 0, 7); ctx.fill();
    ctx.restore();
  });
};
SG.dessinBrasero = function (ctx, x, y) {
  SG.dessinImageOu('brasero', ctx, x, y, () => {
    ctx.save(); ctx.fillStyle = '#3a2e22'; ctx.strokeStyle = '#0d0b16'; ctx.lineWidth = 4;
    ctx.beginPath(); ctx.moveTo(x - 30, y - 50); ctx.lineTo(x + 30, y - 50); ctx.lineTo(x + 18, y - 8); ctx.lineTo(x - 18, y - 8); ctx.closePath(); ctx.fill(); ctx.stroke();
    ctx.restore();
  });
};
SG.dessinPot = function (ctx, x, y) {
  SG.dessinImageOu('pot', ctx, x, y, () => {
    ctx.save(); ctx.fillStyle = '#9a5a32'; ctx.strokeStyle = '#1a0d05'; ctx.lineWidth = 4;
    ctx.beginPath(); ctx.ellipse(x, y - 30, 26, 26, 0, 0, 7); ctx.fill(); ctx.stroke();
    ctx.fillStyle = '#b87040'; ctx.beginPath(); ctx.roundRect(x - 16, y - 66, 32, 14, 4); ctx.fill(); ctx.stroke();
    ctx.restore();
  });
};
SG.dessinCoffre = function (ctx, x, y, ouvert) {
  SG.dessinImageOu(ouvert ? 'coffre-ouvert' : 'coffre', ctx, x, y, () => {
    ctx.save(); ctx.fillStyle = '#7a4a1e'; ctx.strokeStyle = '#1a0d05'; ctx.lineWidth = 4;
    ctx.beginPath(); ctx.roundRect(x - 36, y - 56, 72, 48, 6); ctx.fill(); ctx.stroke();
    ctx.fillStyle = ouvert ? '#140a04' : '#8e5a26';
    ctx.beginPath(); ctx.roundRect(x - 36, y - 76, 72, 24, 8); ctx.fill(); ctx.stroke();
    ctx.fillStyle = '#ffd23a'; ctx.fillRect(x - 6, y - 60, 12, 14); ctx.strokeRect(x - 6, y - 60, 12, 14);
    ctx.restore();
  });
};
SG.dessinCristal = function (ctx, x, y, frappe, t) {
  SG.dessinImageOu(frappe ? 'cristal-actif' : 'cristal', ctx, x, y, () => {
    ctx.save();
    ctx.fillStyle = '#3e3856'; ctx.strokeStyle = '#0d0b16'; ctx.lineWidth = 4;
    ctx.beginPath(); ctx.roundRect(x - 26, y - 26, 52, 22, 6); ctx.fill(); ctx.stroke();
    const hy = y - 70 + Math.sin(t * 3) * 3;
    ctx.fillStyle = frappe ? '#ffb030' : '#40c8ff';
    ctx.beginPath(); ctx.moveTo(x, hy - 34); ctx.lineTo(x + 22, hy); ctx.lineTo(x, hy + 34); ctx.lineTo(x - 22, hy); ctx.closePath(); ctx.fill(); ctx.stroke();
    ctx.restore();
  });
};
SG.DELAI_GRILLES = 0.6;
SG.dessinPorte = function (ctx, dir, p, ouverte, volets, peinte, descente = 1) {
  if (!p) return;
  if (peinte) {
    // l'ouverture est déjà peinte dans la salle : ouverte, rien à dessiner ; fermée, le battant remplit l'embrasure
    if (ouverte) return;
    const t = p.type;
    const im = SG.img[(volets || t === 'o' || t.startsWith('enigme') || t === 'sortie') ? 'battant-grille' : t === 'boss' ? 'battant-boss' : 'battant-cle'];
    const o = { haut: [640, 59, 128, 118, 0], bas: [638, 660, 126, 120, Math.PI], gauche: [61, 362, 104, 122, -Math.PI / 2], droite: [1219, 361, 104, 122, Math.PI / 2] }[dir];
    const [cx, cy, L, P, ang] = o;
    ctx.save(); ctx.translate(cx, cy); ctx.rotate(ang);
    ctx.beginPath(); ctx.rect(-L / 2, -P / 2, L, P); ctx.clip();
    if (im && im.width) {
      const sh = Math.min(im.height, im.width * P / L);
      const glisse = volets ? (1 - descente) * P : 0;
      ctx.drawImage(im, 0, (im.height - sh) / 2, im.width, sh, -L / 2, -P / 2 - glisse, L, P);
    }
    const g = ctx.createLinearGradient(0, P / 2, 0, P / 2 - 22);
    g.addColorStop(0, 'rgba(0,0,0,0.45)'); g.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = g; ctx.fillRect(-L / 2, P / 2 - 22, L, 22);
    ctx.restore();
    return;
  }
  const type = p.type;
  let nom = 'battant-ouvert';
  if (!ouverte) nom = (volets || type === 'o' || type.startsWith('enigme') || type === 'sortie') ? 'battant-grille' : type === 'boss' ? 'battant-boss' : 'battant-cle';
  const im = SG.img[nom];
  // l'ouverture est découpée dans l'épaisseur du mur (80 pixels), comme dans Zelda
  const L = dir === 'haut' || dir === 'bas' ? 150 : 110;
  const centre = { haut: [640, 40, 0], bas: [640, SG.H - 40, Math.PI], gauche: [40, 360, -Math.PI / 2], droite: [SG.W - 40, 360, Math.PI / 2] }[dir];
  ctx.save();
  ctx.translate(centre[0], centre[1]);
  ctx.rotate(centre[2]);
  // repère : le mur va de y = -40 (extérieur) à y = +40 (côté salle)
  ctx.fillStyle = '#05030a';
  ctx.fillRect(-L / 2, -40, L, 80);
  if (im && im.width) {
    // on garde les proportions du battant : on prend la bande centrale de l'image (serrure au milieu) au lieu de l'écraser
    const w = L - 12, h = 82, sh = Math.min(im.height, im.width * h / w);
    // la grille qui vient de se fermer descend du haut de l'embrasure
    const glisse = volets && !ouverte ? (1 - descente) * h : 0;
    ctx.save(); ctx.beginPath(); ctx.rect(-L / 2, -40, L, 80); ctx.clip();
    ctx.drawImage(im, 0, (im.height - sh) / 2, im.width, sh, -L / 2 + 6, -40 - glisse, w, h);
    ctx.restore();
  }
  // montants de pierre : ombre et contour pour l'encastrer
  ctx.strokeStyle = '#0b0814'; ctx.lineWidth = 5;
  ctx.beginPath(); ctx.moveTo(-L / 2, 40); ctx.lineTo(-L / 2, -40); ctx.lineTo(L / 2, -40); ctx.lineTo(L / 2, 40); ctx.stroke();
  const g = ctx.createLinearGradient(-L / 2, 0, -L / 2 + 18, 0);
  g.addColorStop(0, 'rgba(0,0,0,0.55)'); g.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = g; ctx.fillRect(-L / 2, -40, 18, 80);
  const g2 = ctx.createLinearGradient(L / 2, 0, L / 2 - 18, 0);
  g2.addColorStop(0, 'rgba(0,0,0,0.55)'); g2.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = g2; ctx.fillRect(L / 2 - 18, -40, 18, 80);
  ctx.restore();
};
