import { coalitionCommittee, getCoalitionMemberBySlug } from '../data/coalitionCommittee';
import { getAllLeadershipMembers } from '../data/leadership';
import { frameworks, reports, research } from '../data/publications';
import { SITE_META } from '../data/siteContent';

export const SITE_ORIGIN = 'https://atlasai.institute';
export const DEFAULT_SOCIAL_IMAGE = `${SITE_ORIGIN}/assets-optimized/brand/logo/logo-mark.webp`;
const ORGANIZATION_ID = `${SITE_ORIGIN}/#org`;
const WEBSITE_ID = `${SITE_ORIGIN}/#site`;
const COALITION_ID = 'https://coalition.atlasai.institute/#org';
const AI_EDUCATION_ID = 'https://education.atlasai.institute/#organization';
const NAFIUL_PROFILE_URL = `${SITE_ORIGIN}/leadership/nafiulahmadrafi/`;
const NAFIUL_PERSON_ID = `${NAFIUL_PROFILE_URL}#person`;

export type RouteSeo = {
  title: string;
  description: string;
  canonical: string;
  type: 'website' | 'profile';
  robots: string;
  image: string;
  schema: Record<string, unknown>;
};

const routeCopy: Record<string, { title: string; description: string }> = {
  '/': {
    title: 'Atlas AI Institute | Global AI Policy, Governance & Trust',
    description:
      'Atlas AI Institute is an independent, evidence-led research institute focused on AI policy, governance, and institutional capacity.',
  },
  '/about-atlas-ai-institute/': {
    title: 'About Atlas AI Institute | AI Policy & Governance Research',
    description:
      'Learn about Atlas AI Institute, an independent research institute working across AI policy, governance intelligence, and institutional capacity.',
  },
  '/opinion/': {
    title: 'Public Opinion | Atlas AI Institute',
    description: 'Share your perspective on AI policy and governance issues with Atlas AI Institute.',
  },
  '/opinion/bd-national-ai-policy-committee/': {
    title: 'Bangladesh National AI Policy Consultation | Atlas AI Institute',
    description: 'Share feedback on Bangladesh's National AI Policy process through an independent public and stakeholder consultation.',
  },
  '/leadership/': {
    title: 'Leadership | Atlas AI Institute',
    description:
      'Meet the institutional leadership, advisory council, and international research network guiding Atlas AI Institute.',
  },
  '/research/': {
    title: 'Research | Atlas AI Institute',
    description:
      'Explore Atlas AI Institute research on AI governance, digital sovereignty, institutional capacity, information integrity, and public policy.',
  },
  '/frameworks/': {
    title: 'AI Governance Frameworks | Atlas AI Institute',
    description:
      'Browse Atlas AI Institute policy frameworks for national AI policy, thematic governance, digital sovereignty, and responsible innovation.',
  },
  '/tools/': {
    title: 'Tools | Atlas AI Institute',
    description:
      'Explore practical tools and governance resources developed by Atlas AI Institute for institutions working through the AI transition.',
  },
  '/projects/': {
    title: 'Projects | Atlas AI Institute',
    description:
      'Discover Atlas AI Institute projects connecting comparative research, governance intelligence, and public-interest AI policy.',
  },
  '/publications/': {
    title: 'Publications | Atlas AI Institute',
    description:
      'Read Atlas AI Institute publications, reports, policy frameworks, and research on AI governance and institutional change.',
  },
  '/reports/': {
    title: 'Reports & Policy Intelligence | Atlas AI Institute',
    description:
      'Access Atlas AI Institute reports and policy intelligence on AI governance, institutional resilience, and digital transformation.',
  },
  '/publication-development/': {
    title: 'Publication Development | Atlas AI Institute',
    description:
      'Learn how Atlas AI Institute develops evidence-led publications and policy research for an international audience.',
  },
  '/ai-for-good/': {
    title: 'AI for Good | Atlas AI Institute',
    description:
      'Explore Atlas AI Institute work on public-interest AI, responsible innovation, and institutions serving communities.',
  },
  '/ai-policy-governance-education/': {
    title:
      'Atlas AI Education: AI literacy and responsible AI programmes for everyone | Atlas AI Institute',
    description:
      'Practical, responsible AI learning for citizens, students, professionals and institutions, from Atlas AI Institute.',
  },
  '/atlas-global-south-ai-policy-coalition/': {
    title: 'Atlas Global South AI Policy Coalition | Atlas AI Institute',
    description:
      'Learn about the Atlas Global South AI Policy Coalition and its international network for inclusive AI policy and governance.',
  },
  '/insights/': {
    title: 'Insights | Atlas AI Institute',
    description:
      'Read Atlas AI Institute insights on emerging questions in AI policy, governance, digital sovereignty, and institutional trust.',
  },
  '/careers/': {
    title: 'Careers | Atlas AI Institute',
    description:
      'Learn about opportunities to work with Atlas AI Institute on evidence-led AI policy and governance research.',
  },
  '/partnerships/': {
    title: 'Partnerships | Atlas AI Institute',
    description:
      'Connect with Atlas AI Institute on research, institutional collaboration, and public-interest AI governance initiatives.',
  },
  '/contact/': {
    title: 'Contact | Atlas AI Institute',
    description:
      'Contact Atlas AI Institute about research, partnerships, institutional collaboration, and public-interest AI governance.',
  },
};

function normalizePath(pathname: string): string {
  const path = pathname.split('?')[0].split('#')[0].replace(/\/{2,}/g, '/');
  if (path === '/') return '/';
  return `${path.replace(/\/+$/, '')}/`;
}

function organizationSchema() {
  return {
    '@type': 'Organization',
    '@id': ORGANIZATION_ID,
    name: SITE_META.name,
    url: SITE_META.url,
    logo: DEFAULT_SOCIAL_IMAGE,
    description: 'Independent, evidence-led AI policy and governance research institute.',
    foundingDate: '2024',
    founder: { '@id': NAFIUL_PERSON_ID },
    address: { '@type': 'PostalAddress', addressLocality: 'Dhaka', addressCountry: 'BD' },
    email: SITE_META.email,
    sameAs: SITE_META.socialLinks
      .filter((social) =>
        !social.label.toLowerCase().includes('coalition') && !social.href.includes('/share/'),
      )
      .map((social) => social.href),
  };
}

function founderPersonSchema(memberOfCoalition = false) {
  return {
    '@type': 'Person',
    '@id': NAFIUL_PERSON_ID,
    name: 'Nafiul Ahmad Rafi',
    jobTitle: 'Founding Director',
    url: NAFIUL_PROFILE_URL,
    sameAs: ['https://nafiulahmadrafi.com'],
    worksFor: { '@id': ORGANIZATION_ID },
    ...(memberOfCoalition ? { memberOf: { '@id': COALITION_ID } } : {}),
  };
}

function coalitionSchema() {
  const coalitionSocial = SITE_META.socialLinks.find((social) =>
    social.label.toLowerCase().includes('coalition'),
  );
  return {
    '@type': 'Organization',
    '@id': COALITION_ID,
    name: 'Atlas Global South AI Policy Coalition',
    url: 'https://coalition.atlasai.institute',
    description:
      'An international collaboration among researchers, policy professionals, civil society organisations, institutions, and practitioners working on AI governance.',
    ...(coalitionSocial ? { sameAs: [coalitionSocial.href] } : {}),
  };
}

function aiEducationSchema() {
  return {
    '@type': 'EducationalOrganization',
    '@id': AI_EDUCATION_ID,
    name: 'Atlas AI Education',
    url: 'https://education.atlasai.institute',
    description:
      'Practical, responsible AI learning for citizens, students, professionals and institutions, from Atlas AI Institute.',
    parentOrganization: { '@id': ORGANIZATION_ID },
  };
}

function publicationListSchema(pathname: string) {
  const normalized = normalizePath(pathname);
  const entries = normalized === '/research/'
    ? research.map((publication) => ({ ...publication, schemaType: 'CreativeWork' }))
    : normalized === '/frameworks/'
      ? frameworks.map((publication) => ({ ...publication, schemaType: 'CreativeWork' }))
      : normalized === '/reports/'
        ? reports.map((publication) => ({ ...publication, schemaType: 'Report' }))
        : normalized === '/publications/'
          ? [
              ...research.map((publication) => ({ ...publication, schemaType: 'CreativeWork' })),
              ...frameworks.map((publication) => ({ ...publication, schemaType: 'CreativeWork' })),
              ...reports.map((publication) => ({ ...publication, schemaType: 'Report' })),
            ]
          : [];

  if (!entries.length) return undefined;

  const sortedEntries = [...entries].sort((a, b) => {
    const dateA = 'publishedIso' in a ? a.publishedIso ?? String(a.year) : String(a.year);
    const dateB = 'publishedIso' in b ? b.publishedIso ?? String(b.year) : String(b.year);
    return dateB.localeCompare(dateA);
  });

  return {
    '@type': 'ItemList',
    '@id': `${SITE_ORIGIN}${normalized}#publication-list`,
    name: normalized === '/research/' ? 'Research publications'
      : normalized === '/frameworks/' ? 'Policy frameworks'
        : normalized === '/reports/' ? 'Reports'
          : 'Research, frameworks, and reports',
    itemListOrder: 'https://schema.org/ItemListOrderDescending',
    numberOfItems: sortedEntries.length,
    itemListElement: sortedEntries.map((entry, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': entry.schemaType,
        '@id': entry.url,
        url: entry.url,
        name: entry.title,
        ...(entry.publishedIso
          ? { datePublished: /^\d{4}-\d{2}-\d{2}$/.test(entry.publishedIso) ? entry.publishedIso : String(entry.year) }
          : { datePublished: String(entry.year) }),
        ...(('author' in entry && entry.author && !/[,&]|\band\b/i.test(entry.author))
          ? { author: { '@type': 'Person', name: entry.author } }
          : ('authors' in entry && entry.authors && !/[,&]|\band\b/i.test(entry.authors)
            ? { author: { '@type': 'Person', name: entry.authors } }
            : {})),
        ...('publisher' in entry && entry.publisher === SITE_META.name
          ? { publisher: { '@id': ORGANIZATION_ID } }
          : {}),
      },
    })),
  };
}

function breadcrumbSchema(canonical: string, title: string) {
  const path = new URL(canonical).pathname;
  const segments = path.split('/').filter(Boolean);
  const items = [{ name: 'Atlas AI Institute', item: `${SITE_ORIGIN}/` }];
  let current = '';
  segments.forEach((segment) => {
    current += `/${segment}`;
    items.push({ name: segment.replace(/-/g, ' '), item: `${SITE_ORIGIN}${current}/` });
  });
  if (items.length > 1) items[items.length - 1].name = title.split('|')[0].trim();
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({ '@type': 'ListItem', position: index + 1, name: item.name, item: item.item })),
  };
}

export function getRouteSeo(pathname: string): RouteSeo {
  const normalized = normalizePath(pathname);
  const leadershipMatch = normalized.match(/^\/leadership\/([^/]+)\/$/);
  const committeeMatch = normalized.match(/^\/atlas-global-south-ai-policy-coalition\/committee\/([^/]+)\/$/);
  const leadershipMember = leadershipMatch ? getAllLeadershipMembers().find((member) => member.slug === leadershipMatch[1]) : undefined;
  const committeeMember = committeeMatch ? getCoalitionMemberBySlug(committeeMatch[1]) : undefined;

  let copy = routeCopy[normalized];
  let type: RouteSeo['type'] = 'website';
  let person: {
    id: string;
    name: string;
    role: string;
    relationship: 'institute' | 'coalition';
    sameAs?: string[];
  } | undefined;

  if (leadershipMember) {
    copy = {
      title: `${leadershipMember.name} | Leadership | Atlas AI Institute`,
      description: leadershipMember.summary ?? `${leadershipMember.name} — ${leadershipMember.role} at Atlas AI Institute.`,
    };
    type = 'profile';
    person = {
      id: leadershipMember.slug === 'nafiulahmadrafi'
        ? NAFIUL_PERSON_ID
        : `${SITE_ORIGIN}/leadership/${leadershipMember.slug}/#person`,
      name: leadershipMember.name,
      role: leadershipMember.role,
      relationship: 'institute',
      sameAs: leadershipMember.links?.map((link) => link.url),
    };
  } else if (committeeMember) {
    copy = {
      title: `${committeeMember.name} | Coalition Committee | Atlas AI Institute`,
      description: committeeMember.intro,
    };
    type = 'profile';
    const leadershipIdentity = getAllLeadershipMembers().find(
      (member) => member.slug === committeeMember.slug,
    );
    person = {
      id: leadershipIdentity
        ? leadershipIdentity.slug === 'nafiulahmadrafi'
          ? NAFIUL_PERSON_ID
          : `${SITE_ORIGIN}/leadership/${leadershipIdentity.slug}/#person`
        : `${SITE_ORIGIN}/atlas-global-south-ai-policy-coalition/committee/${committeeMember.slug}/#person`,
      name: committeeMember.name,
      role: committeeMember.position,
      relationship: 'coalition',
      sameAs: committeeMember.links?.map((link) => link.url),
    };
  }

  const isKnown = Boolean(copy);
  const title = copy?.title ?? 'Page not found | Atlas AI Institute';
  const description = copy?.description ?? 'The requested Atlas AI Institute page could not be found.';
  const canonical = isKnown ? `${SITE_ORIGIN}${normalized}` : `${SITE_ORIGIN}/404.html`;
  const isCoalitionRoute = normalized === '/atlas-global-south-ai-policy-coalition/' || Boolean(committeeMember);
  const isAiEducationRoute = normalized === '/ai-policy-governance-education/';
  const publicationList = isKnown ? publicationListSchema(normalized) : undefined;
  const pageEntityId = `${canonical}#webpage`;
  const mainEntityId =
    person?.id ??
    (isCoalitionRoute
      ? COALITION_ID
      : isAiEducationRoute
        ? AI_EDUCATION_ID
        : ORGANIZATION_ID);
  const graph: Record<string, unknown>[] = [
    organizationSchema(),
    founderPersonSchema(Boolean(committeeMember?.slug === 'nafiulahmadrafi')),
    {
      '@type': 'WebSite',
      '@id': WEBSITE_ID,
      url: SITE_ORIGIN,
      name: SITE_META.name,
      inLanguage: 'en',
      publisher: { '@id': ORGANIZATION_ID },
    },
  ];

  if (isCoalitionRoute) graph.push(coalitionSchema());
  if (isAiEducationRoute) graph.push(aiEducationSchema());

  graph.push({
    '@type': type === 'profile' ? 'ProfilePage' : 'WebPage',
    '@id': pageEntityId,
    url: canonical,
    name: title,
    description,
    isPartOf: { '@id': WEBSITE_ID },
    publisher: { '@id': ORGANIZATION_ID },
    about: { '@id': mainEntityId },
    ...(person ? { mainEntity: { '@id': person.id } } : {}),
    ...(isAiEducationRoute ? { mainEntity: { '@id': AI_EDUCATION_ID } } : {}),
    ...(publicationList ? { mainEntity: { '@id': publicationList['@id'] } } : {}),
    breadcrumb: breadcrumbSchema(canonical, title),
  });

  if (publicationList) graph.push(publicationList);

  if (person && person.id !== NAFIUL_PERSON_ID) {
    graph.push({
      '@type': 'Person',
      '@id': person.id,
      name: person.name,
      jobTitle: person.role,
      url: person.id.replace(/#person$/, ''),
      ...(person.relationship === 'institute'
        ? { affiliation: { '@id': ORGANIZATION_ID } }
        : { memberOf: { '@id': COALITION_ID } }),
      ...(person.sameAs?.length ? { sameAs: person.sameAs } : {}),
    });
  }

  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@graph': graph,
  };

  return {
    title,
    description,
    canonical,
    type,
    robots: isKnown ? 'index, follow' : 'noindex, follow',
    image: DEFAULT_SOCIAL_IMAGE,
    schema,
  };
}

export function getPublicRoutePaths(): string[] {
  const staticPaths = Object.keys(routeCopy);
  const leadershipPaths = getAllLeadershipMembers().map((member) => `/leadership/${member.slug}/`);
  const committeePaths = coalitionCommittee.map(
    (member) => `/atlas-global-south-ai-policy-coalition/committee/${member.slug}/`,
  );
  return Array.from(new Set([...staticPaths, ...leadershipPaths, ...committeePaths]));
}

export function serializeJsonLd(value: unknown): string {
  return JSON.stringify(value).replace(/</g, '\\u003c');
}

export function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[character] ?? character));
}
