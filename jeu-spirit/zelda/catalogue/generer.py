# Génère le catalogue des prompts ChatGPT pour la version pixel art (façon A Link to the Past).
# python3 generer.py  →  catalogue-pixel.html
import base64, io, json, os, re
from PIL import Image

ICI = os.path.dirname(os.path.abspath(__file__))
IMAGES = os.path.join(ICI, '..', '..', 'images')
REFS_TOON = os.path.join(ICI, '..', '..', 'catalogue', 'refs')
ANCIENNES = json.load(open(os.path.join(ICI, 'anciennes-cartes.json'), encoding='utf8'))
ANC = {c['id']: c for c in ANCIENNES}

def propre(t):
    """retire les mentions de l'ancien style"""
    t = re.sub(r",? ?rendu toon HD[^,.;)]*", '', t)
    t = re.sub(r"\(pas de pixel art\)", '', t)
    t = t.replace('toon HD', 'pixel art').replace('  ', ' ')
    return t.strip()

def desc(id_, i=0):
    it = ANC[id_]['items'][i]
    return propre(it.split(' : ', 1)[1] if ' : ' in it else it)

# ---------------------------------------------------------------- morceaux de prompt communs
STYLE = ("Style : vrai pixel art 16 bits, comme Zelda A Link to the Past (Super Nintendo) et Zelda The Minish Cap (Game Boy Advance). "
         "Chaque pixel est un carré net et plein : aucun anticrénelage, aucun flou, aucun dégradé lisse, aucun effet de peinture, aucune ombre douce. "
         "Contour de 1 pixel très sombre (bleu nuit #1b1f3a, ou brun très sombre pour le décor) autour de chaque personnage et de chaque objet. "
         "Lumière qui vient d'en haut à gauche : chaque couleur a au plus 3 teintes (ombre, base, lumière). Palette limitée, couleurs franches et saturées comme sur Super Nintendo.")

def grille(cols, rangs, reel, fois, cadre='carré'):
    case = reel * fois
    larg, haut = cols * case, rangs * case
    return (f"Format {larg} × {haut} pixels. C'est une planche de sprites rangée sur une grille invisible de {cols} colonnes et {rangs} rangées de cases de {case} × {case} pixels "
            f"(aucun trait de grille dessiné). Chaque case contient un seul élément dessiné à {reel} × {reel} pixels réels puis agrandi exactement {fois} fois : "
            f"chaque pixel réel est un carré plein de {fois} × {fois} pixels, aligné sur le coin haut gauche de sa case. "
            "Fond uni magenta pur #FF00FF partout autour des éléments (couleur jamais utilisée dans les dessins). "
            "Aucun texte, aucun chiffre, aucun cadre, aucune ombre portée au sol. Chaque élément est entier, rien ne dépasse de sa case.")

ORDRE = "Les éléments sont rangés dans l'ordre de la liste, de gauche à droite puis de haut en bas (case 1 en haut à gauche). Une case marquée « vide » reste entièrement magenta."

SPIRIT = ("Le personnage est Spirit, la mascotte des images jointes, traduite en pixel art. Couleurs exactes : "
          "corps et tête blancs (#ffffff, ombre #c9d3e6, ombre profonde #8f9bb8) ; casque-micro noir #23273a avec un liseré bleu #2f4fa0 et des touches cyan #35d6ff ; "
          "grands yeux bleus #1c56c8 avec un reflet blanc ; tee-shirt bleu #2f72e6 (ombre #1f50b4) avec un petit logo cyan sur la poitrine ; "
          "short bleu foncé #1b3c8c avec une bande cyan ; baskets bleues #2f72e6 à semelle blanche.\n\n"
          "PROPORTIONS, identiques dans toutes les cases (c'est le point le plus important) :\n"
          "– Spirit mesure 26 pixels réels de haut et 18 de large, centré dans sa case de 32 × 32, les pieds toujours sur la même ligne, 2 pixels au-dessus du bas de la case.\n"
          "– La tête est une boule parfaitement ronde de 16 × 16 pixels réels. Elle garde exactement la même taille et la même rondeur de face, de dos et de profil : "
          "jamais carrée, jamais ovale, jamais aplatie ni allongée. De profil, la tête n'est pas plus étroite qu'à la face : c'est la même boule vue de côté.\n"
          "– Sous la tête, un petit corps : tee-shirt de 8 pixels de large sur 5 de haut, petits bras blancs de 2 pixels, short de 2 pixels, jambes blanches de 2 pixels, baskets de 2 pixels. La tête fait environ 60 % de la hauteur (style chibi).\n"
          "– Casque : un arceau de 2 pixels posé sur le haut de la tête ; de face et de dos, un écouteur rond de 5 × 6 pixels de chaque côté de la tête, à hauteur des yeux, avec un point cyan ; "
          "de profil, un seul écouteur au milieu de la tête ; une fine tige de micro noire descend de l'écouteur gauche vers la bouche.\n"
          "– Yeux : 3 × 4 pixels chacun, bleus avec 1 pixel de reflet blanc en haut ; de profil, un seul œil, près du bord avant de la tête. Petite bouche de 2 pixels.\n"
          "Vues strictes : « de face » = tourné vers nous ; « de dos » = on ne voit pas le visage ; « de profil » = tourné vers la droite. Jamais de trois quarts.")

VUES = "Vues strictes : « de face » = tourné vers nous ; « de dos » = on ne voit pas son visage ; « de profil » = tourné vers la droite. Jamais de trois quarts. Même taille et mêmes proportions dans toutes les cases."
DESSUS = "Vue de dessus comme dans Zelda A Link to the Past : le sol est vu exactement d'en haut ; les objets, arbres, murs et personnages sont vus d'en haut avec leur face avant visible, jamais de biais."
MONSTRE = "Créature du Bruit : menaçante mais lisible, jamais gore, jamais de sang. Matière sombre parcourue de fissures violettes lumineuses (#c060ff) et yeux jaunes brillants (#ffd23a), sauf si la description dit autre chose."
SUITE_VERIF = ("Vérifie la planche : même taille et mêmes proportions dans toutes les cases, pixels carrés nets sans flou ni anticrénelage, fond magenta pur partout, rien ne déborde des cases, "
               "l'ordre des cases est bien celui de la liste. Refais la planche en corrigeant uniquement ce qui ne respecte pas ces règles, sans rien changer au dessin qui est bon.")

cartes = []
num = {}
def carte(etape, cat, titre, pourquoi, refs, prompt_elements, elements, suites=None, maintenant=False):
    code = {'sp': 'SP', 'pro': 'PRO', 'pl': 'PL', 'd1': 'D1', 'qg': 'QG', 'r2': 'R2', 'r3': 'R3', 'r4': 'R4', 'r5': 'R5', 'r6': 'R6', 'r7': 'R7', 'r8': 'R8', 'fin': 'FIN'}[etape]
    num[code] = num.get(code, 0) + 1
    liste = '\n'.join(f"{i + 1}) {e}" for i, e in enumerate(elements))
    prompts = [f"{prompt_elements}\n\n{ORDRE}\n\n{liste}", SUITE_VERIF] + (suites or [])
    cartes.append({'id': f"{code}-{num[code]:02d}", 'e': etape, 'cat': cat, 't': titre, 'p': pourquoi, 'r': refs,
                   'pr': prompts, 'it': ['La planche (toutes les cases de la liste)'] + [f'Étape {k + 3}' for k in range(len(suites or []))], 'n': 1 + len(suites or []), 'neuf': maintenant, 'st': bool(suites)})

def entete(n_images=1):
    return "Crée 1 image, seule dans son fichier." if n_images == 1 else f"Crée {n_images} images, une par une."

# ================================================================ SPIRIT
REFS_SPIRIT = ['spirit-officiel', 'spirit-face', 'spirit-dos', 'spirit-profil']
carte('sp', 'perso', 'Spirit : toutes ses poses de jeu (grande planche)',
      "La planche de référence de tout le jeu : ses proportions servent pour tout le reste. Une seule grande image de 24 poses, dans une nouvelle conversation. Joins les 4 images de Spirit. Si la tête change de forme d'une case à l'autre, fais l'étape 2 (vérification) dans la même conversation.",
      REFS_SPIRIT,
      f"{entete()}\n\n{grille(6, 4, 32, 8)}\n\n{STYLE}\n\n{SPIRIT}",
      ['de face, immobile, bras le long du corps', 'de face, marche : pied gauche en avant, bras droit en avant', 'de face, marche : pied droit en avant, bras gauche en avant',
       'de dos, immobile', 'de dos, marche : pied gauche en avant', 'de dos, marche : pied droit en avant',
       'de profil, immobile', 'de profil, marche : jambe avant tendue, jambe arrière pliée', 'de profil, marche : jambes croisées sous le corps (pas de passage)',
       "de face, il crie dans son micro pour lancer l'onde : bouche grande ouverte, penché en avant, mains serrées", "de dos, même cri : penché vers le fond", "de profil, même cri : bouche ouverte vers la droite, penché en avant",
       'de face, il pousse un bloc : bras tendus devant lui, penché vers nous', 'de dos, il pousse : bras tendus vers le fond', 'de profil, il pousse : bras tendus vers la droite, jambe arrière tendue',
       "de face, il brandit un objet au-dessus de sa tête à deux mains (l'objet n'est pas dessiné, mains vides levées), air fier", "de face, il prend un coup : recule, yeux plissés, bras écartés", "de face, il tombe : bras levés, jambes repliées",
       'assis par terre, KO, yeux en spirale, casque de travers', 'un genou au sol, il se relève, main sur le casque, air déterminé', "endormi assis, tête penchée sur le côté, yeux fermés, un petit « z » bleu au-dessus (le seul signe autorisé)",
       "debout, il s'étire, bras levés, yeux fermés, bouche ouverte (bâillement)", "aspiré par un vortex : vu de face, bras et jambes écartés, yeux en panique", "il atterrit : un genou au sol, une main posée au sol, vu de face"],
      maintenant=True)
carte('sp', 'perso', 'Spirit : portraits des dialogues',
      "Les grands portraits affichés à côté du texte. Ici les lettres SG du casque doivent être lisibles. Fais-la après la grande planche, dans la même conversation ou en joignant ta planche validée.",
      REFS_SPIRIT + ['@SP-01'],
      f"{entete()}\n\n{grille(3, 2, 64, 8)}\n\n{STYLE}\n\n{SPIRIT}\n\nCes six cases sont des portraits : la tête et le haut du tee-shirt de Spirit, de face, cadrés en buste, dessinés à 64 × 64 pixels réels (la tête fait 44 pixels de large, bien ronde). À cette taille, les lettres SG en cyan sont lisibles sur la face extérieure de chaque écouteur, et le logo SG cyan sur le tee-shirt.",
      ['neutre, petit sourire', 'il parle : bouche ouverte', 'étonné : yeux grands ouverts, petite bouche ronde', 'déterminé : sourcils froncés, sourire en coin', 'inquiet : sourcils relevés au centre, bouche serrée', 'content : grand sourire, yeux plissés de joie'],
      maintenant=True)

# ================================================================ décor et personnages communs
REF_STYLE = ['@SP-01']
def planche_decor(etape, titre, pourquoi, elements, refs=None, reel=32, fois=8, cols=6, rangs=4, extra=''):
    carte(etape, 'decors', titre, pourquoi, (refs or []) + REF_STYLE,
          f"{entete()}\n\n{grille(cols, rangs, reel, fois)}\n\n{STYLE}\n\n{DESSUS}\n\nMême pixel art et même taille de pixel que la planche de Spirit jointe : un élément de 1 case fait la taille d'une tuile de sol de 16 × 16 pixels réels agrandie, et Spirit fait 26 pixels de haut à côté.{extra}",
          elements)

def sols(etape, titre, sol, chemin, liquide, falaise, entree, extra_elements=None, refs=None):
    elements = [f"{sol}, tuile de base qui se répète sans raccord visible", f"{sol}, variante avec quelques détails", f"{sol}, deuxième variante",
                f"{sol}, variante avec de petites fleurs ou petits détails colorés",
                f"{chemin}, tuile de base qui se répète sans raccord", f"{chemin}, variante",
                f"{liquide}, tuile qui se répète (image 1 de l'animation)", f"{liquide}, même tuile avec les reflets décalés (image 2)", f"{liquide}, image 3",
                f"bord haut gauche d'une zone de {chemin} entourée de {sol}", f"bord haut d'une zone de {chemin}", f"bord haut droit d'une zone de {chemin}",
                f"bord gauche d'une zone de {chemin}", f"bord droit d'une zone de {chemin}", f"bord bas gauche d'une zone de {chemin}",
                f"bord bas d'une zone de {chemin}", f"bord bas droit d'une zone de {chemin}", f"coin intérieur haut gauche : {chemin} partout sauf un petit coin de {sol} en haut à gauche",
                f"coin intérieur haut droit", f"coin intérieur bas gauche", f"coin intérieur bas droit",
                f"berge haut gauche d'une étendue de {liquide} entourée de {sol}", f"berge haute", f"berge haut droite",
                f"berge gauche", f"berge droite", f"berge bas gauche", f"berge basse", f"berge bas droite",
                f"coin intérieur de berge haut gauche", "coin intérieur de berge haut droit", "coin intérieur de berge bas gauche", "coin intérieur de berge bas droit",
                f"{falaise} : haut de falaise, bord gauche", f"{falaise} : haut de falaise, bord du milieu", f"{falaise} : haut de falaise, bord droit",
                f"{falaise} : paroi, côté gauche", f"{falaise} : paroi, milieu", f"{falaise} : paroi, côté droit",
                f"{falaise} : pied de paroi, gauche", f"{falaise} : pied de paroi, milieu", f"{falaise} : pied de paroi, droit",
                f"{entree} : moitié haut gauche (l'entrée fait 2 × 2 tuiles, creusée dans la paroi)", f"{entree} : moitié haut droite", f"{entree} : moitié bas gauche, avec l'ouverture sombre", f"{entree} : moitié bas droite",
                "des marches d'escalier, vues de dessus"] + (extra_elements or [])
    carte(etape, 'tuiles', titre,
          "Les tuiles de sol de 16 × 16 pixels : je construis tous les écrans avec. Les bords s'emboîtent : garde toute la planche dans la même conversation.",
          (refs or []) + REF_STYLE,
          f"{entete()}\n\n{grille(12, 8, 16, 8)}\n\n{STYLE}\n\n{DESSUS}\n\nTuiles de sol : chaque tuile de 16 × 16 pixels réels se raccorde sans couture à ses voisines de la même série (mêmes couleurs aux bords). Les bords et coins forment des morceaux qui s'emboîtent comme un puzzle : le côté {sol} de chaque bord a exactement le même dessin que la tuile de {sol}.",
          elements)

def monstre(etape, nom, description, mode='marche', projectile=None, refs=None, taille=32):
    pas = (('ailes levées', 'ailes baissées') if mode == 'vol' else ('étiré vers le haut', 'tassé vers le bas') if mode == 'flotte' else ('pied gauche en avant', 'pied droit en avant'))
    el = [f"de face, immobile", f"de face, {pas[0]}", f"de face, {pas[1]}", "de dos, immobile", f"de dos, {pas[0]}", f"de dos, {pas[1]}",
          "de profil, immobile", f"de profil, {pas[0]}", f"de profil, {pas[1]}", "de face, il attaque", "de profil, il attaque", "de face, touché : recule, yeux plissés"]
    if projectile:
        el += [f"son projectile en vol : {projectile}", "le même projectile, deuxième image du vol", "le projectile qui éclate à l'impact", "vide", "vide", "vide"]
    el += ["il disparaît : il éclate en petits carrés violets et en fumée (image 1)", "image 2 de la disparition, plus éclatée", "image 3, presque rien", "vide", "vide", "vide"]
    el += ['vide'] * (24 - len(el))
    carte(etape, 'ennemis', nom, f"Toutes les images de ce monstre sur une seule planche.", (refs or []) + REF_STYLE,
          f"{entete()}\n\n{grille(6, 4, taille, 8 if taille == 32 else 4)}\n\n{STYLE}\n\n{DESSUS}\n\n{MONSTRE}\n\nLe monstre : {description}\n\nIl est à la même échelle que Spirit sur la planche jointe (Spirit fait 26 pixels de haut). {VUES}",
          el)

def boss(etape, nom, description, projectile, refs=None, deuxieme=None):
    el = ["de face, immobile et menaçant", "de face, il attaque", "de face, étourdi : tête basse, yeux qui clignotent, fissures qui s'éteignent", "de face, touché : il recule, tout blanc (image de flash)",
          f"son projectile : {projectile}", deuxieme or "il est vaincu : il se désagrège en carrés violets et en fumée"]
    carte(etape, 'boss', nom, "Le boss sur une planche de 6 grandes cases.", (refs or []) + REF_STYLE,
          f"{entete()}\n\n{grille(3, 2, 64, 8)}\n\n{STYLE}\n\n{DESSUS}\n\n{MONSTRE}\n\nLe boss : {description}\n\nIl est grand : 60 pixels réels de haut, plus de deux fois Spirit (26 pixels).",
          el)

def pnj(etape, titre, persos, refs=None):
    el = []
    for nom, d, action in persos:
        el += [f"{nom} ({d}) de face, immobile", f"{nom} de face, pied gauche en avant", f"{nom} de face, pied droit en avant", f"{nom} de dos", f"{nom} de profil", f"{nom} de face : {action}"]
    el += ['vide'] * (24 - len(el))
    carte(etape, 'pnj', titre, "Les personnages qui marchent et parlent. Une rangée par personnage.", (refs or []) + REF_STYLE,
          f"{entete()}\n\n{grille(6, 4, 32, 8)}\n\n{STYLE}\n\n{DESSUS}\n\nPersonnages inventés (animaux qui se tiennent debout), sympathiques, à la même échelle et dans les mêmes proportions chibi que Spirit sur la planche jointe : grosse tête, petit corps, environ 26 pixels réels de haut. {VUES}",
          el)
    portraits = []
    for nom, d, action in persos[:3]:
        portraits += [f"portrait de {nom} : buste et tête de face, expression neutre", f"portrait de {nom} : il parle, bouche ouverte, expression vive"]
    portraits += ['vide'] * (6 - len(portraits))
    carte(etape, 'pnj', titre + ' : portraits', "Les portraits affichés à côté du texte des dialogues.", (refs or []) + ['@SP-02'],
          f"{entete()}\n\n{grille(3, 2, 64, 8)}\n\n{STYLE}\n\nPortraits cadrés en buste, de face, dessinés à 64 × 64 pixels réels, même style et même cadrage que les portraits de Spirit joints.",
          portraits)

def objets(etape, titre, pourquoi, elements, refs=None):
    elements = elements + ['vide'] * (24 - len(elements)) if len(elements) <= 24 else elements
    carte(etape, 'objets', titre, pourquoi, (refs or []) + REF_STYLE,
          f"{entete()}\n\n{grille(6, 4, 32, 8)}\n\n{STYLE}\n\nObjets et effets vus de face ou de dessus comme dans Zelda A Link to the Past, chacun centré dans sa case. Un objet que Spirit tient ou ramasse fait environ 12 à 16 pixels réels, à la même échelle que Spirit sur la planche jointe (26 pixels de haut).",
          elements)

def poses_spirit(etape, titre, pose, effet=None):
    el = [f"de face : {pose}", f"de dos : {pose}", f"de profil : {pose}"] + ([f"{effet}, image 1", f"{effet}, image 2", f"{effet}, image 3"] if effet else ['vide'] * 3)
    carte(etape, 'perso', titre, "Spirit qui utilise cet objet. Joins ta planche de Spirit validée pour garder exactement ses proportions.", REFS_SPIRIT[:1] + ['@SP-01'],
          f"{entete()}\n\n{grille(3, 2, 32, 16)}\n\n{STYLE}\n\n{SPIRIT}\n\nMêmes proportions exactes que sur la planche de Spirit jointe : copie sa tête, son corps et son casque, seule la pose change.",
          el)

# ================================================================ PROLOGUE (QG, la nuit)
sols('pro', 'Intérieur du QG : sols, murs et portes',
     'parquet clair', 'tapis bleu nuit à motif discret', 'reflet de lumière sur le parquet', 'mur en gros blocs de pierre gris-bleu', 'double porte vitrée',
     ['mur du haut en gros blocs de pierre gris-bleu avec une applique carrée en verre dépoli qui diffuse une lumière chaude (2 tuiles de haut : cette case est le haut)', 'le bas du même mur', 'coin de mur haut gauche', 'coin de mur haut droit',
      'double porte en bois foncé à panneaux de verre dépoli, fermée, vue de face dans le mur du haut (partie gauche)', 'même double porte fermée (partie droite)', 'même double porte ouverte : les deux battants repliés contre l\'encadrement (partie gauche)', 'même double porte ouverte (partie droite)'])
planche_decor('pro', 'Ta loge : les meubles', "Les meubles de ta loge, posés sur le sol par le jeu. Joins aussi tes photos de bureau pour les détails.",
              ['un long bureau noir vu de dessus avec trois écrans éteints (occupe toute la case)', 'le même bureau, écrans allumés : un jeu en pause à gauche, un tchat au milieu, le logo SG en veille sur l\'écran incurvé de droite',
               'le même bureau, les trois écrans envahis par une pub rouge et violette avec un visage jaune souriant', 'le même bureau, l\'écran de droite brouillé de parasites, logo SG déformé',
               'un fauteuil gamer bordeaux et beige vu de dessus', 'une bibliothèque en bois clair pleine de figurines (chouette blanche, petites créatures, château de sorciers en briques), vue de face',
               'une deuxième bibliothèque, livres et figurines à grosse tête', 'un petit bureau noir encombré (lampe, présentoirs, post-it)', 'une bouteille de soda posée sur le bureau (objet seul, petite)',
               'un balai de sorcier qui flotte (objet seul)', 'un paillasson noir', 'le vortex dans l\'encadrement de la porte : tourbillon bleu, cyan et blanc (image 1)', 'vortex, image 2', 'vortex, image 3'],
              refs=['loge'])
planche_decor('pro', 'Le couloir, le bureau de Mika et le hall : meubles', "Les meubles des autres pièces du QG.",
              ['bureau de Mika : un bureau en bois avec deux écrans affichant un jeu en ligne figé', 'le même bureau, écrans envahis par la pub du Roi', 'une grande bibliothèque pleine de livres', 'une vitrine de figurines',
               'un fauteuil de bureau noir', 'un tapis rond', 'hall : un long comptoir d\'accueil blanc et bleu nuit', 'un écran noir avec le logo SpiritGamer', 'une plante verte en pot', 'un bureau de rédaction avec ordinateur',
               'les grandes portes du QG, fermées (partie gauche)', 'les grandes portes du QG, fermées (partie droite)', 'un cadre de jeu vidéo au mur (image sans texte)', 'une fontaine à eau'],
              refs=['hall', 'bureau-mika'])
pnj('pro', 'Mika et Gus', [('Mika', "un lynx à lunettes, barbe, tee-shirt gris, jean, qui porte des livres ; il se prend pour le boss", 'bras croisés, air de chef'),
                           ('Gus', 'un vieux blaireau à lunettes rondes, barbe blanche, gilet marron, cravate rouge, une tasse à la main', 'il boit son café')],
    refs=['p-mika', 'p-gus'])
carte('pro', 'interface', "Les images de l'introduction", "Les 6 tableaux de l'histoire du début, en pixel art. Une nouvelle conversation, les 6 images une par une.", ['titre', 'roi'] + REF_STYLE,
      f"{entete(6)}\n\nChaque image : format 1536 × 1024 pixels, une scène en pixel art de 256 × 170 pixels réels agrandie exactement 6 fois (chaque pixel réel est un carré net de 6 × 6). {STYLE} Aucun texte. Scène vue de face ou de dessus comme les cinématiques de Zelda A Link to the Past. Le Roi Clickbait n'est pas un humain : un monstre fait d'écrans et de fenêtres pub empilés, tête en écran noir, yeux jaunes en amande, grand sourire jaune, cornes, couronne à pointes avec des cristaux violets.",
      ['La fête des 11 ans : la grande place devant le QG, la nuit, guirlandes bleues, écrans géants, une foule de petits personnages animaux qui dansent, au centre une sphère de lumière blanche et cyan (la Source) au-dessus d\'une fontaine.',
       'L\'irruption : une fenêtre publicitaire géante s\'ouvre dans le ciel et le Roi Clickbait en sort. La foule recule.',
       'La Source brisée : la sphère éclate en huit fragments lumineux qui partent dans huit directions.',
       'Le Bruit prend corps : la place déserte, des monstres sombres aux fissures violettes et aux yeux jaunes sortent des écrans cassés.',
       'Pendant ce temps, dans sa loge : Spirit dort dans son fauteuil devant ses écrans, casque sur les oreilles.',
       'Le réveil : Spirit se redresse dans son fauteuil, la main sur le casque, l\'air étonné.'])

# ================================================================ PLAINE
sols('pl', 'Plaine : tuiles de sol', "herbe verte vive", "chemin de terre beige", "eau bleue claire", "falaise de terre et de roche brune", "entrée de grotte",
     ['herbe avec de petites fleurs blanches', 'herbe avec de petites fleurs jaunes'])
planche_decor('pl', 'Plaine : décor posé', "Arbres, buissons, rochers : tout ce qui est posé sur l'herbe. Chaque élément qu'on coupe a sa version coupée.",
              ['un grand arbre rond au feuillage en grappes, tronc brun (il occupe toute la case, 2 × 2 tuiles)', 'un deuxième arbre, plus sombre', 'un buisson vert vif rond (on le coupe)', 'le même buisson coupé : petite base rase, jamais un moignon',
               'une touffe de hautes herbes (on la coupe)', 'les mêmes hautes herbes coupées : herbe rase', 'un rocher gris', 'un rocher gris fissuré (fissure bien visible)', 'un amas de deux rochers', 'un panneau de bois, sans texte',
               "l'entrée de la grotte de l'ermite : amas de rochers gris avec une ouverture sombre (occupe toute la case)", "l'entrée du Terrier des Pop-ups : même amas de rochers mais sombre, fissures violettes, ouverture violette",
               'la barrière de Bruit fermée : un mur d\'énergie violet et rouge fait de fenêtres pub brisées entre deux bornes de pierre (toute la case)', 'la même barrière qui se dissipe en carrés lumineux',
               'reflet qui scintille sur l\'eau (petites étincelles blanches), image 1', 'reflet, image 2', 'ronds dans l\'eau, image 1', 'ronds dans l\'eau, image 2',
               'le sol qui se fend quand un monstre sort de terre, image 1', 'image 2 : mottes de terre qui sautent', 'le trou qui reste', 'le trou qui se referme'])
monstre('pl', 'Crache-pierres', "une bête de pierre sombre à quatre pattes trapues, dos en blocs de roche, une grosse bouche-canon ronde au milieu du visage, yeux jaunes, fissures violettes. Il crache des cailloux.", 'marche', "un caillou gris sombre fissuré de violet", refs=['m-crache'])
monstre('pl', 'Cornu', "un guerrier trapu au corps de pierre sombre fissurée de violet, masque d'os de taureau aux grandes cornes, armure de cuir rouillée, une lance à la main. Il lance sa lance.", 'marche', "une lance qui file, pointe en avant", refs=['m-cornu'])
monstre('pl', 'Grésille', "une petite flaque de bruit noir-bleu qui se désagrège en pixels violets, deux yeux violets lumineux. Elle glisse et bondit.", 'flotte', refs=['m-gresille'])
pnj('pl', "L'ermite", [("l'ermite", "un vieil ermite sous une grande cape grise à capuche, yeux bleus lumineux dans l'ombre, longue barbe blanche, bâton de bois surmonté d'une pierre bleue", 'il lève son bâton')], refs=['ermite'])
planche_decor('pl', "La grotte de l'ermite : intérieur", "Les tuiles de l'intérieur de la grotte.",
              ['sol de terre battue de la grotte (se répète)', 'variante du sol', 'mur de roche sombre vu de dessus (se répète)', 'paroi de roche vue de face (bas du mur)', 'coin de mur haut gauche', 'coin de mur haut droit',
               'feu de camp, image 1', 'feu de camp, image 2', 'feu de camp, image 3', 'une caisse en bois', 'un tonneau', 'une natte au sol'], reel=16, fois=16)

# ================================================================ OBJETS, INTERFACE ET EFFETS COMMUNS
objets('pl', 'Objets, cœurs, Pixels et interface', "Tout ce qui s'affiche dans le bandeau du haut et ce qu'on ramasse.",
       ['un cœur plein rouge', 'un demi-cœur', 'un cœur vide (contour)', 'un Pixel bleu : petit cristal carré bleu (monnaie, vaut 1)', 'un Pixel rose (vaut 5)', 'un Pixel doré (vaut 20)',
        "l'Ampli : petit boîtier bleu nuit à grille cyan qui se branche sur le casque", 'la Manette Retour : manette de jeu bleue', 'un fragment de cœur (un quart de cœur)', 'un réceptacle de cœur (grand cœur doré)', 'une petite clé', 'la grande clé du boss',
        'la carte du donjon (parchemin roulé)', 'la boussole', 'une fiole de soin rouge', 'une fiole vide', 'le Pare-feu : bracelet bleu nuit à bande cyan', 'le bouclier d\'énergie en hexagones cyan, vu de face',
        "l'onde sonore de l'Ampli vue de dessus, image 1 : trois arcs cyan qui partent vers la droite", "l'onde, image 2, plus large", "l'onde, image 3, qui s'estompe", 'petite étincelle blanche (coup qui touche)', 'feuilles coupées qui volent', 'nuage de fumée quand un monstre disparaît'])

# ================================================================ DONJON 1 : Terrier des Pop-ups
def donjon(etape, nom, theme, lumiere, meca, objets_donjon):
    sols(etape, f'{nom} : sols et murs', f'dalles de pierre du donjon ({theme})', 'sol plus clair d\'un couloir', 'trou sans fond (vide noir)', f'mur épais du donjon ({theme})', 'porte du donjon')
    planche_decor(etape, f'{nom} : portes', "Chaque porte dans tous ses états. La porte est dessinée dans l'épaisseur du mur, comme un tunnel.",
                  [f"porte du mur du haut, {s}" for s in ('ouverte', 'fermée par une grille', 'verrouillée par une serrure dorée', 'porte du boss, ornée et menaçante', 'murée (mur plein)', 'fissurée (on peut la faire sauter)')] +
                  [f"porte du mur du bas, {s}" for s in ('ouverte', 'fermée par une grille', 'verrouillée', 'porte du boss', 'murée', 'fissurée')] +
                  [f"porte du mur de gauche, {s}" for s in ('ouverte', 'fermée par une grille', 'verrouillée', 'porte du boss', 'murée', 'fissurée')] +
                  [f"porte du mur de droite, {s}" for s in ('ouverte', 'fermée par une grille', 'verrouillée', 'porte du boss', 'murée', 'fissurée')],
                  extra=f" Thème : {theme}. Une porte fait 2 tuiles de large (toute la case).")
    planche_decor(etape, f'{nom} : objets et mécanismes', "Tout ce qui est posé dans les salles, à la même échelle.",
                  ['un bloc à pousser, même pierre que les murs', 'une statue gardienne sur socle (toutes les statues sont identiques, même celle qu\'on peut pousser)', f'{lumiere}, éteinte', f'{lumiere}, allumée, image 1', f'{lumiere}, allumée, image 2',
                   'un pot fermé', 'le pot qui se brise', 'un coffre fermé', 'le même coffre ouvert, vide', 'un grand coffre (celui de l\'objet du donjon), fermé', 'le grand coffre ouvert',
                   'une plaque de pression au sol', 'la même plaque enfoncée', 'un cristal éteint sur socle (il réagit à la Manette)', 'le même cristal allumé', 'un escalier qui descend', 'une échelle', 'le socle de l\'objet'] + [propre(m) for m in meca][:6],
                  extra=f" Thème : {theme}.")
    for o in objets_donjon: pass

donjon('d1', 'Terrier des Pop-ups', 'pierre sombre bleu-violet fissurée de violet, technologie maléfique, câbles', 'un brasero de pierre sombre',
       [desc('D1-10', i) for i in range(len(ANC['D1-10']['items']))], [])
monstre('d1', 'Pop-up', "une fenêtre de navigateur corrompue qui flotte : barre de titre rouge sombre avec un bouton X, écran noir parcouru de fissures violettes, deux yeux jaunes méchants, le bas qui s'effiloche en éclats violets. Elle crache des bulles de notification.", 'flotte', 'une bulle de notification rouge sombre entourée d\'un anneau violet', refs=['m-popup'])
monstre('d1', 'Clic', "un curseur de souris vivant en pierre noire fissurée de violet, deux yeux jaunes, petits bras et jambes pointus. Il fonce en ligne droite.", 'marche', refs=['m-clic'])
monstre('d1', 'Spamling', "une enveloppe noircie et abîmée qui marche sur des pattes griffues, un œil violet sur le sceau du rabat. Elle bondit.", 'marche', refs=['m-spamling'])
monstre('d1', 'Ping (chauve-souris)', "une petite chauve-souris de pierre sombre, ailes de membrane, fissures violettes, deux yeux jaunes, une antenne wifi cassée sur la tête. Elle vole par à-coups.", 'vol')
boss('d1', 'La Reine Pop-up', "une immense fenêtre pub au grand œil violet central, couronne de cristaux violets, entourée de petites fenêtres pub qui flottent, tentacules d'éclats violets en dessous.", "une petite fenêtre pub qui file en tournant", refs=['m-reine'])
pnj('d1', 'Flash, le premier Gardien', [('Flash', "un hibou reporter, plumage brun et crème, lunettes rondes, écharpe, un carnet de reporter ; deux ailes bien distinctes", 'il écrit dans son carnet')])
poses_spirit('d1', 'Spirit lance la Manette', 'bras tendu, il vient de lancer la Manette (non dessinée)', 'la Manette qui tourne en vol')
objets('d1', 'Objets du Terrier', "Les objets du premier donjon.", ['le Mégaphone : mégaphone de reporter noir et bleu', "l'onde du Mégaphone, image 1", "l'onde du Mégaphone, image 2", 'une page du carnet de Flash (papier crème)', 'le fragment de la Source : un éclat de lumière blanche et cyan', 'le fragment qui brille, image 2'])

# ================================================================ PARVIS DU QG
sols('qg', 'Parvis du QG : sols', 'pavés gris-bleu de la place', 'dalles claires de la rue', 'eau de la fontaine', 'façade de bâtiment en pierre', 'porte de boutique')
planche_decor('qg', 'Parvis : décor', "Les éléments de la place et de la rue des boutiques.",
              ['la fontaine de la place (toute la case)', 'un lampadaire', 'un banc', 'une guirlande de fête', 'un écran géant éteint', 'une boutique : vitrine et auvent bleu', 'la boutique de Mona : étal de fruits', 'un pot de fleurs', 'une poubelle', 'la porte de la ville, fermée', 'la porte de la ville, ouverte', 'un arbre de ville en pot'])
pnj('qg', 'Mona et Lila', [('Mona', 'une chatte rousse, bandana bleu, tablier bleu, panier de fruits, la marchande', 'elle tend un fruit'),
                            ('Lila', 'une petite lapine aux longues oreilles, nœud bleu, sweat bleu, baskets bleues, une console à la main', 'elle joue à sa console')],
    refs=['p-mona', 'p-lila'])
objets('qg', 'Boutique de Mona', "Les objets en vente.", ['une boisson (fiole bleue)', 'une petite bourse', 'une grande bourse', 'le Pare-feu Pro : bracelet doré à bande cyan', 'un pétard confettis', 'une carte du Réseau roulée'])

# ================================================================ RÉGIONS 2 À 8
REGIONS = [
    ('r2', 'Forêt des Forums', 'Labyrinthe des Fils', 'mousse et herbe sombre de forêt', 'sentier de terre et de racines', 'eau sombre de ruisseau', 'falaise de roche moussue', 'entrée du donjon dans un tronc géant', 'pierre moussue et câbles tressés', 'une lanterne à câble suspendue'),
    ('r3', 'Monts Hardware', 'Forge Surchauffée', 'roche grise et métal rouillé', 'chemin de gravier', 'lave orange', 'falaise de roche et de plaques de métal', 'entrée de mine', 'fonte noire et cuivre, grilles rougeoyantes', 'un brasero de forge en fonte'),
    ('r4', 'Désert du Lag', 'Salle Obscure', 'sable doré', 'dalles de grès', 'sables mouvants', 'falaise de grès', 'entrée de temple-cinéma', 'velours rouge sombre et pierre noire, ambiance de cinéma', 'un projecteur de cinéma sur pied'),
    ('r5', 'Lac des Streams', 'Arène Engloutie', 'herbe de rive et galets', 'ponton de bois', 'eau calme bleu clair (on glisse dessus avec la Planche) et eau profonde bleu nuit (infranchissable)', 'falaise de roche bleu-vert', 'entrée d\'arène à moitié engloutie', 'pierre bleu-vert mouillée, flaques', 'une vasque d\'eau lumineuse'),
    ('r6', 'Cité des Bulles', 'Bibliothèque des Bulles', 'pavés de ville colorés', 'trottoir', 'encre noire', 'façade de bâtiment de bande dessinée', 'porte de bibliothèque', 'rayonnages de bois et papier, cases de bande dessinée', 'une lampe de lecture sur pied'),
    ('r7', 'Marais Rétro', 'Château 8 bits', 'herbe de marais et vase', 'passerelle de planches', 'eau verte de marais', 'talus de terre et de racines', 'entrée de château en blocs', 'blocs carrés façon vieux jeux, briques grises', 'une torche cubique sur pied'),
    ('r8', 'Toundra du Cloud', 'Archives Gelées', 'neige', 'chemin de glace tassée', 'eau glacée', 'falaise de glace', 'entrée de bunker gelé', 'glace et métal d\'armoires à dossiers', 'une lampe d\'archives au verre givré'),
]
for (e, region, donj, sol, chemin, liquide, falaise, entree, theme, lumiere) in REGIONS:
    k = e.upper()
    sols(e, f'{region} : tuiles de sol', sol, chemin, liquide, falaise, entree)
    deco = [propre(x) for x in ANC.get(f'{k}-20', {'items': []})['items']]
    env = [propre(x) for c in ANCIENNES if c['id'].startswith(k + '-') and c['titre'].startswith('Environnement animé') for x in c['items']]
    planche_decor(e, f'{region} : décor posé', "Tout ce qui est posé sur le sol de la région, avec la version coupée ou cassée de ce qui se coupe ou se casse, et l'environnement animé.",
                  [f'un arbre typique de la région (toute la case)', 'un deuxième arbre'] + deco + [f'{x}, image 1' for x in env][:12])
    # monstres de la région
    for c in ANCIENNES:
        if not c['id'].startswith(k + '-') or c['cat'] != 'ennemis': continue
        if c['titre'].endswith(': poses'):
            nom = c['titre'].split(' : ')[0]
            proj = next((propre(x.split(' : ', 1)[1]) for x in c['items'] if x.startswith('Son projectile')), None)
            mode = 'vol' if re.search(r'ailé|chauve|harpie|gargouille', c['items'][0], re.I) else 'flotte' if re.search(r'flott|spectre|méduse|feu follet|masque|ombre', c['items'][0], re.I) else 'marche'
            monstre(e, nom, desc(c['id']), mode, proj)
        elif c['titre'].startswith('Sbires') and 'mouvement' not in c['titre']:
            for it in c['items']:
                nom, d = it.split(' : ', 1) if ' : ' in it else (it[:30], it)
                nom = re.sub(r"^(Le|La|L')\s?", '', nom).strip()
                monstre(e, nom, propre(d), 'marche')
        elif c['titre'].startswith('Chauves-souris'):
            monstre(e, f'Chauve-souris ({donj})', f"une chauve-souris aux couleurs du donjon ({theme}).", 'vol')
    b = next((c for c in ANCIENNES if c['id'].startswith(k + '-') and c['cat'] == 'boss'), None)
    if b:
        boss(e, b['titre'], desc(b['id']), propre(b['items'][-1].split('(')[0]) if len(b['items']) > 3 else 'une boule d\'énergie violette')
    g = ANC.get(f'{k}-10'); h = ANC.get(f'{k}-26')
    persos = []
    if g: persos.append((g['titre'].split(',')[0], desc(f'{k}-10'), propre(g['items'][1].replace(g['titre'], '')).strip(' .') or 'il salue'))
    if h:
        n = h['items'][0].split(' : ')[0]; persos.append((n.split(',')[0], propre(h['items'][0].split(' : ', 1)[1]), 'il salue'))
    if persos: pnj(e, f'{region} : Gardien et habitant', persos)
    donjon(e, donj, theme, lumiere, ANC.get(f'{k}-24', {'items': []})['items'], [])
    o = ANC.get(f'{k}-28')
    if o: objets(e, f'{donj} : objets', "Les objets trouvés dans ce donjon.", [propre(x) for x in o['items']])
    for c in ANCIENNES:
        if c['id'].startswith(k + '-') and c['cat'] == 'perso' and c['titre'].startswith('Spirit') and c['items']:
            poses_spirit(e, c['titre'], propre(c['items'][0].split(' : ', 1)[-1]))

# casques : un simple changement de couleurs dans le code, pas d'image à faire (noté pour mémoire)

# ================================================================ TOUR FINALE
sols('fin', 'Cratère du Clickbait : tuiles de sol', 'roche noire vitrifiée', 'dalles de néon violet', 'faille de lumière violette', 'paroi de cratère', 'porte de la tour')
donjon('fin', 'Tour du Clickbait', 'métal noir strié de néon violet et rouge, fenêtres pub', 'un néon sur pied violet', [propre(x) for x in ANC['FIN-03']['items']], [])
boss('fin', 'Le Roi Clickbait', "un monstre fait d'écrans et de fenêtres pub empilés, tête en écran noir, yeux jaunes en amande, grand sourire jaune, cornes, couronne à pointes avec des cristaux violets, petites fenêtres pub rouges autour de lui. Pas un humain.",
     "une petite fenêtre pub rouge qui file", refs=['roi'], deuxieme="deuxième phase : deux fois plus gros, fissures violettes partout, couronne brisée")
for c in ANCIENNES:
    if c['id'] == 'FIN-05':
        for it in c['items']:
            nom, d = it.split(' : ', 1)
            monstre('fin', re.sub(r"^(Le|La|L')\s?", '', nom).strip(), propre(d), 'marche')

# ---------------------------------------------------------------- images de référence
def vignette(chemin, taille=520):
    im = Image.open(chemin); im.thumbnail((taille, taille))
    if im.mode not in ('RGB', 'RGBA'): im = im.convert('RGBA')
    b = io.BytesIO(); im.save(b, 'WEBP', quality=85)
    return 'data:image/webp;base64,' + base64.b64encode(b.getvalue()).decode()

REFS = {
    'spirit-officiel': ('Spirit officiel', os.path.join(REFS_TOON, 'spirit-officiel.webp')), 'spirit-face': ('Spirit de face', os.path.join(REFS_TOON, 'spirit-face.webp')),
    'spirit-dos': ('Spirit de dos', os.path.join(REFS_TOON, 'spirit-dos.webp')), 'spirit-profil': ('Spirit de profil', os.path.join(REFS_TOON, 'spirit-profil.webp')),
    'titre': ('Écran titre (ancien style)', os.path.join(REFS_TOON, 'titre.webp')), 'roi': ('Le Roi Clickbait', os.path.join(REFS_TOON, 'roi.webp')),
    'loge': ('Ta loge (ancien style)', os.path.join(REFS_TOON, 'loge.webp')), 'hall': ('Le hall (ancien style)', os.path.join(REFS_TOON, 'hall.webp')), 'bureau-mika': ('Bureau de Mika (ancien style)', os.path.join(REFS_TOON, 'bureau-mika.webp')),
    'ermite': ("L'ermite (ancien style)", os.path.join(REFS_TOON, 'ermite.webp')),
    'p-mika': ('Mika (ancien style)', os.path.join(IMAGES, 'personnages/lynx-detoure.png')), 'p-gus': ('Gus (ancien style)', os.path.join(IMAGES, 'personnages/gus-detoure.png')),
    'p-mona': ('Mona (ancien style)', os.path.join(IMAGES, 'personnages/mona-detoure.png')), 'p-lila': ('Lila (ancien style)', os.path.join(IMAGES, 'personnages/lila-detoure.png')),
    'm-crache': ('Crache-pierres (ancien style)', os.path.join(IMAGES, 'ennemis/crache-pierres-face.png')), 'm-cornu': ('Cornu (ancien style)', os.path.join(IMAGES, 'ennemis/cornu-face.png')),
    'm-gresille': ('Grésille (ancien style)', os.path.join(IMAGES, 'ennemis/gresille.png')), 'm-popup': ('Pop-up (ancien style)', os.path.join(IMAGES, 'donjon1/popup.png')),
    'm-clic': ('Clic (ancien style)', os.path.join(IMAGES, 'donjon1/clic.png')), 'm-spamling': ('Spamling (ancien style)', os.path.join(IMAGES, 'donjon1/spamling.png')),
    'm-reine': ('Reine Pop-up (ancien style)', os.path.join(IMAGES, 'donjon1/reine.png')),
}
utilises = {r for c in cartes for r in c['r'] if not r.startswith('@')}
manque = utilises - set(REFS)
assert not manque, manque
refs = {k: vignette(REFS[k][1]) for k in utilises}
labels = {k: REFS[k][0] for k in utilises}
nouvelles = {'@SP-01': 'Ta planche de Spirit validée (carte SP-01)', '@SP-02': 'Tes portraits de Spirit validés (carte SP-02)'}

data = {'gardees': {}, 'refs': refs, 'labels': labels, 'cartes': cartes, 'nouvelles': nouvelles}
tpl = open(os.path.join(ICI, 'modele.html'), encoding='utf8').read()
out = tpl.replace('/*DATA*/null', json.dumps(data, ensure_ascii=False).replace('</', '<\\/'))
open(os.path.join(ICI, 'catalogue-pixel.html'), 'w', encoding='utf8').write(out)
print(len(cartes), 'cartes,', round(len(out) / 1e6, 2), 'Mo')
