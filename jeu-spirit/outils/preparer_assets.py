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
    'spirit-face': ('spirit/spirit_face.png', 'h', 112, 'bouche'),
    'spirit-face-g': ('spirit/marche-face-pas-gauche.png', 'h', 110, 'bouche'),
    'spirit-face-d': ('spirit/marche-face-pas-droit.png', 'h', 110, 'bouche'),
    'spirit-dos': ('spirit/spirit_dos.png', 'h', 112, ''),
    'spirit-dos-g': ('spirit/marche-dos-pas-gauche.png', 'h', 110, ''),
    'spirit-dos-d': ('spirit/marche-dos-pas-droit.png', 'h', 110, ''),
    'spirit-profil': ('spirit/marche-profil-passage.png', 'h', 112, 'bouche-profil'),
    'spirit-profil-a': ('spirit/marche-profil-foulee-a.png', 'h', 107, 'bouche-profil'),
    'spirit-profil-b': ('spirit/marche-profil-foulee-b.png', 'h', 107, 'bouche-profil'),
    'spirit-attaque-face': ('spirit/attaque-face.png', 'h', 110, ''),
    'spirit-attaque-dos': ('spirit/attaque-dos.png', 'h', 110, ''),
    'spirit-attaque-profil': ('spirit/attaque-profil.png', 'h', 110, ''),
    'spirit-brandit': ('spirit/brandit-mains-vides.png', 'h', 130, ''),
    'portrait-spirit': ('spirit/portrait-bouche-fermee.png', 'h', 200, ''),
    'portrait-spirit-parle': ('spirit/portrait-bouche-ouverte.png', 'h', 200, ''),
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
}

def main():
    os.makedirs(SORTIE, exist_ok=True)
    for nom, (src, axe, taille, opt) in LISTE.items():
        im = Image.open(os.path.join(IMG, src)).convert('RGBA')
        if opt == 'bouche':
            im = fermer_bouche(im)
        elif opt == 'bouche-profil':
            im = fermer_bouche(im, profil=True)
        cible = taille * ECHELLE
        s = cible / (im.height if axe == 'h' else im.width)
        im = im.resize((max(1, round(im.width * s)), max(1, round(im.height * s))), Image.LANCZOS)
        im.save(os.path.join(SORTIE, nom + '.webp'), 'WEBP', quality=88, method=6)
    # la grotte : image plein écran
    g = Image.open(os.path.join(IMG, 'decor/grotte-interieur.webp')).convert('RGB')
    g.resize((1600, 900), Image.LANCZOS).save(os.path.join(SORTIE, 'grotte.webp'), 'WEBP', quality=85, method=6)
    print('ok', len(LISTE) + 1, 'images')

if __name__ == '__main__':
    main()
