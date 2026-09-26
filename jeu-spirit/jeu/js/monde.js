// Spirit et le Roi Clickbait : la carte de la Plaine des Pixels et la grotte de l'ermite.
'use strict';

// Légende des cases
//  .  herbe            ,  herbe fleurie      :  chemin de terre     ~  eau
//  T  arbre            S  arbre sombre (bordure)                    b  buisson (l'onde le détruit)
//  h  hautes herbes (l'onde les coupe, on peut marcher dedans)       r  rocher
//  x  rocher fissuré   MM amas de rochers (2 cases)                 P  panneau
//  g  falaise (invisible, pleine)          E  entrée de grotte
SG.CASES_PLEINES = new Set(['~', 'T', 'S', 'b', 'r', 'x', 'M', 'P', 'g']);
SG.CASES_DESTRUCTIBLES = new Set(['b', 'h']);

SG.MONDE = {
  // x,y : colonne et ligne de l'écran dans la Plaine
  '1,2': {
    nom: 'La Clairière',
    carte: [
      'SSSSSSSSS::SSSSS',
      'SggEggS..::.T..S',
      'S....,...::....S',
      'S..P.....::..h.S',
      '::::::::::::::::',
      'S.....b...:...,S',
      'S..h.....r....bS',
      'S.b....,....T..S',
      'SSSSSSSSSSSSSSSS',
    ],
    ennemis: [],
    panneaux: { '3,3': 'La grotte du vieil ermite. On dit qu\'il ne sort plus depuis que le Bruit a envahi la Plaine.' },
  },
  '0,2': {
    nom: 'L\'Étang',
    carte: [
      'SSSSSSSSSSSSSSSS',
      'S....T.....,...S',
      'S.,..~~~~....b.S',
      'S...~~~~~~...h.S',
      'S...~~~~~~.:::::',
      'S....~~~~..:...S',
      'S.h.......h:...S',
      'S..b...,....T..S',
      'SSSSSSSSSSSSSSSS',
    ],
    ennemis: [['gresille', 2, 6], ['gresille', 8, 6], ['gresille', 12, 2]],
  },
  '2,2': {
    nom: 'Les Rochers',
    carte: [
      'SSSSSSS::SSSSSSS',
      'Sr.....::....rrS',
      'S..MM..::...r..S',
      'S......::..,...S',
      '::::::::::.....S',
      'S....r....r.MM.S',
      'S.,......h.....S',
      'Srr...b.....r.rS',
      'SSSSSSSSSSSSSSSS',
    ],
    ennemis: [['crache', 4, 3], ['crache', 12, 6]],
  },
  '1,1': {
    nom: 'Le Carrefour',
    carte: [
      'SSSSSSSSS::SSSSS',
      'ST.......::...TS',
      'S...b....::.b..S',
      'S..h.....::....S',
      '::::::::::::::::',
      'S.....,..::..h.S',
      'S..b.....::....S',
      'ST.......::...TS',
      'SSSSSSSSS::SSSSS',
    ],
    ennemis: [['gresille', 4, 6], ['gresille', 12, 2], ['crache', 6, 2]],
  },
  '0,1': {
    nom: 'La Lisière',
    carte: [
      'SSSSSSSSSSSSSSSS',
      'SSS....SS....SSS',
      'SS..h.....b...SS',
      'S....SS.......SS',
      'S.....S....:::::',
      'S..b.......:...S',
      'SS.....SS...h.SS',
      'SSS..,.......SSS',
      'SSSSSSSSSSSSSSSS',
    ],
    ennemis: [['gresille', 3, 3], ['gresille', 9, 6], ['crache', 8, 2]],
    secrets: { '10,2': 'pixels5' },
  },
  '2,1': {
    nom: 'Le Rocher fissuré',
    carte: [
      'SSSSSSSSSSSSSSSS',
      'Srr....r...rrrrS',
      'Sr...,....rrxrrS',
      'S........h..rr.S',
      ':::::::::......S',
      'S......::..r...S',
      'S..b...::....,.S',
      'Sr.....::....rrS',
      'SSSSSSS::SSSSSSS',
    ],
    ennemis: [['crache', 10, 5], ['gresille', 4, 2]],
  },
  '1,0': {
    nom: 'La Route du Nord',
    carte: [
      'SSSSSSSSSMMSSSSS',
      'SS.......::...SS',
      'S......P.::....S',
      'S..h.....::..b.S',
      '::::::::::::::::',
      'S....b...::....S',
      'S.,......::..h.S',
      'ST.......::...TS',
      'SSSSSSSSS::SSSSS',
    ],
    ennemis: [['crache', 4, 6], ['gresille', 12, 2], ['gresille', 13, 6]],
    panneaux: { '7,2': 'Route de la Forêt des Forums. Des éboulis bloquent le passage. Il faudra trouver un moyen de les faire sauter.' },
  },
  '0,0': {
    nom: 'Le Bois aux Grésilles',
    carte: [
      'SSSSSSSSSSSSSSSS',
      'ST..b..T...T...S',
      'S..h....b.....TS',
      'S.T....h...b...S',
      'S......T...:::::',
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
    carte: [
      'SSSSSSSSSSSSSSSS',
      'S..r......rr...S',
      'S.......T.....rS',
      'S..b..........bS',
      ':::::::::...h..S',
      'S.....h........S',
      'S..r.....,..T..S',
      'Sr....b.....rr.S',
      'SSSSSSSSSSSSSSSS',
    ],
    ennemis: [['gresille', 11, 3], ['gresille', 9, 5], ['crache', 5, 6]],
    secrets: { '14,3': 'pixels5' },
  },
};

SG.ECRAN_DEPART = '1,2';
SG.DEPART = { x: 7.5 * SG.T, y: 5.8 * SG.T };
SG.SORTIE_GROTTE = { ecran: '1,2', x: 3.5 * SG.T, y: 2.7 * SG.T };

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
    'Spirit dormait en coulisses, son casque sur les oreilles. Il n\'a rien entendu. Il est le seul à ne pas avoir été touché.',
    'Son micro capte un faible signal. Il vient d\'une grotte, tout près d\'ici.',
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
    ['ermite', 'Le premier Gardien est retenu au nord, au-delà de la Forêt des Forums. Mais des éboulis bloquent la route.'],
    ['ermite', 'En attendant, nettoie la Plaine. Et fouille les buissons : le Bruit y cache parfois des choses.'],
  ],
  ermiteRevoir: [
    ['ermite', 'La route du nord est toujours bloquée. Fouille la Plaine, et reviens me voir si tu as besoin de reprendre des forces.'],
  ],
  ampli: 'Tu as obtenu l\'Ampli ! Branché sur ton casque, il transforme ta voix en onde sonore. Appuie sur A (Espace au clavier) pour attaquer.',
  fragment: (n) => n % 4 === 0
    ? 'Tu as trouvé un fragment de cœur ! Avec les quatre, tu gagnes un cœur de plus.'
    : `Tu as trouvé un fragment de cœur ! (${n % 4} sur 4) Réunis-en quatre pour gagner un cœur de plus.`,
  sansAmpli: 'Spirit n\'a aucun moyen de se défendre. Il vaudrait mieux passer à la grotte d\'abord.',
};
