# Spirit et le Roi Clickbait

Document de référence du jeu (phase 0). Toutes les phases suivantes s'appuient dessus.

## L'histoire

Le soir des 11 ans de SpiritGamer, tout le site tient dans un monde caché : le Réseau. Au centre se dresse le QG, et sous le QG brille la Source, une grande lumière faite de toutes les infos vérifiées publiées en onze ans.

Pendant la fête, une créature gonflée de titres mensongers et de rumeurs sort d'une fenêtre publicitaire : le Roi Clickbait. Il fait éclater la Source en huit fragments et les confie à ses sbires, qui les cachent dans huit repaires. Sans la Source, le Réseau se remplit de bruit : pop-ups, spams, trolls. Les huit Gardiens des rubriques du site sont enfermés.

Spirit dormait dans les coulisses du QG, son casque sur les oreilles. Le casque a filtré le bruit : il est le seul à ne pas avoir été touché. Son micro capte encore un faible signal de la Source, qui le guide.

Il doit parcourir le Réseau, libérer les huit Gardiens, rassembler les fragments, puis affronter le Roi Clickbait dans sa tour.

**Fin** : vaincu, le Roi Clickbait se dégonfle. Il n'en reste qu'un petit lutin, Buzz, qui voulait seulement qu'on le lise. La rédaction l'accueille comme stagiaire, à condition qu'il apprenne à vérifier ses sources.

## Règles du monde

- **Attaque** : Spirit lance une onde sonore avec son micro, à courte portée. Quand ses cœurs sont pleins, l'onde part plus loin (comme le rayon de l'épée dans Zelda). Le micro s'améliore deux fois : Micro Pro, puis Micro d'Or.
- **Ennemis touchés** : ils ne meurent pas. Ils éclatent en confettis, parfois en laissant tomber un objet. Aucun sang, aucune blessure visible.
- **Vie** : des cœurs. Chaque Gardien libéré donne un cœur de plus. Des fragments de cœur sont cachés dans le monde (4 fragments = 1 cœur).
- **Monnaie** : les Pixels.
- **Voyage rapide** : des bornes Wi-Fi à activer dans chaque région.
- **Gardiens** : des personnages inventés (animaux), ce qui évite de devoir demander l'accord de l'équipe. On pourra ajouter plus tard l'équipe réelle en caméo au QG si elle est d'accord.

## Les régions et les donjons

L'ordre est celui de la progression principale. L'objet de chaque donjon ouvre l'accès à la suite.

| # | Région | Rubrique | Gardien | Donjon | Objet obtenu | Ce que l'objet débloque | Boss |
|---|---|---|---|---|---|---|---|
| 0 | Le Parvis du QG | (village de départ) | | | | | |
| 1 | La Plaine des Pixels | Actu | Flash, le hibou reporter | Le Terrier des Pop-ups | Manette Retour (boomerang) | Activer des interrupteurs éloignés, ramasser des objets hors d'atteinte | La Reine Pop-up |
| 2 | La Forêt des Forums | Tests | Note, la tortue testeuse | Le Labyrinthe des Fils | Pétards Confettis (bombes) | Faire sauter les murs fissurés | Le Troll des Commentaires |
| 3 | Les Monts Hardware | Hardware | Volt, le renard robot | La Forge Surchauffée | Lanterne RGB | Éclairer les grottes sombres, allumer les torches | Surchauffe |
| 4 | Le Désert du Lag | Cinéma et animé | Bobine, le fennec cinéphile | La Salle Obscure | Câble Grappin | Franchir les ravins | Le Spoiler |
| 5 | Le Lac des Streams | Esport | Replay, la loutre commentatrice | L'Arène Engloutie | Planche Wi-Fi | Glisser sur l'eau | Le Kraken du Chat |
| 6 | La Cité des Bulles | Comics et manga | Encre, le calamar dessinateur | La Bibliothèque des Bulles | Baskets Turbo | Foncer, casser les piles de caisses, traverser les sols qui s'effritent | Le Plagiaire (copie de Spirit) |
| 7 | Les Marais Rétro | Rétro | Cartouche, la grenouille collectionneuse | Le Château 8 bits | Aimant | Tirer et pousser les blocs de métal | Le Glitch Géant |
| 8 | La Toundra du Cloud | Archives | Mémo, le mammouth archiviste | Les Archives Gelées | Lunettes de Vérif | Voir les faux murs et les chemins cachés | La Rumeur (invisible sans les lunettes) |
| 9 | Le Cratère du Clickbait | | | La Tour du Clickbait | | | Le Roi Clickbait |

## Ennemis par région

Comme dans le Zelda NES, une même créature peut revenir dans une autre couleur, plus résistante.

| Région | Ennemis |
|---|---|
| Plaine des Pixels | Pop-ups (fenêtres volantes), Spamlings (enveloppes qui sautillent), Clics (petits curseurs qui foncent) |
| Forêt des Forums | Trollinets, Fils-serpents, Hiboux-rumeurs (lancent des bulles de ragots) |
| Monts Hardware | Scarabugs (insectes mécaniques), Ventilos, Câbles-serpents |
| Désert du Lag | Laggers (fantômes qui se déplacent par saccades), Sabliers (sablier de chargement qui roule), Mirages |
| Lac des Streams | Poissons-spoil, Bulles de chat, Crabes-captcha |
| Cité des Bulles | Taches d'encre, Onomatopées vivantes (BAM, POW), Cases animées |
| Marais Rétro | Slimes 8 bits, Chauves-souris pixel, Moustiques-glitch |
| Toundra du Cloud | Cookies traqueurs, Pingouins-bots, Nuages-captcha |
| Cratère du Clickbait | Versions d'élite des ennemis précédents |

## Durée visée

- Histoire principale : 10 à 11 heures.
- Contenu facultatif : 4 à 5 heures (fragments de cœur, grottes secrètes, quêtes des habitants, mini-jeux, améliorations du micro).
- Option possible après la fin : une deuxième quête avec donjons réorganisés.

## Choix techniques

- JavaScript et canvas HTML5, sans moteur externe. Un dossier de fichiers statiques à déposer sur l'hébergement du site.
- Vue de dessus, un écran à la fois, cases de 32 × 32 pixels.
- Téléphone à l'horizontale : joystick virtuel à gauche, boutons A (attaque, action) et B (objet équipé) à droite, bouton menu. Clavier sur ordinateur.
- Musique et bruitages générés dans le code.
- Sauvegarde automatique dans le navigateur.
