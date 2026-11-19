export type ToolItem = {
  id: string;
  title: string;
  description: string;
  url: string;
  year?: number;
  label?: string;
  note?: string;
  cover?: string;
};

export const tools: ToolItem[] = [];

export const TOOLS_PAGE_META = {
  eyebrow: 'TOOLS',
  title: 'Tools',
  intro: 'Research and governance tools developed by Atlas.',
  headingId: 'tools-page-heading',
  sectionIndex: 'TOOLS',
  emptyMessage: 'No items in this category yet.',
  itemLinkLabel: 'View tool',
} as const;
