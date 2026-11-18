import fs from 'node:fs/promises';
import path from 'node:path';
import { getPublicRoutePaths, getRouteSeo, escapeHtml, serializeJsonLd } from '../src/lib/routeSeo';

const projectRoot = path.resolve(import.meta.dirname, '..');
const distDir = path.join(projectRoot, 'dist');
const serverEntry = await import(path.join(projectRoot, 'dist-server/entry-server.js'));
const template = await fs.readFile(path.join(distDir, 'index.html'), 'utf8');

function cleanTemplate(html: string): string {
  return html
    .replace(/\s*<title>[\s\S]*?<\/title>/i, '')
    .replace(/\s*<meta\s+name="description"[^>]*>/i, '')
    .replace(/\s*<meta\s+name="robots"[^>]*>/i, '')
    .replace(/\s*<meta\s+property="og:[^"]+"[^>]*>/gi, '')
    .replace(/\s*<meta\s+name="twitter:[^"]+"[^>]*>/gi, '')
    .replace(/\s*<link\s+rel="canonical"[^>]*>/i, '')
    .replace(/\s*<script\s+type="application\/ld\+json">[\s\S]*?<\/script>/i, '');
}

function headFor(route: string): string {
  const seo = getRouteSeo(route);
  return [
    `<title>${escapeHtml(seo.title)}</title>`,
    `<meta name="description" content="${escapeHtml(seo.description)}" />`,
    `<meta name="robots" content="${escapeHtml(seo.robots)}" />`,
    `<link rel="canonical" href="${escapeHtml(seo.canonical)}" />`,
    `<meta property="og:title" content="${escapeHtml(seo.title)}" />`,
    `<meta property="og:description" content="${escapeHtml(seo.description)}" />`,
    `<meta property="og:type" content="${seo.type}" />`,
    `<meta property="og:url" content="${escapeHtml(seo.canonical)}" />`,
    `<meta property="og:site_name" content="Atlas AI Institute" />`,
    `<meta property="og:image" content="${escapeHtml(seo.image)}" />`,
    '<meta name="twitter:card" content="summary_large_image" />',
    `<meta name="twitter:title" content="${escapeHtml(seo.title)}" />`,
    `<meta name="twitter:description" content="${escapeHtml(seo.description)}" />`,
    `<meta name="twitter:image" content="${escapeHtml(seo.image)}" />`,
    `<script type="application/ld+json">${serializeJsonLd(seo.schema)}</script>`,
  ].join('\n    ');
}

async function writeRoute(route: string, html: string) {
  const outputDir = route === '/' ? distDir : path.join(distDir, route.replace(/^\//, '').replace(/\/$/, ''));
  await fs.mkdir(outputDir, { recursive: true });
  await fs.writeFile(path.join(outputDir, 'index.html'), html);
}

async function writeRedirect(route: string, target: string) {
  const outputDir = path.join(distDir, route.replace(/^\//, '').replace(/\/$/, ''));
  await fs.mkdir(outputDir, { recursive: true });
  const redirect = `<!doctype html><html lang="en"><head><meta charset="UTF-8"><meta http-equiv="refresh" content="0;url=${target}"><link rel="canonical" href="https://atlasai.institute${target}"><meta name="robots" content="noindex,follow"><title>Redirecting | Atlas AI Institute</title></head><body><p>Redirecting to <a href="${target}">${target}</a>.</p><script>location.replace(${JSON.stringify(target)});</script></body></html>`;
  await fs.writeFile(path.join(outputDir, 'index.html'), redirect);
}

const base = cleanTemplate(template);
for (const route of getPublicRoutePaths()) {
  const appHtml = await serverEntry.render(route);
  const document = base
    .replace('<head>', `<head>\n    ${headFor(route)}`)
    .replace('<div id="root"></div>', `<div id="root" data-prerendered="true">${appHtml}</div>`);
  await writeRoute(route, document);
}

await writeRedirect('/atlas-ai-governance/', '/research/');
await writeRedirect('/atlas-global-ai-dialogue/', '/#programmes');

const notFoundHtml = await serverEntry.render('/__not_found__');
const notFoundDocument = base
  .replace('<head>', `<head>\n    ${headFor('/__not_found__')}`)
  .replace('<div id="root"></div>', `<div id="root" data-prerendered="true">${notFoundHtml}</div>`);
await fs.writeFile(path.join(distDir, '404.html'), notFoundDocument);

console.log(`Prerendered ${getPublicRoutePaths().length} public routes plus 404.html`);
