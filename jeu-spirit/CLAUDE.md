# Jeu « Spirit et le Roi Clickbait » : règles à respecter

Ces règles viennent de Jonathan, au fil des tests. Elles valent pour toute modification du jeu, du plan ou des prompts du catalogue.

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

## Images
- Tout prompt avec Spirit rappelle le SG sur le casque. Dimensions 1672 × 941 pour les écrans entiers.
- Une retouche « porte ouverte » ou « écran allumé » n'est reprise que sur sa zone (COMPOSITES dans `outils/preparer_assets.py`).
- Une carte du catalogue disparaît quand ses images sont reçues ; ajouter une carte en fin de région pour ne pas décaler les codes.

## Livraison
Tester (Playwright : donjon complet, sorties de la Plaine, prologue du QG), augmenter SG.VERSION, refaire le zip, republier l'artefact et le catalogue, pousser sur la branche, répondre en français sans tirets cadratins ni emojis.
