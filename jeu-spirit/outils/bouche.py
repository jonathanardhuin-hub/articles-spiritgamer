"""Ferme la bouche de Spirit sur une image : efface la bouche ouverte et dessine un petit sourire."""
from PIL import Image, ImageDraw
import numpy as np
from scipy import ndimage

def fermer_bouche(im, profil=False):
    a = np.array(im.convert('RGBA')).astype(int)
    H, W = a.shape[:2]
    r, g, b, al = a[..., 0], a[..., 1], a[..., 2], a[..., 3]
    rose = (r > 170) & (g < 150) & (b < 175) & (r - g > 60) & (al > 0)
    rose[int(H * 0.55):] = False
    lab, n = ndimage.label(rose)
    if n == 0:
        return im
    tailles = ndimage.sum(rose, lab, range(1, n + 1))
    k = int(np.argmax(tailles)) + 1
    ys, xs = np.where(lab == k)
    x0, x1, y0, y1 = xs.min(), xs.max(), ys.min(), ys.max()
    h = y1 - y0
    # zone de la bouche : rose + intérieur sombre + contour, limitée à une boîte autour du rose
    sombre = (r + g + b < 330) & (al > 0)
    boite = np.zeros_like(rose)
    mx = max(4, int((x1 - x0) * 0.25))
    boite[max(0, y0 - int(h * 0.9)):y1 + max(3, int(h * 0.25)), max(0, x0 - mx):x1 + mx] = True
    bouche = ((lab == k) | sombre) & boite
    # ne garder que la partie sombre connectée au rose
    lab2, _ = ndimage.label(bouche)
    ids = set(np.unique(lab2[lab == k])) - {0}
    bouche = np.isin(lab2, list(ids))
    bouche = ndimage.binary_dilation(bouche, iterations=max(2, h // 12)) & (al > 0)
    # couleur de peau prise juste au-dessus de la bouche
    out = a.copy()
    out[bouche, 0:3] = [252, 252, 255]
    img = Image.fromarray(out.astype('uint8'), 'RGBA')
    d = ImageDraw.Draw(img)
    by0, bx = np.where(bouche)
    cx = (bx.min() + bx.max()) / 2
    cy = by0.min() + (by0.max() - by0.min()) * 0.35
    w = (x1 - x0) * (0.55 if not profil else 0.7)
    ep = max(2, int(W / 110))
    if profil:
        cx = bx.max() - w * 0.55
    d.arc([cx - w / 2, cy - w * 0.35, cx + w / 2, cy + w * 0.35], 25, 155, fill=(10, 10, 20, 255), width=ep)
    return img
