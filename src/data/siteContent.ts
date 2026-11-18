export const SITE_META = {
  name: 'Atlas AI Institute',
  url: 'https://atlasai.institute/',
  email: 'contact@atlasai.institute',
  generalEmail: 'atlasaiinstitute@gmail.com',
  socialLinks: [
    {
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/company/atlas-ai-institute/',
    },
    {
      label: 'Atlas Global South AI Policy Coalition on LinkedIn',
      href: 'https://www.linkedin.com/showcase/atlas-global-south-ai-policy-coalition/',
    },
    {
      label: 'Facebook',
      href: 'https://www.facebook.com/share/1BwFTGHXVn/',
    },
    { label: 'X', href: 'https://x.com/atlasaii' },
  ],
  tagline: 'Research-led. Evidence-based. Internationally engaged.',
  copyright: '© 2026 Atlas AI Institute',
  founded: 'January 2024',
  location: 'Dhaka, Bangladesh',
} as const;

export const PUBLICATIONS_SUBMENU = [
  { label: 'Research', to: '/research/' },
  { label: 'Frameworks', to: '/frameworks/' },
  { label: 'Reports', to: '/reports/' },
] as const;

export const NAV_LINKS = [
  { label: 'About', to: '/about-atlas-ai-institute/' },
  { label: 'Leadership', to: '/leadership/' },
  { label: 'Publications', to: '/publications/', submenu: PUBLICATIONS_SUBMENU },
  { label: 'Insights', to: '/insights/' },
  { label: 'Contact', to: '/#contact' },
] as const;

export const HERO_CONTENT = {
  eyebrow: 'AI POLICY & GOVERNANCE RESEARCH INSTITUTE',
  title: 'Shaping Global AI Policy, Governance, and Trust',
  description:
    'Atlas AI Institute is an independent, evidence-led research institute focused on AI policy, governance, and institutional capacity. Through comparative research, governance intelligence, and policy framework development, Atlas examines how societies and institutions can respond to the opportunities and risks of artificial intelligence.',
  primaryCta: { label: 'Explore Publications', to: '/publications/' },
  secondaryCta: { label: 'Institutional Collaboration', to: '/#contact' },
  plate: {
    focus: [
      { index: '01', label: 'AI policy' },
      { index: '02', label: 'Governance' },
      { index: '03', label: 'Institutional capacity' },
    ],
    approach: [
      { index: '01', label: 'Comparative research' },
      { index: '02', label: 'Governance intelligence' },
      { index: '03', label: 'Policy framework development' },
    ],
  },
} as const;

export const ABOUT_CONTENT = {
  eyebrow: '02 / THE INSTITUTE',
  heading: 'Researching the Institutions Shaping the AI Era',
  description:
    'AI governance is becoming a defining institutional challenge of our time. Atlas conducts research and develops policy frameworks, governance intelligence, and public-interest initiatives to help institutions understand and respond to a changing AI landscape.',
  rows: [
    {
      index: '01',
      title: 'Who We Are',
      body: 'An independent, evidence-led AI policy and governance research institute working across research, institutional analysis, and public-interest innovation.',
    },
    {
      index: '02',
      title: 'Our Mission',
      body: 'To make policy evidence, governance intelligence, and institutional capacity easier to understand and act upon.',
    },
    {
      index: '03',
      title: 'Our Vision',
      body: 'Institutions that can respond to artificial intelligence with clarity, accountability, and public purpose.',
    },
    {
      index: '04',
      title: 'Research Philosophy',
      body: 'Research-led. Evidence-based. Internationally engaged.',
    },
  ],
} as const;

export const CAPABILITIES_CONTENT = {
  eyebrow: '03 / INSTITUTIONAL CAPABILITIES',
  heading: 'Evidence. Intelligence. Governance.',
  description:
    'Atlas works across the policy, institutional, and public-interest questions that shape how societies respond to artificial intelligence.',
  cards: [
    {
      index: '01',
      title: 'Research',
      description:
        'Comparative research on AI laws, regulatory approaches, institutional mandates, and public-sector governance capacity.',
      to: '/research/',
    },
    {
      index: '02',
      title: 'Frameworks',
      description:
        'Translating research evidence into practical governance concepts, responsibilities, and implementation pathways.',
      to: '/frameworks/',
    },
    {
      index: '03',
      title: 'Reports',
      description:
        'Institutional and research reports documenting AI policy and governance developments.',
      to: '/reports/',
    },
    {
      index: '04',
      title: 'Tools',
      description: 'Research and governance tools developed by Atlas.',
      to: '/tools/',
    },
    {
      index: '05',
      title: 'Projects',
      description:
        'Public-interest digital systems and governance infrastructure supporting information integrity and institutional capacity.',
      to: '/projects/',
    },
  ],
} as const;

export const INSTITUTIONAL_FIGURES = [
  { figure: '800K+', label: 'Research Data Points' },
  { figure: '20+', label: 'Policy Publications' },
  { figure: '6+', label: 'National AI Frameworks' },
  { figure: '106', label: 'Local Government Portals' },
  { figure: '50+', label: 'Countries Benchmarked' },
] as const;

export const FEATURED_PUBLICATION = {
  eyebrow: '04 / RESEARCH & PUBLICATIONS',
  heading: 'Knowledge for Better AI Governance',
  description:
    'An editorial selection of Atlas research, policy frameworks, and institutional reports.',
} as const;

export const PUBLICATION_DEVELOPMENT = {
  eyebrow: '05 / RESEARCH INFRASTRUCTURE',
  heading: 'From Research to Published Knowledge',
  description:
    'A clear editorial pathway for developing research into public knowledge. The sequence below describes a working system, not an accreditation or independent peer-review claim.',
  steps: [
    {
      index: '01',
      title: 'Research Concept & Submission',
      description:
        'Define the research question, evidence base, and intended contribution.',
    },
    {
      index: '02',
      title: 'Editorial Assessment',
      description:
        'Clarify scope, audience, format, and readiness for development.',
    },
    {
      index: '03',
      title: 'Research Development',
      description:
        'Develop analysis, structure, evidence, and supporting materials.',
    },
    {
      index: '04',
      title: 'Review & Quality Assurance',
      description:
        'Check logic, sources, consistency, and editorial quality.',
    },
    {
      index: '05',
      title: 'Editorial Finalisation',
      description:
        'Prepare the final text, design treatment, and publication record.',
    },
    {
      index: '06',
      title: 'Publication & Dissemination',
      description:
        'Publish the work and make its contribution accessible to its intended audience.',
    },
  ],
} as const;

export const PROGRAMMES_CONTENT = {
  eyebrow: '06 / LEARNING & DEVELOPMENT',
  heading: 'Developing Knowledge. Building Institutional Capacity.',
  description:
    'Atlas programmes connect research, policy dialogue, education, and public-interest practice.',
  cards: [
    {
      index: '01',
      title: 'AI for Good',
      description:
        'Initiatives exploring public-interest applications of artificial intelligence.',
      to: '/ai-for-good/',
    },
    {
      index: '02',
      title: 'AI Education',
      description:
        'Programmes supporting AI literacy and responsible technology use.',
      to: '/ai-policy-governance-education/',
    },
  ],
} as const;

export const COALITION_CONTENT = {
  eyebrow: '07 / INTERNATIONAL COOPERATION',
  officialName: 'ATLAS GLOBAL SOUTH AI POLICY COALITION',
  heading: 'Advancing International Cooperation on AI Governance',
  description:
    'The Atlas Global South AI Policy Coalition is an international collaboration among researchers, policy professionals, civil society organisations, institutions, and practitioners working on AI governance. It is a distinct collaboration initiative hosted by Atlas AI Institute.',
  focusAreasLabel: 'Focus areas',
  focusAreas: [
    { index: '01', title: 'International AI Policy Dialogue' },
    { index: '02', title: 'Research Collaboration' },
    { index: '03', title: 'Multistakeholder Engagement' },
    { index: '04', title: 'Policy Development' },
    { index: '05', title: 'Institutional Cooperation' },
  ],
  statusStrip: [
    'HOSTED BY ATLAS AI INSTITUTE',
    'DISTINCT COLLABORATION INITIATIVE',
    'NOT AN ATLAS DEPARTMENT',
  ],
  exploreLabel: 'Explore the Coalition',
  exploreTo: '/atlas-global-south-ai-policy-coalition/',
  membersLabel: 'Meet the Founding Committee',
  membersUrl: 'https://coalitionmembers.atlasai.institute/members',
} as const;

export const INSIGHTS_CONTENT = {
  eyebrow: '08 / KNOWLEDGE & PERSPECTIVES',
  heading: 'Latest Insights',
  description:
    'Recent research, policy analysis, publications, and institutional updates from Atlas AI Institute.',
  to: '/insights/',
} as const;

export const CONTACT_CONTENT = {
  eyebrow: '09 / ENGAGE WITH ATLAS',
  heading: "Let's Advance the Future of AI Governance.",
  description:
    'Atlas AI Institute welcomes engagement with research institutions, universities, governments, policymakers, international organisations, and development partners.',
  cards: [
    {
      index: '01',
      title: 'Research Collaboration',
      description:
        'Comparative analysis, academic exchange, and joint knowledge production.',
      buttonLabel: 'Start a conversation',
      to: '/contact/',
    },
    {
      index: '02',
      title: 'Institutional Partnerships',
      description:
        'International, civil-society, research, and technology partnerships.',
      buttonLabel: 'Discuss a partnership',
      to: '/partnerships/',
    },
    {
      index: '03',
      title: 'General Enquiries',
      description:
        'Questions about Atlas research, publications, programmes, and initiatives.',
      buttonLabel: 'Send an enquiry',
      to: '/contact/',
    },
  ],
  careersLink: {
    label: 'Careers',
    to: '/careers/',
  },
} as const;

export const LEADERSHIP_CONTENT = {
  eyebrow: 'INSTITUTIONAL LEADERSHIP',
  heading: 'Leadership',
  description:
    'Leadership guiding the research agenda, governance frameworks, and institutional collaborations of Atlas AI Institute.',
  founder: {
    name: 'Nafiul Ahmad Rafi',
    role: 'Founding Director',
    url: 'https://nafiulahmadrafi.com',
  },
} as const;
