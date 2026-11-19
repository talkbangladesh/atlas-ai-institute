import {
  getCategoryCount,
  getLatestPublications,
  PUBLICATIONS_HUB_CONTENT,
} from '../data/publications';
import { Card } from '../components/Card';
import { ResourceCard } from '../components/ResourceCard';
import { SubpageLayout } from './SubpageLayout';

export function PublicationsPage() {
  const latestItems = getLatestPublications();

  return (
    <SubpageLayout
      eyebrow={PUBLICATIONS_HUB_CONTENT.eyebrow}
      title={PUBLICATIONS_HUB_CONTENT.title}
      intro={PUBLICATIONS_HUB_CONTENT.intro}
      headingId="publications-page-heading"
      sectionIndex={PUBLICATIONS_HUB_CONTENT.sectionIndex}
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
        {PUBLICATIONS_HUB_CONTENT.sections.map((section) => {
          const count = getCategoryCount(section.categoryKey);
          const countLabel =
            count === 1
              ? PUBLICATIONS_HUB_CONTENT.countSingular
              : PUBLICATIONS_HUB_CONTENT.countPlural;

          return (
            <Card key={section.index} to={section.to}>
              <div>
                <div className="flex items-baseline justify-between gap-3 mb-3">
                  <span className="atlas-eyebrow text-[var(--cobalt)] tabular-nums">
                    {section.index}
                  </span>
                  <span className="font-[var(--font-mono)] text-[11px] uppercase tracking-[0.1em] text-[var(--muted)] tabular-nums">
                    {count} {countLabel}
                  </span>
                </div>
                <h2 className="atlas-card-title text-[26px] leading-[1.2] font-semibold text-[var(--ink)] mb-3">
                  {section.title}
                </h2>
                <p className="text-[16px] leading-[1.65] text-[var(--muted)] mb-8">
                  {section.description}
                </p>
              </div>
              <span className="mt-auto inline-flex items-center gap-2 font-[var(--font-mono)] text-[12px] uppercase tracking-[0.1em] text-[var(--ink)] group-hover:text-[var(--cobalt)] transition-colors">
                <span>{section.ctaLabel}</span>
                <span className="atlas-arrow" aria-hidden="true">
                  →
                </span>
              </span>
            </Card>
          );
        })}
      </div>

      <div>
        <h2 className="text-[28px] leading-[1.2] font-semibold text-[var(--ink)] mb-6">
          {PUBLICATIONS_HUB_CONTENT.latestHeading}
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-[16px] lg:gap-[20px] items-stretch">
          {latestItems.map((item) => (
            <ResourceCard
              key={item.id}
              item={item}
              kind={item.category ?? 'report'}
            />
          ))}
        </div>
      </div>
    </SubpageLayout>
  );
}
