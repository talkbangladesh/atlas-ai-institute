import { PROJECTS_PAGE_META, projects } from '../data/projects';
import {
  FRAMEWORK_GROUPS,
  frameworks,
  PUBLICATION_CARD_LABELS,
  PUBLICATION_LISTING_META,
  sortPublicationsNewestFirst,
} from '../data/publications';
import { TOOLS_PAGE_META, tools } from '../data/tools';
import { Eyebrow } from '../components/Eyebrow';
import { LearningDevelopmentSection } from '../components/LearningDevelopmentSection';
import { PublicationCard } from '../components/PublicationCard';
import { PublicationList } from '../components/PublicationList';
import { SubpageLayout } from './SubpageLayout';

export function FrameworksPage() {
  const meta = PUBLICATION_LISTING_META.framework;

  const knownGroupTitles = new Set<string>(
    FRAMEWORK_GROUPS.map((g) => g.title)
  );
  const ungrouped = sortPublicationsNewestFirst(
    frameworks.filter((item) => !item.group || !knownGroupTitles.has(item.group))
  );

  const groupedSections = FRAMEWORK_GROUPS.map((group) => ({
    ...group,
    items: sortPublicationsNewestFirst(
      frameworks.filter((item) => item.group === group.title)
    ),
  })).filter((group) => group.items.length > 0);

  const anchorNav = groupedSections.length > 0 && (
    <nav
      aria-label={PUBLICATION_CARD_LABELS.frameworkGroupsNavLabel}
      className="mt-8 pt-6 border-t border-[var(--hair)] max-w-[65ch]"
    >
      <ul className="list-none p-0 m-0 flex flex-wrap gap-x-6 gap-y-2.5">
        {groupedSections.map((group) => (
          <li key={group.id}>
            <a
              href={`#${group.id}`}
              className="inline-flex items-baseline gap-2 font-[var(--font-mono)] text-[12px] uppercase tracking-[0.1em] text-[var(--ink)] hover:text-[var(--cobalt)] no-underline border-b border-transparent hover:border-[var(--cobalt)] py-1 transition-colors"
            >
              <span className="text-[var(--cobalt)] tabular-nums">
                {group.index}
              </span>
              <span>{group.title}</span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );

  return (
    <SubpageLayout
      eyebrow={meta.eyebrow}
      title={meta.title}
      intro={meta.intro}
      headingId={meta.headingId}
      sectionIndex={meta.sectionIndex}
      heroExtra={anchorNav}
    >
      {frameworks.length === 0 ? (
        <PublicationList items={frameworks} />
      ) : (
        <div className="flex flex-col gap-16">
          {ungrouped.length > 0 && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
              {ungrouped.map((item) => (
                <PublicationCard key={item.id} publication={item} />
              ))}
            </div>
          )}

          {groupedSections.map((group) => {
            const groupHeadingId = `${group.id}-heading`;
            return (
              <section
                key={group.id}
                id={group.id}
                aria-labelledby={groupHeadingId}
                className="border-t-2 border-[var(--ink)] pt-6"
              >
                <div className="mb-8">
                  <Eyebrow cobalt className="mb-2 tabular-nums">
                    {group.index}
                  </Eyebrow>
                  <h2
                    id={groupHeadingId}
                    className="text-[clamp(26px,3vw,36px)] leading-[1.12] font-bold text-[var(--ink)]"
                  >
                    {group.title}
                  </h2>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
                  {group.items.map((item) => (
                    <PublicationCard key={item.id} publication={item} />
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      )}
    </SubpageLayout>
  );
}

export function ToolsPage() {
  return (
    <SubpageLayout
      eyebrow={TOOLS_PAGE_META.eyebrow}
      title={TOOLS_PAGE_META.title}
      intro={TOOLS_PAGE_META.intro}
      headingId={TOOLS_PAGE_META.headingId}
      sectionIndex={TOOLS_PAGE_META.sectionIndex}
    >
      <PublicationList
        items={tools}
        emptyMessage={TOOLS_PAGE_META.emptyMessage}
        recordLabel={TOOLS_PAGE_META.itemLinkLabel}
      />
    </SubpageLayout>
  );
}

export function ProjectsPage() {
  return (
    <SubpageLayout
      eyebrow={PROJECTS_PAGE_META.eyebrow}
      title={PROJECTS_PAGE_META.title}
      intro={PROJECTS_PAGE_META.intro}
      headingId={PROJECTS_PAGE_META.headingId}
      sectionIndex={PROJECTS_PAGE_META.sectionIndex}
    >
      <PublicationList
        items={projects}
        emptyMessage={PROJECTS_PAGE_META.emptyMessage}
        recordLabel={PROJECTS_PAGE_META.itemLinkLabel}
      />
      <LearningDevelopmentSection />
    </SubpageLayout>
  );
}
