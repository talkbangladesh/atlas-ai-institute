import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Eyebrow } from '../components/Eyebrow';

interface SubpageLayoutProps {
  eyebrow: string;
  title: string;
  intro: string;
  headingId: string;
  sectionIndex?: string;
  heroExtra?: ReactNode;
  compactSpacing?: boolean;
  children: ReactNode;
}

export function SubpageLayout({
  eyebrow,
  title,
  intro,
  headingId,
  sectionIndex = '01 / OVERVIEW',
  heroExtra,
  compactSpacing = false,
  children,
}: SubpageLayoutProps) {
  return (
    <>
      <section
        aria-labelledby={headingId}
        className={
          compactSpacing
            ? 'py-8 sm:py-10 lg:py-12'
            : 'py-12 sm:py-16 lg:py-20'
        }
      >
        <div className="atlas-container">
          <div className="mb-8">
            <Link
              to="/"
              className="atlas-inline-link inline-flex items-center gap-2 font-[var(--font-mono)] text-[12px] uppercase tracking-[0.1em] text-[var(--muted)] hover:text-[var(--cobalt)] no-underline"
            >
              <span aria-hidden="true">←</span>
              <span>Atlas AI Institute Home</span>
            </Link>
          </div>
          <Eyebrow cobalt className="mb-4">
            {eyebrow}
          </Eyebrow>
          <h1 id={headingId} className="max-w-[18ch] mb-6">
            {title}
          </h1>
          <p className="atlas-lead">{intro}</p>
          {heroExtra}
        </div>
      </section>

      <section
        className={`atlas-section ${compactSpacing ? 'atlas-section-compact' : ''}`}
      >
        <div className="atlas-container">
          <div
            className={`atlas-section-grid ${
              compactSpacing ? 'atlas-section-grid-compact' : ''
            }`}
          >
            <div className="atlas-section-index">
              <Eyebrow>{sectionIndex}</Eyebrow>
            </div>
            <div className="atlas-section-content">{children}</div>
          </div>
        </div>
      </section>
    </>
  );
}
