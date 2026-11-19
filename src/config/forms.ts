export const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit';
export const WEB3FORMS_FROM_NAME = 'Atlas AI Institute Website';

export const FORMS = {
  career: {
    key: 'daf1d804-db75-43b5-af25-5c144a90f661',
    subject: 'New Career Enquiry — Atlas AI Institute',
  },
  partnership: {
    key: '2795a105-59e0-444d-b6a8-c3d1a1d5dbfc',
    subject: 'New Partnership Enquiry — Atlas AI Institute',
  },
  contact: {
    key: 'df3c8807-d367-43ec-82cb-f830ed900f3e',
    subject: 'New General Enquiry — Atlas AI Institute',
  },
} as const;

export type FormFieldType = 'text' | 'email' | 'url' | 'select' | 'textarea';

export interface FormFieldDefinition {
  name:
    | 'name'
    | 'email'
    | 'organisation'
    | 'role'
    | 'country'
    | 'organisation_type'
    | 'collaboration_area'
    | 'area_of_interest'
    | 'website'
    | 'linkedin'
    | 'cv_link'
    | 'topic'
    | 'message';
  label: string;
  type: FormFieldType;
  required?: boolean;
  autoComplete?: string;
  helperText?: string;
  options?: readonly string[];
  rows?: number;
}

export interface EnquiryFormConfig {
  id: 'career' | 'partnership' | 'contact';
  accessKey: string;
  subject: string;
  pageTitle: string;
  eyebrow: string;
  heading: string;
  intro: string;
  sectionIndex: string;
  headingId: string;
  submitLabel: string;
  fields: readonly FormFieldDefinition[];
}

export const ENQUIRY_COPY = {
  requiredMarker: 'REQUIRED',
  sendingLabel: 'Sending…',
  successMessage:
    'Thank you. Your message has been sent to Atlas AI Institute.',
  sendAnotherLabel: 'Send another message',
  errorSummaryHeading: 'Please review the following before submitting:',
  submitErrorPrefix:
    'Your message could not be sent. Please try again or write to us at',
  consentText:
    'By submitting this form you agree that Atlas AI Institute may use the information you provide to respond to your enquiry.',
  directEmailPrefix: 'You can also write to us directly at',
  directEmail: 'contact@atlasai.institute',
  selectPlaceholder: 'Select an option',
} as const;

export const CAREERS_FORM_CONFIG: EnquiryFormConfig = {
  id: 'career',
  accessKey: FORMS.career.key,
  subject: FORMS.career.subject,
  pageTitle: 'Careers | Atlas AI Institute',
  eyebrow: 'CAREERS & OPPORTUNITIES',
  heading: 'Join the Work of Atlas AI Institute',
  intro:
    'Atlas welcomes enquiries from individuals interested in AI policy, governance research, responsible AI, institutional capacity, and public-interest technology.',
  sectionIndex: 'CAREER ENQUIRY',
  headingId: 'careers-page-heading',
  submitLabel: 'Send application enquiry',
  fields: [
    {
      name: 'name',
      label: 'Full name',
      type: 'text',
      required: true,
      autoComplete: 'name',
    },
    {
      name: 'email',
      label: 'Email address',
      type: 'email',
      required: true,
      autoComplete: 'email',
    },
    {
      name: 'country',
      label: 'Country',
      type: 'text',
      autoComplete: 'country-name',
    },
    {
      name: 'area_of_interest',
      label: 'Area of interest',
      type: 'select',
      required: true,
      options: [
        'Research',
        'Policy & Frameworks',
        'Publications & Editorial',
        'Digital Public Infrastructure & Projects',
        'Education & Capacity Development',
        'Other',
      ],
    },
    {
      name: 'linkedin',
      label: 'LinkedIn or portfolio URL (optional)',
      type: 'url',
    },
    {
      name: 'cv_link',
      label: 'CV link (optional)',
      type: 'url',
      helperText:
        'Share a link to your CV (for example Google Drive or Dropbox). File uploads are not supported.',
    },
    {
      name: 'message',
      label: 'Tell us about your background and interests',
      type: 'textarea',
      required: true,
      rows: 6,
    },
  ],
};

export const PARTNERSHIPS_FORM_CONFIG: EnquiryFormConfig = {
  id: 'partnership',
  accessKey: FORMS.partnership.key,
  subject: FORMS.partnership.subject,
  pageTitle: 'Partnerships | Atlas AI Institute',
  eyebrow: 'INSTITUTIONAL PARTNERSHIPS',
  heading: 'Partner With Atlas AI Institute',
  intro:
    'Atlas welcomes enquiries from universities, research institutes, governments, international organisations, civil society organisations, development partners, and technology institutions.',
  sectionIndex: 'PARTNERSHIP ENQUIRY',
  headingId: 'partnerships-page-heading',
  submitLabel: 'Send partnership enquiry',
  fields: [
    {
      name: 'name',
      label: 'Full name',
      type: 'text',
      required: true,
      autoComplete: 'name',
    },
    {
      name: 'email',
      label: 'Email address',
      type: 'email',
      required: true,
      autoComplete: 'email',
    },
    {
      name: 'organisation',
      label: 'Organisation',
      type: 'text',
      required: true,
      autoComplete: 'organization',
    },
    {
      name: 'role',
      label: 'Role / title',
      type: 'text',
      autoComplete: 'organization-title',
    },
    {
      name: 'country',
      label: 'Country',
      type: 'text',
      autoComplete: 'country-name',
    },
    {
      name: 'organisation_type',
      label: 'Organisation type',
      type: 'select',
      required: true,
      options: [
        'University',
        'Research institute',
        'Government',
        'International organisation',
        'Civil society organisation',
        'Development partner',
        'Technology institution',
        'Other',
      ],
    },
    {
      name: 'collaboration_area',
      label: 'Area of collaboration',
      type: 'select',
      required: true,
      options: [
        'Joint research and comparative policy studies',
        'Academic and institutional knowledge exchange',
        'AI governance framework development',
        'Research partnerships and collaborative publications',
        'International policy dialogue and expert contributions',
        'Responsible AI and institutional capacity initiatives',
        'Other',
      ],
    },
    {
      name: 'website',
      label: 'Organisation website (optional)',
      type: 'url',
    },
    {
      name: 'message',
      label: 'Message',
      type: 'textarea',
      required: true,
      rows: 6,
    },
  ],
};

export const CONTACT_FORM_CONFIG: EnquiryFormConfig = {
  id: 'contact',
  accessKey: FORMS.contact.key,
  subject: FORMS.contact.subject,
  pageTitle: 'Contact | Atlas AI Institute',
  eyebrow: 'CONTACT',
  heading: 'Connect With Atlas AI Institute',
  intro: 'Questions about Atlas research, publications, programmes, and initiatives.',
  sectionIndex: 'GENERAL ENQUIRY',
  headingId: 'contact-page-heading',
  submitLabel: 'Send enquiry',
  fields: [
    {
      name: 'name',
      label: 'Full name',
      type: 'text',
      required: true,
      autoComplete: 'name',
    },
    {
      name: 'email',
      label: 'Email address',
      type: 'email',
      required: true,
      autoComplete: 'email',
    },
    {
      name: 'topic',
      label: 'Topic',
      type: 'select',
      required: true,
      options: [
        'Research',
        'Publications',
        'Programmes',
        'Initiatives',
        'Other',
      ],
    },
    {
      name: 'message',
      label: 'Message',
      type: 'textarea',
      required: true,
      rows: 6,
    },
  ],
};
