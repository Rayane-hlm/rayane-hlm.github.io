# Outils du portfolio

Ce dossier n'est pas publié sur le site (GitHub Pages ignore les dossiers qui commencent par `_`).

## Après une modification de `index.html` ou `input.css`

```bash
cd _dev
npm install      # la première fois seulement
npm run build
```

Ça régénère :
- `assets/css/style.css` (Tailwind, uniquement les classes utilisées, minifié) ;
- le sprite d'icônes en haut de `index.html` (icônes Lucide utilisées via `<use href="#i-nom">`).

Ajouter une icône : écrire `<svg class="icon w-4 h-4" aria-hidden="true"><use href="#i-NOM"></use></svg>`
(NOM = nom sur https://lucide.dev), puis `npm run build`.

## Fichiers
- `input.css` : styles du site (source).
- `tailwind.config.js` : configuration Tailwind (thème par défaut).
- `build.mjs` : script de génération.
