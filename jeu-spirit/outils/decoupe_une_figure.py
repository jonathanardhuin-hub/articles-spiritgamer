# une seule figure par image : on retire le fond gris relié aux bords et on garde tout le reste
import sys
from PIL import Image
import numpy as np
from scipy import ndimage
src, dst = sys.argv[1], sys.argv[2]
a = np.array(Image.open(src).convert('RGB')).astype(int)
d = np.abs(a - a[5, 5]).sum(2)
bl, n = ndimage.label(d < 45)
bord = set(np.unique(np.concatenate([bl[0], bl[-1], bl[:, 0], bl[:, -1]]))) - {0}
fond = np.isin(bl, list(bord))
sl, sn = ndimage.label((d < 20) & ~fond)
for k, sz in enumerate(ndimage.sum(np.ones_like(d), sl, range(1, sn + 1))):
    if sz > 250: fond |= (sl == k + 1)
# retirer les miettes isolées
lab, m = ndimage.label(~fond)
tailles = ndimage.sum(~fond, lab, range(1, m + 1))
garde = np.isin(lab, [i + 1 for i, t in enumerate(tailles) if t > 400])
im = Image.fromarray(np.dstack([a, np.where(garde, 255, 0)]).astype('uint8'), 'RGBA')
im.crop(im.getbbox()).save(dst)
