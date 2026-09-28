# Écrit INSTRUCTIONS-CLAUDE.md : le fichier que Jonathan donne à une nouvelle conversation Claude
# avec son zip d'images non renommées, pour qu'elle sache trier les images et continuer le jeu.
#   python3 instructions_claude.py
import json, os, re

ICI = os.path.dirname(os.path.abspath(__file__))
RACINE = os.path.join(ICI, '..')
html = open(os.path.join(RACINE, 'catalogue', 'catalogue-pixel.html'), encoding='utf8').read()
D = json.loads(re.search(r'const D = (\{.*?\});\n', html, re.S).group(1).replace('<\\/', '</'))
cartes = D['cartes']
ancien = open(os.path.join(RACINE, '..', 'INSTRUCTIONS-JEU.md'), encoding='utf8').read()

def section(titre_debut, titre_fin):
    a = ancien.index(titre_debut); b = ancien.index(titre_fin, a)
    return ancien[a:b].strip()

ETAPES = [('sp', 'Spirit (le héros, toutes ses planches)'), ('pro', 'Prologue (le QG, la nuit)'), ('pl', 'Plaine des Pixels'), ('d1', 'Donjon 1 : Terrier des Pop-ups'),
          ('qg', 'Parvis du QG'), ('r2', 'Forêt des Forums + Donjon 2'), ('r3', 'Monts Hardware + Donjon 3'), ('r4', 'Désert du Lag + Donjon 4'),
          ('r5', 'Lac des Streams + Donjon 5'), ('r6', 'Cité des Bulles + Donjon 6'), ('r7', 'Marais Rétro + Donjon 7'), ('r8', 'Toundra du Cloud + Donjon 8'), ('fin', 'Tour finale')]
FAIT = {'sp', 'pro', 'pl', 'd1', 'qg', 'r2', 'r3'}

def grille(c):
    m = re.search(r'grille invisible de (\d+) colonnes et (\d+) rangées', c['pr'][0])
    if m: return int(m.group(1)), int(m.group(2))
    return None

def cases(c):
    return re.findall(r'^(\d+)\) (.+)$', c['pr'][0], re.M)

L = []
w = L.append
w("# Spirit et le Roi Clickbait : instructions pour trier les images et continuer le jeu\n")
w("Tu reprends un projet commencé avec Jonathan. Lis tout ce fichier avant de répondre.\n")
w("## 0. Ce que Jonathan t'envoie et ce qu'il attend\n")
w("- Un fichier zip avec toutes les images qu'il a faites avec ChatGPT, **non renommées** (noms du type « ChatGPT Image 12 sept. 2026, 14_03_22.png »). Il en est au **donjon 3** : les étapes Spirit (casque normal seulement), Prologue, Plaine, Donjon 1, Parvis du QG, Forêt + Donjon 2, Monts + Donjon 3. Les versions Casque 2.0 et 3.0 ne sont pas encore faites.")
w("- Ton premier travail : **reconnaître chaque image** grâce au catalogue de la section 6, la renommer avec son code de carte, puis la découper case par case (section 5).")
w("- Rends-lui ensuite : un tableau « fichier d'origine → code de la carte → nouveau nom », la liste des cartes qui manquent, et la liste des images que tu n'as pas pu identifier (décris-les, ne devine pas).")
w("- Deux images ne viennent pas du catalogue et sont à **garder telles quelles** : l'écran titre (voir section 1) et le logo du titre.")
w("- Ensuite seulement, on construit le jeu avec ces images (section 7). Ne commence pas le jeu tant que Jonathan ne l'a pas demandé.\n")

w("## 1. Le jeu en bref\n")
w("- Jeu d'aventure façon **Zelda A Link to the Past / Minish Cap**, en **pixel art 16 bits**, pour le site spiritgamer.fr. Vue de dessus, écrans fixes qui glissent de l'un à l'autre, donjons en salles.")
w("- Héros : **Spirit**, la mascotte du site : petit personnage tout blanc à grosse tête ronde, grands yeux bleus, casque-micro noir et bleu aux touches cyan, tee-shirt bleu avec les lettres **SG** en cyan sur la poitrine, short bleu, baskets bleues.")
w("- Graphismes mignons, histoire pour adultes, jamais de gore ni de sang. Commandes au clavier et au tactile.")
w("- **Pixellisation à garder exactement** : chaque planche est un dessin de 240 × 160 pixels réels agrandi en 1536 × 1024 (un pixel réel ≈ 6,4 × 6,4 pixels de l'image). Jonathan veut que le jeu garde exactement ce rendu, ni plus fin ni plus gros.")
w("- Tailles dans le jeu : Spirit fait 34 pixels réels de haut dans une case de 40 × 40 ; tuiles de sol de 20 × 20 ; écran de 16 × 11 tuiles (320 × 220) avec un bandeau d'informations au-dessus ; image agrandie sans lissage.")
w("- **Écran titre** : une illustration 16:9 (1672 × 941) qui n'est PAS en pixel art : Spirit de dos sur un rocher, au premier plan à gauche, regarde une vallée verte au coucher de soleil, avec une tour au loin, un vortex violet dans le ciel d'où tombent des éclats, et des monstres de pierre aux yeux jaunes cachés dans les buissons à droite. Jonathan l'adore : c'est l'image de départ du jeu, on la garde telle quelle.")
w("- **Logo du titre** : « SPIRIT » en grosses lettres blanches et bleues brillantes, et « et le Roi Clickbait » dessous, sur fond gris uni #808080 (le gris est à retirer pour le poser sur l'écran titre).\n")

w("## 2. L'histoire\n")
hist = section("## 2. L'histoire", "## 3. Règles de logique du jeu")
hist = hist.replace("## 2. L'histoire\n", "").replace("SG et liseré du casque en or", "les parties bleues et cyan du casque passent en or").replace("SG et liseré en violet", "en violet")
w(hist + "\n")

w("## 3. Règles de logique du jeu (décidées avec Jonathan, à respecter)\n")
regles = section("## 3. Règles de logique du jeu", "## 4. Règles pour les images")
regles = regles.replace("## 3. Règles de logique du jeu\n", "")
regles = "\n".join(l for l in regles.split("\n") if not l.startswith(("- Quadrillage invisible", "- Écrans extérieurs", "- Jamais de collage", "- Sol vierge", "- Une porte ouverte garde")))
w(regles)
w("- Tout se fait à la tuile : chaque objet occupe une tuile de 20 × 20 (ou 2 × 2 tuiles pour un arbre, une entrée, une porte), bien de face.")
w("- Portes des donjons : dessinées pour les quatre murs par ChatGPT. On ne tourne jamais la porte du haut par le code pour faire celles des côtés : les portes de côté ont leur propre forme. Seule correction permise : si la serrure est restée debout sur une porte de côté, on la couche d'un quart de tour sur place, au pixel près, avec l'accord de Jonathan.")
w("- Jamais de collage : on ne redessine pas les images de ChatGPT. On les découpe, on retire le fond magenta, c'est tout. S'il manque quelque chose, on demande une nouvelle planche.")
w("- Spirit a trois versions de casque : normal, Casque 2.0 (parties bleues et cyan en or #f2c230) et Casque 3.0 (en violet #9b4dff). Toutes ses planches existent dans les trois versions.\n")

w("## 4. Comment reconnaître une image\n")
w("1. **Planche de sprites** : 1536 × 1024, fond **magenta pur #FF00FF**, éléments rangés sur une grille invisible de cases égales (6 × 4, 3 × 2 ou 12 × 8). C'est presque tout le zip. Compare le contenu des cases avec les listes de la section 6 : le sujet (Spirit, un monstre, des portes, des tuiles de sol…) et l'ordre des cases (de gauche à droite puis de haut en bas) désignent la carte.")
w("2. **Même planche en plusieurs exemplaires** : ChatGPT a parfois fait plusieurs essais d'une carte, ou une étape de correction (vérification, SG sur la poitrine, serrures des portes de côté). Garde la plus récente ou la plus propre, et signale les autres à Jonathan au lieu de les jeter.")
w("3. **Planche de Spirit avec casque or ou violet** : c'est la version Casque 2.0 ou 3.0 d'une planche de Spirit (même dessin, seules les couleurs du casque changent). En principe il n'y en a pas encore.")
w("4. **Image sans fond magenta** : l'écran titre, le logo (fond gris), ou une des 6 images de l'introduction (carte PRO « Les images de l'introduction », scènes en pixel art sans grille).")
w("5. **Nommage** : `CODE-sujet.png` pour la planche entière (exemple `SP-01-spirit-poses.png`, `D1-02-terrier-portes.png`), puis `CODE-NN-sujet.png` pour chaque case découpée (`SP-01-07-profil-immobile.png`). Les cases « vide » ne donnent pas de fichier.\n")

w("## 5. Découper une planche sans la redessiner\n")
w("On garde exactement le dessin de ChatGPT : on coupe la planche en cases égales et on rend le fond magenta transparent (le magenta mêlé au contour aussi). Aucun redimensionnement, aucune retouche.\n")
w("```python")
w(open(os.path.join(ICI, 'decouper_fidele.py'), encoding='utf8').read().strip())
w("```\n")
w("Exemple : `python3 decouper_fidele.py planche.png 6 4 sortie face face-pas-g face-pas-d …` (colonnes, rangées, dossier, puis un nom par case dans l'ordre ; « vide » pour sauter une case).\n")

w("## 6. Le catalogue complet (toutes les cartes, dans l'ordre)\n")
w("Chaque carte correspond à une planche. « Grille » = colonnes × rangées ; les cases sont numérotées de gauche à droite puis de haut en bas. Les cartes marquées ✔ font partie de ce que Jonathan a déjà fait (jusqu'au donjon 3, casque normal seulement).\n")
for e, nom in ETAPES:
    cs = [c for c in cartes if c['e'] == e]
    if not cs: continue
    w(f"### {nom}\n")
    for c in cs:
        fait = e in FAIT and not ('Casque 2.0' in c['t'] or 'Casque 3.0' in c['t'])
        m = re.search(r"on le reçoit dans l'étape ([^)]+)\)", c['p'])
        if fait and m:   # Spirit avec un objet : fait seulement si l'objet arrive avant la fin du donjon 3
            fait = m.group(1) in ('Donjon 1', 'Parvis du QG', 'Forêt + Donjon 2', 'Monts + Donjon 3')
        g = grille(c)
        w(f"**{c['id']} · {c['t']}**{' ✔' if fait else ''}  ")
        w(f"{c['p']}  ")
        if 'Casque 2.0' in c['t'] or 'Casque 3.0' in c['t']:
            w(f"Même planche et même grille que la carte {c['r'][0][1:]}, seules les couleurs du casque changent.\n")
            continue
        if g: w(f"Grille : {g[0]} × {g[1]}  ")
        lst = cases(c)
        if lst:
            w("Cases : " + " · ".join(f"{n}) {t}" for n, t in lst if t != 'vide') + "\n")
        else:
            w("\n")

w("## 7. Pour construire le jeu ensuite (seulement quand Jonathan le demande)\n")
w("- Jeu en HTML + JavaScript (canvas), sans outil de construction : il doit marcher en double-cliquant sur index.html et en ligne sur le site.")
w("- Rendu : tout est dessiné dans une image de 320 × 220 (plus le bandeau) puis agrandi sans lissage à la taille de l'écran. Les sprites sont affichés avec exactement leurs pixels.")
w("- Carte du monde : chaque écran est décrit en lettres, une par tuile (16 × 11) ; les bords se raccordent à l'écran voisin ; collisions à la tuile ; seul le pied des personnages bloque.")
w("- Déplacements : Spirit glisse légèrement pour passer un coin (comme dans Zelda) ; changer d'écran fait glisser l'image ; entrer dans une grotte ou un donjon fait un fondu au noir.")
w("- Il existe un premier prototype (Plaine, grotte de l'ermite, Ampli, Crache-pierres) dans le dépôt GitHub de Jonathan, dossier `jeu-spirit/zelda/` de la branche `claude/wonderful-albattani-oq4m40`. Si Jonathan te joint ses fichiers, repars de son moteur (commandes clavier et tactiles, sons, dialogues, glissement entre écrans) et remplace ses dessins provisoires par les images découpées.\n")

w("## 8. Façon de répondre à Jonathan\n")
w("En français, direct, sans tirets cadratins ni emojis, sans formules creuses. Donner son avis quand c'est utile, dire franchement quand une chose n'est pas sûre, signaler ce qui ne va pas au lieu d'acquiescer. Les prompts pour ChatGPT se donnent dans un document à part, jamais au milieu de la discussion. Ne jamais lui demander une image qu'il n'a plus : il n'a gardé que les images de ce zip et l'image officielle de Spirit qui saute.")

open(os.path.join(RACINE, 'INSTRUCTIONS-CLAUDE.md'), 'w', encoding='utf8').write('\n'.join(L) + '\n')
print('écrit', os.path.join(RACINE, 'INSTRUCTIONS-CLAUDE.md'), len('\n'.join(L)) // 1000, 'ko')
