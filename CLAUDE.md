# CLAUDE.md — Portfolio de Rayane Halim (rayane-hlm.github.io)

> Passation rédigée le 24/11/2026 à la fin d'une longue session de travail.
> Tu ne vois pas cette session : **tout ce qu'il faut savoir est ici**. Lis ce fichier en entier avant d'agir.
> Rayane parle français (registre familier), veut des réponses **concises et pratiques**, et est franc quand ça ne lui plaît pas.

---

## 1. Objectif

Portfolio professionnel pour décrocher un **stage Data du 1er mars au 4 juin 2027** (analyse de données, BI ou bases de données).

**Double règle, non négociable :**
1. **Un recruteur pressé trouve toutes les infos** (qui, formation, dates de stage, compétences, projets, contact, CV) en quelques secondes, sans dépendre de l'animation.
2. **Quelqu'un qui scrolle a l'effet « waouh »** de la référence : un manga interactif façon « The Notturno Experience » (encre noir et blanc, une couleur forte, cases, scroll qui raconte). C'est le **niveau d'ambition** qui compte, pas une copie.

---

## 2. Fil conducteur (validé)

> **« Un manga gravé, Volume 01 : chaque scène est une planche, et le soleil rouge qui se lève sur la cathédrale traverse toutes les planches jusqu'à se coucher sur le contact. »**

Le soleil rouge est le fil visible : il se lève derrière la cathédrale d'Amiens (couverture), sert de passage vers le data center, revient au dos des cartes, derrière l'IUT, sur la frise du parcours, se couche sur le stade puis derrière la cathédrale à la fin. **Chaque transition doit servir ce fil.**

---

## 3. Direction artistique validée

### Palette (3 encres seulement)
| Rôle | Valeur |
|---|---|
| Papier | `#f4f0e8` |
| Encre | `#111` |
| Rouge (aplats, soleil, accents) | `#e10600` |
| Rouge pour du **texte** sur papier (contraste AA) | `#b30400` |
| Texte secondaire | `#3a3631` |

### Typographies (auto-hébergées dans `v2/fonts/`)
- **Zen Old Mincho** 700/900 : titres, nom, chiffres (aspect gravé/imprimé).
- **Zen Kaku Gothic New** 500/700 : texte courant, étiquettes.
- Étiquettes en capitales espacées (`letter-spacing:.16–.2em`), en rouge texte `#b30400`.

### Principes graphiques
- **Style gravure / encre de manga seinen**, tracé à la main : pleins et déliés, aplats noirs francs, hachures parcimonieuses, trame de points seulement dans quelques ombres. **Aucun dégradé, aucun rendu 3D, aucun lavis gris.**
- **Grain de papier commun** à toutes les planches (`--grain` en SVG `feTurbulence`, posé en `mix-blend-mode:multiply` sur la page et sur chaque case).
- **Mise en page manga** : cases à **bordure encrée de 3 px**, **gouttières papier** (`--gutter: clamp(8px,1vw,14px)`), inserts qui arrivent par-dessus, une illustration découpée en 2-3 cases au scroll. C'est la composition qui fait « humain ».
- **Texte intégré au dessin** sous forme de **récitatifs** (boîte papier, bord encré 2,5 px, posée à cheval sur la bordure d'une case), de **cartouches** (double filet) ou de **bulles**. **Jamais de texte posé directement sur l'image.**
- **Soleil de transition en SVG** (pas de zoom bitmap) : cercle rempli d'un motif de trame rouge (`#ink-dots`) et déformé par un filtre d'encre (`#ink-edge`, `feTurbulence` + `feDisplacementMap`). Déjà codé dans `v2/index.html`.

### Consigne EXACTE de génération des planches

Outil utilisé : **Figma MCP → `generate_image`** (modèle par défaut `gpt-image-2.5-flare`), fichier Figma **« Portfolio manga — cases test »**, `fileKey = ObLyTswKKNOCI25BnexQa3`, format **1792×1024** (sortie réelle 1536×864). Chaque génération consomme des **crédits IA Figma** du plan Starter de Rayane : **annonce le nombre de générations avant de lancer**.

**Prompt de référence validé (planche GoCampus, copié mot pour mot)** — tous les autres prompts suivent exactement la même structure et le même bloc de style :

```
A hand-drawn seinen manga splash panel, wide format, drawn with a brush pen and G-pen nib by a human illustrator. Dramatic low-angle shot from street level. Strong foreground on the left: the open rear door and side of a small hatchback car, huge and close to the viewer, drawn with heavy solid black areas. Two university students, seen mostly from behind and in silhouette, are getting into the car carrying backpacks on one shoulder, one already bending into the back seat, the other laughing with a hand on the roof; motion conveyed by a few speed lines and flapping jacket. Middle ground on the right: a roadside billboard seen at a strong diagonal angle in perspective, its poster area left completely blank white with torn, peeling poster edges. Background very simplified: the low silhouette of a university building suggested in a few quick lines, a couple of varied trees in loose brushwork, lots of empty white paper sky. A large rising sun disc behind the building painted in rough crimson red ink with dry-brush, uneven edges and halftone texture, not a perfect circle. Strict palette: black ink, off-white paper, crimson red (#e10600) only for the sun. Varied line weight, thick-and-thin strokes, confident pressure, imperfect hand-inked lines, bold flat black fills, sparse cross-hatching, screentone dots only in a few shadows. Asymmetric bold composition, not a stock photo. No gradients, no airbrush, no 3D, no grey wash. No text, no letters, no logos, no faces visible.
```

**Bloc de style commun (à garder mot pour mot à la fin de tout nouveau prompt) :**
```
Strict palette: black ink, off-white paper, crimson red (#e10600) only for the sun. Varied line weight, thick-and-thin strokes, imperfect hand-inked lines, bold flat black fills, sparse cross-hatching, screentone dots only in a few shadows. Asymmetric bold composition, main subject detailed, background simplified with lots of empty paper. No gradients, no airbrush, no 3D, no grey wash. No text, no letters, no numbers, no logos.
```
Toujours commencer par : `A hand-drawn seinen manga splash panel, wide format, drawn with a brush pen and G-pen nib by a human illustrator.` puis un **cadrage dramatique** (contre-plongée, plongée, plan large dynamique), un **premier plan fort**, et le **soleil rouge** : `painted in rough crimson red ink with dry-brush, uneven edges and halftone texture, not a perfect circle`.

**Prompts déjà utilisés pour les planches existantes (copiés mot pour mot) :**

<details><summary>cover — couverture cathédrale (Figma node 5:2)</summary>

```
A hand-drawn seinen manga splash panel, wide format, drawn with a brush pen and G-pen nib by a human illustrator. Extreme low-angle shot looking up at the tall gothic spire and flying buttresses of Amiens cathedral, placed off-center on the right third, cropped boldly by the frame. Foreground bottom right: a few heavy black flat silhouettes of stone gargoyles and pinnacles very close to the viewer. A large rising sun disc directly behind the spire, painted in rough crimson red ink with dry-brush, uneven edges and halftone texture, not a perfect circle. The left half of the image is mostly empty off-white paper sky with only a few quick loose brush strokes of wind and a flock of tiny birds. Strict palette: black ink, off-white paper, crimson red (#e10600) only for the sun. Varied line weight, thick-and-thin strokes, imperfect hand-inked lines, bold flat black fills, sparse cross-hatching, screentone dots only in a few shadows. Main subject detailed, background simplified. No gradients, no airbrush, no 3D, no grey wash. No text, no letters, no logos.
```
</details>

<details><summary>datacenter — profil (node 5:3)</summary>

```
A hand-drawn seinen manga splash panel, wide format, drawn with a brush pen and G-pen nib by a human illustrator. Dramatic one-point perspective down a long data center corridor between tall server racks, slightly low angle and tilted (dutch angle). A single young man seen from behind, small in the middle distance, walking away down the corridor with a backpack, his long shadow stretching toward the viewer. Thick bundles of cables run along the ceiling. At the vanishing point at the far end, a glowing rough crimson red disc like a sun, painted with dry-brush and halftone texture, uneven edges. Foreground left: the edge of a server rack very close, a heavy flat black mass. Racks in the distance simplified to a few rhythmic lines, leaving areas of empty paper. A few speed lines converging to the red disc. Strict palette: black ink, off-white paper, crimson red (#e10600) only for the far disc. Varied line weight, thick-and-thin strokes, imperfect hand-inked lines, bold flat black fills, sparse cross-hatching, screentone only in a few shadows. No gradients, no airbrush, no 3D, no grey wash. No text, no letters, no numbers, no logos, no face visible.
```
⚠️ Rayane a jugé le « personnage de dos au centre dans un couloir symétrique » = cliché IA. La planche est donc **utilisée uniquement en recadrages** (cases dc-a, dc-b, dc-c) — ne pas la remontrer en plein écran.
</details>

<details><summary>card-back — dos de carte (node 5:4, portrait 1024×1536)</summary>

```
The back of a single playing card, seen perfectly frontally and filling the whole image edge to edge, portrait format, hand-drawn in seinen manga ink by a human illustrator with a brush pen and G-pen nib. Ornate symmetrical border of hand-inked engraving patterns, a solid black field, and in the center a large rough rising sun disc in crimson red ink with dry-brush texture and uneven edges, with thin radiating ink rays. Slightly imperfect, hand-drawn symmetry, visible line weight variation. Strict palette: black ink, off-white paper, crimson red (#e10600) only for the sun. No gradients, no 3D, no shadows outside the card, no text, no letters, no numbers, no logos, no existing card game branding.
```
</details>

<details><summary>card-face — face de carte vierge (node 5:5, portrait)</summary>

```
The face of a single blank playing card, seen perfectly frontally and filling the whole image edge to edge, portrait format, hand-drawn in seinen manga ink by a human illustrator. A thin hand-inked double border with small engraved corner ornaments and a narrow band of cross-hatching around the edge; the large central area is completely empty, plain off-white paper with only a faint paper grain, ready to receive content. A tiny rough crimson red ink sun dot in the top-left and bottom-right corners. Strict palette: black ink, off-white paper, crimson red (#e10600). Imperfect hand-drawn lines, varied line weight. No gradients, no 3D, no shadows outside the card, no text, no letters, no numbers, no symbols in the center, no logos.
```
</details>

<details><summary>planif — Planificateur d'événements (node 5:6)</summary>

```
A hand-drawn seinen manga splash panel, wide format, drawn with a brush pen and G-pen nib by a human illustrator. Strong foreground on the left: a hand holding a smartphone up toward the viewer, huge and close, the phone screen completely blank flat white with a thin black bezel, seen almost frontally. Behind it, at a café terrace table under a striped awning, a group of four young friends seen from a low angle, mostly from the side and back, laughing and pointing at the phone, one leaning in, one raising a glass; motion shown with a few quick strokes. Background simplified: café facade in a few lines, lots of empty paper sky, a rough crimson red ink sun low behind the awning with dry-brush uneven edges and halftone. Strict palette: black ink, off-white paper, crimson red (#e10600) only for the sun. Varied line weight, imperfect hand-inked lines, bold flat black fills, sparse hatching, screentone only in a few shadows. Asymmetric composition. No gradients, no airbrush, no 3D, no grey wash. No text, no letters, no logos, no detailed faces.
```
</details>

<details><summary>yugioh — Assistant Yu-Gi-Oh! (node 5:7)</summary>

```
A hand-drawn seinen manga splash panel, wide format, drawn with a brush pen and G-pen nib by a human illustrator. Dramatic high three-quarter angle over a desk at night. An open laptop on the right, its screen completely blank flat white, seen at a slight angle. Dozens of playing cards with blank faces scattered and fanned across the desk, some flying in the air with motion lines; in the foreground a hand slamming one card down onto the desk, close to the viewer, with impact lines. A desk lamp casting a hard cone of light and deep flat black shadows. Through a window at the back, a rough crimson red ink sun with dry-brush uneven edges. Background simplified, lots of black and empty paper. Strict palette: black ink, off-white paper, crimson red (#e10600) only for the sun. Varied line weight, imperfect hand-inked lines, bold flat black fills, sparse hatching, screentone only in a few shadows. No gradients, no 3D, no grey wash. No text, no letters, no numbers, no symbols on the cards, no logos, no existing card game branding.
```
</details>

<details><summary>parcours — panorama horizontal (node 5:8, 2048×768 demandé → 1792×768)</summary>

```
A very wide hand-drawn seinen manga panorama strip, drawn with a brush pen and G-pen nib by a human illustrator, meant to scroll horizontally. A single continuous road runs across the whole width from left to right through a French landscape that changes along the way: on the far left a small-town high school building, then a row of modest houses with one lit window, then a modern small office building with a satellite dish, then a large university campus building, and on the far right the road opens onto an empty horizon with wide fields. One young man with a backpack walks along the road in the middle-left, seen from the side, small. Background elements simplified with few lines, lots of empty paper sky. A single rough crimson red ink sun low on the far right horizon, dry-brush with uneven edges and halftone. Strict palette: black ink, off-white paper, crimson red (#e10600) only for the sun. Varied line weight, imperfect hand-inked lines, bold flat black fills on the road and foreground grass, sparse hatching. No gradients, no 3D, no grey wash. No text, no letters, no signs with writing, no logos.
```
</details>

<details><summary>stade — Hors des écrans (node 5:9)</summary>

```
A hand-drawn seinen manga splash panel, wide format, drawn with a brush pen and G-pen nib by a human illustrator. Extreme low-angle shot from pitch level of an amateur football player mid-kick, seen from behind and the side, body twisted, one leg swinging, the ball flying toward the viewer in the foreground with strong speed lines and impact lines. Grass blades huge in the foreground as flat black brush strokes. Background: a small regional stadium with simple stands and two floodlight towers drawn in a few lines, beams of light as white paper against hatched evening sky. A large rough crimson red ink setting sun behind the stands, dry-brush with uneven edges and halftone. Strict palette: black ink, off-white paper, crimson red (#e10600) only for the sun. Varied line weight, imperfect hand-inked lines, bold flat black fills, sparse hatching, screentone only in a few shadows. Asymmetric dynamic composition. No gradients, no 3D, no grey wash. No text, no letters, no numbers on the jersey, no logos, no face visible.
```
</details>

<details><summary>fin — cathédrale au coucher (node 5:10)</summary>

```
A hand-drawn seinen manga closing panel, wide format, drawn with a brush pen and G-pen nib by a human illustrator. The silhouette of Amiens gothic cathedral seen from far away across the rooftops of the city at dusk, small and placed in the lower right third, rendered as a solid flat black silhouette with a few white highlights. A huge rough crimson red ink sun setting low on the horizon just behind the cathedral spire, dry-brush with uneven edges and halftone texture. The upper two thirds and the left half are almost entirely empty off-white paper sky with only a few long horizontal brush strokes of cloud, leaving large calm space. Strict palette: black ink, off-white paper, crimson red (#e10600) only for the sun. Varied line weight, imperfect hand-inked lines, bold flat black fills, very sparse hatching. Quiet, contemplative, ending mood. No gradients, no 3D, no grey wash. No text, no letters, no logos.
```
</details>

Les nœuds Figma 1:x, 2:x et 3:2 sont des essais **rejetés** (personnage dessiné, rendu IA lisse, gravure d'architecture trop sage). Ne pas les réutiliser.

---

## 4. Storyboard final (budget ≈ 15 écrans de scroll)

Constantes : barre en haut = « R.H. » + **Mon CV** + **Sommaire** (accès direct à chaque planche) + fine barre rouge de progression. Sans JS ou avec `prefers-reduced-motion`, **tout s'affiche à plat, dans l'ordre, rien n'est perdu**.

| # | Scène | À l'écran | Info pro | Transition vers la suivante | Écrans |
|---|---|---|---|---|---|
| 00 | **Couverture** ✅ codée | Planche cathédrale dans une case encrée plein écran, soleil rouge derrière la flèche | « Volume 01 », **Rayane Halim**, cartouche : Étudiant data · BUT Informatique IUT d'Amiens · **Stage du 1er mars au 4 juin 2027** · SQL/PL/SQL/Python · boutons CV + Contact | L'illustration zoome à 1,25x max ; le **soleil SVG** grossit et couvre l'écran de rouge | 0,9 |
| 01 | **Le profil** ✅ codée (à valider) | Planche en 4 cases : couloir en contre-plongée (case A, soleil au bord), gros plan baie (B), insert des pas/ombre penché (C), case noire des chiffres (D) | Récitatifs : *Ce que je fais* / *Où j'en suis* / *Ce que je cherche* ; chiffres : **3** projets data menés en équipe · **3 mois** de stage (ISICOM) · **B2** anglais, arabe courant | Le soleil SVG rouge se **resserre** sur le soleil dessiné de la case A ; les cases se dévoilent une par une (épinglé) | 2,6 |
| 02 | **Ma main** (compétences) | Dos de carte au soleil rouge ; 4 cartes **tirées une par une du paquet** au scroll, chacune se retourne et s'agrandit plein écran avec son contenu, puis laisse place à la suivante ; Power BI reste à moitié sortie | Carte 01 **SQL** (requêtes, jointures, transactions ; PostgreSQL, SQLite) · 02 **PL/SQL** (triggers d'audit, procédures, règles métier) · 03 **Modéliser** (dictionnaire de données, MCD/MLD/MPD, 3NF, UML) · 04 **Python** (scripts, traitement de données, OCR, RAG) · 5e « à piocher en stage » : **Power BI & tableaux de bord** | La dernière carte s'aplatit et devient la case du premier projet | 3,5 |
| 03a | **GoCampus** | Planche voiture + étudiants + panneau (affiche vierge) | Cartouche progressif : titre, SAÉ · équipe de 4 · 2025-2026 · Responsable BDD ; *Ce que j'ai fait* ; stack ; résultat. **Capture réelle en HTML net** qui apparaît en fondu sur le panneau quand la caméra s'approche | Glissement latéral (page tournée) | 1,3 |
| 03b | **Planificateur d'événements** | Planche terrasse de café, téléphone vierge au premier plan | Idem ; capture réelle sur l'écran du téléphone | Glissement latéral | 1,3 |
| 03c | **Assistant Yu-Gi-Oh!** | Planche bureau, cartes, portable vierge | Idem ; capture réelle sur l'écran du portable | — | 1,3 |
| 03+ | **Autres projets** | Liste compacte, une ligne + lien chacun, sur papier | Plateforme de films (16 tables, PL/SQL) · Itinéraires ferroviaires (Dijkstra) · Checksum IP (C#) | — | 0,5 |
| 04 | **Le parcours** | Panorama `parcours` qui **défile horizontalement pendant le scroll vertical** ; un panneau gravé (HTML) se plante à chaque étape | 2021-2024 Bac NSI/SVT (lycée) · mars-juin 2024 cours particuliers (maisons) · janv.-mars 2026 ISICOM (bureau à antenne : VLAN, pfSense, UniFi, GLPI) · 2024-2027 BUT (campus) · **2027 Stage Data : votre équipe ?** en rouge (horizon) | La route mène au stade au crépuscule | 2 |
| 05 | **Hors des écrans** | Planche stade (tir, soleil couchant) | Bulle : FC Creil, en régional, « sur le terrain comme en projet, on ne gagne jamais seul » ; cartouche Photographie & montage | Le soleil descend vers l'horizon de la planche suivante | 1 |
| 06 | **Contact** | **Boucle** : la cathédrale (planche `fin`), le soleil rouge se **couche** derrière les infos de contact. **Pas d'aplat rouge uni.** | « Disponible du 1er mars au 4 juin 2027 » · boutons CV / M'écrire · mail, LinkedIn, GitHub, Creil/Amiens · permis B. Tout en bas, petit : « Fin du volume 01 » | — | 0,8 |

Total ≈ **15 écrans**. Ne pas dépasser.

**Positions utiles dans les sources (repère 1536×864 sauf mention)** :
- Soleil couverture : centre (1050, 265), rayon ≈ 280.
- Soleil case dc-a (recadrage 656×480) : centre (14, 245), rayon ≈ 100.
- Affiche GoCampus (quadrilatère TL, TR, BR, BL) : (1182,322) (1452,-70) (1508,498) (1203,694).
- Écran du téléphone (planif) : environ x 100→490, y 65→715, légèrement penché — **à mesurer précisément**.
- Écran du portable (yugioh) : environ (1170,180) (1505,188) (1440,455) (1150,400) — **à mesurer**.
- Soleil fin : centre ≈ (1224, 600), rayon ≈ 150. Soleil stade ≈ (810, 400) r ≈ 200. Soleil parcours (1792×768) ≈ (1683, 355) r ≈ 55. Soleil dos de carte (1024×1536) ≈ (512, 725) r ≈ 230.

---

## 5. Contenu (infos pro)

### Vérifié (CV de septembre 2026 + infos données par Rayane)
- **Rayane HALIM**, étudiant en **BUT Informatique, 3e année** (S5), parcours C « **Administration, gestion et exploitation des données** », **IUT d'Amiens**, 2024 → 2027.
- **Stage recherché** : Data / BI / bases de données, **du 1er mars au 4 juin 2027**. Il veut y apprendre **Power BI** (jamais utilisé, ne pas le présenter comme acquis).
- **Bac général**, spécialités **NSI & SVT**, Lycée Jules Uhry, Creil, 2021 → 2024.
- **Cours particuliers**, indépendant, Creil, mars → juin 2024 (suivi d'élèves, explication de notions, exercices ciblés, échanges avec les familles).
- **Stage ISICOM**, Nogent-sur-Oise, **janvier → mars 2026** (3 mois) : segmentation en VLAN, pfSense (interfaces VLAN, DHCP, règles de pare-feu), switches UniFi, tickets GLPI, interventions clients. Zabbix vu en stage.
- **Compétences** : SQL, PL/SQL, conception/modélisation (MCD, MLD, MPD, dictionnaire de données), PostgreSQL, SQLite, Python, C, C++, C#, HTML, CSS, Git/GitHub, Linux, UML, Figma, Photoshop.
- **Langues** : français (langue maternelle), anglais B2, arabe courant.
- **Permis B, véhiculé**. Basé à Creil, études à Amiens.
- **Passions** : football au **FC Creil** (compétition régionale), photographie & montage.
- **Contact** : rayanehalim677@gmail.com · LinkedIn https://www.linkedin.com/in/rayane-halim-6616b6383/ · GitHub https://github.com/Rayane-hlm · site https://rayane-hlm.github.io · téléphone 07 84 80 02 51 (sur le CV ; **ne pas l'afficher sur le site** sauf demande, risque de spam). Formulaire Formspree existant du site v1 : `https://formspree.io/f/meedkapb`.
- **CV** : `assets/CV_Rayane_HALIM.pdf` (version septembre 2026). Résumé du stage ISICOM : `assets/resume-stage-isicom.pdf`.
- **« 3 projets data menés en équipe »** = GoCampus (4), Planificateur (4), Plateforme de films (3). **Confirmé.**

### Projets
| Projet | Infos vérifiées | À confirmer par Rayane |
|---|---|---|
| **GoCampus** (covoiturage étudiant) | SAÉ, équipe de 4, oct. 2025 → janv. 2026, **responsable BDD** ; réservation dans une transaction qui verrouille le trajet (pas de surréservation) ; recherche des conducteurs à moins de 10 km via coordonnées GPS ; 5 écrans (accueil, recherche, proposer, mes annonces, mes réservations) | SGBD, langage back-end, front-end ; lien GitHub/démo |
| **Planificateur d'événements** (SAÉ S5) | Équipe de 4, **seul profil data**, administrateur de toute la base **PostgreSQL** ; dictionnaire de données + MCD ; modèle à **groupes permanents** contenant plusieurs événements ; fonctionnalités : sondages de dates, votes activités/lieux, courses partagées, partage des dépenses ; **en cours** | Date de début (« septembre 2026 » est une déduction) ; technos web de l'équipe ; contraintes/triggers/vues réalisés ; nombre de tables ; capture du MCD ou de l'appli |
| **Assistant Yu-Gi-Oh!** (perso) | Python ; **SQLite** source de vérité ; **OCR** des photos de cartes ; **RAG** sur le PDF de collection avec **Nomic Embed Text** ; en cours, construit brique par brique | Bibliothèque OCR (Tesseract ?), modèle de langage (Ollama ?), nb de cartes, exemple question → réponse, capture/GIF, lien GitHub |
| **Plateforme de films** (autres projets) | SAÉ, équipe de 3, oct. → nov. 2024 ; MCD → MLD → MPD ; normalisation **3NF** ; **triggers PL/SQL d'audit** (qui, quoi, quand) ; **16 tables** (comptées sur le MCD) ; plateforme multi-sites de location et vente de films | SGBD (Oracle ?) ; « mots de passe protégés par trigger » est une **déduction** de l'ancien texte |
| **Itinéraires ferroviaires** (autres projets) | Avril → juin 2025, équipe de 2 ; **Dijkstra** (exploration par durée croissante) ; réseau en **listes d'adjacence** ; trajet à travers la France en < 1 s ; la capture montre des **maquettes UX** | Langage utilisé |
| **Checksum IP** (autres projets) | SAÉ 2.03 (BUT1), **équipe de 6** ; calcul du checksum d'en-tête IP selon **RFC 791** depuis une saisie hexadécimale ; contrôle de saisie ; **C# / Windows Forms / Visual Studio** (vu sur le poster) | — |
| **Rover pathfinding** | Mentionné par Rayane : simulation de chemin optimal sur terrain avec obstacles (Python) | Est-ce un projet distinct de « Itinéraires ferroviaires » ? Le garder ou non ? |

**GitHub public** : ne contient que des exercices `Projet_dev_efficace*` (gestion de stock/colis en Python). **Aucun dépôt public pour les projets du portfolio → ne pas inventer de liens.**

**Captures existantes** (dans le repo, issues du site v1) : `assets/img/covoit-{accueil,recherche,annonces,proposer,reservations}-{640,1440}.webp`, `assets/img/bdd-modele-{1,2}-*.webp`, `assets/img/ferroviaire-graphe-*.webp`, `assets/img/checksum-{1,2}-*.webp`, `assets/img/isicom-{1,2,3}-*.webp`. **Pas de capture pour le Planificateur ni pour Yu-Gi-Oh** → à demander.

---

## 6. Règles apprises (ce que Rayane a refusé, et pourquoi)

### Direction et ton
1. **Pas de template générique** (look Tailwind par défaut, grilles de cartes blanches à fine bordure, dégradé bleu→indigo) : « déjà vu partout ».
2. **Pas de concept « terminal SQL / dashboard sombre »** : cliché du profil data.
3. **Pas de style enfantin** (ciel d'été anime, nuages en CSS, notes manuscrites, bouton jaune) : « c'est une blague ».
4. **Ne jamais dessiner Rayane** ni un personnage censé le représenter. Des **silhouettes génériques** sont acceptées seulement quand elles racontent le projet (ex. étudiants qui montent en voiture).
5. **Pas de kanji décoratifs**, pas de numérotation 一二三 : ça fait cosplay.
6. **Pas d'onomatopées** (BAM, ZZZT, CLAC…) et **pas de texte façon WordArt** (contour + ombre portée épaisse, « À suivre… » géant).
7. **Pas de faux témoignages** ni d'auto-évaluation gonflée (« Expert »). **Ne jamais inventer** une info, un chiffre ou un lien : si ce n'est pas vérifiable, retirer.
8. **Pas de contenu caché derrière un gadget** (ex. « maintenir pour piocher ») : l'info doit être accessible au scroll simple.
9. **Pas de « CV mis en page façon magazine »** : le contenu doit vivre dans des scènes plein écran, pas dans une grille de blocs. Mais **pas non plus** de grandes images plein écran sans mise en page : il faut la composition manga (cases, gouttières, inserts).

### Images
10. **Aucun texte dans les images générées** (lettres déformées = signature IA). Panneaux, écrans, cartes : **vierges**. Les vraies captures sont affichées **en HTML, nettes**, par-dessus, avec un fondu quand la caméra s'approche.
11. **Une seule planche test validée avant toute série** de générations ; annoncer le coût en crédits Figma.
12. **Hiérarchiser le détail** : sujet principal détaillé, fond en quelques traits, beaucoup de papier vide. Arbres variés (pas « en sucette »), soleil texturé (pas un cercle vectoriel lisse), composition asymétrique avec un premier plan fort, cadrage dramatique, personnages en mouvement si utile.
13. **Pas de personnage de dos au centre qui marche vers la lumière** (couloir symétrique) : cliché d'image générée. Varier : plongée, gros plan sur des mains/un écran, plan de côté.
14. **Vérifier la lisibilité des poses** (ex. sur GoCampus, l'étudiant de gauche est ambigu : monte-t-il ou marche-t-il ? accepté tel quel pour ne pas dépenser une génération).

### Animation et mise en page
15. **Jamais de zoom d'une illustration bitmap au-delà de 1,5-2x** (bouillie pixellisée). Pour plonger dans le soleil : **soleil SVG** ou masque en tache d'encre qui grossit et reste net.
16. **Mouvements réguliers** : pas d'accélération brutale (`power2.in` sur un gros zoom = effet de secousse). Préférer `none`, `sine.inOut`, `power1/2.out`, avec `scrub` ≈ 0,6-0,8.
17. **Jamais de texte semi-transparent** pendant une transition (« Le profil » illisible en fondu sur fond noir). Révéler par **balayage** (`clip-path`) ou par mouvement, pas par opacité intermédiaire sur un fond contrasté.
18. **Respecter le budget de scroll** (≈ 15 écrans au total). Un recruteur doit pouvoir arriver au contact.
19. **Texte ≥ 16 px partout** (récitatifs 17-19 px). **Boutons ≥ 48-50 px** de haut. Contraste **WCAG AA** (rouge texte `#b30400`, jamais `#e10600` pour du petit texte).
20. **Mobile** : pas de cadres blancs derrière chaque mot du nom ; nom et cartouche **sous** l'image sur le papier ; blocs de chiffres en clair sur noir lisibles ; la planche profil se lit de haut en bas (pas épinglée).
21. **Pas de barre en `mix-blend-mode: difference`** (devient turquoise sur le rouge).
22. **Fin** : pas d'aplat rouge uni ; l'histoire **boucle** sur la cathédrale, soleil couchant.

---

## 7. État d'avancement

### Fait et validé par Rayane
- Audit et refonte **v1** du site (en ligne, commit `ad6da3b`, poussé) : c'est le site actuel, **à ne pas toucher**.
- Direction artistique (gravure 3 encres), fil conducteur, storyboard, budget de 15 écrans.
- Planche test **GoCampus** (v2, node 4:2) et la consigne de style.
- Les 9 planches générées (nodes 5:2 à 5:10) → sources dans `v2/_sources/`.

### Fait, en attente de test par Rayane
- **Scène 00 (couverture) + scène 01 (profil)**, version corrigée du 24/11 dans `v2/`. Corrections déjà appliquées suite à ses retours :
  - plongée dans le soleil via **soleil SVG** (illustration ≤ 1,25x), mouvement régulier ;
  - profil recomposé en **4 cases manga** (plus de plein écran avec l'étudiant de dos) ;
  - durée réduite (~3,5 écrans) ;
  - récitatifs 17-19 px ; « Le profil » révélé par balayage ; boutons 50 px ; mobile sans cadres derrière le nom ; chiffres lisibles.
- **Points à vérifier en premier** (repérés mais pas encore corrigés) :
  - desktop : vers la fin de l'épinglage du profil, le titre « Le profil » passe **sous la barre du haut** quand la page se décroche ;
  - mobile : pendant le resserrement du soleil SVG, le rouge recouvre en partie les premières cases (normal en transition, mais à fluidifier) ;
  - le fichier `v2/main.js` contient encore des liens de sommaire « à venir » pour les scènes non codées.

### Reste à faire, dans l'ordre
1. Faire tester la scène 00+01 à Rayane, appliquer ses retours, **attendre sa validation**.
2. **Scène 02 · Ma main** (cartes) — préparer `card-back` et `card-face` avec `prep.py`, coder, faire valider.
3. **Scène 03 · Projets** (GoCampus, Planificateur, Yu-Gi-Oh) + **Autres projets** — overlays HTML des captures sur panneau/téléphone/portable (`transform: matrix3d` ou SVG `foreignObject`/`<image>` en perspective).
4. **Scène 04 · Parcours** (frise horizontale épinglée).
5. **Scène 05 · Hors des écrans** (stade).
6. **Scène 06 · Contact** (boucle cathédrale `fin`).
7. Passe finale : sommaire complet, SEO (title, description, Open Graph avec une image 1200×630 tirée de la couverture), accessibilité, Lighthouse ≥ 90 (mobile et desktop), test sans JS et en `prefers-reduced-motion`.
8. Nettoyage (voir § 8) puis, **sur accord explicite de Rayane**, remplacement du site en ligne par la v2.

---

## 8. Technique

### Structure
```
rayane-hlm.github.io/
├─ index.html, assets/, _dev/, robots.txt, sitemap.xml   ← SITE EN LIGNE (v1). NE PAS MODIFIER.
├─ assets/CV_Rayane_HALIM.pdf, assets/resume-stage-isicom.pdf, assets/img/*  ← utilisés aussi par la v2 (lien ../assets/)
└─ v2/                         ← TOUT le travail en cours se fait ici
   ├─ index.html               ← structure des scènes (+ SVG defs : #ink-edge, #ink-dots)
   ├─ style.css                ← variables, composants (cases, récitatifs, cartouche), mode .anim, mobile, reduced-motion
   ├─ main.js                  ← sommaire, progression, Lenis, timelines GSAP par scène (gsap.matchMedia desk/mob)
   ├─ vendor/                  ← gsap.min.js 3.12.5, ScrollTrigger.min.js 3.12.5, lenis.min.js 1.1.13 (auto-hébergés)
   ├─ fonts/                   ← Zen Old Mincho 700/900, Zen Kaku Gothic New 500/700 (latin, woff2)
   ├─ img/                     ← planches prêtes : <nom>-1536.{avif,webp} et <nom>-860.{avif,webp}, recadrages dc-a/b/c
   ├─ _sources/                ← PNG sources Figma 1536×864 (cover, datacenter, gocampus, planif, yugioh, stade, fin), 1024×1536 (card-back, card-face), 1792×768 (parcours)
   ├─ _outils/prep.py          ← script de préparation des images
   └─ src/                     ← dossier vide inutile → supprimer
```
Les dossiers commençant par `_` ne sont pas publiés par GitHub Pages (Jekyll).

### Librairies
- **GSAP + ScrollTrigger** (épinglage `pin`, `scrub`, `matchMedia`) et **Lenis** (défilement fluide, branché sur `ScrollTrigger.update` et `gsap.ticker`). Pas d'autre librairie sans raison forte.
- `html.anim` est ajouté par JS seulement si GSAP est chargé et que `prefers-reduced-motion` n'est pas actif. **Tout le CSS « caché avant animation » doit être sous `.anim`** pour que la version à plat reste complète.

### Images : `v2/_outils/prep.py`
- Dépendances : `pip install pillow numpy` (Pillow récent avec support AVIF).
- À lancer **depuis `v2/`** : `python _outils/prep.py cover fin planif yugioh stade card-back card-face parcours`
  - `tone()` : ramène l'image aux 3 encres (papier/encre, garde les rouges) ;
  - `save()` : écrit `img/<nom>-1536` et `img/<nom>-860` en **WebP** (q 80/76) et **AVIF** (q 58/52) ;
  - `gocampus` : ajoute sur l'affiche une trame légère + usure (sans texte) en perspective ;
  - `crops()` (appel manuel) : génère les recadrages `dc-a/b/c` du data center.
- Pour un portrait (cartes) ou le panorama, adapter les largeurs si besoin (ex. 1792 et 960 pour le parcours).
- HTML : `<picture>` avec `<source type="image/avif">` + `<img>` WebP, `srcset`/`sizes`, `width`/`height`, `loading="lazy"` sauf la couverture (`fetchpriority="high"` + preload AVIF).
- **À supprimer** : `v2/img/datacenter-*` (remplacés par `dc-a/b/c`) et le dossier vide `v2/src/`.

### Tester en local
```
cd rayane-hlm.github.io
python -m http.server 8000
```
puis ouvrir **http://localhost:8000/v2/** (le lien du CV pointe vers `../assets/`, il faut servir la racine du repo). Tester :
- **ordinateur** (1440×860) **et mobile** (390×844, outils dev du navigateur) ;
- **plusieurs positions de scroll** dans chaque scène (début, milieu, fin de chaque épinglage) — idéalement captures automatiques (Playwright) à 8-12 positions ;
- console sans erreur, pas de débordement horizontal (`scrollWidth === innerWidth`) ;
- `prefers-reduced-motion` activé et JS désactivé : tout le contenu visible.

### Règles de sécurité du repo
- **Ne jamais modifier le site en ligne hors de `v2/`** sans accord explicite.
- **Ne pas commit/push sans que Rayane le demande.** Il utilise GitHub Desktop ; le compte GitHub est `Rayane-hlm`.
- Sauvegarde de l'ancien site (avant v1) : `Documents\GitHub\portfolio-sauvegarde-2026-11-23` ; anciens fichiers : `Documents\GitHub\_anciens-fichiers-portfolio`.

---

## 9. Méthode de travail

1. **Une scène à la fois.** Coder la scène → la tester toi-même (desktop + mobile, plusieurs positions de scroll, captures) → la montrer à Rayane → **attendre sa validation** avant la suivante.
2. **Proposer un plan court avant un gros changement** ; pour une correction demandée, appliquer directement.
3. **Après chaque modification** : dire en quelques lignes ce qui a changé et dans quel fichier.
4. Avant de générer des images : planche test d'abord, annoncer le coût, prompts avec le bloc de style du § 3.
5. Être **franc** sur ce qui est faible ; ne pas surcorriger (garder ce qui est validé, corriger seulement ce qui est pointé).
6. Réponses en français, concises.
