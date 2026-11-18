import { Link } from 'react-router-dom';
import { COALITION_FOOTER } from '../data/coalition';
import { Logo } from './Logo';

interface CoalitionFooterProps {
  basePath?: string;
}

export function CoalitionFooter({ basePath = '' }: CoalitionFooterProps) {
  return (
    <footer className="atlas-c-navy-band bg-[var(--c-navy)] text-[var(--white)] border-t border-white/15">
      <div className="atlas-container py-16 sm:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pb-12 border-b border-white/20">
          <div className="lg:col-span-5">
            <Logo
              variant="coalition-white"
              heightClass="h-10"
              className="mb-4"
              fallback={
                <span className="atlas-eyebrow text-[var(--c-gold)] block mb-4">
                  ATLAS GLOBAL SOUTH AI POLICY COALITION
                </span>
              }
            />
            <p className="text-[16px] leading-[1.7] text-white/[0.85] max-w-[46ch]">
              {COALITION_FOOTER.summary}
            </p>
          </div>

          <div className="lg:col-span-4">
            <span className="atlas-eyebrow text-[var(--c-gold)] block mb-4">
              Navigation
            </span>
            <ul className="list-none p-0 m-0 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5 text-[15px]">
              {COALITION_FOOTER.navLinks.map((link) => (
                <li key={link.href}>
                  {basePath ? (
                    <Link
                      to={`${basePath}${link.href}`}
                      className="text-white/90 no-underline hover:text-[var(--white)] hover:underline py-0.5 inline-block"
                    >
                      {link.label}
                    </Link>
                  ) : (
                    <a
                      href={link.href}
                      className="text-white/90 no-underline hover:text-[var(--white)] hover:underline py-0.5 inline-block"
                    >
                      {link.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3 flex flex-col gap-3">
            <span className="atlas-eyebrow text-[var(--c-gold)] block mb-1">
              Institutional Host
            </span>
            <p className="text-[15px] text-white/90">
              {COALITION_FOOTER.hostLabel}
            </p>
            <a
              href={COALITION_FOOTER.hostUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[15px] text-white/90 no-underline hover:text-[var(--white)] hover:underline break-all"
            >
              {COALITION_FOOTER.hostUrl}
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
            <div className="pt-2">
              <Link
                to={COALITION_FOOTER.homeLink.to}
                className="atlas-inline-link inline-flex items-center gap-2 font-[var(--font-mono)] text-[12px] uppercase tracking-[0.1em] text-[var(--c-gold)] hover:text-[var(--white)] no-underline min-h-[44px]"
              >
                <span>{COALITION_FOOTER.homeLink.label}</span>
                <span className="atlas-arrow" aria-hidden="true">
                  →
                </span>
              </Link>
            </div>
          </div>
        </div>

        <div className="pt-8">
          <p className="font-[var(--font-mono)] text-[12px] uppercase tracking-[0.1em] text-white/75">
            {COALITION_FOOTER.copyright}
          </p>
        </div>
      </div>
    </footer>
  );
}
