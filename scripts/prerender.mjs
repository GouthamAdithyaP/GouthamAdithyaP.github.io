// Renders the app to static HTML at build time so recruiters, search engines
// and link previews get full content instantly (better SEO and LCP).
import { readFileSync, writeFileSync, rmSync, readdirSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const template = readFileSync(resolve(root, 'dist/index.html'), 'utf8');
const { render } = await import(pathToFileURL(resolve(root, 'dist-ssr/entry-server.js')).href);
// Preload the Latin fonts used above the fold, so the hero paints in its final fonts without reflowing.
const assets = readdirSync(resolve(root, 'dist/assets'));
const fontPatterns = [/^inter-latin-wght-normal-.*\.woff2$/, /^jetbrains-mono-latin-wght-normal-.*\.woff2$/, /^instrument-serif-latin-400-italic-.*\.woff2$/];
const preload = fontPatterns
  .map((re) => assets.find((f) => re.test(f)))
  .filter(Boolean)
  .map((f) => `<link rel="preload" href="./assets/${f}" as="font" type="font/woff2" crossorigin />`)
  .join('\n    ') + '\n  ';
const html = template
  .replace('</head>', `${preload}</head>`)
  .replace('<!--app-html-->', render());
writeFileSync(resolve(root, 'dist/index.html'), html);
rmSync(resolve(root, 'dist-ssr'), { recursive: true, force: true });
console.log('Prerendered dist/index.html (' + Math.round(html.length / 1024) + ' KB)');
