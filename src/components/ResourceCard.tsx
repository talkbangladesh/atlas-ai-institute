import { useId, useState } from 'react';
import {
  PUBLICATION_CARD_LABELS,
  RESEARCH_CARD_LABELS,
  RESOURCE_CARD_LABELS,
  type Publication,
  type ResearchPublication,
} from '../data/publications';

type ResourceKind = 'report' | 'research' | 'framework';
type ResourceItem = Publication | ResearchPublication;

interface ResourceCardProps {
  item: ResourceItem;
  kind: ResourceKind;
  featuredReport?: boolean;
}

interface ResourceField {
  label: string;
  value: string;
  href?: string;
}

function isResearchPublication(
  item: ResourceItem
): item is ResearchPublication {
  return Array.isArray(item.description);
}

function splitTitle(title: string) {
  const colonIndex = title.indexOf(':');
  if (colonIndex < 0) return { main: title, subtitle: '' };

  return {
    main: title.slice(0, colonIndex).trim(),
    subtitle: title.slice(colonIndex + 1).trim(),
  };
}

function ResourceNotice({ text }: { text: string }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const noticeId = useId();

  return (
    <aside
      aria-label="Research coverage notice"
      className="border border-[var(--hair)] border-l-4 border-l-[var(--cobalt)] bg-[var(--white)] px-4 py-3"
    >
      <span className="mb-1 block font-[var(--font-mono)] text-[10px] font-medium uppercase tracking-[0.1em] text-[var(--cobalt)]">
        Note
      </span>
      <p
        id={noticeId}
        className={`m-0 text-[14px] leading-[1.5] text-[var(--muted)] ${
          isExpanded ? '' : 'line-clamp-2'
        }`}
      >
        {text}
      </p>
      <button
        type="button"
        className="mt-1 inline-flex min-h-[44px] items-center underline underline-offset-2 text-[13px] font-medium text-[var(--cobalt)] hover:text-[var(--ink)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--cobalt)]"
        aria-controls={noticeId}
        aria-expanded={isExpanded}
        onClick={() => setIsExpanded((expanded) => !expanded)}
      >
        {isExpanded
          ? RESOURCE_CARD_LABELS.readNoteLess
          : RESOURCE_CARD_LABELS.readNoteMore}
      </button>
    </aside>
  );
}

export function ResourceCard({
  item,
  kind,
  featuredReport = false,
}: ResourceCardProps) {
  const [detailsExpanded, setDetailsExpanded] = useState(false);
  const detailsId = useId();
  const isResearch = isResearchPublication(item);
  const titleParts = splitTitle(item.title);
  const publishedText = item.published || String(item.year);
  const description = isResearch
    ? item.description.join(' ')
    : (item.paragraphs ?? [item.description]).join(' ');

  const primaryFields: ResourceField[] = [];
  const extraFields: ResourceField[] = [];

  if (isResearch) {
    primaryFields.push({
      label: RESEARCH_CARD_LABELS.authors,
      value: item.authors,
    });
    if (item.affiliation) {
      extraFields.push({
        label: RESEARCH_CARD_LABELS.affiliation,
        value: item.affiliation,
      });
    }
    if (item.researchType) {
      extraFields.push({
        label: PUBLICATION_CARD_LABELS.resourceType,
        value: item.researchType,
      });
    }
    if (item.statusTag) {
      extraFields.push({ label: 'Status', value: item.statusTag });
    }
    item.reference?.forEach((reference) => {
      extraFields.push(reference);
    });
    if (item.highlights?.length) {
      extraFields.push({
        label: 'Highlights',
        value: item.highlights.join(' · '),
      });
    }
  } else {
    if (item.author) {
      primaryFields.push({
        label: PUBLICATION_CARD_LABELS.author,
        value: item.author,
      });
    }
    if (item.publisher) {
      extraFields.push({
        label: PUBLICATION_CARD_LABELS.publisher,
        value: item.publisher,
      });
    }
    if (item.resourceType) {
      extraFields.push({
        label: PUBLICATION_CARD_LABELS.resourceType,
        value: item.resourceType,
      });
    }
    item.meta?.forEach((field) => extraFields.push(field));
  }

  if (item.doi) {
    primaryFields.push({
      label: PUBLICATION_CARD_LABELS.doi,
      value: item.doi,
      href: `https://doi.org/${item.doi}`,
    });
  }

  const reportItem = isResearch ? undefined : item;
  const highlights = reportItem?.highlights ?? [];
  const note = reportItem?.note;
  const downloadUrl = kind === 'report' ? reportItem?.downloadUrl : undefined;
  const showCover = kind === 'report' && featuredReport && Boolean(reportItem);
  const coverTitle = showCover
    ? reportItem?.coverTitle ?? titleParts.main
    : undefined;
  const readLabel = isResearch
    ? RESEARCH_CARD_LABELS.readResearch
    : reportItem?.readLabel ??
      (kind === 'report'
        ? PUBLICATION_CARD_LABELS.readFullReport
        : kind === 'framework'
          ? RESOURCE_CARD_LABELS.readFramework
          : PUBLICATION_CARD_LABELS.readMore);

  const renderField = (
    field: ResourceField,
    key: string,
    extra = false
  ) => {
    const displayClass = extra && !detailsExpanded ? 'hidden sm:grid' : 'grid';
    return (
      <div
        key={key}
        className={`${displayClass} grid-cols-[minmax(5.25rem,auto)_minmax(0,1fr)] items-baseline gap-x-3`}
      >
        <dt className="text-[var(--muted)]">{field.label}</dt>
        <dd
          className={`m-0 min-w-0 break-words text-[var(--ink)] ${
            field.href ? 'break-all' : ''
          }`}
        >
          {field.href ? (
            <a
              href={field.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--cobalt)] underline underline-offset-2 hover:text-[var(--ink)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--cobalt)]"
            >
              {field.value}
              <span className="sr-only">
                {PUBLICATION_CARD_LABELS.opensNewTab}
              </span>
            </a>
          ) : (
            field.value
          )}
        </dd>
      </div>
    );
  };

  return (
    <article className="atlas-card atlas-resource-card flex h-full min-w-0 flex-col gap-4">
      {showCover && coverTitle && (
        <div
          role="img"
          aria-label={`${coverTitle} report cover`}
          className="w-full min-w-0 overflow-hidden border border-[var(--cobalt)] bg-[var(--navy)] p-5 sm:p-6"
        >
          <span className="block font-[var(--font-mono)] text-[10px] uppercase tracking-[0.12em] text-white/80">
            Atlas AI Institute
          </span>
          <p className="mb-0 mt-8 max-w-[22ch] font-[var(--font-serif)] text-[25px] font-bold leading-[1.08] tracking-[-0.03em] text-[var(--white)] sm:text-[30px]">
            {coverTitle}
          </p>
        </div>
      )}

      <div className="min-w-0">
        <p className="mb-3 flex flex-wrap items-center gap-x-2 font-[var(--font-mono)] text-[10px] uppercase leading-[1.4] tracking-[0.1em] text-[var(--cobalt)] sm:text-[11px]">
          <span>{RESOURCE_CARD_LABELS.types[kind]}</span>
          <span aria-hidden="true">·</span>
          <span>{PUBLICATION_CARD_LABELS.published}</span>
          <time dateTime={item.publishedIso ?? undefined}>
            {publishedText}
          </time>
        </p>

        <h3 className="atlas-card-title mb-3 line-clamp-3 font-[var(--font-serif)] text-[21px] font-semibold leading-[1.16] tracking-[-0.025em] text-[var(--ink)] hyphens-manual sm:text-[22px]">
          <span className="block">
            {titleParts.main}
            {titleParts.subtitle ? ':' : ''}
          </span>
          {titleParts.subtitle && (
            <span className="mt-1 block font-[var(--font-sans)] text-[15px] font-normal leading-[1.28] tracking-normal text-[var(--muted)] sm:text-[16px]">
              {titleParts.subtitle}
            </span>
          )}
        </h3>

        {description && (
          <p className="mb-0 line-clamp-3 text-[15px] leading-[1.5] text-[var(--muted)] sm:text-[16px]">
            {description}
          </p>
        )}
      </div>

      {highlights.length > 0 && (
        <dl className="m-0 grid grid-cols-3 gap-2 border-y border-[var(--hair)] py-3">
          {highlights.map((highlight) => (
            <div key={highlight.label} className="min-w-0">
              <dt className="mb-1 font-[var(--font-serif)] text-[22px] font-bold leading-none text-[var(--cobalt)] tabular-nums sm:text-[24px]">
                {highlight.value}
              </dt>
              <dd className="m-0 break-words font-[var(--font-mono)] text-[11px] leading-[1.25] text-[var(--muted)]">
                {highlight.label}
              </dd>
            </div>
          ))}
        </dl>
      )}

      {(primaryFields.length > 0 || extraFields.length > 0) && (
        <div className="border-t border-[var(--hair)] pt-3">
          <dl
            id={detailsId}
            className="m-0 grid gap-y-1.5 font-[var(--font-mono)] text-[13px] leading-[1.4]"
          >
            {primaryFields.map((field, index) =>
              renderField(field, `primary-${field.label}-${index}`)
            )}
            {extraFields.map((field, index) =>
              renderField(field, `extra-${field.label}-${index}`, true)
            )}
          </dl>
          {extraFields.length > 0 && (
            <button
              type="button"
              className="mt-1 inline-flex min-h-[44px] items-center gap-2 font-[var(--font-mono)] text-[11px] uppercase tracking-[0.1em] text-[var(--cobalt)] hover:text-[var(--ink)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--cobalt)] sm:hidden"
              aria-controls={detailsId}
              aria-expanded={detailsExpanded}
              onClick={() => setDetailsExpanded((expanded) => !expanded)}
            >
              <span>{RESOURCE_CARD_LABELS.details}</span>
              <span aria-hidden="true">{detailsExpanded ? '−' : '+'}</span>
            </button>
          )}
        </div>
      )}

      {note && <ResourceNotice text={note} />}

      <div
        className={`mt-auto grid grid-cols-1 gap-3 pt-1 ${
          downloadUrl ? 'sm:grid-cols-2' : ''
        }`}
      >
        <a
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          className="atlas-btn atlas-btn-primary h-[48px] min-h-[48px] w-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--cobalt)]"
        >
          <span>{readLabel}</span>
          <span className="sr-only">{PUBLICATION_CARD_LABELS.opensNewTab}</span>
          <span className="atlas-arrow" aria-hidden="true">
            →
          </span>
        </a>

        {downloadUrl && (
          <a
            href={downloadUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="atlas-btn atlas-btn-ghost h-[48px] min-h-[48px] w-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--cobalt)]"
          >
            <span>{RESOURCE_CARD_LABELS.downloadPdf}</span>
            <span className="sr-only">
              {PUBLICATION_CARD_LABELS.opensNewTab}
            </span>
            <span className="atlas-arrow" aria-hidden="true">
              →
            </span>
          </a>
        )}
      </div>
    </article>
  );
}
