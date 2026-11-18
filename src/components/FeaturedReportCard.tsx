import { useId, useState } from 'react';
import {
  getFeaturedPublication,
  PUBLICATION_CARD_LABELS,
  type Publication,
} from '../data/publications';
import { Card } from './Card';
import { Eyebrow } from './Eyebrow';
import { NoteBox } from './NoteBox';

interface FeaturedReportCardProps {
  report?: Publication;
  variant?: 'homepage' | 'reports';
}

export function FeaturedReportCard({
  report: propReport,
  variant = 'homepage',
}: FeaturedReportCardProps) {
  const report = propReport ?? getFeaturedPublication();
  const [isExpanded, setIsExpanded] = useState(false);
  const extraParagraphsId = useId();
  if (!report) return null;

  const dateText = report.published || report.year;
  const categoryText = [report.label, dateText].filter(Boolean).join(' · ');
  const paragraphs = report.paragraphs ?? [report.description];
  const readLabel = report.readLabel ?? PUBLICATION_CARD_LABELS.readFullReport;

  return (
    <Card className="atlas-featured-report-card p-0 overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-12">
        {/* Library catalogue typographic cover plate */}
        <div className="atlas-featured-cover lg:col-span-5 p-6 sm:p-8 flex">
          <div className="atlas-featured-cover-frame w-full border border-white/25 p-6 flex flex-col justify-between min-h-[280px]">
            <div className="flex items-center justify-between gap-4 border-b border-white/20 pb-4">
              <span className="font-[var(--font-mono)] text-[11px] uppercase tracking-[0.1em] text-[var(--footer-muted)]">
                ATLAS AI INSTITUTE
              </span>
              <span className="font-[var(--font-mono)] text-[11px] uppercase tracking-[0.1em] text-[var(--white)] tabular-nums">
                {report.year}
              </span>
            </div>

            <div className="my-8">
              <p className="atlas-featured-cover-title font-[var(--font-serif)] font-bold text-[clamp(26px,2.4vw,34px)] leading-[1.1] tracking-[-0.03em] text-[var(--white)]">
                {report.coverTitle ?? report.title}
              </p>
            </div>

            <div className="border-t border-white/20 pt-4">
              <span className="font-[var(--font-mono)] text-[11px] uppercase tracking-[0.1em] text-[var(--footer-muted)]">
                {categoryText}
              </span>
            </div>
          </div>
        </div>

        {/* Catalogue entry metadata */}
        <div className="atlas-featured-report-content lg:col-span-7 p-6 sm:p-8 lg:p-9 flex flex-col justify-between gap-6 min-w-0">
          <div>
            <Eyebrow cobalt className="mb-3 tabular-nums">
              {categoryText}
            </Eyebrow>
            <h3 className="atlas-featured-report-title text-[24px] sm:text-[28px] leading-[1.18] font-semibold text-[var(--ink)] mb-4 hyphens-none [overflow-wrap:break-word]">
              {report.title}
            </h3>

            <div className="atlas-featured-paragraphs flex flex-col gap-3.5 mb-6">
              {paragraphs[0] && (
                <p className="atlas-featured-paragraph text-[16px] sm:text-[17px] leading-[1.7] text-[var(--muted)]">
                  {paragraphs[0]}
                </p>
              )}
              {paragraphs.length > 1 && (
                <div
                  id={extraParagraphsId}
                  className={`atlas-featured-extra-paragraphs${isExpanded ? ' is-expanded' : ''}`}
                >
                  {paragraphs.slice(1).map((paragraph, idx) => (
                    <p
                      key={idx + 1}
                      className="atlas-featured-paragraph text-[16px] sm:text-[17px] leading-[1.7] text-[var(--muted)]"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              )}
            </div>

            {paragraphs.length > 1 && (
              <button
                type="button"
                className="atlas-featured-read-more"
                aria-controls={extraParagraphsId}
                aria-expanded={isExpanded}
                onClick={() => setIsExpanded((expanded) => !expanded)}
              >
                {isExpanded ? 'Show less ↑' : 'Read more ↓'}
              </button>
            )}

            {report.highlights && report.highlights.length > 0 && (
              <dl className="atlas-featured-stats m-0 mb-6 py-4 border-t border-b border-[var(--hair)] grid grid-cols-1 sm:grid-cols-3 gap-5">
                {report.highlights.map((item) => (
                  <div key={item.label} className="atlas-featured-stat min-w-0">
                    <dt className="atlas-featured-stat-value font-[var(--font-serif)] font-bold text-[clamp(28px,2.8vw,38px)] leading-[1.05] tracking-[-0.03em] text-[var(--cobalt)] tabular-nums mb-1">
                      {item.value}
                    </dt>
                    <dd className="atlas-featured-stat-label m-0 font-[var(--font-mono)] text-[11px] uppercase tracking-[0.1em] text-[var(--muted)]">
                      {item.label}
                    </dd>
                  </div>
                ))}
              </dl>
            )}

            {(report.author ||
              report.publisher ||
              report.published ||
              report.resourceType ||
              report.doi) && (
              <dl className="atlas-featured-metadata m-0 mb-6 flex flex-wrap items-baseline gap-x-4 gap-y-1.5 font-[var(--font-mono)] text-[12px] leading-[1.55] text-[var(--muted)]">
                {report.author && (
                  <div className="atlas-featured-meta-item inline-flex items-baseline gap-1.5">
                    <dt>{PUBLICATION_CARD_LABELS.author}:</dt>
                    <dd className="m-0 text-[var(--ink)]">{report.author}</dd>
                  </div>
                )}
                {report.publisher && (
                  <div className="atlas-featured-meta-item inline-flex items-baseline gap-1.5">
                    <dt>{PUBLICATION_CARD_LABELS.publisher}:</dt>
                    <dd className="m-0 text-[var(--ink)]">
                      {report.publisher}
                    </dd>
                  </div>
                )}
                {report.published && (
                  <div className="atlas-featured-meta-item inline-flex items-baseline gap-1.5">
                    <dt>{PUBLICATION_CARD_LABELS.published}:</dt>
                    <dd className="m-0 text-[var(--ink)]">
                      {report.published}
                    </dd>
                  </div>
                )}
                {report.resourceType && (
                  <div className="atlas-featured-meta-item inline-flex items-baseline gap-1.5">
                    <dt>{PUBLICATION_CARD_LABELS.resourceType}:</dt>
                    <dd className="m-0 text-[var(--ink)]">
                      {report.resourceType}
                    </dd>
                  </div>
                )}
                {report.doi && (
                  <div className="atlas-featured-meta-item atlas-featured-meta-doi inline-flex items-baseline gap-1.5 break-all">
                    <dt>{PUBLICATION_CARD_LABELS.doi}:</dt>
                    <dd className="m-0">
                      <a
                        href={`https://doi.org/${report.doi}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[var(--cobalt)] hover:text-[var(--ink)] underline underline-offset-2"
                      >
                        {report.doi}
                        <span className="sr-only">
                          {PUBLICATION_CARD_LABELS.opensNewTab}
                        </span>
                      </a>
                    </dd>
                  </div>
                )}
              </dl>
            )}

            {report.note && <NoteBox mobileCompact>{report.note}</NoteBox>}
          </div>

          <div className="atlas-pub-actions atlas-featured-pub-actions pt-2 flex flex-col sm:flex-row sm:flex-wrap gap-3">
            {variant === 'reports' ? (
              <>
                <a
                  href={report.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="atlas-btn atlas-btn-primary"
                >
                  <span>{readLabel}</span>
                  <span className="sr-only">
                    {PUBLICATION_CARD_LABELS.opensNewTab}
                  </span>
                  <span className="atlas-arrow" aria-hidden="true">
                    →
                  </span>
                </a>
                {report.downloadUrl && report.downloadLabel && (
                  <a
                    href={report.downloadUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="atlas-btn atlas-btn-ghost"
                  >
                    <span>{report.downloadLabel}</span>
                    <span className="sr-only">
                      {PUBLICATION_CARD_LABELS.opensNewTab}
                    </span>
                    <span className="atlas-arrow" aria-hidden="true">
                      →
                    </span>
                  </a>
                )}
              </>
            ) : (
              <a
                href={report.url}
                target="_blank"
                rel="noopener noreferrer"
                className="atlas-btn atlas-btn-ghost"
              >
                <span>{readLabel}</span>
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
      </div>
    </Card>
  );
}
