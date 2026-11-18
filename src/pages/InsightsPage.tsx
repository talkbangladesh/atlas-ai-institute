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
    >
      <div className="bg-[var(--white)] border border-[var(--hair)] border-t-2 border-t-[var(--ink)] p-6 sm:p-8 max-w-[68ch] mb-10">
        <p className="text-[17px] leading-[1.7] text-[var(--muted)]">
          {INSIGHTS_CONTENT.description}
        </p>
      </div>

      <div className="flex flex-wrap gap-4">
        <Button to="/publications/" variant="primary">
          Explore All Research &amp; Publications
        </Button>
        <Button to="/research/" variant="ghost">
          Explore Research
        </Button>
      </div>
    </SubpageLayout>
  );
}
