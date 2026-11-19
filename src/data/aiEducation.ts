export type ProgrammeVariant = 'featured' | 'compact';

export interface EducationProgramme {
  number: string;
  title: string;
  description: string;
  variant: ProgrammeVariant;
  format?: string;
  languages?: string;
}

export const ATLAS_AI_EDUCATION_URL =
  (import.meta.env.VITE_ATLAS_AI_EDUCATION_URL ?? '').trim() ||
  'https://education.atlasai.institute';

export const EDUCATION_PROGRAMMES: EducationProgramme[] = [
  {
    number: '01',
    variant: 'featured',
    title: 'Women Safety in the AI Era',
    description:
      'Understand AI-enabled risks such as deepfakes, impersonation, online harassment and privacy abuse, and learn practical steps to protect yourself and others.',
    format: 'Live online',
    languages: 'Bangla and English',
  },
  {
    number: '02',
    variant: 'featured',
    title: 'AI Literacy for Everyone',
    description:
      'Build a clear foundation in how AI works, how to use AI tools safely and effectively, and how to think critically about AI in daily life and work.',
    format: 'Live online',
    languages: 'Bangla and English',
  },
  {
    number: '01',
    variant: 'compact',
    title: 'AI Governance and Fundamentals',
    description:
      'A structured introduction to AI governance, policy concepts, risk and accountability for professionals and decision-makers.',
  },
  {
    number: '02',
    variant: 'compact',
    title: 'AI Safety and Responsible Use',
    description:
      'Practical guidance on using AI responsibly: privacy, bias, misinformation, security and ethical decision-making.',
  },
];
