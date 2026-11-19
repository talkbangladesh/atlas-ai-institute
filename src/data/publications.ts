export type PublicationHighlight = {
  value: string;
  label: string;
};

export type PublicationMetaField = {
  label: string;
  value: string;
};

export type Publication = {
  id: string;
  title: string;
  category?: 'research' | 'framework' | 'report';
  group?: string;
  label: string;
  year: number;
  published: string;
  publishedIso?: string;
  description: string;
  paragraphs?: string[];
  author?: string;
  publisher?: string;
  resourceType?: string;
  doi?: string;
  url: string;
  downloadUrl?: string;
  downloadLabel?: string;
  readLabel?: string;
  highlights?: PublicationHighlight[];
  meta?: PublicationMetaField[];
  featured?: boolean;
  coverTitle?: string;
  note?: string;
  cover?: string;
};

export const FRAMEWORK_GROUPS = [
  {
    id: 'national-ai-policy-frameworks',
    index: '01',
    title: 'National AI Policy Frameworks',
  },
  {
    id: 'thematic-ai-governance-frameworks',
    index: '02',
    title: 'Thematic AI Governance Frameworks',
  },
  {
    id: 'international-framework-collections',
    index: '03',
    title: 'International Framework Collections',
  },
  {
    id: 'related-ai-governance-research',
    index: '04',
    title: 'Related AI Governance Research',
  },
] as const;

export const REPORTS_PAGE_SECTION = {
  index: '01 / REPORTS',
  title: 'Reports & Policy Intelligence',
} as const;

export const PUBLICATION_CARD_LABELS = {
  publisher: 'Publisher',
  author: 'Author',
  published: 'Published',
  resourceType: 'Resource type',
  doi: 'DOI',
  readMore: 'Read More',
  readFullReport: 'Read Full Report',
  opensNewTab: ' (opens in a new tab)',
  frameworkGroupsNavLabel: 'Framework sections',
} as const;

export const RESOURCE_CARD_LABELS = {
  types: {
    report: 'REPORT',
    research: 'RESEARCH',
    framework: 'FRAMEWORK',
  },
  details: 'Details',
  downloadPdf: 'Download PDF',
  readFramework: 'Read Framework',
  readNoteMore: 'Read more',
  readNoteLess: 'Read less',
} as const;

export type ResearchTier = 'featured' | 'lead' | 'compact';

export interface ResearchReferenceField {
  label: string;
  value: string;
}

export interface ResearchPublication {
  id: string;
  priority: number;
  category: string;
  title: string;
  description: string[];
  authors: string;
  affiliation?: string;
  published: string;
  year: number;
  publishedIso: string;
  researchType?: string;
  statusTag?: string;
  reference?: ResearchReferenceField[];
  highlights?: string[];
  doi: string;
  url: string;
  tier: ResearchTier;
  featuredEyebrow?: string;
  coverShortTitle?: string;
  coverCaption?: string;
}

export const RESEARCH_CATEGORIES = [
  {
    id: 'governance',
    index: '01',
    title: 'AI Governance, Digital Sovereignty & Institutional Capacity',
    emphasized: true,
  },
  {
    id: 'safety',
    index: '02',
    title: 'AI Safety, Information Integrity & Synthetic Media',
    emphasized: true,
  },
  {
    id: 'dpi',
    index: '03',
    title: 'Digital Public Infrastructure & Institutional Governance',
    emphasized: true,
  },
  {
    id: 'democracy',
    index: '04',
    title: 'Democracy, Public Policy & Civic Intelligence',
    emphasized: false,
  },
  {
    id: 'finance',
    index: '05',
    title: 'Development Finance & Organisational Resilience',
    emphasized: false,
  },
] as const;

export const RESEARCH_PAGE_CONTENT = {
  documentTitle: 'Research | Atlas AI Institute',
  portfolioIntro:
    'This research portfolio brings together work across AI governance, public policy, institutional reform, civic intelligence and related fields. Each record is attributed as shown on its original ResearchGate page.',
  anchorNavLabel: 'Research categories',
} as const;

export const RESEARCH_CARD_LABELS = {
  priorityLabel: 'PRIORITY RESEARCH',
  authors: 'Authors',
  affiliation: 'Affiliation',
  published: 'Published',
  type: 'Type',
  doi: 'DOI',
  readResearch: 'Read Research',
  accessFullText: 'Access Full Text',
  readFullDescription: 'Read full description',
  opensNewTab: ' (opens in a new tab)',
} as const;

export const research: ResearchPublication[] = [
  {
    id: 'ai-governance-in-africa-digital-sovereignty',
    priority: 1,
    category: 'AI Governance, Digital Sovereignty & Institutional Capacity',
    tier: 'featured',
    featuredEyebrow: 'PRIORITY RESEARCH',
    coverShortTitle: 'AI Governance in Africa',
    coverCaption: 'ADSF · 14 AFRICAN COUNTRIES',
    title:
      'Artificial Intelligence Governance in Africa: Bridging the Development-Governance Paradox Through Digital Sovereignty and Localized Innovation',
    description: [
      'A comparative policy research study examining AI governance across 14 African countries. The research investigates the development-governance paradox: how countries can harness artificial intelligence for economic and social development while addressing regulatory gaps, institutional capacity constraints and technological dependency.',
      'The study introduces the African Digital Sovereignty Framework (ADSF), a policy architecture designed to translate regional AI governance ambitions into practical institutional mechanisms. It examines governance readiness, digital infrastructure, workforce capacity, economic resources, localized innovation and regional cooperation.',
      'The research offers policy recommendations and phased strategic outlooks for policymakers, development finance institutions, regional organisations and academic researchers.',
    ],
    authors: 'Nafiul Ahmad Rafi, alongside the other listed co-authors',
    published: 'May 2026',
    year: 2026,
    publishedIso: '2026-05',
    researchType: 'Technical Report / White Paper',
    doi: '10.13140/RG.2.2.12962.80323',
    url: 'https://www.researchgate.net/publication/405194400_Artificial_Intelligence_Governance_in_Africa_Bridging_the_Development-Governance_Paradox_Through_Digital_Sovereignty_and_Localized_Innovation',
  },
  {
    id: 'infrastructure-as-sovereignty-compute-autonomy',
    priority: 2,
    category: 'AI Governance, Digital Sovereignty & Institutional Capacity',
    tier: 'lead',
    title:
      'Infrastructure as Sovereignty: Why Compute Autonomy is a Prerequisite for Regional AI Development',
    description: [
      'An examination of the infrastructure foundations required for meaningful regional AI development. The research explores why access to compute capacity, AI infrastructure and technological resources is closely connected to digital sovereignty and long-term regional development.',
      'The publication presents the Atlas Global South AI Policy Framework (AG-SAIPF), Version 1.0, and discusses responsible AI governance, data governance, AI risk management, public-sector deployment, human rights protection, local language and cultural preservation, technology transfer and regional cooperation.',
      'It considers the institutional and infrastructure conditions required for developing countries to build more independent and sustainable AI ecosystems.',
    ],
    authors:
      'Nafiul Ahmad Rafi, Almuyeed Shad and Asif Susmith, as listed on ResearchGate',
    published: 'June 2026',
    year: 2026,
    publishedIso: '2026-06',
    researchType: 'Preprint / Research Paper',
    statusTag: 'PREPRINT',
    doi: '',
    url: 'https://www.researchgate.net/publication/407050726_Infrastructure_as_Sovereignty_Why_Compute_Autonomy_is_a_Prerequisite_for_Regional_AI_Development',
  },
  {
    id: 'ai-powered-traffic-enforcement-bangladesh',
    priority: 5,
    category: 'AI Governance, Digital Sovereignty & Institutional Capacity',
    tier: 'compact',
    title:
      'AI-Powered Traffic Enforcement in Bangladesh: A Governance Architecture Failure Analysis and Reform Roadmap',
    description: [
      'A policy case study examining the governance architecture of AI-powered traffic enforcement in Bangladesh.',
      'The research investigates the institutional and technical challenges associated with camera-based traffic enforcement, including manual downstream case management, database interoperability, vehicle registration data quality, legal accountability and operational bottlenecks.',
      'Drawing comparative lessons from Singapore, South Korea and India, the study proposes an eight-point reform roadmap organised around infrastructure foundations, localisation and accountability.',
      'It highlights why AI deployment requires more than technical equipment: effective public-sector AI systems depend on interoperable data, institutional coordination, operational capacity, transparent processes and public oversight.',
    ],
    authors: 'Nafiul Ahmad Rafi',
    affiliation: 'Research associated with Insights Bangladesh',
    published: 'May 2026',
    year: 2026,
    publishedIso: '2026-05',
    reference: [{ label: 'Report number', value: 'IB-WP-2026-001' }],
    doi: '10.13140/RG.2.2.14003.59680',
    url: 'https://www.researchgate.net/publication/404950393_AI-Powered_Traffic_Enforcement_in_Bangladesh_A_Governance_Architecture_Failure_Analysis_and_Reform_Roadmap',
  },
  {
    id: 'multi-layered-forensic-framework-synthetic-media',
    priority: 3,
    category: 'AI Safety, Information Integrity & Synthetic Media',
    tier: 'lead',
    title:
      'A Multi-Layered Forensic Framework for Synthetic Media Detection and Content Authenticity in Digital News Ecosystems',
    description: [
      'This research proposes a multi-layered forensic approach to identifying and mitigating the risks associated with AI-generated synthetic media in digital news environments.',
      'It combines pixel-level artifact analysis, biological consistency checks and OSINT-based metadata harvesting to support content authentication. The research focuses on developing a structured verification process that newsrooms, investigators and relevant institutions can use to assess suspicious digital media and protect information integrity.',
      'The framework addresses the growing limitations of conventional detection methods and explores how technical forensic processes can be integrated into editorial verification and institutional response systems.',
    ],
    authors: 'Nafiul Ahmad Rafi',
    published: 'March 2026',
    year: 2026,
    publishedIso: '2026-03',
    researchType: 'Preprint',
    statusTag: 'PREPRINT',
    doi: '10.13140/RG.2.2.27298.08640',
    url: 'https://www.researchgate.net/publication/402138361_A_Multi-Layered_Forensic_Framework_for_Synthetic_Media_Detection_and_Content_Authenticity_in_Digital_News_Ecosystems',
  },
  {
    id: 'electoral-information-crisis-2026-bangladesh',
    priority: 4,
    category: 'AI Safety, Information Integrity & Synthetic Media',
    tier: 'compact',
    title:
      'The 2026 Electoral Information Crisis: A Quantitative Analysis of AI-Generated Misinformation and Media Impersonation in Bangladesh',
    description: [
      'A quantitative investigation into AI-generated misinformation, synthetic media and media impersonation in Bangladesh during the January–April 2026 electoral information cycle.',
      'The study analyses 2,402 verified misinformation cases, including 416 AI-generated cases, and investigates the use of voice cloning, deepfake visuals, synthetic narratives and impersonation of trusted news organisations.',
      'It examines misinformation categories, political content patterns, geographic distribution, media impersonation and the wider impact of AI-enabled deception on democratic participation and public trust.',
      'The research draws on aggregated material from fact-checking organisations including Rumor Scanner, Dismislab and FactWatch.',
    ],
    authors: 'Nafiul Ahmad Rafi',
    affiliation: 'Research associated with Insights Bangladesh',
    published: 'May 2026',
    year: 2026,
    publishedIso: '2026-05',
    reference: [{ label: 'Report reference', value: 'IB/REMI/2026/Q1-Q2' }],
    highlights: ['2,402 verified cases', '416 AI-generated cases'],
    doi: '10.13140/RG.2.2.18071.74404',
    url: 'https://www.researchgate.net/publication/404659494_The_2026_Electoral_Information_Crisis_A_Quantitative_Analysis_of_AI-Generated_Misinformation_and_Media_Impersonation_in_Bangladesh',
  },
  {
    id: 'bangladesh-tripartite-data-silo-crisis',
    priority: 6,
    category: 'Digital Public Infrastructure & Institutional Governance',
    tier: 'compact',
    title:
      'Bangladesh’s Tripartite Data Silo Crisis: NID, BDRIS, and CRVS — A Citizen Infrastructure Failure and the Path to Interoperability',
    description: [
      "A policy research paper examining the fragmentation of Bangladesh's three major citizen identity and civil registration systems: the National Identity Database (NID), Birth and Death Registration Information System (BDRIS) and Civil Registration and Vital Statistics (CRVS).",
      'The study investigates institutional fragmentation, inter-agency coordination failures, data interoperability, API governance, privacy risks and the implications for citizen access to reliable public services.',
      "Drawing comparative lessons from Estonia's X-Road and India's DEPA framework, the research proposes a phased roadmap for interoperable citizen infrastructure, privacy-by-design and stronger institutional coordination.",
    ],
    authors: 'Nafiul Ahmad Rafi',
    affiliation: 'Research associated with Insights Bangladesh',
    published: 'May 2026',
    year: 2026,
    publishedIso: '2026-05',
    researchType: 'Policy Research Paper',
    reference: [{ label: 'Report number', value: 'IB-NR-2026-02-EN' }],
    doi: '10.13140/RG.2.2.20889.79201',
    url: "https://www.researchgate.net/publication/404551468_Bangladesh's_Tripartite_Data_Silo_Crisis_NID_BDRIS_and_CRVS_-_A_Citizen_Infrastructure_Failure_and_the_Path_to_Interoperability",
  },
  {
    id: 'institutional-reconstruction-post-crisis-state-building',
    priority: 7,
    category: 'Digital Public Infrastructure & Institutional Governance',
    tier: 'compact',
    title:
      'Institutional Reconstruction: A Comprehensive Framework for Post-Crisis State Building',
    description: [
      'A research proposal examining the institutional foundations of post-crisis state reconstruction across post-conflict, post-authoritarian and crisis-affected contexts.',
      'Drawing on comparative experiences from Eastern Europe, Latin America, Southeast Asia and South Asia, the research explores how political institutions, public administration, governance systems and organisational structures can be rebuilt after periods of institutional disruption.',
      'It integrates perspectives from political science, development economics and organisational theory to identify conditions associated with successful institutional reconstruction and develop practical recommendations for policymakers, international organisations and domestic reform coalitions.',
    ],
    authors: 'Nafiul Ahmad Rafi',
    published: 'February 2026',
    year: 2026,
    publishedIso: '2026-02',
    researchType: 'Research Proposal',
    statusTag: 'RESEARCH PROPOSAL',
    doi: '10.13140/RG.2.2.36838.48961',
    url: 'https://www.researchgate.net/publication/401320429_Institutional_Reconstruction_A_Comprehensive_Framework_for_Post-Crisis_State_Building',
  },
  {
    id: 'national-mortality-public-safety-report-jan-apr-2026',
    priority: 9,
    category: 'Democracy, Public Policy & Civic Intelligence',
    tier: 'compact',
    title:
      'National Mortality & Public Safety Report (Jan–Apr 2026): Insights Bangladesh Data Brief',
    description: [
      'A multi-source public safety and mortality research report examining documented deaths and institutional safety challenges in Bangladesh between January and April 2026.',
      'The report brings together information from government agencies, public health institutions, human rights monitors, road safety organisations and systematic media monitoring.',
      'It examines transport fatalities, infectious disease mortality, political violence, mob violence, custodial deaths and disaster-related fatalities. The research also discusses data reconciliation, evidence limitations and policy recommendations for improving public safety, institutional accountability and preventive governance.',
      'The report identifies a minimum of 7,760 documented deaths across the categories and estimates covered, while distinguishing between documented counts and estimates in its methodology.',
    ],
    authors: 'Nafiul Ahmad Rafi',
    affiliation: 'Research associated with Insights Bangladesh',
    published: '30 April 2026',
    year: 2026,
    publishedIso: '2026-04-30',
    reference: [
      { label: 'Reporting period', value: 'January–April 2026' },
      { label: 'Report number', value: 'IB-NR-2026-01' },
    ],
    doi: '10.13140/RG.2.2.20034.54729',
    url: 'https://www.researchgate.net/publication/404327448_National_Mortality_Public_Safety_Report_Jan-Apr_2026_Insights_Bangladesh_Data_Brief',
  },
  {
    id: 'when-the-machine-breaks-single-donor-dependency',
    priority: 8,
    category: 'Development Finance & Organisational Resilience',
    tier: 'compact',
    title:
      'When the Machine Breaks: Single-Donor Dependency & the Structural Collapse of International NGO Operations (2024–2026)',
    description: [
      'A policy-oriented white paper investigating the structural vulnerabilities associated with single-donor dependency in international humanitarian and development organisations.',
      'The research examines how donor concentration, funding disruptions and organisational financing structures can affect programme continuity, field operations, staffing and institutional resilience.',
      'Drawing on financial reports, humanitarian system data and organisational case studies, it analyses donor dependency as a systemic operational risk and explores alternative approaches to funding diversification, localisation and organisational sustainability.',
      'The paper discusses humanitarian financing and operational experiences across multiple countries and international organisations.',
    ],
    authors: 'Nafiul Ahmad Rafi and Ahmad Ainur Rafi, as listed on ResearchGate',
    affiliation: 'Lilac Insights',
    published: 'May 2026',
    year: 2026,
    publishedIso: '2026-05',
    researchType: 'White Paper',
    doi: '10.13140/RG.2.2.12184.97284',
    url: 'https://www.researchgate.net/publication/404845693_When_the_Machine_Breaks_Single-Donor_Dependency_the_Structural_Collapse_of_International_NGO_Operations_2024-2026',
  },
];

export const frameworks: Publication[] = [
  {
    id: 'bangladesh-national-ai-policy-framework-2026-2035',
    category: 'framework',
    group: 'National AI Policy Frameworks',
    label: 'Framework',
    year: 2026,
    published: '30 June 2026',
    publishedIso: '2026-06-30',
    title:
      'Bangladesh National AI Policy Framework 2026–2035: Governance, Ethics, Regulation, Risk Management and National Implementation Strategy',
    description:
      'A national AI policy proposal for Bangladesh covering responsible AI governance, ethical development, regulatory oversight, risk management, public-sector adoption, digital sovereignty and sustainable AI innovation. It outlines policy recommendations, institutional governance architecture, implementation mechanisms and long-term national AI development objectives.',
    publisher: 'Atlas AI Institute',
    author: 'Nafiul Ahmad Rafi',
    doi: '10.5281/zenodo.21050247',
    url: 'https://zenodo.org/records/21050247',
    downloadUrl:
      'https://zenodo.org/records/21050247/files/Bangladesh_National_AI_Policy_Framework.pdf?download=1',
    downloadLabel: 'Download Full Framework (PDF)',
  },
  {
    id: 'bangladesh-national-ai-policy-and-regulatory-framework-2026-2035',
    category: 'framework',
    group: 'National AI Policy Frameworks',
    label: 'Framework',
    year: 2026,
    published: '30 June 2026',
    publishedIso: '2026-06-30',
    title:
      'Bangladesh National Artificial Intelligence (AI) Policy and Regulatory Framework 2026–2035: A Comprehensive Governance Framework for Responsible AI',
    description:
      'A comprehensive national AI governance and regulatory framework addressing AI policy, regulation, ethics, human rights, risk management, data governance, public-sector adoption, research and innovation, cybersecurity, digital sovereignty and institutional oversight. It includes governance mechanisms, implementation roadmaps, sector-specific strategies and monitoring mechanisms.',
    publisher: 'Atlas AI Institute',
    author: 'Nafiul Ahmad Rafi',
    doi: '10.5281/zenodo.21049298',
    url: 'https://zenodo.org/records/21049298',
    downloadUrl:
      'https://zenodo.org/records/21049298/files/National%20AI%20Policy%20%26%20Regulatory%20Framework%20of%20Bangladesh.pdf?download=1',
    downloadLabel: 'Download Full Framework (PDF)',
  },
  {
    id: 'bangladesh-national-ai-transparency-explainability-policy-framework',
    category: 'framework',
    group: 'Thematic AI Governance Frameworks',
    label: 'Framework',
    year: 2026,
    published: '27 June 2026',
    publishedIso: '2026-06-27',
    title:
      'Bangladesh National AI Transparency & Explainability Policy Framework',
    description:
      'A national framework proposing governance standards for AI transparency, explainability, accountability and responsible deployment in Bangladesh. It introduces risk-based regulatory architecture, transparency impact assessments, independent audits, public AI registries, citizen rights and sector-specific governance requirements.',
    publisher: 'Atlas AI Institute',
    author: 'Nafiul Ahmad Rafi',
    doi: '10.5281/zenodo.20949776',
    url: 'https://zenodo.org/records/20949776',
    downloadUrl:
      'https://zenodo.org/records/20949776/files/Bangladesh_AI_Transparency_Policy_Framework.pdf?download=1',
    downloadLabel: 'Download Full Framework (PDF)',
  },
  {
    id: 'national-ai-safety-framework-for-bangladesh',
    category: 'framework',
    group: 'Thematic AI Governance Frameworks',
    label: 'Framework',
    year: 2026,
    published: '24 June 2026',
    publishedIso: '2026-06-24',
    title: 'National AI Safety Framework for Bangladesh',
    description:
      'A risk-based national framework for the safe, ethical, secure and responsible development, deployment and use of AI in Bangladesh. It introduces a five-tier AI risk classification model, sector-specific governance requirements, oversight mechanisms, compliance obligations and institutional structures covering healthcare, finance, agriculture, education, public administration, law enforcement, critical infrastructure and national security.',
    publisher: 'Atlas AI Institute',
    author: 'Nafiul Ahmad Rafi',
    doi: '10.5281/zenodo.20820947',
    url: 'https://zenodo.org/records/20820947',
    downloadUrl:
      'https://zenodo.org/records/20820947/files/NATIONAL%20AI%20SAFETY%20FRAMEWORK%20OF%20BANGLADESH_20260624_041047_0000.pdf?download=1',
    downloadLabel: 'Download Full Framework (PDF)',
  },
  {
    id: 'global-south-national-ai-policy-framework-collection-2025-2026',
    category: 'framework',
    group: 'International Framework Collections',
    label: 'Framework Collection',
    year: 2026,
    published: '25 January 2026',
    publishedIso: '2026-01-25',
    title:
      'Global South National Artificial Intelligence Policy Framework Collection (2025–2026)',
    description:
      'A collection of 30 national AI policy framework documents developed for emerging and developing economies across Africa, Asia, the Middle East, Latin America and Small Island Developing States. The collection covers AI governance, ethics, safety, transparency, accountability, data governance, innovation, public-sector adoption, workforce development, cybersecurity and international cooperation.',
    publisher: 'Atlas AI Institute',
    author: 'Nafiul Ahmad Rafi',
    doi: '10.5281/zenodo.20855849',
    url: 'https://zenodo.org/records/20855849',
    downloadUrl: 'https://zenodo.org/records/20855849',
    downloadLabel: 'Download Full Collection',
  },
  {
    id: 'agent-accountability-beyond-model-safety',
    category: 'framework',
    group: 'Related AI Governance Research',
    label: 'Evidence Note',
    year: 2026,
    published: '30 August 2026',
    publishedIso: '2026-08-30',
    title:
      'Agent Accountability Beyond Model Safety: Six Governance Controls for Autonomous AI Agents',
    description:
      'An Atlas AI Institute Evidence Note examining governance requirements for increasingly autonomous AI agents. It introduces the ATLAS A6 Agent Accountability Framework and identifies six governance pillars: Identity, Authorization, Isolation, Logging, Forensics and Independent Investigation. It also presents an Agent Accountability Maturity Model, a minimum accountability baseline and an incident response model.',
    publisher: 'Atlas AI Institute',
    author: 'Nafiul Ahmad Rafi',
    doi: '10.5281/zenodo.22166848',
    url: 'https://zenodo.org/records/22166848',
    downloadUrl:
      'https://zenodo.org/records/22166848/files/Agent%20Accountability%20Beyond%20Model%20Safety_Atlas%20AI%20Institute.pdf?download=1',
    downloadLabel: 'Download Full Report (PDF)',
  },
];

export const reports: Publication[] = [
  {
    id: 'global-ai-policy-review-2026',
    category: 'report',
    group: 'Reports & Policy Intelligence',
    featured: true,
    coverTitle: 'Global AI Policy Review 2026',
    label: 'Featured Research Report',
    year: 2026,
    published: '25 August 2026',
    publishedIso: '2026-08-25',
    title:
      'Global AI Policy Review 2026: An Evidence‑Based Comparative Review of National AI Policy Ecosystems',
    paragraphs: [
      'An extensive, evidence-based comparative review of national artificial intelligence policy ecosystems across 75+ countries and six continents. This research examines how governments are developing, governing, regulating and deploying artificial intelligence through national strategies, legislation, regulatory institutions and policy frameworks.',
      'Covering AI governance institutions, AI-specific legislation, national strategies, data governance, innovation ecosystems, AI safety, security, ethics, human rights, inclusion and public-sector implementation, the review provides a comparative evidence base for understanding different national approaches to AI governance.',
      'The current edition comprises more than 2,500 pages of comparative research and country-level analysis, drawing primarily on official government policies, legislation, regulatory guidance and authoritative institutional sources.',
    ],
    description:
      'An extensive, evidence-based comparative review of national artificial intelligence policy ecosystems across 75+ countries and six continents. This research examines how governments are developing, governing, regulating and deploying artificial intelligence through national strategies, legislation, regulatory institutions and policy frameworks.\n\nCovering AI governance institutions, AI-specific legislation, national strategies, data governance, innovation ecosystems, AI safety, security, ethics, human rights, inclusion and public-sector implementation, the review provides a comparative evidence base for understanding different national approaches to AI governance.\n\nThe current edition comprises more than 2,500 pages of comparative research and country-level analysis, drawing primarily on official government policies, legislation, regulatory guidance and authoritative institutional sources.',
    highlights: [
      { value: '75+', label: 'Countries' },
      { value: '6', label: 'Continents' },
      { value: '2,500+', label: 'Pages' },
    ],
    author: 'Nafiul Ahmad Rafi',
    publisher: 'Atlas AI Institute',
    resourceType: 'Report',
    doi: '10.5281/zenodo.22090518',
    url: 'https://zenodo.org/records/22090518',
    readLabel: 'Read Full Report',
    downloadUrl:
      'https://zenodo.org/records/22090518/files/Global_AI_Policy_Review_2026_Book_Edition-24.pdf?download=1',
    downloadLabel: 'Download Full Report (PDF)',
    note: "Research coverage does not indicate Atlas's operational presence in a country. The Review is a comparative research publication, not an official government assessment.",
  },
  {
    id: 'global-ai-policy-maturity-index-gapmi-2026',
    category: 'report',
    group: 'Reports & Policy Intelligence',
    label: 'Report',
    year: 2026,
    published: '14 July 2026',
    publishedIso: '2026-07-14',
    title:
      'Global AI Policy Maturity Index (GAPMI) 2026: A Comparative Assessment of AI Governance Across Ten Leading AI Nations',
    paragraphs: [
      'The Global AI Policy Maturity Index (GAPMI) 2026 introduces an original comparative framework for evaluating national AI governance maturity across ten leading AI jurisdictions.',
      'The study assesses national AI governance through ten policy dimensions, including national AI strategy, governance institutions, regulation, responsible AI, risk management, innovation ecosystems, AI workforce development, public-sector AI and international cooperation.',
      'Drawing on official government policies, legislation, regulatory guidance and international standards, GAPMI provides a structured maturity assessment to help policymakers, researchers, international organisations and academic institutions benchmark AI governance systems, identify policy gaps and understand different governance approaches. The report also introduces governance archetypes, comparative rankings, implementation recommendations and future scenarios for AI governance.',
    ],
    description:
      'The Global AI Policy Maturity Index (GAPMI) 2026 introduces an original comparative framework for evaluating national AI governance maturity across ten leading AI jurisdictions.\n\nThe study assesses national AI governance through ten policy dimensions, including national AI strategy, governance institutions, regulation, responsible AI, risk management, innovation ecosystems, AI workforce development, public-sector AI and international cooperation.\n\nDrawing on official government policies, legislation, regulatory guidance and international standards, GAPMI provides a structured maturity assessment to help policymakers, researchers, international organisations and academic institutions benchmark AI governance systems, identify policy gaps and understand different governance approaches. The report also introduces governance archetypes, comparative rankings, implementation recommendations and future scenarios for AI governance.',
    highlights: [
      { value: '10', label: 'Policy dimensions' },
      { value: '10', label: 'Leading AI jurisdictions' },
    ],
    meta: [{ label: 'Report ID', value: 'AII-RR-2026-005' }],
    author: 'Nafiul Ahmad Rafi',
    publisher: 'Atlas AI Institute',
    doi: '10.5281/zenodo.21364485',
    url: 'https://zenodo.org/records/21364485',
    readLabel: 'Read Full Report',
    downloadUrl:
      'https://zenodo.org/records/21364485/files/Global_AI_Policy_Maturity_Index_GAPMI_2026_Atlas_AI_Institute.pdf?download=1',
    downloadLabel: 'Download Full Report (PDF)',
  },
  {
    id: 'global-ai-governance-and-policy-intelligence-update-july-2026',
    category: 'report',
    group: 'Reports & Policy Intelligence',
    label: 'Policy Intelligence Report',
    year: 2026,
    published: '28 July 2026',
    publishedIso: '2026-07-28',
    title:
      'Global AI Governance & Policy Intelligence Update – July 2026 (Vol. 01, Issue 07)',
    paragraphs: [
      'A monthly evidence-based intelligence report tracking global developments in artificial intelligence governance, policy, regulation, AI safety and international policy cooperation.',
      'This July 2026 edition covers developments from 1–28 July and combines executive analysis, comparative policy tracking, Bangladesh AI Governance Watch and strategic recommendations. It is designed to support policymakers, researchers, international organisations, academics and other stakeholders monitoring the rapidly evolving global AI governance landscape.',
    ],
    description:
      'A monthly evidence-based intelligence report tracking global developments in artificial intelligence governance, policy, regulation, AI safety and international policy cooperation.\n\nThis July 2026 edition covers developments from 1–28 July and combines executive analysis, comparative policy tracking, Bangladesh AI Governance Watch and strategic recommendations. It is designed to support policymakers, researchers, international organisations, academics and other stakeholders monitoring the rapidly evolving global AI governance landscape.',
    meta: [
      { label: 'Series', value: 'Global AI Governance Intelligence Series' },
    ],
    author: 'Nafiul Ahmad Rafi',
    publisher: 'Atlas AI Institute',
    doi: '10.5281/zenodo.21643546',
    url: 'https://zenodo.org/records/21643546',
    readLabel: 'Read Full Report',
    downloadUrl:
      'https://zenodo.org/records/21643546/files/Global_AI_Governance_Intelligence_Report_July2026.pdf?download=1',
    downloadLabel: 'Download Full Report (PDF)',
  },
  {
    id: 'global-ai-policy-update-3rd-edition-august-2026',
    category: 'report',
    group: 'Reports & Policy Intelligence',
    label: 'Policy Intelligence Report',
    year: 2026,
    published: '30 August 2026',
    publishedIso: '2026-08-30',
    title: 'Global AI Policy Update — 3rd Edition | August 2026',
    paragraphs: [
      "The third edition of Atlas AI Institute's recurring global AI policy intelligence publication. This report provides a curated, evidence-based overview of significant AI governance and policy developments during August 2026.",
      'It tracks developments across national governments, regional institutions, international organisations, regulators and other policy actors. Key areas include AI legislation and regulation, national AI strategies, governance institutions, AI safety, responsible AI, regulatory enforcement, international cooperation, standards, government AI initiatives and emerging governance risks.',
      'The publication supports policymakers, researchers, technology professionals, civil society organisations and academics seeking to understand the changing global AI policy environment.',
    ],
    description:
      "The third edition of Atlas AI Institute's recurring global AI policy intelligence publication. This report provides a curated, evidence-based overview of significant AI governance and policy developments during August 2026.\n\nIt tracks developments across national governments, regional institutions, international organisations, regulators and other policy actors. Key areas include AI legislation and regulation, national AI strategies, governance institutions, AI safety, responsible AI, regulatory enforcement, international cooperation, standards, government AI initiatives and emerging governance risks.\n\nThe publication supports policymakers, researchers, technology professionals, civil society organisations and academics seeking to understand the changing global AI policy environment.",
    meta: [
      { label: 'Edition', value: '3rd Edition' },
      { label: 'Series', value: 'Global AI Policy Update' },
      { label: 'Geographic scope', value: 'Global' },
    ],
    author: 'Nafiul Ahmad Rafi',
    publisher: 'Atlas AI Institute',
    doi: '10.5281/zenodo.22167389',
    url: 'https://zenodo.org/records/22167389',
    readLabel: 'Read Full Report',
    downloadUrl:
      'https://zenodo.org/records/22167389/files/Atlas_Global_AI_Policy_Update_August_Edition_3.pdf?download=1',
    downloadLabel: 'Download Full Report (PDF)',
  },
];

export const PUBLICATIONS_HUB_CONTENT = {
  eyebrow: 'RESEARCH & PUBLICATIONS',
  title: 'Research, Frameworks, and Reports',
  intro:
    'An editorial selection of Atlas research, policy frameworks, and institutional reports.',
  sectionIndex: 'CATALOGUE',
  sections: [
    {
      index: '01',
      categoryKey: 'research' as const,
      title: 'Research',
      description: 'Research papers and comparative studies.',
      ctaLabel: 'View all',
      to: '/research/',
    },
    {
      index: '02',
      categoryKey: 'framework' as const,
      title: 'Frameworks',
      description: 'Policy and governance frameworks.',
      ctaLabel: 'View all',
      to: '/frameworks/',
    },
    {
      index: '03',
      categoryKey: 'report' as const,
      title: 'Reports',
      description: 'Institutional and research reports.',
      ctaLabel: 'View all',
      to: '/reports/',
    },
  ],
  countSingular: 'item',
  countPlural: 'items',
  latestHeading: 'Latest',
  emptyMessage: 'No items in this category yet.',
  recordLabel: 'View official publication record',
} as const;

export function getCategoryCount(
  categoryKey: 'research' | 'framework' | 'report'
): number {
  if (categoryKey === 'research') return research.length;
  if (categoryKey === 'framework') return frameworks.length;
  return reports.length;
}

export const PUBLICATION_LISTING_META = {
  research: {
    eyebrow: 'RESEARCH',
    title: 'Research',
    intro:
      'Comparative research on AI laws, regulatory approaches, institutional mandates, and public-sector governance capacity.',
    headingId: 'research-page-heading',
    sectionIndex: 'RESEARCH',
  },
  framework: {
    eyebrow: 'FRAMEWORKS',
    title: 'Frameworks',
    intro:
      'Translating research evidence into practical governance concepts, responsibilities, and implementation pathways.',
    headingId: 'frameworks-page-heading',
    sectionIndex: 'FRAMEWORKS',
  },
  report: {
    eyebrow: 'REPORTS',
    title: 'Reports',
    intro:
      'Institutional and research reports documenting AI policy and governance developments.',
    headingId: 'reports-page-heading',
    sectionIndex: 'REPORTS',
  },
} as const;

export function sortPublicationsNewestFirst(
  items: readonly Publication[]
): Publication[] {
  return [...items].sort((a, b) => {
    if (b.year !== a.year) return b.year - a.year;
    const keyA = a.publishedIso ?? String(a.year);
    const keyB = b.publishedIso ?? String(b.year);
    return keyB.localeCompare(keyA);
  });
}

export function getLatestPublications(): Publication[] {
  const mappedResearch: Publication[] = research.map((item) => ({
    id: item.id,
    title: item.title,
    category: 'research',
    label: item.researchType ?? item.statusTag ?? 'Research',
    year: item.year,
    published: item.published,
    publishedIso: item.publishedIso,
    description: item.description.join('\n\n'),
    paragraphs: item.description,
    author: item.authors,
    meta: [
      ...(item.affiliation
        ? [{ label: RESEARCH_CARD_LABELS.affiliation, value: item.affiliation }]
        : []),
      ...(item.reference ?? []),
    ],
    doi: item.doi || undefined,
    url: item.url,
    readLabel: RESEARCH_CARD_LABELS.readResearch,
  }));

  return sortPublicationsNewestFirst([
    ...mappedResearch,
    ...frameworks,
    ...reports,
  ]);
}

export function getFeaturedPublication(): Publication | undefined {
  return reports[0] ?? frameworks[0];
}
