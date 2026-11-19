import { INSIGHTS_CONTENT } from '../data/siteContent';
import { Button } from '../components/Button';
import { SubpageLayout } from './SubpageLayout';

export function InsightsPage() {
  return (
    <SubpageLayout
      eyebrow={INSIGHTS_CONTENT.eyebrow}
      title={INSIGHTS_CONTENT.heading}
      intro={INSIGHTS_CONTENT.description}
      headingId="insights-page-heading"
      sectionIndex="ARCHIVE"
      compactSpacing
    >
      <div className="flex flex-wrap gap-4">
        <Button to="/publications/" variant="primary">
          Explore All Research &amp; Publications
        </Button>
      </div>
    </SubpageLayout>
  );
}
