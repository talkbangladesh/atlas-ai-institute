import { PUBLICATION_DEVELOPMENT } from '../data/siteContent';
import { Button } from '../components/Button';
import { FlowSteps } from '../components/FlowSteps';
import { NoteBox } from '../components/NoteBox';
import { SubpageLayout } from './SubpageLayout';

export function PublicationDevelopmentPage() {
  return (
    <SubpageLayout
      eyebrow={PUBLICATION_DEVELOPMENT.eyebrow}
      title={PUBLICATION_DEVELOPMENT.heading}
      intro={PUBLICATION_DEVELOPMENT.description}
      headingId="pub-dev-page-heading"
      sectionIndex="EDITORIAL PATHWAY"
    >
      <NoteBox className="mb-12 max-w-[68ch]">
        The sequence below describes a working system, not an accreditation or
        independent peer-review claim.
      </NoteBox>

      <div className="mb-12">
        <FlowSteps steps={PUBLICATION_DEVELOPMENT.steps} />
      </div>

      <div className="flex flex-wrap gap-4">
        <Button to="/publications/" variant="primary">
          Explore All Research &amp; Publications
        </Button>
        <Button to="/#contact" variant="ghost">
          Start a conversation
        </Button>
      </div>
    </SubpageLayout>
  );
}
