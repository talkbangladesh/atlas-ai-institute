import { coalitionCommittee } from '../data/coalitionCommittee';
import { getAllLeadershipMembers } from '../data/leadership';

const SITE_ORIGIN = 'https://atlasai.institute';

const STATIC_ROUTES = [
  '/',
  '/opinion/',
  '/opinion/bd-national-ai-policy-committee/',
  '/about-atlas-ai-institute/',
  '/leadership/',
  '/research/',
  '/frameworks/',
  '/tools/',
  '/projects/',
  '/publications/',
  '/reports/',
  '/publication-development/',
  '/ai-for-good/',
  '/ai-policy-governance-education/',
  '/atlas-global-south-ai-policy-coalition/',
  '/insights/',
  '/careers/',
  '/partnerships/',
  '/contact/',
] as const;

export function getSitemapPaths(): string[] {
  const paths = new Set<string>(STATIC_ROUTES);

  for (const member of getAllLeadershipMembers()) {
    paths.add(`/leadership/${member.slug}/`);
  }

  for (const member of coalitionCommittee) {
    paths.add(`/atlas-global-south-ai-policy-coalition/committee/${member.slug}/`);
  }

  return Array.from(paths);
}

export function generateSitemapXml(): string {
  const urls = getSitemapPaths()
    .map(
      (routePath) =>
        `  <url>\n    <loc>${SITE_ORIGIN}${routePath}</loc>\n  </url>`
    )
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}
