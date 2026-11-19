import { useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  LEADERSHIP_CATEGORIES,
  LEADERSHIP_PAGE_META,
  type Member,
} from '../data/leadership';
import {
  getMemberInitials,
  resolveLeadershipMedia,
} from '../lib/profileAssets';
import { Eyebrow } from '../components/Eyebrow';

function LeadershipMemberCard({
  member,
  featured = false,
}: {
  member: Member;
  featured?: boolean;
}) {
  const media = resolveLeadershipMedia(
    member.category,
    member.slug,
    member.galleryCaptions
  );
  const locationLine = [member.region, member.country]
    .filter(Boolean)
    .join(' · ');

  return (
    <Link
      to={`/leadership/${member.slug}/`}
      className="atlas-card h-full flex flex-col justify-between no-underline text-inherit group"
    >
      <div>
        {media.portrait ? (
          <div className="atlas-person-image aspect-[4/5] mb-6 border border-[var(--hair)] bg-[var(--paper-deep)] overflow-hidden">
            <img
              src={media.portrait}
              alt={`Portrait of ${member.name}`}
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover object-top block"
            />
          </div>
        ) : (
          <div
            role="img"
            aria-label={`Portrait placeholder for ${member.name}`}
            className="atlas-person-image aspect-[4/5] mb-6 border border-[var(--hair)] bg-[var(--paper-deep)] flex items-center justify-center"
          >
            <span
              className={`font-[var(--font-serif)] font-semibold leading-none tracking-[-0.03em] text-[var(--ink)] ${
                featured
                  ? 'text-[clamp(40px,4vw,56px)]'
                  : 'text-[clamp(32px,3vw,42px)]'
              }`}
            >
              {getMemberInitials(member.name)}
            </span>
          </div>
        )}

        <Eyebrow cobalt className="mb-2">
          {member.role}
        </Eyebrow>

        <h3
          className={`atlas-card-title font-semibold text-[var(--ink)] mb-2 ${
            featured
              ? 'text-[26px] sm:text-[30px] leading-[1.15]'
              : 'text-[22px] sm:text-[24px] leading-[1.2]'
          }`}
        >
          {member.name}
        </h3>

        {locationLine && (
          <p className="font-[var(--font-mono)] text-[11px] uppercase tracking-[0.08em] text-[var(--muted)] mb-3">
            {locationLine}
          </p>
        )}
      </div>

      <span className="mt-auto pt-4 inline-flex items-center gap-2 font-[var(--font-mono)] text-[12px] uppercase tracking-[0.1em] text-[var(--ink)] group-hover:text-[var(--cobalt)] transition-colors">
        <span>{LEADERSHIP_PAGE_META.viewProfileLabel}</span>
        <span className="atlas-arrow" aria-hidden="true">
          →
        </span>
      </span>
    </Link>
  );
}

export function LeadershipPage() {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = LEADERSHIP_PAGE_META.title;
    return () => {
      document.title = prevTitle;
    };
  }, []);

  /* Show a person in more than one category only if confirmedMultiple is true */
  const deduplicatedCategories = useMemo(() => {
    const seen = new Set<string>();
    return LEADERSHIP_CATEGORIES.map((category) => {
      const members: Member[] = [];
      for (const member of category.members) {
        const key = member.slug;
        if (!seen.has(key) || member.confirmedMultiple === true) {
          seen.add(key);
          members.push(member);
        }
      }
      return { ...category, members };
    });
  }, []);

  return (
    <>
      <section
        aria-labelledby="leadership-page-heading"
        className="py-12 sm:py-16 lg:py-24"
      >
        <div className="atlas-container">
          <div className="mb-8">
            <Link
              to="/"
              className="atlas-inline-link inline-flex items-center gap-2 font-[var(--font-mono)] text-[12px] uppercase tracking-[0.1em] text-[var(--muted)] hover:text-[var(--cobalt)] no-underline min-h-[44px]"
            >
              <span aria-hidden="true">←</span>
              <span>Atlas AI Institute Home</span>
            </Link>
          </div>

          <Eyebrow cobalt className="mb-4">
            {LEADERSHIP_PAGE_META.eyebrow}
          </Eyebrow>
          <h1 id="leadership-page-heading" className="max-w-[18ch] mb-6">
            {LEADERSHIP_PAGE_META.heading}
          </h1>
          <p className="atlas-lead mb-8">{LEADERSHIP_PAGE_META.intro}</p>

          <nav
            aria-label={LEADERSHIP_PAGE_META.anchorNavLabel}
            className="pt-6 border-t border-[var(--hair)] max-w-[75ch]"
          >
            <ul className="list-none p-0 m-0 flex flex-wrap gap-x-6 gap-y-2.5">
              {LEADERSHIP_CATEGORIES.map((category) => (
                <li key={category.id}>
                  <a
                    href={`#${category.id}`}
                    className="inline-flex items-baseline gap-2 font-[var(--font-mono)] text-[12px] uppercase tracking-[0.1em] text-[var(--ink)] hover:text-[var(--cobalt)] no-underline border-b border-transparent hover:border-[var(--cobalt)] py-1 transition-colors"
                  >
                    <span className="text-[var(--cobalt)] tabular-nums">
                      {category.shortIndex}
                    </span>
                    <span>{category.title}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </section>

      {deduplicatedCategories.map((category, idx) => {
        const isFounder = category.key === 'founder-director';

        let groups: { heading: string; members: Member[] }[] | null = null;
        if (category.groupBy && category.members.length > 0) {
          const groupKey = category.groupBy;
          const hasGroupValues = category.members.some((m) =>
            Boolean(m[groupKey])
          );
          if (hasGroupValues) {
            const groupedMap = new Map<string, Member[]>();
            for (const member of category.members) {
              const label = member[groupKey] ?? '';
              const list = groupedMap.get(label) ?? [];
              list.push(member);
              groupedMap.set(label, list);
            }
            groups = Array.from(groupedMap.entries()).map(
              ([heading, members]) => ({ heading, members })
            );
          }
        }

        return (
          <section
            key={category.id}
            id={category.id}
            aria-labelledby={`${category.id}-heading`}
            className={`atlas-section ${
              idx % 2 === 1 ? 'atlas-section-deep' : ''
            }`}
          >
            <div className="atlas-container">
              <div className="border-t-2 border-[var(--ink)] pt-4 mb-8">
                <Eyebrow className="mb-3 tabular-nums">
                  {category.index}
                </Eyebrow>
                <h2 id={`${category.id}-heading`}>{category.title}</h2>
              </div>

              {category.members.length === 0 ? (
                <p className="text-[17px] leading-[1.7] text-[var(--muted)]">
                  {LEADERSHIP_PAGE_META.emptyMessage}
                </p>
              ) : isFounder ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 items-stretch">
                  {category.members.map((member) => (
                    <div
                      key={`${category.id}-${member.slug}`}
                      className="lg:col-span-5 flex flex-col"
                    >
                      <LeadershipMemberCard member={member} featured />
                    </div>
                  ))}
                </div>
              ) : groups ? (
                <div className="flex flex-col gap-10">
                  {groups.map((grp) => (
                    <div key={grp.heading || 'other'}>
                      {grp.heading && (
                        <h3 className="font-[var(--font-mono)] text-[12px] font-medium uppercase tracking-[0.1em] text-[var(--cobalt)] mb-5 pb-2 border-b border-[var(--hair)]">
                          {grp.heading}
                        </h3>
                      )}
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
                        {grp.members.map((member) => (
                          <LeadershipMemberCard
                            key={`${category.id}-${member.slug}`}
                            member={member}
                          />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
                  {category.members.map((member) => (
                    <LeadershipMemberCard
                      key={`${category.id}-${member.slug}`}
                      member={member}
                    />
                  ))}
                </div>
              )}
            </div>
          </section>
        );
      })}
    </>
  );
}
