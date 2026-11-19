import {
  PUBLICATION_LISTING_META,
  reports,
  REPORTS_PAGE_SECTION,
} from '../data/publications';
import { Eyebrow } from '../components/Eyebrow';
import { PublicationList } from '../components/PublicationList';
import { ResourceCard } from '../components/ResourceCard';
import { SubpageLayout } from './SubpageLayout';

export function ReportsPage() {
  const meta = PUBLICATION_LISTING_META.report;
  const featuredReport = reports.find((item) => item.featured) ?? reports[0];
  const standardReports = reports.filter(
    (item) => featuredReport && item.id !== featuredReport.id
  );

  return (
    <SubpageLayout
      eyebrow={meta.eyebrow}
      title={meta.title}
      intro={meta.intro}
      headingId={meta.headingId}
      sectionIndex={meta.sectionIndex}
    >
      {reports.length === 0 ? (
        <PublicationList items={reports} />
      ) : (
        <section
          aria-labelledby="reports-section-heading"
          className="border-t-2 border-[var(--ink)] pt-6"
        >
          <div className="mb-8">
            <Eyebrow cobalt className="mb-2 tabular-nums">
              {REPORTS_PAGE_SECTION.index}
            </Eyebrow>
            <h2
              id="reports-section-heading"
              className="text-[clamp(26px,3vw,36px)] leading-[1.12] font-bold text-[var(--ink)]"
            >
              {REPORTS_PAGE_SECTION.title}
            </h2>
          </div>

          {featuredReport && (
            <div className="mb-8">
              <ResourceCard
                item={featuredReport}
                kind="report"
                featuredReport
              />
            </div>
          )}

          {standardReports.length > 0 && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-[16px] lg:gap-[20px] items-stretch">
              {standardReports.map((report) => (
                <ResourceCard key={report.id} item={report} kind="report" />
              ))}
            </div>
          )}
        </section>
      )}
    </SubpageLayout>
  );
}
