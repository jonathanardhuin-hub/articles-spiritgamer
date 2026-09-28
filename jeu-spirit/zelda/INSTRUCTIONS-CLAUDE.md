# Spirit et le Roi Clickbait : instructions pour trier les images et continuer le jeu

Tu reprends un projet commencé avec Jonathan. Lis tout ce fichier avant de répondre.

## 0. Ce que Jonathan t'envoie et ce qu'il attend

- Un fichier zip avec toutes les images qu'il a faites avec ChatGPT, **non renommées** (noms du type « ChatGPT Image 12 sept. 2026, 14_03_22.png »). Il en est au **donjon 3** : les étapes Spirit (casque normal seulement), Prologue, Plaine, Donjon 1, Parvis du QG, Forêt + Donjon 2, Monts + Donjon 3. Les versions Casque 2.0 et 3.0 ne sont pas encore faites.
- Ton premier travail : **reconnaître chaque image** grâce au catalogue de la section 6, la renommer avec son code de carte, puis la découper case par case (section 5).
- Rends-lui ensuite : un tableau « fichier d'origine → code de la carte → nouveau nom », la liste des cartes qui manquent, et la liste des images que tu n'as pas pu identifier (décris-les, ne devine pas).
- Deux images ne viennent pas du catalogue et sont à **garder telles quelles** : l'écran titre (voir section 1) et le logo du titre.
- Ensuite seulement, on construit le jeu avec ces images (section 7). Ne commence pas le jeu tant que Jonathan ne l'a pas demandé.

## 1. Le jeu en bref

- Jeu d'aventure façon **Zelda A Link to the Past / Minish Cap**, en **pixel art 16 bits**, pour le site spiritgamer.fr. Vue de dessus, écrans fixes qui glissent de l'un à l'autre, donjons en salles.
- Héros : **Spirit**, la mascotte du site : petit personnage tout blanc à grosse tête ronde, grands yeux bleus, casque-micro noir et bleu aux touches cyan, tee-shirt bleu avec les lettres **SG** en cyan sur la poitrine, short bleu, baskets bleues.
- Graphismes mignons, histoire pour adultes, jamais de gore ni de sang. Commandes au clavier et au tactile.
- **Pixellisation à garder exactement** : chaque planche est un dessin de 240 × 160 pixels réels agrandi en 1536 × 1024 (un pixel réel ≈ 6,4 × 6,4 pixels de l'image). Jonathan veut que le jeu garde exactement ce rendu, ni plus fin ni plus gros.
- Tailles dans le jeu : Spirit fait 34 pixels réels de haut dans une case de 40 × 40 ; tuiles de sol de 20 × 20 ; écran de 16 × 11 tuiles (320 × 220) avec un bandeau d'informations au-dessus ; image agrandie sans lissage.
- **Écran titre** : une illustration 16:9 (1672 × 941) qui n'est PAS en pixel art : Spirit de dos sur un rocher, au premier plan à gauche, regarde une vallée verte au coucher de soleil, avec une tour au loin, un vortex violet dans le ciel d'où tombent des éclats, et des monstres de pierre aux yeux jaunes cachés dans les buissons à droite. Jonathan l'adore : c'est l'image de départ du jeu, on la garde telle quelle.
- **Logo du titre** : « SPIRIT » en grosses lettres blanches et bleues brillantes, et « et le Roi Clickbait » dessous, sur fond gris uni #808080 (le gris est à retirer pour le poser sur l'écran titre).

## 2. L'histoire


- Le soir des 11 ans de SpiritGamer, tout le Réseau fait la fête autour du QG.
- Une fenêtre publicitaire s'ouvre dans la foule et le Roi Clickbait en sort. Il brise la Source (la lumière des infos vérifiées) en huit fragments ; les huit Gardiens des rubriques disparaissent. Le Bruit prend corps : des monstres partout.
- Le Roi Clickbait n'est pas un humain : c'est un monstre fait d'écrans et de fenêtres pub empilés, tête en forme d'écran noir, yeux jaunes en amande, grand sourire jaune, cornes, couronne à pointes avec des cristaux violets, petites fenêtres pub rouges autour de lui.
- Spirit s'était endormi dans sa loge, devant son écran, casque sur les oreilles. Il n'a rien entendu.

### Le prologue (au QG, de nuit)
1. Spirit dort dans son fauteuil beige face à son écran : écrans allumés sur un jeu en pause et un tchat, logo SG en veille sur l'écran incurvé de droite.
2. Il se réveille, debout à côté du fauteuil : la pub du Roi a envahi ses trois écrans.
3. Il sort par la double porte de sa loge vers le couloir.
4. Couloir : à gauche la porte de la loge, à droite celle du bureau de Mika, en bas celle du hall.
5. Bureau de Mika : son frère, un lynx à lunettes, barbe, tee-shirt gris, grand collectionneur de livres et de figurines, qui se prend pour le boss (« ici, c'est moi le boss »). Son PC s'est figé en plein raid, la pub du Roi sur ses écrans.
6. Hall : Gus (vieux blaireau à lunettes, rédacteur en chef) explique l'attaque ; les grandes portes du QG sont bloquées.
7. Retour dans la loge : Spirit va jusqu'à son PC, l'écran SG se brouille, la pièce tremble, et la porte devient un vortex.
8. Spirit passe le vortex (tunnel de lumière) et atterrit dans la Plaine, dans une colonne de lumière.

Les régions du Réseau sont de jour : Spirit a changé de dimension en passant le vortex.

### Le monde
8 régions, chacune avec son donjon, puis la tour finale :

| Région | Donjon | Objets du donjon |
|---|---|---|
| Plaine des Pixels | Terrier des Pop-ups | Manette Retour, Mégaphone |
| Forêt des Forums | Labyrinthe des Fils | Pétards Confettis, Manette Pro |
| Monts Hardware | Forge Surchauffée | Lanterne RGB, Micro Pro |
| Désert du Lag | Salle Obscure | Câble Grappin |
| Lac des Streams | Arène Engloutie | Planche Wi-Fi, Micro d'Or |
| Cité des Bulles | Bibliothèque des Bulles | Baskets Turbo |
| Marais Rétro | Château 8 bits | Aimant |
| Toundra du Cloud | Archives Gelées | Lunettes de Vérif |
| Cratère du Clickbait | Tour du Roi | Combat final |

Chaque donjon délivre un Gardien et un fragment de la Source. Le premier Gardien est Flash, un hibou reporter (deux ailes bien distinctes).

La carte du Réseau se dévoile région par région (sous la brume au départ).

### Les objets
- Ampli (donné par l'ermite dans la grotte) : onde sonore qui bat les monstres, coupe l'herbe, casse les pots, détruit les projectiles. Cœurs pleins : l'onde part au loin.
- Manette Retour : se lance et revient ; étourdit, casse les pots, active les cristaux, rapporte les objets.
- Mégaphone : onde sonore à distance.
- Pétards Confettis : se posent et explosent, ouvrent les murs fêlés (il n'y a donc aucun mur fêlé au donjon 1).
- Manette Pro : plus rapide et deux fois plus de portée (comme le boomerang magique de Zelda).
- Lanterne RGB : éclaire les salles noires, allume les braseros.
- Micro Pro puis Micro d'Or : onde plus large, puis plus puissante.
- Câble Grappin : s'accroche aux poteaux, fait traverser les ravins.
- Planche Wi-Fi : glisse librement sur l'eau calme (bleu clair) ; l'eau profonde (bleu nuit, remous) reste infranchissable.
- Baskets Turbo : foncer, casser les piles de caisses.
- Aimant : attire les blocs de métal.
- Lunettes de Vérif : révèlent les faux murs et les faux sols.
- Pare-feu puis Pare-feu Pro (boutique de Mona) : bracelet qui projette devant Spirit un bouclier d'énergie en hexagones cyan, arrête les projectiles de face. Pas de bouclier en métal.
- Casque 2.0 (trésor caché du donjon 4) : deux fois moins de dégâts, les parties bleues et cyan du casque passent en or. Casque 3.0 (trésor caché du donjon 7) : quatre fois moins, en violet. Seules les couleurs du casque changent.

### Les personnages du QG et du Parvis
Gus (rédacteur en chef), Mona (chatte rousse marchande), Lila (petite lapine fan de jeux), Mika (le frère, lynx), l'ermite de la grotte de la Plaine.

## 3. Règles de logique du jeu (décidées avec Jonathan, à respecter)


- Cohérence : ce que disent les personnages, les panneaux et les descriptions d'objets correspond exactement à ce qu'on voit et à ce que le jeu permet. Ne jamais dévoiler la suite (grotte, forêt, objets à venir) avant que le joueur y arrive.
- Chaque région a ses propres éléments de décor (câbles, cactus de verre, roseaux, poubelles, blocs de glace…), pas seulement des rochers et des touffes. Chaque élément qu'on coupe a sa version coupée (petite base rase), jamais un moignon.
- Continuité entre écrans, comme dans Zelda : de part et d'autre d'un bord, même chemin, même position, même largeur, même sol. Aucun chemin qui s'arrête net.
- Portes : un tunnel dans l'épaisseur du mur où Spirit tient entier ; on change de salle dès l'embrasure ; une porte fermée ne laisse jamais entrer ; rien devant une porte ; aucun ennemi devant la porte d'entrée. Là où il n'y a pas de porte, il y a un mur plein.
- Seul le pied des objets bloque : on passe derrière les statues, rochers, braseros.
- Contours précis pour l'eau, la lave, les trous, les falaises et les rochers. Eau et trous : on ne marche pas dedans, les projectiles passent au-dessus.
- Les cristaux ne réagissent qu'à la Manette. Les énigmes ne donnent pas la solution (la gargouille à pousser est identique aux autres).
- Pas de mécanisme qui demande un objet que le joueur n'a pas encore.
- Passages d'au moins deux fois la largeur de Spirit. Aucun blocage définitif : un bloc mal poussé revient à sa place quand on ressort.
- Après un boss : d'abord le cœur, loin de Spirit ; le Gardien n'apparaît qu'une fois le cœur ramassé, de l'autre côté de la salle.
- Chaque secret a un indice quelque part (panneau, carnet de Flash, dialogue).
- Tout ce qui bouge a ses images : poses et animation de chaque ennemi (marche, vol, sortie de terre), projectile de chaque ennemi (vol et impact), effet de chaque objet, barre de vie et effets des boss, environnement animé de chaque région (reflets et ronds dans l'eau, bulles et gouttes de lave avec ombre d'avertissement, pluie, neige, sable, brume). Des chauves-souris dans les donjons, tuées d'un coup de Manette.
- Tout se fait à la tuile : chaque objet occupe une tuile de 20 × 20 (ou 2 × 2 tuiles pour un arbre, une entrée, une porte), bien de face.
- Portes des donjons : dessinées pour les quatre murs par ChatGPT. On ne tourne jamais la porte du haut par le code pour faire celles des côtés : les portes de côté ont leur propre forme. Seule correction permise : si la serrure est restée debout sur une porte de côté, on la couche d'un quart de tour sur place, au pixel près, avec l'accord de Jonathan.
- Jamais de collage : on ne redessine pas les images de ChatGPT. On les découpe, on retire le fond magenta, c'est tout. S'il manque quelque chose, on demande une nouvelle planche.
- Spirit a trois versions de casque : normal, Casque 2.0 (parties bleues et cyan en or #f2c230) et Casque 3.0 (en violet #9b4dff). Toutes ses planches existent dans les trois versions.

## 4. Comment reconnaître une image

1. **Planche de sprites** : 1536 × 1024, fond **magenta pur #FF00FF**, éléments rangés sur une grille invisible de cases égales (6 × 4, 3 × 2 ou 12 × 8). C'est presque tout le zip. Compare le contenu des cases avec les listes de la section 6 : le sujet (Spirit, un monstre, des portes, des tuiles de sol…) et l'ordre des cases (de gauche à droite puis de haut en bas) désignent la carte.
2. **Même planche en plusieurs exemplaires** : ChatGPT a parfois fait plusieurs essais d'une carte, ou une étape de correction (vérification, SG sur la poitrine, serrures des portes de côté). Garde la plus récente ou la plus propre, et signale les autres à Jonathan au lieu de les jeter.
3. **Planche de Spirit avec casque or ou violet** : c'est la version Casque 2.0 ou 3.0 d'une planche de Spirit (même dessin, seules les couleurs du casque changent). En principe il n'y en a pas encore.
4. **Image sans fond magenta** : l'écran titre, le logo (fond gris), ou une des 6 images de l'introduction (carte PRO « Les images de l'introduction », scènes en pixel art sans grille).
5. **Nommage** : `CODE-sujet.png` pour la planche entière (exemple `SP-01-spirit-poses.png`, `D1-02-terrier-portes.png`), puis `CODE-NN-sujet.png` pour chaque case découpée (`SP-01-07-profil-immobile.png`). Les cases « vide » ne donnent pas de fichier.

## 5. Découper une planche sans la redessiner

On garde exactement le dessin de ChatGPT : on coupe la planche en cases égales et on rend le fond magenta transparent (le magenta mêlé au contour aussi). Aucun redimensionnement, aucune retouche.

```python
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
```

Exemple : `python3 decouper_fidele.py planche.png 6 4 sortie face face-pas-g face-pas-d …` (colonnes, rangées, dossier, puis un nom par case dans l'ordre ; « vide » pour sauter une case).

## 6. Le catalogue complet (toutes les cartes, dans l'ordre)

Chaque carte correspond à une planche. « Grille » = colonnes × rangées ; les cases sont numérotées de gauche à droite puis de haut en bas. Les cartes marquées ✔ font partie de ce que Jonathan a déjà fait (jusqu'au donjon 3, casque normal seulement).

### Spirit (le héros, toutes ses planches)

**SP-01 · Spirit : toutes ses poses de jeu (grande planche)** ✔  
La planche de référence de tout le jeu : ses proportions servent pour tout le reste. Une seule grande image de 24 poses, dans une nouvelle conversation. Joins seulement l'image officielle de Spirit (celle où il saute). Étape 2 si la tête change de forme d'une case à l'autre. Étape 3 si ta planche est déjà faite mais avec un cœur sur la poitrine à la place du SG : tu la corriges sans tout refaire. Étape 4 pour refaire les cases 23 (aspiré, yeux ratés) et 24 (atterrit, pose ratée).  
Grille : 6 × 4  
Cases : 1) de face, immobile, bras le long du corps · 2) de face, marche : pied gauche en avant, bras droit en avant · 3) de face, marche : pied droit en avant, bras gauche en avant · 4) de dos, immobile · 5) de dos, marche : pied gauche en avant · 6) de dos, marche : pied droit en avant · 7) de profil, immobile · 8) de profil, marche : jambe avant tendue, jambe arrière pliée · 9) de profil, marche : jambes croisées sous le corps (pas de passage) · 10) de face, il crie dans son micro pour lancer l'onde : bouche grande ouverte, penché en avant, mains serrées · 11) de dos, même cri : penché vers le fond · 12) de profil, même cri : bouche ouverte vers la droite, penché en avant · 13) de face, il pousse un bloc : bras tendus devant lui, penché vers nous · 14) de dos, il pousse : bras tendus vers le fond · 15) de profil, il pousse : bras tendus vers la droite, jambe arrière tendue · 16) de face, il brandit un objet au-dessus de sa tête à deux mains (l'objet n'est pas dessiné, mains vides levées), air fier · 17) de face, il prend un coup : recule, yeux plissés, bras écartés · 18) de face, il tombe : bras levés, jambes repliées · 19) assis par terre, KO, yeux en spirale, casque de travers · 20) un genou au sol, il se relève, main sur le casque, air déterminé · 21) endormi assis, tête penchée sur le côté, yeux fermés, un petit « z » bleu au-dessus (le seul signe autorisé) · 22) debout, il s'étire, bras levés, yeux fermés, bouche ouverte (bâillement) · 23) aspiré par un vortex : vu de face, bras et jambes écartés, yeux en panique · 24) il atterrit : un genou au sol, une main posée au sol, vu de face

**SP-02 · Spirit : toutes ses poses de jeu (grande planche) (Casque 2.0)**  
La même planche que « Spirit : toutes ses poses de jeu (grande planche) », avec le Casque 2.0 (trésor caché du donjon 4) : seules les couleurs du casque changent. Nouvelle conversation : joins ta planche normale de cette carte, puis colle le prompt 1. Le prompt 2 sert si ChatGPT a touché autre chose que le casque.  
Même planche et même grille que la carte SP-01, seules les couleurs du casque changent.

**SP-03 · Spirit : toutes ses poses de jeu (grande planche) (Casque 3.0)**  
La même planche que « Spirit : toutes ses poses de jeu (grande planche) », avec le Casque 3.0 (trésor caché du donjon 7) : seules les couleurs du casque changent. Nouvelle conversation : joins ta planche normale de cette carte, puis colle le prompt 1. Le prompt 2 sert si ChatGPT a touché autre chose que le casque.  
Même planche et même grille que la carte SP-01, seules les couleurs du casque changent.

**SP-04 · Spirit : portraits des dialogues** ✔  
Les grands portraits affichés à côté du texte. Ici les lettres SG du casque doivent être lisibles. Fais-la après la grande planche, dans la même conversation ou en joignant ta planche validée.  
Grille : 3 × 2  
Cases : 1) neutre, petit sourire · 2) il parle : bouche ouverte · 3) étonné : yeux grands ouverts, petite bouche ronde · 4) déterminé : sourcils froncés, sourire en coin · 5) inquiet : sourcils relevés au centre, bouche serrée · 6) content : grand sourire, yeux plissés de joie

**SP-05 · Spirit : portraits des dialogues (Casque 2.0)**  
La même planche que « Spirit : portraits des dialogues », avec le Casque 2.0 (trésor caché du donjon 4) : seules les couleurs du casque changent. Nouvelle conversation : joins ta planche normale de cette carte, puis colle le prompt 1. Le prompt 2 sert si ChatGPT a touché autre chose que le casque.  
Même planche et même grille que la carte SP-04, seules les couleurs du casque changent.

**SP-06 · Spirit : portraits des dialogues (Casque 3.0)**  
La même planche que « Spirit : portraits des dialogues », avec le Casque 3.0 (trésor caché du donjon 7) : seules les couleurs du casque changent. Nouvelle conversation : joins ta planche normale de cette carte, puis colle le prompt 1. Le prompt 2 sert si ChatGPT a touché autre chose que le casque.  
Même planche et même grille que la carte SP-04, seules les couleurs du casque changent.

**SP-07 · Spirit lance la Manette** ✔  
Spirit qui utilise cet objet (on le reçoit dans l'étape Donjon 1). Joins ta planche de Spirit validée pour garder exactement ses proportions.  
Grille : 3 × 2  
Cases : 1) de face : bras tendu, il vient de lancer la Manette (non dessinée) · 2) de dos : bras tendu, il vient de lancer la Manette (non dessinée) · 3) de profil : bras tendu, il vient de lancer la Manette (non dessinée) · 4) la Manette qui tourne en vol, image 1 · 5) la Manette qui tourne en vol, image 2 · 6) la Manette qui tourne en vol, image 3

**SP-08 · Spirit lance la Manette (Casque 2.0)**  
La même planche que « Spirit lance la Manette », avec le Casque 2.0 (trésor caché du donjon 4) : seules les couleurs du casque changent. Nouvelle conversation : joins ta planche normale de cette carte, puis colle le prompt 1. Le prompt 2 sert si ChatGPT a touché autre chose que le casque.  
Même planche et même grille que la carte SP-07, seules les couleurs du casque changent.

**SP-09 · Spirit lance la Manette (Casque 3.0)**  
La même planche que « Spirit lance la Manette », avec le Casque 3.0 (trésor caché du donjon 7) : seules les couleurs du casque changent. Nouvelle conversation : joins ta planche normale de cette carte, puis colle le prompt 1. Le prompt 2 sert si ChatGPT a touché autre chose que le casque.  
Même planche et même grille que la carte SP-07, seules les couleurs du casque changent.

**SP-10 · Spirit tire avec le Mégaphone** ✔  
Spirit qui utilise cet objet (on le reçoit dans l'étape Donjon 1). Joins ta planche de Spirit validée pour garder exactement ses proportions.  
Grille : 3 × 2  
Cases : 1) de face : il tient le Mégaphone noir et bleu à deux mains devant lui et crie dedans · 2) de dos : il tient le Mégaphone noir et bleu à deux mains devant lui et crie dedans · 3) de profil : il tient le Mégaphone noir et bleu à deux mains devant lui et crie dedans · 4) l'onde du Mégaphone qui part, image 1 · 5) l'onde du Mégaphone qui part, image 2 · 6) l'onde du Mégaphone qui part, image 3

**SP-11 · Spirit tire avec le Mégaphone (Casque 2.0)**  
La même planche que « Spirit tire avec le Mégaphone », avec le Casque 2.0 (trésor caché du donjon 4) : seules les couleurs du casque changent. Nouvelle conversation : joins ta planche normale de cette carte, puis colle le prompt 1. Le prompt 2 sert si ChatGPT a touché autre chose que le casque.  
Même planche et même grille que la carte SP-10, seules les couleurs du casque changent.

**SP-12 · Spirit tire avec le Mégaphone (Casque 3.0)**  
La même planche que « Spirit tire avec le Mégaphone », avec le Casque 3.0 (trésor caché du donjon 7) : seules les couleurs du casque changent. Nouvelle conversation : joins ta planche normale de cette carte, puis colle le prompt 1. Le prompt 2 sert si ChatGPT a touché autre chose que le casque.  
Même planche et même grille que la carte SP-10, seules les couleurs du casque changent.

**SP-13 · Spirit monte à l'échelle** ✔  
Spirit qui utilise cet objet (on le reçoit dans l'étape Donjon 1). Joins ta planche de Spirit validée pour garder exactement ses proportions.  
Grille : 3 × 2  
Cases : 1) de face : vu de dos, il grimpe à une échelle (l'échelle n'est pas dessinée), une main en haut et un pied en haut · 2) de dos : vu de dos, il grimpe à une échelle (l'échelle n'est pas dessinée), une main en haut et un pied en haut · 3) de profil : vu de dos, il grimpe à une échelle (l'échelle n'est pas dessinée), une main en haut et un pied en haut · 4) de face, deuxième image du mouvement : vu de dos, il grimpe à une échelle (l'échelle n'est pas dessinée), une main en haut et un pied en haut · 5) de dos, deuxième image du mouvement · 6) de profil, deuxième image du mouvement

**SP-14 · Spirit monte à l'échelle (Casque 2.0)**  
La même planche que « Spirit monte à l'échelle », avec le Casque 2.0 (trésor caché du donjon 4) : seules les couleurs du casque changent. Nouvelle conversation : joins ta planche normale de cette carte, puis colle le prompt 1. Le prompt 2 sert si ChatGPT a touché autre chose que le casque.  
Même planche et même grille que la carte SP-13, seules les couleurs du casque changent.

**SP-15 · Spirit monte à l'échelle (Casque 3.0)**  
La même planche que « Spirit monte à l'échelle », avec le Casque 3.0 (trésor caché du donjon 7) : seules les couleurs du casque changent. Nouvelle conversation : joins ta planche normale de cette carte, puis colle le prompt 1. Le prompt 2 sert si ChatGPT a touché autre chose que le casque.  
Même planche et même grille que la carte SP-13, seules les couleurs du casque changent.

**SP-16 · Spirit se protège avec le Pare-feu** ✔  
Spirit qui utilise cet objet (on le reçoit dans l'étape Parvis du QG). Joins ta planche de Spirit validée pour garder exactement ses proportions.  
Grille : 3 × 2  
Cases : 1) de face : le bras tendu devant lui, le bracelet Pare-feu au poignet projette un bouclier d'énergie en hexagones cyan · 2) de dos : le bras tendu devant lui, le bracelet Pare-feu au poignet projette un bouclier d'énergie en hexagones cyan · 3) de profil : le bras tendu devant lui, le bracelet Pare-feu au poignet projette un bouclier d'énergie en hexagones cyan · 4) le bouclier en hexagones qui arrête un projectile, image 1 · 5) le bouclier en hexagones qui arrête un projectile, image 2 · 6) le bouclier en hexagones qui arrête un projectile, image 3

**SP-17 · Spirit se protège avec le Pare-feu (Casque 2.0)**  
La même planche que « Spirit se protège avec le Pare-feu », avec le Casque 2.0 (trésor caché du donjon 4) : seules les couleurs du casque changent. Nouvelle conversation : joins ta planche normale de cette carte, puis colle le prompt 1. Le prompt 2 sert si ChatGPT a touché autre chose que le casque.  
Même planche et même grille que la carte SP-16, seules les couleurs du casque changent.

**SP-18 · Spirit se protège avec le Pare-feu (Casque 3.0)**  
La même planche que « Spirit se protège avec le Pare-feu », avec le Casque 3.0 (trésor caché du donjon 7) : seules les couleurs du casque changent. Nouvelle conversation : joins ta planche normale de cette carte, puis colle le prompt 1. Le prompt 2 sert si ChatGPT a touché autre chose que le casque.  
Même planche et même grille que la carte SP-16, seules les couleurs du casque changent.

**SP-19 · Spirit pose un pétard** ✔  
Spirit qui utilise cet objet (on le reçoit dans l'étape Forêt + Donjon 2). Joins ta planche de Spirit validée pour garder exactement ses proportions.  
Grille : 3 × 2  
Cases : 1) de face : mains posées vers nous · 2) de dos : mains posées vers nous · 3) de profil : mains posées vers nous · 4) de face, deuxième image du mouvement : mains posées vers nous · 5) de dos, deuxième image du mouvement · 6) de profil, deuxième image du mouvement

**SP-20 · Spirit pose un pétard (Casque 2.0)**  
La même planche que « Spirit pose un pétard », avec le Casque 2.0 (trésor caché du donjon 4) : seules les couleurs du casque changent. Nouvelle conversation : joins ta planche normale de cette carte, puis colle le prompt 1. Le prompt 2 sert si ChatGPT a touché autre chose que le casque.  
Même planche et même grille que la carte SP-19, seules les couleurs du casque changent.

**SP-21 · Spirit pose un pétard (Casque 3.0)**  
La même planche que « Spirit pose un pétard », avec le Casque 3.0 (trésor caché du donjon 7) : seules les couleurs du casque changent. Nouvelle conversation : joins ta planche normale de cette carte, puis colle le prompt 1. Le prompt 2 sert si ChatGPT a touché autre chose que le casque.  
Même planche et même grille que la carte SP-19, seules les couleurs du casque changent.

**SP-22 · Spirit porte la Lanterne** ✔  
Spirit qui utilise cet objet (on le reçoit dans l'étape Monts + Donjon 3). Joins ta planche de Spirit validée pour garder exactement ses proportions.  
Grille : 3 × 2  
Cases : 1) de face : bras tendu vers nous · 2) de dos : bras tendu vers nous · 3) de profil : bras tendu vers nous · 4) de face, deuxième image du mouvement : bras tendu vers nous · 5) de dos, deuxième image du mouvement · 6) de profil, deuxième image du mouvement

**SP-23 · Spirit porte la Lanterne (Casque 2.0)**  
La même planche que « Spirit porte la Lanterne », avec le Casque 2.0 (trésor caché du donjon 4) : seules les couleurs du casque changent. Nouvelle conversation : joins ta planche normale de cette carte, puis colle le prompt 1. Le prompt 2 sert si ChatGPT a touché autre chose que le casque.  
Même planche et même grille que la carte SP-22, seules les couleurs du casque changent.

**SP-24 · Spirit porte la Lanterne (Casque 3.0)**  
La même planche que « Spirit porte la Lanterne », avec le Casque 3.0 (trésor caché du donjon 7) : seules les couleurs du casque changent. Nouvelle conversation : joins ta planche normale de cette carte, puis colle le prompt 1. Le prompt 2 sert si ChatGPT a touché autre chose que le casque.  
Même planche et même grille que la carte SP-22, seules les couleurs du casque changent.

**SP-25 · Spirit tire le Grappin**  
Spirit qui utilise cet objet (on le reçoit dans l'étape Désert + Donjon 4). Joins ta planche de Spirit validée pour garder exactement ses proportions.  
Grille : 3 × 2  
Cases : 1) de face : bras pointés vers nous · 2) de dos : bras pointés vers nous · 3) de profil : bras pointés vers nous · 4) de face, deuxième image du mouvement : bras pointés vers nous · 5) de dos, deuxième image du mouvement · 6) de profil, deuxième image du mouvement

**SP-26 · Spirit tire le Grappin (Casque 2.0)**  
La même planche que « Spirit tire le Grappin », avec le Casque 2.0 (trésor caché du donjon 4) : seules les couleurs du casque changent. Nouvelle conversation : joins ta planche normale de cette carte, puis colle le prompt 1. Le prompt 2 sert si ChatGPT a touché autre chose que le casque.  
Même planche et même grille que la carte SP-25, seules les couleurs du casque changent.

**SP-27 · Spirit tire le Grappin (Casque 3.0)**  
La même planche que « Spirit tire le Grappin », avec le Casque 3.0 (trésor caché du donjon 7) : seules les couleurs du casque changent. Nouvelle conversation : joins ta planche normale de cette carte, puis colle le prompt 1. Le prompt 2 sert si ChatGPT a touché autre chose que le casque.  
Même planche et même grille que la carte SP-25, seules les couleurs du casque changent.

**SP-28 · Spirit tiré par le Grappin**  
Spirit qui utilise cet objet (on le reçoit dans l'étape Désert + Donjon 4). Joins ta planche de Spirit validée pour garder exactement ses proportions.  
Grille : 3 × 2  
Cases : 1) de face : Spirit vu de profil (tourné vers la droite), en l'air, bras tendus devant lui qui tiennent le Câble Grappin, jambes flottant derrière, casque bien en place, air concentré. · 2) de dos : Spirit vu de profil (tourné vers la droite), en l'air, bras tendus devant lui qui tiennent le Câble Grappin, jambes flottant derrière, casque bien en place, air concentré. · 3) de profil : Spirit vu de profil (tourné vers la droite), en l'air, bras tendus devant lui qui tiennent le Câble Grappin, jambes flottant derrière, casque bien en place, air concentré. · 4) de face, deuxième image du mouvement : Spirit vu de profil (tourné vers la droite), en l'air, bras tendus devant lui qui tiennent le Câble Grappin, jambes flottant derrière, casque bien en place, air concentré. · 5) de dos, deuxième image du mouvement · 6) de profil, deuxième image du mouvement

**SP-29 · Spirit tiré par le Grappin (Casque 2.0)**  
La même planche que « Spirit tiré par le Grappin », avec le Casque 2.0 (trésor caché du donjon 4) : seules les couleurs du casque changent. Nouvelle conversation : joins ta planche normale de cette carte, puis colle le prompt 1. Le prompt 2 sert si ChatGPT a touché autre chose que le casque.  
Même planche et même grille que la carte SP-28, seules les couleurs du casque changent.

**SP-30 · Spirit tiré par le Grappin (Casque 3.0)**  
La même planche que « Spirit tiré par le Grappin », avec le Casque 3.0 (trésor caché du donjon 7) : seules les couleurs du casque changent. Nouvelle conversation : joins ta planche normale de cette carte, puis colle le prompt 1. Le prompt 2 sert si ChatGPT a touché autre chose que le casque.  
Même planche et même grille que la carte SP-28, seules les couleurs du casque changent.

**SP-31 · Spirit sur la Planche Wi-Fi**  
Spirit qui utilise cet objet (on le reçoit dans l'étape Lac + Donjon 5). Joins ta planche de Spirit validée pour garder exactement ses proportions.  
Grille : 3 × 2  
Cases : 1) de face : planche vue de face · 2) de dos : planche vue de face · 3) de profil : planche vue de face · 4) de face, deuxième image du mouvement : planche vue de face · 5) de dos, deuxième image du mouvement · 6) de profil, deuxième image du mouvement

**SP-32 · Spirit sur la Planche Wi-Fi (Casque 2.0)**  
La même planche que « Spirit sur la Planche Wi-Fi », avec le Casque 2.0 (trésor caché du donjon 4) : seules les couleurs du casque changent. Nouvelle conversation : joins ta planche normale de cette carte, puis colle le prompt 1. Le prompt 2 sert si ChatGPT a touché autre chose que le casque.  
Même planche et même grille que la carte SP-31, seules les couleurs du casque changent.

**SP-33 · Spirit sur la Planche Wi-Fi (Casque 3.0)**  
La même planche que « Spirit sur la Planche Wi-Fi », avec le Casque 3.0 (trésor caché du donjon 7) : seules les couleurs du casque changent. Nouvelle conversation : joins ta planche normale de cette carte, puis colle le prompt 1. Le prompt 2 sert si ChatGPT a touché autre chose que le casque.  
Même planche et même grille que la carte SP-31, seules les couleurs du casque changent.

**SP-34 · Spirit fonce avec les Baskets Turbo**  
Spirit qui utilise cet objet (on le reçoit dans l'étape Cité + Donjon 6). Joins ta planche de Spirit validée pour garder exactement ses proportions.  
Grille : 3 × 2  
Cases : 1) de face : il fonce vers nous · 2) de dos : il fonce vers nous · 3) de profil : il fonce vers nous · 4) de face, deuxième image du mouvement : il fonce vers nous · 5) de dos, deuxième image du mouvement · 6) de profil, deuxième image du mouvement

**SP-35 · Spirit fonce avec les Baskets Turbo (Casque 2.0)**  
La même planche que « Spirit fonce avec les Baskets Turbo », avec le Casque 2.0 (trésor caché du donjon 4) : seules les couleurs du casque changent. Nouvelle conversation : joins ta planche normale de cette carte, puis colle le prompt 1. Le prompt 2 sert si ChatGPT a touché autre chose que le casque.  
Même planche et même grille que la carte SP-34, seules les couleurs du casque changent.

**SP-36 · Spirit fonce avec les Baskets Turbo (Casque 3.0)**  
La même planche que « Spirit fonce avec les Baskets Turbo », avec le Casque 3.0 (trésor caché du donjon 7) : seules les couleurs du casque changent. Nouvelle conversation : joins ta planche normale de cette carte, puis colle le prompt 1. Le prompt 2 sert si ChatGPT a touché autre chose que le casque.  
Même planche et même grille que la carte SP-34, seules les couleurs du casque changent.

**SP-37 · Spirit utilise l'Aimant**  
Spirit qui utilise cet objet (on le reçoit dans l'étape Marais + Donjon 7). Joins ta planche de Spirit validée pour garder exactement ses proportions.  
Grille : 3 × 2  
Cases : 1) de face : bras tendus vers nous · 2) de dos : bras tendus vers nous · 3) de profil : bras tendus vers nous · 4) de face, deuxième image du mouvement : bras tendus vers nous · 5) de dos, deuxième image du mouvement · 6) de profil, deuxième image du mouvement

**SP-38 · Spirit utilise l'Aimant (Casque 2.0)**  
La même planche que « Spirit utilise l'Aimant », avec le Casque 2.0 (trésor caché du donjon 4) : seules les couleurs du casque changent. Nouvelle conversation : joins ta planche normale de cette carte, puis colle le prompt 1. Le prompt 2 sert si ChatGPT a touché autre chose que le casque.  
Même planche et même grille que la carte SP-37, seules les couleurs du casque changent.

**SP-39 · Spirit utilise l'Aimant (Casque 3.0)**  
La même planche que « Spirit utilise l'Aimant », avec le Casque 3.0 (trésor caché du donjon 7) : seules les couleurs du casque changent. Nouvelle conversation : joins ta planche normale de cette carte, puis colle le prompt 1. Le prompt 2 sert si ChatGPT a touché autre chose que le casque.  
Même planche et même grille que la carte SP-37, seules les couleurs du casque changent.

**SP-40 · Spirit avec les Lunettes de Vérif**  
Spirit qui utilise cet objet (on le reçoit dans l'étape Toundra + Donjon 8). Joins ta planche de Spirit validée pour garder exactement ses proportions.  
Grille : 3 × 2  
Cases : 1) de face : de face · 2) de dos : de face · 3) de profil : de face · 4) de face, deuxième image du mouvement : de face · 5) de dos, deuxième image du mouvement · 6) de profil, deuxième image du mouvement

**SP-41 · Spirit avec les Lunettes de Vérif (Casque 2.0)**  
La même planche que « Spirit avec les Lunettes de Vérif », avec le Casque 2.0 (trésor caché du donjon 4) : seules les couleurs du casque changent. Nouvelle conversation : joins ta planche normale de cette carte, puis colle le prompt 1. Le prompt 2 sert si ChatGPT a touché autre chose que le casque.  
Même planche et même grille que la carte SP-40, seules les couleurs du casque changent.

**SP-42 · Spirit avec les Lunettes de Vérif (Casque 3.0)**  
La même planche que « Spirit avec les Lunettes de Vérif », avec le Casque 3.0 (trésor caché du donjon 7) : seules les couleurs du casque changent. Nouvelle conversation : joins ta planche normale de cette carte, puis colle le prompt 1. Le prompt 2 sert si ChatGPT a touché autre chose que le casque.  
Même planche et même grille que la carte SP-40, seules les couleurs du casque changent.

**SP-43 · Spirit glisse sur la glace**  
Spirit qui utilise cet objet (on le reçoit dans l'étape Toundra + Donjon 8). Joins ta planche de Spirit validée pour garder exactement ses proportions.  
Grille : 3 × 2  
Cases : 1) de face : bras écartés, jambes raides, légèrement déséquilibré · 2) de dos : bras écartés, jambes raides, légèrement déséquilibré · 3) de profil : bras écartés, jambes raides, légèrement déséquilibré · 4) de face, deuxième image du mouvement : bras écartés, jambes raides, légèrement déséquilibré · 5) de dos, deuxième image du mouvement · 6) de profil, deuxième image du mouvement

**SP-44 · Spirit glisse sur la glace (Casque 2.0)**  
La même planche que « Spirit glisse sur la glace », avec le Casque 2.0 (trésor caché du donjon 4) : seules les couleurs du casque changent. Nouvelle conversation : joins ta planche normale de cette carte, puis colle le prompt 1. Le prompt 2 sert si ChatGPT a touché autre chose que le casque.  
Même planche et même grille que la carte SP-43, seules les couleurs du casque changent.

**SP-45 · Spirit glisse sur la glace (Casque 3.0)**  
La même planche que « Spirit glisse sur la glace », avec le Casque 3.0 (trésor caché du donjon 7) : seules les couleurs du casque changent. Nouvelle conversation : joins ta planche normale de cette carte, puis colle le prompt 1. Le prompt 2 sert si ChatGPT a touché autre chose que le casque.  
Même planche et même grille que la carte SP-43, seules les couleurs du casque changent.

### Prologue (le QG, la nuit)

**PRO-01 · Intérieur du QG : sols, murs et portes** ✔  
Les tuiles de sol de 20 × 20 pixels : je construis tous les écrans avec. Les bords s'emboîtent : garde toute la planche dans la même conversation.  
Grille : 12 × 8  
Cases : 1) parquet clair, tuile de base qui se répète sans raccord visible · 2) parquet clair, variante avec quelques détails · 3) parquet clair, deuxième variante · 4) parquet clair, variante avec de petites fleurs ou petits détails colorés · 5) tapis bleu nuit à motif discret, tuile de base qui se répète sans raccord · 6) tapis bleu nuit à motif discret, variante · 7) reflet de lumière sur le parquet, tuile qui se répète (image 1 de l'animation) · 8) reflet de lumière sur le parquet, même tuile avec les reflets décalés (image 2) · 9) reflet de lumière sur le parquet, image 3 · 10) bord haut gauche d'une zone de tapis bleu nuit à motif discret entourée de parquet clair · 11) bord haut d'une zone de tapis bleu nuit à motif discret · 12) bord haut droit d'une zone de tapis bleu nuit à motif discret · 13) bord gauche d'une zone de tapis bleu nuit à motif discret · 14) bord droit d'une zone de tapis bleu nuit à motif discret · 15) bord bas gauche d'une zone de tapis bleu nuit à motif discret · 16) bord bas d'une zone de tapis bleu nuit à motif discret · 17) bord bas droit d'une zone de tapis bleu nuit à motif discret · 18) coin intérieur haut gauche : tapis bleu nuit à motif discret partout sauf un petit coin de parquet clair en haut à gauche · 19) coin intérieur haut droit · 20) coin intérieur bas gauche · 21) coin intérieur bas droit · 22) berge haut gauche d'une étendue de reflet de lumière sur le parquet entourée de parquet clair · 23) berge haute · 24) berge haut droite · 25) berge gauche · 26) berge droite · 27) berge bas gauche · 28) berge basse · 29) berge bas droite · 30) coin intérieur de berge haut gauche · 31) coin intérieur de berge haut droit · 32) coin intérieur de berge bas gauche · 33) coin intérieur de berge bas droit · 34) mur en gros blocs de pierre gris-bleu : haut de falaise, bord gauche · 35) mur en gros blocs de pierre gris-bleu : haut de falaise, bord du milieu · 36) mur en gros blocs de pierre gris-bleu : haut de falaise, bord droit · 37) mur en gros blocs de pierre gris-bleu : paroi, côté gauche · 38) mur en gros blocs de pierre gris-bleu : paroi, milieu · 39) mur en gros blocs de pierre gris-bleu : paroi, côté droit · 40) mur en gros blocs de pierre gris-bleu : pied de paroi, gauche · 41) mur en gros blocs de pierre gris-bleu : pied de paroi, milieu · 42) mur en gros blocs de pierre gris-bleu : pied de paroi, droit · 43) double porte vitrée : moitié haut gauche (l'entrée fait 2 × 2 tuiles, creusée dans la paroi) · 44) double porte vitrée : moitié haut droite · 45) double porte vitrée : moitié bas gauche, avec l'ouverture sombre · 46) double porte vitrée : moitié bas droite · 47) des marches d'escalier, vues de dessus · 48) mur du haut en gros blocs de pierre gris-bleu avec une applique carrée en verre dépoli qui diffuse une lumière chaude (2 tuiles de haut : cette case est le haut) · 49) le bas du même mur · 50) coin de mur haut gauche · 51) coin de mur haut droit · 52) double porte en bois foncé à panneaux de verre dépoli, fermée, vue de face dans le mur du haut (partie gauche) · 53) même double porte fermée (partie droite) · 54) même double porte ouverte : les deux battants repliés contre l'encadrement (partie gauche) · 55) même double porte ouverte (partie droite)

**PRO-02 · Ta loge : les meubles** ✔  
Les meubles de ta loge, posés sur le sol par le jeu.  
Grille : 6 × 4  
Cases : 1) un long bureau noir vu de dessus avec trois écrans éteints (occupe toute la case) · 2) le même bureau, écrans allumés : un jeu en pause à gauche, un tchat au milieu, le logo SG en veille sur l'écran incurvé de droite · 3) le même bureau, les trois écrans envahis par une pub rouge et violette avec un visage jaune souriant · 4) le même bureau, l'écran de droite brouillé de parasites, logo SG déformé · 5) un fauteuil gamer bordeaux et beige vu de dessus · 6) une bibliothèque en bois clair pleine de figurines (chouette blanche, petites créatures, château de sorciers en briques), vue de face · 7) une deuxième bibliothèque, livres et figurines à grosse tête · 8) un petit bureau noir encombré (lampe, présentoirs, post-it) · 9) une bouteille de soda posée sur le bureau (objet seul, petite) · 10) un balai de sorcier qui flotte (objet seul) · 11) un paillasson noir · 12) le vortex dans l'encadrement de la porte : tourbillon bleu, cyan et blanc (image 1) · 13) vortex, image 2 · 14) vortex, image 3

**PRO-03 · Le couloir, le bureau de Mika et le hall : meubles** ✔  
Les meubles des autres pièces du QG.  
Grille : 6 × 4  
Cases : 1) bureau de Mika : un bureau en bois avec deux écrans affichant un jeu en ligne figé · 2) le même bureau, écrans envahis par la pub du Roi · 3) une grande bibliothèque pleine de livres · 4) une vitrine de figurines · 5) un fauteuil de bureau noir · 6) un tapis rond · 7) hall : un long comptoir d'accueil blanc et bleu nuit · 8) un écran noir avec le logo SpiritGamer · 9) une plante verte en pot · 10) un bureau de rédaction avec ordinateur · 11) les grandes portes du QG, fermées (partie gauche) · 12) les grandes portes du QG, fermées (partie droite) · 13) un cadre de jeu vidéo au mur (image sans texte) · 14) une fontaine à eau

**PRO-04 · Mika et Gus** ✔  
Les personnages qui marchent et parlent. Toute la planche est remplie : deux rangées par personnage quand il y en a deux, une rangée quand il y en a quatre.  
Grille : 6 × 4  
Cases : 1) Mika (un lynx à lunettes, barbe, tee-shirt gris, jean, qui porte des livres ; il se prend pour le boss) de face, immobile · 2) Mika de face, pied gauche en avant · 3) Mika de face, pied droit en avant · 4) Mika de dos, immobile · 5) Mika de dos, pied gauche en avant · 6) Mika de dos, pied droit en avant · 7) Mika de profil, immobile · 8) Mika de profil, jambe avant tendue · 9) Mika de profil, jambes croisées (pas de passage) · 10) Mika de face : bras croisés, air de chef · 11) Mika de face, il parle : bouche ouverte, une main levée · 12) Mika de face, surpris : yeux grands ouverts, bras écartés · 13) Gus (un vieux blaireau à lunettes rondes, barbe blanche, gilet marron, cravate rouge, une tasse à la main) de face, immobile · 14) Gus de face, pied gauche en avant · 15) Gus de face, pied droit en avant · 16) Gus de dos, immobile · 17) Gus de dos, pied gauche en avant · 18) Gus de dos, pied droit en avant · 19) Gus de profil, immobile · 20) Gus de profil, jambe avant tendue · 21) Gus de profil, jambes croisées (pas de passage) · 22) Gus de face : il boit son café · 23) Gus de face, il parle : bouche ouverte, une main levée · 24) Gus de face, surpris : yeux grands ouverts, bras écartés

**PRO-05 · Mika et Gus : portraits** ✔  
Les portraits affichés à côté du texte des dialogues.  
Grille : 3 × 2  
Cases : 1) portrait de Mika : buste et tête de face, expression neutre · 2) portrait de Mika : buste et tête de face, il parle, bouche ouverte, expression vive · 3) portrait de Mika : buste et tête de face, content, grand sourire · 4) portrait de Gus : buste et tête de face, expression neutre · 5) portrait de Gus : buste et tête de face, il parle, bouche ouverte, expression vive · 6) portrait de Gus : buste et tête de face, content, grand sourire

**PRO-06 · Les images de l'introduction** ✔  
Les 6 tableaux de l'histoire du début, en pixel art. Une nouvelle conversation, les 6 images une par une.  
Cases : 1) La fête des 11 ans : la grande place devant le QG, la nuit, guirlandes bleues, écrans géants, une foule de petits personnages animaux qui dansent, au centre une sphère de lumière blanche et cyan (la Source) au-dessus d'une fontaine. · 2) L'irruption : une fenêtre publicitaire géante s'ouvre dans le ciel et le Roi Clickbait en sort. La foule recule. · 3) La Source brisée : la sphère éclate en huit fragments lumineux qui partent dans huit directions. · 4) Le Bruit prend corps : la place déserte, des monstres sombres aux fissures violettes et aux yeux jaunes sortent des écrans cassés. · 5) Pendant ce temps, dans sa loge : Spirit dort dans son fauteuil devant ses écrans, casque sur les oreilles. · 6) Le réveil : Spirit se redresse dans son fauteuil, la main sur le casque, l'air étonné.

### Plaine des Pixels

**PL-01 · Plaine : tuiles de sol** ✔  
Les tuiles de sol de 20 × 20 pixels : je construis tous les écrans avec. Les bords s'emboîtent : garde toute la planche dans la même conversation.  
Grille : 12 × 8  
Cases : 1) herbe verte vive, tuile de base qui se répète sans raccord visible · 2) herbe verte vive, variante avec quelques détails · 3) herbe verte vive, deuxième variante · 4) herbe verte vive, variante avec de petites fleurs ou petits détails colorés · 5) chemin de terre beige, tuile de base qui se répète sans raccord · 6) chemin de terre beige, variante · 7) eau bleue claire, tuile qui se répète (image 1 de l'animation) · 8) eau bleue claire, même tuile avec les reflets décalés (image 2) · 9) eau bleue claire, image 3 · 10) bord haut gauche d'une zone de chemin de terre beige entourée de herbe verte vive · 11) bord haut d'une zone de chemin de terre beige · 12) bord haut droit d'une zone de chemin de terre beige · 13) bord gauche d'une zone de chemin de terre beige · 14) bord droit d'une zone de chemin de terre beige · 15) bord bas gauche d'une zone de chemin de terre beige · 16) bord bas d'une zone de chemin de terre beige · 17) bord bas droit d'une zone de chemin de terre beige · 18) coin intérieur haut gauche : chemin de terre beige partout sauf un petit coin de herbe verte vive en haut à gauche · 19) coin intérieur haut droit · 20) coin intérieur bas gauche · 21) coin intérieur bas droit · 22) berge haut gauche d'une étendue de eau bleue claire entourée de herbe verte vive · 23) berge haute · 24) berge haut droite · 25) berge gauche · 26) berge droite · 27) berge bas gauche · 28) berge basse · 29) berge bas droite · 30) coin intérieur de berge haut gauche · 31) coin intérieur de berge haut droit · 32) coin intérieur de berge bas gauche · 33) coin intérieur de berge bas droit · 34) falaise de terre et de roche brune : haut de falaise, bord gauche · 35) falaise de terre et de roche brune : haut de falaise, bord du milieu · 36) falaise de terre et de roche brune : haut de falaise, bord droit · 37) falaise de terre et de roche brune : paroi, côté gauche · 38) falaise de terre et de roche brune : paroi, milieu · 39) falaise de terre et de roche brune : paroi, côté droit · 40) falaise de terre et de roche brune : pied de paroi, gauche · 41) falaise de terre et de roche brune : pied de paroi, milieu · 42) falaise de terre et de roche brune : pied de paroi, droit · 43) entrée de grotte : moitié haut gauche (l'entrée fait 2 × 2 tuiles, creusée dans la paroi) · 44) entrée de grotte : moitié haut droite · 45) entrée de grotte : moitié bas gauche, avec l'ouverture sombre · 46) entrée de grotte : moitié bas droite · 47) des marches d'escalier, vues de dessus · 48) herbe avec de petites fleurs blanches · 49) herbe avec de petites fleurs jaunes

**PL-02 · Plaine : décor posé** ✔  
Arbres, buissons, rochers : tout ce qui est posé sur l'herbe. Chaque élément qu'on coupe a sa version coupée.  
Grille : 6 × 4  
Cases : 1) un grand arbre rond au feuillage en grappes, tronc brun (il occupe toute la case, 2 × 2 tuiles) · 2) un deuxième arbre, plus sombre · 3) un buisson vert vif rond (on le coupe) · 4) le même buisson coupé : petite base rase, jamais un moignon · 5) une touffe de hautes herbes (on la coupe) · 6) les mêmes hautes herbes coupées : herbe rase · 7) un rocher gris · 8) un rocher gris fissuré (fissure bien visible) · 9) un amas de deux rochers · 10) un panneau de bois, sans texte · 11) l'entrée de la grotte de l'ermite : amas de rochers gris avec une ouverture sombre (occupe toute la case) · 12) l'entrée du Terrier des Pop-ups : même amas de rochers mais sombre, fissures violettes, ouverture violette · 13) la barrière de Bruit fermée : un mur d'énergie violet et rouge fait de fenêtres pub brisées entre deux bornes de pierre (toute la case) · 14) la même barrière qui se dissipe en carrés lumineux · 15) reflet qui scintille sur l'eau (petites étincelles blanches), image 1 · 16) reflet, image 2 · 17) ronds dans l'eau, image 1 · 18) ronds dans l'eau, image 2 · 19) le sol qui se fend quand un monstre sort de terre, image 1 · 20) image 2 : mottes de terre qui sautent · 21) le trou qui reste · 22) le trou qui se referme

**PL-03 · Crache-pierres** ✔  
Toutes les images de ce monstre sur une seule planche.  
Grille : 6 × 4  
Cases : 1) de face, immobile · 2) de face, pied gauche en avant · 3) de face, pied droit en avant · 4) de dos, immobile · 5) de dos, pied gauche en avant · 6) de dos, pied droit en avant · 7) de profil, immobile · 8) de profil, pied gauche en avant · 9) de profil, pied droit en avant · 10) de face, il attaque · 11) de dos, il attaque · 12) de profil, il attaque · 13) de face, touché : il recule, yeux plissés · 14) de dos, touché · 15) de profil, touché · 16) il apparaît (il sort de terre ou se matérialise), image 1 : presque rien · 17) apparition, image 2 : à moitié là · 18) apparition, image 3 : presque entier · 19) son projectile en vol : un caillou gris sombre fissuré de violet · 20) le même projectile, deuxième image du vol · 21) le projectile qui éclate à l'impact · 22) il disparaît : il éclate en petits carrés violets et en fumée (image 1) · 23) image 2 de la disparition, plus éclatée · 24) image 3, presque rien

**PL-04 · Cornu** ✔  
Toutes les images de ce monstre sur une seule planche.  
Grille : 6 × 4  
Cases : 1) de face, immobile · 2) de face, pied gauche en avant · 3) de face, pied droit en avant · 4) de dos, immobile · 5) de dos, pied gauche en avant · 6) de dos, pied droit en avant · 7) de profil, immobile · 8) de profil, pied gauche en avant · 9) de profil, pied droit en avant · 10) de face, il attaque · 11) de dos, il attaque · 12) de profil, il attaque · 13) de face, touché : il recule, yeux plissés · 14) de dos, touché · 15) de profil, touché · 16) il apparaît (il sort de terre ou se matérialise), image 1 : presque rien · 17) apparition, image 2 : à moitié là · 18) apparition, image 3 : presque entier · 19) son projectile en vol : une lance qui file, pointe en avant · 20) le même projectile, deuxième image du vol · 21) le projectile qui éclate à l'impact · 22) il disparaît : il éclate en petits carrés violets et en fumée (image 1) · 23) image 2 de la disparition, plus éclatée · 24) image 3, presque rien

**PL-05 · Grésille** ✔  
Toutes les images de ce monstre sur une seule planche.  
Grille : 6 × 4  
Cases : 1) de face, immobile · 2) de face, étiré vers le haut · 3) de face, tassé vers le bas · 4) de dos, immobile · 5) de dos, étiré vers le haut · 6) de dos, tassé vers le bas · 7) de profil, immobile · 8) de profil, étiré vers le haut · 9) de profil, tassé vers le bas · 10) de face, il attaque · 11) de dos, il attaque · 12) de profil, il attaque · 13) de face, touché : il recule, yeux plissés · 14) de dos, touché · 15) de profil, touché · 16) il apparaît (il sort de terre ou se matérialise), image 1 : presque rien · 17) apparition, image 2 : à moitié là · 18) apparition, image 3 : presque entier · 19) l'effet de son attaque (souffle, choc ou éclair, dans ses couleurs), image 1 · 20) l'effet de son attaque, image 2 · 21) l'effet de son attaque, image 3 · 22) il disparaît : il éclate en petits carrés violets et en fumée (image 1) · 23) image 2 de la disparition, plus éclatée · 24) image 3, presque rien

**PL-06 · L'ermite** ✔  
Les personnages qui marchent et parlent. Toute la planche est remplie : deux rangées par personnage quand il y en a deux, une rangée quand il y en a quatre.  
Grille : 6 × 4  
Cases : 1) l'ermite (un vieil ermite sous une grande cape grise à capuche, yeux bleus lumineux dans l'ombre, longue barbe blanche, bâton de bois surmonté d'une pierre bleue) de face, immobile · 2) l'ermite de face, pied gauche en avant · 3) l'ermite de face, pied droit en avant · 4) l'ermite de dos, immobile · 5) l'ermite de dos, pied gauche en avant · 6) l'ermite de dos, pied droit en avant · 7) l'ermite de profil, immobile · 8) l'ermite de profil, jambe avant tendue · 9) l'ermite de profil, jambes croisées (pas de passage) · 10) l'ermite de face : il lève son bâton · 11) l'ermite de face, il parle : bouche ouverte, une main levée · 12) l'ermite de face, surpris : yeux grands ouverts, bras écartés · 13) l'ermite de face, il salue de la main · 14) l'ermite de face, il donne un objet : mains tendues vers nous (l'objet n'est pas dessiné) · 15) l'ermite de face, il réfléchit, une main au menton · 16) l'ermite de face, il rit · 17) l'ermite de face, triste, tête basse · 18) l'ermite de face, fâché · 19) l'ermite de profil, il parle · 20) l'ermite de profil, il montre quelque chose vers la droite · 21) l'ermite de dos, il lève la tête · 22) l'ermite assis par terre, de face · 23) l'ermite de face, il sursaute · 24) l'ermite de face, il somnole debout, yeux fermés

**PL-07 · L'ermite : portraits** ✔  
Les portraits affichés à côté du texte des dialogues.  
Grille : 3 × 2  
Cases : 1) portrait de l'ermite : buste et tête de face, expression neutre · 2) portrait de l'ermite : buste et tête de face, il parle, bouche ouverte, expression vive · 3) portrait de l'ermite : buste et tête de face, content, grand sourire · 4) portrait de l'ermite : buste et tête de face, surpris, yeux grands ouverts · 5) portrait de l'ermite : buste et tête de face, fâché, sourcils froncés · 6) portrait de l'ermite : buste et tête de face, inquiet, sourcils relevés

**PL-08 · La grotte de l'ermite : intérieur** ✔  
Les tuiles de l'intérieur de la grotte (20 × 20 pixels).  
Grille : 12 × 8  
Cases : 1) sol de terre battue de la grotte (se répète) · 2) variante du sol · 3) mur de roche sombre vu de dessus (se répète) · 4) paroi de roche vue de face (bas du mur) · 5) coin de mur haut gauche · 6) coin de mur haut droit · 7) feu de camp, image 1 · 8) feu de camp, image 2 · 9) feu de camp, image 3 · 10) une caisse en bois · 11) un tonneau · 12) une natte au sol

**PL-09 · Objets, cœurs, Pixels et interface** ✔  
Tout ce qui s'affiche dans le bandeau du haut et ce qu'on ramasse.  
Grille : 6 × 4  
Cases : 1) un cœur plein rouge · 2) un demi-cœur · 3) un cœur vide (contour) · 4) un Pixel bleu : petit cristal carré bleu (monnaie, vaut 1) · 5) un Pixel rose (vaut 5) · 6) un Pixel doré (vaut 20) · 7) l'Ampli : petit boîtier bleu nuit à grille cyan qui se branche sur le casque · 8) la Manette Retour : manette de jeu bleue · 9) un fragment de cœur (un quart de cœur) · 10) un réceptacle de cœur (grand cœur doré) · 11) une petite clé · 12) la grande clé du boss · 13) la carte du donjon (parchemin roulé) · 14) la boussole · 15) une fiole de soin rouge · 16) une fiole vide · 17) le Pare-feu : bracelet bleu nuit à bande cyan · 18) le bouclier d'énergie en hexagones cyan, vu de face · 19) l'onde sonore de l'Ampli vue de dessus, image 1 : trois arcs cyan qui partent vers la droite · 20) l'onde, image 2, plus large · 21) l'onde, image 3, qui s'estompe · 22) petite étincelle blanche (coup qui touche) · 23) feuilles coupées qui volent · 24) nuage de fumée quand un monstre disparaît

### Donjon 1 : Terrier des Pop-ups

**D1-01 · Terrier des Pop-ups : sols et murs** ✔  
Les tuiles de sol de 20 × 20 pixels : je construis tous les écrans avec. Les bords s'emboîtent : garde toute la planche dans la même conversation.  
Grille : 12 × 8  
Cases : 1) dalles de pierre du donjon (pierre sombre bleu-violet fissurée de violet, technologie maléfique, câbles), tuile de base qui se répète sans raccord visible · 2) dalles de pierre du donjon (pierre sombre bleu-violet fissurée de violet, technologie maléfique, câbles), variante avec quelques détails · 3) dalles de pierre du donjon (pierre sombre bleu-violet fissurée de violet, technologie maléfique, câbles), deuxième variante · 4) dalles de pierre du donjon (pierre sombre bleu-violet fissurée de violet, technologie maléfique, câbles), variante avec de petites fleurs ou petits détails colorés · 5) sol plus clair d'un couloir, tuile de base qui se répète sans raccord · 6) sol plus clair d'un couloir, variante · 7) trou sans fond (vide noir), tuile qui se répète (image 1 de l'animation) · 8) trou sans fond (vide noir), même tuile avec les reflets décalés (image 2) · 9) trou sans fond (vide noir), image 3 · 10) bord haut gauche d'une zone de sol plus clair d'un couloir entourée de dalles de pierre du donjon (pierre sombre bleu-violet fissurée de violet, technologie maléfique, câbles) · 11) bord haut d'une zone de sol plus clair d'un couloir · 12) bord haut droit d'une zone de sol plus clair d'un couloir · 13) bord gauche d'une zone de sol plus clair d'un couloir · 14) bord droit d'une zone de sol plus clair d'un couloir · 15) bord bas gauche d'une zone de sol plus clair d'un couloir · 16) bord bas d'une zone de sol plus clair d'un couloir · 17) bord bas droit d'une zone de sol plus clair d'un couloir · 18) coin intérieur haut gauche : sol plus clair d'un couloir partout sauf un petit coin de dalles de pierre du donjon (pierre sombre bleu-violet fissurée de violet, technologie maléfique, câbles) en haut à gauche · 19) coin intérieur haut droit · 20) coin intérieur bas gauche · 21) coin intérieur bas droit · 22) berge haut gauche d'une étendue de trou sans fond (vide noir) entourée de dalles de pierre du donjon (pierre sombre bleu-violet fissurée de violet, technologie maléfique, câbles) · 23) berge haute · 24) berge haut droite · 25) berge gauche · 26) berge droite · 27) berge bas gauche · 28) berge basse · 29) berge bas droite · 30) coin intérieur de berge haut gauche · 31) coin intérieur de berge haut droit · 32) coin intérieur de berge bas gauche · 33) coin intérieur de berge bas droit · 34) mur épais du donjon (pierre sombre bleu-violet fissurée de violet, technologie maléfique, câbles) : haut de falaise, bord gauche · 35) mur épais du donjon (pierre sombre bleu-violet fissurée de violet, technologie maléfique, câbles) : haut de falaise, bord du milieu · 36) mur épais du donjon (pierre sombre bleu-violet fissurée de violet, technologie maléfique, câbles) : haut de falaise, bord droit · 37) mur épais du donjon (pierre sombre bleu-violet fissurée de violet, technologie maléfique, câbles) : paroi, côté gauche · 38) mur épais du donjon (pierre sombre bleu-violet fissurée de violet, technologie maléfique, câbles) : paroi, milieu · 39) mur épais du donjon (pierre sombre bleu-violet fissurée de violet, technologie maléfique, câbles) : paroi, côté droit · 40) mur épais du donjon (pierre sombre bleu-violet fissurée de violet, technologie maléfique, câbles) : pied de paroi, gauche · 41) mur épais du donjon (pierre sombre bleu-violet fissurée de violet, technologie maléfique, câbles) : pied de paroi, milieu · 42) mur épais du donjon (pierre sombre bleu-violet fissurée de violet, technologie maléfique, câbles) : pied de paroi, droit · 43) porte du donjon : moitié haut gauche (l'entrée fait 2 × 2 tuiles, creusée dans la paroi) · 44) porte du donjon : moitié haut droite · 45) porte du donjon : moitié bas gauche, avec l'ouverture sombre · 46) porte du donjon : moitié bas droite · 47) des marches d'escalier, vues de dessus

**D1-02 · Terrier des Pop-ups : portes** ✔  
Chaque porte dans tous ses états. La porte est dessinée dans l'épaisseur du mur, comme un tunnel.  
Grille : 6 × 4  
Cases : 1) porte du mur du haut, ouverte · 2) porte du mur du haut, fermée par une grille · 3) porte du mur du haut, verrouillée par une serrure dorée · 4) porte du mur du haut, porte du boss, ornée et menaçante · 5) porte du mur du haut, murée (mur plein) · 6) porte du mur du haut, fissurée (on peut la faire sauter) · 7) porte du mur du bas, ouverte · 8) porte du mur du bas, fermée par une grille · 9) porte du mur du bas, verrouillée · 10) porte du mur du bas, porte du boss · 11) porte du mur du bas, murée · 12) porte du mur du bas, fissurée · 13) porte du mur de gauche, ouverte · 14) porte du mur de gauche, fermée par une grille · 15) porte du mur de gauche, verrouillée · 16) porte du mur de gauche, porte du boss · 17) porte du mur de gauche, murée · 18) porte du mur de gauche, fissurée · 19) porte du mur de droite, ouverte · 20) porte du mur de droite, fermée par une grille · 21) porte du mur de droite, verrouillée · 22) porte du mur de droite, porte du boss · 23) porte du mur de droite, murée · 24) porte du mur de droite, fissurée

**D1-03 · Terrier des Pop-ups : objets et mécanismes** ✔  
Tout ce qui est posé dans les salles, à la même échelle.  
Grille : 6 × 4  
Cases : 1) un bloc à pousser, même pierre que les murs · 2) une statue gardienne sur socle (toutes les statues sont identiques, même celle qu'on peut pousser) · 3) un brasero de pierre sombre, éteinte · 4) un brasero de pierre sombre, allumée, image 1 · 5) un brasero de pierre sombre, allumée, image 2 · 6) un pot fermé · 7) le pot qui se brise · 8) un coffre fermé · 9) le même coffre ouvert, vide · 10) un grand coffre (celui de l'objet du donjon), fermé · 11) le grand coffre ouvert · 12) une plaque de pression au sol · 13) la même plaque enfoncée · 14) un cristal éteint sur socle (il réagit à la Manette) · 15) le même cristal allumé · 16) un escalier qui descend · 17) une échelle · 18) le socle de l'objet · 19) une longue bannière publicitaire horizontale en métal sombre qui flotte, bords déchirés, surface qui clignote en violet et rouge sombre, sans aucun texte. Format paysage 4:1. · 20) une petite bulle ronde rouge sombre avec un point lumineux au centre, entourée d'un anneau violet, prête à exploser (projectile). · 21) boîtier de métal sombre fixé au mur, grosse manette abaissée, voyant rouge éteint. · 22) Le même disjoncteur, manette levée, voyant qui brille en cyan.

**D1-04 · Pop-up** ✔  
Toutes les images de ce monstre sur une seule planche.  
Grille : 6 × 4  
Cases : 1) de face, immobile · 2) de face, étiré vers le haut · 3) de face, tassé vers le bas · 4) de dos, immobile · 5) de dos, étiré vers le haut · 6) de dos, tassé vers le bas · 7) de profil, immobile · 8) de profil, étiré vers le haut · 9) de profil, tassé vers le bas · 10) de face, il attaque · 11) de dos, il attaque · 12) de profil, il attaque · 13) de face, touché : il recule, yeux plissés · 14) de dos, touché · 15) de profil, touché · 16) il apparaît (il sort de terre ou se matérialise), image 1 : presque rien · 17) apparition, image 2 : à moitié là · 18) apparition, image 3 : presque entier · 19) son projectile en vol : une bulle de notification rouge sombre entourée d'un anneau violet · 20) le même projectile, deuxième image du vol · 21) le projectile qui éclate à l'impact · 22) il disparaît : il éclate en petits carrés violets et en fumée (image 1) · 23) image 2 de la disparition, plus éclatée · 24) image 3, presque rien

**D1-05 · Clic** ✔  
Toutes les images de ce monstre sur une seule planche.  
Grille : 6 × 4  
Cases : 1) de face, immobile · 2) de face, pied gauche en avant · 3) de face, pied droit en avant · 4) de dos, immobile · 5) de dos, pied gauche en avant · 6) de dos, pied droit en avant · 7) de profil, immobile · 8) de profil, pied gauche en avant · 9) de profil, pied droit en avant · 10) de face, il attaque · 11) de dos, il attaque · 12) de profil, il attaque · 13) de face, touché : il recule, yeux plissés · 14) de dos, touché · 15) de profil, touché · 16) il apparaît (il sort de terre ou se matérialise), image 1 : presque rien · 17) apparition, image 2 : à moitié là · 18) apparition, image 3 : presque entier · 19) l'effet de son attaque (souffle, choc ou éclair, dans ses couleurs), image 1 · 20) l'effet de son attaque, image 2 · 21) l'effet de son attaque, image 3 · 22) il disparaît : il éclate en petits carrés violets et en fumée (image 1) · 23) image 2 de la disparition, plus éclatée · 24) image 3, presque rien

**D1-06 · Spamling** ✔  
Toutes les images de ce monstre sur une seule planche.  
Grille : 6 × 4  
Cases : 1) de face, immobile · 2) de face, pied gauche en avant · 3) de face, pied droit en avant · 4) de dos, immobile · 5) de dos, pied gauche en avant · 6) de dos, pied droit en avant · 7) de profil, immobile · 8) de profil, pied gauche en avant · 9) de profil, pied droit en avant · 10) de face, il attaque · 11) de dos, il attaque · 12) de profil, il attaque · 13) de face, touché : il recule, yeux plissés · 14) de dos, touché · 15) de profil, touché · 16) il apparaît (il sort de terre ou se matérialise), image 1 : presque rien · 17) apparition, image 2 : à moitié là · 18) apparition, image 3 : presque entier · 19) l'effet de son attaque (souffle, choc ou éclair, dans ses couleurs), image 1 · 20) l'effet de son attaque, image 2 · 21) l'effet de son attaque, image 3 · 22) il disparaît : il éclate en petits carrés violets et en fumée (image 1) · 23) image 2 de la disparition, plus éclatée · 24) image 3, presque rien

**D1-07 · Ping (chauve-souris)** ✔  
Toutes les images de ce monstre sur une seule planche.  
Grille : 6 × 4  
Cases : 1) de face, immobile · 2) de face, ailes levées · 3) de face, ailes baissées · 4) de dos, immobile · 5) de dos, ailes levées · 6) de dos, ailes baissées · 7) de profil, immobile · 8) de profil, ailes levées · 9) de profil, ailes baissées · 10) de face, il attaque · 11) de dos, il attaque · 12) de profil, il attaque · 13) de face, touché : il recule, yeux plissés · 14) de dos, touché · 15) de profil, touché · 16) il apparaît (il sort de terre ou se matérialise), image 1 : presque rien · 17) apparition, image 2 : à moitié là · 18) apparition, image 3 : presque entier · 19) l'effet de son attaque (souffle, choc ou éclair, dans ses couleurs), image 1 · 20) l'effet de son attaque, image 2 · 21) l'effet de son attaque, image 3 · 22) il disparaît : il éclate en petits carrés violets et en fumée (image 1) · 23) image 2 de la disparition, plus éclatée · 24) image 3, presque rien

**D1-08 · La Reine Pop-up** ✔  
Le boss sur une planche de 6 grandes cases.  
Grille : 3 × 2  
Cases : 1) de face, immobile et menaçant · 2) de face, il attaque · 3) de face, étourdi : tête basse, yeux qui clignotent, fissures qui s'éteignent · 4) de face, touché : il recule, tout blanc (image de flash) · 5) son projectile : une petite fenêtre pub qui file en tournant · 6) il est vaincu : il se désagrège en carrés violets et en fumée

**D1-09 · Flash, le premier Gardien** ✔  
Les personnages qui marchent et parlent. Toute la planche est remplie : deux rangées par personnage quand il y en a deux, une rangée quand il y en a quatre.  
Grille : 6 × 4  
Cases : 1) Flash (un hibou reporter, plumage brun et crème, lunettes rondes, écharpe, un carnet de reporter ; deux ailes bien distinctes) de face, immobile · 2) Flash de face, pied gauche en avant · 3) Flash de face, pied droit en avant · 4) Flash de dos, immobile · 5) Flash de dos, pied gauche en avant · 6) Flash de dos, pied droit en avant · 7) Flash de profil, immobile · 8) Flash de profil, jambe avant tendue · 9) Flash de profil, jambes croisées (pas de passage) · 10) Flash de face : il écrit dans son carnet · 11) Flash de face, il parle : bouche ouverte, une main levée · 12) Flash de face, surpris : yeux grands ouverts, bras écartés · 13) Flash de face, il salue de la main · 14) Flash de face, il donne un objet : mains tendues vers nous (l'objet n'est pas dessiné) · 15) Flash de face, il réfléchit, une main au menton · 16) Flash de face, il rit · 17) Flash de face, triste, tête basse · 18) Flash de face, fâché · 19) Flash de profil, il parle · 20) Flash de profil, il montre quelque chose vers la droite · 21) Flash de dos, il lève la tête · 22) Flash assis par terre, de face · 23) Flash de face, il sursaute · 24) Flash de face, il somnole debout, yeux fermés

**D1-10 · Flash, le premier Gardien : portraits** ✔  
Les portraits affichés à côté du texte des dialogues.  
Grille : 3 × 2  
Cases : 1) portrait de Flash : buste et tête de face, expression neutre · 2) portrait de Flash : buste et tête de face, il parle, bouche ouverte, expression vive · 3) portrait de Flash : buste et tête de face, content, grand sourire · 4) portrait de Flash : buste et tête de face, surpris, yeux grands ouverts · 5) portrait de Flash : buste et tête de face, fâché, sourcils froncés · 6) portrait de Flash : buste et tête de face, inquiet, sourcils relevés

**D1-11 · Objets du Terrier** ✔  
Les objets du premier donjon.  
Grille : 3 × 2  
Cases : 1) le Mégaphone : mégaphone de reporter noir et bleu · 2) l'onde du Mégaphone, image 1 · 3) l'onde du Mégaphone, image 2 · 4) une page du carnet de Flash (papier crème) · 5) le fragment de la Source : un éclat de lumière blanche et cyan · 6) le fragment qui brille, image 2

### Parvis du QG

**QG-01 · Parvis du QG : sols** ✔  
Les tuiles de sol de 20 × 20 pixels : je construis tous les écrans avec. Les bords s'emboîtent : garde toute la planche dans la même conversation.  
Grille : 12 × 8  
Cases : 1) pavés gris-bleu de la place, tuile de base qui se répète sans raccord visible · 2) pavés gris-bleu de la place, variante avec quelques détails · 3) pavés gris-bleu de la place, deuxième variante · 4) pavés gris-bleu de la place, variante avec de petites fleurs ou petits détails colorés · 5) dalles claires de la rue, tuile de base qui se répète sans raccord · 6) dalles claires de la rue, variante · 7) eau de la fontaine, tuile qui se répète (image 1 de l'animation) · 8) eau de la fontaine, même tuile avec les reflets décalés (image 2) · 9) eau de la fontaine, image 3 · 10) bord haut gauche d'une zone de dalles claires de la rue entourée de pavés gris-bleu de la place · 11) bord haut d'une zone de dalles claires de la rue · 12) bord haut droit d'une zone de dalles claires de la rue · 13) bord gauche d'une zone de dalles claires de la rue · 14) bord droit d'une zone de dalles claires de la rue · 15) bord bas gauche d'une zone de dalles claires de la rue · 16) bord bas d'une zone de dalles claires de la rue · 17) bord bas droit d'une zone de dalles claires de la rue · 18) coin intérieur haut gauche : dalles claires de la rue partout sauf un petit coin de pavés gris-bleu de la place en haut à gauche · 19) coin intérieur haut droit · 20) coin intérieur bas gauche · 21) coin intérieur bas droit · 22) berge haut gauche d'une étendue de eau de la fontaine entourée de pavés gris-bleu de la place · 23) berge haute · 24) berge haut droite · 25) berge gauche · 26) berge droite · 27) berge bas gauche · 28) berge basse · 29) berge bas droite · 30) coin intérieur de berge haut gauche · 31) coin intérieur de berge haut droit · 32) coin intérieur de berge bas gauche · 33) coin intérieur de berge bas droit · 34) façade de bâtiment en pierre : haut de falaise, bord gauche · 35) façade de bâtiment en pierre : haut de falaise, bord du milieu · 36) façade de bâtiment en pierre : haut de falaise, bord droit · 37) façade de bâtiment en pierre : paroi, côté gauche · 38) façade de bâtiment en pierre : paroi, milieu · 39) façade de bâtiment en pierre : paroi, côté droit · 40) façade de bâtiment en pierre : pied de paroi, gauche · 41) façade de bâtiment en pierre : pied de paroi, milieu · 42) façade de bâtiment en pierre : pied de paroi, droit · 43) porte de boutique : moitié haut gauche (l'entrée fait 2 × 2 tuiles, creusée dans la paroi) · 44) porte de boutique : moitié haut droite · 45) porte de boutique : moitié bas gauche, avec l'ouverture sombre · 46) porte de boutique : moitié bas droite · 47) des marches d'escalier, vues de dessus

**QG-02 · Parvis : décor** ✔  
Les éléments de la place et de la rue des boutiques.  
Grille : 6 × 4  
Cases : 1) la fontaine de la place (toute la case) · 2) un lampadaire · 3) un banc · 4) une guirlande de fête · 5) un écran géant éteint · 6) une boutique : vitrine et auvent bleu · 7) la boutique de Mona : étal de fruits · 8) un pot de fleurs · 9) une poubelle · 10) la porte de la ville, fermée · 11) la porte de la ville, ouverte · 12) un arbre de ville en pot

**QG-03 · Mona et Lila** ✔  
Les personnages qui marchent et parlent. Toute la planche est remplie : deux rangées par personnage quand il y en a deux, une rangée quand il y en a quatre.  
Grille : 6 × 4  
Cases : 1) Mona (une chatte rousse, bandana bleu, tablier bleu, panier de fruits, la marchande) de face, immobile · 2) Mona de face, pied gauche en avant · 3) Mona de face, pied droit en avant · 4) Mona de dos, immobile · 5) Mona de dos, pied gauche en avant · 6) Mona de dos, pied droit en avant · 7) Mona de profil, immobile · 8) Mona de profil, jambe avant tendue · 9) Mona de profil, jambes croisées (pas de passage) · 10) Mona de face : elle tend un fruit · 11) Mona de face, il parle : bouche ouverte, une main levée · 12) Mona de face, surpris : yeux grands ouverts, bras écartés · 13) Lila (une petite lapine aux longues oreilles, nœud bleu, sweat bleu, baskets bleues, une console à la main) de face, immobile · 14) Lila de face, pied gauche en avant · 15) Lila de face, pied droit en avant · 16) Lila de dos, immobile · 17) Lila de dos, pied gauche en avant · 18) Lila de dos, pied droit en avant · 19) Lila de profil, immobile · 20) Lila de profil, jambe avant tendue · 21) Lila de profil, jambes croisées (pas de passage) · 22) Lila de face : elle joue à sa console · 23) Lila de face, il parle : bouche ouverte, une main levée · 24) Lila de face, surpris : yeux grands ouverts, bras écartés

**QG-04 · Mona et Lila : portraits** ✔  
Les portraits affichés à côté du texte des dialogues.  
Grille : 3 × 2  
Cases : 1) portrait de Mona : buste et tête de face, expression neutre · 2) portrait de Mona : buste et tête de face, il parle, bouche ouverte, expression vive · 3) portrait de Mona : buste et tête de face, content, grand sourire · 4) portrait de Lila : buste et tête de face, expression neutre · 5) portrait de Lila : buste et tête de face, il parle, bouche ouverte, expression vive · 6) portrait de Lila : buste et tête de face, content, grand sourire

**QG-05 · Boutique de Mona** ✔  
Les objets en vente.  
Grille : 3 × 2  
Cases : 1) une boisson (fiole bleue) · 2) une petite bourse · 3) une grande bourse · 4) le Pare-feu Pro : bracelet doré à bande cyan · 5) un pétard confettis · 6) une carte du Réseau roulée

### Forêt des Forums + Donjon 2

**R2-01 · Forêt des Forums : tuiles de sol** ✔  
Les tuiles de sol de 20 × 20 pixels : je construis tous les écrans avec. Les bords s'emboîtent : garde toute la planche dans la même conversation.  
Grille : 12 × 8  
Cases : 1) mousse et herbe sombre de forêt, tuile de base qui se répète sans raccord visible · 2) mousse et herbe sombre de forêt, variante avec quelques détails · 3) mousse et herbe sombre de forêt, deuxième variante · 4) mousse et herbe sombre de forêt, variante avec de petites fleurs ou petits détails colorés · 5) sentier de terre et de racines, tuile de base qui se répète sans raccord · 6) sentier de terre et de racines, variante · 7) eau sombre de ruisseau, tuile qui se répète (image 1 de l'animation) · 8) eau sombre de ruisseau, même tuile avec les reflets décalés (image 2) · 9) eau sombre de ruisseau, image 3 · 10) bord haut gauche d'une zone de sentier de terre et de racines entourée de mousse et herbe sombre de forêt · 11) bord haut d'une zone de sentier de terre et de racines · 12) bord haut droit d'une zone de sentier de terre et de racines · 13) bord gauche d'une zone de sentier de terre et de racines · 14) bord droit d'une zone de sentier de terre et de racines · 15) bord bas gauche d'une zone de sentier de terre et de racines · 16) bord bas d'une zone de sentier de terre et de racines · 17) bord bas droit d'une zone de sentier de terre et de racines · 18) coin intérieur haut gauche : sentier de terre et de racines partout sauf un petit coin de mousse et herbe sombre de forêt en haut à gauche · 19) coin intérieur haut droit · 20) coin intérieur bas gauche · 21) coin intérieur bas droit · 22) berge haut gauche d'une étendue de eau sombre de ruisseau entourée de mousse et herbe sombre de forêt · 23) berge haute · 24) berge haut droite · 25) berge gauche · 26) berge droite · 27) berge bas gauche · 28) berge basse · 29) berge bas droite · 30) coin intérieur de berge haut gauche · 31) coin intérieur de berge haut droit · 32) coin intérieur de berge bas gauche · 33) coin intérieur de berge bas droit · 34) falaise de roche moussue : haut de falaise, bord gauche · 35) falaise de roche moussue : haut de falaise, bord du milieu · 36) falaise de roche moussue : haut de falaise, bord droit · 37) falaise de roche moussue : paroi, côté gauche · 38) falaise de roche moussue : paroi, milieu · 39) falaise de roche moussue : paroi, côté droit · 40) falaise de roche moussue : pied de paroi, gauche · 41) falaise de roche moussue : pied de paroi, milieu · 42) falaise de roche moussue : pied de paroi, droit · 43) entrée du donjon dans un tronc géant : moitié haut gauche (l'entrée fait 2 × 2 tuiles, creusée dans la paroi) · 44) entrée du donjon dans un tronc géant : moitié haut droite · 45) entrée du donjon dans un tronc géant : moitié bas gauche, avec l'ouverture sombre · 46) entrée du donjon dans un tronc géant : moitié bas droite · 47) des marches d'escalier, vues de dessus

**R2-02 · Forêt des Forums : décor posé** ✔  
Tout ce qui est posé sur le sol de la région, avec la version coupée ou cassée de ce qui se coupe ou se casse, et l'environnement animé.  
Grille : 6 × 4  
Cases : 1) un arbre typique de la région (toute la case) · 2) un deuxième arbre · 3) Un buisson de fougères (on le coupe avec l'onde). · 4) Une touffe de hautes herbes de forêt. · 5) Un rocher moussu fissuré, fissure bien visible (on le fait sauter). · 6) Un panneau de bois, sans texte. · 7) Une borne Wi-Fi de voyage éteinte : poteau de métal bleu, antenne, écran rond noir. · 8) La même borne allumée : écran cyan, trois arcs Wi-Fi lumineux au-dessus. · 9) Des feuilles qui tombent en tournoyant (trois feuilles vertes différentes)., image 1 · 10) Un câble électrifié qui crépite : petites étincelles bleues., image 1 · 11) Un Ensablé ou un sbire qui sort de terre : le sol se fend en étoile, mottes de terre qui sautent., image 1 · 12) Le trou qui reste après la sortie, puis qui se referme., image 1

**R2-03 · Traqueur** ✔  
Toutes les images de ce monstre sur une seule planche.  
Grille : 6 × 4  
Cases : 1) de face, immobile · 2) de face, étiré vers le haut · 3) de face, tassé vers le bas · 4) de dos, immobile · 5) de dos, étiré vers le haut · 6) de dos, tassé vers le bas · 7) de profil, immobile · 8) de profil, étiré vers le haut · 9) de profil, tassé vers le bas · 10) de face, il attaque · 11) de dos, il attaque · 12) de profil, il attaque · 13) de face, touché : il recule, yeux plissés · 14) de dos, touché · 15) de profil, touché · 16) il apparaît (il sort de terre ou se matérialise), image 1 : presque rien · 17) apparition, image 2 : à moitié là · 18) apparition, image 3 : presque entier · 19) son projectile en vol : une flèche d'ombre noire et violette, vue exactement de profil, pointe vers la droite, format paysage. · 20) le même projectile, deuxième image du vol · 21) le projectile qui éclate à l'impact · 22) il disparaît : il éclate en petits carrés violets et en fumée (image 1) · 23) image 2 de la disparition, plus éclatée · 24) image 3, presque rien

**R2-04 · Chauve-ombre** ✔  
Toutes les images de ce monstre sur une seule planche.  
Grille : 6 × 4  
Cases : 1) de face, immobile · 2) de face, ailes levées · 3) de face, ailes baissées · 4) de dos, immobile · 5) de dos, ailes levées · 6) de dos, ailes baissées · 7) de profil, immobile · 8) de profil, ailes levées · 9) de profil, ailes baissées · 10) de face, il attaque · 11) de dos, il attaque · 12) de profil, il attaque · 13) de face, touché : il recule, yeux plissés · 14) de dos, touché · 15) de profil, touché · 16) il apparaît (il sort de terre ou se matérialise), image 1 : presque rien · 17) apparition, image 2 : à moitié là · 18) apparition, image 3 : presque entier · 19) l'effet de son attaque (souffle, choc ou éclair, dans ses couleurs), image 1 · 20) l'effet de son attaque, image 2 · 21) l'effet de son attaque, image 3 · 22) il disparaît : il éclate en petits carrés violets et en fumée (image 1) · 23) image 2 de la disparition, plus éclatée · 24) image 3, presque rien

**R2-05 · Trollinet** ✔  
Toutes les images de ce monstre sur une seule planche.  
Grille : 6 × 4  
Cases : 1) de face, immobile · 2) de face, pied gauche en avant · 3) de face, pied droit en avant · 4) de dos, immobile · 5) de dos, pied gauche en avant · 6) de dos, pied droit en avant · 7) de profil, immobile · 8) de profil, pied gauche en avant · 9) de profil, pied droit en avant · 10) de face, il attaque · 11) de dos, il attaque · 12) de profil, il attaque · 13) de face, touché : il recule, yeux plissés · 14) de dos, touché · 15) de profil, touché · 16) il apparaît (il sort de terre ou se matérialise), image 1 : presque rien · 17) apparition, image 2 : à moitié là · 18) apparition, image 3 : presque entier · 19) l'effet de son attaque (souffle, choc ou éclair, dans ses couleurs), image 1 · 20) l'effet de son attaque, image 2 · 21) l'effet de son attaque, image 3 · 22) il disparaît : il éclate en petits carrés violets et en fumée (image 1) · 23) image 2 de la disparition, plus éclatée · 24) image 3, presque rien

**R2-06 · Fil-serpent** ✔  
Toutes les images de ce monstre sur une seule planche.  
Grille : 6 × 4  
Cases : 1) de face, immobile · 2) de face, pied gauche en avant · 3) de face, pied droit en avant · 4) de dos, immobile · 5) de dos, pied gauche en avant · 6) de dos, pied droit en avant · 7) de profil, immobile · 8) de profil, pied gauche en avant · 9) de profil, pied droit en avant · 10) de face, il attaque · 11) de dos, il attaque · 12) de profil, il attaque · 13) de face, touché : il recule, yeux plissés · 14) de dos, touché · 15) de profil, touché · 16) il apparaît (il sort de terre ou se matérialise), image 1 : presque rien · 17) apparition, image 2 : à moitié là · 18) apparition, image 3 : presque entier · 19) l'effet de son attaque (souffle, choc ou éclair, dans ses couleurs), image 1 · 20) l'effet de son attaque, image 2 · 21) l'effet de son attaque, image 3 · 22) il disparaît : il éclate en petits carrés violets et en fumée (image 1) · 23) image 2 de la disparition, plus éclatée · 24) image 3, presque rien

**R2-07 · Hibou-rumeur** ✔  
Toutes les images de ce monstre sur une seule planche.  
Grille : 6 × 4  
Cases : 1) de face, immobile · 2) de face, pied gauche en avant · 3) de face, pied droit en avant · 4) de dos, immobile · 5) de dos, pied gauche en avant · 6) de dos, pied droit en avant · 7) de profil, immobile · 8) de profil, pied gauche en avant · 9) de profil, pied droit en avant · 10) de face, il attaque · 11) de dos, il attaque · 12) de profil, il attaque · 13) de face, touché : il recule, yeux plissés · 14) de dos, touché · 15) de profil, touché · 16) il apparaît (il sort de terre ou se matérialise), image 1 : presque rien · 17) apparition, image 2 : à moitié là · 18) apparition, image 3 : presque entier · 19) l'effet de son attaque (souffle, choc ou éclair, dans ses couleurs), image 1 · 20) l'effet de son attaque, image 2 · 21) l'effet de son attaque, image 3 · 22) il disparaît : il éclate en petits carrés violets et en fumée (image 1) · 23) image 2 de la disparition, plus éclatée · 24) image 3, presque rien

**R2-08 · Chauve-souris (Labyrinthe des Fils)** ✔  
Toutes les images de ce monstre sur une seule planche.  
Grille : 6 × 4  
Cases : 1) de face, immobile · 2) de face, ailes levées · 3) de face, ailes baissées · 4) de dos, immobile · 5) de dos, ailes levées · 6) de dos, ailes baissées · 7) de profil, immobile · 8) de profil, ailes levées · 9) de profil, ailes baissées · 10) de face, il attaque · 11) de dos, il attaque · 12) de profil, il attaque · 13) de face, touché : il recule, yeux plissés · 14) de dos, touché · 15) de profil, touché · 16) il apparaît (il sort de terre ou se matérialise), image 1 : presque rien · 17) apparition, image 2 : à moitié là · 18) apparition, image 3 : presque entier · 19) l'effet de son attaque (souffle, choc ou éclair, dans ses couleurs), image 1 · 20) l'effet de son attaque, image 2 · 21) l'effet de son attaque, image 3 · 22) il disparaît : il éclate en petits carrés violets et en fumée (image 1) · 23) image 2 de la disparition, plus éclatée · 24) image 3, presque rien

**R2-09 · Le Troll des Commentaires** ✔  
Le boss sur une planche de 6 grandes cases.  
Grille : 3 × 2  
Cases : 1) de face, immobile et menaçant · 2) de face, il attaque · 3) de face, étourdi : tête basse, yeux qui clignotent, fissures qui s'éteignent · 4) de face, touché : il recule, tout blanc (image de flash) · 5) son projectile : Une bulle de commentaire noire et épaisse, bord violet, sans texte · 6) il est vaincu : il se désagrège en carrés violets et en fumée

**R2-10 · Forêt des Forums : Gardien et habitant** ✔  
Les personnages qui marchent et parlent. Toute la planche est remplie : deux rangées par personnage quand il y en a deux, une rangée quand il y en a quatre.  
Grille : 6 × 4  
Cases : 1) Note (une tortue dont la carapace ressemble à une manette de jeu, lunettes rondes, bloc-notes et stylo à la main.) de face, immobile · 2) Note de face, pied gauche en avant · 3) Note de face, pied droit en avant · 4) Note de dos, immobile · 5) Note de dos, pied gauche en avant · 6) Note de dos, pied droit en avant · 7) Note de profil, immobile · 8) Note de profil, jambe avant tendue · 9) Note de profil, jambes croisées (pas de passage) · 10) Note de face : en train d'écrire sur son bloc-notes, concentrée · 11) Note de face, il parle : bouche ouverte, une main levée · 12) Note de face, surpris : yeux grands ouverts, bras écartés · 13) Sève (une hérissonne en tablier de mousse, panier de champignons, debout de face, entier.) de face, immobile · 14) Sève de face, pied gauche en avant · 15) Sève de face, pied droit en avant · 16) Sève de dos, immobile · 17) Sève de dos, pied gauche en avant · 18) Sève de dos, pied droit en avant · 19) Sève de profil, immobile · 20) Sève de profil, jambe avant tendue · 21) Sève de profil, jambes croisées (pas de passage) · 22) Sève de face : il salue · 23) Sève de face, il parle : bouche ouverte, une main levée · 24) Sève de face, surpris : yeux grands ouverts, bras écartés

**R2-11 · Forêt des Forums : Gardien et habitant : portraits** ✔  
Les portraits affichés à côté du texte des dialogues.  
Grille : 3 × 2  
Cases : 1) portrait de Note : buste et tête de face, expression neutre · 2) portrait de Note : buste et tête de face, il parle, bouche ouverte, expression vive · 3) portrait de Note : buste et tête de face, content, grand sourire · 4) portrait de Sève : buste et tête de face, expression neutre · 5) portrait de Sève : buste et tête de face, il parle, bouche ouverte, expression vive · 6) portrait de Sève : buste et tête de face, content, grand sourire

**R2-12 · Labyrinthe des Fils : sols et murs** ✔  
Les tuiles de sol de 20 × 20 pixels : je construis tous les écrans avec. Les bords s'emboîtent : garde toute la planche dans la même conversation.  
Grille : 12 × 8  
Cases : 1) dalles de pierre du donjon (pierre moussue et câbles tressés), tuile de base qui se répète sans raccord visible · 2) dalles de pierre du donjon (pierre moussue et câbles tressés), variante avec quelques détails · 3) dalles de pierre du donjon (pierre moussue et câbles tressés), deuxième variante · 4) dalles de pierre du donjon (pierre moussue et câbles tressés), variante avec de petites fleurs ou petits détails colorés · 5) sol plus clair d'un couloir, tuile de base qui se répète sans raccord · 6) sol plus clair d'un couloir, variante · 7) trou sans fond (vide noir), tuile qui se répète (image 1 de l'animation) · 8) trou sans fond (vide noir), même tuile avec les reflets décalés (image 2) · 9) trou sans fond (vide noir), image 3 · 10) bord haut gauche d'une zone de sol plus clair d'un couloir entourée de dalles de pierre du donjon (pierre moussue et câbles tressés) · 11) bord haut d'une zone de sol plus clair d'un couloir · 12) bord haut droit d'une zone de sol plus clair d'un couloir · 13) bord gauche d'une zone de sol plus clair d'un couloir · 14) bord droit d'une zone de sol plus clair d'un couloir · 15) bord bas gauche d'une zone de sol plus clair d'un couloir · 16) bord bas d'une zone de sol plus clair d'un couloir · 17) bord bas droit d'une zone de sol plus clair d'un couloir · 18) coin intérieur haut gauche : sol plus clair d'un couloir partout sauf un petit coin de dalles de pierre du donjon (pierre moussue et câbles tressés) en haut à gauche · 19) coin intérieur haut droit · 20) coin intérieur bas gauche · 21) coin intérieur bas droit · 22) berge haut gauche d'une étendue de trou sans fond (vide noir) entourée de dalles de pierre du donjon (pierre moussue et câbles tressés) · 23) berge haute · 24) berge haut droite · 25) berge gauche · 26) berge droite · 27) berge bas gauche · 28) berge basse · 29) berge bas droite · 30) coin intérieur de berge haut gauche · 31) coin intérieur de berge haut droit · 32) coin intérieur de berge bas gauche · 33) coin intérieur de berge bas droit · 34) mur épais du donjon (pierre moussue et câbles tressés) : haut de falaise, bord gauche · 35) mur épais du donjon (pierre moussue et câbles tressés) : haut de falaise, bord du milieu · 36) mur épais du donjon (pierre moussue et câbles tressés) : haut de falaise, bord droit · 37) mur épais du donjon (pierre moussue et câbles tressés) : paroi, côté gauche · 38) mur épais du donjon (pierre moussue et câbles tressés) : paroi, milieu · 39) mur épais du donjon (pierre moussue et câbles tressés) : paroi, côté droit · 40) mur épais du donjon (pierre moussue et câbles tressés) : pied de paroi, gauche · 41) mur épais du donjon (pierre moussue et câbles tressés) : pied de paroi, milieu · 42) mur épais du donjon (pierre moussue et câbles tressés) : pied de paroi, droit · 43) porte du donjon : moitié haut gauche (l'entrée fait 2 × 2 tuiles, creusée dans la paroi) · 44) porte du donjon : moitié haut droite · 45) porte du donjon : moitié bas gauche, avec l'ouverture sombre · 46) porte du donjon : moitié bas droite · 47) des marches d'escalier, vues de dessus

**R2-13 · Labyrinthe des Fils : portes** ✔  
Chaque porte dans tous ses états. La porte est dessinée dans l'épaisseur du mur, comme un tunnel.  
Grille : 6 × 4  
Cases : 1) porte du mur du haut, ouverte · 2) porte du mur du haut, fermée par une grille · 3) porte du mur du haut, verrouillée par une serrure dorée · 4) porte du mur du haut, porte du boss, ornée et menaçante · 5) porte du mur du haut, murée (mur plein) · 6) porte du mur du haut, fissurée (on peut la faire sauter) · 7) porte du mur du bas, ouverte · 8) porte du mur du bas, fermée par une grille · 9) porte du mur du bas, verrouillée · 10) porte du mur du bas, porte du boss · 11) porte du mur du bas, murée · 12) porte du mur du bas, fissurée · 13) porte du mur de gauche, ouverte · 14) porte du mur de gauche, fermée par une grille · 15) porte du mur de gauche, verrouillée · 16) porte du mur de gauche, porte du boss · 17) porte du mur de gauche, murée · 18) porte du mur de gauche, fissurée · 19) porte du mur de droite, ouverte · 20) porte du mur de droite, fermée par une grille · 21) porte du mur de droite, verrouillée · 22) porte du mur de droite, porte du boss · 23) porte du mur de droite, murée · 24) porte du mur de droite, fissurée

**R2-14 · Labyrinthe des Fils : objets et mécanismes** ✔  
Tout ce qui est posé dans les salles, à la même échelle.  
Grille : 6 × 4  
Cases : 1) un bloc à pousser, même pierre que les murs · 2) une statue gardienne sur socle (toutes les statues sont identiques, même celle qu'on peut pousser) · 3) une lanterne à câble suspendue, éteinte · 4) une lanterne à câble suspendue, allumée, image 1 · 5) une lanterne à câble suspendue, allumée, image 2 · 6) un pot fermé · 7) le pot qui se brise · 8) un coffre fermé · 9) le même coffre ouvert, vide · 10) un grand coffre (celui de l'objet du donjon), fermé · 11) le grand coffre ouvert · 12) une plaque de pression au sol · 13) la même plaque enfoncée · 14) un cristal éteint sur socle (il réagit à la Manette) · 15) le même cristal allumé · 16) un escalier qui descend · 17) une échelle · 18) le socle de l'objet · 19) Un mur fêlé vu de dessus, dans le thème du donjon : grande fissure en étoile. · 20) Le même mur après l'explosion : un trou rond et sombre au milieu, débris sur les bords. · 21) Un interrupteur à câble au sol, éteint (prise débranchée). · 22) Le même interrupteur branché, qui brille en cyan. · 23) Un câble électrifié qui barre le sol, étincelles violettes (danger).

**R2-15 · Labyrinthe des Fils : objets** ✔  
Les objets trouvés dans ce donjon.  
Grille : 3 × 2  
Cases : 1) Un Pétard Confettis : un gros pétard cylindrique bleu et rose à bandes, mèche courte, confettis peints dessus. · 2) Le même pétard posé debout, mèche allumée avec une petite étincelle jaune. · 3) Une explosion de confettis vue de dessus : un nuage rond de confettis multicolores et d'étoiles blanches, sans flammes, sans fumée noire. · 4) La Manette Pro : la Manette jointe en version améliorée, coque bleu nuit et or, gâchettes lumineuses cyan, petites ailettes sur les côtés (elle file plus vite et va deux fois plus loin que la Manette, comme le boomerang magique de Zelda). · 5) Un sac à pétards en toile bleue, rempli, cordon doré.

### Monts Hardware + Donjon 3

**R3-01 · Monts Hardware : tuiles de sol** ✔  
Les tuiles de sol de 20 × 20 pixels : je construis tous les écrans avec. Les bords s'emboîtent : garde toute la planche dans la même conversation.  
Grille : 12 × 8  
Cases : 1) roche grise et métal rouillé, tuile de base qui se répète sans raccord visible · 2) roche grise et métal rouillé, variante avec quelques détails · 3) roche grise et métal rouillé, deuxième variante · 4) roche grise et métal rouillé, variante avec de petites fleurs ou petits détails colorés · 5) chemin de gravier, tuile de base qui se répète sans raccord · 6) chemin de gravier, variante · 7) lave orange, tuile qui se répète (image 1 de l'animation) · 8) lave orange, même tuile avec les reflets décalés (image 2) · 9) lave orange, image 3 · 10) bord haut gauche d'une zone de chemin de gravier entourée de roche grise et métal rouillé · 11) bord haut d'une zone de chemin de gravier · 12) bord haut droit d'une zone de chemin de gravier · 13) bord gauche d'une zone de chemin de gravier · 14) bord droit d'une zone de chemin de gravier · 15) bord bas gauche d'une zone de chemin de gravier · 16) bord bas d'une zone de chemin de gravier · 17) bord bas droit d'une zone de chemin de gravier · 18) coin intérieur haut gauche : chemin de gravier partout sauf un petit coin de roche grise et métal rouillé en haut à gauche · 19) coin intérieur haut droit · 20) coin intérieur bas gauche · 21) coin intérieur bas droit · 22) berge haut gauche d'une étendue de lave orange entourée de roche grise et métal rouillé · 23) berge haute · 24) berge haut droite · 25) berge gauche · 26) berge droite · 27) berge bas gauche · 28) berge basse · 29) berge bas droite · 30) coin intérieur de berge haut gauche · 31) coin intérieur de berge haut droit · 32) coin intérieur de berge bas gauche · 33) coin intérieur de berge bas droit · 34) falaise de roche et de plaques de métal : haut de falaise, bord gauche · 35) falaise de roche et de plaques de métal : haut de falaise, bord du milieu · 36) falaise de roche et de plaques de métal : haut de falaise, bord droit · 37) falaise de roche et de plaques de métal : paroi, côté gauche · 38) falaise de roche et de plaques de métal : paroi, milieu · 39) falaise de roche et de plaques de métal : paroi, côté droit · 40) falaise de roche et de plaques de métal : pied de paroi, gauche · 41) falaise de roche et de plaques de métal : pied de paroi, milieu · 42) falaise de roche et de plaques de métal : pied de paroi, droit · 43) entrée de mine : moitié haut gauche (l'entrée fait 2 × 2 tuiles, creusée dans la paroi) · 44) entrée de mine : moitié haut droite · 45) entrée de mine : moitié bas gauche, avec l'ouverture sombre · 46) entrée de mine : moitié bas droite · 47) des marches d'escalier, vues de dessus

**R3-02 · Monts Hardware : décor posé** ✔  
Tout ce qui est posé sur le sol de la région, avec la version coupée ou cassée de ce qui se coupe ou se casse, et l'environnement animé.  
Grille : 6 × 4  
Cases : 1) un arbre typique de la région (toute la case) · 2) un deuxième arbre · 3) Un tas de câbles emmêlés (on le coupe avec l'onde). · 4) Une touffe d'herbe sèche de montagne. · 5) Un rocher métallique fissuré. · 6) Un panneau de métal, sans texte. · 7) Un pot de fer à casser. · 8) Une bulle de lave qui gonfle puis éclate à la surface., image 1 · 9) Une goutte de lave qui tombe d'une coulée, vue de dessus, avec son ombre au sol pour prévenir le joueur., image 1 · 10) L'impact de la goutte de lave au sol : petite flaque orange qui refroidit en noir., image 1 · 11) De la fumée de forge qui monte., image 1 · 12) Un ennemi qui sort d'une fissure de roche : la roche éclate en morceaux., image 1

**R3-03 · Golem de ferraille** ✔  
Toutes les images de ce monstre sur une seule planche.  
Grille : 6 × 4  
Cases : 1) de face, immobile · 2) de face, pied gauche en avant · 3) de face, pied droit en avant · 4) de dos, immobile · 5) de dos, pied gauche en avant · 6) de dos, pied droit en avant · 7) de profil, immobile · 8) de profil, pied gauche en avant · 9) de profil, pied droit en avant · 10) de face, il attaque · 11) de dos, il attaque · 12) de profil, il attaque · 13) de face, touché : il recule, yeux plissés · 14) de dos, touché · 15) de profil, touché · 16) il apparaît (il sort de terre ou se matérialise), image 1 : presque rien · 17) apparition, image 2 : à moitié là · 18) apparition, image 3 : presque entier · 19) l'effet de son attaque (souffle, choc ou éclair, dans ses couleurs), image 1 · 20) l'effet de son attaque, image 2 · 21) l'effet de son attaque, image 3 · 22) il disparaît : il éclate en petits carrés violets et en fumée (image 1) · 23) image 2 de la disparition, plus éclatée · 24) image 3, presque rien

**R3-04 · Harpie de fer** ✔  
Toutes les images de ce monstre sur une seule planche.  
Grille : 6 × 4  
Cases : 1) de face, immobile · 2) de face, ailes levées · 3) de face, ailes baissées · 4) de dos, immobile · 5) de dos, ailes levées · 6) de dos, ailes baissées · 7) de profil, immobile · 8) de profil, ailes levées · 9) de profil, ailes baissées · 10) de face, il attaque · 11) de dos, il attaque · 12) de profil, il attaque · 13) de face, touché : il recule, yeux plissés · 14) de dos, touché · 15) de profil, touché · 16) il apparaît (il sort de terre ou se matérialise), image 1 : presque rien · 17) apparition, image 2 : à moitié là · 18) apparition, image 3 : presque entier · 19) l'effet de son attaque (souffle, choc ou éclair, dans ses couleurs), image 1 · 20) l'effet de son attaque, image 2 · 21) l'effet de son attaque, image 3 · 22) il disparaît : il éclate en petits carrés violets et en fumée (image 1) · 23) image 2 de la disparition, plus éclatée · 24) image 3, presque rien

**R3-05 · Rouilleur** ✔  
Toutes les images de ce monstre sur une seule planche.  
Grille : 6 × 4  
Cases : 1) de face, immobile · 2) de face, pied gauche en avant · 3) de face, pied droit en avant · 4) de dos, immobile · 5) de dos, pied gauche en avant · 6) de dos, pied droit en avant · 7) de profil, immobile · 8) de profil, pied gauche en avant · 9) de profil, pied droit en avant · 10) de face, il attaque · 11) de dos, il attaque · 12) de profil, il attaque · 13) de face, touché : il recule, yeux plissés · 14) de dos, touché · 15) de profil, touché · 16) il apparaît (il sort de terre ou se matérialise), image 1 : presque rien · 17) apparition, image 2 : à moitié là · 18) apparition, image 3 : presque entier · 19) l'effet de son attaque (souffle, choc ou éclair, dans ses couleurs), image 1 · 20) l'effet de son attaque, image 2 · 21) l'effet de son attaque, image 3 · 22) il disparaît : il éclate en petits carrés violets et en fumée (image 1) · 23) image 2 de la disparition, plus éclatée · 24) image 3, presque rien

**R3-06 · Scarabug** ✔  
Toutes les images de ce monstre sur une seule planche.  
Grille : 6 × 4  
Cases : 1) de face, immobile · 2) de face, pied gauche en avant · 3) de face, pied droit en avant · 4) de dos, immobile · 5) de dos, pied gauche en avant · 6) de dos, pied droit en avant · 7) de profil, immobile · 8) de profil, pied gauche en avant · 9) de profil, pied droit en avant · 10) de face, il attaque · 11) de dos, il attaque · 12) de profil, il attaque · 13) de face, touché : il recule, yeux plissés · 14) de dos, touché · 15) de profil, touché · 16) il apparaît (il sort de terre ou se matérialise), image 1 : presque rien · 17) apparition, image 2 : à moitié là · 18) apparition, image 3 : presque entier · 19) l'effet de son attaque (souffle, choc ou éclair, dans ses couleurs), image 1 · 20) l'effet de son attaque, image 2 · 21) l'effet de son attaque, image 3 · 22) il disparaît : il éclate en petits carrés violets et en fumée (image 1) · 23) image 2 de la disparition, plus éclatée · 24) image 3, presque rien

**R3-07 · Ventilo** ✔  
Toutes les images de ce monstre sur une seule planche.  
Grille : 6 × 4  
Cases : 1) de face, immobile · 2) de face, pied gauche en avant · 3) de face, pied droit en avant · 4) de dos, immobile · 5) de dos, pied gauche en avant · 6) de dos, pied droit en avant · 7) de profil, immobile · 8) de profil, pied gauche en avant · 9) de profil, pied droit en avant · 10) de face, il attaque · 11) de dos, il attaque · 12) de profil, il attaque · 13) de face, touché : il recule, yeux plissés · 14) de dos, touché · 15) de profil, touché · 16) il apparaît (il sort de terre ou se matérialise), image 1 : presque rien · 17) apparition, image 2 : à moitié là · 18) apparition, image 3 : presque entier · 19) l'effet de son attaque (souffle, choc ou éclair, dans ses couleurs), image 1 · 20) l'effet de son attaque, image 2 · 21) l'effet de son attaque, image 3 · 22) il disparaît : il éclate en petits carrés violets et en fumée (image 1) · 23) image 2 de la disparition, plus éclatée · 24) image 3, presque rien

**R3-08 · Câble-brûlant** ✔  
Toutes les images de ce monstre sur une seule planche.  
Grille : 6 × 4  
Cases : 1) de face, immobile · 2) de face, pied gauche en avant · 3) de face, pied droit en avant · 4) de dos, immobile · 5) de dos, pied gauche en avant · 6) de dos, pied droit en avant · 7) de profil, immobile · 8) de profil, pied gauche en avant · 9) de profil, pied droit en avant · 10) de face, il attaque · 11) de dos, il attaque · 12) de profil, il attaque · 13) de face, touché : il recule, yeux plissés · 14) de dos, touché · 15) de profil, touché · 16) il apparaît (il sort de terre ou se matérialise), image 1 : presque rien · 17) apparition, image 2 : à moitié là · 18) apparition, image 3 : presque entier · 19) l'effet de son attaque (souffle, choc ou éclair, dans ses couleurs), image 1 · 20) l'effet de son attaque, image 2 · 21) l'effet de son attaque, image 3 · 22) il disparaît : il éclate en petits carrés violets et en fumée (image 1) · 23) image 2 de la disparition, plus éclatée · 24) image 3, presque rien

**R3-09 · Chauve-souris (Forge Surchauffée)** ✔  
Toutes les images de ce monstre sur une seule planche.  
Grille : 6 × 4  
Cases : 1) de face, immobile · 2) de face, ailes levées · 3) de face, ailes baissées · 4) de dos, immobile · 5) de dos, ailes levées · 6) de dos, ailes baissées · 7) de profil, immobile · 8) de profil, ailes levées · 9) de profil, ailes baissées · 10) de face, il attaque · 11) de dos, il attaque · 12) de profil, il attaque · 13) de face, touché : il recule, yeux plissés · 14) de dos, touché · 15) de profil, touché · 16) il apparaît (il sort de terre ou se matérialise), image 1 : presque rien · 17) apparition, image 2 : à moitié là · 18) apparition, image 3 : presque entier · 19) l'effet de son attaque (souffle, choc ou éclair, dans ses couleurs), image 1 · 20) l'effet de son attaque, image 2 · 21) l'effet de son attaque, image 3 · 22) il disparaît : il éclate en petits carrés violets et en fumée (image 1) · 23) image 2 de la disparition, plus éclatée · 24) image 3, presque rien

**R3-10 · Surchauffe** ✔  
Le boss sur une planche de 6 grandes cases.  
Grille : 3 × 2  
Cases : 1) de face, immobile et menaçant · 2) de face, il attaque · 3) de face, étourdi : tête basse, yeux qui clignotent, fissures qui s'éteignent · 4) de face, touché : il recule, tout blanc (image de flash) · 5) son projectile : Une boule de chaleur orange et violette · 6) il est vaincu : il se désagrège en carrés violets et en fumée

**R3-11 · Monts Hardware : Gardien et habitant** ✔  
Les personnages qui marchent et parlent. Toute la planche est remplie : deux rangées par personnage quand il y en a deux, une rangée quand il y en a quatre.  
Grille : 6 × 4  
Cases : 1) Volt (un renard mécanique aux plaques orange et chrome, queue en câbles souples, tournevis à la ceinture.) de face, immobile · 2) Volt de face, pied gauche en avant · 3) Volt de face, pied droit en avant · 4) Volt de dos, immobile · 5) Volt de dos, pied gauche en avant · 6) Volt de dos, pied droit en avant · 7) Volt de profil, immobile · 8) Volt de profil, jambe avant tendue · 9) Volt de profil, jambes croisées (pas de passage) · 10) Volt de face : en train de réparer un petit appareil avec son tournevis · 11) Volt de face, il parle : bouche ouverte, une main levée · 12) Volt de face, surpris : yeux grands ouverts, bras écartés · 13) Boulon (un castor costaud en tablier de cuir, gants épais, clé à molette, debout de face, entier.) de face, immobile · 14) Boulon de face, pied gauche en avant · 15) Boulon de face, pied droit en avant · 16) Boulon de dos, immobile · 17) Boulon de dos, pied gauche en avant · 18) Boulon de dos, pied droit en avant · 19) Boulon de profil, immobile · 20) Boulon de profil, jambe avant tendue · 21) Boulon de profil, jambes croisées (pas de passage) · 22) Boulon de face : il salue · 23) Boulon de face, il parle : bouche ouverte, une main levée · 24) Boulon de face, surpris : yeux grands ouverts, bras écartés

**R3-12 · Monts Hardware : Gardien et habitant : portraits** ✔  
Les portraits affichés à côté du texte des dialogues.  
Grille : 3 × 2  
Cases : 1) portrait de Volt : buste et tête de face, expression neutre · 2) portrait de Volt : buste et tête de face, il parle, bouche ouverte, expression vive · 3) portrait de Volt : buste et tête de face, content, grand sourire · 4) portrait de Boulon : buste et tête de face, expression neutre · 5) portrait de Boulon : buste et tête de face, il parle, bouche ouverte, expression vive · 6) portrait de Boulon : buste et tête de face, content, grand sourire

**R3-13 · Forge Surchauffée : sols et murs** ✔  
Les tuiles de sol de 20 × 20 pixels : je construis tous les écrans avec. Les bords s'emboîtent : garde toute la planche dans la même conversation.  
Grille : 12 × 8  
Cases : 1) dalles de pierre du donjon (fonte noire et cuivre, grilles rougeoyantes), tuile de base qui se répète sans raccord visible · 2) dalles de pierre du donjon (fonte noire et cuivre, grilles rougeoyantes), variante avec quelques détails · 3) dalles de pierre du donjon (fonte noire et cuivre, grilles rougeoyantes), deuxième variante · 4) dalles de pierre du donjon (fonte noire et cuivre, grilles rougeoyantes), variante avec de petites fleurs ou petits détails colorés · 5) sol plus clair d'un couloir, tuile de base qui se répète sans raccord · 6) sol plus clair d'un couloir, variante · 7) trou sans fond (vide noir), tuile qui se répète (image 1 de l'animation) · 8) trou sans fond (vide noir), même tuile avec les reflets décalés (image 2) · 9) trou sans fond (vide noir), image 3 · 10) bord haut gauche d'une zone de sol plus clair d'un couloir entourée de dalles de pierre du donjon (fonte noire et cuivre, grilles rougeoyantes) · 11) bord haut d'une zone de sol plus clair d'un couloir · 12) bord haut droit d'une zone de sol plus clair d'un couloir · 13) bord gauche d'une zone de sol plus clair d'un couloir · 14) bord droit d'une zone de sol plus clair d'un couloir · 15) bord bas gauche d'une zone de sol plus clair d'un couloir · 16) bord bas d'une zone de sol plus clair d'un couloir · 17) bord bas droit d'une zone de sol plus clair d'un couloir · 18) coin intérieur haut gauche : sol plus clair d'un couloir partout sauf un petit coin de dalles de pierre du donjon (fonte noire et cuivre, grilles rougeoyantes) en haut à gauche · 19) coin intérieur haut droit · 20) coin intérieur bas gauche · 21) coin intérieur bas droit · 22) berge haut gauche d'une étendue de trou sans fond (vide noir) entourée de dalles de pierre du donjon (fonte noire et cuivre, grilles rougeoyantes) · 23) berge haute · 24) berge haut droite · 25) berge gauche · 26) berge droite · 27) berge bas gauche · 28) berge basse · 29) berge bas droite · 30) coin intérieur de berge haut gauche · 31) coin intérieur de berge haut droit · 32) coin intérieur de berge bas gauche · 33) coin intérieur de berge bas droit · 34) mur épais du donjon (fonte noire et cuivre, grilles rougeoyantes) : haut de falaise, bord gauche · 35) mur épais du donjon (fonte noire et cuivre, grilles rougeoyantes) : haut de falaise, bord du milieu · 36) mur épais du donjon (fonte noire et cuivre, grilles rougeoyantes) : haut de falaise, bord droit · 37) mur épais du donjon (fonte noire et cuivre, grilles rougeoyantes) : paroi, côté gauche · 38) mur épais du donjon (fonte noire et cuivre, grilles rougeoyantes) : paroi, milieu · 39) mur épais du donjon (fonte noire et cuivre, grilles rougeoyantes) : paroi, côté droit · 40) mur épais du donjon (fonte noire et cuivre, grilles rougeoyantes) : pied de paroi, gauche · 41) mur épais du donjon (fonte noire et cuivre, grilles rougeoyantes) : pied de paroi, milieu · 42) mur épais du donjon (fonte noire et cuivre, grilles rougeoyantes) : pied de paroi, droit · 43) porte du donjon : moitié haut gauche (l'entrée fait 2 × 2 tuiles, creusée dans la paroi) · 44) porte du donjon : moitié haut droite · 45) porte du donjon : moitié bas gauche, avec l'ouverture sombre · 46) porte du donjon : moitié bas droite · 47) des marches d'escalier, vues de dessus

**R3-14 · Forge Surchauffée : portes** ✔  
Chaque porte dans tous ses états. La porte est dessinée dans l'épaisseur du mur, comme un tunnel.  
Grille : 6 × 4  
Cases : 1) porte du mur du haut, ouverte · 2) porte du mur du haut, fermée par une grille · 3) porte du mur du haut, verrouillée par une serrure dorée · 4) porte du mur du haut, porte du boss, ornée et menaçante · 5) porte du mur du haut, murée (mur plein) · 6) porte du mur du haut, fissurée (on peut la faire sauter) · 7) porte du mur du bas, ouverte · 8) porte du mur du bas, fermée par une grille · 9) porte du mur du bas, verrouillée · 10) porte du mur du bas, porte du boss · 11) porte du mur du bas, murée · 12) porte du mur du bas, fissurée · 13) porte du mur de gauche, ouverte · 14) porte du mur de gauche, fermée par une grille · 15) porte du mur de gauche, verrouillée · 16) porte du mur de gauche, porte du boss · 17) porte du mur de gauche, murée · 18) porte du mur de gauche, fissurée · 19) porte du mur de droite, ouverte · 20) porte du mur de droite, fermée par une grille · 21) porte du mur de droite, verrouillée · 22) porte du mur de droite, porte du boss · 23) porte du mur de droite, murée · 24) porte du mur de droite, fissurée

**R3-15 · Forge Surchauffée : objets et mécanismes** ✔  
Tout ce qui est posé dans les salles, à la même échelle.  
Grille : 6 × 4  
Cases : 1) un bloc à pousser, même pierre que les murs · 2) une statue gardienne sur socle (toutes les statues sont identiques, même celle qu'on peut pousser) · 3) un brasero de forge en fonte, éteinte · 4) un brasero de forge en fonte, allumée, image 1 · 5) un brasero de forge en fonte, allumée, image 2 · 6) un pot fermé · 7) le pot qui se brise · 8) un coffre fermé · 9) le même coffre ouvert, vide · 10) un grand coffre (celui de l'objet du donjon), fermé · 11) le grand coffre ouvert · 12) une plaque de pression au sol · 13) la même plaque enfoncée · 14) un cristal éteint sur socle (il réagit à la Manette) · 15) le même cristal allumé · 16) un escalier qui descend · 17) une échelle · 18) le socle de l'objet · 19) Un brasero de forge éteint, braises grises. · 20) Le même brasero allumé, grande flamme orange. · 21) Une grille de sol froide. · 22) La même grille brûlante, rougeoyante (danger). · 23) Un tapis roulant de forge, rouleaux et bande noire, vu de dessus.

**R3-16 · Forge Surchauffée : objets** ✔  
Les objets trouvés dans ce donjon.  
Grille : 3 × 2  
Cases : 1) La Lanterne RGB : une lanterne de métal sombre dont la vitre brille en dégradé rouge, vert et bleu. · 2) Le Micro Pro : seulement la tige du micro, sans casque, sans arceau et sans écouteur : une fine tige courbe qui se fixe à l'écouteur gauche de Spirit, avec la capsule du micro au bout, vue de profil, même forme que la tige du micro de Spirit sur la planche jointe, en métal chromé argenté avec une bague cyan #35d6ff, un peu plus épaisse que celle de Spirit · 3) La Lanterne RGB, même dessin avec un éclat de lumière blanc (quand on le trouve) · 4) Le Micro Pro, même dessin avec un éclat de lumière blanc (quand on le trouve)

### Désert du Lag + Donjon 4

**R4-01 · Désert du Lag : tuiles de sol**  
Les tuiles de sol de 20 × 20 pixels : je construis tous les écrans avec. Les bords s'emboîtent : garde toute la planche dans la même conversation.  
Grille : 12 × 8  
Cases : 1) sable doré, tuile de base qui se répète sans raccord visible · 2) sable doré, variante avec quelques détails · 3) sable doré, deuxième variante · 4) sable doré, variante avec de petites fleurs ou petits détails colorés · 5) dalles de grès, tuile de base qui se répète sans raccord · 6) dalles de grès, variante · 7) sables mouvants, tuile qui se répète (image 1 de l'animation) · 8) sables mouvants, même tuile avec les reflets décalés (image 2) · 9) sables mouvants, image 3 · 10) bord haut gauche d'une zone de dalles de grès entourée de sable doré · 11) bord haut d'une zone de dalles de grès · 12) bord haut droit d'une zone de dalles de grès · 13) bord gauche d'une zone de dalles de grès · 14) bord droit d'une zone de dalles de grès · 15) bord bas gauche d'une zone de dalles de grès · 16) bord bas d'une zone de dalles de grès · 17) bord bas droit d'une zone de dalles de grès · 18) coin intérieur haut gauche : dalles de grès partout sauf un petit coin de sable doré en haut à gauche · 19) coin intérieur haut droit · 20) coin intérieur bas gauche · 21) coin intérieur bas droit · 22) berge haut gauche d'une étendue de sables mouvants entourée de sable doré · 23) berge haute · 24) berge haut droite · 25) berge gauche · 26) berge droite · 27) berge bas gauche · 28) berge basse · 29) berge bas droite · 30) coin intérieur de berge haut gauche · 31) coin intérieur de berge haut droit · 32) coin intérieur de berge bas gauche · 33) coin intérieur de berge bas droit · 34) falaise de grès : haut de falaise, bord gauche · 35) falaise de grès : haut de falaise, bord du milieu · 36) falaise de grès : haut de falaise, bord droit · 37) falaise de grès : paroi, côté gauche · 38) falaise de grès : paroi, milieu · 39) falaise de grès : paroi, côté droit · 40) falaise de grès : pied de paroi, gauche · 41) falaise de grès : pied de paroi, milieu · 42) falaise de grès : pied de paroi, droit · 43) entrée de temple-cinéma : moitié haut gauche (l'entrée fait 2 × 2 tuiles, creusée dans la paroi) · 44) entrée de temple-cinéma : moitié haut droite · 45) entrée de temple-cinéma : moitié bas gauche, avec l'ouverture sombre · 46) entrée de temple-cinéma : moitié bas droite · 47) des marches d'escalier, vues de dessus

**R4-02 · Désert du Lag : décor posé**  
Tout ce qui est posé sur le sol de la région, avec la version coupée ou cassée de ce qui se coupe ou se casse, et l'environnement animé.  
Grille : 6 × 4  
Cases : 1) un arbre typique de la région (toute la case) · 2) un deuxième arbre · 3) Une touffe d'herbe sèche du désert. · 4) Un petit cactus de verre (on le casse avec l'onde). · 5) Un rocher de grès fissuré. · 6) Un poteau d'accroche pour le grappin : poteau de métal planté, anneau au sommet. · 7) Un panneau de bois délavé, sans texte. · 8) Du sable soulevé par le vent, en traînées horizontales., image 1 · 9) Un tourbillon de sable., image 1 · 10) L'Ensablé qui sort du sable : le sable se creuse en entonnoir puis jaillit., image 1 · 11) Le trou de sable qui se referme., image 1

**R4-03 · Spectre du Lag**  
Toutes les images de ce monstre sur une seule planche.  
Grille : 6 × 4  
Cases : 1) de face, immobile · 2) de face, étiré vers le haut · 3) de face, tassé vers le bas · 4) de dos, immobile · 5) de dos, étiré vers le haut · 6) de dos, tassé vers le bas · 7) de profil, immobile · 8) de profil, étiré vers le haut · 9) de profil, tassé vers le bas · 10) de face, il attaque · 11) de dos, il attaque · 12) de profil, il attaque · 13) de face, touché : il recule, yeux plissés · 14) de dos, touché · 15) de profil, touché · 16) il apparaît (il sort de terre ou se matérialise), image 1 : presque rien · 17) apparition, image 2 : à moitié là · 18) apparition, image 3 : presque entier · 19) l'effet de son attaque (souffle, choc ou éclair, dans ses couleurs), image 1 · 20) l'effet de son attaque, image 2 · 21) l'effet de son attaque, image 3 · 22) il disparaît : il éclate en petits carrés violets et en fumée (image 1) · 23) image 2 de la disparition, plus éclatée · 24) image 3, presque rien

**R4-04 · Ensablé**  
Toutes les images de ce monstre sur une seule planche.  
Grille : 6 × 4  
Cases : 1) de face, immobile · 2) de face, étiré vers le haut · 3) de face, tassé vers le bas · 4) de dos, immobile · 5) de dos, étiré vers le haut · 6) de dos, tassé vers le bas · 7) de profil, immobile · 8) de profil, étiré vers le haut · 9) de profil, tassé vers le bas · 10) de face, il attaque · 11) de dos, il attaque · 12) de profil, il attaque · 13) de face, touché : il recule, yeux plissés · 14) de dos, touché · 15) de profil, touché · 16) il apparaît (il sort de terre ou se matérialise), image 1 : presque rien · 17) apparition, image 2 : à moitié là · 18) apparition, image 3 : presque entier · 19) l'effet de son attaque (souffle, choc ou éclair, dans ses couleurs), image 1 · 20) l'effet de son attaque, image 2 · 21) l'effet de son attaque, image 3 · 22) il disparaît : il éclate en petits carrés violets et en fumée (image 1) · 23) image 2 de la disparition, plus éclatée · 24) image 3, presque rien

**R4-05 · Scorpion de verre**  
Toutes les images de ce monstre sur une seule planche.  
Grille : 6 × 4  
Cases : 1) de face, immobile · 2) de face, pied gauche en avant · 3) de face, pied droit en avant · 4) de dos, immobile · 5) de dos, pied gauche en avant · 6) de dos, pied droit en avant · 7) de profil, immobile · 8) de profil, pied gauche en avant · 9) de profil, pied droit en avant · 10) de face, il attaque · 11) de dos, il attaque · 12) de profil, il attaque · 13) de face, touché : il recule, yeux plissés · 14) de dos, touché · 15) de profil, touché · 16) il apparaît (il sort de terre ou se matérialise), image 1 : presque rien · 17) apparition, image 2 : à moitié là · 18) apparition, image 3 : presque entier · 19) l'effet de son attaque (souffle, choc ou éclair, dans ses couleurs), image 1 · 20) l'effet de son attaque, image 2 · 21) l'effet de son attaque, image 3 · 22) il disparaît : il éclate en petits carrés violets et en fumée (image 1) · 23) image 2 de la disparition, plus éclatée · 24) image 3, presque rien

**R4-06 · Lagger**  
Toutes les images de ce monstre sur une seule planche.  
Grille : 6 × 4  
Cases : 1) de face, immobile · 2) de face, pied gauche en avant · 3) de face, pied droit en avant · 4) de dos, immobile · 5) de dos, pied gauche en avant · 6) de dos, pied droit en avant · 7) de profil, immobile · 8) de profil, pied gauche en avant · 9) de profil, pied droit en avant · 10) de face, il attaque · 11) de dos, il attaque · 12) de profil, il attaque · 13) de face, touché : il recule, yeux plissés · 14) de dos, touché · 15) de profil, touché · 16) il apparaît (il sort de terre ou se matérialise), image 1 : presque rien · 17) apparition, image 2 : à moitié là · 18) apparition, image 3 : presque entier · 19) l'effet de son attaque (souffle, choc ou éclair, dans ses couleurs), image 1 · 20) l'effet de son attaque, image 2 · 21) l'effet de son attaque, image 3 · 22) il disparaît : il éclate en petits carrés violets et en fumée (image 1) · 23) image 2 de la disparition, plus éclatée · 24) image 3, presque rien

**R4-07 · Sablier**  
Toutes les images de ce monstre sur une seule planche.  
Grille : 6 × 4  
Cases : 1) de face, immobile · 2) de face, pied gauche en avant · 3) de face, pied droit en avant · 4) de dos, immobile · 5) de dos, pied gauche en avant · 6) de dos, pied droit en avant · 7) de profil, immobile · 8) de profil, pied gauche en avant · 9) de profil, pied droit en avant · 10) de face, il attaque · 11) de dos, il attaque · 12) de profil, il attaque · 13) de face, touché : il recule, yeux plissés · 14) de dos, touché · 15) de profil, touché · 16) il apparaît (il sort de terre ou se matérialise), image 1 : presque rien · 17) apparition, image 2 : à moitié là · 18) apparition, image 3 : presque entier · 19) l'effet de son attaque (souffle, choc ou éclair, dans ses couleurs), image 1 · 20) l'effet de son attaque, image 2 · 21) l'effet de son attaque, image 3 · 22) il disparaît : il éclate en petits carrés violets et en fumée (image 1) · 23) image 2 de la disparition, plus éclatée · 24) image 3, presque rien

**R4-08 · Mirage**  
Toutes les images de ce monstre sur une seule planche.  
Grille : 6 × 4  
Cases : 1) de face, immobile · 2) de face, pied gauche en avant · 3) de face, pied droit en avant · 4) de dos, immobile · 5) de dos, pied gauche en avant · 6) de dos, pied droit en avant · 7) de profil, immobile · 8) de profil, pied gauche en avant · 9) de profil, pied droit en avant · 10) de face, il attaque · 11) de dos, il attaque · 12) de profil, il attaque · 13) de face, touché : il recule, yeux plissés · 14) de dos, touché · 15) de profil, touché · 16) il apparaît (il sort de terre ou se matérialise), image 1 : presque rien · 17) apparition, image 2 : à moitié là · 18) apparition, image 3 : presque entier · 19) l'effet de son attaque (souffle, choc ou éclair, dans ses couleurs), image 1 · 20) l'effet de son attaque, image 2 · 21) l'effet de son attaque, image 3 · 22) il disparaît : il éclate en petits carrés violets et en fumée (image 1) · 23) image 2 de la disparition, plus éclatée · 24) image 3, presque rien

**R4-09 · Chauve-souris (Salle Obscure)**  
Toutes les images de ce monstre sur une seule planche.  
Grille : 6 × 4  
Cases : 1) de face, immobile · 2) de face, ailes levées · 3) de face, ailes baissées · 4) de dos, immobile · 5) de dos, ailes levées · 6) de dos, ailes baissées · 7) de profil, immobile · 8) de profil, ailes levées · 9) de profil, ailes baissées · 10) de face, il attaque · 11) de dos, il attaque · 12) de profil, il attaque · 13) de face, touché : il recule, yeux plissés · 14) de dos, touché · 15) de profil, touché · 16) il apparaît (il sort de terre ou se matérialise), image 1 : presque rien · 17) apparition, image 2 : à moitié là · 18) apparition, image 3 : presque entier · 19) l'effet de son attaque (souffle, choc ou éclair, dans ses couleurs), image 1 · 20) l'effet de son attaque, image 2 · 21) l'effet de son attaque, image 3 · 22) il disparaît : il éclate en petits carrés violets et en fumée (image 1) · 23) image 2 de la disparition, plus éclatée · 24) image 3, presque rien

**R4-10 · Le Spoiler**  
Le boss sur une planche de 6 grandes cases.  
Grille : 3 × 2  
Cases : 1) de face, immobile et menaçant · 2) de face, il attaque · 3) de face, étourdi : tête basse, yeux qui clignotent, fissures qui s'éteignent · 4) de face, touché : il recule, tout blanc (image de flash) · 5) son projectile : Un fragment de pellicule tranchant qui tourne · 6) il est vaincu : il se désagrège en carrés violets et en fumée

**R4-11 · Désert du Lag : Gardien et habitant**  
Les personnages qui marchent et parlent. Toute la planche est remplie : deux rangées par personnage quand il y en a deux, une rangée quand il y en a quatre.  
Grille : 6 × 4  
Cases : 1) Bobine (un fennec aux immenses oreilles, écharpe rouge, clap de cinéma à la main (sans texte).) de face, immobile · 2) Bobine de face, pied gauche en avant · 3) Bobine de face, pied droit en avant · 4) Bobine de dos, immobile · 5) Bobine de dos, pied gauche en avant · 6) Bobine de dos, pied droit en avant · 7) Bobine de profil, immobile · 8) Bobine de profil, jambe avant tendue · 9) Bobine de profil, jambes croisées (pas de passage) · 10) Bobine de face : en train de refermer son clap, clin d'œil · 11) Bobine de face, il parle : bouche ouverte, une main levée · 12) Bobine de face, surpris : yeux grands ouverts, bras écartés · 13) Mirza (une chamelle drapée de tissus, sacoches pleines, debout de face, entier.) de face, immobile · 14) Mirza de face, pied gauche en avant · 15) Mirza de face, pied droit en avant · 16) Mirza de dos, immobile · 17) Mirza de dos, pied gauche en avant · 18) Mirza de dos, pied droit en avant · 19) Mirza de profil, immobile · 20) Mirza de profil, jambe avant tendue · 21) Mirza de profil, jambes croisées (pas de passage) · 22) Mirza de face : il salue · 23) Mirza de face, il parle : bouche ouverte, une main levée · 24) Mirza de face, surpris : yeux grands ouverts, bras écartés

**R4-12 · Désert du Lag : Gardien et habitant : portraits**  
Les portraits affichés à côté du texte des dialogues.  
Grille : 3 × 2  
Cases : 1) portrait de Bobine : buste et tête de face, expression neutre · 2) portrait de Bobine : buste et tête de face, il parle, bouche ouverte, expression vive · 3) portrait de Bobine : buste et tête de face, content, grand sourire · 4) portrait de Mirza : buste et tête de face, expression neutre · 5) portrait de Mirza : buste et tête de face, il parle, bouche ouverte, expression vive · 6) portrait de Mirza : buste et tête de face, content, grand sourire

**R4-13 · Salle Obscure : sols et murs**  
Les tuiles de sol de 20 × 20 pixels : je construis tous les écrans avec. Les bords s'emboîtent : garde toute la planche dans la même conversation.  
Grille : 12 × 8  
Cases : 1) dalles de pierre du donjon (velours rouge sombre et pierre noire, ambiance de cinéma), tuile de base qui se répète sans raccord visible · 2) dalles de pierre du donjon (velours rouge sombre et pierre noire, ambiance de cinéma), variante avec quelques détails · 3) dalles de pierre du donjon (velours rouge sombre et pierre noire, ambiance de cinéma), deuxième variante · 4) dalles de pierre du donjon (velours rouge sombre et pierre noire, ambiance de cinéma), variante avec de petites fleurs ou petits détails colorés · 5) sol plus clair d'un couloir, tuile de base qui se répète sans raccord · 6) sol plus clair d'un couloir, variante · 7) trou sans fond (vide noir), tuile qui se répète (image 1 de l'animation) · 8) trou sans fond (vide noir), même tuile avec les reflets décalés (image 2) · 9) trou sans fond (vide noir), image 3 · 10) bord haut gauche d'une zone de sol plus clair d'un couloir entourée de dalles de pierre du donjon (velours rouge sombre et pierre noire, ambiance de cinéma) · 11) bord haut d'une zone de sol plus clair d'un couloir · 12) bord haut droit d'une zone de sol plus clair d'un couloir · 13) bord gauche d'une zone de sol plus clair d'un couloir · 14) bord droit d'une zone de sol plus clair d'un couloir · 15) bord bas gauche d'une zone de sol plus clair d'un couloir · 16) bord bas d'une zone de sol plus clair d'un couloir · 17) bord bas droit d'une zone de sol plus clair d'un couloir · 18) coin intérieur haut gauche : sol plus clair d'un couloir partout sauf un petit coin de dalles de pierre du donjon (velours rouge sombre et pierre noire, ambiance de cinéma) en haut à gauche · 19) coin intérieur haut droit · 20) coin intérieur bas gauche · 21) coin intérieur bas droit · 22) berge haut gauche d'une étendue de trou sans fond (vide noir) entourée de dalles de pierre du donjon (velours rouge sombre et pierre noire, ambiance de cinéma) · 23) berge haute · 24) berge haut droite · 25) berge gauche · 26) berge droite · 27) berge bas gauche · 28) berge basse · 29) berge bas droite · 30) coin intérieur de berge haut gauche · 31) coin intérieur de berge haut droit · 32) coin intérieur de berge bas gauche · 33) coin intérieur de berge bas droit · 34) mur épais du donjon (velours rouge sombre et pierre noire, ambiance de cinéma) : haut de falaise, bord gauche · 35) mur épais du donjon (velours rouge sombre et pierre noire, ambiance de cinéma) : haut de falaise, bord du milieu · 36) mur épais du donjon (velours rouge sombre et pierre noire, ambiance de cinéma) : haut de falaise, bord droit · 37) mur épais du donjon (velours rouge sombre et pierre noire, ambiance de cinéma) : paroi, côté gauche · 38) mur épais du donjon (velours rouge sombre et pierre noire, ambiance de cinéma) : paroi, milieu · 39) mur épais du donjon (velours rouge sombre et pierre noire, ambiance de cinéma) : paroi, côté droit · 40) mur épais du donjon (velours rouge sombre et pierre noire, ambiance de cinéma) : pied de paroi, gauche · 41) mur épais du donjon (velours rouge sombre et pierre noire, ambiance de cinéma) : pied de paroi, milieu · 42) mur épais du donjon (velours rouge sombre et pierre noire, ambiance de cinéma) : pied de paroi, droit · 43) porte du donjon : moitié haut gauche (l'entrée fait 2 × 2 tuiles, creusée dans la paroi) · 44) porte du donjon : moitié haut droite · 45) porte du donjon : moitié bas gauche, avec l'ouverture sombre · 46) porte du donjon : moitié bas droite · 47) des marches d'escalier, vues de dessus

**R4-14 · Salle Obscure : portes**  
Chaque porte dans tous ses états. La porte est dessinée dans l'épaisseur du mur, comme un tunnel.  
Grille : 6 × 4  
Cases : 1) porte du mur du haut, ouverte · 2) porte du mur du haut, fermée par une grille · 3) porte du mur du haut, verrouillée par une serrure dorée · 4) porte du mur du haut, porte du boss, ornée et menaçante · 5) porte du mur du haut, murée (mur plein) · 6) porte du mur du haut, fissurée (on peut la faire sauter) · 7) porte du mur du bas, ouverte · 8) porte du mur du bas, fermée par une grille · 9) porte du mur du bas, verrouillée · 10) porte du mur du bas, porte du boss · 11) porte du mur du bas, murée · 12) porte du mur du bas, fissurée · 13) porte du mur de gauche, ouverte · 14) porte du mur de gauche, fermée par une grille · 15) porte du mur de gauche, verrouillée · 16) porte du mur de gauche, porte du boss · 17) porte du mur de gauche, murée · 18) porte du mur de gauche, fissurée · 19) porte du mur de droite, ouverte · 20) porte du mur de droite, fermée par une grille · 21) porte du mur de droite, verrouillée · 22) porte du mur de droite, porte du boss · 23) porte du mur de droite, murée · 24) porte du mur de droite, fissurée

**R4-15 · Salle Obscure : objets et mécanismes**  
Tout ce qui est posé dans les salles, à la même échelle.  
Grille : 6 × 4  
Cases : 1) un bloc à pousser, même pierre que les murs · 2) une statue gardienne sur socle (toutes les statues sont identiques, même celle qu'on peut pousser) · 3) un projecteur de cinéma sur pied, éteinte · 4) un projecteur de cinéma sur pied, allumée, image 1 · 5) un projecteur de cinéma sur pied, allumée, image 2 · 6) un pot fermé · 7) le pot qui se brise · 8) un coffre fermé · 9) le même coffre ouvert, vide · 10) un grand coffre (celui de l'objet du donjon), fermé · 11) le grand coffre ouvert · 12) une plaque de pression au sol · 13) la même plaque enfoncée · 14) un cristal éteint sur socle (il réagit à la Manette) · 15) le même cristal allumé · 16) un escalier qui descend · 17) une échelle · 18) le socle de l'objet · 19) Une torche murale de cinéma éteinte. · 20) La même torche allumée. · 21) Un grand écran de projection encastré, éteint. · 22) Le même écran allumé qui montre une flèche lumineuse (sans texte). · 23) Un rideau de velours noir fermé qui bloque un passage.

**R4-16 · Salle Obscure : objets**  
Les objets trouvés dans ce donjon.  
Grille : 3 × 2  
Cases : 1) Le Câble Grappin : un pistolet-enrouleur de câble réseau bleu, crochet de métal au bout. · 2) Le crochet du grappin seul, vu de profil, pointe vers la droite (projectile). · 3) Le Casque 2.0 (trésor caché) : le casque-micro de Spirit seul, posé, vu de face : arceau, deux écouteurs ronds et la fine tige du micro, exactement la forme du casque de Spirit sur la planche jointe ; les parties noires restent noires, toutes les parties qui sont bleues et cyan sur le casque normal sont en or (or #f2c230, ombre #b8860b, lumière #fff1a0) · 4) Le Câble Grappin, même dessin avec un éclat de lumière blanc (quand on le trouve) · 5) Le crochet du grappin seul, vu de profil, pointe vers la droite (projectile)., même dessin avec un éclat de lumière blanc (quand on le trouve) · 6) Le Casque 2.0 (trésor caché), même dessin avec un éclat de lumière blanc (quand on le trouve)

### Lac des Streams + Donjon 5

**R5-01 · Lac des Streams : tuiles de sol**  
Les tuiles de sol de 20 × 20 pixels : je construis tous les écrans avec. Les bords s'emboîtent : garde toute la planche dans la même conversation.  
Grille : 12 × 8  
Cases : 1) herbe de rive et galets, tuile de base qui se répète sans raccord visible · 2) herbe de rive et galets, variante avec quelques détails · 3) herbe de rive et galets, deuxième variante · 4) herbe de rive et galets, variante avec de petites fleurs ou petits détails colorés · 5) ponton de bois, tuile de base qui se répète sans raccord · 6) ponton de bois, variante · 7) eau calme bleu clair (on glisse dessus avec la Planche) et eau profonde bleu nuit (infranchissable), tuile qui se répète (image 1 de l'animation) · 8) eau calme bleu clair (on glisse dessus avec la Planche) et eau profonde bleu nuit (infranchissable), même tuile avec les reflets décalés (image 2) · 9) eau calme bleu clair (on glisse dessus avec la Planche) et eau profonde bleu nuit (infranchissable), image 3 · 10) bord haut gauche d'une zone de ponton de bois entourée de herbe de rive et galets · 11) bord haut d'une zone de ponton de bois · 12) bord haut droit d'une zone de ponton de bois · 13) bord gauche d'une zone de ponton de bois · 14) bord droit d'une zone de ponton de bois · 15) bord bas gauche d'une zone de ponton de bois · 16) bord bas d'une zone de ponton de bois · 17) bord bas droit d'une zone de ponton de bois · 18) coin intérieur haut gauche : ponton de bois partout sauf un petit coin de herbe de rive et galets en haut à gauche · 19) coin intérieur haut droit · 20) coin intérieur bas gauche · 21) coin intérieur bas droit · 22) berge haut gauche d'une étendue de eau calme bleu clair (on glisse dessus avec la Planche) et eau profonde bleu nuit (infranchissable) entourée de herbe de rive et galets · 23) berge haute · 24) berge haut droite · 25) berge gauche · 26) berge droite · 27) berge bas gauche · 28) berge basse · 29) berge bas droite · 30) coin intérieur de berge haut gauche · 31) coin intérieur de berge haut droit · 32) coin intérieur de berge bas gauche · 33) coin intérieur de berge bas droit · 34) falaise de roche bleu-vert : haut de falaise, bord gauche · 35) falaise de roche bleu-vert : haut de falaise, bord du milieu · 36) falaise de roche bleu-vert : haut de falaise, bord droit · 37) falaise de roche bleu-vert : paroi, côté gauche · 38) falaise de roche bleu-vert : paroi, milieu · 39) falaise de roche bleu-vert : paroi, côté droit · 40) falaise de roche bleu-vert : pied de paroi, gauche · 41) falaise de roche bleu-vert : pied de paroi, milieu · 42) falaise de roche bleu-vert : pied de paroi, droit · 43) entrée d'arène à moitié engloutie : moitié haut gauche (l'entrée fait 2 × 2 tuiles, creusée dans la paroi) · 44) entrée d'arène à moitié engloutie : moitié haut droite · 45) entrée d'arène à moitié engloutie : moitié bas gauche, avec l'ouverture sombre · 46) entrée d'arène à moitié engloutie : moitié bas droite · 47) des marches d'escalier, vues de dessus

**R5-02 · Lac des Streams : décor posé**  
Tout ce qui est posé sur le sol de la région, avec la version coupée ou cassée de ce qui se coupe ou se casse, et l'environnement animé.  
Grille : 6 × 4  
Cases : 1) un arbre typique de la région (toute la case) · 2) un deuxième arbre · 3) Une touffe de roseaux (on la coupe avec l'onde). · 4) Un nénuphar flottant. · 5) Un rocher moussu fissuré. · 6) Une bouée rouge et blanche. · 7) Un panneau de bois, sans texte. · 8) Des ronds dans l'eau qui s'élargissent., image 1 · 9) Des éclaboussures quand quelque chose tombe à l'eau., image 1 · 10) La pluie : une goutte qui tombe et son petit éclaboussement au sol., image 1 · 11) Un Triton qui surgit de l'eau : gerbe d'eau., image 1

**R5-03 · Triton à trident**  
Toutes les images de ce monstre sur une seule planche.  
Grille : 6 × 4  
Cases : 1) de face, immobile · 2) de face, pied gauche en avant · 3) de face, pied droit en avant · 4) de dos, immobile · 5) de dos, pied gauche en avant · 6) de dos, pied droit en avant · 7) de profil, immobile · 8) de profil, pied gauche en avant · 9) de profil, pied droit en avant · 10) de face, il attaque · 11) de dos, il attaque · 12) de profil, il attaque · 13) de face, touché : il recule, yeux plissés · 14) de dos, touché · 15) de profil, touché · 16) il apparaît (il sort de terre ou se matérialise), image 1 : presque rien · 17) apparition, image 2 : à moitié là · 18) apparition, image 3 : presque entier · 19) l'effet de son attaque (souffle, choc ou éclair, dans ses couleurs), image 1 · 20) l'effet de son attaque, image 2 · 21) l'effet de son attaque, image 3 · 22) il disparaît : il éclate en petits carrés violets et en fumée (image 1) · 23) image 2 de la disparition, plus éclatée · 24) image 3, presque rien

**R5-04 · Méduse électrique**  
Toutes les images de ce monstre sur une seule planche.  
Grille : 6 × 4  
Cases : 1) de face, immobile · 2) de face, étiré vers le haut · 3) de face, tassé vers le bas · 4) de dos, immobile · 5) de dos, étiré vers le haut · 6) de dos, tassé vers le bas · 7) de profil, immobile · 8) de profil, étiré vers le haut · 9) de profil, tassé vers le bas · 10) de face, il attaque · 11) de dos, il attaque · 12) de profil, il attaque · 13) de face, touché : il recule, yeux plissés · 14) de dos, touché · 15) de profil, touché · 16) il apparaît (il sort de terre ou se matérialise), image 1 : presque rien · 17) apparition, image 2 : à moitié là · 18) apparition, image 3 : presque entier · 19) l'effet de son attaque (souffle, choc ou éclair, dans ses couleurs), image 1 · 20) l'effet de son attaque, image 2 · 21) l'effet de son attaque, image 3 · 22) il disparaît : il éclate en petits carrés violets et en fumée (image 1) · 23) image 2 de la disparition, plus éclatée · 24) image 3, presque rien

**R5-05 · Crabe-armure**  
Toutes les images de ce monstre sur une seule planche.  
Grille : 6 × 4  
Cases : 1) de face, immobile · 2) de face, pied gauche en avant · 3) de face, pied droit en avant · 4) de dos, immobile · 5) de dos, pied gauche en avant · 6) de dos, pied droit en avant · 7) de profil, immobile · 8) de profil, pied gauche en avant · 9) de profil, pied droit en avant · 10) de face, il attaque · 11) de dos, il attaque · 12) de profil, il attaque · 13) de face, touché : il recule, yeux plissés · 14) de dos, touché · 15) de profil, touché · 16) il apparaît (il sort de terre ou se matérialise), image 1 : presque rien · 17) apparition, image 2 : à moitié là · 18) apparition, image 3 : presque entier · 19) l'effet de son attaque (souffle, choc ou éclair, dans ses couleurs), image 1 · 20) l'effet de son attaque, image 2 · 21) l'effet de son attaque, image 3 · 22) il disparaît : il éclate en petits carrés violets et en fumée (image 1) · 23) image 2 de la disparition, plus éclatée · 24) image 3, presque rien

**R5-06 · Poisson-spoil**  
Toutes les images de ce monstre sur une seule planche.  
Grille : 6 × 4  
Cases : 1) de face, immobile · 2) de face, pied gauche en avant · 3) de face, pied droit en avant · 4) de dos, immobile · 5) de dos, pied gauche en avant · 6) de dos, pied droit en avant · 7) de profil, immobile · 8) de profil, pied gauche en avant · 9) de profil, pied droit en avant · 10) de face, il attaque · 11) de dos, il attaque · 12) de profil, il attaque · 13) de face, touché : il recule, yeux plissés · 14) de dos, touché · 15) de profil, touché · 16) il apparaît (il sort de terre ou se matérialise), image 1 : presque rien · 17) apparition, image 2 : à moitié là · 18) apparition, image 3 : presque entier · 19) l'effet de son attaque (souffle, choc ou éclair, dans ses couleurs), image 1 · 20) l'effet de son attaque, image 2 · 21) l'effet de son attaque, image 3 · 22) il disparaît : il éclate en petits carrés violets et en fumée (image 1) · 23) image 2 de la disparition, plus éclatée · 24) image 3, presque rien

**R5-07 · Bulle de chat**  
Toutes les images de ce monstre sur une seule planche.  
Grille : 6 × 4  
Cases : 1) de face, immobile · 2) de face, pied gauche en avant · 3) de face, pied droit en avant · 4) de dos, immobile · 5) de dos, pied gauche en avant · 6) de dos, pied droit en avant · 7) de profil, immobile · 8) de profil, pied gauche en avant · 9) de profil, pied droit en avant · 10) de face, il attaque · 11) de dos, il attaque · 12) de profil, il attaque · 13) de face, touché : il recule, yeux plissés · 14) de dos, touché · 15) de profil, touché · 16) il apparaît (il sort de terre ou se matérialise), image 1 : presque rien · 17) apparition, image 2 : à moitié là · 18) apparition, image 3 : presque entier · 19) l'effet de son attaque (souffle, choc ou éclair, dans ses couleurs), image 1 · 20) l'effet de son attaque, image 2 · 21) l'effet de son attaque, image 3 · 22) il disparaît : il éclate en petits carrés violets et en fumée (image 1) · 23) image 2 de la disparition, plus éclatée · 24) image 3, presque rien

**R5-08 · Crabe-captcha**  
Toutes les images de ce monstre sur une seule planche.  
Grille : 6 × 4  
Cases : 1) de face, immobile · 2) de face, pied gauche en avant · 3) de face, pied droit en avant · 4) de dos, immobile · 5) de dos, pied gauche en avant · 6) de dos, pied droit en avant · 7) de profil, immobile · 8) de profil, pied gauche en avant · 9) de profil, pied droit en avant · 10) de face, il attaque · 11) de dos, il attaque · 12) de profil, il attaque · 13) de face, touché : il recule, yeux plissés · 14) de dos, touché · 15) de profil, touché · 16) il apparaît (il sort de terre ou se matérialise), image 1 : presque rien · 17) apparition, image 2 : à moitié là · 18) apparition, image 3 : presque entier · 19) l'effet de son attaque (souffle, choc ou éclair, dans ses couleurs), image 1 · 20) l'effet de son attaque, image 2 · 21) l'effet de son attaque, image 3 · 22) il disparaît : il éclate en petits carrés violets et en fumée (image 1) · 23) image 2 de la disparition, plus éclatée · 24) image 3, presque rien

**R5-09 · Chauve-souris (Arène Engloutie)**  
Toutes les images de ce monstre sur une seule planche.  
Grille : 6 × 4  
Cases : 1) de face, immobile · 2) de face, ailes levées · 3) de face, ailes baissées · 4) de dos, immobile · 5) de dos, ailes levées · 6) de dos, ailes baissées · 7) de profil, immobile · 8) de profil, ailes levées · 9) de profil, ailes baissées · 10) de face, il attaque · 11) de dos, il attaque · 12) de profil, il attaque · 13) de face, touché : il recule, yeux plissés · 14) de dos, touché · 15) de profil, touché · 16) il apparaît (il sort de terre ou se matérialise), image 1 : presque rien · 17) apparition, image 2 : à moitié là · 18) apparition, image 3 : presque entier · 19) l'effet de son attaque (souffle, choc ou éclair, dans ses couleurs), image 1 · 20) l'effet de son attaque, image 2 · 21) l'effet de son attaque, image 3 · 22) il disparaît : il éclate en petits carrés violets et en fumée (image 1) · 23) image 2 de la disparition, plus éclatée · 24) image 3, presque rien

**R5-10 · Le Kraken du Chat**  
Le boss sur une planche de 6 grandes cases.  
Grille : 3 × 2  
Cases : 1) de face, immobile et menaçant · 2) de face, il attaque · 3) de face, étourdi : tête basse, yeux qui clignotent, fissures qui s'éteignent · 4) de face, touché : il recule, tout blanc (image de flash) · 5) son projectile : Une bulle de chat noire qui rebondit · 6) il est vaincu : il se désagrège en carrés violets et en fumée

**R5-11 · Lac des Streams : Gardien et habitant**  
Les personnages qui marchent et parlent. Toute la planche est remplie : deux rangées par personnage quand il y en a deux, une rangée quand il y en a quatre.  
Grille : 6 × 4  
Cases : 1) Replay (une loutre avec un casque-micro orange de commentatrice, veste de sport, carton de score à la main (sans chiffres).) de face, immobile · 2) Replay de face, pied gauche en avant · 3) Replay de face, pied droit en avant · 4) Replay de dos, immobile · 5) Replay de dos, pied gauche en avant · 6) Replay de dos, pied droit en avant · 7) Replay de profil, immobile · 8) Replay de profil, jambe avant tendue · 9) Replay de profil, jambes croisées (pas de passage) · 10) Replay de face : bras levés en train de commenter une action, bouche ouverte · 11) Replay de face, il parle : bouche ouverte, une main levée · 12) Replay de face, surpris : yeux grands ouverts, bras écartés · 13) Capitaine Plouf (un vieux pélican en ciré jaune, pipe éteinte, casquette de marin, debout de face, entier.) de face, immobile · 14) Capitaine Plouf de face, pied gauche en avant · 15) Capitaine Plouf de face, pied droit en avant · 16) Capitaine Plouf de dos, immobile · 17) Capitaine Plouf de dos, pied gauche en avant · 18) Capitaine Plouf de dos, pied droit en avant · 19) Capitaine Plouf de profil, immobile · 20) Capitaine Plouf de profil, jambe avant tendue · 21) Capitaine Plouf de profil, jambes croisées (pas de passage) · 22) Capitaine Plouf de face : il salue · 23) Capitaine Plouf de face, il parle : bouche ouverte, une main levée · 24) Capitaine Plouf de face, surpris : yeux grands ouverts, bras écartés

**R5-12 · Lac des Streams : Gardien et habitant : portraits**  
Les portraits affichés à côté du texte des dialogues.  
Grille : 3 × 2  
Cases : 1) portrait de Replay : buste et tête de face, expression neutre · 2) portrait de Replay : buste et tête de face, il parle, bouche ouverte, expression vive · 3) portrait de Replay : buste et tête de face, content, grand sourire · 4) portrait de Capitaine Plouf : buste et tête de face, expression neutre · 5) portrait de Capitaine Plouf : buste et tête de face, il parle, bouche ouverte, expression vive · 6) portrait de Capitaine Plouf : buste et tête de face, content, grand sourire

**R5-13 · Arène Engloutie : sols et murs**  
Les tuiles de sol de 20 × 20 pixels : je construis tous les écrans avec. Les bords s'emboîtent : garde toute la planche dans la même conversation.  
Grille : 12 × 8  
Cases : 1) dalles de pierre du donjon (pierre bleu-vert mouillée, flaques), tuile de base qui se répète sans raccord visible · 2) dalles de pierre du donjon (pierre bleu-vert mouillée, flaques), variante avec quelques détails · 3) dalles de pierre du donjon (pierre bleu-vert mouillée, flaques), deuxième variante · 4) dalles de pierre du donjon (pierre bleu-vert mouillée, flaques), variante avec de petites fleurs ou petits détails colorés · 5) sol plus clair d'un couloir, tuile de base qui se répète sans raccord · 6) sol plus clair d'un couloir, variante · 7) trou sans fond (vide noir), tuile qui se répète (image 1 de l'animation) · 8) trou sans fond (vide noir), même tuile avec les reflets décalés (image 2) · 9) trou sans fond (vide noir), image 3 · 10) bord haut gauche d'une zone de sol plus clair d'un couloir entourée de dalles de pierre du donjon (pierre bleu-vert mouillée, flaques) · 11) bord haut d'une zone de sol plus clair d'un couloir · 12) bord haut droit d'une zone de sol plus clair d'un couloir · 13) bord gauche d'une zone de sol plus clair d'un couloir · 14) bord droit d'une zone de sol plus clair d'un couloir · 15) bord bas gauche d'une zone de sol plus clair d'un couloir · 16) bord bas d'une zone de sol plus clair d'un couloir · 17) bord bas droit d'une zone de sol plus clair d'un couloir · 18) coin intérieur haut gauche : sol plus clair d'un couloir partout sauf un petit coin de dalles de pierre du donjon (pierre bleu-vert mouillée, flaques) en haut à gauche · 19) coin intérieur haut droit · 20) coin intérieur bas gauche · 21) coin intérieur bas droit · 22) berge haut gauche d'une étendue de trou sans fond (vide noir) entourée de dalles de pierre du donjon (pierre bleu-vert mouillée, flaques) · 23) berge haute · 24) berge haut droite · 25) berge gauche · 26) berge droite · 27) berge bas gauche · 28) berge basse · 29) berge bas droite · 30) coin intérieur de berge haut gauche · 31) coin intérieur de berge haut droit · 32) coin intérieur de berge bas gauche · 33) coin intérieur de berge bas droit · 34) mur épais du donjon (pierre bleu-vert mouillée, flaques) : haut de falaise, bord gauche · 35) mur épais du donjon (pierre bleu-vert mouillée, flaques) : haut de falaise, bord du milieu · 36) mur épais du donjon (pierre bleu-vert mouillée, flaques) : haut de falaise, bord droit · 37) mur épais du donjon (pierre bleu-vert mouillée, flaques) : paroi, côté gauche · 38) mur épais du donjon (pierre bleu-vert mouillée, flaques) : paroi, milieu · 39) mur épais du donjon (pierre bleu-vert mouillée, flaques) : paroi, côté droit · 40) mur épais du donjon (pierre bleu-vert mouillée, flaques) : pied de paroi, gauche · 41) mur épais du donjon (pierre bleu-vert mouillée, flaques) : pied de paroi, milieu · 42) mur épais du donjon (pierre bleu-vert mouillée, flaques) : pied de paroi, droit · 43) porte du donjon : moitié haut gauche (l'entrée fait 2 × 2 tuiles, creusée dans la paroi) · 44) porte du donjon : moitié haut droite · 45) porte du donjon : moitié bas gauche, avec l'ouverture sombre · 46) porte du donjon : moitié bas droite · 47) des marches d'escalier, vues de dessus

**R5-14 · Arène Engloutie : portes**  
Chaque porte dans tous ses états. La porte est dessinée dans l'épaisseur du mur, comme un tunnel.  
Grille : 6 × 4  
Cases : 1) porte du mur du haut, ouverte · 2) porte du mur du haut, fermée par une grille · 3) porte du mur du haut, verrouillée par une serrure dorée · 4) porte du mur du haut, porte du boss, ornée et menaçante · 5) porte du mur du haut, murée (mur plein) · 6) porte du mur du haut, fissurée (on peut la faire sauter) · 7) porte du mur du bas, ouverte · 8) porte du mur du bas, fermée par une grille · 9) porte du mur du bas, verrouillée · 10) porte du mur du bas, porte du boss · 11) porte du mur du bas, murée · 12) porte du mur du bas, fissurée · 13) porte du mur de gauche, ouverte · 14) porte du mur de gauche, fermée par une grille · 15) porte du mur de gauche, verrouillée · 16) porte du mur de gauche, porte du boss · 17) porte du mur de gauche, murée · 18) porte du mur de gauche, fissurée · 19) porte du mur de droite, ouverte · 20) porte du mur de droite, fermée par une grille · 21) porte du mur de droite, verrouillée · 22) porte du mur de droite, porte du boss · 23) porte du mur de droite, murée · 24) porte du mur de droite, fissurée

**R5-15 · Arène Engloutie : objets et mécanismes**  
Tout ce qui est posé dans les salles, à la même échelle.  
Grille : 6 × 4  
Cases : 1) un bloc à pousser, même pierre que les murs · 2) une statue gardienne sur socle (toutes les statues sont identiques, même celle qu'on peut pousser) · 3) une vasque d'eau lumineuse, éteinte · 4) une vasque d'eau lumineuse, allumée, image 1 · 5) une vasque d'eau lumineuse, allumée, image 2 · 6) un pot fermé · 7) le pot qui se brise · 8) un coffre fermé · 9) le même coffre ouvert, vide · 10) un grand coffre (celui de l'objet du donjon), fermé · 11) le grand coffre ouvert · 12) une plaque de pression au sol · 13) la même plaque enfoncée · 14) un cristal éteint sur socle (il réagit à la Manette) · 15) le même cristal allumé · 16) un escalier qui descend · 17) une échelle · 18) le socle de l'objet · 19) Une vanne à volant fermée. · 20) La même vanne ouverte, eau qui jaillit. · 21) Une dalle de sol immergée sous une fine couche d'eau. · 22) Un courant d'eau vu de dessus, flèches d'écume qui indiquent le sens. · 23) Une plateforme flottante carrée en bois.

**R5-16 · Arène Engloutie : objets**  
Les objets trouvés dans ce donjon.  
Grille : 3 × 2  
Cases : 1) La Planche Wi-Fi : une planche flottante blanche et bleue, trois arcs Wi-Fi cyan lumineux dessinés dessus (on monte dessus pour glisser sur l'eau calme). · 2) Le Micro d'Or : seulement la tige du micro, sans casque, sans arceau et sans écouteur : une fine tige courbe qui se fixe à l'écouteur gauche de Spirit, avec la capsule du micro au bout, vue de profil, même forme que la tige du micro de Spirit sur la planche jointe, en or brillant (or #f2c230, ombre #b8860b, lumière #fff1a0) avec une bague cyan #35d6ff · 3) La Planche Wi-Fi, même dessin avec un éclat de lumière blanc (quand on le trouve) · 4) Le Micro d'Or, même dessin avec un éclat de lumière blanc (quand on le trouve)

### Cité des Bulles + Donjon 6

**R6-01 · Cité des Bulles : tuiles de sol**  
Les tuiles de sol de 20 × 20 pixels : je construis tous les écrans avec. Les bords s'emboîtent : garde toute la planche dans la même conversation.  
Grille : 12 × 8  
Cases : 1) pavés de ville colorés, tuile de base qui se répète sans raccord visible · 2) pavés de ville colorés, variante avec quelques détails · 3) pavés de ville colorés, deuxième variante · 4) pavés de ville colorés, variante avec de petites fleurs ou petits détails colorés · 5) trottoir, tuile de base qui se répète sans raccord · 6) trottoir, variante · 7) encre noire, tuile qui se répète (image 1 de l'animation) · 8) encre noire, même tuile avec les reflets décalés (image 2) · 9) encre noire, image 3 · 10) bord haut gauche d'une zone de trottoir entourée de pavés de ville colorés · 11) bord haut d'une zone de trottoir · 12) bord haut droit d'une zone de trottoir · 13) bord gauche d'une zone de trottoir · 14) bord droit d'une zone de trottoir · 15) bord bas gauche d'une zone de trottoir · 16) bord bas d'une zone de trottoir · 17) bord bas droit d'une zone de trottoir · 18) coin intérieur haut gauche : trottoir partout sauf un petit coin de pavés de ville colorés en haut à gauche · 19) coin intérieur haut droit · 20) coin intérieur bas gauche · 21) coin intérieur bas droit · 22) berge haut gauche d'une étendue de encre noire entourée de pavés de ville colorés · 23) berge haute · 24) berge haut droite · 25) berge gauche · 26) berge droite · 27) berge bas gauche · 28) berge basse · 29) berge bas droite · 30) coin intérieur de berge haut gauche · 31) coin intérieur de berge haut droit · 32) coin intérieur de berge bas gauche · 33) coin intérieur de berge bas droit · 34) façade de bâtiment de bande dessinée : haut de falaise, bord gauche · 35) façade de bâtiment de bande dessinée : haut de falaise, bord du milieu · 36) façade de bâtiment de bande dessinée : haut de falaise, bord droit · 37) façade de bâtiment de bande dessinée : paroi, côté gauche · 38) façade de bâtiment de bande dessinée : paroi, milieu · 39) façade de bâtiment de bande dessinée : paroi, côté droit · 40) façade de bâtiment de bande dessinée : pied de paroi, gauche · 41) façade de bâtiment de bande dessinée : pied de paroi, milieu · 42) façade de bâtiment de bande dessinée : pied de paroi, droit · 43) porte de bibliothèque : moitié haut gauche (l'entrée fait 2 × 2 tuiles, creusée dans la paroi) · 44) porte de bibliothèque : moitié haut droite · 45) porte de bibliothèque : moitié bas gauche, avec l'ouverture sombre · 46) porte de bibliothèque : moitié bas droite · 47) des marches d'escalier, vues de dessus

**R6-02 · Cité des Bulles : décor posé**  
Tout ce qui est posé sur le sol de la région, avec la version coupée ou cassée de ce qui se coupe ou se casse, et l'environnement animé.  
Grille : 6 × 4  
Cases : 1) un arbre typique de la région (toute la case) · 2) un deuxième arbre · 3) Une poubelle de rue (on la renverse avec l'onde). · 4) Une caisse en bois. · 5) Une pile de caisses (on la casse avec les Baskets Turbo). · 6) Un panneau de rue, sans texte. · 7) Une bouche d'incendie. · 8) Des bulles de bande dessinée vides qui flottent et éclatent., image 1 · 9) De l'encre qui goutte d'une fontaine., image 1 · 10) Un ennemi qui sort d'une bouche d'égout : le couvercle saute., image 1

**R6-03 · Ombre d'encre**  
Toutes les images de ce monstre sur une seule planche.  
Grille : 6 × 4  
Cases : 1) de face, immobile · 2) de face, étiré vers le haut · 3) de face, tassé vers le bas · 4) de dos, immobile · 5) de dos, étiré vers le haut · 6) de dos, tassé vers le bas · 7) de profil, immobile · 8) de profil, étiré vers le haut · 9) de profil, tassé vers le bas · 10) de face, il attaque · 11) de dos, il attaque · 12) de profil, il attaque · 13) de face, touché : il recule, yeux plissés · 14) de dos, touché · 15) de profil, touché · 16) il apparaît (il sort de terre ou se matérialise), image 1 : presque rien · 17) apparition, image 2 : à moitié là · 18) apparition, image 3 : presque entier · 19) l'effet de son attaque (souffle, choc ou éclair, dans ses couleurs), image 1 · 20) l'effet de son attaque, image 2 · 21) l'effet de son attaque, image 3 · 22) il disparaît : il éclate en petits carrés violets et en fumée (image 1) · 23) image 2 de la disparition, plus éclatée · 24) image 3, presque rien

**R6-04 · Gargouille**  
Toutes les images de ce monstre sur une seule planche.  
Grille : 6 × 4  
Cases : 1) de face, immobile · 2) de face, ailes levées · 3) de face, ailes baissées · 4) de dos, immobile · 5) de dos, ailes levées · 6) de dos, ailes baissées · 7) de profil, immobile · 8) de profil, ailes levées · 9) de profil, ailes baissées · 10) de face, il attaque · 11) de dos, il attaque · 12) de profil, il attaque · 13) de face, touché : il recule, yeux plissés · 14) de dos, touché · 15) de profil, touché · 16) il apparaît (il sort de terre ou se matérialise), image 1 : presque rien · 17) apparition, image 2 : à moitié là · 18) apparition, image 3 : presque entier · 19) l'effet de son attaque (souffle, choc ou éclair, dans ses couleurs), image 1 · 20) l'effet de son attaque, image 2 · 21) l'effet de son attaque, image 3 · 22) il disparaît : il éclate en petits carrés violets et en fumée (image 1) · 23) image 2 de la disparition, plus éclatée · 24) image 3, presque rien

**R6-05 · Masque volant**  
Toutes les images de ce monstre sur une seule planche.  
Grille : 6 × 4  
Cases : 1) de face, immobile · 2) de face, étiré vers le haut · 3) de face, tassé vers le bas · 4) de dos, immobile · 5) de dos, étiré vers le haut · 6) de dos, tassé vers le bas · 7) de profil, immobile · 8) de profil, étiré vers le haut · 9) de profil, tassé vers le bas · 10) de face, il attaque · 11) de dos, il attaque · 12) de profil, il attaque · 13) de face, touché : il recule, yeux plissés · 14) de dos, touché · 15) de profil, touché · 16) il apparaît (il sort de terre ou se matérialise), image 1 : presque rien · 17) apparition, image 2 : à moitié là · 18) apparition, image 3 : presque entier · 19) l'effet de son attaque (souffle, choc ou éclair, dans ses couleurs), image 1 · 20) l'effet de son attaque, image 2 · 21) l'effet de son attaque, image 3 · 22) il disparaît : il éclate en petits carrés violets et en fumée (image 1) · 23) image 2 de la disparition, plus éclatée · 24) image 3, presque rien

**R6-06 · Tache d'encre**  
Toutes les images de ce monstre sur une seule planche.  
Grille : 6 × 4  
Cases : 1) de face, immobile · 2) de face, pied gauche en avant · 3) de face, pied droit en avant · 4) de dos, immobile · 5) de dos, pied gauche en avant · 6) de dos, pied droit en avant · 7) de profil, immobile · 8) de profil, pied gauche en avant · 9) de profil, pied droit en avant · 10) de face, il attaque · 11) de dos, il attaque · 12) de profil, il attaque · 13) de face, touché : il recule, yeux plissés · 14) de dos, touché · 15) de profil, touché · 16) il apparaît (il sort de terre ou se matérialise), image 1 : presque rien · 17) apparition, image 2 : à moitié là · 18) apparition, image 3 : presque entier · 19) l'effet de son attaque (souffle, choc ou éclair, dans ses couleurs), image 1 · 20) l'effet de son attaque, image 2 · 21) l'effet de son attaque, image 3 · 22) il disparaît : il éclate en petits carrés violets et en fumée (image 1) · 23) image 2 de la disparition, plus éclatée · 24) image 3, presque rien

**R6-07 · Onomatopée vivante**  
Toutes les images de ce monstre sur une seule planche.  
Grille : 6 × 4  
Cases : 1) de face, immobile · 2) de face, pied gauche en avant · 3) de face, pied droit en avant · 4) de dos, immobile · 5) de dos, pied gauche en avant · 6) de dos, pied droit en avant · 7) de profil, immobile · 8) de profil, pied gauche en avant · 9) de profil, pied droit en avant · 10) de face, il attaque · 11) de dos, il attaque · 12) de profil, il attaque · 13) de face, touché : il recule, yeux plissés · 14) de dos, touché · 15) de profil, touché · 16) il apparaît (il sort de terre ou se matérialise), image 1 : presque rien · 17) apparition, image 2 : à moitié là · 18) apparition, image 3 : presque entier · 19) l'effet de son attaque (souffle, choc ou éclair, dans ses couleurs), image 1 · 20) l'effet de son attaque, image 2 · 21) l'effet de son attaque, image 3 · 22) il disparaît : il éclate en petits carrés violets et en fumée (image 1) · 23) image 2 de la disparition, plus éclatée · 24) image 3, presque rien

**R6-08 · Case animée**  
Toutes les images de ce monstre sur une seule planche.  
Grille : 6 × 4  
Cases : 1) de face, immobile · 2) de face, pied gauche en avant · 3) de face, pied droit en avant · 4) de dos, immobile · 5) de dos, pied gauche en avant · 6) de dos, pied droit en avant · 7) de profil, immobile · 8) de profil, pied gauche en avant · 9) de profil, pied droit en avant · 10) de face, il attaque · 11) de dos, il attaque · 12) de profil, il attaque · 13) de face, touché : il recule, yeux plissés · 14) de dos, touché · 15) de profil, touché · 16) il apparaît (il sort de terre ou se matérialise), image 1 : presque rien · 17) apparition, image 2 : à moitié là · 18) apparition, image 3 : presque entier · 19) l'effet de son attaque (souffle, choc ou éclair, dans ses couleurs), image 1 · 20) l'effet de son attaque, image 2 · 21) l'effet de son attaque, image 3 · 22) il disparaît : il éclate en petits carrés violets et en fumée (image 1) · 23) image 2 de la disparition, plus éclatée · 24) image 3, presque rien

**R6-09 · Chauve-souris (Bibliothèque des Bulles)**  
Toutes les images de ce monstre sur une seule planche.  
Grille : 6 × 4  
Cases : 1) de face, immobile · 2) de face, ailes levées · 3) de face, ailes baissées · 4) de dos, immobile · 5) de dos, ailes levées · 6) de dos, ailes baissées · 7) de profil, immobile · 8) de profil, ailes levées · 9) de profil, ailes baissées · 10) de face, il attaque · 11) de dos, il attaque · 12) de profil, il attaque · 13) de face, touché : il recule, yeux plissés · 14) de dos, touché · 15) de profil, touché · 16) il apparaît (il sort de terre ou se matérialise), image 1 : presque rien · 17) apparition, image 2 : à moitié là · 18) apparition, image 3 : presque entier · 19) l'effet de son attaque (souffle, choc ou éclair, dans ses couleurs), image 1 · 20) l'effet de son attaque, image 2 · 21) l'effet de son attaque, image 3 · 22) il disparaît : il éclate en petits carrés violets et en fumée (image 1) · 23) image 2 de la disparition, plus éclatée · 24) image 3, presque rien

**R6-10 · Le Plagiaire**  
Le boss sur une planche de 6 grandes cases.  
Grille : 3 × 2  
Cases : 1) de face, immobile et menaçant · 2) de face, il attaque · 3) de face, étourdi : tête basse, yeux qui clignotent, fissures qui s'éteignent · 4) de face, touché : il recule, tout blanc (image de flash) · 5) son projectile : Une onde sonore violette · 6) il est vaincu : il se désagrège en carrés violets et en fumée

**R6-11 · Cité des Bulles : Gardien et habitant**  
Les personnages qui marchent et parlent. Toute la planche est remplie : deux rangées par personnage quand il y en a deux, une rangée quand il y en a quatre.  
Grille : 6 × 4  
Cases : 1) Encre (un calamar debout avec un béret, une plume à la main et un carnet de croquis.) de face, immobile · 2) Encre de face, pied gauche en avant · 3) Encre de face, pied droit en avant · 4) Encre de dos, immobile · 5) Encre de dos, pied gauche en avant · 6) Encre de dos, pied droit en avant · 7) Encre de profil, immobile · 8) Encre de profil, jambe avant tendue · 9) Encre de profil, jambes croisées (pas de passage) · 10) Encre de face : en train de dessiner dans son carnet · 11) Encre de face, il parle : bouche ouverte, une main levée · 12) Encre de face, surpris : yeux grands ouverts, bras écartés · 13) Mme Feuillet (une chatte grise à lunettes en demi-lune, pile de livres, debout de face, entier.) de face, immobile · 14) Mme Feuillet de face, pied gauche en avant · 15) Mme Feuillet de face, pied droit en avant · 16) Mme Feuillet de dos, immobile · 17) Mme Feuillet de dos, pied gauche en avant · 18) Mme Feuillet de dos, pied droit en avant · 19) Mme Feuillet de profil, immobile · 20) Mme Feuillet de profil, jambe avant tendue · 21) Mme Feuillet de profil, jambes croisées (pas de passage) · 22) Mme Feuillet de face : il salue · 23) Mme Feuillet de face, il parle : bouche ouverte, une main levée · 24) Mme Feuillet de face, surpris : yeux grands ouverts, bras écartés

**R6-12 · Cité des Bulles : Gardien et habitant : portraits**  
Les portraits affichés à côté du texte des dialogues.  
Grille : 3 × 2  
Cases : 1) portrait de Encre : buste et tête de face, expression neutre · 2) portrait de Encre : buste et tête de face, il parle, bouche ouverte, expression vive · 3) portrait de Encre : buste et tête de face, content, grand sourire · 4) portrait de Mme Feuillet : buste et tête de face, expression neutre · 5) portrait de Mme Feuillet : buste et tête de face, il parle, bouche ouverte, expression vive · 6) portrait de Mme Feuillet : buste et tête de face, content, grand sourire

**R6-13 · Bibliothèque des Bulles : sols et murs**  
Les tuiles de sol de 20 × 20 pixels : je construis tous les écrans avec. Les bords s'emboîtent : garde toute la planche dans la même conversation.  
Grille : 12 × 8  
Cases : 1) dalles de pierre du donjon (rayonnages de bois et papier, cases de bande dessinée), tuile de base qui se répète sans raccord visible · 2) dalles de pierre du donjon (rayonnages de bois et papier, cases de bande dessinée), variante avec quelques détails · 3) dalles de pierre du donjon (rayonnages de bois et papier, cases de bande dessinée), deuxième variante · 4) dalles de pierre du donjon (rayonnages de bois et papier, cases de bande dessinée), variante avec de petites fleurs ou petits détails colorés · 5) sol plus clair d'un couloir, tuile de base qui se répète sans raccord · 6) sol plus clair d'un couloir, variante · 7) trou sans fond (vide noir), tuile qui se répète (image 1 de l'animation) · 8) trou sans fond (vide noir), même tuile avec les reflets décalés (image 2) · 9) trou sans fond (vide noir), image 3 · 10) bord haut gauche d'une zone de sol plus clair d'un couloir entourée de dalles de pierre du donjon (rayonnages de bois et papier, cases de bande dessinée) · 11) bord haut d'une zone de sol plus clair d'un couloir · 12) bord haut droit d'une zone de sol plus clair d'un couloir · 13) bord gauche d'une zone de sol plus clair d'un couloir · 14) bord droit d'une zone de sol plus clair d'un couloir · 15) bord bas gauche d'une zone de sol plus clair d'un couloir · 16) bord bas d'une zone de sol plus clair d'un couloir · 17) bord bas droit d'une zone de sol plus clair d'un couloir · 18) coin intérieur haut gauche : sol plus clair d'un couloir partout sauf un petit coin de dalles de pierre du donjon (rayonnages de bois et papier, cases de bande dessinée) en haut à gauche · 19) coin intérieur haut droit · 20) coin intérieur bas gauche · 21) coin intérieur bas droit · 22) berge haut gauche d'une étendue de trou sans fond (vide noir) entourée de dalles de pierre du donjon (rayonnages de bois et papier, cases de bande dessinée) · 23) berge haute · 24) berge haut droite · 25) berge gauche · 26) berge droite · 27) berge bas gauche · 28) berge basse · 29) berge bas droite · 30) coin intérieur de berge haut gauche · 31) coin intérieur de berge haut droit · 32) coin intérieur de berge bas gauche · 33) coin intérieur de berge bas droit · 34) mur épais du donjon (rayonnages de bois et papier, cases de bande dessinée) : haut de falaise, bord gauche · 35) mur épais du donjon (rayonnages de bois et papier, cases de bande dessinée) : haut de falaise, bord du milieu · 36) mur épais du donjon (rayonnages de bois et papier, cases de bande dessinée) : haut de falaise, bord droit · 37) mur épais du donjon (rayonnages de bois et papier, cases de bande dessinée) : paroi, côté gauche · 38) mur épais du donjon (rayonnages de bois et papier, cases de bande dessinée) : paroi, milieu · 39) mur épais du donjon (rayonnages de bois et papier, cases de bande dessinée) : paroi, côté droit · 40) mur épais du donjon (rayonnages de bois et papier, cases de bande dessinée) : pied de paroi, gauche · 41) mur épais du donjon (rayonnages de bois et papier, cases de bande dessinée) : pied de paroi, milieu · 42) mur épais du donjon (rayonnages de bois et papier, cases de bande dessinée) : pied de paroi, droit · 43) porte du donjon : moitié haut gauche (l'entrée fait 2 × 2 tuiles, creusée dans la paroi) · 44) porte du donjon : moitié haut droite · 45) porte du donjon : moitié bas gauche, avec l'ouverture sombre · 46) porte du donjon : moitié bas droite · 47) des marches d'escalier, vues de dessus

**R6-14 · Bibliothèque des Bulles : portes**  
Chaque porte dans tous ses états. La porte est dessinée dans l'épaisseur du mur, comme un tunnel.  
Grille : 6 × 4  
Cases : 1) porte du mur du haut, ouverte · 2) porte du mur du haut, fermée par une grille · 3) porte du mur du haut, verrouillée par une serrure dorée · 4) porte du mur du haut, porte du boss, ornée et menaçante · 5) porte du mur du haut, murée (mur plein) · 6) porte du mur du haut, fissurée (on peut la faire sauter) · 7) porte du mur du bas, ouverte · 8) porte du mur du bas, fermée par une grille · 9) porte du mur du bas, verrouillée · 10) porte du mur du bas, porte du boss · 11) porte du mur du bas, murée · 12) porte du mur du bas, fissurée · 13) porte du mur de gauche, ouverte · 14) porte du mur de gauche, fermée par une grille · 15) porte du mur de gauche, verrouillée · 16) porte du mur de gauche, porte du boss · 17) porte du mur de gauche, murée · 18) porte du mur de gauche, fissurée · 19) porte du mur de droite, ouverte · 20) porte du mur de droite, fermée par une grille · 21) porte du mur de droite, verrouillée · 22) porte du mur de droite, porte du boss · 23) porte du mur de droite, murée · 24) porte du mur de droite, fissurée

**R6-15 · Bibliothèque des Bulles : objets et mécanismes**  
Tout ce qui est posé dans les salles, à la même échelle.  
Grille : 6 × 4  
Cases : 1) un bloc à pousser, même pierre que les murs · 2) une statue gardienne sur socle (toutes les statues sont identiques, même celle qu'on peut pousser) · 3) une lampe de lecture sur pied, éteinte · 4) une lampe de lecture sur pied, allumée, image 1 · 5) une lampe de lecture sur pied, allumée, image 2 · 6) un pot fermé · 7) le pot qui se brise · 8) un coffre fermé · 9) le même coffre ouvert, vide · 10) un grand coffre (celui de l'objet du donjon), fermé · 11) le grand coffre ouvert · 12) une plaque de pression au sol · 13) la même plaque enfoncée · 14) un cristal éteint sur socle (il réagit à la Manette) · 15) le même cristal allumé · 16) un escalier qui descend · 17) une échelle · 18) le socle de l'objet · 19) Une dalle de sol intacte. · 20) La même dalle fissurée qui commence à s'effriter. · 21) La même dalle effondrée : trou sombre (danger). · 22) Une pile de livres géants qui bloque un passage (on la renverse avec les Baskets Turbo). · 23) Un lutrin avec un gros livre ouvert (sans texte lisible).

**R6-16 · Bibliothèque des Bulles : objets**  
Les objets trouvés dans ce donjon.  
Grille : 3 × 2  
Cases : 1) Les Baskets Turbo : une paire de baskets bleues avec des éclairs cyan sur les côtés et des semelles lumineuses. · 2) Les Baskets Turbo, même dessin avec un éclat de lumière blanc (quand on le trouve)

### Marais Rétro + Donjon 7

**R7-01 · Marais Rétro : tuiles de sol**  
Les tuiles de sol de 20 × 20 pixels : je construis tous les écrans avec. Les bords s'emboîtent : garde toute la planche dans la même conversation.  
Grille : 12 × 8  
Cases : 1) herbe de marais et vase, tuile de base qui se répète sans raccord visible · 2) herbe de marais et vase, variante avec quelques détails · 3) herbe de marais et vase, deuxième variante · 4) herbe de marais et vase, variante avec de petites fleurs ou petits détails colorés · 5) passerelle de planches, tuile de base qui se répète sans raccord · 6) passerelle de planches, variante · 7) eau verte de marais, tuile qui se répète (image 1 de l'animation) · 8) eau verte de marais, même tuile avec les reflets décalés (image 2) · 9) eau verte de marais, image 3 · 10) bord haut gauche d'une zone de passerelle de planches entourée de herbe de marais et vase · 11) bord haut d'une zone de passerelle de planches · 12) bord haut droit d'une zone de passerelle de planches · 13) bord gauche d'une zone de passerelle de planches · 14) bord droit d'une zone de passerelle de planches · 15) bord bas gauche d'une zone de passerelle de planches · 16) bord bas d'une zone de passerelle de planches · 17) bord bas droit d'une zone de passerelle de planches · 18) coin intérieur haut gauche : passerelle de planches partout sauf un petit coin de herbe de marais et vase en haut à gauche · 19) coin intérieur haut droit · 20) coin intérieur bas gauche · 21) coin intérieur bas droit · 22) berge haut gauche d'une étendue de eau verte de marais entourée de herbe de marais et vase · 23) berge haute · 24) berge haut droite · 25) berge gauche · 26) berge droite · 27) berge bas gauche · 28) berge basse · 29) berge bas droite · 30) coin intérieur de berge haut gauche · 31) coin intérieur de berge haut droit · 32) coin intérieur de berge bas gauche · 33) coin intérieur de berge bas droit · 34) talus de terre et de racines : haut de falaise, bord gauche · 35) talus de terre et de racines : haut de falaise, bord du milieu · 36) talus de terre et de racines : haut de falaise, bord droit · 37) talus de terre et de racines : paroi, côté gauche · 38) talus de terre et de racines : paroi, milieu · 39) talus de terre et de racines : paroi, côté droit · 40) talus de terre et de racines : pied de paroi, gauche · 41) talus de terre et de racines : pied de paroi, milieu · 42) talus de terre et de racines : pied de paroi, droit · 43) entrée de château en blocs : moitié haut gauche (l'entrée fait 2 × 2 tuiles, creusée dans la paroi) · 44) entrée de château en blocs : moitié haut droite · 45) entrée de château en blocs : moitié bas gauche, avec l'ouverture sombre · 46) entrée de château en blocs : moitié bas droite · 47) des marches d'escalier, vues de dessus

**R7-02 · Marais Rétro : décor posé**  
Tout ce qui est posé sur le sol de la région, avec la version coupée ou cassée de ce qui se coupe ou se casse, et l'environnement animé.  
Grille : 6 × 4  
Cases : 1) un arbre typique de la région (toute la case) · 2) un deuxième arbre · 3) Une touffe d'herbe de marais. · 4) Un champignon (on le coupe avec l'onde). · 5) Un rocher fissuré couvert de vase. · 6) Un bloc de métal lourd, riveté (on le déplace avec l'Aimant). · 7) Un panneau de bois pourri, sans texte. · 8) La pluie de marais, plus lourde, et ses éclaboussures sur l'eau verte., image 1 · 9) Des bulles qui remontent de la vase et éclatent., image 1 · 10) La brume qui flotte au ras du sol., image 1 · 11) Un ennemi qui sort de la vase : la vase se soulève puis coule., image 1

**R7-03 · Feu follet**  
Toutes les images de ce monstre sur une seule planche.  
Grille : 6 × 4  
Cases : 1) de face, immobile · 2) de face, étiré vers le haut · 3) de face, tassé vers le bas · 4) de dos, immobile · 5) de dos, étiré vers le haut · 6) de dos, tassé vers le bas · 7) de profil, immobile · 8) de profil, étiré vers le haut · 9) de profil, tassé vers le bas · 10) de face, il attaque · 11) de dos, il attaque · 12) de profil, il attaque · 13) de face, touché : il recule, yeux plissés · 14) de dos, touché · 15) de profil, touché · 16) il apparaît (il sort de terre ou se matérialise), image 1 : presque rien · 17) apparition, image 2 : à moitié là · 18) apparition, image 3 : presque entier · 19) l'effet de son attaque (souffle, choc ou éclair, dans ses couleurs), image 1 · 20) l'effet de son attaque, image 2 · 21) l'effet de son attaque, image 3 · 22) il disparaît : il éclate en petits carrés violets et en fumée (image 1) · 23) image 2 de la disparition, plus éclatée · 24) image 3, presque rien

**R7-04 · Sorcier des marais**  
Toutes les images de ce monstre sur une seule planche.  
Grille : 6 × 4  
Cases : 1) de face, immobile · 2) de face, étiré vers le haut · 3) de face, tassé vers le bas · 4) de dos, immobile · 5) de dos, étiré vers le haut · 6) de dos, tassé vers le bas · 7) de profil, immobile · 8) de profil, étiré vers le haut · 9) de profil, tassé vers le bas · 10) de face, il attaque · 11) de dos, il attaque · 12) de profil, il attaque · 13) de face, touché : il recule, yeux plissés · 14) de dos, touché · 15) de profil, touché · 16) il apparaît (il sort de terre ou se matérialise), image 1 : presque rien · 17) apparition, image 2 : à moitié là · 18) apparition, image 3 : presque entier · 19) son projectile en vol : une boule de vase verte et violette (projectile). · 20) le même projectile, deuxième image du vol · 21) le projectile qui éclate à l'impact · 22) il disparaît : il éclate en petits carrés violets et en fumée (image 1) · 23) image 2 de la disparition, plus éclatée · 24) image 3, presque rien

**R7-05 · Carapace à pointes**  
Toutes les images de ce monstre sur une seule planche.  
Grille : 6 × 4  
Cases : 1) de face, immobile · 2) de face, pied gauche en avant · 3) de face, pied droit en avant · 4) de dos, immobile · 5) de dos, pied gauche en avant · 6) de dos, pied droit en avant · 7) de profil, immobile · 8) de profil, pied gauche en avant · 9) de profil, pied droit en avant · 10) de face, il attaque · 11) de dos, il attaque · 12) de profil, il attaque · 13) de face, touché : il recule, yeux plissés · 14) de dos, touché · 15) de profil, touché · 16) il apparaît (il sort de terre ou se matérialise), image 1 : presque rien · 17) apparition, image 2 : à moitié là · 18) apparition, image 3 : presque entier · 19) l'effet de son attaque (souffle, choc ou éclair, dans ses couleurs), image 1 · 20) l'effet de son attaque, image 2 · 21) l'effet de son attaque, image 3 · 22) il disparaît : il éclate en petits carrés violets et en fumée (image 1) · 23) image 2 de la disparition, plus éclatée · 24) image 3, presque rien

**R7-06 · Slime 8 bits**  
Toutes les images de ce monstre sur une seule planche.  
Grille : 6 × 4  
Cases : 1) de face, immobile · 2) de face, pied gauche en avant · 3) de face, pied droit en avant · 4) de dos, immobile · 5) de dos, pied gauche en avant · 6) de dos, pied droit en avant · 7) de profil, immobile · 8) de profil, pied gauche en avant · 9) de profil, pied droit en avant · 10) de face, il attaque · 11) de dos, il attaque · 12) de profil, il attaque · 13) de face, touché : il recule, yeux plissés · 14) de dos, touché · 15) de profil, touché · 16) il apparaît (il sort de terre ou se matérialise), image 1 : presque rien · 17) apparition, image 2 : à moitié là · 18) apparition, image 3 : presque entier · 19) l'effet de son attaque (souffle, choc ou éclair, dans ses couleurs), image 1 · 20) l'effet de son attaque, image 2 · 21) l'effet de son attaque, image 3 · 22) il disparaît : il éclate en petits carrés violets et en fumée (image 1) · 23) image 2 de la disparition, plus éclatée · 24) image 3, presque rien

**R7-07 · Chauve-souris pixel**  
Toutes les images de ce monstre sur une seule planche.  
Grille : 6 × 4  
Cases : 1) de face, immobile · 2) de face, pied gauche en avant · 3) de face, pied droit en avant · 4) de dos, immobile · 5) de dos, pied gauche en avant · 6) de dos, pied droit en avant · 7) de profil, immobile · 8) de profil, pied gauche en avant · 9) de profil, pied droit en avant · 10) de face, il attaque · 11) de dos, il attaque · 12) de profil, il attaque · 13) de face, touché : il recule, yeux plissés · 14) de dos, touché · 15) de profil, touché · 16) il apparaît (il sort de terre ou se matérialise), image 1 : presque rien · 17) apparition, image 2 : à moitié là · 18) apparition, image 3 : presque entier · 19) l'effet de son attaque (souffle, choc ou éclair, dans ses couleurs), image 1 · 20) l'effet de son attaque, image 2 · 21) l'effet de son attaque, image 3 · 22) il disparaît : il éclate en petits carrés violets et en fumée (image 1) · 23) image 2 de la disparition, plus éclatée · 24) image 3, presque rien

**R7-08 · Moustique-glitch**  
Toutes les images de ce monstre sur une seule planche.  
Grille : 6 × 4  
Cases : 1) de face, immobile · 2) de face, pied gauche en avant · 3) de face, pied droit en avant · 4) de dos, immobile · 5) de dos, pied gauche en avant · 6) de dos, pied droit en avant · 7) de profil, immobile · 8) de profil, pied gauche en avant · 9) de profil, pied droit en avant · 10) de face, il attaque · 11) de dos, il attaque · 12) de profil, il attaque · 13) de face, touché : il recule, yeux plissés · 14) de dos, touché · 15) de profil, touché · 16) il apparaît (il sort de terre ou se matérialise), image 1 : presque rien · 17) apparition, image 2 : à moitié là · 18) apparition, image 3 : presque entier · 19) l'effet de son attaque (souffle, choc ou éclair, dans ses couleurs), image 1 · 20) l'effet de son attaque, image 2 · 21) l'effet de son attaque, image 3 · 22) il disparaît : il éclate en petits carrés violets et en fumée (image 1) · 23) image 2 de la disparition, plus éclatée · 24) image 3, presque rien

**R7-09 · Chauve-souris (Château 8 bits)**  
Toutes les images de ce monstre sur une seule planche.  
Grille : 6 × 4  
Cases : 1) de face, immobile · 2) de face, ailes levées · 3) de face, ailes baissées · 4) de dos, immobile · 5) de dos, ailes levées · 6) de dos, ailes baissées · 7) de profil, immobile · 8) de profil, ailes levées · 9) de profil, ailes baissées · 10) de face, il attaque · 11) de dos, il attaque · 12) de profil, il attaque · 13) de face, touché : il recule, yeux plissés · 14) de dos, touché · 15) de profil, touché · 16) il apparaît (il sort de terre ou se matérialise), image 1 : presque rien · 17) apparition, image 2 : à moitié là · 18) apparition, image 3 : presque entier · 19) l'effet de son attaque (souffle, choc ou éclair, dans ses couleurs), image 1 · 20) l'effet de son attaque, image 2 · 21) l'effet de son attaque, image 3 · 22) il disparaît : il éclate en petits carrés violets et en fumée (image 1) · 23) image 2 de la disparition, plus éclatée · 24) image 3, presque rien

**R7-10 · Le Glitch Géant**  
Le boss sur une planche de 6 grandes cases.  
Grille : 3 × 2  
Cases : 1) de face, immobile et menaçant · 2) de face, il attaque · 3) de face, étourdi : tête basse, yeux qui clignotent, fissures qui s'éteignent · 4) de face, touché : il recule, tout blanc (image de flash) · 5) son projectile : Un bloc d'erreur carré qui tourne · 6) il est vaincu : il se désagrège en carrés violets et en fumée

**R7-11 · Marais Rétro : Gardien et habitant**  
Les personnages qui marchent et parlent. Toute la planche est remplie : deux rangées par personnage quand il y en a deux, une rangée quand il y en a quatre.  
Grille : 6 × 4  
Cases : 1) Cartouche (une grenouille avec un sac à dos plein de cartouches de jeu (sans étiquettes) et de grosses lunettes.) de face, immobile · 2) Cartouche de face, pied gauche en avant · 3) Cartouche de face, pied droit en avant · 4) Cartouche de dos, immobile · 5) Cartouche de dos, pied gauche en avant · 6) Cartouche de dos, pied droit en avant · 7) Cartouche de profil, immobile · 8) Cartouche de profil, jambe avant tendue · 9) Cartouche de profil, jambes croisées (pas de passage) · 10) Cartouche de face : en train d'admirer une cartouche à bout de bras · 11) Cartouche de face, il parle : bouche ouverte, une main levée · 12) Cartouche de face, surpris : yeux grands ouverts, bras écartés · 13) Pixou (un raton laveur en sweat rétro, manette à fil autour du cou, debout de face, entier.) de face, immobile · 14) Pixou de face, pied gauche en avant · 15) Pixou de face, pied droit en avant · 16) Pixou de dos, immobile · 17) Pixou de dos, pied gauche en avant · 18) Pixou de dos, pied droit en avant · 19) Pixou de profil, immobile · 20) Pixou de profil, jambe avant tendue · 21) Pixou de profil, jambes croisées (pas de passage) · 22) Pixou de face : il salue · 23) Pixou de face, il parle : bouche ouverte, une main levée · 24) Pixou de face, surpris : yeux grands ouverts, bras écartés

**R7-12 · Marais Rétro : Gardien et habitant : portraits**  
Les portraits affichés à côté du texte des dialogues.  
Grille : 3 × 2  
Cases : 1) portrait de Cartouche : buste et tête de face, expression neutre · 2) portrait de Cartouche : buste et tête de face, il parle, bouche ouverte, expression vive · 3) portrait de Cartouche : buste et tête de face, content, grand sourire · 4) portrait de Pixou : buste et tête de face, expression neutre · 5) portrait de Pixou : buste et tête de face, il parle, bouche ouverte, expression vive · 6) portrait de Pixou : buste et tête de face, content, grand sourire

**R7-13 · Château 8 bits : sols et murs**  
Les tuiles de sol de 20 × 20 pixels : je construis tous les écrans avec. Les bords s'emboîtent : garde toute la planche dans la même conversation.  
Grille : 12 × 8  
Cases : 1) dalles de pierre du donjon (blocs carrés façon vieux jeux, briques grises), tuile de base qui se répète sans raccord visible · 2) dalles de pierre du donjon (blocs carrés façon vieux jeux, briques grises), variante avec quelques détails · 3) dalles de pierre du donjon (blocs carrés façon vieux jeux, briques grises), deuxième variante · 4) dalles de pierre du donjon (blocs carrés façon vieux jeux, briques grises), variante avec de petites fleurs ou petits détails colorés · 5) sol plus clair d'un couloir, tuile de base qui se répète sans raccord · 6) sol plus clair d'un couloir, variante · 7) trou sans fond (vide noir), tuile qui se répète (image 1 de l'animation) · 8) trou sans fond (vide noir), même tuile avec les reflets décalés (image 2) · 9) trou sans fond (vide noir), image 3 · 10) bord haut gauche d'une zone de sol plus clair d'un couloir entourée de dalles de pierre du donjon (blocs carrés façon vieux jeux, briques grises) · 11) bord haut d'une zone de sol plus clair d'un couloir · 12) bord haut droit d'une zone de sol plus clair d'un couloir · 13) bord gauche d'une zone de sol plus clair d'un couloir · 14) bord droit d'une zone de sol plus clair d'un couloir · 15) bord bas gauche d'une zone de sol plus clair d'un couloir · 16) bord bas d'une zone de sol plus clair d'un couloir · 17) bord bas droit d'une zone de sol plus clair d'un couloir · 18) coin intérieur haut gauche : sol plus clair d'un couloir partout sauf un petit coin de dalles de pierre du donjon (blocs carrés façon vieux jeux, briques grises) en haut à gauche · 19) coin intérieur haut droit · 20) coin intérieur bas gauche · 21) coin intérieur bas droit · 22) berge haut gauche d'une étendue de trou sans fond (vide noir) entourée de dalles de pierre du donjon (blocs carrés façon vieux jeux, briques grises) · 23) berge haute · 24) berge haut droite · 25) berge gauche · 26) berge droite · 27) berge bas gauche · 28) berge basse · 29) berge bas droite · 30) coin intérieur de berge haut gauche · 31) coin intérieur de berge haut droit · 32) coin intérieur de berge bas gauche · 33) coin intérieur de berge bas droit · 34) mur épais du donjon (blocs carrés façon vieux jeux, briques grises) : haut de falaise, bord gauche · 35) mur épais du donjon (blocs carrés façon vieux jeux, briques grises) : haut de falaise, bord du milieu · 36) mur épais du donjon (blocs carrés façon vieux jeux, briques grises) : haut de falaise, bord droit · 37) mur épais du donjon (blocs carrés façon vieux jeux, briques grises) : paroi, côté gauche · 38) mur épais du donjon (blocs carrés façon vieux jeux, briques grises) : paroi, milieu · 39) mur épais du donjon (blocs carrés façon vieux jeux, briques grises) : paroi, côté droit · 40) mur épais du donjon (blocs carrés façon vieux jeux, briques grises) : pied de paroi, gauche · 41) mur épais du donjon (blocs carrés façon vieux jeux, briques grises) : pied de paroi, milieu · 42) mur épais du donjon (blocs carrés façon vieux jeux, briques grises) : pied de paroi, droit · 43) porte du donjon : moitié haut gauche (l'entrée fait 2 × 2 tuiles, creusée dans la paroi) · 44) porte du donjon : moitié haut droite · 45) porte du donjon : moitié bas gauche, avec l'ouverture sombre · 46) porte du donjon : moitié bas droite · 47) des marches d'escalier, vues de dessus

**R7-14 · Château 8 bits : portes**  
Chaque porte dans tous ses états. La porte est dessinée dans l'épaisseur du mur, comme un tunnel.  
Grille : 6 × 4  
Cases : 1) porte du mur du haut, ouverte · 2) porte du mur du haut, fermée par une grille · 3) porte du mur du haut, verrouillée par une serrure dorée · 4) porte du mur du haut, porte du boss, ornée et menaçante · 5) porte du mur du haut, murée (mur plein) · 6) porte du mur du haut, fissurée (on peut la faire sauter) · 7) porte du mur du bas, ouverte · 8) porte du mur du bas, fermée par une grille · 9) porte du mur du bas, verrouillée · 10) porte du mur du bas, porte du boss · 11) porte du mur du bas, murée · 12) porte du mur du bas, fissurée · 13) porte du mur de gauche, ouverte · 14) porte du mur de gauche, fermée par une grille · 15) porte du mur de gauche, verrouillée · 16) porte du mur de gauche, porte du boss · 17) porte du mur de gauche, murée · 18) porte du mur de gauche, fissurée · 19) porte du mur de droite, ouverte · 20) porte du mur de droite, fermée par une grille · 21) porte du mur de droite, verrouillée · 22) porte du mur de droite, porte du boss · 23) porte du mur de droite, murée · 24) porte du mur de droite, fissurée

**R7-15 · Château 8 bits : objets et mécanismes**  
Tout ce qui est posé dans les salles, à la même échelle.  
Grille : 6 × 4  
Cases : 1) un bloc à pousser, même pierre que les murs · 2) une statue gardienne sur socle (toutes les statues sont identiques, même celle qu'on peut pousser) · 3) une torche cubique sur pied, éteinte · 4) une torche cubique sur pied, allumée, image 1 · 5) une torche cubique sur pied, allumée, image 2 · 6) un pot fermé · 7) le pot qui se brise · 8) un coffre fermé · 9) le même coffre ouvert, vide · 10) un grand coffre (celui de l'objet du donjon), fermé · 11) le grand coffre ouvert · 12) une plaque de pression au sol · 13) la même plaque enfoncée · 14) un cristal éteint sur socle (il réagit à la Manette) · 15) le même cristal allumé · 16) un escalier qui descend · 17) une échelle · 18) le socle de l'objet · 19) Un bloc de métal lourd, gris, riveté (on le déplace avec l'Aimant). · 20) Des pics de métal sortis du sol (danger). · 21) Les mêmes pics rentrés dans le sol. · 22) Un levier mural baissé. · 23) Le même levier levé.

**R7-16 · Château 8 bits : objets**  
Les objets trouvés dans ce donjon.  
Grille : 3 × 2  
Cases : 1) L'Aimant : un gros aimant en fer à cheval rouge et bleu, pointes argentées, petits arcs d'énergie cyan. · 2) Le Casque 3.0 (trésor caché) : le casque-micro de Spirit seul, posé, vu de face : arceau, deux écouteurs ronds et la fine tige du micro, exactement la forme du casque de Spirit sur la planche jointe ; les parties noires restent noires, toutes les parties qui sont bleues et cyan sur le casque normal sont en violet (violet #9b4dff, ombre #5a22b0, lumière #d9b8ff) · 3) L'Aimant, même dessin avec un éclat de lumière blanc (quand on le trouve) · 4) Le Casque 3.0 (trésor caché), même dessin avec un éclat de lumière blanc (quand on le trouve)

### Toundra du Cloud + Donjon 8

**R8-01 · Toundra du Cloud : tuiles de sol**  
Les tuiles de sol de 20 × 20 pixels : je construis tous les écrans avec. Les bords s'emboîtent : garde toute la planche dans la même conversation.  
Grille : 12 × 8  
Cases : 1) neige, tuile de base qui se répète sans raccord visible · 2) neige, variante avec quelques détails · 3) neige, deuxième variante · 4) neige, variante avec de petites fleurs ou petits détails colorés · 5) chemin de glace tassée, tuile de base qui se répète sans raccord · 6) chemin de glace tassée, variante · 7) eau glacée, tuile qui se répète (image 1 de l'animation) · 8) eau glacée, même tuile avec les reflets décalés (image 2) · 9) eau glacée, image 3 · 10) bord haut gauche d'une zone de chemin de glace tassée entourée de neige · 11) bord haut d'une zone de chemin de glace tassée · 12) bord haut droit d'une zone de chemin de glace tassée · 13) bord gauche d'une zone de chemin de glace tassée · 14) bord droit d'une zone de chemin de glace tassée · 15) bord bas gauche d'une zone de chemin de glace tassée · 16) bord bas d'une zone de chemin de glace tassée · 17) bord bas droit d'une zone de chemin de glace tassée · 18) coin intérieur haut gauche : chemin de glace tassée partout sauf un petit coin de neige en haut à gauche · 19) coin intérieur haut droit · 20) coin intérieur bas gauche · 21) coin intérieur bas droit · 22) berge haut gauche d'une étendue de eau glacée entourée de neige · 23) berge haute · 24) berge haut droite · 25) berge gauche · 26) berge droite · 27) berge bas gauche · 28) berge basse · 29) berge bas droite · 30) coin intérieur de berge haut gauche · 31) coin intérieur de berge haut droit · 32) coin intérieur de berge bas gauche · 33) coin intérieur de berge bas droit · 34) falaise de glace : haut de falaise, bord gauche · 35) falaise de glace : haut de falaise, bord du milieu · 36) falaise de glace : haut de falaise, bord droit · 37) falaise de glace : paroi, côté gauche · 38) falaise de glace : paroi, milieu · 39) falaise de glace : paroi, côté droit · 40) falaise de glace : pied de paroi, gauche · 41) falaise de glace : pied de paroi, milieu · 42) falaise de glace : pied de paroi, droit · 43) entrée de bunker gelé : moitié haut gauche (l'entrée fait 2 × 2 tuiles, creusée dans la paroi) · 44) entrée de bunker gelé : moitié haut droite · 45) entrée de bunker gelé : moitié bas gauche, avec l'ouverture sombre · 46) entrée de bunker gelé : moitié bas droite · 47) des marches d'escalier, vues de dessus

**R8-02 · Toundra du Cloud : décor posé**  
Tout ce qui est posé sur le sol de la région, avec la version coupée ou cassée de ce qui se coupe ou se casse, et l'environnement animé.  
Grille : 6 × 4  
Cases : 1) un arbre typique de la région (toute la case) · 2) un deuxième arbre · 3) Une touffe d'herbe gelée. · 4) Un bloc de glace (on le casse avec l'onde). · 5) Un rocher gelé fissuré. · 6) Un panneau givré, sans texte. · 7) Une petite congère (on la traverse avec les Baskets Turbo). · 8) La neige qui tombe (trois flocons différents)., image 1 · 9) Le vent de neige en traînées., image 1 · 10) La glace qui se fissure sous les pieds., image 1 · 11) Un ennemi qui sort de la neige : la neige éclate en poudre., image 1

**R8-03 · Chevalier de givre**  
Toutes les images de ce monstre sur une seule planche.  
Grille : 6 × 4  
Cases : 1) de face, immobile · 2) de face, étiré vers le haut · 3) de face, tassé vers le bas · 4) de dos, immobile · 5) de dos, étiré vers le haut · 6) de dos, tassé vers le bas · 7) de profil, immobile · 8) de profil, étiré vers le haut · 9) de profil, tassé vers le bas · 10) de face, il attaque · 11) de dos, il attaque · 12) de profil, il attaque · 13) de face, touché : il recule, yeux plissés · 14) de dos, touché · 15) de profil, touché · 16) il apparaît (il sort de terre ou se matérialise), image 1 : presque rien · 17) apparition, image 2 : à moitié là · 18) apparition, image 3 : presque entier · 19) l'effet de son attaque (souffle, choc ou éclair, dans ses couleurs), image 1 · 20) l'effet de son attaque, image 2 · 21) l'effet de son attaque, image 3 · 22) il disparaît : il éclate en petits carrés violets et en fumée (image 1) · 23) image 2 de la disparition, plus éclatée · 24) image 3, presque rien

**R8-04 · Loup de glace**  
Toutes les images de ce monstre sur une seule planche.  
Grille : 6 × 4  
Cases : 1) de face, immobile · 2) de face, pied gauche en avant · 3) de face, pied droit en avant · 4) de dos, immobile · 5) de dos, pied gauche en avant · 6) de dos, pied droit en avant · 7) de profil, immobile · 8) de profil, pied gauche en avant · 9) de profil, pied droit en avant · 10) de face, il attaque · 11) de dos, il attaque · 12) de profil, il attaque · 13) de face, touché : il recule, yeux plissés · 14) de dos, touché · 15) de profil, touché · 16) il apparaît (il sort de terre ou se matérialise), image 1 : presque rien · 17) apparition, image 2 : à moitié là · 18) apparition, image 3 : presque entier · 19) l'effet de son attaque (souffle, choc ou éclair, dans ses couleurs), image 1 · 20) l'effet de son attaque, image 2 · 21) l'effet de son attaque, image 3 · 22) il disparaît : il éclate en petits carrés violets et en fumée (image 1) · 23) image 2 de la disparition, plus éclatée · 24) image 3, presque rien

**R8-05 · Colosse de pierre**  
Toutes les images de ce monstre sur une seule planche.  
Grille : 6 × 4  
Cases : 1) de face, immobile · 2) de face, pied gauche en avant · 3) de face, pied droit en avant · 4) de dos, immobile · 5) de dos, pied gauche en avant · 6) de dos, pied droit en avant · 7) de profil, immobile · 8) de profil, pied gauche en avant · 9) de profil, pied droit en avant · 10) de face, il attaque · 11) de dos, il attaque · 12) de profil, il attaque · 13) de face, touché : il recule, yeux plissés · 14) de dos, touché · 15) de profil, touché · 16) il apparaît (il sort de terre ou se matérialise), image 1 : presque rien · 17) apparition, image 2 : à moitié là · 18) apparition, image 3 : presque entier · 19) l'effet de son attaque (souffle, choc ou éclair, dans ses couleurs), image 1 · 20) l'effet de son attaque, image 2 · 21) l'effet de son attaque, image 3 · 22) il disparaît : il éclate en petits carrés violets et en fumée (image 1) · 23) image 2 de la disparition, plus éclatée · 24) image 3, presque rien

**R8-06 · Cookie traqueur**  
Toutes les images de ce monstre sur une seule planche.  
Grille : 6 × 4  
Cases : 1) de face, immobile · 2) de face, pied gauche en avant · 3) de face, pied droit en avant · 4) de dos, immobile · 5) de dos, pied gauche en avant · 6) de dos, pied droit en avant · 7) de profil, immobile · 8) de profil, pied gauche en avant · 9) de profil, pied droit en avant · 10) de face, il attaque · 11) de dos, il attaque · 12) de profil, il attaque · 13) de face, touché : il recule, yeux plissés · 14) de dos, touché · 15) de profil, touché · 16) il apparaît (il sort de terre ou se matérialise), image 1 : presque rien · 17) apparition, image 2 : à moitié là · 18) apparition, image 3 : presque entier · 19) l'effet de son attaque (souffle, choc ou éclair, dans ses couleurs), image 1 · 20) l'effet de son attaque, image 2 · 21) l'effet de son attaque, image 3 · 22) il disparaît : il éclate en petits carrés violets et en fumée (image 1) · 23) image 2 de la disparition, plus éclatée · 24) image 3, presque rien

**R8-07 · Pingouin-bot**  
Toutes les images de ce monstre sur une seule planche.  
Grille : 6 × 4  
Cases : 1) de face, immobile · 2) de face, pied gauche en avant · 3) de face, pied droit en avant · 4) de dos, immobile · 5) de dos, pied gauche en avant · 6) de dos, pied droit en avant · 7) de profil, immobile · 8) de profil, pied gauche en avant · 9) de profil, pied droit en avant · 10) de face, il attaque · 11) de dos, il attaque · 12) de profil, il attaque · 13) de face, touché : il recule, yeux plissés · 14) de dos, touché · 15) de profil, touché · 16) il apparaît (il sort de terre ou se matérialise), image 1 : presque rien · 17) apparition, image 2 : à moitié là · 18) apparition, image 3 : presque entier · 19) l'effet de son attaque (souffle, choc ou éclair, dans ses couleurs), image 1 · 20) l'effet de son attaque, image 2 · 21) l'effet de son attaque, image 3 · 22) il disparaît : il éclate en petits carrés violets et en fumée (image 1) · 23) image 2 de la disparition, plus éclatée · 24) image 3, presque rien

**R8-08 · Nuage-captcha**  
Toutes les images de ce monstre sur une seule planche.  
Grille : 6 × 4  
Cases : 1) de face, immobile · 2) de face, pied gauche en avant · 3) de face, pied droit en avant · 4) de dos, immobile · 5) de dos, pied gauche en avant · 6) de dos, pied droit en avant · 7) de profil, immobile · 8) de profil, pied gauche en avant · 9) de profil, pied droit en avant · 10) de face, il attaque · 11) de dos, il attaque · 12) de profil, il attaque · 13) de face, touché : il recule, yeux plissés · 14) de dos, touché · 15) de profil, touché · 16) il apparaît (il sort de terre ou se matérialise), image 1 : presque rien · 17) apparition, image 2 : à moitié là · 18) apparition, image 3 : presque entier · 19) l'effet de son attaque (souffle, choc ou éclair, dans ses couleurs), image 1 · 20) l'effet de son attaque, image 2 · 21) l'effet de son attaque, image 3 · 22) il disparaît : il éclate en petits carrés violets et en fumée (image 1) · 23) image 2 de la disparition, plus éclatée · 24) image 3, presque rien

**R8-09 · Chauve-souris (Archives Gelées)**  
Toutes les images de ce monstre sur une seule planche.  
Grille : 6 × 4  
Cases : 1) de face, immobile · 2) de face, ailes levées · 3) de face, ailes baissées · 4) de dos, immobile · 5) de dos, ailes levées · 6) de dos, ailes baissées · 7) de profil, immobile · 8) de profil, ailes levées · 9) de profil, ailes baissées · 10) de face, il attaque · 11) de dos, il attaque · 12) de profil, il attaque · 13) de face, touché : il recule, yeux plissés · 14) de dos, touché · 15) de profil, touché · 16) il apparaît (il sort de terre ou se matérialise), image 1 : presque rien · 17) apparition, image 2 : à moitié là · 18) apparition, image 3 : presque entier · 19) l'effet de son attaque (souffle, choc ou éclair, dans ses couleurs), image 1 · 20) l'effet de son attaque, image 2 · 21) l'effet de son attaque, image 3 · 22) il disparaît : il éclate en petits carrés violets et en fumée (image 1) · 23) image 2 de la disparition, plus éclatée · 24) image 3, presque rien

**R8-10 · La Rumeur**  
Le boss sur une planche de 6 grandes cases.  
Grille : 3 × 2  
Cases : 1) de face, immobile et menaçant · 2) de face, il attaque · 3) de face, étourdi : tête basse, yeux qui clignotent, fissures qui s'éteignent · 4) de face, touché : il recule, tout blanc (image de flash) · 5) son projectile : La même Rumeur presque invisible : seuls un contour pâle et les yeux jaunes sont visibles. · 6) il est vaincu : il se désagrège en carrés violets et en fumée

**R8-11 · Toundra du Cloud : Gardien et habitant**  
Les personnages qui marchent et parlent. Toute la planche est remplie : deux rangées par personnage quand il y en a deux, une rangée quand il y en a quatre.  
Grille : 6 × 4  
Cases : 1) Mémo (un mammouth en gilet, petites lunettes, une pile de dossiers dans les bras.) de face, immobile · 2) Mémo de face, pied gauche en avant · 3) Mémo de face, pied droit en avant · 4) Mémo de dos, immobile · 5) Mémo de dos, pied gauche en avant · 6) Mémo de dos, pied droit en avant · 7) Mémo de profil, immobile · 8) Mémo de profil, jambe avant tendue · 9) Mémo de profil, jambes croisées (pas de passage) · 10) Mémo de face : en train de consulter un dossier ouvert · 11) Mémo de face, il parle : bouche ouverte, une main levée · 12) Mémo de face, surpris : yeux grands ouverts, bras écartés · 13) Yéti Doux (un grand yéti timide en écharpe, tasse de chocolat chaud, debout de face, entier.) de face, immobile · 14) Yéti Doux de face, pied gauche en avant · 15) Yéti Doux de face, pied droit en avant · 16) Yéti Doux de dos, immobile · 17) Yéti Doux de dos, pied gauche en avant · 18) Yéti Doux de dos, pied droit en avant · 19) Yéti Doux de profil, immobile · 20) Yéti Doux de profil, jambe avant tendue · 21) Yéti Doux de profil, jambes croisées (pas de passage) · 22) Yéti Doux de face : il salue · 23) Yéti Doux de face, il parle : bouche ouverte, une main levée · 24) Yéti Doux de face, surpris : yeux grands ouverts, bras écartés

**R8-12 · Toundra du Cloud : Gardien et habitant : portraits**  
Les portraits affichés à côté du texte des dialogues.  
Grille : 3 × 2  
Cases : 1) portrait de Mémo : buste et tête de face, expression neutre · 2) portrait de Mémo : buste et tête de face, il parle, bouche ouverte, expression vive · 3) portrait de Mémo : buste et tête de face, content, grand sourire · 4) portrait de Yéti Doux : buste et tête de face, expression neutre · 5) portrait de Yéti Doux : buste et tête de face, il parle, bouche ouverte, expression vive · 6) portrait de Yéti Doux : buste et tête de face, content, grand sourire

**R8-13 · Archives Gelées : sols et murs**  
Les tuiles de sol de 20 × 20 pixels : je construis tous les écrans avec. Les bords s'emboîtent : garde toute la planche dans la même conversation.  
Grille : 12 × 8  
Cases : 1) dalles de pierre du donjon (glace et métal d'armoires à dossiers), tuile de base qui se répète sans raccord visible · 2) dalles de pierre du donjon (glace et métal d'armoires à dossiers), variante avec quelques détails · 3) dalles de pierre du donjon (glace et métal d'armoires à dossiers), deuxième variante · 4) dalles de pierre du donjon (glace et métal d'armoires à dossiers), variante avec de petites fleurs ou petits détails colorés · 5) sol plus clair d'un couloir, tuile de base qui se répète sans raccord · 6) sol plus clair d'un couloir, variante · 7) trou sans fond (vide noir), tuile qui se répète (image 1 de l'animation) · 8) trou sans fond (vide noir), même tuile avec les reflets décalés (image 2) · 9) trou sans fond (vide noir), image 3 · 10) bord haut gauche d'une zone de sol plus clair d'un couloir entourée de dalles de pierre du donjon (glace et métal d'armoires à dossiers) · 11) bord haut d'une zone de sol plus clair d'un couloir · 12) bord haut droit d'une zone de sol plus clair d'un couloir · 13) bord gauche d'une zone de sol plus clair d'un couloir · 14) bord droit d'une zone de sol plus clair d'un couloir · 15) bord bas gauche d'une zone de sol plus clair d'un couloir · 16) bord bas d'une zone de sol plus clair d'un couloir · 17) bord bas droit d'une zone de sol plus clair d'un couloir · 18) coin intérieur haut gauche : sol plus clair d'un couloir partout sauf un petit coin de dalles de pierre du donjon (glace et métal d'armoires à dossiers) en haut à gauche · 19) coin intérieur haut droit · 20) coin intérieur bas gauche · 21) coin intérieur bas droit · 22) berge haut gauche d'une étendue de trou sans fond (vide noir) entourée de dalles de pierre du donjon (glace et métal d'armoires à dossiers) · 23) berge haute · 24) berge haut droite · 25) berge gauche · 26) berge droite · 27) berge bas gauche · 28) berge basse · 29) berge bas droite · 30) coin intérieur de berge haut gauche · 31) coin intérieur de berge haut droit · 32) coin intérieur de berge bas gauche · 33) coin intérieur de berge bas droit · 34) mur épais du donjon (glace et métal d'armoires à dossiers) : haut de falaise, bord gauche · 35) mur épais du donjon (glace et métal d'armoires à dossiers) : haut de falaise, bord du milieu · 36) mur épais du donjon (glace et métal d'armoires à dossiers) : haut de falaise, bord droit · 37) mur épais du donjon (glace et métal d'armoires à dossiers) : paroi, côté gauche · 38) mur épais du donjon (glace et métal d'armoires à dossiers) : paroi, milieu · 39) mur épais du donjon (glace et métal d'armoires à dossiers) : paroi, côté droit · 40) mur épais du donjon (glace et métal d'armoires à dossiers) : pied de paroi, gauche · 41) mur épais du donjon (glace et métal d'armoires à dossiers) : pied de paroi, milieu · 42) mur épais du donjon (glace et métal d'armoires à dossiers) : pied de paroi, droit · 43) porte du donjon : moitié haut gauche (l'entrée fait 2 × 2 tuiles, creusée dans la paroi) · 44) porte du donjon : moitié haut droite · 45) porte du donjon : moitié bas gauche, avec l'ouverture sombre · 46) porte du donjon : moitié bas droite · 47) des marches d'escalier, vues de dessus

**R8-14 · Archives Gelées : portes**  
Chaque porte dans tous ses états. La porte est dessinée dans l'épaisseur du mur, comme un tunnel.  
Grille : 6 × 4  
Cases : 1) porte du mur du haut, ouverte · 2) porte du mur du haut, fermée par une grille · 3) porte du mur du haut, verrouillée par une serrure dorée · 4) porte du mur du haut, porte du boss, ornée et menaçante · 5) porte du mur du haut, murée (mur plein) · 6) porte du mur du haut, fissurée (on peut la faire sauter) · 7) porte du mur du bas, ouverte · 8) porte du mur du bas, fermée par une grille · 9) porte du mur du bas, verrouillée · 10) porte du mur du bas, porte du boss · 11) porte du mur du bas, murée · 12) porte du mur du bas, fissurée · 13) porte du mur de gauche, ouverte · 14) porte du mur de gauche, fermée par une grille · 15) porte du mur de gauche, verrouillée · 16) porte du mur de gauche, porte du boss · 17) porte du mur de gauche, murée · 18) porte du mur de gauche, fissurée · 19) porte du mur de droite, ouverte · 20) porte du mur de droite, fermée par une grille · 21) porte du mur de droite, verrouillée · 22) porte du mur de droite, porte du boss · 23) porte du mur de droite, murée · 24) porte du mur de droite, fissurée

**R8-15 · Archives Gelées : objets et mécanismes**  
Tout ce qui est posé dans les salles, à la même échelle.  
Grille : 6 × 4  
Cases : 1) un bloc à pousser, même pierre que les murs · 2) une statue gardienne sur socle (toutes les statues sont identiques, même celle qu'on peut pousser) · 3) une lampe d'archives au verre givré, éteinte · 4) une lampe d'archives au verre givré, allumée, image 1 · 5) une lampe d'archives au verre givré, allumée, image 2 · 6) un pot fermé · 7) le pot qui se brise · 8) un coffre fermé · 9) le même coffre ouvert, vide · 10) un grand coffre (celui de l'objet du donjon), fermé · 11) le grand coffre ouvert · 12) une plaque de pression au sol · 13) la même plaque enfoncée · 14) un cristal éteint sur socle (il réagit à la Manette) · 15) le même cristal allumé · 16) un escalier qui descend · 17) une échelle · 18) le socle de l'objet · 19) Un pan de mur normal, dans le thème du donjon. · 20) Le même pan de mur vu avec les Lunettes de Vérif : translucide, contours cyan en pointillés (faux mur). · 21) Une dalle de glace glissante vue de dessus. · 22) Un bloc de glace à pousser (il glisse jusqu'au mur). · 23) Une étagère d'archives prise dans la glace.

**R8-16 · Archives Gelées : objets**  
Les objets trouvés dans ce donjon.  
Grille : 3 × 2  
Cases : 1) Les Lunettes de Vérif : grosses lunettes à monture noire, verres cyan lumineux avec un petit symbole de coche. · 2) Les Lunettes de Vérif, même dessin avec un éclat de lumière blanc (quand on le trouve)

### Tour finale

**FIN-01 · Cratère du Clickbait : tuiles de sol**  
Les tuiles de sol de 20 × 20 pixels : je construis tous les écrans avec. Les bords s'emboîtent : garde toute la planche dans la même conversation.  
Grille : 12 × 8  
Cases : 1) roche noire vitrifiée, tuile de base qui se répète sans raccord visible · 2) roche noire vitrifiée, variante avec quelques détails · 3) roche noire vitrifiée, deuxième variante · 4) roche noire vitrifiée, variante avec de petites fleurs ou petits détails colorés · 5) dalles de néon violet, tuile de base qui se répète sans raccord · 6) dalles de néon violet, variante · 7) faille de lumière violette, tuile qui se répète (image 1 de l'animation) · 8) faille de lumière violette, même tuile avec les reflets décalés (image 2) · 9) faille de lumière violette, image 3 · 10) bord haut gauche d'une zone de dalles de néon violet entourée de roche noire vitrifiée · 11) bord haut d'une zone de dalles de néon violet · 12) bord haut droit d'une zone de dalles de néon violet · 13) bord gauche d'une zone de dalles de néon violet · 14) bord droit d'une zone de dalles de néon violet · 15) bord bas gauche d'une zone de dalles de néon violet · 16) bord bas d'une zone de dalles de néon violet · 17) bord bas droit d'une zone de dalles de néon violet · 18) coin intérieur haut gauche : dalles de néon violet partout sauf un petit coin de roche noire vitrifiée en haut à gauche · 19) coin intérieur haut droit · 20) coin intérieur bas gauche · 21) coin intérieur bas droit · 22) berge haut gauche d'une étendue de faille de lumière violette entourée de roche noire vitrifiée · 23) berge haute · 24) berge haut droite · 25) berge gauche · 26) berge droite · 27) berge bas gauche · 28) berge basse · 29) berge bas droite · 30) coin intérieur de berge haut gauche · 31) coin intérieur de berge haut droit · 32) coin intérieur de berge bas gauche · 33) coin intérieur de berge bas droit · 34) paroi de cratère : haut de falaise, bord gauche · 35) paroi de cratère : haut de falaise, bord du milieu · 36) paroi de cratère : haut de falaise, bord droit · 37) paroi de cratère : paroi, côté gauche · 38) paroi de cratère : paroi, milieu · 39) paroi de cratère : paroi, côté droit · 40) paroi de cratère : pied de paroi, gauche · 41) paroi de cratère : pied de paroi, milieu · 42) paroi de cratère : pied de paroi, droit · 43) porte de la tour : moitié haut gauche (l'entrée fait 2 × 2 tuiles, creusée dans la paroi) · 44) porte de la tour : moitié haut droite · 45) porte de la tour : moitié bas gauche, avec l'ouverture sombre · 46) porte de la tour : moitié bas droite · 47) des marches d'escalier, vues de dessus

**FIN-02 · Tour du Clickbait : sols et murs**  
Les tuiles de sol de 20 × 20 pixels : je construis tous les écrans avec. Les bords s'emboîtent : garde toute la planche dans la même conversation.  
Grille : 12 × 8  
Cases : 1) dalles de pierre du donjon (métal noir strié de néon violet et rouge, fenêtres pub), tuile de base qui se répète sans raccord visible · 2) dalles de pierre du donjon (métal noir strié de néon violet et rouge, fenêtres pub), variante avec quelques détails · 3) dalles de pierre du donjon (métal noir strié de néon violet et rouge, fenêtres pub), deuxième variante · 4) dalles de pierre du donjon (métal noir strié de néon violet et rouge, fenêtres pub), variante avec de petites fleurs ou petits détails colorés · 5) sol plus clair d'un couloir, tuile de base qui se répète sans raccord · 6) sol plus clair d'un couloir, variante · 7) trou sans fond (vide noir), tuile qui se répète (image 1 de l'animation) · 8) trou sans fond (vide noir), même tuile avec les reflets décalés (image 2) · 9) trou sans fond (vide noir), image 3 · 10) bord haut gauche d'une zone de sol plus clair d'un couloir entourée de dalles de pierre du donjon (métal noir strié de néon violet et rouge, fenêtres pub) · 11) bord haut d'une zone de sol plus clair d'un couloir · 12) bord haut droit d'une zone de sol plus clair d'un couloir · 13) bord gauche d'une zone de sol plus clair d'un couloir · 14) bord droit d'une zone de sol plus clair d'un couloir · 15) bord bas gauche d'une zone de sol plus clair d'un couloir · 16) bord bas d'une zone de sol plus clair d'un couloir · 17) bord bas droit d'une zone de sol plus clair d'un couloir · 18) coin intérieur haut gauche : sol plus clair d'un couloir partout sauf un petit coin de dalles de pierre du donjon (métal noir strié de néon violet et rouge, fenêtres pub) en haut à gauche · 19) coin intérieur haut droit · 20) coin intérieur bas gauche · 21) coin intérieur bas droit · 22) berge haut gauche d'une étendue de trou sans fond (vide noir) entourée de dalles de pierre du donjon (métal noir strié de néon violet et rouge, fenêtres pub) · 23) berge haute · 24) berge haut droite · 25) berge gauche · 26) berge droite · 27) berge bas gauche · 28) berge basse · 29) berge bas droite · 30) coin intérieur de berge haut gauche · 31) coin intérieur de berge haut droit · 32) coin intérieur de berge bas gauche · 33) coin intérieur de berge bas droit · 34) mur épais du donjon (métal noir strié de néon violet et rouge, fenêtres pub) : haut de falaise, bord gauche · 35) mur épais du donjon (métal noir strié de néon violet et rouge, fenêtres pub) : haut de falaise, bord du milieu · 36) mur épais du donjon (métal noir strié de néon violet et rouge, fenêtres pub) : haut de falaise, bord droit · 37) mur épais du donjon (métal noir strié de néon violet et rouge, fenêtres pub) : paroi, côté gauche · 38) mur épais du donjon (métal noir strié de néon violet et rouge, fenêtres pub) : paroi, milieu · 39) mur épais du donjon (métal noir strié de néon violet et rouge, fenêtres pub) : paroi, côté droit · 40) mur épais du donjon (métal noir strié de néon violet et rouge, fenêtres pub) : pied de paroi, gauche · 41) mur épais du donjon (métal noir strié de néon violet et rouge, fenêtres pub) : pied de paroi, milieu · 42) mur épais du donjon (métal noir strié de néon violet et rouge, fenêtres pub) : pied de paroi, droit · 43) porte du donjon : moitié haut gauche (l'entrée fait 2 × 2 tuiles, creusée dans la paroi) · 44) porte du donjon : moitié haut droite · 45) porte du donjon : moitié bas gauche, avec l'ouverture sombre · 46) porte du donjon : moitié bas droite · 47) des marches d'escalier, vues de dessus

**FIN-03 · Tour du Clickbait : portes**  
Chaque porte dans tous ses états. La porte est dessinée dans l'épaisseur du mur, comme un tunnel.  
Grille : 6 × 4  
Cases : 1) porte du mur du haut, ouverte · 2) porte du mur du haut, fermée par une grille · 3) porte du mur du haut, verrouillée par une serrure dorée · 4) porte du mur du haut, porte du boss, ornée et menaçante · 5) porte du mur du haut, murée (mur plein) · 6) porte du mur du haut, fissurée (on peut la faire sauter) · 7) porte du mur du bas, ouverte · 8) porte du mur du bas, fermée par une grille · 9) porte du mur du bas, verrouillée · 10) porte du mur du bas, porte du boss · 11) porte du mur du bas, murée · 12) porte du mur du bas, fissurée · 13) porte du mur de gauche, ouverte · 14) porte du mur de gauche, fermée par une grille · 15) porte du mur de gauche, verrouillée · 16) porte du mur de gauche, porte du boss · 17) porte du mur de gauche, murée · 18) porte du mur de gauche, fissurée · 19) porte du mur de droite, ouverte · 20) porte du mur de droite, fermée par une grille · 21) porte du mur de droite, verrouillée · 22) porte du mur de droite, porte du boss · 23) porte du mur de droite, murée · 24) porte du mur de droite, fissurée

**FIN-04 · Tour du Clickbait : objets et mécanismes**  
Tout ce qui est posé dans les salles, à la même échelle.  
Grille : 6 × 4  
Cases : 1) un bloc à pousser, même pierre que les murs · 2) une statue gardienne sur socle (toutes les statues sont identiques, même celle qu'on peut pousser) · 3) un néon sur pied violet, éteinte · 4) un néon sur pied violet, allumée, image 1 · 5) un néon sur pied violet, allumée, image 2 · 6) un pot fermé · 7) le pot qui se brise · 8) un coffre fermé · 9) le même coffre ouvert, vide · 10) un grand coffre (celui de l'objet du donjon), fermé · 11) le grand coffre ouvert · 12) une plaque de pression au sol · 13) la même plaque enfoncée · 14) un cristal éteint sur socle (il réagit à la Manette) · 15) le même cristal allumé · 16) un escalier qui descend · 17) une échelle · 18) le socle de l'objet · 19) Un bloc à pousser en métal noir strié de néon. · 20) Une statue du Roi Clickbait en miniature, sur socle. · 21) Un néon sur pied qui éclaire en violet. · 22) Un coffre noir et violet fermé. · 23) Le même coffre ouvert, vide, le couvercle basculé vers l'arrière. · 24) Un panneau publicitaire au sol qui clignote (piège), sans texte.

**FIN-05 · Le Roi Clickbait**  
Le boss sur une planche de 6 grandes cases.  
Grille : 3 × 2  
Cases : 1) de face, immobile et menaçant · 2) de face, il attaque · 3) de face, étourdi : tête basse, yeux qui clignotent, fissures qui s'éteignent · 4) de face, touché : il recule, tout blanc (image de flash) · 5) son projectile : une petite fenêtre pub rouge qui file · 6) deuxième phase : deux fois plus gros, fissures violettes partout, couronne brisée

**FIN-06 · Pop-up d'élite**  
Toutes les images de ce monstre sur une seule planche.  
Grille : 6 × 4  
Cases : 1) de face, immobile · 2) de face, pied gauche en avant · 3) de face, pied droit en avant · 4) de dos, immobile · 5) de dos, pied gauche en avant · 6) de dos, pied droit en avant · 7) de profil, immobile · 8) de profil, pied gauche en avant · 9) de profil, pied droit en avant · 10) de face, il attaque · 11) de dos, il attaque · 12) de profil, il attaque · 13) de face, touché : il recule, yeux plissés · 14) de dos, touché · 15) de profil, touché · 16) il apparaît (il sort de terre ou se matérialise), image 1 : presque rien · 17) apparition, image 2 : à moitié là · 18) apparition, image 3 : presque entier · 19) l'effet de son attaque (souffle, choc ou éclair, dans ses couleurs), image 1 · 20) l'effet de son attaque, image 2 · 21) l'effet de son attaque, image 3 · 22) il disparaît : il éclate en petits carrés violets et en fumée (image 1) · 23) image 2 de la disparition, plus éclatée · 24) image 3, presque rien

**FIN-07 · Clic d'élite**  
Toutes les images de ce monstre sur une seule planche.  
Grille : 6 × 4  
Cases : 1) de face, immobile · 2) de face, pied gauche en avant · 3) de face, pied droit en avant · 4) de dos, immobile · 5) de dos, pied gauche en avant · 6) de dos, pied droit en avant · 7) de profil, immobile · 8) de profil, pied gauche en avant · 9) de profil, pied droit en avant · 10) de face, il attaque · 11) de dos, il attaque · 12) de profil, il attaque · 13) de face, touché : il recule, yeux plissés · 14) de dos, touché · 15) de profil, touché · 16) il apparaît (il sort de terre ou se matérialise), image 1 : presque rien · 17) apparition, image 2 : à moitié là · 18) apparition, image 3 : presque entier · 19) l'effet de son attaque (souffle, choc ou éclair, dans ses couleurs), image 1 · 20) l'effet de son attaque, image 2 · 21) l'effet de son attaque, image 3 · 22) il disparaît : il éclate en petits carrés violets et en fumée (image 1) · 23) image 2 de la disparition, plus éclatée · 24) image 3, presque rien

**FIN-08 · Troll d'élite**  
Toutes les images de ce monstre sur une seule planche.  
Grille : 6 × 4  
Cases : 1) de face, immobile · 2) de face, pied gauche en avant · 3) de face, pied droit en avant · 4) de dos, immobile · 5) de dos, pied gauche en avant · 6) de dos, pied droit en avant · 7) de profil, immobile · 8) de profil, pied gauche en avant · 9) de profil, pied droit en avant · 10) de face, il attaque · 11) de dos, il attaque · 12) de profil, il attaque · 13) de face, touché : il recule, yeux plissés · 14) de dos, touché · 15) de profil, touché · 16) il apparaît (il sort de terre ou se matérialise), image 1 : presque rien · 17) apparition, image 2 : à moitié là · 18) apparition, image 3 : presque entier · 19) l'effet de son attaque (souffle, choc ou éclair, dans ses couleurs), image 1 · 20) l'effet de son attaque, image 2 · 21) l'effet de son attaque, image 3 · 22) il disparaît : il éclate en petits carrés violets et en fumée (image 1) · 23) image 2 de la disparition, plus éclatée · 24) image 3, presque rien

## 7. Pour construire le jeu ensuite (seulement quand Jonathan le demande)

- Jeu en HTML + JavaScript (canvas), sans outil de construction : il doit marcher en double-cliquant sur index.html et en ligne sur le site.
- Rendu : tout est dessiné dans une image de 320 × 220 (plus le bandeau) puis agrandi sans lissage à la taille de l'écran. Les sprites sont affichés avec exactement leurs pixels.
- Carte du monde : chaque écran est décrit en lettres, une par tuile (16 × 11) ; les bords se raccordent à l'écran voisin ; collisions à la tuile ; seul le pied des personnages bloque.
- Déplacements : Spirit glisse légèrement pour passer un coin (comme dans Zelda) ; changer d'écran fait glisser l'image ; entrer dans une grotte ou un donjon fait un fondu au noir.
- Il existe un premier prototype (Plaine, grotte de l'ermite, Ampli, Crache-pierres) dans le dépôt GitHub de Jonathan, dossier `jeu-spirit/zelda/` de la branche `claude/wonderful-albattani-oq4m40`. Si Jonathan te joint ses fichiers, repars de son moteur (commandes clavier et tactiles, sons, dialogues, glissement entre écrans) et remplace ses dessins provisoires par les images découpées.

## 8. Façon de répondre à Jonathan

En français, direct, sans tirets cadratins ni emojis, sans formules creuses. Donner son avis quand c'est utile, dire franchement quand une chose n'est pas sûre, signaler ce qui ne va pas au lieu d'acquiescer. Les prompts pour ChatGPT se donnent dans un document à part, jamais au milieu de la discussion. Ne jamais lui demander une image qu'il n'a plus : il n'a gardé que les images de ce zip et l'image officielle de Spirit qui saute.
