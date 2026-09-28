# Jeu « Spirit et le Roi Clickbait » : règles à respecter

Ces règles viennent de Jonathan, au fil des tests. Elles valent pour toute modification du jeu, du plan ou des prompts du catalogue.

## Nouvelle direction (septembre 2026) : pixel art façon Zelda
Jonathan a décidé de tout refaire proprement « à la Zelda ». La nouvelle version est dans `zelda/` ; l'ancienne (toon HD, images ChatGPT) reste dans `jeu/` comme archive, rien n'est supprimé.
- Style : pixel art 16 bits façon A Link to the Past / Minish Cap. Tuiles de 20 px, écrans de 16 × 11 tuiles, bandeau au-dessus, image agrandie sans lissage.
- Les graphismes viennent de planches de sprites faites par ChatGPT en pixel art (catalogue `zelda/catalogue/`, généré par `generer.py`), que Claude remet au propre et découpe avec `zelda/outils/nettoyer_planche.py` (retour à la vraie taille en pixels, fond magenta rendu transparent, palette réduite). Le dessin par le code (`zelda/js/art.js`) sert de prototype en attendant. Les règles « Images » et l'ancien catalogue plus bas concernent l'ancienne version.
- Planches : fond magenta #FF00FF, grille invisible de cases égales. Jonathan veut garder exactement la pixellisation de sa première planche de Spirit (`zelda/planches/sp01-essai-coeur.webp`), ni plus fine ni plus grosse : chaque planche est un dessin de 240 × 160 pixels réels agrandi 6,4 fois en 1536 × 1024. Cases : personnages, monstres et décor 40 × 40 (grille 6 × 4 ; Spirit 34 px de haut, tête ronde de 24 px identique de face, de dos et de profil), tuiles de sol 20 × 20 (grille 12 × 8), portraits, boss et poses d'objets 80 × 80 (grille 3 × 2). Le jeu affiche les sprites à leur taille réelle : le moteur passera en tuiles de 20 px (écran 16 × 11 tuiles = 320 × 220). `nettoyer_planche.py` mesure la taille des pixels (mettre 0). Logo SG en cyan sur la poitrine de Spirit (pas sur le casque, trop petit).
- IMPORTANT : Jonathan n'a plus AUCUNE image de l'ancienne version (ni Spirit de face, de dos ou de profil, ni monstres, personnages, décor, plantes, objets). Il n'a gardé que l'image officielle de Spirit où il saute. Un prompt ne peut joindre que cette image et les planches faites avec le catalogue pixel (références « @SP-01 », « @SP-02 »…). Tout le reste se décrit en texte.
- Portes des donjons : ChatGPT dessine les quatre murs (Jonathan tient aux portes de côté dessinées comme des portes de côté, plus étroites, avec leurs propres proportions ; ne jamais tourner la porte du haut par le code). Le prompt d'origine ne change pas : une seule phrase ajoutée pour que la serrure, la clé et la tête du boss des portes de côté soient tournées dans le même sens que la porte. Ne pas ajouter d'autres consignes de forme, elles changent les portes.
- Onglet Spirit du catalogue : TOUTES les planches du petit Spirit (poses, portraits, chaque objet utilisé) y sont, chacune en trois versions : casque normal, Casque 2.0 (or) et Casque 3.0 (violet). Toute nouvelle planche de Spirit doit avoir ses deux versions de casque (faites par `version_casque` dans `generer.py`, à partir de la planche normale).
- On avance dans l'ordre : Spirit d'abord, et on valide chaque planche en jeu avant de passer à la suivante.
- On garde l'histoire et la logique du moteur (dialogues, objets, monstres, donjons) ; l'affichage passe aux tuiles.
- Les écrans se décrivent en lettres dans `zelda/js/carte.js` ; les bords se raccordent d'un écran à l'autre ; collisions à la tuile.
- Spirit garde ses couleurs (blanc, casque noir et bleu aux écouteurs cyan, tee-shirt bleu au logo cyan, short et baskets bleus). À 16 px, les lettres SG ne sont pas lisibles : elles apparaîtront sur les portraits des dialogues.

## Cohérence entre le texte et ce qu'on voit
Après chaque modification, relire les textes concernés (SG.TEXTES dans `jeu/js/monde.js`, SG.TEXTES.donjon et SG.OBJETS dans `jeu/js/donjon.js`, panneaux) :
- ce que disent les personnages, les panneaux et les descriptions d'objets doit correspondre exactement à ce qui est à l'écran et à ce que le jeu permet (un écran décrit comme planté doit l'être à l'image, un objet décrit comme cassant les pots doit les casser) ;
- quand une règle de jeu change (qui active quoi, ce qu'on peut couper), mettre à jour tous les textes qui en parlent ;
- ne jamais dévoiler la suite (la grotte, la forêt, les objets à venir) avant que le joueur y arrive ;
- l'heure, les lieux et les noms restent cohérents (la fête a lieu le soir ; le frère de Spirit s'appelle Mika, un lynx qui se prend pour le boss).

## Jamais de collage
Ne jamais dessiner, recoller ou reconstituer quoi que ce soit par-dessus une image peinte (écrans, touffes, sol refait, cadres, bouts de décor). S'il manque quelque chose, ajouter une carte au catalogue pour ChatGPT et attendre l'image : Jonathan préfère patienter plutôt qu'un rendu bricolé. Les seules exceptions sont les objets et personnages prévus pour être posés (sprites) et les effets animés (flash, secousse, particules).

## Logique du monde
- Rien de collé : les écrans et salles partent d'un sol vierge ; seuls trous, eau, lave et falaises sont peints dans le sol. Les objets sont posés par le jeu, avec les mêmes couleurs que le décor.
- Quadrillage invisible : dans les salles, murs de 120 px logiques et sol de 13 × 6 dalles de 80 px (104,5 px dans l'image de 1672), origine du sol en (120, 120). Tout objet est posé sur une dalle, bien de face, jamais en biais.
  À FAIRE à l'arrivée des nouvelles salles (D1-09) : le code des donjons utilise encore la grille 16 × 9 qui part de (0, 0), décalée d'une demi-dalle ; passer les plans en 13 × 6 avec cette origine avant d'utiliser les nouvelles images.
- Portes : un tunnel dans l'épaisseur du mur où le personnage tient entier ; on change de salle dès l'embrasure ; aucune porte fermée ne laisse entrer Spirit ; rien devant une porte.
- Seul le pied des objets bloque : on passe derrière statues, rochers, braseros.
- Les cristaux ne réagissent qu'à la Manette. Les énigmes ne donnent pas la solution (pas de halo sur l'objet à pousser).
- Pas de mécanisme qui demande un objet que le joueur n'a pas encore (pas de mur fêlé sans bombes).

- Continuité entre écrans, comme dans Zelda : l'écran qui part et celui qui arrive forment un seul paysage (chemin à la même position et largeur de chaque côté du bord, même sol, même bordure). Le passage glisse d'un écran à l'autre.
- Contours précis : les masques de collision suivent les bords peints (eau, lave, trous, falaises, rochers), obtenus par segmentation des couleurs de l'image, jamais par de grands rectangles. Eau et trous : on ne marche pas dedans mais les projectiles passent au-dessus ; lave : on ne marche pas dedans.
- Chaque région a ses propres éléments de décor (câbles, cactus de verre, roseaux, poubelles, blocs de glace…), listés dans sa carte « objets à poser », pas seulement des rochers et des touffes.
- Carte du Réseau : elle se dévoile région par région (image carte-reseau et sa version sous la brume) ; la carte de la région montre les écrans visités.
- Passages d'au moins deux fois la largeur de Spirit. Aucun blocage définitif : un bloc ou une statue mal poussé revient à sa place quand on ressort de la salle.
- Les ennemis n'apparaissent jamais dans l'eau, la lave, un mur ou devant l'entrée.
- Un objet qu'on peut casser, couper, pousser ou ouvrir se distingue d'un simple décor ; chaque secret a un indice quelque part (panneau, carnet, dialogue).

- La Plaine et toutes les régions du Réseau sont de jour : Spirit a changé de dimension en passant le vortex, la nuit du QG ne s'y applique pas.
- 8 régions et 8 donjons (Plaine/Terrier des Pop-ups, Forêt des Forums/Labyrinthe des Fils, Monts Hardware/Forge Surchauffée, Désert du Lag/Salle Obscure, Lac des Streams/Arène Engloutie, Cité des Bulles/Bibliothèque des Bulles, Marais Rétro/Château 8 bits, Toundra du Cloud/Archives Gelées), puis le Cratère du Clickbait pour la fin.
- Pour tout ce qui bouge, il faut ses images : chaque ennemi a ses poses et son animation (marche, vol, flottement, sortie de terre), chaque projectile son vol et son impact, chaque objet son effet d'utilisation, chaque région son environnement animé (reflets et ronds dans l'eau, bulles et gouttes de lave avec ombre d'avertissement, pluie, neige, sable, brume, sortie de terre et trou qui se referme). Le code ne fait que les animer (déplacement, apparition, fondu, particules).
- Une porte ouverte garde exactement les mêmes battants que fermée : seul l'angle change. Une porte qui relie deux pièces est la même des deux côtés (nombre de battants, bois, vitres, encadrement, largeur) : la loge a une double porte, donc le couloir aussi.

## Images
- Les prompts se donnent uniquement dans le catalogue, jamais dans la discussion : Jonathan s'y retrouve mieux.
- Jamais un prompt ne demande une image que Jonathan a supprimée (les 49 de la page « images à refaire ») : on renvoie à la carte qui produit la nouvelle version (références « @D1-09 », « @D1-18 », « @D1-22 », « @PL » dans le catalogue).
- Tout prompt avec Spirit rappelle le SG sur le casque. Dimensions 1672 × 941 pour les écrans entiers.
- Une retouche d'une même pièce garde exactement le même éclairage : aucune lueur, aucun reflet ni effet de lumière ajouté (sauf ce que la consigne demande, limité à la zone concernée).
- Chaque état d'une pièce part de l'état précédent et garde tout ce qui a déjà changé (loge : écrans jeu, puis pub, puis écran SG parasité, puis porte ouverte (avec la pub), puis porte ouverte avec l'écran parasité, puis vortex à partir de celle-ci ; bureau de Mika : pub, puis porte ouverte avec la pub). Les composites du jeu reprennent toutes les zones déjà changées.
- Une retouche « porte ouverte » ou « écran allumé » n'est reprise que sur sa zone (COMPOSITES dans `outils/preparer_assets.py`).
- Une carte du catalogue disparaît quand ses images sont reçues ; ajouter une carte en fin de région pour ne pas décaler les codes.

## Livraison
Tester (Playwright : donjon complet, sorties de la Plaine, prologue du QG), augmenter SG.VERSION, refaire le zip, republier l'artefact et le catalogue, pousser sur la branche, répondre en français sans tirets cadratins ni emojis.
