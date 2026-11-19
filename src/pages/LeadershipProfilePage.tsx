import { Link, useParams } from 'react-router-dom';
import { getCoalitionMemberBySlug } from '../data/coalitionCommittee';
import {
  getLeadershipProfileBySlug,
  getMoreInLeadershipCategory,
  LEADERSHIP_CATEGORIES,
  LEADERSHIP_PAGE_META,
  type Member,
} from '../data/leadership';
import {
  getMemberInitials,
  resolveLeadershipMedia,
} from '../lib/profileAssets';
import { usePersonSeo } from '../lib/seo';
import { Button } from '../components/Button';
import { Eyebrow } from '../components/Eyebrow';
import { GalleryLightbox } from '../components/GalleryLightbox';
import { NotFoundPage } from './NotFoundPage';

export function LeadershipProfilePage() {
  const { slug = '' } = useParams<{ slug: string }>();
  const resolved = getLeadershipProfileBySlug(slug);

  const primary = resolved?.primary;
  const entries = resolved?.entries ?? [];
  const primaryCategoryTitle = resolved?.primaryCategoryTitle ?? '';

  const media = primary
    ? resolveLeadershipMedia(
        primary.category,
        primary.slug,
        primary.galleryCaptions
      )
    : { gallery: [] };

  const allLinks = entries.flatMap((entry) => entry.links ?? []);
  const uniqueLinks = allLinks.filter(
    (link, idx, arr) =>
      arr.findIndex((item) => item.url === link.url) === idx
  );

  const seoJobTitle = entries.map((e) => e.role).join('; ');
  const seoDescription = primary
    ? primary.summary ??
      `${primary.name}, ${primary.role} at Atlas AI Institute.`
    : '';

  usePersonSeo(
    primary
      ? {
          title: `${primary.name} — ${primary.role} | Atlas AI Institute`,
          description: seoDescription,
          canonicalUrl: `https://atlasai.institute/leadership/${primary.slug}/`,
          name: primary.name,
          jobTitle: seoJobTitle || primary.role,
          image: media.portrait,
          sameAs: uniqueLinks.map((l) => l.url),
          worksFor: { '@id': 'https://atlasai.institute/#org' },
        }
      : null
  );

  if (!primary) {
    return <NotFoundPage />;
  }

  const bioParagraphs = entries.flatMap((e) => e.bio ?? []);
  const focusItems = entries.flatMap((e) => e.focus ?? []);
  const metaDetails = [
    primary.region,
    primary.country,
    primary.affiliation,
    primary.appointedNote,
  ].filter(Boolean) as string[];

  const hasCoalitionProfile = Boolean(getCoalitionMemberBySlug(primary.slug));
  const moreMembers = getMoreInLeadershipCategory(
    primary.category,
    primary.slug,
    3
  );

  return (
    <>
      <section className="pt-8 pb-6 sm:pt-10 sm:pb-8">
        <div className="atlas-container">
          <nav
            aria-label="Breadcrumb"
            className="font-[var(--font-mono)] text-[12px] uppercase tracking-[0.1em] text-[var(--muted)]"
          >
            <ol className="list-none p-0 m-0 flex flex-wrap items-center gap-x-2.5 gap-y-1">
              <li>
                <Link
                  to="/"
                  className="text-[var(--muted)] hover:text-[var(--cobalt)] no-underline"
                >
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link
                  to="/leadership/"
                  className="text-[var(--muted)] hover:text-[var(--cobalt)] no-underline"
                >
                  Leadership
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-[var(--ink)]">
                {primary.name}
              </li>
            </ol>
          </nav>
        </div>
      </section>

      <section
        aria-labelledby="profile-name-heading"
        className="atlas-section pt-10 sm:pt-14"
      >
        <div className="atlas-container">
          <div className="atlas-section-grid">
            <div className="atlas-section-index">
              <Eyebrow className="block">
                LEADERSHIP / {primaryCategoryTitle.toUpperCase()}
              </Eyebrow>
            </div>

            <div className="atlas-section-content">
              {/* Two-column hero: portrait first on mobile */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-10 items-start mb-10">
                <div className="md:col-span-5">
                  {media.portrait ? (
                    <div className="atlas-person-image aspect-[4/5] border border-[var(--hair)] bg-[var(--paper-deep)] overflow-hidden">
                      <img
                        src={media.portrait}
                        alt={`Portrait of ${primary.name}`}
                        loading="eager"
                        fetchPriority="high"
                        decoding="async"
                        className="w-full h-full object-cover object-top block"
                      />
                    </div>
                  ) : (
                    <div
                      role="img"
                      aria-label={`Portrait of ${primary.name}`}
                      className="atlas-person-image aspect-[4/5] border border-[var(--hair)] bg-[var(--paper-deep)] flex items-center justify-center"
                    >
                      <span className="font-[var(--font-serif)] font-semibold text-[clamp(44px,5vw,64px)] leading-none tracking-[-0.03em] text-[var(--ink)]">
                        {getMemberInitials(primary.name)}
                      </span>
                    </div>
                  )}
                </div>

                <div className="md:col-span-7 min-w-0">
                  {entries.length > 1 ? (
                    <ul className="list-none p-0 m-0 flex flex-col gap-1.5 mb-4">
                      {entries.map((entry) => {
                        const catTitle = LEADERSHIP_CATEGORIES.find(
                          (c) => c.key === entry.category
                        )?.title;
                        return (
                          <li key={`${entry.category}-${entry.role}`}>
                            <Eyebrow cobalt>
                              {entry.role}
                              {catTitle ? ` · ${catTitle}` : ''}
                            </Eyebrow>
                          </li>
                        );
                      })}
                    </ul>
                  ) : (
                    <Eyebrow cobalt className="mb-3">
                      {primary.role}
                    </Eyebrow>
                  )}

                  {metaDetails.length > 0 && (
                    <p className="font-[var(--font-mono)] text-[11px] uppercase tracking-[0.08em] text-[var(--muted)] mb-4">
                      {metaDetails.join(' · ')}
                    </p>
                  )}

                  <h1
                    id="profile-name-heading"
                    className="text-[clamp(34px,4.2vw,54px)] leading-[1.06] mb-5"
                  >
                    {primary.name}
                  </h1>

                  {primary.summary && (
                    <p className="atlas-lead mb-6">{primary.summary}</p>
                  )}

                  {uniqueLinks.length > 0 && (
                    <div className="flex flex-wrap gap-3 mb-6">
                      {uniqueLinks.map((link) => {
                        const isExternal = /^https?:\/\//i.test(link.url);
                        if (isExternal) {
                          return (
                            <a
                              key={link.url}
                              href={link.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="atlas-btn atlas-btn-ghost"
                            >
                              <span>{link.label}</span>
                              <span className="sr-only">
                                {LEADERSHIP_PAGE_META.opensNewTab}
                              </span>
                              <span className="atlas-arrow" aria-hidden="true">
                                →
                              </span>
                            </a>
                          );
                        }
                        return (
                          <Button key={link.url} to={link.url} variant="ghost">
                            {link.label}
                          </Button>
                        );
                      })}
                    </div>
                  )}

                  {hasCoalitionProfile && (
                    <div>
                      <Link
                        to={`/atlas-global-south-ai-policy-coalition/committee/${primary.slug}/`}
                        className="atlas-inline-link inline-flex items-center gap-2 font-[var(--font-mono)] text-[12px] uppercase tracking-[0.1em] text-[var(--cobalt)] hover:text-[var(--ink)] no-underline min-h-[44px]"
                      >
                        <span>
                          {LEADERSHIP_PAGE_META.coalitionProfileLinkLabel}
                        </span>
                        <span className="atlas-arrow" aria-hidden="true">
                          →
                        </span>
                      </Link>
                    </div>
                  )}
                </div>
              </div>

              {/* Optional About */}
              {bioParagraphs.length > 0 && (
                <div className="pt-8 border-t border-[var(--hair)] mb-10">
                  <h2 className="text-[24px] sm:text-[28px] font-semibold text-[var(--ink)] mb-5">
                    About
                  </h2>
                  <div className="flex flex-col gap-4 atlas-measure">
                    {bioParagraphs.map((paragraph, idx) => (
                      <p
                        key={idx}
                        className="text-[17px] leading-[1.7] text-[var(--muted)]"
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>
              )}

              {/* Optional Areas of focus */}
              {focusItems.length > 0 && (
                <div className="pt-8 border-t border-[var(--hair)] mb-10">
                  <h2 className="text-[24px] sm:text-[28px] font-semibold text-[var(--ink)] mb-5">
                    Areas of focus
                  </h2>
                  <ul className="list-none p-0 m-0 border-t border-[var(--hair)] max-w-[65ch]">
                    {focusItems.map((item, idx) => (
                      <li
                        key={idx}
                        className="grid grid-cols-[44px_1fr] items-baseline py-4 border-b border-[var(--hair)] text-[17px] leading-[1.6] text-[var(--ink)]"
                      >
                        <span className="font-[var(--font-mono)] text-[12px] text-[var(--cobalt)] tabular-nums">
                          {String(idx + 1).padStart(2, '0')}
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Optional Gallery */}
              {media.gallery.length > 0 && (
                <div className="pt-8 border-t border-[var(--hair)] mb-10">
                  <h2 className="text-[24px] sm:text-[28px] font-semibold text-[var(--ink)] mb-6">
                    Gallery
                  </h2>
                  <GalleryLightbox
                    items={media.gallery}
                    memberName={primary.name}
                  />
                </div>
              )}

              {/* Optional More in Category */}
              {moreMembers.length > 0 && (
                <div className="pt-8 border-t border-[var(--hair)] mb-10">
                  <h2 className="text-[24px] sm:text-[28px] font-semibold text-[var(--ink)] mb-6">
                    More in {primaryCategoryTitle}
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
                    {moreMembers.map((other: Member) => {
                      const otherMedia = resolveLeadershipMedia(
                        other.category,
                        other.slug
                      );
                      return (
                        <Link
                          key={other.slug}
                          to={`/leadership/${other.slug}/`}
                          className="atlas-card h-full flex flex-col justify-between no-underline text-inherit group"
                        >
                          <div>
                            {otherMedia.portrait ? (
                              <div className="atlas-person-image aspect-[4/5] mb-4 border border-[var(--hair)] bg-[var(--paper-deep)] overflow-hidden">
                                <img
                                  src={otherMedia.portrait}
                                  alt={`Portrait of ${other.name}`}
                                  loading="lazy"
                                  decoding="async"
                                  className="w-full h-full object-cover object-top block"
                                />
                              </div>
                            ) : (
                              <div
                                role="img"
                                aria-label={`Portrait placeholder for ${other.name}`}
                                className="atlas-person-image aspect-[4/5] mb-4 border border-[var(--hair)] bg-[var(--paper-deep)] flex items-center justify-center"
                              >
                                <span className="font-[var(--font-serif)] font-semibold text-[28px] text-[var(--ink)]">
                                  {getMemberInitials(other.name)}
                                </span>
                              </div>
                            )}
                            <Eyebrow cobalt className="mb-1.5">
                              {other.role}
                            </Eyebrow>
                            <h3 className="atlas-card-title text-[20px] font-semibold text-[var(--ink)] mb-2">
                              {other.name}
                            </h3>
                          </div>
                          <span className="mt-auto pt-3 inline-flex items-center gap-2 font-[var(--font-mono)] text-[11px] uppercase tracking-[0.1em] text-[var(--ink)] group-hover:text-[var(--cobalt)] transition-colors">
                            <span>{LEADERSHIP_PAGE_META.viewProfileLabel}</span>
                            <span className="atlas-arrow" aria-hidden="true">
                              →
                            </span>
                          </span>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Back to Leadership */}
              <div className="pt-8 border-t border-[var(--hair)]">
                <Link to="/leadership/" className="atlas-btn atlas-btn-ghost">
                  <span aria-hidden="true">←</span>
                  <span>{LEADERSHIP_PAGE_META.backToLeadershipLabel}</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
