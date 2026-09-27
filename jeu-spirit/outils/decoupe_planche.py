"""Découpe une planche ChatGPT (plusieurs éléments sur fond gris) en une image détourée par élément.
Usage : python3 decoupe_planche.py planche.png dossier_sortie nom1 nom2 ...
Les éléments sont pris dans l'ordre de lecture (rangées de haut en bas, puis de gauche à droite),
qui est l'ordre de la liste de la carte du catalogue."""
import sys, os
import numpy as np
from PIL import Image
from scipy import ndimage

src, dossier, noms = sys.argv[1], sys.argv[2], sys.argv[3:]
a = np.array(Image.open(src).convert('RGB')).astype(int)
gris = np.median(np.concatenate([a[0], a[-1], a[:, 0], a[:, -1]]), axis=0)
d = np.abs(a - gris).sum(2)
# fond gris relié aux bords
bl, _ = ndimage.label(d < 45)
bord = set(np.unique(np.concatenate([bl[0], bl[-1], bl[:, 0], bl[:, -1]]))) - {0}
fond = np.isin(bl, list(bord))
objet = ~fond
# on regroupe les morceaux d'un même élément (étincelles, confettis) sans coller deux éléments séparés de 60 px
groupes, n = ndimage.label(ndimage.binary_dilation(objet, iterations=12))
boites = []
for k, sl in enumerate(ndimage.find_objects(groupes)):
    m = (groupes[sl] == k + 1) & objet[sl]
    if m.sum() < 1500:
        continue
    boites.append((sl, m))
# ordre de lecture : rangées d'abord
boites.sort(key=lambda b: (b[0][0].start + b[0][0].stop) / 2)
rangees, courante = [], []
for b in boites:
    cy = (b[0][0].start + b[0][0].stop) / 2
    if courante and cy - (courante[0][0][0].start + courante[0][0][0].stop) / 2 > (courante[0][0][0].stop - courante[0][0][0].start) * 0.5:
        rangees.append(courante); courante = []
    courante.append(b)
if courante:
    rangees.append(courante)
ordre = [b for r in rangees for b in sorted(r, key=lambda b: b[0][1].start)]
os.makedirs(dossier, exist_ok=True)
for i, (sl, m) in enumerate(ordre):
    nom = noms[i] if i < len(noms) else f'element-{i + 1}'
    rgb = a[sl]
    im = Image.fromarray(np.dstack([rgb, np.where(m, 255, 0)]).astype('uint8'), 'RGBA')
    im.crop(im.getbbox()).save(os.path.join(dossier, nom + '.png'))
    print(nom, im.getbbox())
if len(ordre) != len(noms):
    print(f'ATTENTION : {len(ordre)} éléments trouvés pour {len(noms)} noms, vérifier la planche')
