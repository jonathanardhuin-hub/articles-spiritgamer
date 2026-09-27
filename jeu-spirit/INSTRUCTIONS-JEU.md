# Spirit et le Roi Clickbait : toutes les instructions du jeu

Document de référence pour reprendre le projet dans une autre conversation Claude. Tout ce qui est écrit ici a été décidé avec Jonathan au fil des tests : à respecter tel quel.

## 1. Le projet

- Jeu d'aventure façon Zelda NES (vue de dessus, écrans fixes qui glissent de l'un à l'autre, donjons en salles), pour le site spiritgamer.fr.
- Héros : Spirit, la mascotte du site. Petit personnage tout blanc à grosse tête ronde, grands yeux bleus, casque-micro noir et bleu avec les lettres SG en cyan sur chaque écouteur, tee-shirt bleu avec le logo SG, short bleu à bandes cyan, baskets bleues et blanches. Le SG sur le casque doit apparaître dans toutes les images de Spirit.
- Style : toon HD, contours noirs épais, couleurs riches. Jamais de pixel art.
- Ton : graphismes mignons mais histoire pour adultes. Pas de gore, jamais de sang.
- Commandes : clavier et tactile.
- Jeu en HTML/JavaScript (canvas), jouable dans le navigateur et en double-clic sur index.html.

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
- Casque 2.0 (trésor caché du donjon 4) : deux fois moins de dégâts, SG et liseré du casque en or. Casque 3.0 (trésor caché du donjon 7) : quatre fois moins, SG et liseré en violet. Seules les couleurs du casque changent.

### Les personnages du QG et du Parvis
Gus (rédacteur en chef), Mona (chatte rousse marchande), Lila (petite lapine fan de jeux), Mika (le frère, lynx), l'ermite de la grotte de la Plaine.

## 3. Règles de logique du jeu

- Cohérence : ce que disent les personnages, les panneaux et les descriptions d'objets correspond exactement à ce qu'on voit et à ce que le jeu permet. Ne jamais dévoiler la suite (grotte, forêt, objets à venir) avant que le joueur y arrive.
- Jamais de collage : ne rien dessiner ou recoller par le code sur une image peinte. S'il manque quelque chose, on fait l'image et on attend. Seules exceptions : les sprites prévus pour être posés et les effets animés.
- Sol vierge : les écrans et les salles ne contiennent que le sol, les chemins, l'eau, la lave, les trous, les falaises et les arbres de bordure. Rochers, touffes, statues, coffres, pots, blocs sont posés par le jeu, dessinés à part avec les mêmes couleurs que l'écran.
- Chaque région a ses propres éléments de décor (câbles, cactus de verre, roseaux, poubelles, blocs de glace…), pas seulement des rochers et des touffes. Chaque élément qu'on coupe a sa version coupée (petite base rase), jamais un moignon.
- Quadrillage invisible des salles : murs de 157 px, sol de 13 × 6 dalles de 104,5 px dans l'image de 1672 × 941 (dalles de 80 px dans le jeu). Tout objet occupe une dalle, bien de face, jamais en biais.
- Écrans extérieurs : 16 × 9 cases ; chaque écran suit un plan (bordure, zone de marche, chemins de sortie).
- Continuité entre écrans, comme dans Zelda : de part et d'autre d'un bord, même chemin, même position, même largeur, même sol. Aucun chemin qui s'arrête net.
- Portes : un tunnel dans l'épaisseur du mur où Spirit tient entier ; on change de salle dès l'embrasure ; une porte fermée ne laisse jamais entrer ; rien devant une porte ; aucun ennemi devant la porte d'entrée. Là où il n'y a pas de porte, il y a un mur plein.
- Une porte ouverte garde exactement les mêmes battants que fermée, seul l'angle change, et les battants restent dans l'encadrement. Une porte qui relie deux pièces est la même des deux côtés (la loge a une double porte vitrée, donc le couloir aussi).
- Seul le pied des objets bloque : on passe derrière les statues, rochers, braseros.
- Contours précis pour l'eau, la lave, les trous, les falaises et les rochers. Eau et trous : on ne marche pas dedans, les projectiles passent au-dessus.
- Les cristaux ne réagissent qu'à la Manette. Les énigmes ne donnent pas la solution (la gargouille à pousser est identique aux autres).
- Pas de mécanisme qui demande un objet que le joueur n'a pas encore.
- Passages d'au moins deux fois la largeur de Spirit. Aucun blocage définitif : un bloc mal poussé revient à sa place quand on ressort.
- Après un boss : d'abord le cœur, loin de Spirit ; le Gardien n'apparaît qu'une fois le cœur ramassé, de l'autre côté de la salle.
- Chaque secret a un indice quelque part (panneau, carnet de Flash, dialogue).
- Tout ce qui bouge a ses images : poses et animation de chaque ennemi (marche, vol, sortie de terre), projectile de chaque ennemi (vol et impact), effet de chaque objet, barre de vie et effets des boss, environnement animé de chaque région (reflets et ronds dans l'eau, bulles et gouttes de lave avec ombre d'avertissement, pluie, neige, sable, brume). Des chauves-souris dans les donjons, tuées d'un coup de Manette.

## 4. Règles pour les images (ChatGPT)

- Une carte du catalogue = une nouvelle conversation ChatGPT. Toutes les étapes d'une carte se font dans cette même conversation. Si ChatGPT déforme Spirit ou oublie une consigne, recommencer dans une nouvelle conversation.
- Les prompts sont dans le catalogue, jamais dans la discussion.
- Écrans et salles : 1672 × 941 pixels, avec le plan (écran ou salle) joint.
- Personnages, monstres, objets, effets : une planche de 1536 × 1024 avec tous les éléments de la carte, bien séparés (au moins 60 px de fond gris), même échelle, fond gris uni #808080, sans ombre ni texte. Maximum 6 éléments par planche.
- Retouches d'une même pièce : même éclairage exactement, aucune lueur ni reflet ajouté. Chaque état part de l'image de l'état juste avant (loge : écrans jeu, puis pub, puis écran SG parasité, porte ouverte avec la pub, porte ouverte avec l'écran parasité, puis vortex ; bureau de Mika : pub, puis porte ouverte avec la pub). Le jeu ne reprend de chaque retouche que la zone qui change.
- Objets sous licence : décrits « en mode X » (allure reconnaissable, sans logo ni texte).
- Pièces intérieures du QG : murs en gros blocs de pierre gris-bleu avec des appliques carrées, comme la loge.

## 5. Où en est le projet

- Jouable : prologue au QG, la Plaine (9 écrans), la grotte de l'ermite, le donjon 1 complet (Terrier des Pop-ups, boss la Reine Pop-up, Flash libéré).
- En cours : Jonathan refait les images avec ChatGPT : toute la Plaine en sol vierge (en commençant par le sol d'herbe rase), la loge et ses états, le couloir, les salles du donjon 1 avec le quadrillage, les objets du donjon 1, Flash.
- Liens :
  - Le jeu : https://claude.ai/artifact/KyXBqpjD5Nd461Gfwxeeco
  - Le catalogue des prompts : https://claude.ai/artifact/5YAPPVabmScEbVdn7CWa5P
  - Les images à supprimer et refaire : https://claude.ai/artifact/NgnjeYwSZC9zd69Dx2bNH7
  - Envoi des images sur GitHub : https://github.com/jonathanardhuin-hub/articles-spiritgamer/upload/claude/wonderful-albattani-oq4m40/jeu-spirit/images/a-trier
- Le code et les images sont dans le dépôt GitHub jonathanardhuin-hub/articles-spiritgamer, branche claude/wonderful-albattani-oq4m40, dossier jeu-spirit.

## 6. Façon de répondre à Jonathan

En français, direct, sans tirets cadratins ni emojis, sans formules creuses. Donner son avis quand c'est utile, dire franchement quand une chose n'est pas sûre, signaler quand quelque chose ne va pas au lieu d'acquiescer.
