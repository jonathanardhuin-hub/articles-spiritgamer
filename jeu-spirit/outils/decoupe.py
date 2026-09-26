# découpe par composantes connexes : chaque gros morceau = une figure, les petits bouts vont au morceau le plus proche
import sys
from PIL import Image
import numpy as np
from scipy import ndimage
src,prefix=sys.argv[1],sys.argv[2]
a=np.array(Image.open(src).convert('RGB')).astype(int)
d=np.abs(a-a[5,5]).sum(2)
near=d<45
bl,bn=ndimage.label(near)
border=set(np.unique(np.concatenate([bl[0],bl[-1],bl[:,0],bl[:,-1]])))-{0}
bg=np.isin(bl,list(border))
# poches de fond enfermées (entre un bras et une lance) : très proches du gris et assez grandes
strict=d<20
sl,sn=ndimage.label(strict&~bg)
for k,sz in enumerate(ndimage.sum(np.ones_like(d),sl,range(1,sn+1))):
    if sz>250: bg|=(sl==k+1)
fg=~bg
lab,n=ndimage.label(fg)
sizes=ndimage.sum(fg,lab,range(1,n+1))
big=[i+1 for i,s in enumerate(sizes) if s>0.02*sizes.max()*0+5000]
cent={i:ndimage.center_of_mass(lab==i) for i in big}
assign=np.zeros_like(lab)
for i in big: assign[lab==i]=i
dist_idx=None
for j,s in enumerate(sizes):
    k=j+1
    if k in big or s<20: continue
    cy,cx=ndimage.center_of_mass(lab==k)
    best=min(big,key=lambda i:(cent[i][0]-cy)**2+(cent[i][1]-cx)**2)
    assign[lab==k]=best
big.sort(key=lambda i:cent[i][1])
print(len(big),'figures')
for n_,i in enumerate(big):
    m=assign==i
    rgba=np.dstack([a,np.where(m,255,0)]).astype('uint8')
    im=Image.fromarray(rgba,'RGBA'); im=im.crop(im.getbbox()); im.save(f'{prefix}_{n_+1}.png'); print(im.size)
