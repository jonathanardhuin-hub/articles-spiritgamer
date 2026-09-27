"""Découpe les rochers et les touffes d'herbe directement dans les écrans peints de la Plaine.

Les morceaux gardent les pixels de l'image d'origine : même teinte, même trait, aucun effet de collage.
  - rochers : dessinés par-dessus Spirit quand il passe derrière ; seul leur pied bloque (masque de collision) ;
  - touffes : on marche dedans, l'onde les coupe ; le sol peint sous elles est reconstitué avec de l'herbe voisine ;
  - bords : les sorties gauche et droite prolongent le chemin jusqu'au bord (plus de pavé clair collé au bord).
Produit :
  images/plaine/sol/ecran-x-y.png   sol sans les touffes coupables (utilisé à la place de l'écran d'origine)
  jeu/assets/decoupes-x-y.webp      planche des morceaux (résolution d'origine)
  jeu/js/decoupes.js                position des morceaux
  outils/decoupes.json              pieds des rochers et zones remplacées, lu par masques_decors.py
"""
import os, sys, json
import numpy as np
import cv2
from PIL import Image
sys.path.insert(0, os.path.dirname(__file__))
from masques_decors import ECRANS
from masques import appliquer, COLS, ROWS

RACINE = os.path.join(os.path.dirname(__file__), '..')
IMG = os.path.join(RACINE, 'images')
W0, H0 = 1672, 941
F = W0 / 1280  # pixels d'origine par pixel logique

# rectangles de rochers que l'on garde entiers (falaise de la grotte, coins mêlés d'arbres)
# bouts de chemin sans issue collés au bord (effet de pavé) : remplacés par de l'herbe
EFFACER = {'2,0': [(0, 270, 160, 410)]}

GARDER = {('1,2', 6), ('1,2', 7), ('1,2', 8)}


def elli(n):
    return cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (n, n))


def remplir(m):
    """bouche les trous d'un masque binaire (uint8 0/255)"""
    h, w = m.shape
    f = m.copy()
    mm = np.zeros((h + 2, w + 2), np.uint8)
    cv2.floodFill(f, mm, (0, 0), 255)
    return m | cv2.bitwise_not(f)


def zones_rochers(k, rects, gris):
    zones = []
    for i, (x0, y0, x1, y1, v) in enumerate(rects):
        if v != '#' or (k, i) in GARDER:
            continue
        if gris[int(y0 * F):int(y1 * F), int(x0 * F):int(x1 * F)].mean() / 255 >= 0.1:
            zones.append(i)
    return zones


def pieces_rochers(k, rects, zones, a, gris, sombre):
    h, w = gris.shape
    zone = np.zeros((h, w), np.uint8)
    for i in zones:
        x0, y0, x1, y1, _ = rects[i]
        zone[int(y0 * F):int(y1 * F), int(x0 * F):int(x1 * F)] = 255
    g = gris & zone
    g = cv2.morphologyEx(g, cv2.MORPH_CLOSE, elli(15))
    g = remplir(g)
    g = cv2.morphologyEx(g, cv2.MORPH_OPEN, elli(5))
    # le trait noir autour des pierres fait partie du rocher
    tour = cv2.dilate(g, elli(9)) & sombre & zone
    g = remplir(cv2.morphologyEx(g | tour, cv2.MORPH_CLOSE, elli(5)))
    n, lab, st, _ = cv2.connectedComponentsWithStats(g)
    garde = np.zeros_like(g)
    for j in range(1, n):
        if st[j][4] >= 500:
            garde[lab == j] = 255
    # un tas de rochers = un seul morceau par zone tracée (ses pierres se tiennent)
    out = []
    for i in zones:
        x0, y0, x1, y1, _ = rects[i]
        z = np.zeros_like(g)
        z[int(y0 * F):int(y1 * F), int(x0 * F):int(x1 * F)] = 255
        m = garde & z
        garde &= cv2.bitwise_not(z)
        if not m.any():
            continue
        x, y, ww, hh = cv2.boundingRect(cv2.findNonZero(m))
        out.append({'t': 'r', 'x': int(x), 'y': int(y), 'm': m[y:y + hh, x:x + ww].copy(), 'garde': (k, i) in GARDER})
    return out


def pieces_touffes(k, masque, a, sombre, exclus):
    """touffes : contours noirs posés sur l'herbe, loin des arbres et des rochers"""
    h, w = sombre.shape
    libre = np.zeros((h, w), np.uint8)
    for r, l in enumerate(masque):
        for c, v in enumerate(l):
            if v == '.':
                libre[int(r * 20 * F):int((r + 1) * 20 * F), int(c * 20 * F):int((c + 1) * 20 * F)] = 255
    libre = cv2.erode(libre, elli(19)) & cv2.bitwise_not(cv2.dilate(exclus, elli(31)))
    R, G, B = a[..., 0].astype(int), a[..., 1].astype(int), a[..., 2].astype(int)
    vert = ((G > R + 15) & (G > B + 30)).astype(np.uint8) * 255
    contour = sombre & cv2.dilate(vert, elli(5)) & libre
    blocs = cv2.morphologyEx(contour, cv2.MORPH_CLOSE, elli(23))
    n, lab, st, _ = cv2.connectedComponentsWithStats(blocs)
    out = []
    for j in range(1, n):
        x, y, ww, hh, ar = st[j]
        if ww < 32 or hh < 28 or ww > 240 or hh > 200:
            continue
        # pas de touffe au bord de l'écran : elle emporterait un morceau d'arbre de la lisière (sorties gauche et droite)
        if x < 80 * F or x + ww > (1280 - 80) * F:
            continue
        comp = (lab == j).astype(np.uint8) * 255
        pts = cv2.findNonZero(comp)
        hull = np.zeros((h, w), np.uint8)
        cv2.fillConvexPoly(hull, cv2.convexHull(pts), 255)
        hull = cv2.dilate(hull, elli(7))
        x, y, ww, hh = cv2.boundingRect(cv2.findNonZero(hull))
        m = hull[y:y + hh, x:x + ww]
        out.append({'t': 'h', 'x': int(x), 'y': int(y), 'm': m})
    return out


def reboucher(sol, trou, propre, tolere=0.015):
    """remplit le trou avec un morceau d'herbe propre pris à côté (même teinte, même grain), fondu sur les bords"""
    H, W = trou.shape
    large = cv2.dilate(trou, elli(9))
    x, y, w, h = cv2.boundingRect(cv2.findNonZero(cv2.dilate(large, elli(13))))
    forme = (large[y:y + h, x:x + w] > 0).astype(np.float32)
    n = forme.sum()
    anneau = cv2.dilate(trou, elli(9)) & cv2.bitwise_not(trou)
    ann = sol[anneau > 0].reshape(-1, 3).astype(float)
    cible, cstd = ann.mean(0), ann.std(0).mean()
    # fenêtre de recherche autour du trou (plus rapide, et l'herbe proche a la même lumière)
    X0, Y0 = max(0, x - 420), max(0, y - 300)
    X1, Y1 = min(W, x + w + 420), min(H, y + h + 300)
    sale = (propre[Y0:Y1, X0:X1] == 0).astype(np.float32)
    part_sale = cv2.matchTemplate(sale, forme, cv2.TM_CCORR) / n
    f = sol[Y0:Y1, X0:X1].astype(np.float32)
    cout = np.zeros_like(part_sale)
    var = np.zeros_like(part_sale)
    for ch in range(3):
        m1 = cv2.matchTemplate(f[..., ch], forme, cv2.TM_CCORR) / n
        m2 = cv2.matchTemplate(f[..., ch] ** 2, forme, cv2.TM_CCORR) / n
        cout += np.abs(m1 - cible[ch])
        var += np.sqrt(np.maximum(m2 - m1 ** 2, 0))
    cout += 1.5 * np.abs(var / 3 - cstd)
    yy, xx = np.mgrid[0:cout.shape[0], 0:cout.shape[1]]
    xx = xx + X0; yy = yy + Y0
    cout += (np.abs(xx - x) + np.abs(yy - y)) * 0.01
    cout[(part_sale > tolere) | ((np.abs(xx - x) < w) & (np.abs(yy - y) < h))] = np.inf
    j = np.argmin(cout)
    if not np.isfinite(cout.flat[j]):
        return False
    sy, sx = np.unravel_index(j, cout.shape)
    sy += Y0; sx += X0
    fm = forme > 0
    al = cv2.GaussianBlur((forme * 255).astype(np.uint8), (0, 0), 2.5).astype(float)[..., None] / 255
    rep = sol[sy:sy + h, sx:sx + w].astype(float)
    sol[y:y + h, x:x + w] = (rep * al + sol[y:y + h, x:x + w] * (1 - al)).astype(np.uint8)
    # la zone recopiée n'est plus « propre » pour les suivantes (évite de répéter le même motif)
    propre[sy:sy + h, sx:sx + w][fm] = 0
    return True


def prolonger_bords(sol, masque):
    """sorties de côté : la bande juste à l'intérieur est reflétée jusqu'au bord (en miroir, donc sans couture),
    pour que le chemin file hors de l'écran au lieu de finir sur un pavé clair"""
    H, W = sol.shape[:2]
    e = int(56 * F)
    for cote in ('g', 'd'):
        col = 0 if cote == 'g' else COLS - 1
        rangs = [r for r in range(ROWS) if masque[r][col] == '.']
        if not rangs:
            continue
        y0, y1 = int((rangs[0] * 20 - 26) * F), int(((rangs[-1] + 1) * 20 + 26) * F)
        y0, y1 = max(0, y0), min(H, y1)
        if cote == 'g':
            src = sol[y0:y1, e:2 * e][:, ::-1].copy()
            dst = (slice(y0, y1), slice(0, e))
        else:
            src = sol[y0:y1, W - 2 * e:W - e][:, ::-1].copy()
            dst = (slice(y0, y1), slice(W - e, W))
        hh = y1 - y0
        fy = np.ones(hh)
        b = int(18 * F)
        fy[:b] = np.linspace(0, 1, b); fy[-b:] = np.linspace(1, 0, b)
        al = np.repeat(fy[:, None], e, 1)[..., None]
        sol[dst] = (src * al + sol[dst] * (1 - al)).astype(np.uint8)


def planche(pieces, a):
    """range les morceaux en rangées sur une planche RGBA"""
    larg = 2048
    x = y = hr = 0
    for p in pieces:
        h, w = p['m'].shape
        if x + w + 2 > larg:
            x, y, hr = 0, y + hr + 2, 0
        p['sx'], p['sy'] = x, y
        x += w + 2
        hr = max(hr, h)
    pl = np.zeros((y + hr + 2, larg, 4), np.uint8)
    for p in pieces:
        h, w = p['m'].shape
        rgb = a[p['y']:p['y'] + h, p['x']:p['x'] + w]
        al = cv2.GaussianBlur(p['m'], (3, 3), 0.7) if p['t'] == 'r' else p['m']
        pl[p['sy']:p['sy'] + h, p['sx']:p['sx'] + w] = np.dstack([rgb, al])
    return pl


def traiter(k, apercus=None):
    src, rects = ECRANS[k]
    a = np.array(Image.open(os.path.join(IMG, src)).convert('RGB').resize((W0, H0), Image.LANCZOS))
    R, G, B = a[..., 0].astype(int), a[..., 1].astype(int), a[..., 2].astype(int)
    V = a.max(2).astype(int)
    gris = ((abs(R - G) < 22) & (abs(G - B) < 30) & (R > 70) & (a.min(2) < 200)).astype(np.uint8) * 255
    # pierre au sens large (faces éclairées et faces à l'ombre, gris bleutés) : pour découper les rochers sans trous
    mn = a.min(2).astype(int)
    roche = (((V - mn) < 0.30 * np.maximum(V, 1)) & (G <= np.maximum(R, B) + 10) & (V > 45) & (mn < 215)).astype(np.uint8) * 255
    sombre = (V < 42).astype(np.uint8) * 255
    zones = zones_rochers(k, rects, gris)
    # la falaise de la grotte garde son obstacle entier, mais elle est aussi découpée : Spirit entre DANS la grotte
    rochers = pieces_rochers(k, rects, zones + [i for (kk, i) in sorted(GARDER) if kk == k], a, roche, sombre)
    # masque sans les zones de rochers : sert à trouver l'herbe libre pour les touffes
    base = appliquer(['.' * COLS] * ROWS, [r for i, r in enumerate(rects) if i not in zones])
    tout_roc = np.zeros((H0, W0), np.uint8)
    for p in rochers:
        h, w = p['m'].shape
        tout_roc[p['y']:p['y'] + h, p['x']:p['x'] + w] |= p['m']
    touffes = pieces_touffes(k, base, a, sombre, tout_roc)
    # sol : herbe propre = herbe verte, sans trait noir, sans fleur, sans touffe
    sol = a.copy()
    trait = cv2.dilate(sombre, elli(5))
    fleur = cv2.dilate((a.min(2) > 175).astype(np.uint8) * 255, elli(13))
    vert = ((G > R + 15) & (G > B + 30)).astype(np.uint8) * 255
    sable = cv2.dilate(((R > G) & (R > 150)).astype(np.uint8) * 255, elli(25))
    marche = np.zeros((H0, W0), np.uint8)
    for r, l in enumerate(base):
        for c, v in enumerate(l):
            if v == '.':
                marche[int(r * 20 * F):int((r + 1) * 20 * F), int(c * 20 * F):int((c + 1) * 20 * F)] = 255
    marche = cv2.erode(marche, elli(31))
    propre = vert & marche & cv2.bitwise_not(trait) & cv2.bitwise_not(fleur) & cv2.bitwise_not(sable) & cv2.bitwise_not(cv2.dilate(tout_roc, elli(21)))
    for p in touffes:
        h, w = p['m'].shape
        propre[p['y']:p['y'] + h, p['x']:p['x'] + w][p['m'] > 0] = 0
    gardees = []
    for p in touffes:
        h, w = p['m'].shape
        trou = np.zeros((H0, W0), np.uint8)
        trou[p['y']:p['y'] + h, p['x']:p['x'] + w] = p['m']
        if reboucher(sol, trou, propre):
            gardees.append(p)
    touffes = gardees
    for (x0, y0, x1, y1) in EFFACER.get(k, []):
        z = np.zeros((H0, W0), np.uint8)
        z[int(y0 * F):int(y1 * F), int(x0 * F):int(x1 * F)] = 255
        sab = cv2.dilate(((R > G) & (R > 150)).astype(np.uint8) * 255, elli(9)) & z
        # par petits morceaux, pour trouver de l'herbe propre de la bonne taille
        pas = int(34 * F)
        for yy in range(int(y0 * F), int(y1 * F), pas):
            for xx in range(int(x0 * F), int(x1 * F), pas):
                t = np.zeros_like(sab); t[yy:yy + pas, xx:xx + pas] = sab[yy:yy + pas, xx:xx + pas]
                if t.any():
                    if not reboucher(sol, t, propre, 0.05):
                        sol[:] = cv2.inpaint(sol, t, 7, cv2.INPAINT_TELEA)
    prolonger_bords(sol, base)
    pieces = rochers + touffes
    pl = planche(pieces, a)
    # pieds des rochers : la moitié basse de la silhouette bloque, on passe derrière le haut
    pieds = []
    for p in rochers:
        if p.get('garde'):
            continue
        m = p['m']
        h, w = m.shape
        pied = np.zeros_like(m)
        cols = np.nonzero(m.any(0))[0]
        for xx in cols:
            ys = np.nonzero(m[:, xx])[0]
            haut, bas = ys.min(), ys.max()
            pied[int(haut + (bas - haut) * 0.45):bas + 1, xx] = 255
        # on lisse : pas de fente entre deux pierres d'un même tas
        pied = cv2.morphologyEx(pied, cv2.MORPH_CLOSE, elli(31))
        for r in range(ROWS):
            for c in range(COLS):
                y0, y1 = int(r * 20 * F) - p['y'], int((r + 1) * 20 * F) - p['y']
                x0, x1 = int(c * 20 * F) - p['x'], int((c + 1) * 20 * F) - p['x']
                if y1 <= 0 or x1 <= 0 or y0 >= h or x0 >= w:
                    continue
                cel = pied[max(0, y0):max(0, y1), max(0, x0):max(0, x1)]
                if cel.size and (cel > 0).sum() > 0.25 * (20 * F) ** 2:
                    pieds.append([c, r])
    # eau : cellules vraiment bleues des rectangles d'eau
    eau = []
    bleu = ((B > G + 10) & (B > R + 40)).astype(np.uint8)
    for (x0, y0, x1, y1, v) in rects:
        if v != '~':
            continue
        for r in range(y0 // 20, (y1 + 19) // 20):
            for c in range(x0 // 20, (x1 + 19) // 20):
                cel = bleu[int(r * 20 * F):int((r + 1) * 20 * F), int(c * 20 * F):int((c + 1) * 20 * F)]
                if cel.size and cel.mean() > 0.35:
                    eau.append([c, r])
    nom = k.replace(',', '-')
    os.makedirs(os.path.join(IMG, 'plaine', 'sol'), exist_ok=True)
    Image.fromarray(sol).save(os.path.join(IMG, 'plaine', 'sol', 'ecran-' + nom + '.png'))
    Image.fromarray(pl, 'RGBA').save(os.path.join(RACINE, 'jeu', 'assets', 'decoupes-' + nom + '.webp'), 'WEBP', quality=90, method=6)
    liste = []
    for p in pieces:
        h, w = p['m'].shape
        ys, xs = np.nonzero(p['m'])
        e = {'t': p['t'], 's': [p['sx'], p['sy'], w, h],
             'd': [round(p['x'] / F, 1), round(p['y'] / F, 1), round(w / F, 1), round(h / F, 1)],
             'b': round((p['y'] + ys.max()) / F, 1)}
        if p['t'] == 'h':
            m = p['m'] > 0
            e['c'] = '#%02x%02x%02x' % tuple(int(v) for v in a[p['y']:p['y'] + h, p['x']:p['x'] + w][m].mean(0))
        if p.get('garde'):
            e['garde'] = True
        liste.append(e)
    # falaise de la grotte : toutes ses pierres (arche comprise) passent devant Spirit tant qu'il est dans l'entrée
    # la falaise de la grotte reste peinte dans le décor : Spirit entre dans la grotte dès qu'il touche le seuil
    liste = [e for e in liste if not e.get('garde')]
    if apercus:
        v = sol.copy()
        for p in pieces:
            h, w = p['m'].shape
            col = (255, 60, 60) if p['t'] == 'r' else (255, 255, 0)
            reg = v[p['y']:p['y'] + h, p['x']:p['x'] + w]
            reg[p['m'] > 0] = (reg[p['m'] > 0] * 0.55 + np.array(col) * 0.45).astype(np.uint8)
        Image.fromarray(v).resize((1280, 720)).save(os.path.join(apercus, 'dec_' + nom + '.png'))
        Image.fromarray(sol).resize((1280, 720)).save(os.path.join(apercus, 'sol_' + nom + '.png'))
    return {'pieces': liste, 'pieds': pieds, 'eau': eau, 'zones': zones}


if __name__ == '__main__':
    ap = sys.argv[1] if len(sys.argv) > 1 else None
    res = {}
    for k, (src, _) in ECRANS.items():
        if 'plaine/' in src:
            res[k] = traiter(k, ap)
            print(k, 'rochers', sum(p['t'] == 'r' for p in res[k]['pieces']), 'touffes', sum(p['t'] == 'h' for p in res[k]['pieces']), 'zones', res[k]['zones'])
    json.dump({k: {'pieds': v['pieds'], 'eau': v['eau'], 'zones': v['zones']} for k, v in res.items()}, open(os.path.join(os.path.dirname(__file__), 'decoupes.json'), 'w'))
    with open(os.path.join(RACINE, 'jeu', 'js', 'decoupes.js'), 'w') as f:
        f.write('// Généré par outils/decoupes_plaine.py : rochers et touffes découpés dans les écrans peints\n')
        f.write("'use strict';\nSG.DECOUPES = " + json.dumps({k: v['pieces'] for k, v in res.items()}, separators=(',', ':')) + ';\n')
