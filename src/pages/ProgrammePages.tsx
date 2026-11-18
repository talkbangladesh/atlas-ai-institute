import { PROGRAMMES_CONTENT } from '../data/siteContent';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { SubpageLayout } from './SubpageLayout';

export function AiForGoodPage() {
  const programme = PROGRAMMES_CONTENT.cards[0];

  return (
    <SubpageLayout
      eyebrow={PROGRAMMES_CONTENT.eyebrow}
      title={programme.title}
      intro={programme.description}
      headingId="ai-for-good-heading"
      sectionIndex="01 / PROGRAMME"
    >
      <Card className="mb-8 max-w-[68ch]">
        <span className="atlas-eyebrow text-[var(--cobalt)] block mb-3">
          {programme.index}
        </span>
        <h2 className="text-[24px] font-semibold text-[var(--ink)] mb-4">
          {programme.title}
        </h2>
        <p className="text-[17px] leading-[1.7] text-[var(--muted)]">
          {programme.description}
        </p>
      </Card>

      <div className="flex flex-wrap gap-4">
        <Button to="/#programmes" variant="ghost">
          All Programmes
        </Button>
        <Button to="/#contact" variant="primary">
          Institutional Collaboration
        </Button>
      </div>
    </SubpageLayout>
  );
}

export function AiEducationPage() {
  const programme = PROGRAMMES_CONTENT.cards[1];

  return (
    <SubpageLayout
      eyebrow={PROGRAMMES_CONTENT.eyebrow}
      title={programme.title}
      intro={programme.description}
      headingId="ai-education-heading"
      sectionIndex="02 / PROGRAMME"
    >
      <Card className="mb-8 max-w-[68ch]">
        <span className="atlas-eyebrow text-[var(--cobalt)] block mb-3">
          {programme.index}
        </span>
        <h2 className="text-[24px] font-semibold text-[var(--ink)] mb-4">
          {programme.title}
        </h2>
        <p className="text-[17px] leading-[1.7] text-[var(--muted)]">
          {programme.description}
        </p>
      </Card>

      <div className="flex flex-wrap gap-4">
        <Button to="/#programmes" variant="ghost">
          All Programmes
        </Button>
        <Button to="/#contact" variant="primary">
          Institutional Collaboration
        </Button>
      </div>
    </SubpageLayout>
  );
}
