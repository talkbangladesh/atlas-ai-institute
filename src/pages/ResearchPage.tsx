import { useEffect } from 'react';
import {
  PUBLICATION_LISTING_META,
  research,
  RESEARCH_CATEGORIES,
  RESEARCH_PAGE_CONTENT,
} from '../data/publications';
import { Eyebrow } from '../components/Eyebrow';
import {
  FeaturedResearchBlock,
  ResearchCard,
} from '../components/ResearchCard';
import { SubpageLayout } from './SubpageLayout';

export function ResearchPage() {
  const meta = PUBLICATION_LISTING_META.research;

  useEffect(() => {
    const prevTitle = document.title;
    document.title = RESEARCH_PAGE_CONTENT.documentTitle;
    return () => {
      document.title = prevTitle;
    };
  }, []);

  const heroExtra = (
    <div className="mt-6">
      <p className="text-[17px] leading-[1.7] text-[var(--ink)] max-w-[65ch] mb-6">
        {RESEARCH_PAGE_CONTENT.portfolioIntro}
      </p>

      <nav
        aria-label={RESEARCH_PAGE_CONTENT.anchorNavLabel}
        className="pt-6 border-t border-[var(--hair)] max-w-[70ch]"
      >
        <ul className="list-none p-0 m-0 flex flex-wrap gap-x-6 gap-y-2.5">
          {RESEARCH_CATEGORIES.map((category) => (
            <li key={category.id}>
              <a
                href={`#${category.id}`}
                className="inline-flex items-baseline gap-2 font-[var(--font-mono)] text-[12px] uppercase tracking-[0.1em] text-[var(--ink)] hover:text-[var(--cobalt)] no-underline border-b border-transparent hover:border-[var(--cobalt)] py-1 transition-colors"
              >
                <span className="text-[var(--cobalt)] tabular-nums">
                  {category.index}
                </span>
                <span>{category.title}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );

  const groupedCategories = RESEARCH_CATEGORIES.map((cat) => {
    const items = research
      .filter((item) => item.category === cat.title)
      .sort((a, b) => a.priority - b.priority);
    return { ...cat, items };
  }).filter((cat) => cat.items.length > 0);

  return (
    <SubpageLayout
      eyebrow={meta.eyebrow}
      title={meta.title}
      intro={meta.intro}
      headingId={meta.headingId}
      sectionIndex={meta.sectionIndex}
      heroExtra={heroExtra}
    >
      <div className="flex flex-col">
        {groupedCategories.map((cat) => {
          const featuredItems = cat.items.filter((i) => i.tier === 'featured');
          const leadItems = cat.items.filter((i) => i.tier === 'lead');
          const compactItems = cat.items.filter((i) => i.tier === 'compact');
          const headingId = `${cat.id}-heading`;

          const pairLeadWithCompact =
            leadItems.length === 1 && compactItems.length === 1;

          return (
            <section
              key={cat.id}
              id={cat.id}
              aria-labelledby={headingId}
              className={
                cat.emphasized
                  ? 'bg-[var(--paper-deep)] border-t-2 border-[var(--ink)] px-5 py-8 sm:p-9 lg:p-11 mb-14'
                  : 'bg-transparent border-t-2 border-[var(--ink)] pt-7 pb-4 mb-10 last:mb-0'
              }
            >
              <div className={cat.emphasized ? 'mb-9' : 'mb-7'}>
                <Eyebrow cobalt className="mb-2 tabular-nums">
                  {cat.index}
                </Eyebrow>
                <h2
                  id={headingId}
                  className={
                    cat.emphasized
                      ? 'text-[clamp(26px,3.1vw,36px)] leading-[1.12] font-bold text-[var(--ink)]'
                      : 'text-[clamp(22px,2.2vw,28px)] leading-[1.18] font-semibold text-[var(--ink)]'
                  }
                >
                  {cat.title}
                </h2>
              </div>

              {featuredItems.length > 0 && (
                <div className="flex flex-col gap-8 mb-8">
                  {featuredItems.map((item) => (
                    <FeaturedResearchBlock key={item.id} item={item} />
                  ))}
                </div>
              )}

              {pairLeadWithCompact ? (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
                  <div className="lg:col-span-7 flex flex-col">
                    <ResearchCard item={leadItems[0]} />
                  </div>
                  <div className="lg:col-span-5 flex flex-col">
                    <ResearchCard item={compactItems[0]} />
                  </div>
                </div>
              ) : (
                <>
                  {leadItems.length > 0 && (
                    <div
                      className={`grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch ${
                        compactItems.length > 0 ? 'mb-6' : ''
                      }`}
                    >
                      {leadItems.map((item) => (
                        <ResearchCard key={item.id} item={item} />
                      ))}
                    </div>
                  )}

                  {compactItems.length > 0 && (
                    <div
                      className={`grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch ${
                        compactItems.length >= 3
                          ? 'min-[1440px]:grid-cols-3'
                          : ''
                      }`}
                    >
                      {compactItems.map((item) => (
                        <ResearchCard key={item.id} item={item} />
                      ))}
                    </div>
                  )}
                </>
              )}
            </section>
          );
        })}
      </div>
    </SubpageLayout>
  );
}
