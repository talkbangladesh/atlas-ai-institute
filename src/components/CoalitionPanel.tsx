import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { COALITION_CONTENT } from '../data/siteContent';

interface CoalitionPanelProps {
  variant?: 'section' | 'pageHero';
}

export function CoalitionPanel({ variant = 'section' }: CoalitionPanelProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mq.matches) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.08 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const isHero = variant === 'pageHero';
  const headingId = isHero ? 'coalition-page-heading' : 'coalition-heading';
  const HeadingTag = isHero ? 'h1' : 'h2';

  return (
    <section
      ref={sectionRef}
      aria-labelledby={headingId}
      className="atlas-coalition-panel"
    >
      <div
        className={`atlas-container atlas-reveal ${
          visible ? 'is-visible' : ''
        }`}
      >
        {isHero && (
          <div className="mb-8">
            <Link
              to="/"
              className="atlas-inline-link inline-flex items-center gap-2 font-[var(--font-mono)] text-[12px] uppercase tracking-[0.1em] text-[var(--footer-muted)] hover:text-[var(--white)] no-underline min-h-[44px]"
            >
              <span aria-hidden="true">←</span>
              <span>Atlas AI Institute Home</span>
            </Link>
          </div>
        )}

        {/* Section index with 2px white top rule */}
        <div className="mb-10 sm:mb-12">
          <div className="h-[2px] bg-[var(--white)] atlas-rule-draw mb-4" />
          <span className="atlas-eyebrow text-[var(--footer-muted)] block">
            {COALITION_CONTENT.eyebrow}
          </span>
        </div>

        {/* Two-column editorial split (5 / 7 on 1000px+) */}
        <div className="grid grid-cols-1 min-[1000px]:grid-cols-12 gap-12 lg:gap-14 items-start">
          {/* Left column (5/12) */}
          <div className="min-[1000px]:col-span-5 flex flex-col">
            <span className="atlas-eyebrow text-[var(--white)] block mb-4">
              {COALITION_CONTENT.officialName}
            </span>

            <HeadingTag
              id={headingId}
              className="font-[var(--font-serif)] font-bold text-[clamp(32px,4.4vw,56px)] leading-[1.08] tracking-[-0.03em] text-[var(--white)] [text-wrap:balance] mb-6"
            >
              {COALITION_CONTENT.heading}
            </HeadingTag>

            <p className="font-[var(--font-sans)] text-[18px] leading-[1.7] text-white/[0.82] max-w-[56ch] mb-9">
              {COALITION_CONTENT.description}
            </p>

            <div className="atlas-coalition-actions">
              {isHero ? (
                <a
                  href="#coalition-details"
                  className="atlas-btn atlas-btn-white-ink"
                >
                  <span>{COALITION_CONTENT.exploreLabel}</span>
                  <span className="atlas-arrow" aria-hidden="true">
                    →
                  </span>
                </a>
              ) : (
                <Link
                  to={COALITION_CONTENT.exploreTo}
                  className="atlas-btn atlas-btn-white-ink"
                >
                  <span>{COALITION_CONTENT.exploreLabel}</span>
                  <span className="atlas-arrow" aria-hidden="true">
                    →
                  </span>
                </Link>
              )}

              <a
                href={COALITION_CONTENT.membersUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="atlas-btn atlas-btn-ghost-white"
              >
                <span>{COALITION_CONTENT.membersLabel}</span>
                <span className="atlas-arrow" aria-hidden="true">
                  →
                </span>
              </a>
            </div>
          </div>

          {/* Right column (7/12): Focus areas */}
          <div className="min-[1000px]:col-span-7">
            <span className="atlas-eyebrow text-[var(--footer-muted)] block mb-5">
              {COALITION_CONTENT.focusAreasLabel}
            </span>

            <div className="h-px bg-white/20 atlas-rule-draw" />
            <ol className="list-none p-0 m-0">
              {COALITION_CONTENT.focusAreas.map((area) => (
                <li key={area.index} className="group">
                  <div className="grid grid-cols-[56px_1fr] sm:grid-cols-[72px_1fr] gap-x-4 sm:gap-x-6 items-baseline py-6">
                    <span className="font-[var(--font-serif)] font-semibold text-[clamp(32px,3.6vw,48px)] leading-none tracking-[-0.03em] text-[var(--footer-muted)] tabular-nums transition-colors duration-150 group-hover:text-[var(--white)] motion-reduce:transition-none">
                      {area.index}
                    </span>
                    <span className="font-[var(--font-serif)] font-semibold text-[clamp(22px,2.2vw,30px)] leading-[1.2] tracking-[-0.025em] text-[var(--white)]">
                      {area.title}
                    </span>
                  </div>
                  <div
                    aria-hidden="true"
                    className="h-px bg-white/20 atlas-rule-draw"
                  />
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* Full-width status strip */}
        <div className="mt-12 sm:mt-16">
          <div className="h-px bg-white/20 atlas-rule-draw" />
          <div className="grid grid-cols-1 min-[1000px]:grid-cols-3 divide-y min-[1000px]:divide-y-0 min-[1000px]:divide-x divide-white/20">
            {COALITION_CONTENT.statusStrip.map((item) => (
              <div
                key={item}
                className="py-4 min-[1000px]:py-5 min-[1000px]:px-6 min-[1000px]:first:pl-0 min-[1000px]:last:pr-0"
              >
                <span className="atlas-eyebrow text-[var(--footer-muted)] block">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
