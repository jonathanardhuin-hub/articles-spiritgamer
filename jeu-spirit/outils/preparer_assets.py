"""Prépare les images du jeu : redimensionne (2x la taille affichée), ferme la bouche de Spirit, exporte en WebP."""
import os, sys
from PIL import Image
sys.path.insert(0, os.path.dirname(__file__))
from bouche import fermer_bouche

RACINE = os.path.join(os.path.dirname(__file__), '..')
IMG = os.path.join(RACINE, 'images')
SORTIE = os.path.join(RACINE, 'jeu', 'assets')
ECHELLE = 2  # les images sont stockées en double résolution pour les écrans haute densité

# nom: (fichier source, 'h' ou 'w', taille affichée en pixels logiques, options)
LISTE = {
    # Spirit
    'spirit-face': ('spirit-v2/face.png', 'h', 112, ''),
    'spirit-face-g': ('spirit-v2/face-g.png', 'h', 110, ''),
    'spirit-face-d': ('spirit-v2/face-d.png', 'h', 110, ''),
    'spirit-dos': ('spirit-v2/dos.png', 'h', 112, ''),
    'spirit-dos-g': ('spirit-v2/dos-g.png', 'h', 110, ''),
    'spirit-dos-d': ('spirit-v2/dos-d.png', 'h', 110, ''),
    'spirit-profil': ('spirit-v2/profil.png', 'h', 112, ''),
    'spirit-profil-a': ('spirit-v2/profil-a.png', 'h', 107, ''),
    'spirit-profil-b': ('spirit-v2/profil-b.png', 'h', 107, ''),
    'spirit-attaque-face': ('spirit-v2/attaque-face.png', 'h', 110, ''),
    'spirit-attaque-dos': ('spirit-v2/attaque-dos.png', 'h', 110, ''),
    'spirit-attaque-profil': ('spirit-v2/attaque-profil.png', 'h', 110, ''),
    'spirit-brandit': ('spirit-v2/brandit.png', 'h', 128, ''),
    'portrait-spirit': ('spirit-v2/portrait.png', 'h', 200, ''),
    'portrait-spirit-parle': ('spirit-v2/portrait-parle.png', 'h', 200, ''),
    # Personnages
    'ermite': ('personnages/ermite.png', 'h', 150, ''),
    'portrait-ermite': ('personnages/ermite-portrait.png', 'h', 200, ''),
    # Objets
    'ampli': ('objets/ampli.png', 'w', 70, ''),
    # Décor de la Plaine
    'arbre': ('decor/plaine-arbre.png', 'w', 180, ''),
    'arbre-sombre': ('decor/plaine-arbre-sombre.png', 'w', 195, ''),
    'buisson': ('decor/plaine-buisson.png', 'w', 74, ''),
    'rocher': ('decor/plaine-rocher.png', 'w', 72, ''),
    'rocher-fissure': ('decor/plaine-rocher-fissure.png', 'w', 86, ''),
    'panneau': ('decor/plaine-panneau.png', 'w', 70, ''),
    'herbes': ('decor/plaine-hautes-herbes.png', 'w', 62, ''),
    'amas-rochers': ('decor/plaine-amas-rochers.png', 'w', 170, ''),
    'falaise-grotte': ('decor/plaine-falaise-grotte.png', 'w', 400, ''),
    # Monstres
    'gresille': ('ennemis/gresille.png', 'w', 72, ''),
    'cornu-face-g': ('ennemis/cornu-face-pas-gauche.png', 'h', 128, ''),
    'cornu-face-d': ('ennemis/cornu-face-pas-droit.png', 'h', 128, ''),
    'cornu-dos-g': ('ennemis/cornu-dos-pas-gauche.png', 'h', 128, ''),
    'cornu-dos-d': ('ennemis/cornu-dos-pas-droit.png', 'h', 128, ''),
    'cornu-profil': ('ennemis/cornu-profil-passage.png', 'h', 128, ''),
    'cornu-profil-a': ('ennemis/cornu-profil-foulee-a.png', 'h', 123, ''),
    'cornu-profil-b': ('ennemis/cornu-profil-foulee-b.png', 'h', 123, ''),
    'cp-face': ('ennemis/crache-pierres-face.png', 'w', 86, ''),
    'cp-face-g': ('ennemis/crache-pierres-face-pas-g.png', 'w', 86, ''),
    'cp-face-d': ('ennemis/crache-pierres-face-pas-d.png', 'w', 86, ''),
    'cp-dos': ('ennemis/crache-pierres-dos.png', 'w', 86, ''),
    'cp-dos-g': ('ennemis/crache-pierres-dos-pas-g.png', 'w', 86, ''),
    'cp-dos-d': ('ennemis/crache-pierres-dos-pas-d.png', 'w', 86, ''),
    'cp-profil': ('ennemis/crache-pierres-profil.png', 'w', 106, ''),
    'cp-profil-a': ('ennemis/crache-pierres-profil-foulee.png', 'w', 106, ''),
    # Objets à ramasser
    'coeur': ('objets/coeur.png', 'w', 40, ''),
    'coeur-or': ('objets/coeur-or.png', 'w', 70, ''),
    'fragment': ('objets/fragment.png', 'w', 44, ''),
    'pixel-bleu': ('objets/pixel-bleu.png', 'w', 30, ''),
    'pixel-rose': ('objets/pixel-rose.png', 'w', 38, ''),
    # Effets (fond noir : dessinés en mode lumière)
    'fx-fumee': ('effets/fumee.png', 'w', 150, ''),
    'fx-etincelle': ('effets/etincelle.webp', 'w', 90, ''),
    'fx-onde-proche': ('effets/onde-proche.webp', 'w', 150, ''),
    'fx-onde-loin': ('effets/onde-loin.webp', 'w', 140, ''),
    # Monstres du donjon 1 (provisoires, à redessiner)
    'popup': ('ennemis/popup.png', 'w', 70, ''),
    'spamling': ('ennemis/spamling.png', 'w', 62, ''),
    'clic': ('ennemis/clic.png', 'h', 72, ''),
    # Projectiles
    'lance': ('projectiles/lance.png', 'w', 112, ''),
    'pierre': ('projectiles/pierre.png', 'w', 34, ''),
    'pierre-eclat': ('projectiles/pierre-eclat.png', 'w', 90, ''),
    # Interface
    'ui-dialogue': ('interface/cadre-dialogue.png', 'w', 960, ''),
    'ui-portrait': ('interface/cadre-portrait.png', 'w', 540, ''),
    'ui-panneau': ('interface/panneau.png', 'w', 800, ''),
    'ui-bouton': ('interface/bouton.png', 'w', 840, ''),
    'ui-bouton-actif': ('interface/bouton-actif.png', 'w', 880, ''),
    'ui-parchemin': ('interface/parchemin.png', 'w', 810, ''),
    'logo': ('interface/logo.png', 'w', 780, ''),
}

# images du donjon 1 : prises en compte dès qu'elles sont déposées dans images/donjon1/
FACULTATIVES = {
    'popup': ('donjon1/popup.png', 'w', 76, ''),
    'spamling': ('donjon1/spamling.png', 'w', 64, ''),
    'clic': ('donjon1/clic.png', 'h', 76, ''),
    'clic-b': ('donjon1/clic-b.png', 'h', 76, ''),
    'reine': ('donjon1/reine.png', 'w', 250, ''),
    'bloc': ('donjon1/bloc.png', 'w', 80, ''),
    'statue': ('donjon1/statue.png', 'w', 76, ''),
    'brasero': ('donjon1/brasero.png', 'w', 64, ''),
    'pot': ('donjon1/pot.png', 'w', 56, ''),
    'coffre': ('donjon1/coffre.png', 'w', 78, ''),
    'coffre-ouvert': ('donjon1/coffre-ouvert.png', 'w', 78, ''),
    'cristal': ('donjon1/cristal.png', 'h', 96, ''),
    'cristal-actif': ('donjon1/cristal-actif.png', 'h', 96, ''),
    'entree-terrier': ('donjon1/entree-terrier.png', 'w', 560, ''),
    'manette': ('donjon1/manette.png', 'w', 70, ''),
    'cle': ('donjon1/cle.png', 'w', 60, ''),
    'cle-boss': ('donjon1/cle-boss.png', 'w', 70, ''),
    'carte-donjon': ('donjon1/carte-donjon.png', 'w', 70, ''),
    'boussole': ('donjon1/boussole.png', 'w', 64, ''),
    'source': ('donjon1/source.png', 'w', 64, ''),
    'flash': ('donjon1/flash.png', 'h', 120, ''),
    'flash-carnet': ('donjon1/flash-carnet.png', 'h', 120, ''),
    'portrait-flash': ('donjon1/portrait-flash.png', 'h', 200, ''),
}

def main():
    os.makedirs(SORTIE, exist_ok=True)
    for nom, info in FACULTATIVES.items():
        if os.path.exists(os.path.join(IMG, info[0])):
            LISTE[nom] = info
    for nom, (src, axe, taille, opt) in LISTE.items():
        im = Image.open(os.path.join(IMG, src)).convert('RGBA')
        if opt == 'bouche':
            im = fermer_bouche(im)
        elif opt == 'bouche-profil':
            im = fermer_bouche(im, profil=True)
        if src.startswith('effets/') and src.endswith('.webp'):
            # effet sur fond noir : le noir devient transparent (la luminosité donne l'opacité)
            import numpy as np
            a = np.array(im).astype(float)
            al = a[..., :3].max(axis=2) / 255.0
            al = np.clip((al - 0.06) / 0.94, 0, 1)
            rgb = np.where(al[..., None] > 0.01, a[..., :3] / np.maximum(al[..., None], 0.01), 0)
            im = Image.fromarray(np.dstack([rgb.clip(0, 255), al * 255]).astype('uint8'), 'RGBA')
        if nom == 'entree-terrier':
            # les côtés se fondent dans la lisière d'arbres, le bas se pose en douceur sur l'herbe
            import numpy as np
            a = np.array(im).astype(float)
            h, w = a.shape[:2]
            fx = np.clip(np.minimum(np.arange(w), w - 1 - np.arange(w)) / (w * 0.08), 0, 1)
            fy = np.ones(h); d = int(h * 0.9); fy[d:] = np.linspace(1, 0.2, h - d)
            a[..., 3] *= fx[None, :] * fy[:, None]
            im = Image.fromarray(a.astype('uint8'), 'RGBA')
        cible = taille * ECHELLE
        s = cible / (im.height if axe == 'h' else im.width)
        im = im.resize((max(1, round(im.width * s)), max(1, round(im.height * s))), Image.LANCZOS)
        im.save(os.path.join(SORTIE, nom + '.webp'), 'WEBP', quality=88, method=6)
    # textures de sol, répétées en mosaïque (256 pixels logiques)
    for n in ('herbe', 'terre', 'eau'):
        t = Image.open(os.path.join(IMG, 'sols', n + '.webp')).convert('RGB')
        t.resize((512, 512), Image.LANCZOS).save(os.path.join(SORTIE, 'sol-' + n + '.webp'), 'WEBP', quality=85, method=6)
    # cœur vide pour l'affichage de la vie
    c = Image.open(os.path.join(IMG, 'objets/coeur.png')).convert('RGBA')
    c = c.resize((80, round(c.height * 80 / c.width)), Image.LANCZOS)
    import numpy as np
    a = np.array(c).astype(float)
    a[..., :3] = a[..., :3] * 0.22 + np.array([40, 10, 20]) * 0.3
    Image.fromarray(a.clip(0, 255).astype('uint8')).save(os.path.join(SORTIE, 'coeur-vide.webp'), 'WEBP', quality=88)
    # illustration de l'écran titre
    t = Image.open(os.path.join(IMG, 'interface/titre-fond.webp')).convert('RGB')
    t.resize((1600, 900), Image.LANCZOS).save(os.path.join(SORTIE, 'titre-fond.webp'), 'WEBP', quality=85, method=6)
    # salle de donjon : image plein écran (facultative)
    sd = os.path.join(IMG, 'donjon1/salle-donjon.webp')
    if os.path.exists(sd):
        Image.open(sd).convert('RGB').resize((1600, 900), Image.LANCZOS).save(os.path.join(SORTIE, 'salle-donjon.webp'), 'WEBP', quality=85, method=6)
    # la grotte : image plein écran
    g = Image.open(os.path.join(IMG, 'decor/grotte-interieur.webp')).convert('RGB')
    g.resize((1600, 900), Image.LANCZOS).save(os.path.join(SORTIE, 'grotte.webp'), 'WEBP', quality=85, method=6)
    print('ok', len(LISTE) + 1, 'images')

if __name__ == '__main__':
    main()
