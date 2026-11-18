import { useEffect, useRef, useState, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import {
  COALITION_ABOUT,
  COALITION_COLLABORATION,
  COALITION_COMMITTEE_META,
  COALITION_CONTACT,
  COALITION_FINAL_CTA,
  COALITION_FOCUS_AREAS,
  COALITION_HERO,
  COALITION_HOST,
  COALITION_MEMBERSHIP,
  COALITION_META,
  COALITION_MISSION,
  COALITION_STRUCTURE,
  COALITION_SUBNAV,
  COALITION_UPDATES_META,
  COALITION_VISION,
  COALITION_WHY,
} from '../data/coalition';
import {
  COALITION_PROFILE_LABELS,
  coalitionCommittee,
  type CoalitionCommitteeMember,
} from '../data/coalitionCommittee';
import { coalitionUpdates } from '../data/coalitionUpdates';
import { getConfirmedMultipleLeadershipCategory } from '../data/leadership';
import { CoalitionFooter } from '../components/CoalitionFooter';
import { Logo } from '../components/Logo';
import { NoteBox } from '../components/NoteBox';
import { getMemberInitials, resolveCoalitionMedia } from '../lib/profileAssets';

interface CoalitionBandProps {
  id: string;
  sectionIndex: string;
  headingId: string;
  variant?: 'paper' | 'deep' | 'navy';
  children: ReactNode;
}

function CoalitionBand({
  id,
  sectionIndex,
  headingId,
  variant = 'paper',
  children,
}: CoalitionBandProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mq.matches) {
      setVisible(true);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.08 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const bandClass =
    variant === 'navy'
      ? 'atlas-c-navy'
      : variant === 'deep'
        ? 'atlas-section atlas-section-deep'
        : 'atlas-section';

  const indexColor =
    variant === 'navy'
      ? 'text-[var(--c-gold)]'
      : 'text-[var(--c-gold-ink)]';

  return (
    <section
      ref={ref}
      id={id}
      aria-labelledby={headingId}
      className={bandClass}
    >
      <div
        className={`atlas-container atlas-reveal ${
          visible ? 'is-visible' : ''
        }`}
      >
        <div className="atlas-section-grid">
          <div className="atlas-section-index">
            <span className={`atlas-eyebrow block ${indexColor}`}>
              {sectionIndex}
            </span>
          </div>
          <div className="atlas-section-content">{children}</div>
        </div>
      </div>
    </section>
  );
}

function CommitteeCard({ member }: { member: CoalitionCommitteeMember }) {
  const media = resolveCoalitionMedia(
    member.slug,
    getConfirmedMultipleLeadershipCategory(member.slug),
    member.galleryCaptions
  );
  const portraitAlt = `Portrait of ${member.name}`;

  return (
    <Link
      to={`/atlas-global-south-ai-policy-coalition/committee/${member.slug}/`}
      className="atlas-c-committee-card no-underline text-inherit focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-[var(--c-navy)]"
    >
      {media.portrait ? (
        <div className="atlas-person-image aspect-[4/5] mb-5 border border-[var(--hair)] bg-[var(--paper-deep)] overflow-hidden">
          <img
            src={media.portrait}
            alt={portraitAlt}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover object-top block"
          />
        </div>
      ) : (
        <div
          role="img"
          aria-label={portraitAlt}
          className="atlas-person-image aspect-[4/5] mb-5 border border-[var(--hair)] bg-[var(--paper-deep)] flex items-center justify-center"
        >
          <span className="font-[var(--font-serif)] font-semibold text-[clamp(32px,3vw,42px)] leading-none tracking-[-0.03em] text-[var(--c-navy)]">
            {getMemberInitials(member.name)}
          </span>
        </div>
      )}

      <span className="font-[var(--font-mono)] text-[11px] font-medium uppercase tracking-[0.1em] text-[var(--c-gold-ink)] tabular-nums block mb-2">
        {member.index}
      </span>

      <h3 className="atlas-c-card-title font-[var(--font-serif)] font-semibold text-[21px] leading-[1.22] tracking-[-0.025em] text-[var(--c-navy)] mb-2 transition-colors duration-[180ms] ease-out">
        {member.name}
      </h3>

      <p className="font-[var(--font-mono)] text-[11px] font-medium uppercase tracking-[0.08em] leading-[1.45] text-[var(--c-navy)] mb-2">
        {member.position}
      </p>

      <p className="text-[14px] leading-[1.5] text-[var(--muted)] mb-3 pb-3 border-b border-[var(--hair)]">
        {member.portfolio}
      </p>

      <p className="text-[15px] leading-[1.6] text-[var(--ink)] mb-4">
        {member.intro}
      </p>

      <span className="mt-auto pt-4 border-t border-[var(--hair)] font-[var(--font-mono)] text-[12px] font-medium uppercase tracking-[0.1em] text-[var(--c-navy)] inline-flex items-center gap-2">
        <span>{COALITION_PROFILE_LABELS.viewProfileLabel}</span>
        <span className="atlas-arrow" aria-hidden="true">
          →
        </span>
      </span>
    </Link>
  );
}

export function CoalitionPage() {
  const [activeNav, setActiveNav] = useState<string>('about');
  const [committeeVisible, setCommitteeVisible] = useState(false);
  const committeeRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const prevTitle = document.title;
    const descMeta = document.querySelector<HTMLMetaElement>(
      'meta[name="description"]'
    );
    const ogTitleMeta = document.querySelector<HTMLMetaElement>(
      'meta[property="og:title"]'
    );
    const ogDescMeta = document.querySelector<HTMLMetaElement>(
      'meta[property="og:description"]'
    );

    const prevDesc = descMeta?.content ?? '';
    const prevOgTitle = ogTitleMeta?.content ?? '';
    const prevOgDesc = ogDescMeta?.content ?? '';

    document.title = COALITION_META.title;
    if (descMeta) descMeta.content = COALITION_META.description;
    if (ogTitleMeta) ogTitleMeta.content = COALITION_META.title;
    if (ogDescMeta) ogDescMeta.content = COALITION_META.description;

    return () => {
      document.title = prevTitle;
      if (descMeta) descMeta.content = prevDesc;
      if (ogTitleMeta) ogTitleMeta.content = prevOgTitle;
      if (ogDescMeta) ogDescMeta.content = prevOgDesc;
    };
  }, []);

  useEffect(() => {
    const el = committeeRef.current;
    if (!el) return;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mq.matches) {
      setCommitteeVisible(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setCommitteeVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.06 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const allIds = [
      'about',
      'why',
      'vision',
      'mission',
      'focus',
      'committee',
      'host',
      'structure',
      'membership',
      'collaboration',
      'updates',
      'final',
      'contact',
    ];

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) => a.boundingClientRect.top - b.boundingClientRect.top
          );
        if (visible.length === 0) return;

        const targetId = visible[0].target.id;
        const matched = COALITION_SUBNAV.find((item) =>
          (item.matchIds as readonly string[]).includes(targetId)
        );
        if (matched) {
          setActiveNav(matched.id);
        }
      },
      { rootMargin: '-120px 0px -55% 0px', threshold: 0 }
    );

    for (const id of allIds) {
      const node = document.getElementById(id);
      if (node) observer.observe(node);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div className="atlas-coalition-scope">
      {/* Sticky Coalition Sub-Navigation */}
      <nav
        aria-label="Coalition sections"
        className="sticky top-[66px] z-30 bg-[var(--paper-deep)] border-b border-[var(--hair)]"
      >
        <div className="atlas-container">
          <ul className="atlas-c-subnav list-none p-0 m-0 flex items-center gap-5 sm:gap-6 overflow-x-auto">
            {COALITION_SUBNAV.map((item) => {
              const isActive = activeNav === item.id;
              return (
                <li key={item.id} className="shrink-0">
                  <a
                    href={`#${item.id}`}
                    onClick={() => setActiveNav(item.id)}
                    aria-current={isActive ? 'location' : undefined}
                    className={`inline-flex items-center min-h-[40px] py-2 font-[var(--font-mono)] text-[11px] font-medium uppercase tracking-[0.1em] whitespace-nowrap no-underline border-b-2 transition-colors ${
                      isActive
                        ? 'text-[var(--c-navy)] border-[var(--c-gold-ink)]'
                        : 'text-[var(--muted)] border-transparent hover:text-[var(--c-navy)] hover:border-[var(--c-gold-ink)]'
                    }`}
                  >
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>

      {/* 01 HERO */}
      <section
        aria-labelledby="coalition-hero-heading"
        className="atlas-c-navy-band bg-[var(--c-navy)] text-[var(--white)] py-12 sm:py-16 lg:py-24"
      >
        <div className="atlas-container">
          <div className="mb-8">
            <Link
              to="/"
              className="atlas-inline-link inline-flex items-center gap-2 font-[var(--font-mono)] text-[12px] uppercase tracking-[0.1em] text-white/75 hover:text-[var(--white)] no-underline min-h-[44px]"
            >
              <span aria-hidden="true">←</span>
              <span>Atlas AI Institute Home</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            <div className="lg:col-span-8">
              <Logo
                variant="coalition-white"
                priority
                heightClass="h-10 sm:h-12"
                className="mb-5 atlas-hero-stagger"
                isOnlyContent={false}
                fallback={null}
              />
              <span className="atlas-eyebrow text-[var(--c-gold)] block mb-4 atlas-hero-stagger">
                {COALITION_HERO.eyebrow}
              </span>

              <h1
                id="coalition-hero-heading"
                className="text-[var(--white)] mb-7 atlas-hero-stagger atlas-hero-delay-1"
              >
                {COALITION_HERO.heading}
              </h1>

              <div className="flex flex-col gap-5 atlas-measure mb-9 atlas-hero-stagger atlas-hero-delay-2">
                {COALITION_HERO.paragraphs.map((p, idx) => (
                  <p
                    key={idx}
                    className={
                      idx === 0
                        ? 'font-[var(--font-sans)] text-[clamp(18px,1.6vw,21px)] leading-[1.65] text-white/[0.92]'
                        : 'text-[17px] leading-[1.7] text-white/[0.82]'
                    }
                  >
                    {p}
                  </p>
                ))}
              </div>

              <div className="atlas-c-actions atlas-hero-stagger atlas-hero-delay-3">
                <a
                  href={COALITION_HERO.actions.primary.href}
                  className="atlas-btn atlas-c-btn-navy-primary"
                >
                  <span>{COALITION_HERO.actions.primary.label}</span>
                  <span className="atlas-arrow" aria-hidden="true">
                    →
                  </span>
                </a>
                <a
                  href={COALITION_HERO.actions.collaboration.href}
                  className="atlas-btn atlas-c-btn-navy-ghost"
                >
                  <span>{COALITION_HERO.actions.collaboration.label}</span>
                  <span className="atlas-arrow" aria-hidden="true">
                    →
                  </span>
                </a>
                <a
                  href={COALITION_HERO.actions.membership.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="atlas-btn atlas-c-btn-navy-ghost"
                >
                  <span>{COALITION_HERO.actions.membership.label}</span>
                  <span className="atlas-arrow" aria-hidden="true">
                    →
                  </span>
                </a>
                <a
                  href={COALITION_HERO.actions.officialSite.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="atlas-btn atlas-c-btn-navy-ghost"
                >
                  <span>{COALITION_HERO.actions.officialSite.label}</span>
                  <span className="atlas-arrow" aria-hidden="true">
                    →
                  </span>
                </a>
              </div>
            </div>

            <aside
              aria-label="Initiative Status"
              className="lg:col-span-4 bg-[var(--c-navy-2)] border border-white/15 border-t-2 border-t-[var(--c-gold)] p-7 sm:p-8 atlas-hero-stagger atlas-hero-delay-4"
            >
              <span className="atlas-eyebrow text-[var(--c-gold)] block mb-5">
                {COALITION_HERO.plateLabel}
              </span>
              <ul className="list-none p-0 m-0 border-t border-white/15">
                {COALITION_HERO.plateLines.map((line, idx) => (
                  <li
                    key={line}
                    className="grid grid-cols-[40px_1fr] items-baseline py-4 border-b border-white/15"
                  >
                    <span className="font-[var(--font-mono)] text-[12px] text-[var(--c-gold)] tabular-nums">
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                    <span className="font-[var(--font-serif)] font-semibold text-[19px] leading-[1.3] tracking-[-0.02em] text-[var(--white)]">
                      {line}
                    </span>
                  </li>
                ))}
              </ul>
            </aside>
          </div>
        </div>
      </section>

      {/* 02 ABOUT THE COALITION */}
      <CoalitionBand
        id={COALITION_ABOUT.id}
        sectionIndex={COALITION_ABOUT.sectionIndex}
        headingId="coalition-about-heading"
        variant="paper"
      >
        <span className="atlas-eyebrow text-[var(--c-gold-ink)] block mb-3">
          {COALITION_ABOUT.eyebrow}
        </span>
        <h2
          id="coalition-about-heading"
          className="text-[var(--c-navy)] mb-8"
        >
          {COALITION_ABOUT.heading}
        </h2>
        <div className="flex flex-col gap-5 atlas-measure">
          {COALITION_ABOUT.paragraphs.map((p, idx) => (
            <p
              key={idx}
              className={
                idx === 0
                  ? 'atlas-lead atlas-dropcap text-[var(--ink)]'
                  : 'text-[17px] leading-[1.7] text-[var(--muted)]'
              }
            >
              {p}
            </p>
          ))}
        </div>
      </CoalitionBand>

      {/* 03 WHY THE COALITION MATTERS */}
      <CoalitionBand
        id={COALITION_WHY.id}
        sectionIndex={COALITION_WHY.sectionIndex}
        headingId="coalition-why-heading"
        variant="deep"
      >
        <span className="atlas-eyebrow text-[var(--c-gold-ink)] block mb-3">
          {COALITION_WHY.eyebrow}
        </span>
        <h2
          id="coalition-why-heading"
          className="text-[var(--c-navy)] mb-8"
        >
          {COALITION_WHY.heading}
        </h2>
        <div className="flex flex-col gap-4 atlas-measure mb-10">
          {COALITION_WHY.paragraphs.map((p, idx) => (
            <p
              key={idx}
              className="text-[17px] leading-[1.7] text-[var(--muted)]"
            >
              {p}
            </p>
          ))}
        </div>

        <ol className="list-none p-0 m-0 border-t border-[var(--hair)]">
          {COALITION_WHY.priorities.map((item) => (
            <li
              key={item.index}
              className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-8 py-6 border-b border-[var(--hair)] items-baseline"
            >
              <div className="md:col-span-4 flex items-baseline gap-3">
                <span className="font-[var(--font-mono)] text-[12px] text-[var(--c-gold-ink)] tabular-nums shrink-0">
                  {item.index}
                </span>
                <h3 className="text-[20px] font-semibold text-[var(--c-navy)]">
                  {item.title}
                </h3>
              </div>
              <p className="md:col-span-8 text-[17px] leading-[1.7] text-[var(--muted)]">
                {item.description}
              </p>
            </li>
          ))}
        </ol>
      </CoalitionBand>

      {/* 04 OUR VISION (Full-width navy band) */}
      <CoalitionBand
        id={COALITION_VISION.id}
        sectionIndex={COALITION_VISION.sectionIndex}
        headingId="coalition-vision-heading"
        variant="navy"
      >
        <span className="atlas-eyebrow text-[var(--c-gold)] block mb-3">
          {COALITION_VISION.eyebrow}
        </span>
        <h2
          id="coalition-vision-heading"
          className="text-[var(--white)] mb-8"
        >
          {COALITION_VISION.heading}
        </h2>
        <p className="font-[var(--font-serif)] font-semibold text-[clamp(24px,2.8vw,36px)] leading-[1.25] tracking-[-0.025em] text-[var(--white)] max-w-[44ch] mb-8">
          {COALITION_VISION.statement}
        </p>
        <div className="flex flex-col gap-5 max-w-[54ch]">
          {COALITION_VISION.paragraphs.map((p, idx) => (
            <p
              key={idx}
              className="text-[17px] leading-[1.7] text-white/[0.84]"
            >
              {p}
            </p>
          ))}
        </div>
      </CoalitionBand>

      {/* 05 OUR MISSION */}
      <CoalitionBand
        id={COALITION_MISSION.id}
        sectionIndex={COALITION_MISSION.sectionIndex}
        headingId="coalition-mission-heading"
        variant="paper"
      >
        <span className="atlas-eyebrow text-[var(--c-gold-ink)] block mb-3">
          {COALITION_MISSION.eyebrow}
        </span>
        <h2
          id="coalition-mission-heading"
          className="text-[var(--c-navy)] mb-6"
        >
          {COALITION_MISSION.heading}
        </h2>
        <p className="atlas-lead mb-6">{COALITION_MISSION.lead}</p>
        <p className="font-[var(--font-mono)] text-[12px] uppercase tracking-[0.1em] text-[var(--c-navy)] mb-4">
          {COALITION_MISSION.listHeading}
        </p>

        <ol className="list-none p-0 m-0 border-t border-[var(--hair)]">
          {COALITION_MISSION.items.map((item, idx) => (
            <li
              key={idx}
              className="grid grid-cols-[44px_1fr] items-baseline py-5 border-b border-[var(--hair)]"
            >
              <span className="font-[var(--font-mono)] text-[12px] text-[var(--c-gold-ink)] tabular-nums">
                {String(idx + 1).padStart(2, '0')}
              </span>
              <span className="text-[17px] leading-[1.7] text-[var(--ink)] max-w-[65ch]">
                {item}
              </span>
            </li>
          ))}
        </ol>
      </CoalitionBand>

      {/* 06 STRATEGIC FOCUS AREAS */}
      <CoalitionBand
        id={COALITION_FOCUS_AREAS.id}
        sectionIndex={COALITION_FOCUS_AREAS.sectionIndex}
        headingId="coalition-focus-heading"
        variant="deep"
      >
        <span className="atlas-eyebrow text-[var(--c-gold-ink)] block mb-3">
          {COALITION_FOCUS_AREAS.eyebrow}
        </span>
        <h2
          id="coalition-focus-heading"
          className="text-[var(--c-navy)] mb-10"
        >
          {COALITION_FOCUS_AREAS.heading}
        </h2>

        <ol className="list-none p-0 m-0 border-t border-[var(--hair)]">
          {COALITION_FOCUS_AREAS.areas.map((area) => (
            <li
              key={area.index}
              className="py-8 border-b border-[var(--hair)] grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-start"
            >
              <div className="lg:col-span-6">
                <div className="flex items-baseline gap-4 mb-3">
                  <span className="font-[var(--font-serif)] font-semibold text-[clamp(28px,3vw,38px)] leading-none tracking-[-0.03em] text-[var(--c-gold-ink)] tabular-nums">
                    {area.index}
                  </span>
                  <h3 className="text-[22px] sm:text-[26px] leading-[1.2] font-semibold text-[var(--c-navy)]">
                    {area.title}
                  </h3>
                </div>
                <p className="text-[17px] leading-[1.7] text-[var(--muted)]">
                  {area.description}
                </p>
              </div>

              <div className="lg:col-span-6 bg-[var(--white)] border border-[var(--hair)] border-t-2 border-t-[var(--c-gold-ink)] p-6">
                <span className="font-[var(--font-mono)] text-[11px] font-medium uppercase tracking-[0.1em] text-[var(--c-navy)] block mb-3">
                  {COALITION_FOCUS_AREAS.engagementLabel}
                </span>
                <ul className="list-none p-0 m-0 border-t border-[var(--hair)]">
                  {area.engagements.map((item) => (
                    <li
                      key={item}
                      className="py-2 border-b border-[var(--hair)] last:border-b-0 text-[15px] leading-[1.55] text-[var(--ink)]"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ol>
      </CoalitionBand>

      {/* 07 FOUNDING COMMITTEE (Central feature of the page) */}
      <section
        ref={committeeRef}
        id={COALITION_COMMITTEE_META.id}
        aria-labelledby="coalition-committee-heading"
        className="atlas-section"
      >
        <div
          className={`atlas-container atlas-reveal ${
            committeeVisible ? 'is-visible' : ''
          }`}
        >
          <div className="border-t-2 border-[var(--c-gold-ink)] pt-4 mb-8 flex flex-wrap items-baseline justify-between gap-4">
            <span className="atlas-eyebrow text-[var(--c-gold-ink)]">
              {COALITION_COMMITTEE_META.sectionIndex}
            </span>
            <span className="atlas-eyebrow text-[var(--c-navy)]">
              {COALITION_COMMITTEE_META.eyebrow}
            </span>
          </div>

          <h2
            id="coalition-committee-heading"
            className="text-[var(--c-navy)] mb-6 max-w-[22ch]"
          >
            {COALITION_COMMITTEE_META.heading}
          </h2>

          <div className="flex flex-col gap-4 atlas-measure mb-12">
            {COALITION_COMMITTEE_META.paragraphs.map((p, idx) => (
              <p
                key={idx}
                className={
                  idx === 0
                    ? 'atlas-lead text-[var(--ink)]'
                    : 'text-[17px] leading-[1.7] text-[var(--muted)]'
                }
              >
                {p}
              </p>
            ))}
          </div>

          {/* Uniform 8-card Founding Committee grid (4 desktop, 2 tablet, 1 mobile) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
            {coalitionCommittee.map((member) => (
              <CommitteeCard key={member.slug} member={member} />
            ))}
          </div>

          <div>
            <a
              href={COALITION_COMMITTEE_META.directoryLink.href}
              target="_blank"
              rel="noopener noreferrer"
              className="atlas-inline-link inline-flex items-center gap-2 font-[var(--font-mono)] text-[12px] font-medium uppercase tracking-[0.1em] text-[var(--c-navy)] hover:text-[var(--c-gold-ink)] no-underline min-h-[44px]"
            >
              <span>{COALITION_COMMITTEE_META.directoryLink.label}</span>
              <span className="atlas-arrow" aria-hidden="true">
                →
              </span>
            </a>
          </div>
        </div>
      </section>

      {/* 08 INSTITUTIONAL HOST & SECRETARIAT */}
      <CoalitionBand
        id={COALITION_HOST.id}
        sectionIndex={COALITION_HOST.sectionIndex}
        headingId="coalition-host-heading"
        variant="deep"
      >
        <span className="atlas-eyebrow text-[var(--c-gold-ink)] block mb-3">
          {COALITION_HOST.eyebrow}
        </span>
        <h2
          id="coalition-host-heading"
          className="text-[var(--c-navy)] mb-8"
        >
          {COALITION_HOST.heading}
        </h2>

        <div className="flex flex-col gap-5 atlas-measure mb-10">
          {COALITION_HOST.paragraphs.map((p, idx) => (
            <p
              key={idx}
              className="text-[17px] leading-[1.7] text-[var(--muted)]"
            >
              {p}
            </p>
          ))}
        </div>

        <dl className="m-0 mb-10 border-t border-[var(--hair)] max-w-[65ch]">
          {COALITION_HOST.facts.map((fact) => (
            <div
              key={fact.label}
              className="grid grid-cols-1 sm:grid-cols-[200px_1fr] gap-2 py-4 border-b border-[var(--hair)] items-baseline"
            >
              <dt className="font-[var(--font-mono)] text-[12px] uppercase tracking-[0.1em] text-[var(--c-gold-ink)]">
                {fact.label}
              </dt>
              <dd className="m-0 text-[17px] text-[var(--ink)] font-medium">
                {'href' in fact && fact.href ? (
                  <a
                    href={fact.href}
                    target={
                      fact.href.startsWith('http') ? '_blank' : undefined
                    }
                    rel={
                      fact.href.startsWith('http')
                        ? 'noopener noreferrer'
                        : undefined
                    }
                    className="text-[var(--c-navy)] hover:text-[var(--c-gold-ink)] underline"
                  >
                    {fact.value}
                  </a>
                ) : (
                  fact.value
                )}
              </dd>
            </div>
          ))}
        </dl>

        <div>
          <a
            href={COALITION_HOST.cta.href}
            target="_blank"
            rel="noopener noreferrer"
            className="atlas-btn atlas-c-btn-primary"
          >
            <span>{COALITION_HOST.cta.label}</span>
            <span className="atlas-arrow" aria-hidden="true">
              →
            </span>
          </a>
        </div>
      </CoalitionBand>

      {/* 09 HOW THE COALITION WORKS */}
      <CoalitionBand
        id={COALITION_STRUCTURE.id}
        sectionIndex={COALITION_STRUCTURE.sectionIndex}
        headingId="coalition-structure-heading"
        variant="paper"
      >
        <span className="atlas-eyebrow text-[var(--c-gold-ink)] block mb-3">
          {COALITION_STRUCTURE.eyebrow}
        </span>
        <h2
          id="coalition-structure-heading"
          className="text-[var(--c-navy)] mb-6"
        >
          {COALITION_STRUCTURE.heading}
        </h2>
        <p className="atlas-lead mb-10">{COALITION_STRUCTURE.intro}</p>

        <ol className="list-none p-0 m-0 border-t border-[var(--hair)]">
          {COALITION_STRUCTURE.rows.map((row) => (
            <li
              key={row.index}
              className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-8 py-6 border-b border-[var(--hair)] items-baseline"
            >
              <div className="md:col-span-4 flex items-baseline gap-3">
                <span className="font-[var(--font-mono)] text-[12px] text-[var(--c-gold-ink)] tabular-nums shrink-0">
                  {row.index}
                </span>
                <h3 className="text-[20px] font-semibold text-[var(--c-navy)]">
                  {row.title}
                </h3>
              </div>
              <p className="md:col-span-8 text-[17px] leading-[1.7] text-[var(--muted)]">
                {row.description}
              </p>
            </li>
          ))}
        </ol>
      </CoalitionBand>

      {/* 10 MEMBERSHIP & PARTICIPATION (Navy band) */}
      <CoalitionBand
        id={COALITION_MEMBERSHIP.id}
        sectionIndex={COALITION_MEMBERSHIP.sectionIndex}
        headingId="coalition-membership-heading"
        variant="navy"
      >
        <span className="atlas-eyebrow text-[var(--c-gold)] block mb-3">
          {COALITION_MEMBERSHIP.eyebrow}
        </span>
        <h2
          id="coalition-membership-heading"
          className="text-[var(--white)] mb-6"
        >
          {COALITION_MEMBERSHIP.heading}
        </h2>
        <p className="font-[var(--font-sans)] text-[clamp(18px,1.6vw,21px)] leading-[1.65] max-w-[60ch] text-white/[0.86] mb-10">
          {COALITION_MEMBERSHIP.intro}
        </p>

        <p className="font-[var(--font-mono)] text-[12px] uppercase tracking-[0.1em] text-[var(--c-gold)] mb-4">
          {COALITION_MEMBERSHIP.listHeading}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 border-t border-white/20 mb-10">
          {COALITION_MEMBERSHIP.participants.map((item) => (
            <div key={item.title} className="py-7 border-b border-white/20">
              <h3 className="text-[20px] font-semibold text-[var(--white)] mb-2.5">
                {item.title}
              </h3>
              <p className="text-[16px] leading-[1.65] text-white/[0.82]">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        <div className="atlas-c-actions mb-10">
          <a
            href={COALITION_MEMBERSHIP.ctas.apply.href}
            target="_blank"
            rel="noopener noreferrer"
            className="atlas-btn atlas-c-btn-navy-primary"
          >
            <span>{COALITION_MEMBERSHIP.ctas.apply.label}</span>
            <span className="atlas-arrow" aria-hidden="true">
              →
            </span>
          </a>
          <a
            href={COALITION_MEMBERSHIP.ctas.explore.href}
            target="_blank"
            rel="noopener noreferrer"
            className="atlas-btn atlas-c-btn-navy-ghost"
          >
            <span>{COALITION_MEMBERSHIP.ctas.explore.label}</span>
            <span className="atlas-arrow" aria-hidden="true">
              →
            </span>
          </a>
        </div>

        <NoteBox className="max-w-[68ch] atlas-c-note">
          {COALITION_MEMBERSHIP.note}
        </NoteBox>
      </CoalitionBand>

      {/* 11 COLLABORATION OPPORTUNITIES */}
      <CoalitionBand
        id={COALITION_COLLABORATION.id}
        sectionIndex={COALITION_COLLABORATION.sectionIndex}
        headingId="coalition-collaboration-heading"
        variant="paper"
      >
        <span className="atlas-eyebrow text-[var(--c-gold-ink)] block mb-3">
          {COALITION_COLLABORATION.eyebrow}
        </span>
        <h2
          id="coalition-collaboration-heading"
          className="text-[var(--c-navy)] mb-6"
        >
          {COALITION_COLLABORATION.heading}
        </h2>
        <p className="atlas-lead mb-8">{COALITION_COLLABORATION.intro}</p>

        <p className="font-[var(--font-mono)] text-[12px] uppercase tracking-[0.1em] text-[var(--c-navy)] mb-4">
          {COALITION_COLLABORATION.listHeading}
        </p>

        <ul className="list-none p-0 m-0 border-t border-[var(--hair)] mb-8 max-w-[65ch]">
          {COALITION_COLLABORATION.areas.map((area, idx) => (
            <li
              key={idx}
              className="grid grid-cols-[28px_1fr] items-baseline py-4 border-b border-[var(--hair)] text-[17px] leading-[1.6] text-[var(--ink)]"
            >
              <span
                aria-hidden="true"
                className="font-[var(--font-mono)] text-[12px] text-[var(--c-gold-ink)]"
              >
                —
              </span>
              <span>{area}</span>
            </li>
          ))}
        </ul>

        <p className="text-[17px] leading-[1.7] text-[var(--muted)] max-w-[65ch] mb-8">
          {COALITION_COLLABORATION.closing}
        </p>

        <div>
          <a
            href={COALITION_COLLABORATION.cta.href}
            className="atlas-btn atlas-c-btn-primary"
          >
            <span>{COALITION_COLLABORATION.cta.label}</span>
            <span className="atlas-arrow" aria-hidden="true">
              →
            </span>
          </a>
        </div>
      </CoalitionBand>

      {/* 12 KNOWLEDGE & ACTIVITIES */}
      <CoalitionBand
        id={COALITION_UPDATES_META.id}
        sectionIndex={COALITION_UPDATES_META.sectionIndex}
        headingId="coalition-updates-heading"
        variant="deep"
      >
        <span className="atlas-eyebrow text-[var(--c-gold-ink)] block mb-3">
          {COALITION_UPDATES_META.eyebrow}
        </span>
        <h2
          id="coalition-updates-heading"
          className="text-[var(--c-navy)] mb-6"
        >
          {COALITION_UPDATES_META.heading}
        </h2>
        <p className="atlas-lead mb-6">{COALITION_UPDATES_META.intro}</p>

        <p className="font-[var(--font-mono)] text-[12px] uppercase tracking-[0.1em] leading-[1.8] text-[var(--c-gold-ink)] mb-8">
          {COALITION_UPDATES_META.categories.join(' · ')}
        </p>

        {coalitionUpdates.length > 0 && (
          <ol className="list-none p-0 m-0 border-t border-[var(--hair)] mb-10">
            {coalitionUpdates.map((item) => (
              <li
                key={item.id}
                className="py-6 border-b border-[var(--hair)]"
              >
                <span className="font-[var(--font-mono)] text-[11px] uppercase tracking-[0.1em] text-[var(--c-gold-ink)] block mb-2">
                  {item.category} · {item.date}
                </span>
                <h3 className="text-[22px] font-semibold text-[var(--c-navy)] mb-2">
                  {item.title}
                </h3>
                <p className="text-[16px] leading-[1.65] text-[var(--muted)] max-w-[65ch] mb-4">
                  {item.description}
                </p>
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="atlas-inline-link inline-flex items-center gap-2 font-[var(--font-mono)] text-[12px] uppercase tracking-[0.1em] text-[var(--c-navy)] hover:text-[var(--c-gold-ink)] no-underline min-h-[44px]"
                >
                  <span>Read update</span>
                  <span className="atlas-arrow" aria-hidden="true">
                    →
                  </span>
                </a>
              </li>
            ))}
          </ol>
        )}

        <div>
          <a
            href={COALITION_UPDATES_META.cta.href}
            target="_blank"
            rel="noopener noreferrer"
            className="atlas-btn atlas-c-btn-primary"
          >
            <span>{COALITION_UPDATES_META.cta.label}</span>
            <span className="atlas-arrow" aria-hidden="true">
              →
            </span>
          </a>
        </div>
      </CoalitionBand>

      {/* 13 FINAL CALL TO ACTION (Navy band) */}
      <CoalitionBand
        id={COALITION_FINAL_CTA.id}
        sectionIndex={COALITION_FINAL_CTA.sectionIndex}
        headingId="coalition-final-heading"
        variant="navy"
      >
        <span className="atlas-eyebrow text-[var(--c-gold)] block mb-3">
          {COALITION_FINAL_CTA.eyebrow}
        </span>
        <h2
          id="coalition-final-heading"
          className="text-[var(--white)] mb-8"
        >
          {COALITION_FINAL_CTA.heading}
        </h2>

        <div className="flex flex-col gap-5 atlas-measure mb-10">
          {COALITION_FINAL_CTA.paragraphs.map((p, idx) => (
            <p
              key={idx}
              className={
                idx === 0
                  ? 'text-[clamp(18px,1.6vw,21px)] leading-[1.65] text-white/[0.9]'
                  : 'text-[17px] leading-[1.7] text-white/[0.82]'
              }
            >
              {p}
            </p>
          ))}
        </div>

        <div className="atlas-c-actions">
          <a
            href={COALITION_FINAL_CTA.ctas.committee.href}
            className="atlas-btn atlas-c-btn-navy-primary"
          >
            <span>{COALITION_FINAL_CTA.ctas.committee.label}</span>
            <span className="atlas-arrow" aria-hidden="true">
              →
            </span>
          </a>
          <a
            href={COALITION_FINAL_CTA.ctas.membership.href}
            className="atlas-btn atlas-c-btn-navy-ghost"
          >
            <span>{COALITION_FINAL_CTA.ctas.membership.label}</span>
            <span className="atlas-arrow" aria-hidden="true">
              →
            </span>
          </a>
          <a
            href={COALITION_FINAL_CTA.ctas.collaboration.href}
            className="atlas-btn atlas-c-btn-navy-ghost"
          >
            <span>{COALITION_FINAL_CTA.ctas.collaboration.label}</span>
            <span className="atlas-arrow" aria-hidden="true">
              →
            </span>
          </a>
        </div>
      </CoalitionBand>

      {/* 14 CONTACT */}
      <CoalitionBand
        id={COALITION_CONTACT.id}
        sectionIndex={COALITION_CONTACT.sectionIndex}
        headingId="coalition-contact-heading"
        variant="paper"
      >
        <h2
          id="coalition-contact-heading"
          className="text-[var(--c-navy)] mb-6"
        >
          {COALITION_CONTACT.heading}
        </h2>

        <p className="text-[18px] font-medium text-[var(--ink)] mb-6">
          {COALITION_CONTACT.hostLine}
        </p>

        <div className="flex flex-col gap-3 text-[17px] border-t border-[var(--hair)] pt-6 max-w-[65ch]">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <span>
              Email:{' '}
              <a
                href={`mailto:${COALITION_CONTACT.email}`}
                className="text-[var(--c-navy)] font-medium underline hover:text-[var(--c-gold-ink)]"
              >
                {COALITION_CONTACT.email}
              </a>
            </span>
            <span aria-hidden="true" className="text-[var(--muted)]">
              ·
            </span>
            <span>
              Website:{' '}
              <a
                href={COALITION_CONTACT.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--c-navy)] font-medium underline hover:text-[var(--c-gold-ink)]"
              >
                {COALITION_CONTACT.website}
              </a>
            </span>
          </div>

          <p>
            Membership and Committee Information:{' '}
            <a
              href={COALITION_CONTACT.directoryUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--c-navy)] font-medium underline hover:text-[var(--c-gold-ink)] break-all"
            >
              {COALITION_CONTACT.directoryUrl}
            </a>
          </p>
        </div>
      </CoalitionBand>

      {/* 15 PAGE FOOTER (Replaces global footer on this route only) */}
      <CoalitionFooter />
    </div>
  );
}
