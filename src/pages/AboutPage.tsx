import { useEffect, useRef, useState, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import {
  ABOUT_APPROACH,
  ABOUT_COALITION,
  ABOUT_CONTACT_INFO,
  ABOUT_HERO,
  ABOUT_INSTITUTIONAL_WORK,
  ABOUT_INTERNATIONAL,
  ABOUT_LEADERSHIP,
  ABOUT_MISSION,
  ABOUT_PAGE_META,
  ABOUT_PRINCIPLES,
  ABOUT_PUBLICATIONS,
  ABOUT_RESEARCH_AREAS,
  ABOUT_VISION,
  ABOUT_WHO_WE_ARE,
  ABOUT_WHY_ATLAS,
  ABOUT_WORK_WITH_ATLAS,
} from '../data/about';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { Eyebrow } from '../components/Eyebrow';
import { NoteBox } from '../components/NoteBox';
import { PullQuote } from '../components/PullQuote';
import { SectionShell } from '../components/SectionShell';

interface RevealBandProps {
  id?: string;
  headingId: string;
  variant?: 'paper' | 'deep' | 'ink';
  compact?: boolean;
  className?: string;
  children: ReactNode;
}

function RevealBand({
  id,
  headingId,
  variant = 'paper',
  compact = false,
  className = '',
  children,
}: RevealBandProps) {
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

  const variantClass =
    variant === 'deep'
      ? 'atlas-section-deep'
      : variant === 'ink'
        ? 'atlas-section-ink'
        : '';

  return (
    <section
      ref={ref}
      id={id}
      aria-labelledby={headingId}
      className={`atlas-section ${variantClass} ${
        compact ? 'atlas-section-compact' : ''
      } ${className}`.trim()}
    >
      <div
        className={`atlas-container atlas-reveal ${
          visible ? 'is-visible' : ''
        }`}
      >
        {children}
      </div>
    </section>
  );
}

export function AboutPage() {
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

    document.title = ABOUT_PAGE_META.title;
    if (descMeta) descMeta.content = ABOUT_PAGE_META.description;
    if (ogTitleMeta) ogTitleMeta.content = ABOUT_PAGE_META.title;
    if (ogDescMeta) ogDescMeta.content = ABOUT_PAGE_META.description;

    return () => {
      document.title = prevTitle;
      if (descMeta) descMeta.content = prevDesc;
      if (ogTitleMeta) ogTitleMeta.content = prevOgTitle;
      if (ogDescMeta) ogDescMeta.content = prevOgDesc;
    };
  }, []);

  return (
    <>
      {/* 01. PAGE HERO: two-column (text left, mono plate right) */}
      <section aria-labelledby="about-hero-heading" className="py-12 sm:py-16 lg:py-24">
        <div className="atlas-container">
          <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
            <Link
              to="/"
              className="atlas-inline-link inline-flex items-center gap-2 font-[var(--font-mono)] text-[12px] uppercase tracking-[0.1em] text-[var(--muted)] hover:text-[var(--cobalt)] no-underline min-h-[44px]"
            >
              <span aria-hidden="true">←</span>
              <span>Atlas AI Institute Home</span>
            </Link>
            <Eyebrow>{ABOUT_HERO.sectionIndex}</Eyebrow>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            <div className="lg:col-span-7">
              <Eyebrow cobalt className="mb-4 atlas-hero-stagger">
                {ABOUT_HERO.eyebrow}
              </Eyebrow>
              <h1
                id="about-hero-heading"
                className="mb-7 atlas-hero-stagger atlas-hero-delay-1"
              >
                {ABOUT_HERO.title}
              </h1>

              <div className="flex flex-col gap-5 atlas-measure mb-9 atlas-hero-stagger atlas-hero-delay-2">
                {ABOUT_HERO.paragraphs.map((p, idx) => (
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

              <div className="flex flex-wrap gap-4 atlas-hero-stagger atlas-hero-delay-3">
                <Button to={ABOUT_HERO.primaryCta.to} variant="primary">
                  {ABOUT_HERO.primaryCta.label}
                </Button>
                <Button to={ABOUT_HERO.secondaryCta.to} variant="ghost">
                  {ABOUT_HERO.secondaryCta.label}
                </Button>
              </div>
            </div>

            <aside
              aria-label="Institute Focus"
              className="lg:col-span-5 bg-[var(--white)] border border-[var(--hair)] border-t-2 border-t-[var(--ink)] p-7 sm:p-8 atlas-hero-stagger atlas-hero-delay-4"
            >
              <Eyebrow className="mb-4">{ABOUT_HERO.plate.label}</Eyebrow>
              <ol className="list-none p-0 m-0">
                {ABOUT_HERO.plate.items.map((item) => (
                  <li
                    key={item.index}
                    className="grid grid-cols-[44px_1fr] items-baseline py-3.5 border-b border-[var(--hair)] last:border-b-0"
                  >
                    <span className="font-[var(--font-mono)] text-[12px] text-[var(--cobalt)] tabular-nums">
                      {item.index}
                    </span>
                    <span className="font-[var(--font-serif)] font-semibold text-[20px] leading-[1.3] tracking-[-0.025em] text-[var(--ink)]">
                      {item.label}
                    </span>
                  </li>
                ))}
              </ol>
            </aside>
          </div>
        </div>
      </section>

      {/* 02. WHO WE ARE: 25/75 sticky-index layout with serif drop-cap */}
      <SectionShell
        id={ABOUT_WHO_WE_ARE.id}
        eyebrow={ABOUT_WHO_WE_ARE.sectionIndex}
        headingId="about-who-heading"
        variant="deep"
      >
        <Eyebrow cobalt className="mb-3">
          {ABOUT_WHO_WE_ARE.eyebrow}
        </Eyebrow>
        <h2 id="about-who-heading" className="mb-8">
          {ABOUT_WHO_WE_ARE.heading}
        </h2>

        <div className="flex flex-col gap-5 atlas-measure">
          {ABOUT_WHO_WE_ARE.paragraphs.map((p, idx) => (
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
      </SectionShell>

      {/* 03. WHY ATLAS EXISTS: wide heading, five numbered rows (4/8 grid), closing pull-quote */}
      <RevealBand id={ABOUT_WHY_ATLAS.id} headingId="about-why-heading">
        <div className="border-t-2 border-[var(--ink)] pt-4 mb-8 flex flex-wrap items-baseline justify-between gap-4">
          <Eyebrow>{ABOUT_WHY_ATLAS.sectionIndex}</Eyebrow>
          <Eyebrow cobalt>{ABOUT_WHY_ATLAS.eyebrow}</Eyebrow>
        </div>

        <h2 id="about-why-heading" className="max-w-[24ch] mb-8">
          {ABOUT_WHY_ATLAS.heading}
        </h2>

        <div className="flex flex-col gap-4 atlas-measure mb-10">
          {ABOUT_WHY_ATLAS.paragraphs.map((p, idx) => (
            <p
              key={idx}
              className={
                idx === 1
                  ? 'text-[19px] font-medium text-[var(--ink)]'
                  : 'text-[17px] leading-[1.7] text-[var(--muted)]'
              }
            >
              {p}
            </p>
          ))}
        </div>

        <ol className="list-none p-0 m-0 border-t border-[var(--hair)] mb-12">
          {ABOUT_WHY_ATLAS.challenges.map((item) => (
            <li
              key={item.index}
              className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-10 py-6 border-b border-[var(--hair)] items-baseline"
            >
              <div className="md:col-span-4 flex items-baseline gap-3">
                <span className="font-[var(--font-mono)] text-[12px] text-[var(--cobalt)] tabular-nums shrink-0">
                  {item.index}
                </span>
                <h3 className="text-[20px] font-semibold text-[var(--ink)]">
                  {item.title}
                </h3>
              </div>
              <p className="md:col-span-8 text-[17px] leading-[1.7] text-[var(--muted)] max-w-[65ch]">
                {item.description}
              </p>
            </li>
          ))}
        </ol>

        <PullQuote quote={ABOUT_WHY_ATLAS.pullQuote} className="max-w-[44ch]" />
      </RevealBand>

      {/* 04. OUR MISSION: 25/75 layout, six-item numbered list with hairline rules */}
      <SectionShell
        id={ABOUT_MISSION.id}
        eyebrow={ABOUT_MISSION.sectionIndex}
        headingId="about-mission-heading"
      >
        <Eyebrow cobalt className="mb-3">
          {ABOUT_MISSION.eyebrow}
        </Eyebrow>
        <h2 id="about-mission-heading" className="mb-6">
          {ABOUT_MISSION.heading}
        </h2>
        <p className="atlas-lead mb-6">{ABOUT_MISSION.lead}</p>
        <p className="font-[var(--font-mono)] text-[12px] uppercase tracking-[0.1em] text-[var(--ink)] mb-4">
          {ABOUT_MISSION.listHeading}
        </p>

        <ol className="list-none p-0 m-0 border-t border-[var(--hair)]">
          {ABOUT_MISSION.items.map((item, idx) => (
            <li
              key={idx}
              className="grid grid-cols-[44px_1fr] items-baseline py-5 border-b border-[var(--hair)]"
            >
              <span className="font-[var(--font-mono)] text-[12px] text-[var(--cobalt)] tabular-nums">
                {String(idx + 1).padStart(2, '0')}
              </span>
              <span className="text-[17px] leading-[1.7] text-[var(--ink)] max-w-[65ch]">
                {item}
              </span>
            </li>
          ))}
        </ol>
      </SectionShell>

      {/* 05. OUR VISION: full-width paper-deep band, large serif statement, narrow text column */}
      <RevealBand
        id={ABOUT_VISION.id}
        headingId="about-vision-heading"
        variant="deep"
      >
        <div className="border-t-2 border-[var(--ink)] pt-4 mb-8 flex flex-wrap items-baseline justify-between gap-4">
          <Eyebrow>{ABOUT_VISION.sectionIndex}</Eyebrow>
          <Eyebrow cobalt>{ABOUT_VISION.eyebrow}</Eyebrow>
        </div>

        <h2 id="about-vision-heading" className="mb-8">
          {ABOUT_VISION.heading}
        </h2>

        <p className="font-[var(--font-serif)] font-semibold text-[clamp(24px,2.8vw,36px)] leading-[1.25] tracking-[-0.025em] text-[var(--ink)] max-w-[44ch] mb-8">
          {ABOUT_VISION.statement}
        </p>

        <div className="flex flex-col gap-5 max-w-[54ch]">
          {ABOUT_VISION.paragraphs.map((p, idx) => (
            <p key={idx} className="text-[17px] leading-[1.7] text-[var(--muted)]">
              {p}
            </p>
          ))}
        </div>
      </RevealBand>

      {/* 06. OUR RESEARCH APPROACH: six cards in a 3-column grid (2 tablet, 1 mobile) */}
      <SectionShell
        id={ABOUT_APPROACH.id}
        eyebrow={ABOUT_APPROACH.sectionIndex}
        headingId="about-approach-heading"
      >
        <Eyebrow cobalt className="mb-3">
          {ABOUT_APPROACH.eyebrow}
        </Eyebrow>
        <h2 id="about-approach-heading" className="mb-5">
          {ABOUT_APPROACH.heading}
        </h2>
        <p className="atlas-lead mb-10">{ABOUT_APPROACH.introduction}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ABOUT_APPROACH.cards.map((card) => (
            <Card key={card.index}>
              <div>
                <span className="atlas-eyebrow text-[var(--cobalt)] block mb-3 tabular-nums">
                  {card.index}
                </span>
                <h3 className="atlas-card-title mb-3 text-[var(--ink)]">
                  {card.title}
                </h3>
                <p className="text-[16px] leading-[1.65] text-[var(--muted)]">
                  {card.description}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </SectionShell>

      {/* 07. RESEARCH AREAS: six numbered rows (editorial index list, not cards), ending with CTA */}
      <SectionShell
        id={ABOUT_RESEARCH_AREAS.id}
        eyebrow={ABOUT_RESEARCH_AREAS.sectionIndex}
        headingId="about-areas-heading"
      >
        <Eyebrow cobalt className="mb-3">
          {ABOUT_RESEARCH_AREAS.eyebrow}
        </Eyebrow>
        <h2 id="about-areas-heading" className="mb-5">
          {ABOUT_RESEARCH_AREAS.heading}
        </h2>
        <p className="atlas-lead mb-10">{ABOUT_RESEARCH_AREAS.introduction}</p>

        <ol className="list-none p-0 m-0 border-t border-[var(--hair)] mb-10">
          {ABOUT_RESEARCH_AREAS.areas.map((area) => (
            <li
              key={area.index}
              className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-8 py-6 border-b border-[var(--hair)] items-baseline"
            >
              <div className="md:col-span-5 flex items-baseline gap-3">
                <span className="font-[var(--font-mono)] text-[12px] text-[var(--cobalt)] tabular-nums shrink-0">
                  {area.index}
                </span>
                <h3 className="text-[20px] font-semibold text-[var(--ink)]">
                  {area.title}
                </h3>
              </div>
              <p className="md:col-span-7 text-[17px] leading-[1.7] text-[var(--muted)]">
                {area.description}
              </p>
            </li>
          ))}
        </ol>

        <div>
          <Button to={ABOUT_RESEARCH_AREAS.cta.to} variant="primary">
            {ABOUT_RESEARCH_AREAS.cta.label}
          </Button>
        </div>
      </SectionShell>

      {/* 08. OUR RESEARCH AND INSTITUTIONAL WORK: six linked rows with title, description, mono "→" link */}
      <SectionShell
        id={ABOUT_INSTITUTIONAL_WORK.id}
        eyebrow={ABOUT_INSTITUTIONAL_WORK.sectionIndex}
        headingId="about-work-heading"
      >
        <Eyebrow cobalt className="mb-3">
          {ABOUT_INSTITUTIONAL_WORK.eyebrow}
        </Eyebrow>
        <h2 id="about-work-heading" className="mb-5">
          {ABOUT_INSTITUTIONAL_WORK.heading}
        </h2>
        <p className="atlas-lead mb-10">{ABOUT_INSTITUTIONAL_WORK.intro}</p>

        <ul className="list-none p-0 m-0 border-t border-[var(--hair)]">
          {ABOUT_INSTITUTIONAL_WORK.items.map((item) => (
            <li key={item.title} className="border-b border-[var(--hair)]">
              {'to' in item && item.to ? (
                <Link
                  to={item.to}
                  className="atlas-inline-link group grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-8 py-6 items-baseline no-underline text-inherit"
                >
                  <h3 className="md:col-span-4 text-[20px] font-semibold text-[var(--ink)] group-hover:text-[var(--cobalt)] transition-colors">
                    {item.title}
                  </h3>
                  <p className="md:col-span-7 text-[16px] leading-[1.65] text-[var(--muted)]">
                    {item.description}
                  </p>
                  <span className="md:col-span-1 md:text-right font-[var(--font-mono)] text-[14px] text-[var(--cobalt)]">
                    <span className="atlas-arrow" aria-hidden="true">
                      →
                    </span>
                    <span className="sr-only">Explore {item.title}</span>
                  </span>
                </Link>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-8 py-6 items-baseline">
                  <h3 className="md:col-span-4 text-[20px] font-semibold text-[var(--ink)]">
                    {item.title}
                  </h3>
                  <p className="md:col-span-7 text-[16px] leading-[1.65] text-[var(--muted)]">
                    {item.description}
                  </p>
                </div>
              )}
            </li>
          ))}
        </ul>
      </SectionShell>

      {/* 09. INSTITUTIONAL PRINCIPLES: paper-deep band, 2x3 grid separated only by hair rules (no boxes), followed by NoteBox */}
      <RevealBand
        id={ABOUT_PRINCIPLES.id}
        headingId="about-principles-heading"
        variant="deep"
      >
        <div className="border-t-2 border-[var(--ink)] pt-4 mb-8 flex flex-wrap items-baseline justify-between gap-4">
          <Eyebrow>{ABOUT_PRINCIPLES.sectionIndex}</Eyebrow>
          <Eyebrow cobalt>{ABOUT_PRINCIPLES.eyebrow}</Eyebrow>
        </div>

        <h2 id="about-principles-heading" className="mb-12">
          {ABOUT_PRINCIPLES.heading}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 border-t border-[var(--hair)] mb-10">
          {ABOUT_PRINCIPLES.items.map((item) => (
            <div
              key={item.title}
              className="py-7 border-b border-[var(--hair)]"
            >
              <h3 className="text-[20px] font-semibold text-[var(--ink)] mb-3">
                {item.title}
              </h3>
              <p className="text-[16px] leading-[1.65] text-[var(--muted)]">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        <NoteBox className="max-w-[68ch]">{ABOUT_PRINCIPLES.note}</NoteBox>
      </RevealBand>

      {/* 10. INTERNATIONAL ENGAGEMENT: 25/75 layout, text plus NoteBox */}
      <SectionShell
        id={ABOUT_INTERNATIONAL.id}
        eyebrow={ABOUT_INTERNATIONAL.sectionIndex}
        headingId="about-international-heading"
      >
        <Eyebrow cobalt className="mb-3">
          {ABOUT_INTERNATIONAL.eyebrow}
        </Eyebrow>
        <h2 id="about-international-heading" className="mb-8">
          {ABOUT_INTERNATIONAL.heading}
        </h2>

        <div className="flex flex-col gap-5 atlas-measure mb-8">
          {ABOUT_INTERNATIONAL.paragraphs.map((p, idx) => (
            <p key={idx} className="text-[17px] leading-[1.7] text-[var(--muted)]">
              {p}
            </p>
          ))}
        </div>

        <NoteBox className="max-w-[68ch] mb-8">
          {ABOUT_INTERNATIONAL.note}
        </NoteBox>

        <div>
          <Button href={ABOUT_INTERNATIONAL.cta.href} variant="primary">
            {ABOUT_INTERNATIONAL.cta.label}
          </Button>
        </div>
      </SectionShell>

      {/* 11. ATLAS GLOBAL SOUTH AI POLICY COALITION: ink-background panel, white serif heading, mono label, ghost-light button */}
      <RevealBand
        id={ABOUT_COALITION.id}
        headingId="about-coalition-heading"
        variant="ink"
      >
        <div className="border-t-2 border-white/40 pt-4 mb-8 flex flex-wrap items-baseline justify-between gap-4">
          <span className="atlas-eyebrow text-[var(--footer-muted)]">
            {ABOUT_COALITION.sectionIndex}
          </span>
          <span className="atlas-eyebrow text-[var(--footer-muted)]">
            {ABOUT_COALITION.eyebrow}
          </span>
        </div>

        <h2
          id="about-coalition-heading"
          className="text-[var(--white)] mb-8 max-w-[22ch]"
        >
          {ABOUT_COALITION.heading}
        </h2>

        <div className="flex flex-col gap-5 max-w-[65ch] mb-10">
          {ABOUT_COALITION.paragraphs.map((p, idx) => (
            <p key={idx} className="text-[17px] leading-[1.7] text-white/85">
              {p}
            </p>
          ))}
        </div>

        <div>
          <Button to={ABOUT_COALITION.cta.to} variant="ghost-light">
            {ABOUT_COALITION.cta.label}
          </Button>
        </div>
      </RevealBand>

      {/* 12. LEADERSHIP AND INSTITUTIONAL GOVERNANCE: prominent full-width block, 2px ink top rule, large solid CTA */}
      <RevealBand
        id={ABOUT_LEADERSHIP.id}
        headingId="about-leadership-heading"
      >
        <div className="border-t-2 border-[var(--ink)] pt-6 mb-8 flex flex-wrap items-baseline justify-between gap-4">
          <Eyebrow>{ABOUT_LEADERSHIP.sectionIndex}</Eyebrow>
          <Eyebrow cobalt>{ABOUT_LEADERSHIP.eyebrow}</Eyebrow>
        </div>

        <h2
          id="about-leadership-heading"
          className="text-[clamp(34px,4.8vw,62px)] leading-[1.05] mb-8 max-w-[20ch]"
        >
          {ABOUT_LEADERSHIP.heading}
        </h2>

        <div className="flex flex-col gap-4 atlas-measure mb-10">
          {ABOUT_LEADERSHIP.paragraphs.map((p, idx) => (
            <p key={idx} className="atlas-lead">
              {p}
            </p>
          ))}
        </div>

        <div>
          <Button
            to={ABOUT_LEADERSHIP.cta.to}
            variant="primary"
            size="lg"
          >
            {ABOUT_LEADERSHIP.cta.label}
          </Button>
        </div>
      </RevealBand>

      {/* 13. PUBLICATIONS AND KNOWLEDGE: 25/75 layout with two buttons */}
      <SectionShell
        id={ABOUT_PUBLICATIONS.id}
        eyebrow={ABOUT_PUBLICATIONS.sectionIndex}
        headingId="about-publications-heading"
        variant="deep"
      >
        <Eyebrow cobalt className="mb-3">
          {ABOUT_PUBLICATIONS.eyebrow}
        </Eyebrow>
        <h2 id="about-publications-heading" className="mb-8">
          {ABOUT_PUBLICATIONS.heading}
        </h2>

        <div className="flex flex-col gap-5 atlas-measure mb-10">
          {ABOUT_PUBLICATIONS.paragraphs.map((p, idx) => (
            <p key={idx} className="text-[17px] leading-[1.7] text-[var(--muted)]">
              {p}
            </p>
          ))}
        </div>

        <div className="flex flex-wrap gap-4">
          <Button to={ABOUT_PUBLICATIONS.primaryCta.to} variant="primary">
            {ABOUT_PUBLICATIONS.primaryCta.label}
          </Button>
          <Button to={ABOUT_PUBLICATIONS.secondaryCta.to} variant="ghost">
            {ABOUT_PUBLICATIONS.secondaryCta.label}
          </Button>
        </div>
      </SectionShell>

      {/* 14. WORK WITH ATLAS: two-column, text left, bullet list right, then two CTAs (id="contact") */}
      <RevealBand id={ABOUT_WORK_WITH_ATLAS.id} headingId="about-collaborate-heading">
        <div className="border-t-2 border-[var(--ink)] pt-4 mb-8 flex flex-wrap items-baseline justify-between gap-4">
          <Eyebrow>{ABOUT_WORK_WITH_ATLAS.sectionIndex}</Eyebrow>
          <Eyebrow cobalt>{ABOUT_WORK_WITH_ATLAS.eyebrow}</Eyebrow>
        </div>

        <h2 id="about-collaborate-heading" className="max-w-[22ch] mb-10">
          {ABOUT_WORK_WITH_ATLAS.heading}
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 mb-10">
          <div className="lg:col-span-6 flex flex-col gap-5">
            <p className="atlas-lead">{ABOUT_WORK_WITH_ATLAS.intro}</p>
            <p className="text-[17px] leading-[1.7] text-[var(--muted)]">
              {ABOUT_WORK_WITH_ATLAS.closing}
            </p>
          </div>

          <div className="lg:col-span-6 border-t border-[var(--hair)] lg:border-t-0 lg:border-l lg:border-[var(--hair)] pt-6 lg:pt-0 lg:pl-10">
            <p className="font-[var(--font-mono)] text-[12px] uppercase tracking-[0.1em] text-[var(--ink)] mb-4">
              {ABOUT_WORK_WITH_ATLAS.listIntro}
            </p>
            <ul className="list-none p-0 m-0 border-t border-[var(--hair)]">
              {ABOUT_WORK_WITH_ATLAS.engagementAreas.map((area, idx) => (
                <li
                  key={idx}
                  className="grid grid-cols-[28px_1fr] items-baseline py-3.5 border-b border-[var(--hair)] text-[16px] leading-[1.6] text-[var(--ink)]"
                >
                  <span
                    aria-hidden="true"
                    className="font-[var(--font-mono)] text-[12px] text-[var(--cobalt)]"
                  >
                    —
                  </span>
                  <span>{area}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-wrap gap-4">
          <Button to={ABOUT_WORK_WITH_ATLAS.primaryCta.to} variant="primary">
            {ABOUT_WORK_WITH_ATLAS.primaryCta.label}
          </Button>
          <Button to={ABOUT_WORK_WITH_ATLAS.secondaryCta.to} variant="ghost">
            {ABOUT_WORK_WITH_ATLAS.secondaryCta.label}
          </Button>
        </div>
      </RevealBand>

      {/* 15. CONTACT INFORMATION: compact block at the end with email and website */}
      <RevealBand
        id="about-contact"
        headingId="about-contact-heading"
        variant="deep"
        compact
      >
        <div className="border-t-2 border-[var(--ink)] pt-4 mb-6">
          <Eyebrow>{ABOUT_CONTACT_INFO.sectionIndex}</Eyebrow>
        </div>

        <h2
          id="about-contact-heading"
          className="text-[clamp(26px,3vw,36px)] mb-6"
        >
          {ABOUT_CONTACT_INFO.heading}
        </h2>

        <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8 text-[17px]">
          <span>
            Official email:{' '}
            <a
              href={`mailto:${ABOUT_CONTACT_INFO.email}`}
              className="text-[var(--cobalt)] font-medium hover:underline"
            >
              {ABOUT_CONTACT_INFO.email}
            </a>
          </span>
          <span aria-hidden="true" className="hidden sm:inline text-[var(--muted)]">
            ·
          </span>
          <span>
            Official website:{' '}
            <a
              href={ABOUT_CONTACT_INFO.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--cobalt)] font-medium hover:underline"
            >
              {ABOUT_CONTACT_INFO.website}
            </a>
          </span>
        </div>
      </RevealBand>
    </>
  );
}
