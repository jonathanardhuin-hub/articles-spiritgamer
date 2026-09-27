// Outils de dessin en pixel art : tout est dessiné par le code, sans fichier image.
'use strict';

SG.Px = {
  // grille de pixels : null = transparent, sinon une couleur '#rrggbb'
  grille(w, h) { return { w, h, p: new Array(w * h).fill(null) }; },
  lire(g, x, y) { return x < 0 || y < 0 || x >= g.w || y >= g.h ? null : g.p[y * g.w + x]; },
  poser(g, x, y, c) { if (x >= 0 && y >= 0 && x < g.w && y < g.h) g.p[y * g.w + x] = c; },

  // dessin à la main : une chaîne par ligne, un caractère par pixel ('.' = transparent)
  texte(lignes, pal) {
    const h = lignes.length, w = Math.max(...lignes.map((l) => l.length));
    const g = this.grille(w, h);
    lignes.forEach((l, y) => { for (let x = 0; x < l.length; x++) { const c = pal[l[x]]; if (c) g.p[y * w + x] = c; } });
    return g;
  },

  // tramage ordonné 4 × 4, pour adoucir les passages de teinte sans bruit
  BAYER: [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5],
  seuil(x, y) { return (this.BAYER[(y & 3) * 4 + (x & 3)] + 0.5) / 16 - 0.5; },

  // boule éclairée d'en haut à gauche ; pal va du plus sombre au plus clair
  boule(g, cx, cy, rx, ry, pal, opts = {}) {
    const lx = -0.55, ly = -0.75, lz = 0.37, trame = opts.trame ?? 0.35, bord = opts.bord;
    for (let y = Math.floor(cy - ry - 1); y <= Math.ceil(cy + ry + 1); y++) {
      for (let x = Math.floor(cx - rx - 1); x <= Math.ceil(cx + rx + 1); x++) {
        const dx = (x + 0.5 - cx) / rx, dy = (y + 0.5 - cy) / ry, d2 = dx * dx + dy * dy;
        if (d2 > 1) continue;
        const nz = Math.sqrt(1 - d2);
        let l = (dx * lx + dy * ly + nz * lz) * 0.5 + 0.5;
        l = SG.clamp(l + this.seuil(x, y) * trame / pal.length * 2, 0, 0.999);
        let c = pal[Math.floor(l * pal.length)];
        if (bord && d2 > Math.pow(1 - 1.2 / Math.min(rx, ry), 2) && this.lire(g, x, y)) c = bord;
        this.poser(g, x, y, c);
      }
    }
  },

  rect(g, x, y, w, h, c) { for (let j = y; j < y + h; j++) for (let i = x; i < x + w; i++) this.poser(g, i, j, c); },

  // contour : chaque pixel vide qui touche un pixel plein prend la couleur du trait
  contour(g, c, diag) {
    const a = g.p.slice();
    for (let y = 0; y < g.h; y++) for (let x = 0; x < g.w; x++) {
      if (a[y * g.w + x]) continue;
      const v = (i, j) => i >= 0 && j >= 0 && i < g.w && j < g.h && a[j * g.w + i] && a[j * g.w + i] !== c;
      if (v(x - 1, y) || v(x + 1, y) || v(x, y - 1) || v(x, y + 1) || (diag && (v(x - 1, y - 1) || v(x + 1, y - 1) || v(x - 1, y + 1) || v(x + 1, y + 1)))) g.p[y * g.w + x] = c;
    }
    return g;
  },

  // colle une grille sur une autre
  coller(dst, src, ox, oy) { for (let y = 0; y < src.h; y++) for (let x = 0; x < src.w; x++) { const c = src.p[y * src.w + x]; if (c) this.poser(dst, ox + x, oy + y, c); } return dst; },

  miroir(g) { const m = this.grille(g.w, g.h); for (let y = 0; y < g.h; y++) for (let x = 0; x < g.w; x++) m.p[y * g.w + x] = g.p[y * g.w + (g.w - 1 - x)]; return m; },

  // recolore (par exemple le casque en or pour le Casque 2.0)
  recolorer(g, table) { const r = this.grille(g.w, g.h); r.p = g.p.map((c) => (c && table[c]) || c); return r; },

  // transforme une grille en canevas prêt à dessiner
  canevas(g) {
    const cv = document.createElement('canvas');
    cv.width = g.w; cv.height = g.h;
    const ctx = cv.getContext('2d'), im = ctx.createImageData(g.w, g.h);
    g.p.forEach((c, i) => {
      if (!c) return;
      const n = parseInt(c.slice(1), 16);
      im.data[i * 4] = n >> 16; im.data[i * 4 + 1] = (n >> 8) & 255; im.data[i * 4 + 2] = n & 255; im.data[i * 4 + 3] = 255;
    });
    ctx.putImageData(im, 0, 0);
    return cv;
  },

  // petit générateur pseudo-aléatoire stable (même dessin à chaque chargement)
  graine(s) { let v = s >>> 0 || 1; return () => { v ^= v << 13; v ^= v >>> 17; v ^= v << 5; return ((v >>> 0) % 10000) / 10000; }; },
};
