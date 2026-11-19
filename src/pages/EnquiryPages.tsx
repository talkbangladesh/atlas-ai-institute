import { useEffect } from 'react';
import {
  CAREERS_FORM_CONFIG,
  CONTACT_FORM_CONFIG,
  ENQUIRY_COPY,
  PARTNERSHIPS_FORM_CONFIG,
  type EnquiryFormConfig,
} from '../config/forms';
import { EnquiryForm } from '../components/EnquiryForm';
import { NoteBox } from '../components/NoteBox';
import { SubpageLayout } from './SubpageLayout';

function EnquiryPageTemplate({ config }: { config: EnquiryFormConfig }) {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = config.pageTitle;
    return () => {
      document.title = prevTitle;
    };
  }, [config.pageTitle]);

  return (
    <SubpageLayout
      eyebrow={config.eyebrow}
      title={config.heading}
      intro={config.intro}
      headingId={config.headingId}
      sectionIndex={config.sectionIndex}
    >
      <EnquiryForm config={config} />

      <NoteBox className="mt-10 max-w-[65ch]">
        {ENQUIRY_COPY.directEmailPrefix}{' '}
        <a
          href={`mailto:${ENQUIRY_COPY.directEmail}`}
          className="text-[var(--cobalt)] font-medium hover:underline"
        >
          {ENQUIRY_COPY.directEmail}
        </a>
        .
      </NoteBox>
    </SubpageLayout>
  );
}

export function CareersPage() {
  return <EnquiryPageTemplate config={CAREERS_FORM_CONFIG} />;
}

export function PartnershipsPage() {
  return <EnquiryPageTemplate config={PARTNERSHIPS_FORM_CONFIG} />;
}

export function ContactPage() {
  return <EnquiryPageTemplate config={CONTACT_FORM_CONFIG} />;
}
