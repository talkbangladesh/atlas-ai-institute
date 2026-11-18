import { Link } from 'react-router-dom';
import {
  PUBLICATION_CARD_LABELS,
  PUBLICATIONS_HUB_CONTENT,
} from '../data/publications';
import { Eyebrow } from './Eyebrow';
import { NoteBox } from './NoteBox';

export interface CatalogEntry {
  id: string;
  title: string;
  description: string;
  paragraphs?: string[];
  url: string;
  year?: number;
  published?: string;
  label?: string;
  author?: string;
  publisher?: string;
  resourceType?: string;
  doi?: string;
  downloadUrl?: string;
  downloadLabel?: string;
  readLabel?: string;
  meta?: { label: string; value: string }[];
  note?: string;
  cover?: string;
}

interface PublicationListProps {
  items: readonly CatalogEntry[];
  emptyMessage?: string;
  recordLabel?: string;
}

export function PublicationList({
  items,
  emptyMessage = PUBLICATIONS_HUB_CONTENT.emptyMessage,
  recordLabel = PUBLICATIONS_HUB_CONTENT.recordLabel,
}: PublicationListProps) {
  if (items.length === 0) {
    return (
      <p className="text-[17px] leading-[1.7] text-[var(--muted)]">
        {emptyMessage}
      </p>
    );
  }

  return (
    <ol className="list-none p-0 m-0 border-t border-[var(--hair)]">
      {items.map((item) => {
        const isExternal = /^https?:\/\//i.test(item.url);
        const dateLabel = item.published || item.year;
        const metaLine = [item.label, dateLabel].filter(Boolean).join(' · ');
        const paragraphs = item.paragraphs ?? [item.description];
        const linkText = item.readLabel ?? recordLabel;

        return (
          <li key={item.id} className="py-8 border-b border-[var(--hair)]">
            <article className="flex flex-col md:flex-row gap-6 md:gap-8 items-start">
              {item.cover && (
                <div className="w-full md:w-36 shrink-0 aspect-[4/5] border border-[var(--hair)] bg-[var(--paper-deep)] overflow-hidden">
                  <img
                    src={item.cover}
                    alt={item.title}
                    loading="lazy"
                    decoding="async"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover block"
                  />
                </div>
              )}

              <div className="flex-1 min-w-0">
                {metaLine && (
                  <Eyebrow cobalt className="mb-3 tabular-nums">
                    {metaLine}
                  </Eyebrow>
                )}

                <h3 className="text-[24px] sm:text-[28px] leading-[1.18] font-semibold text-[var(--ink)] mb-3 hyphens-none [overflow-wrap:break-word]">
                  {item.title}
                </h3>

                <div className="flex flex-col gap-3.5 max-w-[65ch] mb-5">
                  {paragraphs.map((paragraph, idx) => (
                    <p
                      key={idx}
                      className="text-[17px] leading-[1.7] text-[var(--muted)]"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>

                {(item.publisher ||
                  item.author ||
                  item.doi ||
                  (item.meta && item.meta.length > 0)) && (
                  <dl className="m-0 mb-5 flex flex-wrap items-baseline gap-x-3 gap-y-1.5 font-[var(--font-mono)] text-[12px] leading-[1.55] text-[var(--muted)]">
                    {item.publisher && (
                      <div className="inline-flex items-baseline gap-1.5">
                        <dt>{PUBLICATION_CARD_LABELS.publisher}:</dt>
                        <dd className="m-0 text-[var(--ink)]">
                          {item.publisher}
                        </dd>
                      </div>
                    )}
                    {item.publisher && item.author && (
                      <span aria-hidden="true">·</span>
                    )}
                    {item.author && (
                      <div className="inline-flex items-baseline gap-1.5">
                        <dt>{PUBLICATION_CARD_LABELS.author}:</dt>
                        <dd className="m-0 text-[var(--ink)]">{item.author}</dd>
                      </div>
                    )}
                    {item.meta?.map((field) => (
                      <div
                        key={field.label}
                        className="inline-flex items-baseline gap-1.5"
                      >
                        <span aria-hidden="true">·</span>
                        <dt>{field.label}:</dt>
                        <dd className="m-0 text-[var(--ink)]">{field.value}</dd>
                      </div>
                    ))}
                    {(item.publisher || item.author) && item.doi && (
                      <span aria-hidden="true">·</span>
                    )}
                    {item.doi && (
                      <div className="inline-flex items-baseline gap-1.5 break-all">
                        <dt>{PUBLICATION_CARD_LABELS.doi}:</dt>
                        <dd className="m-0">
                          <a
                            href={`https://doi.org/${item.doi}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[var(--cobalt)] hover:text-[var(--ink)] underline underline-offset-2"
                          >
                            {item.doi}
                            <span className="sr-only">
                              {PUBLICATION_CARD_LABELS.opensNewTab}
                            </span>
                          </a>
                        </dd>
                      </div>
                    )}
                  </dl>
                )}

                {item.note && (
                  <NoteBox className="mb-6 max-w-[65ch]">{item.note}</NoteBox>
                )}

                <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
                  {isExternal ? (
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="atlas-inline-link inline-flex items-center gap-2 font-semibold text-[16px] text-[var(--cobalt)] hover:text-[var(--ink)] no-underline border-b border-[var(--cobalt)] hover:border-[var(--ink)] pb-0.5 transition-colors min-h-[44px]"
                    >
                      <span>{linkText}</span>
                      <span className="sr-only">
                        {PUBLICATION_CARD_LABELS.opensNewTab}
                      </span>
                      <span className="atlas-arrow" aria-hidden="true">
                        →
                      </span>
                    </a>
                  ) : (
                    <Link
                      to={item.url}
                      className="atlas-inline-link inline-flex items-center gap-2 font-semibold text-[16px] text-[var(--cobalt)] hover:text-[var(--ink)] no-underline border-b border-[var(--cobalt)] hover:border-[var(--ink)] pb-0.5 transition-colors min-h-[44px]"
                    >
                      <span>{linkText}</span>
                      <span className="atlas-arrow" aria-hidden="true">
                        →
                      </span>
                    </Link>
                  )}

                  {item.downloadUrl && item.downloadLabel && (
                    <a
                      href={item.downloadUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="atlas-inline-link inline-flex items-center gap-2 font-semibold text-[16px] text-[var(--ink)] hover:text-[var(--cobalt)] no-underline border-b border-[var(--ink)] hover:border-[var(--cobalt)] pb-0.5 transition-colors min-h-[44px]"
                    >
                      <span>{item.downloadLabel}</span>
                      <span className="sr-only">
                        {PUBLICATION_CARD_LABELS.opensNewTab}
                      </span>
                      <span className="atlas-arrow" aria-hidden="true">
                        →
                      </span>
                    </a>
                  )}
                </div>
              </div>
            </article>
          </li>
        );
      })}
    </ol>
  );
}
