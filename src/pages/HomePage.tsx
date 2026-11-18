import { Link } from 'react-router-dom';
import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { Facebook, Linkedin } from 'lucide-react';
import {
  ABOUT_CONTENT,
  CAPABILITIES_CONTENT,
  COALITION_CONTENT,
  CONTACT_CONTENT,
  FEATURED_PUBLICATION,
  HERO_CONTENT,
  INSIGHTS_CONTENT,
  INSTITUTIONAL_FIGURES,
  PROGRAMMES_CONTENT,
  PUBLICATION_DEVELOPMENT,
  SITE_META,
} from '../data/siteContent';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { CoalitionPanel } from '../components/CoalitionPanel';
import { Eyebrow } from '../components/Eyebrow';
import { FeaturedReportCard } from '../components/FeaturedReportCard';
import { FigureCounter } from '../components/FigureCounter';
import { FlowSteps } from '../components/FlowSteps';
import { PullQuote } from '../components/PullQuote';
import { SectionShell } from '../components/SectionShell';

const HOME_SOCIAL_LINKS = SITE_META.socialLinks.filter(
  ({ label }) => label === 'LinkedIn' || label === 'Facebook' || label === 'X'
);

const Globe = lazy(() =>
  import('../components/Globe').then((module) => ({ default: module.Globe }))
);

function GlobePlaceholder() {
  return (
    <section className="atl-globe atl-globe-placeholder" aria-hidden="true">
      <div className="atlas-container">
        <div className="atl-globe-stage" />
        <div className="atl-globe-placeholder-legend" />
      </div>
    </section>
  );
}

function DeferredGlobe() {
  const hostRef = useRef<HTMLDivElement | null>(null);
  const [isNearViewport, setIsNearViewport] = useState(false);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    if (typeof IntersectionObserver === 'undefined') {
      setIsNearViewport(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsNearViewport(true);
          observer.disconnect();
        }
      },
      { rootMargin: '320px 0px' }
    );
    observer.observe(host);

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={hostRef}>
      {isNearViewport ? (
        <Suspense fallback={<GlobePlaceholder />}>
          <Globe />
        </Suspense>
      ) : (
        <GlobePlaceholder />
      )}
    </div>
  );
}

function HomeSocialIcon({ platform }: { platform: string }) {
  if (platform === 'LinkedIn') return <Linkedin size={20} strokeWidth={2} aria-hidden="true" />;
  if (platform === 'Facebook') return <Facebook size={20} strokeWidth={2} aria-hidden="true" />;
  if (platform === 'X') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d="M18.9 1.15h3.68l-8.04 9.19L24 22.85h-7.41l-5.8-7.58-6.64 7.58H.48l8.6-9.83L0 1.15h7.59l5.24 6.93 6.07-6.93Zm-1.29 19.53h2.04L6.49 3.21H4.3l13.31 17.47Z" />
      </svg>
    );
  }
  return null;
}

export function HomePage() {
  return (
    <>
      {/* 1. HERO + GLOBE */}
      <section
        aria-labelledby="hero-heading"
        className="atlas-home-hero py-12 sm:py-16 lg:py-24"
      >
        <div className="atlas-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            <div className="lg:col-span-7">
              <Eyebrow cobalt className="mb-4 atlas-hero-stagger">
                {HERO_CONTENT.eyebrow}
              </Eyebrow>
              <h1
                id="hero-heading"
                className="mb-6 atlas-hero-stagger atlas-hero-delay-1"
              >
                {HERO_CONTENT.title}
              </h1>
              <p className="atlas-lead mb-9 atlas-hero-stagger atlas-hero-delay-2">
                {HERO_CONTENT.description}
              </p>
              <div className="flex flex-wrap gap-4 atlas-hero-stagger atlas-hero-delay-3">
                <Button to={HERO_CONTENT.primaryCta.to} variant="primary">
                  {HERO_CONTENT.primaryCta.label}
                </Button>
                <Button href="#contact" variant="ghost">
                  {HERO_CONTENT.secondaryCta.label}
                </Button>
              </div>
            </div>

            <aside
              aria-label="Institute Focus and Approach"
              className="lg:col-span-5 bg-[var(--white)] border border-[var(--hair)] border-t-2 border-t-[var(--ink)] p-7 sm:p-8 atlas-hero-stagger atlas-hero-delay-4"
            >
              <div className="pb-6 border-b border-[var(--hair)]">
                <Eyebrow className="mb-4">Focus</Eyebrow>
                <ul className="list-none p-0 m-0 flex flex-col gap-3">
                  {HERO_CONTENT.plate.focus.map((item) => (
                    <li
                      key={item.index}
                      className="flex items-baseline gap-4 text-[17px] text-[var(--ink)]"
                    >
                      <span className="font-[var(--font-mono)] text-[12px] text-[var(--cobalt)] tabular-nums shrink-0">
                        {item.index}
                      </span>
                      <span className="font-medium">{item.label}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-6">
                <Eyebrow className="mb-4">Approach</Eyebrow>
                <ul className="list-none p-0 m-0 flex flex-col gap-3">
                  {HERO_CONTENT.plate.approach.map((item) => (
                    <li
                      key={item.index}
                      className="flex items-baseline gap-4 text-[17px] text-[var(--ink)]"
                    >
                      <span className="font-[var(--font-mono)] text-[12px] text-[var(--cobalt)] tabular-nums shrink-0">
                        {item.index}
                      </span>
                      <span className="font-medium">{item.label}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <DeferredGlobe />

      {/* 2. ABOUT ATLAS */}
      <SectionShell
        eyebrow={ABOUT_CONTENT.eyebrow}
        headingId="about-heading"
        variant="deep"
      >
        <h2 id="about-heading" className="mb-6">
          {ABOUT_CONTENT.heading}
        </h2>
        <p className="atlas-lead atlas-dropcap mb-12">
          {ABOUT_CONTENT.description}
        </p>

        <div className="border-t border-[var(--hair)] mb-12">
          {ABOUT_CONTENT.rows.map((row) => (
            <div
              key={row.index}
              className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-6 py-6 border-b border-[var(--hair)] items-baseline"
            >
              <div className="md:col-span-4 flex items-baseline gap-3">
                <span className="font-[var(--font-mono)] text-[12px] text-[var(--cobalt)] tabular-nums shrink-0">
                  {row.index}
                </span>
                <h3 className="text-[20px] font-semibold text-[var(--ink)]">
                  {row.title}
                </h3>
              </div>
              <p className="md:col-span-8 text-[17px] leading-[1.7] text-[var(--muted)]">
                {row.body}
              </p>
            </div>
          ))}
        </div>

        <PullQuote
          label="Research Philosophy"
          quote={SITE_META.tagline}
          className="mb-10"
        />

        <div className="flex flex-wrap gap-4">
          <Button to="/about-atlas-ai-institute/" variant="primary">
            About Atlas AI Institute
          </Button>
          <Button to="/leadership/" variant="ghost">
            Meet Our Leadership
          </Button>
        </div>
      </SectionShell>

      {/* 3. INSTITUTIONAL CAPABILITIES */}
      <SectionShell
        eyebrow={CAPABILITIES_CONTENT.eyebrow}
        headingId="capabilities-heading"
      >
        <h2 id="capabilities-heading" className="mb-5">
          {CAPABILITIES_CONTENT.heading}
        </h2>
        <p className="atlas-lead mb-12">{CAPABILITIES_CONTENT.description}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CAPABILITIES_CONTENT.cards.map((card) => (
            <Card key={card.index} to={card.to}>
              <div>
                <span className="atlas-eyebrow text-[var(--cobalt)] block mb-3 tabular-nums">
                  {card.index}
                </span>
                <h3 className="atlas-card-title mb-3 text-[var(--ink)]">
                  {card.title}
                </h3>
                <p className="text-[16px] leading-[1.65] text-[var(--muted)] mb-8">
                  {card.description}
                </p>
              </div>
              <span className="mt-auto inline-flex items-center gap-2 font-[var(--font-mono)] text-[12px] uppercase tracking-[0.1em] text-[var(--ink)] group-hover:text-[var(--cobalt)] transition-colors">
                <span>Read more</span>
                <span className="atlas-arrow" aria-hidden="true">
                  →
                </span>
              </span>
            </Card>
          ))}
        </div>
      </SectionShell>

      {/* 4. INSTITUTIONAL FIGURES */}
      <section aria-label="Institutional Figures" className="atlas-section">
        <div className="atlas-container">
          <div className="atlas-stats-grid grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-5 gap-6 sm:gap-8">
            {INSTITUTIONAL_FIGURES.map((item, idx) => (
              <FigureCounter
                key={item.label}
                figLabel={`FIG. ${String(idx + 1).padStart(2, '0')}`}
                value={item.figure}
                caption={item.label}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 5. FEATURED RESEARCH & PUBLICATIONS */}
      <SectionShell
        id="featured"
        eyebrow={FEATURED_PUBLICATION.eyebrow}
        headingId="featured-heading"
        variant="deep"
      >
        <h2 id="featured-heading" className="mb-5">
          {FEATURED_PUBLICATION.heading}
        </h2>
        <p className="atlas-lead mb-12">{FEATURED_PUBLICATION.description}</p>

        <div className="mb-10">
          <FeaturedReportCard />
        </div>

        <div>
          <Button to="/publications/" variant="primary">
            Explore All Research &amp; Publications
          </Button>
        </div>
      </SectionShell>

      {/* 6. PUBLICATION DEVELOPMENT */}
      <SectionShell
        eyebrow={PUBLICATION_DEVELOPMENT.eyebrow}
        headingId="pub-dev-heading"
      >
        <h2 id="pub-dev-heading" className="mb-5">
          {PUBLICATION_DEVELOPMENT.heading}
        </h2>
        <p className="atlas-lead mb-12">{PUBLICATION_DEVELOPMENT.description}</p>

        <div className="mb-12">
          <FlowSteps steps={PUBLICATION_DEVELOPMENT.steps} />
        </div>

        <div>
          <Button to="/publication-development/" variant="primary">
            Explore Publication Development
          </Button>
        </div>
      </SectionShell>

      {/* 7. PROGRAMMES & INITIATIVES */}
      <SectionShell
        id="programmes"
        eyebrow={PROGRAMMES_CONTENT.eyebrow}
        headingId="programmes-heading"
        variant="deep"
      >
        <h2 id="programmes-heading" className="mb-5">
          {PROGRAMMES_CONTENT.heading}
        </h2>
        <p className="atlas-lead mb-12">{PROGRAMMES_CONTENT.description}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {PROGRAMMES_CONTENT.cards.map((card) => (
            <Card key={card.index} to={card.to}>
              <div>
                <span className="atlas-eyebrow text-[var(--cobalt)] block mb-3 tabular-nums">
                  {card.index}
                </span>
                <h3 className="atlas-card-title mb-3 text-[var(--ink)]">
                  {card.title}
                </h3>
                <p className="text-[16px] leading-[1.65] text-[var(--muted)] mb-8">
                  {card.description}
                </p>
              </div>
              <span className="mt-auto inline-flex items-center gap-2 font-[var(--font-mono)] text-[12px] uppercase tracking-[0.1em] text-[var(--ink)] group-hover:text-[var(--cobalt)] transition-colors">
                <span>Read more</span>
                <span className="atlas-arrow" aria-hidden="true">
                  →
                </span>
              </span>
            </Card>
          ))}
        </div>
      </SectionShell>

      {/* 8. ATLAS GLOBAL SOUTH AI POLICY COALITION */}
      <CoalitionPanel />

      {/* 9. LATEST INSIGHTS */}
      <SectionShell
        eyebrow={INSIGHTS_CONTENT.eyebrow}
        headingId="insights-heading"
        variant="deep"
      >
        <h2 id="insights-heading" className="mb-5">
          {INSIGHTS_CONTENT.heading}
        </h2>
        <p className="atlas-lead mb-8">{INSIGHTS_CONTENT.description}</p>

        <div>
          <Button to={INSIGHTS_CONTENT.to} variant="primary">
            Explore All Insights
          </Button>
        </div>
      </SectionShell>

      {/* 10. CONTACT & COLLABORATION */}
      <SectionShell
        id="contact"
        eyebrow={CONTACT_CONTENT.eyebrow}
        headingId="contact-heading"
      >
        <h2 id="contact-heading" className="mb-5">
          {CONTACT_CONTENT.heading}
        </h2>
        <p className="atlas-lead mb-12">{CONTACT_CONTENT.description}</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {CONTACT_CONTENT.cards.map((card) => (
            <Card key={card.index}>
              <div>
                <span className="atlas-eyebrow text-[var(--cobalt)] block mb-3 tabular-nums">
                  {card.index}
                </span>
                <h3 className="atlas-card-title mb-3 text-[var(--ink)]">
                  {card.title}
                </h3>
                <p className="text-[16px] leading-[1.65] text-[var(--muted)] mb-8">
                  {card.description}
                </p>
              </div>
              <div className="mt-auto">
                <Button to={card.to} variant="primary" className="w-full">
                  {card.buttonLabel}
                </Button>
              </div>
            </Card>
          ))}
        </div>

        <div className="atlas-home-cta-wrap border-t border-[var(--hair)] pt-6 mb-10">
          <nav aria-label="Atlas AI Institute social media" className="atlas-home-social-links">
            {HOME_SOCIAL_LINKS.map((social) => (
              <a
                key={social.href}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Atlas AI Institute on ${social.label}`}
                title={social.label}
              >
                <HomeSocialIcon platform={social.label} />
                <span className="sr-only">{social.label}</span>
              </a>
            ))}
          </nav>
          <div className="atlas-home-cta-buttons">
            <Button
              to="/atlas-global-south-ai-policy-coalition/"
              variant="primary"
              size="lg"
              className="atlas-home-cta-button"
            >
              Join the Coalition
            </Button>
            <Button
              to="/contact/"
              variant="primary"
              size="lg"
              className="atlas-home-cta-button"
            >
              Contact Us
            </Button>
          </div>
        </div>

        <div className="border-t border-[var(--hair)] pt-6 flex flex-col gap-3">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[15px] text-[var(--ink)]">
            <span>
              Email:{' '}
              <a
                href={`mailto:${SITE_META.email}`}
                className="text-[var(--cobalt)] font-medium hover:underline"
              >
                {SITE_META.email}
              </a>
            </span>
            <span aria-hidden="true" className="text-[var(--muted)]">
              ·
            </span>
            <span>
              General enquiries:{' '}
              <a
                href={`mailto:${SITE_META.generalEmail}`}
                className="text-[var(--cobalt)] font-medium hover:underline"
              >
                {SITE_META.generalEmail}
              </a>
            </span>
            <span aria-hidden="true" className="text-[var(--muted)]">
              ·
            </span>
            <span>
              Official website:{' '}
              <a
                href={SITE_META.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--cobalt)] font-medium hover:underline"
              >
                {SITE_META.url}
              </a>
            </span>
          </div>

          <div>
            <Link
              to={CONTACT_CONTENT.careersLink.to}
              className="atlas-inline-link inline-flex items-center gap-2 font-[var(--font-mono)] text-[12px] font-medium uppercase tracking-[0.1em] text-[var(--ink)] hover:text-[var(--cobalt)] no-underline min-h-[44px]"
            >
              <span>{CONTACT_CONTENT.careersLink.label}</span>
              <span className="atlas-arrow" aria-hidden="true">
                →
              </span>
            </Link>
          </div>
        </div>
      </SectionShell>
    </>
  );
}
