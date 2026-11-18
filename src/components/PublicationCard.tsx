import {
  PUBLICATION_CARD_LABELS,
  type Publication,
} from '../data/publications';
import { Eyebrow } from './Eyebrow';
import { NoteBox } from './NoteBox';

interface PublicationCardProps {
  publication: Publication;
}

export function PublicationCard({ publication }: PublicationCardProps) {
  const dateText = publication.published || publication.year;
  const metaHeader = [publication.label, dateText].filter(Boolean).join(' · ');
  const paragraphs = publication.paragraphs ?? [publication.description];
  const readButtonLabel =
    publication.readLabel ?? PUBLICATION_CARD_LABELS.readMore;

  const hasMetadata = Boolean(
    publication.author ||
      publication.publisher ||
      publication.published ||
      publication.resourceType ||
      publication.doi ||
      (publication.meta && publication.meta.length > 0)
  );

  return (
    <article className="atlas-card h-full flex flex-col justify-between gap-7">
      <div className="min-w-0">
        {metaHeader && (
          <Eyebrow cobalt className="mb-3 tabular-nums">
            {metaHeader}
          </Eyebrow>
        )}

        <h3 className="atlas-card-title font-[var(--font-serif)] font-semibold text-[22px] sm:text-[24px] leading-[1.22] tracking-[-0.025em] text-[var(--ink)] mb-4 hyphens-none [overflow-wrap:break-word]">
          {publication.title}
        </h3>

        <div className="flex flex-col gap-3.5 mb-5">
          {paragraphs.map((paragraph, idx) => (
            <p
              key={idx}
              className="text-[16px] leading-[1.68] text-[var(--muted)]"
            >
              {paragraph}
            </p>
          ))}
        </div>

        {publication.highlights && publication.highlights.length > 0 && (
          <dl className="m-0 mb-5 py-4 border-t border-b border-[var(--hair)] grid grid-cols-1 sm:grid-cols-2 gap-4">
            {publication.highlights.map((item) => (
              <div key={item.label} className="min-w-0">
                <dt className="font-[var(--font-serif)] font-bold text-[clamp(28px,2.8vw,36px)] leading-[1.05] tracking-[-0.03em] text-[var(--cobalt)] tabular-nums mb-1">
                  {item.value}
                </dt>
                <dd className="m-0 font-[var(--font-mono)] text-[11px] uppercase tracking-[0.1em] text-[var(--muted)]">
                  {item.label}
                </dd>
              </div>
            ))}
          </dl>
        )}

        {hasMetadata && (
          <dl className="m-0 pt-4 border-t border-[var(--hair)] flex flex-wrap items-baseline gap-x-4 gap-y-1.5 font-[var(--font-mono)] text-[12px] leading-[1.55] text-[var(--muted)]">
            {publication.author && (
              <div className="inline-flex items-baseline gap-1.5">
                <dt>{PUBLICATION_CARD_LABELS.author}:</dt>
                <dd className="m-0 text-[var(--ink)]">{publication.author}</dd>
              </div>
            )}
            {publication.publisher && (
              <div className="inline-flex items-baseline gap-1.5">
                <dt>{PUBLICATION_CARD_LABELS.publisher}:</dt>
                <dd className="m-0 text-[var(--ink)]">
                  {publication.publisher}
                </dd>
              </div>
            )}
            {publication.published && (
              <div className="inline-flex items-baseline gap-1.5">
                <dt>{PUBLICATION_CARD_LABELS.published}:</dt>
                <dd className="m-0 text-[var(--ink)]">
                  {publication.published}
                </dd>
              </div>
            )}
            {publication.resourceType && (
              <div className="inline-flex items-baseline gap-1.5">
                <dt>{PUBLICATION_CARD_LABELS.resourceType}:</dt>
                <dd className="m-0 text-[var(--ink)]">
                  {publication.resourceType}
                </dd>
              </div>
            )}
            {publication.meta?.map((field) => (
              <div
                key={field.label}
                className="inline-flex items-baseline gap-1.5"
              >
                <dt>{field.label}:</dt>
                <dd className="m-0 text-[var(--ink)]">{field.value}</dd>
              </div>
            ))}
            {publication.doi && (
              <div className="inline-flex items-baseline gap-1.5 break-all">
                <dt>{PUBLICATION_CARD_LABELS.doi}:</dt>
                <dd className="m-0">
                  <a
                    href={`https://doi.org/${publication.doi}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[var(--cobalt)] hover:text-[var(--ink)] underline underline-offset-2"
                  >
                    {publication.doi}
                    <span className="sr-only">
                      {PUBLICATION_CARD_LABELS.opensNewTab}
                    </span>
                  </a>
                </dd>
              </div>
            )}
          </dl>
        )}

        {publication.note && (
          <NoteBox className="mt-5">{publication.note}</NoteBox>
        )}
      </div>

      <div className="atlas-pub-actions mt-auto pt-2 flex flex-col sm:flex-row sm:flex-wrap gap-3">
        <a
          href={publication.url}
          target="_blank"
          rel="noopener noreferrer"
          className="atlas-btn atlas-btn-ghost"
        >
          <span>{readButtonLabel}</span>
          <span className="sr-only">{PUBLICATION_CARD_LABELS.opensNewTab}</span>
          <span className="atlas-arrow" aria-hidden="true">
            →
          </span>
        </a>

        {publication.downloadUrl && publication.downloadLabel && (
          <a
            href={publication.downloadUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="atlas-btn atlas-btn-primary"
          >
            <span>{publication.downloadLabel}</span>
            <span className="sr-only">{PUBLICATION_CARD_LABELS.opensNewTab}</span>
            <span className="atlas-arrow" aria-hidden="true">
              →
            </span>
          </a>
        )}
      </div>
    </article>
  );
}
