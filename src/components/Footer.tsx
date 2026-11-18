import { Link } from 'react-router-dom';
import { SITE_META } from '../data/siteContent';
import { Logo } from './Logo';

export function Footer() {
  return (
    <footer className="atlas-site-footer bg-[var(--paper)] text-[var(--ink)] border-t border-[var(--hair)]">
      <div className="atlas-container py-16 sm:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 pb-14 border-b border-[var(--hair)]">
          <div>
            <Link
              to="/"
              aria-label={SITE_META.name}
              className="inline-flex items-center no-underline py-1 mb-4"
            >
              <Logo
                variant="horizontal"
                heightClass="h-10"
                fallbackClassName="font-[var(--font-serif)] font-bold text-[24px] tracking-[-0.03em] text-[var(--ink)]"
              />
            </Link>
            <p className="text-[15px] leading-[1.65] text-[var(--muted)] max-w-[34ch]">
              Independent, evidence-led AI policy and governance research for
              institutions shaping the AI era.
            </p>
          </div>

          <div>
            <span className="atlas-eyebrow text-[var(--footer-muted)] block mb-4">
              Quick Navigation
            </span>
            <ul className="list-none p-0 m-0 flex flex-col gap-2.5 text-[15px]">
              <li>
                <Link
                  to="/about-atlas-ai-institute/"
                  className="text-[var(--ink)] no-underline hover:text-[var(--cobalt)] hover:underline py-0.5 inline-block"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  to="/leadership/"
                  className="text-[var(--ink)] no-underline hover:text-[var(--cobalt)] hover:underline py-0.5 inline-block"
                >
                  Leadership
                </Link>
              </li>
              <li>
                <Link
                  to="/publications/"
                  className="text-[var(--ink)] no-underline hover:text-[var(--cobalt)] hover:underline py-0.5 inline-block"
                >
                  Publications
                </Link>
              </li>
              <li>
                <Link
                  to="/insights/"
                  className="text-[var(--ink)] no-underline hover:text-[var(--cobalt)] hover:underline py-0.5 inline-block"
                >
                  Insights
                </Link>
              </li>
              <li>
                <Link
                  to="/#contact"
                  className="text-[var(--ink)] no-underline hover:text-[var(--cobalt)] hover:underline py-0.5 inline-block"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <span className="atlas-eyebrow text-[var(--footer-muted)] block mb-4">
              Research &amp; Publications
            </span>
            <ul className="list-none p-0 m-0 flex flex-col gap-2.5 text-[15px] mb-8">
              <li>
                <Link
                  to="/publications/"
                  className="text-[var(--ink)] no-underline hover:text-[var(--cobalt)] hover:underline py-0.5 inline-block"
                >
                  Publications
                </Link>
              </li>
              <li>
                <Link
                  to="/research/"
                  className="text-[var(--ink)] no-underline hover:text-[var(--cobalt)] hover:underline py-0.5 inline-block"
                >
                  Research
                </Link>
              </li>
              <li>
                <Link
                  to="/frameworks/"
                  className="text-[var(--ink)] no-underline hover:text-[var(--cobalt)] hover:underline py-0.5 inline-block"
                >
                  Frameworks
                </Link>
              </li>
              <li>
                <Link
                  to="/reports/"
                  className="text-[var(--ink)] no-underline hover:text-[var(--cobalt)] hover:underline py-0.5 inline-block"
                >
                  Reports
                </Link>
              </li>
              <li>
                <Link
                  to="/tools/"
                  className="text-[var(--ink)] no-underline hover:text-[var(--cobalt)] hover:underline py-0.5 inline-block"
                >
                  Tools
                </Link>
              </li>
              <li>
                <Link
                  to="/projects/"
                  className="text-[var(--ink)] no-underline hover:text-[var(--cobalt)] hover:underline py-0.5 inline-block"
                >
                  Projects
                </Link>
              </li>
              <li>
                <Link
                  to="/publication-development/"
                  className="text-[var(--ink)] no-underline hover:text-[var(--cobalt)] hover:underline py-0.5 inline-block"
                >
                  Publication Development
                </Link>
              </li>
            </ul>

            <span className="atlas-eyebrow text-[var(--footer-muted)] block mb-4">
              Programmes &amp; Coalition
            </span>
            <ul className="list-none p-0 m-0 flex flex-col gap-2.5 text-[15px]">
              <li>
                <Link
                  to="/#programmes"
                  className="text-[var(--ink)] no-underline hover:text-[var(--cobalt)] hover:underline py-0.5 inline-block"
                >
                  Programmes
                </Link>
              </li>
              <li>
                <Link
                  to="/atlas-global-south-ai-policy-coalition/"
                  className="text-[var(--ink)] no-underline hover:text-[var(--cobalt)] hover:underline py-0.5 inline-block"
                >
                  Atlas Global South AI Policy Coalition
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <span className="atlas-eyebrow text-[var(--footer-muted)] block mb-4">
              Contact
            </span>
            <ul className="list-none p-0 m-0 flex flex-col gap-3 text-[15px]">
              <li>
                <a
                  href={`mailto:${SITE_META.email}`}
                  className="text-[var(--ink)] no-underline hover:text-[var(--cobalt)] hover:underline break-all"
                >
                  {SITE_META.email}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${SITE_META.generalEmail}`}
                  className="text-[var(--ink)] no-underline hover:text-[var(--cobalt)] hover:underline break-all"
                >
                  {SITE_META.generalEmail}
                </a>
              </li>
              <li>
                <a
                  href={SITE_META.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--ink)] no-underline hover:text-[var(--cobalt)] hover:underline"
                >
                  {SITE_META.url}
                </a>
              </li>
              <li>
                <Link
                  to="/careers/"
                  className="text-[var(--ink)] no-underline hover:text-[var(--cobalt)] hover:underline py-0.5 inline-block"
                >
                  Careers
                </Link>
              </li>
              <li>
                <Link
                  to="/partnerships/"
                  className="text-[var(--ink)] no-underline hover:text-[var(--cobalt)] hover:underline py-0.5 inline-block"
                >
                  Partnerships
                </Link>
              </li>
              <li>
                <Link
                  to="/contact/"
                  className="text-[var(--ink)] no-underline hover:text-[var(--cobalt)] hover:underline py-0.5 inline-block"
                >
                  Contact
                </Link>
              </li>
            </ul>
            <span className="atlas-eyebrow text-[var(--footer-muted)] block mt-7 mb-4">
              Social
            </span>
            <ul className="list-none p-0 m-0 flex flex-col gap-2.5 text-[15px]">
              {SITE_META.socialLinks.map((social) => (
                <li key={social.href}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[var(--ink)] no-underline hover:text-[var(--cobalt)] hover:underline"
                  >
                    {social.label}
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-6 flex justify-end">
          <p className="font-[var(--font-mono)] text-[12px] uppercase tracking-[0.1em] text-[var(--footer-muted)]">
            {SITE_META.copyright}
          </p>
        </div>
      </div>
    </footer>
  );
}
