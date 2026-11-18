import { Link, useParams } from 'react-router-dom';
import {
  COALITION_PROFILE_LABELS,
  getAdjacentCoalitionMembers,
  getCoalitionMemberBySlug,
} from '../data/coalitionCommittee';
import {
  getConfirmedMultipleLeadershipCategory,
  getLeadershipProfileBySlug,
} from '../data/leadership';
import {
  getMemberInitials,
  resolveCoalitionMedia,
} from '../lib/profileAssets';
import { usePersonSeo } from '../lib/seo';
import { CoalitionFooter } from '../components/CoalitionFooter';
import { GalleryLightbox } from '../components/GalleryLightbox';
import { Logo } from '../components/Logo';
import { NotFoundPage } from './NotFoundPage';

export function CoalitionCommitteeProfilePage() {
  const { slug = '' } = useParams<{ slug: string }>();
  const member = getCoalitionMemberBySlug(slug);

  const fallbackLeadershipCategory = member
    ? getConfirmedMultipleLeadershipCategory(member.slug)
    : undefined;

  const media = member
    ? resolveCoalitionMedia(
        member.slug,
        fallbackLeadershipCategory,
        member.galleryCaptions
      )
    : { gallery: [] };

  usePersonSeo(
    member
      ? {
          title: `${member.name} — ${member.position} | Atlas Global South AI Policy Coalition`,
          description: member.intro,
          canonicalUrl: `https://atlasai.institute/atlas-global-south-ai-policy-coalition/committee/${member.slug}/`,
          name: member.name,
          jobTitle: member.position,
          image: media.portrait,
          sameAs: member.links?.map((l) => l.url),
          memberOf: {
            '@type': 'Organization',
            name: 'Atlas Global South AI Policy Coalition',
          },
        }
      : null
  );

  if (!member) {
    return <NotFoundPage />;
  }

  const { previous, next } = getAdjacentCoalitionMembers(member.slug);
  const hasAtlasProfile = Boolean(getLeadershipProfileBySlug(member.slug));

  return (
    <div className="atlas-coalition-scope">
      <section className="pt-8 pb-6 sm:pt-10 sm:pb-8 bg-[var(--paper)]">
        <div className="atlas-container">
          <nav
            aria-label="Breadcrumb"
            className="font-[var(--font-mono)] text-[12px] uppercase tracking-[0.1em] text-[var(--muted)]"
          >
            <ol className="list-none p-0 m-0 flex flex-wrap items-center gap-x-2.5 gap-y-1">
              <li>
                <Link
                  to="/atlas-global-south-ai-policy-coalition/"
                  className="text-[var(--muted)] hover:text-[var(--c-gold-ink)] no-underline"
                >
                  {COALITION_PROFILE_LABELS.breadcrumbCoalition}
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link
                  to="/atlas-global-south-ai-policy-coalition/#committee"
                  className="text-[var(--muted)] hover:text-[var(--c-gold-ink)] no-underline"
                >
                  {COALITION_PROFILE_LABELS.breadcrumbCommittee}
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-[var(--c-navy)]">
                {member.name}
              </li>
            </ol>
          </nav>
        </div>
      </section>

      <section
        aria-labelledby="coalition-member-heading"
        className="atlas-section pt-10 sm:pt-14"
      >
        <div className="atlas-container">
          <div className="atlas-section-grid">
            <div className="atlas-section-index">
              <span className="atlas-eyebrow block text-[var(--c-gold-ink)]">
                {COALITION_PROFILE_LABELS.sectionIndex} / {member.index}
              </span>
            </div>

            <div className="atlas-section-content">
              {/* Two-column Hero: portrait first on mobile */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-10 items-start mb-10">
                <div className="md:col-span-5">
                  {media.portrait ? (
                    <div className="atlas-person-image aspect-[4/5] border border-[var(--hair)] bg-[var(--paper-deep)] overflow-hidden">
                      <img
                        src={media.portrait}
                        alt={`Portrait of ${member.name}`}
                        loading="eager"
                        fetchPriority="high"
                        decoding="async"
                        className="w-full h-full object-cover object-top block"
                      />
                    </div>
                  ) : (
                    <div
                      role="img"
                      aria-label={`Portrait of ${member.name}`}
                      className="atlas-person-image aspect-[4/5] border border-[var(--hair)] bg-[var(--paper-deep)] flex items-center justify-center"
                    >
                      <span className="font-[var(--font-serif)] font-semibold text-[clamp(44px,5vw,64px)] leading-none tracking-[-0.03em] text-[var(--c-navy)]">
                        {getMemberInitials(member.name)}
                      </span>
                    </div>
                  )}
                </div>

                <div className="md:col-span-7 min-w-0">
                  <Logo
                    variant="coalition"
                    priority
                    heightClass="h-9"
                    className="mb-4"
                    isOnlyContent={false}
                    fallback={null}
                  />
                  <span className="font-[var(--font-mono)] text-[12px] font-medium uppercase tracking-[0.1em] text-[var(--c-gold-ink)] block mb-3">
                    {member.position}
                  </span>

                  <h1
                    id="coalition-member-heading"
                    className="text-[clamp(34px,4.2vw,54px)] leading-[1.06] text-[var(--c-navy)] mb-4"
                  >
                    {member.name}
                  </h1>

                  <p className="font-[var(--font-mono)] text-[12px] uppercase tracking-[0.08em] leading-[1.55] text-[var(--muted)] pb-4 mb-5 border-b border-[var(--hair)]">
                    {member.portfolio}
                  </p>

                  <p className="text-[18px] leading-[1.7] text-[var(--ink)] max-w-[60ch] mb-6">
                    {member.intro}
                  </p>

                  {member.links && member.links.length > 0 && (
                    <div className="flex flex-wrap gap-3 mb-6">
                      {member.links.map((link) => (
                        <a
                          key={link.url}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="atlas-btn atlas-c-btn-ghost"
                        >
                          <span>{link.label}</span>
                          <span className="sr-only">
                            {COALITION_PROFILE_LABELS.opensNewTab}
                          </span>
                          <span className="atlas-arrow" aria-hidden="true">
                            →
                          </span>
                        </a>
                      ))}
                    </div>
                  )}

                  {hasAtlasProfile && (
                    <div className="mb-6">
                      <Link
                        to={`/leadership/${member.slug}/`}
                        className="atlas-inline-link inline-flex items-center gap-2 font-[var(--font-mono)] text-[12px] uppercase tracking-[0.1em] text-[var(--c-gold-ink)] hover:text-[var(--c-navy)] no-underline min-h-[44px]"
                      >
                        <span>
                          {COALITION_PROFILE_LABELS.atlasProfileLinkLabel}
                        </span>
                        <span className="atlas-arrow" aria-hidden="true">
                          →
                        </span>
                      </Link>
                    </div>
                  )}

                  <div className="atlas-c-actions pt-2">
                    <Link
                      to="/atlas-global-south-ai-policy-coalition/#committee"
                      className="atlas-btn atlas-c-btn-ghost"
                    >
                      <span aria-hidden="true">←</span>
                      <span>{COALITION_PROFILE_LABELS.backLabel}</span>
                    </Link>

                    <a
                      href={COALITION_PROFILE_LABELS.officialSiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="atlas-btn atlas-c-btn-primary"
                    >
                      <span>{COALITION_PROFILE_LABELS.officialSiteLabel}</span>
                      <span className="sr-only">
                        {COALITION_PROFILE_LABELS.opensNewTab}
                      </span>
                      <span className="atlas-arrow" aria-hidden="true">
                        →
                      </span>
                    </a>
                  </div>
                </div>
              </div>

              {/* Optional About */}
              {member.bio && member.bio.length > 0 && (
                <div className="pt-8 border-t border-[var(--hair)] mb-10">
                  <h2 className="text-[24px] sm:text-[28px] font-semibold text-[var(--c-navy)] mb-5">
                    {COALITION_PROFILE_LABELS.aboutHeading}
                  </h2>
                  <div className="flex flex-col gap-4 atlas-measure">
                    {member.bio.map((paragraph, idx) => (
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
              {member.focus && member.focus.length > 0 && (
                <div className="pt-8 border-t border-[var(--hair)] mb-10">
                  <h2 className="text-[24px] sm:text-[28px] font-semibold text-[var(--c-navy)] mb-5">
                    {COALITION_PROFILE_LABELS.focusHeading}
                  </h2>
                  <ul className="list-none p-0 m-0 border-t border-[var(--hair)] max-w-[65ch]">
                    {member.focus.map((item, idx) => (
                      <li
                        key={idx}
                        className="grid grid-cols-[44px_1fr] items-baseline py-4 border-b border-[var(--hair)] text-[17px] leading-[1.6] text-[var(--ink)]"
                      >
                        <span className="font-[var(--font-mono)] text-[12px] text-[var(--c-gold-ink)] tabular-nums">
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
                  <h2 className="text-[24px] sm:text-[28px] font-semibold text-[var(--c-navy)] mb-6">
                    {COALITION_PROFILE_LABELS.galleryHeading}
                  </h2>
                  <GalleryLightbox
                    items={media.gallery}
                    memberName={member.name}
                    accent="gold"
                  />
                </div>
              )}

              {/* More committee members (previous and next in order) */}
              {(previous || next) && (
                <div className="pt-8 border-t border-[var(--hair)]">
                  <h2 className="text-[22px] sm:text-[26px] font-semibold text-[var(--c-navy)] mb-6">
                    {COALITION_PROFILE_LABELS.moreHeading}
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
                    {previous && (
                      <Link
                        to={`/atlas-global-south-ai-policy-coalition/committee/${previous.slug}/`}
                        className="atlas-c-committee-card no-underline text-inherit group"
                      >
                        <span className="font-[var(--font-mono)] text-[11px] uppercase tracking-[0.1em] text-[var(--c-gold-ink)] block mb-2">
                          ← {COALITION_PROFILE_LABELS.previousLabel} ·{' '}
                          {previous.index}
                        </span>
                        <h3 className="atlas-c-card-title text-[21px] font-semibold text-[var(--c-navy)] mb-1.5 transition-colors">
                          {previous.name}
                        </h3>
                        <p className="font-[var(--font-mono)] text-[11px] uppercase tracking-[0.08em] text-[var(--muted)]">
                          {previous.position}
                        </p>
                      </Link>
                    )}

                    {next && (
                      <Link
                        to={`/atlas-global-south-ai-policy-coalition/committee/${next.slug}/`}
                        className="atlas-c-committee-card no-underline text-inherit group"
                      >
                        <span className="font-[var(--font-mono)] text-[11px] uppercase tracking-[0.1em] text-[var(--c-gold-ink)] block mb-2">
                          {COALITION_PROFILE_LABELS.nextLabel} · {next.index} →
                        </span>
                        <h3 className="atlas-c-card-title text-[21px] font-semibold text-[var(--c-navy)] mb-1.5 transition-colors">
                          {next.name}
                        </h3>
                        <p className="font-[var(--font-mono)] text-[11px] uppercase tracking-[0.08em] text-[var(--muted)]">
                          {next.position}
                        </p>
                      </Link>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <CoalitionFooter basePath="/atlas-global-south-ai-policy-coalition/" />
    </div>
  );
}
