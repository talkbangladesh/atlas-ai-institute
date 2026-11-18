export type LeadershipCategoryKey =
  | 'founder-director'
  | 'advisory-council'
  | 'advisers'
  | 'regional-coordinators'
  | 'country-representatives'
  | 'bangladesh-members';

export type Member = {
  slug: string;
  name: string;
  role: string;
  category: LeadershipCategoryKey;
  summary?: string;
  bio?: string[];
  focus?: string[];
  links?: { label: string; url: string }[];
  region?: string;
  country?: string;
  affiliation?: string;
  appointedNote?: string;
  confirmedMultiple?: boolean;
  galleryCaptions?: Record<string, string>;
};

export interface LeadershipCategoryConfig {
  key: LeadershipCategoryKey;
  id: LeadershipCategoryKey;
  shortIndex: string;
  index: string;
  title: string;
  groupBy?: 'region' | 'country';
  members: Member[];
}

export const LEADERSHIP_PAGE_META = {
  title: 'Leadership | Atlas AI Institute',
  eyebrow: 'LEADERSHIP',
  heading: 'The People Guiding Atlas AI Institute',
  intro:
    "Atlas AI Institute's work is guided by its institutional leadership and supported by its international advisory and research network.",
  anchorNavLabel: 'Leadership categories',
  emptyMessage:
    'Profiles for this category will be published here once approved.',
  viewProfileLabel: 'View profile',
  backToLeadershipLabel: 'Back to Leadership',
  coalitionProfileLinkLabel: 'Coalition committee profile',
  opensNewTab: ' (opens in a new tab)',
} as const;

export const founderDirector: Member[] = [
  {
    slug: 'nafiulahmadrafi',
    name: 'Nafiul Ahmad Rafi',
    role: 'Founding Director',
    category: 'founder-director',
    confirmedMultiple: true,
    links: [{ label: 'Personal website', url: 'https://nafiulahmadrafi.com' }],
  },
];

export const advisoryCouncil: Member[] = [
  {
    slug: 'nafiulahmadrafi',
    name: 'Nafiul Ahmad Rafi',
    role: 'Founder and Director of Atlas AI Institute',
    category: 'advisory-council',
    confirmedMultiple: true,
  },
  {
    slug: 'andrejmitic',
    name: 'Dr. Andrej Mitić',
    role: 'Board Member, International Advisory Council',
    category: 'advisory-council',
  },
  {
    slug: 'japmandeepahluwalia',
    name: 'Japmandeep Ahluwalia',
    role: 'Board Member, International Advisory Council',
    category: 'advisory-council',
  },
  {
    slug: 'dhurbagnawali',
    name: 'Dhurba Gnawali',
    role: 'Board Member, International Advisory Council',
    category: 'advisory-council',
  },
  {
    slug: 'oscarcariceorivera',
    name: 'Oscar Cariceo Rivera',
    role: 'Board Member, International Advisory Council',
    category: 'advisory-council',
  },
  {
    slug: 'isaackofimaafo',
    name: 'Isaac Kofi Maafo',
    role: 'Board Member, International Advisory Council',
    category: 'advisory-council',
  },
  {
    slug: 'romualdkiswendisidazongo',
    name: 'Romuald Kiswendisida ZONGO',
    role: 'Board Member, International Advisory Council',
    category: 'advisory-council',
  },
];

export const advisers: Member[] = [];

export const regionalCoordinators: Member[] = [];

export const countryRepresentatives: Member[] = [
  {
    slug: 'saminasaadia',
    name: 'Samina Saadia',
    role: 'Country Representative',
    category: 'country-representatives',
  },
  {
    slug: 'janakrajbhatta',
    name: 'Janak Raj Bhatta',
    role: 'Country Representative',
    category: 'country-representatives',
    country: 'Bangladesh',
  },
  {
    slug: 'shehzadahmad',
    name: 'Shehzad Ahmad',
    role: 'Country Representative',
    category: 'country-representatives',
    country: 'Sri Lanka',
  },
  {
    slug: 'francismugokangure',
    name: 'Dr. Francis Mugo Kangure',
    role: 'Country Representative',
    category: 'country-representatives',
    country: 'Malaysia',
  },
  {
    slug: 'dorothynahaabinangwala',
    name: 'Dorothy Nahaabi Nangwala',
    role: 'Country Representative',
    category: 'country-representatives',
    country: 'Indonesia',
  },
  {
    slug: 'aishatuusmanmuhammad',
    name: 'Dr. Aishatu Usman Muhammad',
    role: 'Country Representative',
    category: 'country-representatives',
    country: 'Japan',
  },
  {
    slug: 'surbhisethi',
    name: 'Dr. Surbhi Sethi',
    role: 'Country Representative',
    category: 'country-representatives',
    country: 'Canada',
  },
  {
    slug: 'rotimiowolabi',
    name: 'Rotimi Owolabi',
    role: 'Country Representative',
    category: 'country-representatives',
    country: 'Australia',
  },
  {
    slug: 'carolknox',
    name: 'Carol Knox',
    role: 'Country Representative',
    category: 'country-representatives',
    country: 'Australia',
  },
  {
    slug: 'wafulamashack',
    name: 'Wafula Mashack',
    role: 'Country Representative',
    category: 'country-representatives',
    country: 'Australia',
  },
  {
    slug: 'sylvestershingaichandalala',
    name: 'Sylvester Shingai Chandalala',
    role: 'Country Representative',
    category: 'country-representatives',
    country: 'Australia',
  },
  {
    slug: 'miraculedanielgavor',
    name: 'Miracule Daniel Gavor',
    role: 'Country Representative',
    category: 'country-representatives',
    country: 'Australia',
  },
  {
    slug: 'mathlatsidhambuza',
    name: 'Mathlatsi Dhambuza',
    role: 'Country Representative',
    category: 'country-representatives',
    country: 'Australia',
  },
  {
    slug: 'carldeutrademendes',
    name: 'Carl De Utra De Mendes',
    role: 'Country Representative',
    category: 'country-representatives',
    country: 'Australia',
  },
];

export const bangladeshMembers: Member[] = [];

export const LEADERSHIP_CATEGORIES: readonly LeadershipCategoryConfig[] = [
  {
    key: 'founder-director',
    id: 'founder-director',
    shortIndex: '01',
    index: '01 / FOUNDER & DIRECTOR',
    title: 'Founder & Director',
    members: founderDirector,
  },
  {
    key: 'advisory-council',
    id: 'advisory-council',
    shortIndex: '02',
    index: '02 / INTERNATIONAL ADVISORY COUNCIL',
    title: 'International Advisory Council',
    members: advisoryCouncil,
  },
  {
    key: 'advisers',
    id: 'advisers',
    shortIndex: '03',
    index: '03 / INTERNATIONAL ADVISERS',
    title: 'International Advisers',
    members: advisers,
  },
  {
    key: 'regional-coordinators',
    id: 'regional-coordinators',
    shortIndex: '04',
    index: '04 / REGIONAL COORDINATORS',
    title: 'Regional Coordinators',
    groupBy: 'region',
    members: regionalCoordinators,
  },
  {
    key: 'country-representatives',
    id: 'country-representatives',
    shortIndex: '05',
    index: '05 / COUNTRY REPRESENTATIVES',
    title: 'Country Representatives',
    groupBy: 'country',
    members: countryRepresentatives,
  },
  {
    key: 'bangladesh-members',
    id: 'bangladesh-members',
    shortIndex: '06',
    index: '06 / BANGLADESH MEMBERS',
    title: 'Bangladesh Members',
    members: bangladeshMembers,
  },
];

export function toMemberSlug(name: string): string {
  return name
    .replace(/\b(Dr\.?|Prof\.?|PhD|MD)\b/gi, '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '');
}

export function getAllLeadershipMembers(): Member[] {
  const seen = new Set<string>();
  const result: Member[] = [];

  for (const cat of LEADERSHIP_CATEGORIES) {
    for (const member of cat.members) {
      if (!seen.has(member.slug) || member.confirmedMultiple === true) {
        seen.add(member.slug);
        result.push(member);
      }
    }
  }

  return result;
}

export interface ResolvedLeadershipProfile {
  primary: Member;
  entries: Member[];
  primaryCategoryTitle: string;
}

export function getLeadershipProfileBySlug(
  slug: string
): ResolvedLeadershipProfile | undefined {
  const matches: Member[] = [];

  for (const cat of LEADERSHIP_CATEGORIES) {
    for (const member of cat.members) {
      if (member.slug === slug) {
        if (matches.length === 0) {
          matches.push(member);
        } else if (
          matches[0].confirmedMultiple === true &&
          member.confirmedMultiple === true
        ) {
          matches.push(member);
        }
      }
    }
  }

  if (matches.length === 0) return undefined;

  const primary = matches[0];
  const primaryCat = LEADERSHIP_CATEGORIES.find(
    (c) => c.key === primary.category
  );

  return {
    primary,
    entries: matches,
    primaryCategoryTitle: primaryCat?.title ?? '',
  };
}

export function getMoreInLeadershipCategory(
  categoryKey: LeadershipCategoryKey,
  excludeSlug: string,
  limit = 3
): Member[] {
  const cat = LEADERSHIP_CATEGORIES.find((c) => c.key === categoryKey);
  if (!cat) return [];
  const seen = new Set<string>([excludeSlug]);
  const results: Member[] = [];
  for (const member of cat.members) {
    if (!seen.has(member.slug)) {
      seen.add(member.slug);
      results.push(member);
      if (results.length >= limit) break;
    }
  }
  return results;
}

export function getConfirmedMultipleLeadershipCategory(
  slug: string
): LeadershipCategoryKey | undefined {
  for (const cat of LEADERSHIP_CATEGORIES) {
    const match = cat.members.find(
      (m) => m.slug === slug && m.confirmedMultiple === true
    );
    if (match) return match.category;
  }
  return undefined;
}
