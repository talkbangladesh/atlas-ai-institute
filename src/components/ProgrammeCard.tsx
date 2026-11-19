import { Button } from './Button';
import type { EducationProgramme } from '../data/aiEducation';
import { ATLAS_AI_EDUCATION_URL } from '../data/aiEducation';

interface ProgrammeCardProps {
  programme: EducationProgramme;
}

export function ProgrammeCard({ programme }: ProgrammeCardProps) {
  const isFeatured = programme.variant === 'featured';
  const titleId = `education-programme-${programme.title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')}`;

  return (
    <article
      aria-labelledby={titleId}
      className="atlas-education-programme-card flex h-full min-w-0 flex-col"
    >
      <div className="mb-4 flex items-center justify-between gap-4">
        {isFeatured ? (
          <span className="inline-flex min-h-8 items-center border border-[var(--cobalt)] bg-[var(--paper-deep)] px-3 font-[var(--font-mono)] text-[11px] tracking-[0.03em] text-[var(--ink)]">
            Featured
          </span>
        ) : (
          <span className="font-[var(--font-mono)] text-[12px] uppercase tracking-[0.12em] text-[var(--muted)] tabular-nums">
            {programme.number}
          </span>
        )}
      </div>

      <h3
        id={titleId}
        className={`mb-3 font-[var(--font-serif)] font-semibold leading-[1.16] tracking-[-0.025em] text-[var(--ink)] ${
          isFeatured ? 'text-[25px] sm:text-[28px]' : 'text-[22px] sm:text-[24px]'
        }`}
      >
        {programme.title}
      </h3>

      <p className="mb-5 text-[16px] leading-[1.6] text-[var(--muted)]">
        {programme.description}
      </p>

      {isFeatured && programme.format && programme.languages && (
        <ul
          aria-label="Programme format and language"
          className="mb-6 mt-auto flex flex-wrap gap-x-3 gap-y-1 border-t border-[var(--hair)] pt-4 font-[var(--font-mono)] text-[12px] leading-[1.5] tracking-[0.02em] text-[var(--muted)]"
        >
          <li>{programme.format}</li>
          <li aria-hidden="true" className="text-[var(--ink)]">
            ·
          </li>
          <li>{programme.languages}</li>
        </ul>
      )}

      <Button
        href={ATLAS_AI_EDUCATION_URL}
        external
        ariaLabel={`View full programme: ${programme.title}`}
        className="w-full sm:w-auto"
      >
        View Full Programme
      </Button>
    </article>
  );
}
