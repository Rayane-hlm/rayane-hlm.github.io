// Génère : 1) le sprite d'icônes Lucide dans index.html, 2) assets/css/style.css (Tailwind minifié).
// Usage : cd _dev && npm install && npm run build
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { execSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const here = dirname(fileURLToPath(import.meta.url));
const htmlPath = join(here, '..', 'index.html');
let html = readFileSync(htmlPath, 'utf8');

// 1. Sprite : uniquement les icônes utilisées (<use href="#i-nom">)
const names = [...new Set([...html.matchAll(/href="#i-([a-z0-9-]+)"/g)].map(m => m[1]))].sort();
const symbols = names.map(name => {
    const file = join(here, 'node_modules', 'lucide-static', 'icons', `${name}.svg`);
    if (!existsSync(file)) throw new Error(`Icône Lucide introuvable : ${name}`);
    const inner = readFileSync(file, 'utf8').replace(/<!--.*?-->/gs, '').replace(/^[\s\S]*?<svg[^>]*>/, '').replace(/<\/svg>\s*$/, '')
        .replace(/\s*\n\s*/g, '');
    return `<symbol id="i-${name}" viewBox="0 0 24 24">${inner}</symbol>`;
});
const sprite = `<svg xmlns="http://www.w3.org/2000/svg" style="display:none">${symbols.join('')}</svg>`;
html = html.replace(/<!-- SPRITE:START -->[\s\S]*?<!-- SPRITE:END -->/, `<!-- SPRITE:START -->\n${sprite}\n<!-- SPRITE:END -->`);
writeFileSync(htmlPath, html);
console.log(`Sprite : ${names.length} icônes`);

// 2. CSS
execSync('npx tailwindcss -c tailwind.config.js -i input.css -o ../assets/css/style.css --minify', { cwd: here, stdio: 'inherit' });
