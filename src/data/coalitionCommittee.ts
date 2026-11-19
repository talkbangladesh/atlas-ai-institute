export interface CoalitionCommitteeMember {
  index: string;
  slug: string;
  name: string;
  position: string;
  portfolio: string;
  intro: string;
  bio?: string[];
  focus?: string[];
  links?: { label: string; url: string }[];
  galleryCaptions?: Record<string, string>;
}

export const COALITION_PROFILE_LABELS = {
  breadcrumbCoalition: 'Coalition',
  breadcrumbCommittee: 'Founding Committee',
  sectionIndex: 'FOUNDING COMMITTEE',
  aboutHeading: 'About',
  focusHeading: 'Areas of focus',
  galleryHeading: 'Gallery',
  moreHeading: 'More committee members',
  previousLabel: 'Previous member',
  nextLabel: 'Next member',
  backLabel: 'Back to Founding Committee',
  officialSiteLabel: 'Visit Official Coalition Site',
  officialSiteUrl: 'https://coalition.atlasai.institute',
  atlasProfileLinkLabel: 'Atlas AI Institute profile',
  viewProfileLabel: 'View profile',
  opensNewTab: ' (opens in a new tab)',
} as const;

export const coalitionCommittee: readonly CoalitionCommitteeMember[] = [
  {
    index: '01',
    slug: 'gaborsoos',
    name: 'Gábor Soós, PhD',
    position: 'Co-Chair',
    portfolio: 'Strategic Leadership & International Cooperation',
    intro:
      "Provides strategic leadership and contributes to the Coalition's international direction, policy engagement, and collaborative development.",
  },
  {
    index: '02',
    slug: 'wafaaldaily',
    name: 'Wafa Al-Daily',
    position: 'Co-Chair',
    portfolio: 'MENA & Global South Diaspora',
    intro:
      "Contributes to the Coalition's regional and international engagement, with a focus on connecting MENA perspectives and Global South diaspora networks to AI governance dialogue.",
  },
  {
    index: '03',
    slug: 'douglasmbangmassom',
    name: 'Douglas Mbang Massom',
    position: 'Lead — Research Collaboration & Partnerships',
    portfolio: 'Research Collaboration & Partnerships',
    intro:
      "Contributes to the development of research collaboration, institutional partnerships, and opportunities for joint knowledge production across the Coalition's network.",
  },
  {
    index: '04',
    slug: 'ekaterinamatveeva',
    name: 'Ekaterina Matveeva',
    position: 'Lead — Youth, Multilingualism & Cultural AI Governance',
    portfolio: 'Youth, Multilingualism & Cultural AI Governance',
    intro:
      "Contributes to the Coalition's engagement with youth perspectives, multilingual participation, and cultural considerations in AI governance.",
  },
  {
    index: '05',
    slug: 'prettytegaedema',
    name: 'Pretty Tega Edema',
    position: 'Lead — AI Governance, Law & Rights',
    portfolio: 'AI Governance, Law & Rights',
    intro:
      'Contributes to policy discussions concerning AI governance, legal frameworks, rights-based approaches, and institutional accountability.',
  },
  {
    index: '06',
    slug: 'roobamoorghen',
    name: 'Rooba Moorghen',
    position: 'Lead — Public Policy & Institutional Implementation',
    portfolio: 'Public Policy & Institutional Implementation',
    intro:
      "Contributes to the Coalition's focus on public policy development, institutional readiness, and the practical implementation of AI governance approaches.",
  },
  {
    index: '07',
    slug: 'drjelinahaines',
    name: 'Dr. Jelina Haines',
    position: 'Lead — Indigenous Knowledge & Community Governance',
    portfolio: 'Indigenous Knowledge & Community Governance',
    intro:
      'Contributes to discussions on Indigenous knowledge, community perspectives, and the role of local knowledge systems in AI governance.',
  },
  {
    index: '08',
    slug: 'nafiulahmadrafi',
    name: 'Nafiul Ahmad Rafi',
    position: 'Chair, Convenor & Executive Director',
    portfolio: 'Executive Coordination & Institutional Development',
    intro:
      "Leads the Coalition's executive coordination, institutional development, strategic implementation, and collaboration with its institutional host and partners.",
  },
];

export function getCoalitionMemberBySlug(
  slug: string
): CoalitionCommitteeMember | undefined {
  return coalitionCommittee.find((m) => m.slug === slug);
}

export function getAdjacentCoalitionMembers(slug: string): {
  previous?: CoalitionCommitteeMember;
  next?: CoalitionCommitteeMember;
} {
  const idx = coalitionCommittee.findIndex((m) => m.slug === slug);
  if (idx === -1) return {};
  return {
    previous: idx > 0 ? coalitionCommittee[idx - 1] : undefined,
    next:
      idx < coalitionCommittee.length - 1
        ? coalitionCommittee[idx + 1]
        : undefined,
  };
}
