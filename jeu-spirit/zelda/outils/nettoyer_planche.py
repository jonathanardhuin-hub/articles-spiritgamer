# Remet au propre une planche de sprites faite par ChatGPT et la découpe case par case.
#   python3 nettoyer_planche.py planche.png COLONNES RANGÉES PIXELS_RÉELS dossier_sortie [nom1 nom2 ...]
# Chaque case est ramenée à sa vraie taille en pixels (couleur dominante de chaque bloc),
# le fond magenta devient transparent et les couleurs voisines sont fusionnées.
import os, sys
from collections import Counter
from PIL import Image

def couleur_bloc(im, x0, y0, x1, y1):
    # on regarde le centre du bloc : les bords sont souvent flous chez ChatGPT
    mx, my = (x1 - x0) / 4, (y1 - y0) / 4
    c = Counter()
    for y in range(int(y0 + my), max(int(y0 + my) + 1, int(y1 - my))):
        for x in range(int(x0 + mx), max(int(x0 + mx) + 1, int(x1 - mx))):
            r, g, b = im.getpixel((x, y))[:3]
            c[(r >> 3 << 3, g >> 3 << 3, b >> 3 << 3)] += 1
    return c.most_common(1)[0][0]

def est_fond(c):
    r, g, b = c
    # magenta, même mêlé au contour par le flou ; le violet des monstres (bleu plus fort que le rouge) reste
    return g < 60 and r > 100 and b > 100 and abs(r - b) < 50

def nettoyer(chemin, cols, rangs, reel, sortie, noms, couleurs=48):
    im = Image.open(chemin).convert('RGB')
    W, H = im.size
    cw, ch = W / cols, H / rangs
    os.makedirs(sortie, exist_ok=True)
    k = 0
    for j in range(rangs):
        for i in range(cols):
            spr = Image.new('RGBA', (reel, reel), (0, 0, 0, 0))
            vide = True
            for y in range(reel):
                for x in range(reel):
                    x0 = i * cw + x * cw / reel; y0 = j * ch + y * ch / reel
                    c = couleur_bloc(im, x0, y0, x0 + cw / reel, y0 + ch / reel)
                    if not est_fond(c):
                        spr.putpixel((x, y), c + (255,)); vide = False
            nom = noms[k] if k < len(noms) else f'case-{k + 1:02d}'
            k += 1
            if vide or nom == 'vide':
                continue
            # franges : pixels du bord teintés de magenta par le flou
            for _ in range(2):
                a = spr.copy()
                for y in range(reel):
                    for x in range(reel):
                        p = a.getpixel((x, y))
                        if not p[3]: continue
                        bord = any(not (0 <= x + dx < reel and 0 <= y + dy < reel) or not a.getpixel((x + dx, y + dy))[3] for dx, dy in ((1, 0), (-1, 0), (0, 1), (0, -1)))
                        r, g, b = p[:3]
                        if bord and g < 90 and r - g > 40 and b - g > 40 and abs(r - b) < 70: spr.putpixel((x, y), (0, 0, 0, 0))
            # palette réduite : les teintes presque identiques deviennent une seule couleur
            alpha = spr.getchannel('A')
            q = spr.convert('RGB').quantize(colors=couleurs, method=Image.Quantize.MEDIANCUT).convert('RGBA')
            q.putalpha(alpha)
            q.save(os.path.join(sortie, nom + '.png'))
    print('découpé dans', sortie)

if __name__ == '__main__':
    a = sys.argv
    nettoyer(a[1], int(a[2]), int(a[3]), int(a[4]), a[5], a[6:])
