# Découpe une planche de ChatGPT SANS la redessiner : chaque case garde exactement le dessin d'origine,
# à sa résolution d'origine. Seul le fond magenta est retiré.
#   python3 decouper_fidele.py planche.png COLONNES RANGÉES dossier_sortie [nom1 nom2 ...]
import os, sys
from PIL import Image

def fond(r, g, b):
    # magenta pur et magenta mêlé au contour (le violet des monstres, plus bleu que rouge, reste)
    return g < 90 and r > 120 and b > 120 and abs(r - b) < 60

def decouper(chemin, cols, rangs, sortie, noms):
    im = Image.open(chemin).convert('RGBA')
    W, H = im.size
    cw, ch = W // cols, H // rangs
    os.makedirs(sortie, exist_ok=True)
    k = 0
    for j in range(rangs):
        for i in range(cols):
            case = im.crop((i * cw, j * ch, (i + 1) * cw, (j + 1) * ch))
            px = case.load()
            for y in range(ch):
                for x in range(cw):
                    r, g, b, a = px[x, y]
                    if fond(r, g, b): px[x, y] = (0, 0, 0, 0)
            # liseré rosé au bord du contour, laissé par le lissage de ChatGPT
            for _ in range(2):
                a = case.copy().load()
                for y in range(ch):
                    for x in range(cw):
                        r, g, b, al = a[x, y]
                        if not al or not (r - g > 30 and b - g > 30 and abs(r - b) < 80): continue
                        if any(not (0 <= x + dx < cw and 0 <= y + dy < ch) or not a[x + dx, y + dy][3] for dx, dy in ((1, 0), (-1, 0), (0, 1), (0, -1))):
                            px[x, y] = (0, 0, 0, 0)
            nom = noms[k] if k < len(noms) else f'case-{k + 1:02d}'
            k += 1
            if nom == 'vide' or not case.getbbox():
                continue
            case.save(os.path.join(sortie, nom + '.png'))
    print('découpé dans', sortie)

if __name__ == '__main__':
    a = sys.argv
    decouper(a[1], int(a[2]), int(a[3]), a[4], a[5:])
