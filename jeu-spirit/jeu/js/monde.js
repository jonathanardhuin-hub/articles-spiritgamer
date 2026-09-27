// Spirit et le Roi Clickbait : la carte de la Plaine des Pixels et la grotte de l'ermite.
'use strict';

// Légende des cases
//  .  herbe            ,  herbe fleurie      :  chemin de terre     ~  eau
//  T  arbre            S  arbre sombre (bordure)                    b  buisson (l'onde le détruit)
//  h  hautes herbes (l'onde les coupe, on peut marcher dedans)       r  rocher
//  x  rocher fissuré   MM amas de rochers (2 cases)                 P  panneau
//  g  falaise (invisible, pleine)          E  entrée de grotte
// Les écrans qui ont une « image » sont peints d'un seul tenant : leur carte ne contient plus que les objets
// posés par-dessus (buissons, herbes, panneaux, cristal, barrière) ; arbres, rochers et eau viennent de SG.MASQUES.
SG.CASES_PLEINES = new Set(['~', 'T', 'S', 'b', 'r', 'x', 'M', 'P', 'g', 'X', 'G']);
SG.CASES_DESTRUCTIBLES = new Set(['b', 'h', 'p']);

SG.MONDE = {
  // x,y : colonne et ligne de l'écran dans la Plaine
  '1,2': {
    nom: 'La Clairière',
    image: 'ecran-1-2', grotte: { x0: 238, x1: 302, y: 205 },
    carte: [
      '................',
      '................',
      '.........h...h..',
      '......P.........',
      '................',
      '...........b....',
      '..h.b...........',
      '................',
      '................',
    ],
    ennemis: [],
    panneaux: { '6,3': 'La grotte du vieil ermite. On dit qu\'il ne sort plus depuis que le Bruit a envahi la Plaine.' },
  },
  '0,2': {
    nom: 'L\'Étang',
    image: 'ecran-0-2',
    carte: [
      '................',
      '................',
      '................',
      '................',
      '..h.............',
      '............b...',
      '...b.........h..',
      '................',
      '................',
    ],
    ennemis: [['gresille', 2, 6], ['gresille', 8, 6], ['gresille', 12, 2]],
  },
  '2,2': {
    nom: 'Les Rochers',
    image: 'ecran-2-2',
    carte: [
      '................',
      '................',
      '................',
      '................',
      '............h...',
      '.........b......',
      '....h........b..',
      '................',
      '................',
    ],
    ennemis: [['crache', 4, 3], ['crache', 12, 6]],
  },
  '1,1': {
    nom: 'Le Carrefour',
    image: 'ecran-1-1',
    carte: [
      '................',
      '................',
      '................',
      '....b......h....',
      '................',
      '...h............',
      '..........b.....',
      '................',
      '................',
    ],
    ennemis: [['gresille', 4, 6], ['gresille', 12, 2], ['crache', 6, 2]],
  },
  '0,1': {
    nom: 'La Lisière',
    image: 'ecran-0-1',
    carte: [
      '................',
      '................',
      '.......h........',
      '.........b..b...',
      '................',
      '.....h..........',
      '................',
      '................',
      '................',
    ],
    ennemis: [['gresille', 3, 3], ['gresille', 9, 6], ['crache', 8, 2]],
    secrets: { '9,3': 'pixels5' },
  },
  '2,1': {
    nom: 'Le Rocher fissuré',
    image: 'ecran-2-1',
    carte: [
      '................',
      '................',
      '...b............',
      '................',
      '................',
      '....b.......h...',
      '..........h.....',
      '................',
      '................',
    ],
    ennemis: [['crache', 10, 5], ['gresille', 4, 2]],
  },
  '1,0': {
    nom: 'La Route du Nord',
    image: 'ecran-1-0', cristal: { dx: 25 },
    carte: [
      '.......GG.......',
      '................',
      '......P....X....',
      '...h............',
      '................',
      '..........b..h..',
      '................',
      '................',
      '................',
    ],
    ennemis: [['crache', 4, 6], ['gresille', 12, 2], ['gresille', 13, 6]],
    panneaux: { '6,2': 'Route de la Forêt des Forums. Une barrière de Bruit ferme le passage. Le cristal sur l\'îlot, de l\'autre côté de l\'eau, semble la commander.' },
  },
  '0,0': {
    nom: 'Le Bois aux Grésilles',
    carte: [
      'SggggggggggggggS',
      'SgggggggDggggggS',
      'S..h....:......S',
      'S.T....h:..b...S',
      'S......T::::::::',
      'S..b.h.....:.h.S',
      'ST.....b.....T.S',
      'S..,.T....h..b.S',
      'SSSSSSSSSSSSSSSS',
    ],
    ennemis: [['gresille', 3, 2], ['gresille', 9, 3], ['gresille', 5, 6], ['gresille', 12, 6]],
    secrets: { '4,1': 'fragment' },
  },
  '2,0': {
    nom: 'Le Vieux Chêne',
    image: 'ecran-2-0',
    carte: [
      '................',
      '................',
      '...h............',
      '..............h.',
      '....b...........',
      '..........b.....',
      '................',
      '................',
      '................',
    ],
    ennemis: [['gresille', 11, 3], ['gresille', 9, 5], ['crache', 5, 6]],
    secrets: { '14,3': 'pixels5' },
  },
};

// Prologue : la loge de Spirit, cachée derrière la scène du QG (pièce peinte, sans voisins)
SG.MONDE.loge = {
  nom: 'La loge de Spirit',
  image: 'loge',
  interieur: true,
  carte: Array(9).fill('................'),
  ennemis: [],
};
SG.LOGE = { reveil: { x: 805, y: 372 }, depart: { x: 805, y: 430 }, portail: { x0: 548, x1: 722, y: 660 } };
SG.ARRIVEE_PLAINE = { ecran: '1,2', x: 640, y: 390 };

SG.ECRAN_DEPART = '1,2';
SG.DEPART = { x: 7.5 * SG.T, y: 5.8 * SG.T };
SG.SORTIE_GROTTE = { ecran: '1,2', x: 270, y: 290 };

// La grotte : image de fond, contour du sol où l'on peut marcher (relevé sur l'image), obstacles
SG.GROTTE = {
  sol: [
    [330, 215], [410, 178], [870, 178], [955, 212], [1035, 268], [1055, 330], [1052, 440], [995, 470],
    [900, 495], [720, 545], [716, 730], [558, 730], [558, 545], [500, 507], [360, 497], [250, 482],
    [165, 445], [118, 392], [112, 345], [300, 345], [300, 215],
  ],
  cercles: [{ x: 635, y: 385, r: 64 }],       // le feu de camp
  rects: [],
  ermite: { x: 640, y: 222 },
  entree: { x: 636, y: 640 },
};

// Textes
SG.TEXTES = {
  intro: [
    'Le soir des 11 ans de SpiritGamer, tout le Réseau faisait la fête autour du QG.',
    'Puis une fenêtre publicitaire s\'est ouverte au milieu de la foule, et le Roi Clickbait en est sorti.',
    'Il a brisé la Source, la lumière de toutes les infos vérifiées, en huit fragments. Les huit Gardiens des rubriques ont disparu avec eux.',
    'Depuis, le Bruit a pris corps. Des monstres rôdent partout dans le Réseau.',
  ],
  reveil: [
    [null, 'Pendant ce temps, dans sa loge cachée derrière la scène du QG, Spirit dormait, son casque sur les oreilles. Il n\'a rien entendu. Il est le seul à ne pas avoir été touché.'],
    ['spirit', 'Hein ? Qu\'est-ce que c\'est que ce grésillement dans mon casque ?'],
    [null, 'Son micro capte un faible signal. Au même instant, la porte de la loge s\'ouvre toute seule sur une lumière inconnue.'],
  ],
  portailFerme: 'La porte est fermée. Le signal dans le casque de Spirit est encore trop faible.',
  arriveePlaine: [
    [null, 'Spirit traverse la lumière et atterrit au milieu d\'un monde inconnu : la Plaine des Pixels, le premier pays du Réseau.'],
    ['spirit', 'Le signal est plus fort ici. Il vient de cette grotte, tout près.'],
  ],
  ermiteDon: [
    ['ermite', 'Te voilà enfin. Je sens ton signal depuis ce matin.'],
    ['spirit', 'Il y a des monstres partout dans la Plaine. Qu\'est-ce qui se passe ?'],
    ['ermite', 'Le Roi Clickbait a brisé la Source et donné corps à la rumeur. Ces créatures sont faites de Bruit.'],
    ['ermite', 'Ton casque t\'a protégé. Mais un casque ne suffira pas pour te défendre.'],
    ['ermite', 'Prends ceci. Je le gardais pour quelqu\'un qui saurait s\'en servir.'],
  ],
  ermiteApres: [
    ['ermite', 'Quand ton cœur est plein, ton onde porte beaucoup plus loin. Garde-le en tête.'],
    ['ermite', 'Le Bruit a creusé un terrier sous le Bois aux Grésilles, au nord-ouest de la Plaine. Le premier Gardien, Flash, y est retenu.'],
    ['ermite', 'Fouille aussi les buissons et les hautes herbes : le Bruit y cache parfois des choses.'],
  ],
  ermiteRevoir: [
    ['ermite', 'Le Terrier des Pop-ups est au nord-ouest, dans le Bois aux Grésilles. Reviens me voir si tu as besoin de reprendre des forces.'],
  ],
  ampli: 'Tu as obtenu l\'Ampli ! Branché sur ton casque, il transforme ta voix en onde sonore. Appuie sur A (Espace au clavier) pour attaquer.',
  fragment: (n) => n % 4 === 0
    ? 'Tu as trouvé un fragment de cœur ! Avec les quatre, tu gagnes un cœur de plus.'
    : `Tu as trouvé un fragment de cœur ! (${n % 4} sur 4) Réunis-en quatre pour gagner un cœur de plus.`,
  foretBientot: 'La barrière s\'est dissipée. Au-delà commence la Forêt des Forums... La suite de l\'aventure arrive dans la prochaine version du jeu.',
  barriere: 'Le cristal s\'illumine. Au loin, la barrière de Bruit de la route du nord se dissipe !',
  sansAmpli: 'Spirit n\'a aucun moyen de se défendre. Il vaudrait mieux passer à la grotte d\'abord.',
};
