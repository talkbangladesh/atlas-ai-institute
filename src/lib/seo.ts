import { useEffect } from 'react';
import { getRouteSeo, serializeJsonLd } from './routeSeo';

export interface PersonSeoConfig {
  title: string;
  description: string;
  canonicalUrl: string;
  name: string;
  jobTitle: string;
  image?: string;
  sameAs?: string[];
  worksFor?: { '@id': string };
  memberOf?: { '@type': 'Organization'; name: string };
}

function toAbsoluteUrl(url: string): string {
  if (/^https?:\/\//i.test(url)) return url;
  const origin =
    typeof window !== 'undefined' && window.location.origin
      ? window.location.origin
      : 'https://atlasai.institute';
  return `${origin.replace(/\/$/, '')}${url.startsWith('/') ? url : `/${url}`}`;
}

function setMetaContent(
  selector: string,
  attrName: 'name' | 'property',
  attrValue: string,
  content: string,
): { created: boolean; prevContent: string | null } {
  let el = document.head.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attrName, attrValue);
    document.head.appendChild(el);
    return { created: true, prevContent: null };
  }
  const prevContent = el.content;
  el.content = content;
  return { created: false, prevContent };
}

export function useRouteSeo(pathname: string) {
  useEffect(() => {
    const config = getRouteSeo(pathname);
    document.title = config.title;
    const values: Array<[string, 'name' | 'property', string, string]> = [
      ['meta[name="description"]', 'name', 'description', config.description],
      ['meta[name="robots"]', 'name', 'robots', config.robots],
      ['meta[property="og:title"]', 'property', 'og:title', config.title],
      ['meta[property="og:description"]', 'property', 'og:description', config.description],
      ['meta[property="og:type"]', 'property', 'og:type', config.type],
      ['meta[property="og:url"]', 'property', 'og:url', config.canonical],
      ['meta[property="og:site_name"]', 'property', 'og:site_name', 'Atlas AI Institute'],
      ['meta[property="og:image"]', 'property', 'og:image', config.image],
      ['meta[name="twitter:card"]', 'name', 'twitter:card', 'summary_large_image'],
      ['meta[name="twitter:title"]', 'name', 'twitter:title', config.title],
      ['meta[name="twitter:description"]', 'name', 'twitter:description', config.description],
      ['meta[name="twitter:image"]', 'name', 'twitter:image', config.image],
    ];
    values.forEach(([selector, attrName, attrValue, content]) => setMetaContent(selector, attrName, attrValue, content));

    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = config.canonical;

    let schema = document.head.querySelector<HTMLScriptElement>('script[data-atlas-route-jsonld]');
    if (!schema) {
      schema = document.createElement('script');
      schema.type = 'application/ld+json';
      schema.dataset.atlasRouteJsonld = 'true';
      document.head.appendChild(schema);
    }
    schema.textContent = serializeJsonLd(config.schema);
  }, [pathname]);
}

export function usePersonSeo(config: PersonSeoConfig | null) {
  useEffect(() => {
    if (!config) return;

    const prevTitle = document.title;
    document.title = config.title;

    const descState = setMetaContent('meta[name="description"]', 'name', 'description', config.description);
    const ogTitleState = setMetaContent('meta[property="og:title"]', 'property', 'og:title', config.title);
    const ogDescState = setMetaContent('meta[property="og:description"]', 'property', 'og:description', config.description);
    const ogTypeState = setMetaContent('meta[property="og:type"]', 'property', 'og:type', 'profile');
    const ogUrlState = setMetaContent('meta[property="og:url"]', 'property', 'og:url', config.canonicalUrl);
    const twTitleState = setMetaContent('meta[name="twitter:title"]', 'name', 'twitter:title', config.title);
    const twDescState = setMetaContent('meta[name="twitter:description"]', 'name', 'twitter:description', config.description);

    const absoluteImage = config.image ? toAbsoluteUrl(config.image) : undefined;
    let ogImageEl = document.head.querySelector<HTMLMetaElement>('meta[property="og:image"]');
    let ogImageCreated = false;
    const prevOgImage = ogImageEl?.content ?? null;

    if (absoluteImage) {
      if (!ogImageEl) {
        ogImageEl = document.createElement('meta');
        ogImageEl.setAttribute('property', 'og:image');
        document.head.appendChild(ogImageEl);
        ogImageCreated = true;
      }
      ogImageEl.content = absoluteImage;
    }

    let canonicalEl = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    let canonicalCreated = false;
    const prevCanonicalHref = canonicalEl?.href ?? null;
    if (!canonicalEl) {
      canonicalEl = document.createElement('link');
      canonicalEl.rel = 'canonical';
      document.head.appendChild(canonicalEl);
      canonicalCreated = true;
    }
    canonicalEl.href = config.canonicalUrl;

    const jsonLd: Record<string, unknown> = {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: config.name,
      jobTitle: config.jobTitle,
      url: config.canonicalUrl,
    };
    if (absoluteImage) jsonLd.image = absoluteImage;
    if (config.sameAs?.length) jsonLd.sameAs = config.sameAs;
    if (config.worksFor) jsonLd.worksFor = config.worksFor;
    if (config.memberOf) jsonLd.memberOf = config.memberOf;

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.setAttribute('data-atlas-person-jsonld', 'true');
    script.textContent = JSON.stringify(jsonLd);
    document.head.appendChild(script);

    return () => {
      document.title = prevTitle;
      const restoreMeta = (selector: string, state: { created: boolean; prevContent: string | null }) => {
        const el = document.head.querySelector<HTMLMetaElement>(selector);
        if (!el) return;
        if (state.created) el.remove();
        else if (state.prevContent !== null) el.content = state.prevContent;
      };
      restoreMeta('meta[name="description"]', descState);
      restoreMeta('meta[property="og:title"]', ogTitleState);
      restoreMeta('meta[property="og:description"]', ogDescState);
      restoreMeta('meta[property="og:type"]', ogTypeState);
      restoreMeta('meta[property="og:url"]', ogUrlState);
      restoreMeta('meta[name="twitter:title"]', twTitleState);
      restoreMeta('meta[name="twitter:description"]', twDescState);
      if (ogImageEl) {
        if (ogImageCreated) ogImageEl.remove();
        else if (prevOgImage !== null) ogImageEl.content = prevOgImage;
      }
      if (canonicalEl) {
        if (canonicalCreated) canonicalEl.remove();
        else if (prevCanonicalHref !== null) canonicalEl.href = prevCanonicalHref;
      }
      script.remove();
    };
  }, [
    config?.title,
    config?.description,
    config?.canonicalUrl,
    config?.name,
    config?.jobTitle,
    config?.image,
    JSON.stringify(config?.sameAs ?? []),
    config?.worksFor?.['@id'],
    config?.memberOf?.name,
  ]);
}
