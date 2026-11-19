export type ProjectItem = {
  id: string;
  title: string;
  description: string;
  url: string;
  year?: number;
  label?: string;
  note?: string;
  cover?: string;
};

export const projects: ProjectItem[] = [];

export const PROJECTS_PAGE_META = {
  eyebrow: 'PROJECTS',
  title: 'Projects',
  intro:
    'Public-interest digital systems and governance infrastructure supporting information integrity and institutional capacity.',
  headingId: 'projects-page-heading',
  sectionIndex: 'PROJECTS',
  emptyMessage: 'No items in this category yet.',
  itemLinkLabel: 'View project',
} as const;
