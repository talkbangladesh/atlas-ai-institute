import { coalitionPortraits } from '../data/coalitionPortraits';
import { leadershipPortraits } from '../data/leadershipPortraits';

export interface ProfileGalleryItem {
  url: string;
  filename: string;
  caption?: string;
}

export interface ProfileMedia {
  portrait?: string;
  portraitAlt?: string;
  gallery: ProfileGalleryItem[];
}

const leadershipGlob = import.meta.glob<string>(
  '/src/assets-optimized/leadership/**/*.{jpg,jpeg,png,webp}',
  { eager: true, query: '?url', import: 'default' }
);

const coalitionGlob = import.meta.glob<string>(
  '/src/assets-optimized/coalition/**/*.{jpg,jpeg,png,webp}',
  { eager: true, query: '?url', import: 'default' }
);

function extractMediaFromGlob(
  globMap: Record<string, string>,
  prefix: string,
  captions?: Record<string, string>
): ProfileMedia {
  let portrait: string | undefined;
  let portraitAlt: string | undefined;
  const gallery: ProfileGalleryItem[] = [];

  for (const [assetPath, assetUrl] of Object.entries(globMap)) {
    if (!assetPath.startsWith(prefix)) continue;
    const relative = assetPath.slice(prefix.length);

    if (/^portrait\.(jpg|jpeg|png|webp)$/i.test(relative)) {
      portrait = assetUrl;
    } else if (/^portrait-alt\.(jpg|jpeg|png|webp)$/i.test(relative)) {
      portraitAlt = assetUrl;
    } else if (/^gallery\/[^/]+\.(jpg|jpeg|png|webp)$/i.test(relative)) {
      const filename = relative.slice('gallery/'.length);
      gallery.push({
        url: assetUrl,
        filename,
        caption: captions?.[filename],
      });
    }
  }

  gallery.sort((a, b) =>
    a.filename.localeCompare(b.filename, undefined, { numeric: true })
  );

  return { portrait, portraitAlt, gallery };
}

export function resolveLeadershipMedia(
  category: string,
  slug: string,
  captions?: Record<string, string>
): ProfileMedia {
  const prefix = `/src/assets-optimized/leadership/${category}/${slug}/`;
  const primary = extractMediaFromGlob(leadershipGlob, prefix, captions);
  const assignedPortrait = leadershipPortraits[`${category}/${slug}`];

  return assignedPortrait
    ? { ...primary, portrait: assignedPortrait }
    : primary;
}

export function resolveCoalitionMedia(
  slug: string,
  fallbackLeadershipCategory?: string,
  captions?: Record<string, string>
): ProfileMedia {
  const prefix = `/src/assets-optimized/coalition/${slug}/`;
  const primary = extractMediaFromGlob(coalitionGlob, prefix, captions);

  const assignedPortrait = coalitionPortraits[slug];
  if (assignedPortrait) {
    return { ...primary, portrait: assignedPortrait };
  }

  if (!primary.portrait && fallbackLeadershipCategory) {
    const fallback = resolveLeadershipMedia(
      fallbackLeadershipCategory,
      slug,
      captions
    );
    return {
      portrait: fallback.portrait,
      portraitAlt: primary.portraitAlt ?? fallback.portraitAlt,
      gallery: primary.gallery.length > 0 ? primary.gallery : fallback.gallery,
    };
  }

  return primary;
}

export function getMemberInitials(name: string): string {
  const cleaned = name
    .replace(/,\s*PhD$/i, '')
    .replace(/^(Dr\.|Prof\.)\s+/i, '')
    .trim();
  const parts = cleaned.split(/\s+/);
  if (parts.length === 0) return '';
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
}
