"""Obstacles des écrans peints (arbres, rochers, eau, murs), tracés à la main sur l'image ramenée à 1280 x 720.
Produit jeu/js/masques.js (grille de 64 x 36 cellules de 20 px) et des aperçus de contrôle.
  '#' obstacle   '~' eau   'v' trou   '.' libre
Règle : on bloque toute la silhouette visible des arbres et des rochers, feuillage compris,
pour que Spirit ne passe jamais derrière un élément peint (il serait dessiné par-dessus)."""
import os, sys, json
sys.path.insert(0, os.path.dirname(__file__))
from masques import appliquer, apercu, COLS, ROWS

R = lambda x0, y0, x1, y1, v='#': (x0, y0, x1, y1, v)
VIDE = ['.' * COLS] * ROWS

ECRANS = {
  # Plaine des Pixels ------------------------------------------------------------------------------
  '1,2': ('plaine/ecran-1-2-la-clairiere.png', [
      R(0, 0, 595, 70), R(690, 0, 1280, 80), R(0, 0, 70, 320), R(0, 0, 130, 150),
      R(1090, 0, 1280, 110), R(1205, 0, 1280, 320),
      R(90, 70, 235, 275), R(305, 70, 455, 280), R(235, 70, 305, 160),          # rochers de la grotte (entrée libre)
      R(0, 410, 70, 720), R(0, 560, 170, 720), R(0, 600, 1280, 720),
      R(1210, 405, 1280, 720), R(1110, 560, 1280, 720)]),
  '1,1': ('plaine/ecran-1-1-le-carrefour.png', [
      R(0, 0, 565, 60), R(0, 0, 75, 310), R(0, 0, 165, 130), R(700, 0, 1280, 60), R(1150, 0, 1280, 160), R(1200, 0, 1280, 310),
      R(215, 140, 360, 235), R(825, 140, 930, 212), R(1012, 218, 1078, 278),
      R(188, 485, 348, 592), R(938, 498, 1112, 602),
      R(0, 400, 72, 720), R(0, 580, 568, 720), R(698, 590, 1280, 720), R(1212, 400, 1280, 720), R(1150, 480, 1280, 720)]),
  '1,0': ('plaine/ecran-1-0-la-route-du-nord.png', [
      R(0, 0, 598, 70), R(692, 0, 1280, 65), R(0, 0, 92, 300), R(1180, 0, 1280, 300),
      R(278, 100, 482, 228),
      R(772, 86, 1128, 314, '~'),
      R(162, 442, 358, 572), R(822, 482, 944, 582),
      R(0, 380, 72, 720), R(0, 590, 578, 720), R(702, 600, 1280, 720), R(1208, 380, 1280, 720),
      R(0, 530, 122, 600), R(1158, 530, 1280, 600)]),
  '0,1': ('plaine/ecran-0-1-la-lisiere.png', [
      R(0, 0, 1280, 62), R(0, 0, 332, 192), R(438, 38, 604, 192), R(818, 38, 952, 205), R(928, 92, 1062, 218),
      R(1078, 0, 1280, 132), R(1198, 0, 1280, 318),
      R(0, 190, 62, 720), R(58, 238, 312, 422),
      R(78, 498, 262, 642), R(398, 518, 592, 720), R(788, 538, 922, 662), R(898, 458, 1280, 720),
      R(0, 618, 1280, 720), R(1198, 402, 1280, 720)]),
  '0,2': ('plaine/ecran-0-2-l-etang.png', [
      R(0, 0, 1280, 62), R(0, 0, 72, 720), R(78, 98, 142, 162), R(1058, 48, 1122, 112), R(1148, 112, 1202, 162),
      R(1180, 0, 1280, 300),
      R(288, 118, 612, 252, '~'), R(238, 244, 882, 442, '~'), R(378, 438, 602, 548, '~'), R(598, 198, 702, 252, '~'),
      R(492, 482, 572, 548), R(68, 482, 132, 542), R(138, 568, 202, 622), R(1112, 518, 1202, 592),
      R(0, 520, 92, 720), R(0, 612, 1280, 720), R(1196, 382, 1280, 720)]),
  '2,0': ('plaine/ecran-2-0-le-vieux-chene.png', [
      R(0, 0, 1280, 72), R(458, 0, 812, 246), R(558, 238, 722, 308),
      R(78, 42, 242, 168), R(1058, 48, 1212, 202),
      R(0, 0, 72, 290), R(0, 390, 82, 720), R(58, 458, 292, 622),
      R(0, 610, 1280, 720), R(1038, 528, 1232, 642), R(1208, 0, 1280, 720)]),
  '2,1': ('plaine/ecran-2-1-le-rocher-fissure.png', [
      R(0, 0, 1280, 82), R(0, 0, 72, 270), R(0, 362, 72, 720),
      R(778, 72, 1192, 362),
      R(0, 580, 558, 720), R(662, 590, 1280, 720), R(1200, 0, 1280, 720)]),
  '2,2': ('plaine/ecran-2-2-les-rochers.png', [
      R(0, 0, 603, 62), R(687, 0, 1280, 62), R(0, 0, 82, 300), R(62, 228, 122, 282),
      R(112, 62, 522, 258), R(818, 78, 1152, 272),
      R(732, 322, 812, 392), R(448, 402, 518, 462), R(1102, 392, 1172, 462),
      R(128, 492, 242, 582), R(822, 542, 912, 608),
      R(0, 590, 1280, 720), R(0, 385, 76, 720), R(1200, 50, 1280, 720)]),
}

def masque(cle):
    src, rects = ECRANS[cle]
    return appliquer(VIDE, rects)

if __name__ == '__main__':
    racine = os.path.join(os.path.dirname(__file__), '..')
    out = {k: masque(k) for k in ECRANS}
    with open(os.path.join(racine, 'jeu', 'js', 'masques.js'), 'w') as f:
        f.write('// Généré par outils/masques_decors.py : obstacles des écrans peints (cellules de 20 px)\n')
        f.write("'use strict';\nSG.MASQUES = " + json.dumps(out, indent=0) + ';\n')
    if len(sys.argv) > 1:
        for k, m in out.items(): apercu(ECRANS[k][0], m, os.path.join(sys.argv[1], 'masque_' + k.replace(',', '-') + '.png'))
    print('ok', len(out))
