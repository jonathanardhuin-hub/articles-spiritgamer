// La carte : chaque écran fait 16 × 11 tuiles, une lettre par tuile.
//  .  herbe            ,  herbe (variante)    f  fleurs           p  chemin de terre    ~  eau
//  h  hautes herbes (se coupent)              b  buisson (se coupe)                     r  rocher
//  A  arbre (coin haut gauche ; les 3 autres cases de l'arbre sont notées a)
//  G  grotte de l'ermite (coin haut gauche, cases g), E = entrée de la grotte
//  M  Terrier des Pop-ups (coin haut gauche, cases m), N = entrée du Terrier
//  P  panneau
// Grotte : W mur, s sol, F feu, H ermite, X sortie
'use strict';

SG.CARTE = {
  plaine: {
    nom: 'Plaine des Pixels',
    largeur: 2, hauteur: 2,
    ecrans: {
      '0,0': {
        nom: 'Le Bois aux Grésilles',
        tuiles: [
          'AaAaAaAaAaAaAaAa',
          'aaaaaaaaaaaaaaaa',
          'Aa.....Mm.....Aa',
          'aa..b..NN..b..aa',
          'Aa.....pp.......',
          'aa..pppppppppppp',
          'Aa..pp..r.......',
          'aa..pp..h.,...Aa',
          'rr..pp....hh..aa',
          'AaAa..AaAaAaAaAa',
          'aaaa..aaaaaaaaaa',
        ],
        monstres: [['crache', 11, 7], ['crache', 3, 6]],
      },
      '1,0': {
        nom: 'La Route du Nord',
        tuiles: [
          'AaAaAaAaAaAaAaAa',
          'aaaaaaaaaaaaaaaa',
          'Aa..Gg........Aa',
          'aa..EE...r..b.aa',
          '....pp.P......Aa',
          'pppppppppp..,.aa',
          '......,.pp..b.Aa',
          'Aa..hh..pp..b.aa',
          'aa..hh..pp..f.rr',
          'AaAaAaAa..AaAaAa',
          'aaaaaaaa..aaaaaa',
        ],
        panneaux: { '7,4': 'La grotte du vieil ermite. On dit qu\'il ne sort plus depuis que le Bruit a envahi la Plaine.' },
        monstres: [['crache', 12, 3]],
      },
      '0,1': {
        nom: 'L\'Étang',
        tuiles: [
          'AaAa..AaAaAaAaAa',
          'aaaa..aaaaaaaaaa',
          'Aa..pp........Aa',
          'aa..pp..,...f.aa',
          'Aa..pp..........',
          'aa..pppppppppppp',
          'Aa.....,........',
          'aa..~~~~~~..h.Aa',
          'rr.~~~~~~~~.hhaa',
          'AaAaAaAaAaAaAaAa',
          'aaaaaaaaaaaaaaaa',
        ],
        monstres: [['crache', 10, 3], ['crache', 7, 6]],
      },
      '1,1': {
        nom: 'La Clairière',
        tuiles: [
          'AaAaAaAappAaAaAa',
          'aaaaaaaappaaaaaa',
          'Aa......pp....Aa',
          'aa..f...pp..f.aa',
          '........pp....Aa',
          'pppppppppp..b.aa',
          '......,.....bbAa',
          'Aa...P...hhh..aa',
          'aa.,.....hhh..Aa',
          'AaAaAaAaAaAaAaaa',
          'aaaaaaaaaaaaaaaa',
        ],
        panneaux: { '5,7': 'Plaine des Pixels. Au nord, la grotte du vieil ermite.' },
        monstres: [],
      },
    },
  },
  grotte: {
    nom: 'La grotte de l\'ermite',
    tuiles: [
      'WWWWWWWWWWWWWWWW',
      'WWWWWWWWWWWWWWWW',
      'WWssssssssssssWW',
      'WWsssssHssFsssWW',
      'WWssssssssssssWW',
      'WWssssssssssssWW',
      'WWssssssssssssWW',
      'WWssssssssssssWW',
      'WWssssssssssssWW',
      'WWWWWWWssWWWWWWW',
      'WWWWWWWXXWWWWWWW',
    ],
  },
};

// tuiles qui bloquent Spirit (l'eau bloque Spirit mais pas les projectiles)
SG.SOLIDES = new Set(['A', 'a', 'b', 'r', 'P', 'G', 'g', 'M', 'm', 'W', 'F', 'H', '~']);

SG.TEXTES = {
  arrivee: [
    [null, 'Spirit traverse la lumière et atterrit au milieu d\'un monde inconnu : la Plaine des Pixels, le premier pays du Réseau.'],
    ['Spirit', 'Le grésillement est plus net ici. On dirait qu\'il vient d\'une grotte, un peu plus au nord.'],
  ],
  ermiteDon: [
    ['Ermite', 'Te voilà enfin. Je sens ton signal depuis le début de la soirée.'],
    ['Spirit', 'Il y a des monstres partout dans la Plaine. Qu\'est-ce qui se passe ?'],
    ['Ermite', 'Le Roi Clickbait a brisé la Source et donné corps à la rumeur. Ces créatures sont faites de Bruit.'],
    ['Ermite', 'Ton casque t\'a protégé. Mais un casque ne suffira pas pour te défendre.'],
    ['Ermite', 'Prends ceci. Je le gardais pour quelqu\'un qui saurait s\'en servir.'],
  ],
  ampli: 'Tu as obtenu l\'Ampli ! Branché sur ton casque, il transforme ta voix en onde sonore. Appuie sur A (Espace au clavier) pour attaquer. Il coupe aussi les buissons et les hautes herbes.',
  ermiteApres: [
    ['Ermite', 'Quand ton cœur est plein, ton onde porte beaucoup plus loin. Garde-le en tête.'],
    ['Ermite', 'Le Bruit a creusé un terrier sous le Bois aux Grésilles, au nord-ouest de la Plaine. Le premier Gardien, Flash, y est retenu.'],
  ],
  ermiteRevoir: [
    ['Ermite', 'Le Terrier des Pop-ups est au nord-ouest, dans le Bois aux Grésilles. Reviens me voir si tu as besoin de reprendre des forces.'],
  ],
  soin: [['Ermite', 'Repose-toi un instant près du feu.']],
  terrier: 'L\'entrée du Terrier des Pop-ups. Ce prototype s\'arrête ici : le donjon arrive dans la prochaine version.',
  sansAmpli: 'Spirit n\'a rien pour se défendre. Mieux vaut éviter ces créatures pour l\'instant.',
  fin: 'Spirit s\'effondre... Il se relève dans la clairière.',
};
