"""Masques de collision des images plein écran.

Chaque image (1672 x 941) est ramenée à l'écran logique 1280 x 720 et découpée en cellules de 20 x 20
(64 colonnes x 36 lignes). Une cellule vaut :
  '.' libre   '#' obstacle (arbre, rocher, mur, meuble)   '~' eau
Le calcul automatique donne une première version, corrigée ensuite par des rectangles dans CORRECTIONS.
"""
import os, sys, json
import numpy as np
from PIL import Image, ImageDraw

RACINE = os.path.join(os.path.dirname(__file__), '..')
IMG = os.path.join(RACINE, 'images')
C = 20
COLS, ROWS = 1280 // C, 720 // C

def charger(src):
    return np.array(Image.open(os.path.join(IMG, src)).convert('RGB').resize((1280, 720), Image.LANCZOS)).astype(int)

def auto_exterieur(a):
    """Plaine : herbe claire et terre = libre ; feuillage sombre, roche grise = obstacle ; bleu = eau."""
    m = []
    for r in range(ROWS):
        ligne = ''
        for c in range(COLS):
            b = a[r*C:(r+1)*C, c*C:(c+1)*C].reshape(-1, 3)
            R, G, B = b[:, 0], b[:, 1], b[:, 2]
            eau = ((B > G + 10) & (B > R + 40)).mean()
            gris = ((abs(R - G) < 22) & (abs(G - B) < 28) & (R > 70)).mean()
            noir = ((R + G + B) < 110).mean()
            herbe = ((G > 150) & (G > R + 20) & (G > B + 40)).mean()
            terre = ((R > 170) & (G > 110) & (G < 215) & (B < 150) & (R > G)).mean()
            if eau > 0.45: ligne += '~'
            elif herbe + terre > 0.62 and noir < 0.12 and gris < 0.2: ligne += '.'
            else: ligne += '#'
        m.append(ligne)
    return m

def appliquer(m, corrections):
    g = [list(l) for l in m]
    for (x0, y0, x1, y1, v) in corrections:   # coordonnées logiques (pixels 1280 x 720)
        for r in range(max(0, y0 // C), min(ROWS, (y1 + C - 1) // C)):
            for c in range(max(0, x0 // C), min(COLS, (x1 + C - 1) // C)):
                g[r][c] = v
    return [''.join(l) for l in g]

def apercu(src, m, dest):
    im = Image.open(os.path.join(IMG, src)).convert('RGB').resize((1280, 720))
    ov = Image.new('RGBA', im.size, (0, 0, 0, 0)); d = ImageDraw.Draw(ov)
    coul = {'#': (255, 0, 0, 90), '~': (0, 120, 255, 90)}
    for r, l in enumerate(m):
        for c, v in enumerate(l):
            if v in coul: d.rectangle([c*C, r*C, c*C+C-1, r*C+C-1], fill=coul[v])
    for x in range(0, 1281, 80): d.line([(x, 0), (x, 720)], fill=(255, 255, 0, 120))
    for y in range(0, 721, 80): d.line([(0, y), (1280, y)], fill=(255, 255, 0, 120))
    Image.alpha_composite(im.convert('RGBA'), ov).convert('RGB').save(dest)
