import { PROGRAMMES_CONTENT } from '../data/siteContent';
import { Card } from './Card';
import { Eyebrow } from './Eyebrow';

export function LearningDevelopmentSection() {
  const eyebrow = PROGRAMMES_CONTENT.eyebrow.replace(/^\d+\s*\/\s*/, '');

  return (
    <section
      id="learning-development"
      aria-labelledby="learning-development-heading"
      className="mt-16 scroll-mt-24 border-t-2 border-[var(--ink)] pt-8"
    >
      <Eyebrow cobalt className="mb-4">
        {eyebrow}
      </Eyebrow>
      <h2 id="learning-development-heading" className="mb-5">
        {PROGRAMMES_CONTENT.heading}
      </h2>
      <p className="atlas-lead mb-12">{PROGRAMMES_CONTENT.description}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {PROGRAMMES_CONTENT.cards.map((card) => (
          <Card key={card.index} to={card.to}>
            <div>
              <span className="atlas-eyebrow text-[var(--cobalt)] block mb-3 tabular-nums">
                {card.index}
              </span>
              <h3 className="atlas-card-title mb-3 text-[var(--ink)]">
                {card.title}
              </h3>
              <p className="text-[16px] leading-[1.65] text-[var(--muted)] mb-8">
                {card.description}
              </p>
            </div>
            <span className="mt-auto inline-flex items-center gap-2 font-[var(--font-mono)] text-[12px] uppercase tracking-[0.1em] text-[var(--ink)] group-hover:text-[var(--cobalt)] transition-colors">
              <span>Read more</span>
              <span className="atlas-arrow" aria-hidden="true">
                →
              </span>
            </span>
          </Card>
        ))}
      </div>
    </section>
  );
}
