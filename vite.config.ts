import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';
import {defineConfig, type HtmlTagDescriptor} from 'vite';
import {generateSitemapXml} from './src/lib/sitemap';

function findHeaderLogoFile(brandLogoDir: string): string | undefined {
  for (const ext of ['svg', 'png', 'webp']) {
    const filename = `logo-horizontal.${ext}`;
    if (fs.existsSync(path.join(brandLogoDir, filename))) {
      return filename;
    }
  }
  return undefined;
}

export default defineConfig(() => {
  return {
    envPrefix: ['VITE_', 'NEXT_PUBLIC_'],
    plugins: [
      react(),
      tailwindcss(),
      {
        name: 'atlas-brand-head-assets',
        transformIndexHtml: {
          order: 'post',
          handler(html, ctx) {
            const publicDir = path.resolve(__dirname, 'public');
            const brandLogoDir = path.resolve(__dirname, 'src/assets/brand/logo');
            const tags: HtmlTagDescriptor[] = [];

            if (fs.existsSync(path.join(publicDir, 'favicon.svg'))) {
              tags.push({
                tag: 'link',
                attrs: {
                  rel: 'icon',
                  type: 'image/svg+xml',
                  href: '/favicon.svg',
                },
                injectTo: 'head',
              });
            } else if (fs.existsSync(path.join(publicDir, 'favicon.ico'))) {
              tags.push({
                tag: 'link',
                attrs: {
                  rel: 'icon',
                  href: '/favicon.ico',
                },
                injectTo: 'head',
              });
            }

            if (fs.existsSync(path.join(publicDir, 'apple-touch-icon.png'))) {
              tags.push({
                tag: 'link',
                attrs: {
                  rel: 'apple-touch-icon',
                  sizes: '180x180',
                  href: '/apple-touch-icon.png',
                },
                injectTo: 'head',
              });
            }

            if (fs.existsSync(path.join(publicDir, 'og-image.png'))) {
              tags.push(
                {
                  tag: 'meta',
                  attrs: {
                    property: 'og:image',
                    content: 'https://atlasai.institute/og-image.png',
                  },
                  injectTo: 'head',
                },
                {
                  tag: 'meta',
                  attrs: {
                    name: 'twitter:image',
                    content: 'https://atlasai.institute/og-image.png',
                  },
                  injectTo: 'head',
                }
              );
            }

            const headerLogoFile = findHeaderLogoFile(brandLogoDir);
            if (headerLogoFile) {
              let preloadHref: string | undefined;
              if (ctx.bundle) {
                for (const item of Object.values(ctx.bundle)) {
                  if (
                    item.type === 'asset' &&
                    (item.originalFileNames?.some((f) =>
                      f.endsWith(`/${headerLogoFile}`)
                    ) ||
                      item.names?.includes(headerLogoFile) ||
                      (item.fileName.startsWith('assets/logo-horizontal') &&
                        !item.fileName.includes('logo-horizontal-white')))
                  ) {
                    preloadHref = `/${item.fileName}`;
                    break;
                  }
                }
              } else {
                preloadHref = `/src/assets/brand/logo/${headerLogoFile}`;
              }

              if (preloadHref) {
                tags.push({
                  tag: 'link',
                  attrs: {
                    rel: 'preload',
                    as: 'image',
                    href: preloadHref,
                    fetchpriority: 'high',
                  },
                  injectTo: 'head',
                });
              }
            }

            let updatedHtml = html;
            if (fs.existsSync(path.join(publicDir, 'logo.png'))) {
              updatedHtml = html.replace(
                /(<script\s+type="application\/ld\+json">)([\s\S]*?)(<\/script>)/i,
                (fullMatch, openTag: string, jsonText: string, closeTag: string) => {
                  try {
                    const parsed = JSON.parse(jsonText) as {
                      '@graph'?: Array<Record<string, unknown>>;
                    };
                    if (Array.isArray(parsed['@graph'])) {
                      for (const node of parsed['@graph']) {
                        if (node['@type'] === 'Organization') {
                          node.logo = 'https://atlasai.institute/logo.png';
                        }
                      }
                      return `${openTag}\n${JSON.stringify(parsed, null, 2)}\n    ${closeTag}`;
                    }
                  } catch {
                    // Leave JSON-LD untouched if parsing fails
                  }
                  return fullMatch;
                }
              );
            }

            return {html: updatedHtml, tags};
          },
        },
      },
      {
        name: 'generate-atlas-sitemap',
        buildStart(): void {
          const publicDir = path.resolve(__dirname, 'public');
          if (!fs.existsSync(publicDir)) {
            fs.mkdirSync(publicDir, {recursive: true});
          }
          fs.writeFileSync(
            path.join(publicDir, 'sitemap.xml'),
            generateSitemapXml(),
            'utf8'
          );
        },
        closeBundle(error?: Error): void {
          if (error) {
            return;
          }
          const distDir = path.resolve(__dirname, 'dist');
          if (fs.existsSync(distDir)) {
            fs.writeFileSync(
              path.join(distDir, 'sitemap.xml'),
              generateSitemapXml(),
              'utf8'
            );
          }
        },
      },
      // Copies src/assets into dist/ so root-relative URLs like
      // "/src/assets/images/..." (e.g. generate_image output) still resolve
      // in production builds. Do not remove.
      {
        name: 'copy-unbundled-src-assets',
        apply: 'build',
        closeBundle(error?: Error): void {
          if (error) {
            return;
          }
          const distDir = path.resolve(__dirname, 'dist');
          const srcAssets = path.resolve(__dirname, 'src/assets');
          const distAssets = path.resolve(distDir, 'src/assets');
          if (fs.existsSync(distDir) && fs.existsSync(srcAssets)) {
            fs.cpSync(srcAssets, distAssets, {recursive: true, force: true});
          }
        },
      },
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
      // Allow the sandbox's HTTPS forwarding hostname without disabling host validation.
      allowedHosts: ['.manus.computer'],
    },
  };
});
