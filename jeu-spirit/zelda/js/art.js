// Tous les dessins du jeu : tuiles, Spirit, monstres, objets, effets.
'use strict';

SG.Art = { tuiles: {}, spr: {} };

(() => {
  const Px = SG.Px;
  const A = SG.Art;
  const fin = (g) => Px.canevas(g);

  // ---------------------------------------------------------------- couleurs
  const HERBE = ['#2c6e34', '#3f9142', '#58ad4c', '#80cc62'];         // sombre → clair
  const TERRE = ['#9a6b3c', '#b8844c', '#d2a061', '#e6bf82'];
  const EAU = ['#1d4f9c', '#2f6fd0', '#4a92ea', '#9fd2ff'];
  const FEUILLE = ['#174a2a', '#226b33', '#35903d', '#5cb44c', '#98dc6c'];
  const ROC = ['#4c4f63', '#6c7088', '#9297ad', '#c3c8d8'];
  const TRONC = ['#4a2c18', '#6e4424', '#93602f'];
  const TRAIT = '#162418';        // trait des décors
  const TRAIT_P = '#1b1f3a';      // trait des personnages

  // ---------------------------------------------------------------- sol d'herbe (2 variantes)
  const herbe = (graine, touffes) => {
    const g = Px.grille(16, 16), r = Px.graine(graine);
    Px.rect(g, 0, 0, 16, 16, HERBE[1]);
    for (let i = 0; i < 18; i++) Px.poser(g, Math.floor(r() * 16), Math.floor(r() * 16), r() < 0.5 ? HERBE[2] : '#378a3e');
    for (let i = 0; i < touffes; i++) {
      const x = 1 + Math.floor(r() * 13), y = 1 + Math.floor(r() * 13);
      Px.poser(g, x, y, HERBE[3]); Px.poser(g, x + 2, y, HERBE[3]);
      Px.poser(g, x, y + 1, HERBE[0]); Px.poser(g, x + 1, y + 1, HERBE[2]); Px.poser(g, x + 2, y + 1, HERBE[0]);
    }
    return g;
  };
  A.tuiles.herbe = fin(herbe(11, 3));
  A.tuiles.herbe2 = fin(herbe(29, 1));

  // fleurs
  const fleurs = herbe(47, 1);
  [[3, 3, '#ffffff'], [11, 5, '#ffe45c'], [6, 11, '#ffffff'], [13, 12, '#ff8fb0']].forEach(([x, y, c]) => {
    Px.poser(fleurs, x, y - 1, c); Px.poser(fleurs, x - 1, y, c); Px.poser(fleurs, x + 1, y, c); Px.poser(fleurs, x, y + 1, c);
    Px.poser(fleurs, x, y, '#f2a33a');
  });
  A.tuiles.fleurs = fin(fleurs);

  // ---------------------------------------------------------------- chemin de terre et ses bords
  const terre = Px.grille(16, 16), rt = Px.graine(5);
  Px.rect(terre, 0, 0, 16, 16, TERRE[2]);
  for (let i = 0; i < 22; i++) Px.poser(terre, Math.floor(rt() * 16), Math.floor(rt() * 16), rt() < 0.6 ? TERRE[1] : TERRE[3]);
  for (let i = 0; i < 3; i++) { const x = Math.floor(rt() * 14), y = Math.floor(rt() * 14); Px.poser(terre, x, y, TERRE[3]); Px.poser(terre, x + 1, y + 1, TERRE[0]); Px.poser(terre, x, y + 1, TERRE[1]); }
  A.tuiles.terre = fin(terre);

  // bord d'herbe qui déborde sur la terre ou l'eau, pour chaque côté (h, b, g, d)
  const bord = (cote, fond) => {
    const g = Px.grille(16, 16), r = Px.graine({ h: 3, b: 7, g: 13, d: 17 }[cote] + (fond === 'eau' ? 50 : 0));
    for (let i = 0; i < 16; i++) {
      const e = 2 + Math.floor(r() * 2.2);            // épaisseur irrégulière
      for (let k = 0; k <= e; k++) {
        const c = k === e ? (fond === 'eau' ? '#1b3f2a' : '#6e4a26') : k === e - 1 ? HERBE[0] : k === 0 ? HERBE[1] : HERBE[2];
        const [x, y] = { h: [i, k], b: [i, 15 - k], g: [k, i], d: [15 - k, i] }[cote];
        Px.poser(g, x, y, c);
      }
      if (fond === 'eau') {
        const [x, y] = { h: [i, e + 1], b: [i, 15 - e - 1], g: [e + 1, i], d: [15 - e - 1, i] }[cote];
        if (r() < 0.7) Px.poser(g, x, y, EAU[3]);
      }
    }
    return fin(g);
  };
  for (const c of ['h', 'b', 'g', 'd']) { A.tuiles['bord-terre-' + c] = bord(c, 'terre'); A.tuiles['bord-eau-' + c] = bord(c, 'eau'); }
  // petit coin d'herbe quand seule la diagonale est en herbe
  const coin = (cx, cy, fond) => {
    const g = Px.grille(16, 16);
    for (let y = 0; y < 4; y++) for (let x = 0; x < 4 - y; x++) {
      const px = cx ? 15 - x : x, py = cy ? 15 - y : y;
      Px.poser(g, px, py, x + y === 3 - 0 ? (fond === 'eau' ? '#1b3f2a' : '#6e4a26') : x + y === 2 ? HERBE[0] : HERBE[2]);
    }
    return fin(g);
  };
  for (const [n, cx, cy] of [['hg', 0, 0], ['hd', 1, 0], ['bg', 0, 1], ['bd', 1, 1]]) { A.tuiles['coin-terre-' + n] = coin(cx, cy, 'terre'); A.tuiles['coin-eau-' + n] = coin(cx, cy, 'eau'); }

  // ---------------------------------------------------------------- eau (2 images pour l'animation)
  const eau = (dec) => {
    const g = Px.grille(16, 16);
    Px.rect(g, 0, 0, 16, 16, EAU[1]);
    const vague = (x, y) => { Px.poser(g, (x + dec) & 15, y, EAU[2]); Px.poser(g, (x + 1 + dec) & 15, y, EAU[2]); Px.poser(g, (x + 2 + dec) & 15, y - 1, EAU[3]); Px.poser(g, (x + 3 + dec) & 15, y - 1, EAU[2]); };
    vague(1, 4); vague(9, 9); vague(4, 14); vague(12, 2);
    Px.poser(g, (6 + dec) & 15, 7, EAU[0]); Px.poser(g, (14 + dec) & 15, 12, EAU[0]);
    return fin(g);
  };
  A.tuiles.eau = [eau(0), eau(2)];

  // ---------------------------------------------------------------- hautes herbes (à couper)
  const hautes = Px.grille(16, 16), rh = Px.graine(91);
  for (let x = 0; x < 16; x++) {
    const haut = 2 + Math.floor(rh() * 5) + (x % 3 === 1 ? 0 : 2);
    for (let y = haut; y < 16; y++) {
      const t = (y - haut) / (16 - haut);
      let c = t < 0.12 ? FEUILLE[4] : t < 0.45 ? FEUILLE[3] : t < 0.8 ? FEUILLE[2] : FEUILLE[1];
      if (x % 3 === 2 && y > haut + 2) c = FEUILLE[1];
      Px.poser(hautes, x, y, c);
    }
    Px.poser(hautes, x, 15, FEUILLE[0]);
  }
  A.tuiles.hautes = fin(hautes);
  const coupees = Px.grille(16, 16);
  for (let x = 1; x < 15; x++) { const h = 12 + ((x * 7) % 3); for (let y = h; y < 15; y++) Px.poser(coupees, x, y, y === h ? FEUILLE[3] : FEUILLE[1]); }
  A.tuiles.coupees = fin(coupees);

  // ---------------------------------------------------------------- buisson (à couper) et sa souche
  const buisson = Px.grille(16, 16);
  const vertB = ['#1f5e2c', '#2f8a3c', '#4fae4a', '#7fd066', '#b4ec8c'];
  Px.boule(buisson, 5.5, 9.5, 4.8, 4.5, vertB);
  Px.boule(buisson, 10.5, 9.5, 4.8, 4.5, vertB, { bord: vertB[0] });
  Px.boule(buisson, 8, 6, 5, 4.4, vertB, { bord: vertB[0] });
  Px.contour(buisson, TRAIT);
  A.tuiles.buisson = fin(buisson);
  const souche = Px.grille(16, 16);
  Px.boule(souche, 8, 11, 5, 3, ['#3d6a2a', '#5a8a36', '#7aa84a']);
  Px.boule(souche, 8, 10.5, 3, 1.6, ['#8a6a3a', '#b08a52']);
  Px.contour(souche, TRAIT);
  A.tuiles.souche = fin(souche);

  // ---------------------------------------------------------------- rocher
  const rocher = Px.grille(16, 16);
  Px.boule(rocher, 8, 9, 7, 6, ROC);
  Px.poser(rocher, 6, 7, ROC[0]); Px.poser(rocher, 7, 8, ROC[0]); Px.poser(rocher, 7, 9, ROC[0]); Px.poser(rocher, 8, 10, ROC[0]);
  Px.rect(rocher, 3, 14, 10, 1, ROC[0]);
  Px.contour(rocher, '#23242e');
  A.tuiles.rocher = fin(rocher);

  // ---------------------------------------------------------------- arbre (2 × 2 tuiles)
  const arbre = Px.grille(32, 32);
  Px.rect(arbre, 12, 21, 8, 9, TRONC[1]);
  Px.rect(arbre, 12, 21, 2, 9, TRONC[2]); Px.rect(arbre, 18, 21, 2, 9, TRONC[0]);
  Px.rect(arbre, 10, 28, 3, 2, TRONC[1]); Px.rect(arbre, 19, 28, 3, 2, TRONC[0]);
  Px.rect(arbre, 15, 23, 1, 4, TRONC[0]);
  const touffesA = [[8, 17, 7], [24, 17, 7], [16, 19, 7], [10, 10, 8], [22, 10, 8], [16, 7, 8], [16, 14, 7]];
  touffesA.forEach(([x, y, r], i) => Px.boule(arbre, x, y, r, r * 0.9, FEUILLE, { bord: i ? FEUILLE[0] : null, trame: 0.5 }));
  Px.contour(arbre, TRAIT);
  A.tuiles.arbre = fin(arbre);

  // ---------------------------------------------------------------- panneau de bois
  A.tuiles.panneau = fin(Px.texte([
    '................',
    '................',
    '.KKKKKKKKKKKKKK.',
    'KhhhhhhhhhhhhhhK',
    'KhmmmmmmmmmmmmdK',
    'KhmkkkkmkkkkmmdK',
    'KhmmmmmmmmmmmmdK',
    'KhmkkkmkkkkkmmdK',
    'KhmmmmmmmmmmmmdK',
    'KdddddddddddddDK',
    '.KKKKKKhdKKKKKK.',
    '......KhdK......',
    '......KhdK......',
    '.....KKhdKK.....',
    '.....KddddK.....',
    '......KKKK......',
  ], { K: '#2a1a10', h: '#e0b070', m: '#c48a4a', d: '#8a5a2c', D: '#6a4020', k: '#8a5a2c' }));

  // ---------------------------------------------------------------- entrée de grotte (2 × 2 tuiles)
  const grotte = Px.grille(32, 32);
  [[7, 20, 8, 9], [25, 20, 8, 9], [16, 12, 12, 10], [5, 11, 6, 6], [27, 11, 6, 6]].forEach(([x, y, rx, ry]) => Px.boule(grotte, x, y, rx, ry, ROC, { bord: ROC[0] }));
  for (let y = 16; y < 32; y++) for (let x = 9; x < 23; x++) {
    const dx = (x + 0.5 - 16) / 7, dy = (y + 0.5 - 31) / 14;
    if (dx * dx + dy * dy < 1) Px.poser(grotte, x, y, dx * dx + dy * dy > 0.7 ? '#2a2233' : '#0c0a14');
  }
  Px.contour(grotte, '#23242e');
  A.tuiles.grotte = fin(grotte);

  // ================================================================ SPIRIT
  // blanc, casque noir et bleu aux écouteurs cyan, tee-shirt bleu au logo cyan, short bleu, baskets bleues
  const PS = {
    K: TRAIT_P, W: '#ffffff', g: '#cdd6ea', s: '#94a0bf', N: '#23273a', n: '#2f4fa0', C: '#35d6ff',
    B: '#2f72e6', b: '#1f50b4', D: '#1b3c8c', E: '#1c56c8', e: '#bfeeff', m: '#a8385a', O: '#ffffff',
  };
  const TETE_FACE = [
    '.....KKKKKK.....',
    '...KKnnnnnnKK...',
    '..KnWWWWWWWWnK..',
    '..KnWWWWWWWWnK..',
    '.KKKWWWWWWWWKKK.',
    'KNNKWWWWWWWWKNNK',
    'KNCKWeEWWeEWKCNK',
    'KNNKWEEWWEEWKNNK',
    '.KKKgWWWWWWgKKK.',
    '...KgWWmmWWgK...',
    '...KKggggggKK...',
  ];
  const TETE_DOS = [
    '.....KKKKKK.....',
    '...KKnnnnnnKK...',
    '..KnWWWWWWWWnK..',
    '..KnWWWWWWWWnK..',
    '.KKKWWWWWWWWKKK.',
    'KNNKWWWWWWWWKNNK',
    'KNCKWWWWWWWWKCNK',
    'KNNKgWWWWWWgKNNK',
    '.KKKgWWWWWWgKKK.',
    '...KggWWWWggK...',
    '...KKsggggsKK...',
  ];
  const TETE_PROFIL = [
    '....KKKKKKK.....',
    '..KKnWWWWWWKK...',
    '.KWnWWWWWWWWWK..',
    '.KWnWWWWWWWWWWK.',
    'KWKKKKWWWWWWWWK.',
    'KWKNCKWWWWWeEWK.',
    'KWKNNKWWWWWEEWK.',
    'KgWKKKWWWWWWWWK.',
    '.KgWWWWWWWWWWnK.',
    '..KgWWWWWWWmnK..',
    '...KKggggggKK...',
  ];
  const CORPS_FACE = [
    '...KBBBCCBBBK...',
    '..KWKBBCCBBKWK..',
    '..KWKbBBBBbKWK..',
    '...KKDDDDDDKK...',
  ];
  const CORPS_DOS = [
    '...KBBBBBBBBK...',
    '..KWKBBBBBBKWK..',
    '..KWKbBBBBbKWK..',
    '...KKDDDDDDKK...',
  ];
  const CORPS_PROFIL = [
    '....KBBBBBBK....',
    '....KBBWBBBK....',
    '....KbbWbBBK....',
    '....KKDDDDKK....',
  ];
  const JAMBES = {
    face: [
      ['....KDDKKDDK....', '....KWWKKWWK....', '...KBBBKKBBBK...', '...KKKK..KKKK...'],
      ['....KDDKKDDK....', '...KBBBKKWWK....', '...KKKK.KBBBK...', '.........KKKK...'],
      ['....KDDKKDDK....', '....KWWKKBBBK...', '...KBBBK.KKKK...', '...KKKK.........'],
    ],
    profil: [
      ['.....KDDDDK.....', '.....KWWWWK.....', '.....KBBBBBK....', '.....KKKKKKK....'],
      ['....KDDKKDDK....', '...KWWK..KWWK...', '..KBBBK..KBBBK..', '..KKKK....KKKK..'],
      ['.....KDDDDK.....', '.....KWWWWK.....', '.....KBBBBBK....', '.....KKKKKKK....'],
    ],
  };
  const spirit = (tete, corps, jambes, bouche) => {
    let t = tete;
    if (bouche) t = t.map((l, i) => (i === 9 ? l.replace('mm', 'KK').replace('m', 'K') : l));
    return Px.texte(['................'].concat(t, corps, jambes), PS);
  };
  const S = {};
  for (let f = 0; f < 3; f++) {
    S['bas' + f] = spirit(TETE_FACE, CORPS_FACE, JAMBES.face[f]);
    S['haut' + f] = spirit(TETE_DOS, CORPS_DOS, JAMBES.face[f]);
    S['droite' + f] = spirit(TETE_PROFIL, CORPS_PROFIL, JAMBES.profil[f]);
  }
  S.basA = spirit(TETE_FACE, CORPS_FACE, JAMBES.face[0], true);
  S.hautA = S.haut0;
  S.droiteA = spirit(TETE_PROFIL, CORPS_PROFIL, JAMBES.profil[1], true);
  for (const k in S) {
    A.spr['spirit-' + k] = fin(S[k]);
    if (k.startsWith('droite')) A.spr['spirit-gauche' + k.slice(6)] = fin(Px.miroir(S[k]));
  }

  // ================================================================ MONSTRES
  // Crache-pierres : bête de pierre sombre aux fissures violettes, yeux jaunes, crache des cailloux
  const PC = { K: '#1a1622', R: '#453f55', r: '#665f7d', q: '#948cae', V: '#c060ff', Y: '#ffd23a', y: '#fff3a0' };
  const cp = (pattes) => Px.texte([
    '................',
    '.....KKKKKK.....',
    '...KKrrqqrrKK...',
    '..KrrqqqqqqrrK..',
    '.KrrqqqVqqqqrrK.',
    '.KrKKKrVrrKKKrK.',
    'KrrKyYKrVrKyYKrK',
    'KrrKKKrrrVKKKrrK',
    'KRrrrrKKKKrrrrRK',
    'KRRrrKRRRRKrrRRK',
    '.KRRrKRKKRKrRRK.',
    '.KRRRKKKKKKRRRK.',
    '..KRRRRRRRRRRK..',
  ].concat(pattes ? ['.KRK.KRRRRK.KRK.', '.KK...KKKK...KK.', '................'] : ['..KRK.KRRK.KRK..', '..KK..KKKK..KK..', '................']), PC);
  A.spr['crache-0'] = fin(cp(true));
  A.spr['crache-1'] = fin(cp(false));

  // ================================================================ GROTTE DE L'ERMITE ET TERRIER
  const SOLG = ['#3a2e2a', '#4e3e36', '#63503f', '#7a6450'];
  const solG = Px.grille(16, 16), rg = Px.graine(77);
  Px.rect(solG, 0, 0, 16, 16, SOLG[1]);
  for (let i = 0; i < 26; i++) Px.poser(solG, Math.floor(rg() * 16), Math.floor(rg() * 16), rg() < 0.5 ? SOLG[0] : SOLG[2]);
  for (let i = 0; i < 3; i++) { const x = Math.floor(rg() * 14), y = Math.floor(rg() * 14); Px.poser(solG, x, y, SOLG[3]); Px.poser(solG, x + 1, y, SOLG[2]); Px.poser(solG, x, y + 1, SOLG[0]); }
  A.tuiles['sol-grotte'] = fin(solG);
  const PIERRE = ['#1e1b24', '#2e2a38', '#433e52', '#5d576e'];
  const mur = Px.grille(16, 16);
  Px.rect(mur, 0, 0, 16, 16, PIERRE[0]);
  [[4, 4, 4.5], [12, 5, 4.5], [8, 12, 5], [0, 12, 3.5], [16, 13, 3.5]].forEach(([x, y, r]) => Px.boule(mur, x, y, r, r * 0.85, PIERRE, { bord: PIERRE[0] }));
  A.tuiles.mur = fin(mur);
  const face = Px.grille(16, 16);
  Px.rect(face, 0, 0, 16, 16, PIERRE[2]);
  for (let x = 0; x < 16; x += 4) { Px.rect(face, x, 0, 1, 16, PIERRE[1]); Px.rect(face, x + 1, 0, 1, 16, PIERRE[3]); }
  Px.rect(face, 0, 13, 16, 3, PIERRE[1]); Px.rect(face, 0, 15, 16, 1, PIERRE[0]);
  Px.rect(face, 0, 0, 16, 1, PIERRE[0]);
  A.tuiles['mur-face'] = fin(face);

  // feu de camp (3 images)
  for (let f = 0; f < 3; f++) {
    const g = Px.grille(16, 16);
    Px.rect(g, 2, 12, 12, 2, TRONC[1]); Px.rect(g, 4, 11, 8, 1, TRONC[2]); Px.rect(g, 2, 13, 12, 1, TRONC[0]);
    const h = [7, 8, 6][f], dx = [0, 1, -1][f];
    Px.boule(g, 8 + dx * 0.5, 12 - h / 2, 3.6, h / 2 + 1, ['#d8401c', '#f27a1e', '#ffb830', '#fff080'], { trame: 0.2 });
    Px.boule(g, 8 + dx, 11 - h / 3, 1.6, h / 3, ['#ffb830', '#fff6c0'], { trame: 0 });
    A.spr['feu-' + f] = fin(Px.contour(g, '#3a1408'));
  }

  // entrée du Terrier des Pop-ups : même amas de rochers, fissures violettes
  const terrier = Px.grille(32, 32);
  const ROCV = ['#3a3448', '#554d68', '#7a7092', '#a69cc0'];
  [[7, 20, 8, 9], [25, 20, 8, 9], [16, 12, 12, 10], [5, 11, 6, 6], [27, 11, 6, 6]].forEach(([x, y, rx, ry]) => Px.boule(terrier, x, y, rx, ry, ROCV, { bord: ROCV[0] }));
  [[6, 14], [7, 15], [7, 16], [8, 17], [24, 13], [25, 14], [25, 15], [15, 6], [16, 7], [17, 8], [17, 9]].forEach(([x, y]) => Px.poser(terrier, x, y, '#c060ff'));
  for (let y = 16; y < 32; y++) for (let x = 9; x < 23; x++) {
    const dx = (x + 0.5 - 16) / 7, dy = (y + 0.5 - 31) / 14, d = dx * dx + dy * dy;
    if (d < 1) Px.poser(terrier, x, y, d > 0.72 ? '#6a2aa0' : '#0c0714');
  }
  Px.contour(terrier, '#1a1622');
  A.tuiles.terrier = fin(terrier);

  // l'ermite : grande cape grise à capuche, yeux bleus lumineux, longue barbe blanche, bâton à pierre bleue
  const ermite = Px.texte([
    '....KKKKK....',
    '...KhhhhhK...',
    '..KhhHHHHHK..',
    '.KhHHKKKKKHK.',
    '.KhHKdddddKK.',
    '.KhHKdEdEdKHK',
    '.KhHKddBddKHK',
    'KhHHKdBBBdKHK',
    'KhHHKBBBBBKHK',
    'KhHdKBBBbBKdK',
    'KhHdKBBbBbKdK',
    'KhLLLKBBbKLLK',
    'KhHLYLKbKLLHK',
    'KhHHLLLKLLHHK',
    'KhHHHHHHHHdHK',
    'KhHHdHHHHddHK',
    'KhHHdHHHHddHK',
    'KhHdddHHdddHK',
    '.KhHdddddddK.',
    '.KKddKKKddKK.',
    '..KFFK.KFFK..',
    '.KFFFK.KFFFK.',
    '.KKKK...KKKK.',
  ], { K: '#161a28', H: '#56648a', h: '#7c8cb4', d: '#343e5c', B: '#eef1f7', b: '#b4bccc', E: '#5ae0ff', L: '#6a4a2a', Y: '#e0b840', F: '#4a3222' });
  const erm = Px.grille(17, 24);
  Px.coller(erm, ermite, 0, 1);
  Px.rect(erm, 13, 4, 3, 20, '#161a28'); Px.rect(erm, 14, 5, 1, 18, '#93602f');
  Px.boule(erm, 14.5, 3, 2.4, 2.4, ['#1a6ad0', '#3aa0ff', '#bff0ff'], { trame: 0 });
  Px.contour(erm, '#161a28');
  Px.rect(erm, 12, 11, 2, 2, '#6a4a2a');
  A.spr.ermite = fin(erm);

  // l'Ampli (icône et objet obtenu)
  A.spr.ampli = fin(Px.texte([
    '.KKKKKKKKKK.',
    'KnnnnnnnnnnK',
    'KnKKKKKKKKnK',
    'KnKCcCcCcKnK',
    'KnKcCcCcCKnK',
    'KnKCcCcCcKnK',
    'KnKKKKKKKKnK',
    'KnnnnnCnnnnK',
    'KNNNNNNNNNNK',
    '.KKKKKKKKKK.',
  ], { K: '#10131f', n: '#2f4fa0', N: '#1f3570', C: '#35d6ff', c: '#1a8ab0' }));

  // ================================================================ OBJETS, INTERFACE, EFFETS
  A.spr.coeur = fin(Px.texte(['.KK.KK.', 'KrRKRRK', 'KRRRRRK', '.KRRRK.', '..KRK..', '...K...'], { K: '#3a0a14', R: '#e8304c', r: '#ff9aac' }));
  A.spr['coeur-demi'] = fin(Px.texte(['.KK.KK.', 'KrRKccK', 'KRRcccK', '.KRccK.', '..KcK..', '...K...'], { K: '#3a0a14', R: '#e8304c', r: '#ff9aac', c: '#5a3040' }));
  A.spr['coeur-vide'] = fin(Px.texte(['.KK.KK.', 'KccKccK', 'KcccccK', '.KcccK.', '..KcK..', '...K...'], { K: '#3a0a14', c: '#5a3040' }));
  A.spr['pixel-bleu'] = fin(Px.texte(['.KKKK.', 'KlCCBK', 'KCCCBK', 'KCCBBK', 'KBBBDK', '.KKKK.'], { K: '#0b1a3a', l: '#ffffff', C: '#6ad8ff', B: '#2a8ae0', D: '#1a4aa0' }));
  A.spr['pixel-rose'] = fin(Px.texte(['.KKKK.', 'KlCCBK', 'KCCCBK', 'KCCBBK', 'KBBBDK', '.KKKK.'], { K: '#3a0a2a', l: '#ffffff', C: '#ff8ad8', B: '#e040a8', D: '#a02070' }));
  A.spr.pierre = fin(Px.contour((() => { const g = Px.grille(8, 8); Px.boule(g, 4, 4, 2.8, 2.6, ROC); return g; })(), '#23242e'));
  A.spr.feuille = fin(Px.texte(['.l', 'md'], { l: FEUILLE[4], m: FEUILLE[3], d: FEUILLE[1] }));

  // onde sonore de l'Ampli : trois arcs cyan qui s'élargissent (vers la droite ; on tourne le dessin)
  for (let f = 0; f < 3; f++) {
    const g = Px.grille(16, 16);
    for (let k = 0; k < 3; k++) {
      const r = 3 + k * 3 + f * 1.5;
      for (let a = -0.9; a <= 0.9; a += 0.04) {
        const x = Math.round(2 + Math.cos(a) * r), y = Math.round(8 + Math.sin(a) * r);
        Px.poser(g, x, y, k === 2 ? '#ffffff' : '#35d6ff');
      }
    }
    A.spr['onde-' + f] = fin(Px.contour(g, '#0b3a5a'));
  }
  // nuage de fumée quand un monstre disparaît
  for (let f = 0; f < 3; f++) {
    const g = Px.grille(16, 16);
    const r = 3 + f * 1.6;
    [[5, 6], [11, 6], [8, 11], [8, 5]].forEach(([x, y]) => Px.boule(g, x + (x - 8) * f * 0.3, y + (y - 8) * f * 0.3, r * 0.7, r * 0.7, ['#9aa0b8', '#d8dcec', '#ffffff'], { trame: 0.6 }));
    A.spr['fumee-' + f] = fin(Px.contour(g, '#3a3e58'));
  }
})();
