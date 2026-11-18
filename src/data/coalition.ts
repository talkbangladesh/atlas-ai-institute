export const COALITION_META = {
  title: 'Atlas Global South AI Policy Coalition | Atlas AI Institute',
  description:
    'The Atlas Global South AI Policy Coalition is an international collaborative initiative bringing together researchers, policy professionals, civil society leaders, institutions, and practitioners to strengthen cooperation on artificial intelligence governance.',
} as const;

export const COALITION_SUBNAV = [
  { label: 'About', id: 'about', matchIds: ['about', 'why'] },
  { label: 'Vision & Mission', id: 'vision', matchIds: ['vision', 'mission'] },
  { label: 'Focus Areas', id: 'focus', matchIds: ['focus'] },
  { label: 'Founding Committee', id: 'committee', matchIds: ['committee'] },
  { label: 'Host', id: 'host', matchIds: ['host', 'structure'] },
  { label: 'Membership', id: 'membership', matchIds: ['membership'] },
  { label: 'Collaboration', id: 'collaboration', matchIds: ['collaboration'] },
  { label: 'Updates', id: 'updates', matchIds: ['updates'] },
  { label: 'Contact', id: 'contact', matchIds: ['final', 'contact'] },
] as const;

export const COALITION_HERO = {
  eyebrow: 'INTERNATIONAL AI POLICY COLLABORATION',
  heading: 'Advancing AI Governance Through International Cooperation',
  paragraphs: [
    'The Atlas Global South AI Policy Coalition is an international collaborative initiative bringing together researchers, policy professionals, civil society leaders, institutions, and practitioners to strengthen cooperation on artificial intelligence governance.',
    'The Coalition works to connect policy knowledge, institutional experience, research expertise, and diverse perspectives to address the opportunities and challenges of AI across countries and communities.',
    'Through collaborative research, policy dialogue, institutional engagement, and knowledge exchange, the Coalition seeks to contribute to more inclusive, accountable, and effective approaches to AI governance.',
  ],
  plateLabel: 'INITIATIVE STATUS',
  plateLines: [
    'Hosted by Atlas AI Institute',
    'Distinct collaborative initiative',
  ],
  actions: {
    primary: { label: 'Explore Our Founding Committee', href: '#committee' },
    collaboration: {
      label: 'Express Your Interest in Collaboration',
      href: '#collaboration',
    },
    membership: {
      label: 'Apply for Membership',
      href: 'https://coalition.atlasai.institute/membership',
    },
    officialSite: {
      label: 'Visit Official Coalition Site',
      href: 'https://coalition.atlasai.institute',
    },
  },
} as const;

export const COALITION_ABOUT = {
  id: 'about',
  sectionIndex: '02 / ABOUT THE COALITION',
  eyebrow: 'WHO WE ARE',
  heading: 'A Collaborative Platform for International AI Governance',
  paragraphs: [
    'Artificial intelligence is transforming economies, public institutions, societies, and international relations. Its governance requires more than isolated national responses. It requires international cooperation, shared knowledge, institutional dialogue, and meaningful participation from diverse policy environments.',
    'The Atlas Global South AI Policy Coalition provides a collaborative platform for people and institutions working to advance AI governance through research, policy engagement, and international cooperation.',
    'The Coalition brings together different professional perspectives and areas of expertise to examine emerging AI policy challenges, strengthen institutional understanding, and encourage practical collaboration.',
    'It is designed to facilitate connections between research and policymaking, international dialogue and local realities, and governance principles and institutional implementation.',
    'The Coalition is a distinct collaborative initiative hosted by Atlas AI Institute. It maintains its own collaborative identity, founding committee, and programme of engagement.',
  ],
} as const;

export const COALITION_WHY = {
  id: 'why',
  sectionIndex: '03 / WHY THE COALITION MATTERS',
  eyebrow: 'THE CASE FOR COOPERATION',
  heading: 'AI Governance Requires a Broader International Conversation',
  paragraphs: [
    'AI technologies increasingly influence decisions and systems that extend beyond national borders. Yet the capacity to research, regulate, and govern these technologies remains uneven across countries and institutions.',
    'International AI governance discussions need broader participation, stronger research collaboration, and more opportunities for institutions and policy professionals to exchange knowledge.',
    'The Coalition seeks to contribute to this effort through five interconnected priorities.',
  ],
  priorities: [
    {
      index: '01',
      title: 'Diverse Policy Perspectives',
      description:
        'Encouraging participation from different countries, institutional environments, research communities, and professional backgrounds.',
    },
    {
      index: '02',
      title: 'Research Collaboration',
      description:
        'Connecting researchers and policy professionals to develop shared knowledge and collaborative research initiatives.',
    },
    {
      index: '03',
      title: 'Institutional Capacity',
      description:
        'Supporting dialogue on the institutional capabilities, governance arrangements, and implementation mechanisms required for responsible AI.',
    },
    {
      index: '04',
      title: 'Meaningful Representation',
      description:
        'Creating opportunities for different regional, professional, cultural, and community perspectives to contribute to AI governance discussions.',
    },
    {
      index: '05',
      title: 'International Cooperation',
      description:
        'Encouraging constructive engagement among institutions, policymakers, researchers, civil society organisations, and practitioners.',
    },
  ],
} as const;

export const COALITION_VISION = {
  id: 'vision',
  sectionIndex: '04 / OUR VISION',
  eyebrow: 'VISION',
  heading: 'A More Inclusive and Cooperative AI Governance Landscape',
  statement:
    'We envision an international AI governance environment in which diverse countries, institutions, research communities, and stakeholders can meaningfully contribute to shaping the future of artificial intelligence.',
  paragraphs: [
    'A landscape where policy knowledge is shared, institutional capacity is strengthened, governance approaches are informed by evidence, and international cooperation reflects the diversity of societies affected by AI.',
    'The Coalition seeks to help build connections and collaborative opportunities that advance this vision.',
  ],
} as const;

export const COALITION_MISSION = {
  id: 'mission',
  sectionIndex: '05 / OUR MISSION',
  eyebrow: 'MISSION',
  heading: 'Connecting People, Research, and Institutions for Better AI Governance',
  lead: 'The mission of the Atlas Global South AI Policy Coalition is to strengthen international cooperation on AI policy and governance through collaborative research, multistakeholder engagement, policy dialogue, and institutional knowledge exchange.',
  listHeading: 'We aim to:',
  items: [
    'Facilitate international dialogue on emerging AI governance challenges.',
    'Encourage collaborative research among policy professionals, researchers, and institutions.',
    'Promote meaningful participation in international AI policy discussions.',
    'Exchange knowledge on AI regulation, institutional readiness, and governance implementation.',
    'Support engagement on responsible AI, accountability, safety, and public-interest considerations.',
    'Develop opportunities for institutional cooperation and joint policy initiatives.',
    'Connect regional experiences with international AI governance discussions.',
  ],
} as const;

export const COALITION_FOCUS_AREAS = {
  id: 'focus',
  sectionIndex: '06 / STRATEGIC FOCUS AREAS',
  eyebrow: 'WHAT WE WORK ON',
  heading: 'Five Areas of Collective Action',
  engagementLabel: 'Areas of engagement',
  areas: [
    {
      index: '01',
      title: 'International AI Policy Dialogue',
      description:
        'Facilitating conversations among researchers, policymakers, institutions, civil society organisations, and practitioners on emerging AI governance developments.',
      engagements: [
        'International AI policy developments.',
        'Regulatory approaches and governance models.',
        'AI sovereignty and institutional readiness.',
        'Responsible AI and global governance debates.',
        'Cross-regional policy exchange.',
      ],
    },
    {
      index: '02',
      title: 'Research Collaboration',
      description:
        'Encouraging collaborative research and knowledge production on AI governance and its institutional implications.',
      engagements: [
        'Comparative AI policy research.',
        'Collaborative research publications.',
        'AI governance frameworks.',
        'Institutional and regulatory assessments.',
        'Cross-country research initiatives.',
      ],
    },
    {
      index: '03',
      title: 'Multistakeholder Engagement',
      description:
        'Connecting different stakeholder communities to broaden participation in AI governance discussions.',
      engagements: [
        'Research institutions and universities.',
        'Government and public policy professionals.',
        'Civil society organisations.',
        'Technology and AI practitioners.',
        'Youth, experts, and community representatives.',
      ],
    },
    {
      index: '04',
      title: 'Policy Development',
      description:
        'Supporting evidence-informed discussions and contributions to AI policy and governance approaches.',
      engagements: [
        'AI governance policy recommendations.',
        'Institutional governance models.',
        'Regulatory and accountability approaches.',
        'Policy implementation considerations.',
        'Responsible AI governance principles.',
      ],
    },
    {
      index: '05',
      title: 'Institutional Cooperation',
      description:
        'Building relationships and collaborative opportunities among organisations working on AI policy, research, and governance.',
      engagements: [
        'Institutional research partnerships.',
        'Knowledge exchange.',
        'Joint policy initiatives.',
        'Collaborative events and dialogues.',
        'Capacity development and expert engagement.',
      ],
    },
  ],
} as const;

export const COALITION_COMMITTEE_META = {
  id: 'committee',
  sectionIndex: '07 / FOUNDING COMMITTEE',
  eyebrow: 'FOUNDING LEADERSHIP',
  heading: 'The People Behind the Coalition',
  paragraphs: [
    "The Coalition's Founding Committee brings together individuals with different professional perspectives and areas of responsibility to help guide its collaborative direction, research engagement, policy dialogue, and institutional development.",
    'The founding structure assigns thematic and coordination responsibilities to its members, supporting a multidisciplinary approach to international AI governance cooperation.',
  ],
  directoryLink: {
    label: 'Membership and committee directory',
    href: 'https://coalitionmembers.atlasai.institute/members',
  },
} as const;

export const COALITION_HOST = {
  id: 'host',
  sectionIndex: '08 / INSTITUTIONAL HOST & SECRETARIAT',
  eyebrow: 'INSTITUTIONAL HOST',
  heading: 'Atlas AI Institute',
  paragraphs: [
    'Atlas AI Institute serves as the Institutional Host and Secretariat Host of the Atlas Global South AI Policy Coalition.',
    "As an independent AI policy and governance research institute, Atlas provides the institutional foundation for the Coalition's coordination and collaborative activities.",
    "The institutional hosting relationship supports the Coalition's research-oriented direction, administrative coordination, knowledge development, and international engagement.",
  ],
  facts: [
    { label: 'Institutional Host', value: 'Atlas AI Institute' },
    {
      label: 'Official Website',
      value: 'https://atlasai.institute/',
      href: 'https://atlasai.institute/',
    },
    {
      label: 'Institutional Email',
      value: 'contact@atlasai.institute',
      href: 'mailto:contact@atlasai.institute',
    },
  ],
  cta: {
    label: 'Visit Atlas AI Institute',
    href: 'https://atlasai.institute/',
  },
} as const;

export const COALITION_STRUCTURE = {
  id: 'structure',
  sectionIndex: '09 / HOW THE COALITION WORKS',
  eyebrow: 'COLLABORATIVE STRUCTURE',
  heading: 'A Multidisciplinary Approach to Collective Action',
  intro:
    'The Coalition is organised around a collaborative leadership and thematic engagement structure.',
  rows: [
    {
      index: '01',
      title: 'Founding Committee',
      description:
        "Provides founding leadership, strategic direction, thematic coordination, and support for the Coalition's development.",
    },
    {
      index: '02',
      title: 'Thematic Collaboration',
      description:
        'Connects members and contributors around research, policy, legal, institutional, cultural, and community governance priorities.',
    },
    {
      index: '03',
      title: 'Institutional Cooperation',
      description:
        'Encourages engagement with universities, research institutes, civil society organisations, policymakers, and other relevant institutions.',
    },
    {
      index: '04',
      title: 'Research and Policy Engagement',
      description:
        'Supports collaborative research, policy dialogue, knowledge exchange, and relevant institutional initiatives.',
    },
    {
      index: '05',
      title: 'Secretariat Hosting',
      description:
        "Atlas AI Institute serves as the institutional and secretariat host supporting the Coalition's coordination.",
    },
  ],
} as const;

export const COALITION_MEMBERSHIP = {
  id: 'membership',
  sectionIndex: '10 / MEMBERSHIP & PARTICIPATION',
  eyebrow: 'JOIN THE COLLABORATION',
  heading: 'Contribute to International AI Governance Dialogue',
  intro:
    'The Coalition welcomes engagement from individuals and institutions whose work, experience, or interests relate to artificial intelligence policy and governance.',
  listHeading: 'Potential participants include',
  participants: [
    {
      title: 'Researchers and Academics',
      description:
        'Individuals working on AI policy, technology governance, law, economics, social sciences, and related research fields.',
    },
    {
      title: 'Policy Professionals',
      description:
        'People engaged in public policy, regulation, institutional governance, and international cooperation.',
    },
    {
      title: 'Civil Society Organisations',
      description:
        'Organisations working on digital rights, public accountability, technology policy, inclusion, and public-interest technology.',
    },
    {
      title: 'Universities and Research Institutions',
      description:
        'Academic and research organisations interested in collaborative studies, policy dialogue, and knowledge exchange.',
    },
    {
      title: 'Technology and AI Practitioners',
      description:
        'Professionals contributing to responsible AI, AI safety, technical evaluation, and institutional implementation.',
    },
    {
      title: 'Youth and Emerging Professionals',
      description:
        'Students, young researchers, and emerging professionals interested in contributing to AI governance discussions.',
    },
  ],
  ctas: {
    apply: {
      label: 'Apply for Membership',
      href: 'https://coalition.atlasai.institute/membership',
    },
    explore: {
      label: 'Explore Coalition Membership',
      href: 'https://coalitionmembers.atlasai.institute/members',
    },
  },
  note: 'Engagement through this page does not promise membership approval, committee appointments, financial support, or formal representation.',
} as const;

export const COALITION_COLLABORATION = {
  id: 'collaboration',
  sectionIndex: '11 / COLLABORATION OPPORTUNITIES',
  eyebrow: 'WORK WITH THE COALITION',
  heading: 'Turning Shared Knowledge into Collective Initiatives',
  intro:
    'The Coalition seeks opportunities to work with relevant organisations and individuals on activities that advance international AI governance cooperation.',
  listHeading: 'Potential areas include:',
  areas: [
    'Joint research and policy publications.',
    'International AI governance roundtables.',
    'Expert discussions and policy dialogues.',
    'Institutional and academic partnerships.',
    'Comparative AI policy research.',
    'Multistakeholder consultations.',
    'Collaborative knowledge and capacity development initiatives.',
  ],
  closing:
    'Organisations interested in contributing to these areas are invited to contact the Coalition.',
  cta: {
    label: 'Discuss Collaboration',
    href: 'mailto:contact@atlasai.institute',
  },
} as const;

export const COALITION_UPDATES_META = {
  id: 'updates',
  sectionIndex: '12 / KNOWLEDGE & ACTIVITIES',
  eyebrow: 'COALITION UPDATES',
  heading: 'Research, Dialogue, and Collaborative Activities',
  intro:
    "This section will communicate the Coalition's research contributions, policy discussions, institutional engagements, and collaborative activities.",
  categories: [
    'Policy Dialogues',
    'Research and Publications',
    'Institutional Engagement',
    'Events and Roundtables',
    'Coalition Announcements',
  ],
  cta: {
    label: 'Explore Coalition Updates',
    href: 'https://coalition.atlasai.institute',
  },
} as const;

export const COALITION_FINAL_CTA = {
  id: 'final',
  sectionIndex: '13 / JOIN THE EFFORT',
  eyebrow: 'BE PART OF THE CONVERSATION',
  heading: 'The Future of AI Governance Requires Collective Action.',
  paragraphs: [
    'AI governance is a shared international challenge. Meaningful progress requires research collaboration, institutional engagement, policy dialogue, and the participation of diverse perspectives.',
    'The Atlas Global South AI Policy Coalition invites researchers, policy professionals, institutions, civil society organisations, and practitioners to engage in constructive cooperation and contribute to a stronger international AI governance ecosystem.',
  ],
  ctas: {
    committee: {
      label: 'Explore the Founding Committee',
      href: '#committee',
    },
    membership: {
      label: 'Explore Membership',
      href: '#membership',
    },
    collaboration: {
      label: 'Discuss Institutional Collaboration',
      href: 'mailto:contact@atlasai.institute',
    },
  },
} as const;

export const COALITION_CONTACT = {
  id: 'contact',
  sectionIndex: '14 / CONTACT',
  heading: 'Atlas Global South AI Policy Coalition',
  hostLine: 'Institutional Host & Secretariat Host: Atlas AI Institute',
  email: 'contact@atlasai.institute',
  website: 'https://atlasai.institute/',
  directoryUrl: 'https://coalitionmembers.atlasai.institute/members',
} as const;

export const COALITION_FOOTER = {
  summary:
    'Atlas Global South AI Policy Coalition — An international collaborative initiative advancing AI governance through research, policy dialogue, multistakeholder engagement, and institutional cooperation.',
  navLinks: [
    { label: 'About the Coalition', href: '#about' },
    { label: 'Vision & Mission', href: '#vision' },
    { label: 'Focus Areas', href: '#focus' },
    { label: 'Founding Committee', href: '#committee' },
    { label: 'Institutional Host', href: '#host' },
    { label: 'Membership', href: '#membership' },
    { label: 'Collaboration', href: '#collaboration' },
    { label: 'Updates', href: '#updates' },
    { label: 'Contact', href: '#contact' },
  ],
  hostLabel: 'Institutional Host: Atlas AI Institute',
  hostUrl: 'https://atlasai.institute/',
  copyright:
    '© 2026 Atlas Global South AI Policy Coalition. All rights reserved.',
  homeLink: { label: 'Atlas AI Institute home', to: '/' },
} as const;
