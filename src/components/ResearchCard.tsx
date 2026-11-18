import {
  RESEARCH_CARD_LABELS,
  type ResearchPublication,
} from '../data/publications';
import { Eyebrow } from './Eyebrow';

function ResearchMetadata({ item }: { item: ResearchPublication }) {
  return (
    <dl className="m-0 pt-4 border-t border-[var(--hair)] flex flex-col gap-1.5 font-[var(--font-mono)] text-[12px] leading-[1.55] text-[var(--muted)]">
      <div>
        <dt className="inline">{RESEARCH_CARD_LABELS.authors}: </dt>
        <dd className="inline m-0 font-[var(--font-sans)] text-[14px] text-[var(--ink)]">
          {item.authors}
        </dd>
      </div>

      {item.affiliation && (
        <div>
          <dt className="inline">{RESEARCH_CARD_LABELS.affiliation}: </dt>
          <dd className="inline m-0 font-[var(--font-sans)] text-[14px] text-[var(--ink)]">
            {item.affiliation}
          </dd>
        </div>
      )}

      <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
        <div>
          <dt className="inline">{RESEARCH_CARD_LABELS.published}: </dt>
          <dd className="inline m-0 text-[var(--ink)]">{item.published}</dd>
        </div>

        {item.researchType && (
          <div>
            <dt className="inline">{RESEARCH_CARD_LABELS.type}: </dt>
            <dd className="inline m-0 text-[var(--ink)]">
              {item.researchType}
            </dd>
          </div>
        )}

        {item.reference?.map((ref) => (
          <div key={ref.label}>
            <dt className="inline">{ref.label}: </dt>
            <dd className="inline m-0 text-[var(--ink)]">{ref.value}</dd>
          </div>
        ))}
      </div>

      {item.doi && (
        <div className="break-all">
          <dt className="inline">{RESEARCH_CARD_LABELS.doi}: </dt>
          <dd className="inline m-0">
            <a
              href={`https://doi.org/${item.doi}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--cobalt)] hover:text-[var(--ink)] underline underline-offset-2"
            >
              {item.doi}
              <span className="sr-only">
                {RESEARCH_CARD_LABELS.opensNewTab}
              </span>
            </a>
          </dd>
        </div>
      )}
    </dl>
  );
}

export function FeaturedResearchBlock({
  item,
}: {
  item: ResearchPublication;
}) {
  return (
    <article className="atlas-card">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
        <div className="lg:col-span-7 min-w-0">
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-4">
            <Eyebrow cobalt>
              {item.featuredEyebrow ?? RESEARCH_CARD_LABELS.priorityLabel}
            </Eyebrow>
            <span aria-hidden="true" className="text-[var(--muted)]">
              ·
            </span>
            <span className="font-[var(--font-mono)] text-[11px] uppercase tracking-[0.1em] text-[var(--muted)]">
              {item.category}
            </span>
          </div>

          <h3 className="atlas-card-title font-[var(--font-serif)] font-semibold text-[clamp(24px,2.5vw,32px)] leading-[1.16] tracking-[-0.025em] text-[var(--ink)] mb-5 hyphens-none [overflow-wrap:break-word]">
            {item.title}
          </h3>

          <div className="flex flex-col gap-4 mb-6">
            {item.description.map((paragraph, idx) => (
              <p
                key={idx}
                className="text-[16px] sm:text-[17px] leading-[1.7] text-[var(--muted)]"
              >
                {paragraph}
              </p>
            ))}
          </div>

          <ResearchMetadata item={item} />
        </div>

        <div className="lg:col-span-5 flex flex-col gap-5">
          <div className="atlas-research-cover p-6 sm:p-7">
            <div className="border border-white/25 p-6 flex flex-col justify-between min-h-[240px]">
              <span className="font-[var(--font-mono)] text-[11px] uppercase tracking-[0.1em] text-[var(--footer-muted)]">
                {item.published}
              </span>

              <p className="font-[var(--font-serif)] font-bold text-[clamp(26px,2.4vw,34px)] leading-[1.1] tracking-[-0.03em] text-[var(--white)] my-8">
                {item.coverShortTitle ?? item.title}
              </p>

              <span className="border-t border-white/20 pt-4 font-[var(--font-mono)] text-[11px] uppercase tracking-[0.1em] text-[var(--footer-muted)]">
                {item.coverCaption ?? item.researchType}
              </span>
            </div>
          </div>

          <div className="atlas-pub-actions flex flex-col gap-3">
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="atlas-btn atlas-btn-primary w-full"
            >
              <span>{RESEARCH_CARD_LABELS.readResearch}</span>
              <span className="sr-only">
                {RESEARCH_CARD_LABELS.opensNewTab}
              </span>
              <span className="atlas-arrow" aria-hidden="true">
                →
              </span>
            </a>

            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="atlas-btn atlas-btn-ghost w-full"
            >
              <span>{RESEARCH_CARD_LABELS.accessFullText}</span>
              <span className="sr-only">
                {RESEARCH_CARD_LABELS.opensNewTab}
              </span>
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}

export function ResearchCard({ item }: { item: ResearchPublication }) {
  const isLead = item.tier === 'lead';
  const visibleCount = isLead ? 2 : 1;
  const visibleParagraphs = item.description.slice(0, visibleCount);
  const hiddenParagraphs = item.description.slice(visibleCount);

  const showSeparateType =
    item.researchType &&
    (!item.statusTag ||
      item.researchType.toUpperCase() !== item.statusTag.toUpperCase());

  const monoMetaLine = [
    showSeparateType ? item.researchType : undefined,
    item.published,
  ]
    .filter(Boolean)
    .join(' · ');

  return (
    <article
      className={`atlas-card h-full flex flex-col justify-between gap-6 ${
        isLead ? 'sm:p-8' : ''
      }`}
    >
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-2.5 mb-3">
          {item.statusTag && (
            <span className="font-[var(--font-mono)] text-[11px] font-medium uppercase tracking-[0.1em] text-[var(--ink)] bg-[var(--paper-deep)] border border-[var(--hair)] px-2 py-0.5">
              {item.statusTag}
            </span>
          )}
          {monoMetaLine && (
            <Eyebrow cobalt className="tabular-nums">
              {monoMetaLine}
            </Eyebrow>
          )}
        </div>

        <h3
          className={`atlas-card-title font-[var(--font-serif)] font-semibold tracking-[-0.025em] text-[var(--ink)] mb-4 hyphens-none [overflow-wrap:break-word] ${
            isLead
              ? 'text-[22px] sm:text-[25px] leading-[1.2]'
              : 'text-[20px] sm:text-[22px] leading-[1.24]'
          }`}
        >
          {item.title}
        </h3>

        <div className="flex flex-col gap-3.5 mb-4">
          {visibleParagraphs.map((paragraph, idx) => (
            <p
              key={idx}
              className="text-[16px] leading-[1.68] text-[var(--muted)]"
            >
              {paragraph}
            </p>
          ))}
        </div>

        {hiddenParagraphs.length > 0 && (
          <details className="mb-5 border-t border-[var(--hair)] pt-3">
            <summary className="cursor-pointer font-[var(--font-mono)] text-[12px] uppercase tracking-[0.1em] text-[var(--cobalt)] hover:text-[var(--ink)] py-1.5 select-none">
              {RESEARCH_CARD_LABELS.readFullDescription}
            </summary>
            <div className="mt-3 flex flex-col gap-3">
              {hiddenParagraphs.map((paragraph, idx) => (
                <p
                  key={idx}
                  className="text-[16px] leading-[1.68] text-[var(--muted)]"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </details>
        )}

        {item.highlights && item.highlights.length > 0 && (
          <p className="font-[var(--font-mono)] text-[11px] uppercase tracking-[0.08em] text-[var(--cobalt)] border-t border-[var(--hair)] pt-3 mb-4 tabular-nums">
            {item.highlights.join(' · ')}
          </p>
        )}

        <ResearchMetadata item={item} />
      </div>

      <div className="atlas-pub-actions mt-auto pt-2 flex flex-col sm:flex-row sm:flex-wrap gap-3">
        <a
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          className="atlas-btn atlas-btn-primary"
        >
          <span>{RESEARCH_CARD_LABELS.readResearch}</span>
          <span className="sr-only">{RESEARCH_CARD_LABELS.opensNewTab}</span>
          <span className="atlas-arrow" aria-hidden="true">
            →
          </span>
        </a>

        <a
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          className="atlas-btn atlas-btn-ghost"
        >
          <span>{RESEARCH_CARD_LABELS.accessFullText}</span>
          <span className="sr-only">{RESEARCH_CARD_LABELS.opensNewTab}</span>
        </a>
      </div>
    </article>
  );
}
