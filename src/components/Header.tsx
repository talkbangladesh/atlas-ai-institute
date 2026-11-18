import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown, X } from 'lucide-react';
import { NAV_LINKS, SITE_META } from '../data/siteContent';
import { Logo } from './Logo';

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [pubMenuOpen, setPubMenuOpen] = useState(false);
  const [mobilePubMenuOpen, setMobilePubMenuOpen] = useState(false);
  const location = useLocation();
  const openBtnRef = useRef<HTMLButtonElement | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);
  const mobileMenuRef = useRef<HTMLDivElement | null>(null);
  const pubMenuRef = useRef<HTMLDivElement | null>(null);
  const scrollProgressRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setMenuOpen(false);
    setPubMenuOpen(false);
    setMobilePubMenuOpen(false);
  }, [location.pathname, location.hash]);

  useEffect(() => {
    let frame = 0;
    const updateProgress = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        const doc = document.documentElement;
        const max = doc.scrollHeight - window.innerHeight;
        const progress =
          max <= 0 ? 0 : Math.min(1, Math.max(0, window.scrollY / max));
        scrollProgressRef.current?.style.setProperty(
          'transform',
          `scaleX(${progress})`
        );
      });
    };

    updateProgress();
    window.addEventListener('scroll', updateProgress, { passive: true });
    window.addEventListener('resize', updateProgress, { passive: true });
    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener('scroll', updateProgress);
      window.removeEventListener('resize', updateProgress);
    };
  }, [location.pathname]);

  useEffect(() => {
    if (!pubMenuOpen) return;

    const handleOutsideClick = (e: MouseEvent) => {
      if (
        pubMenuRef.current &&
        !pubMenuRef.current.contains(e.target as Node)
      ) {
        setPubMenuOpen(false);
      }
    };

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setPubMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    window.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      window.removeEventListener('keydown', handleEscape);
    };
  }, [pubMenuOpen]);

  useEffect(() => {
    if (!menuOpen) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeBtnRef.current?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        setMenuOpen(false);
        setMobilePubMenuOpen(false);
        openBtnRef.current?.focus();
        return;
      }

      if (e.key === 'Tab' && mobileMenuRef.current) {
        const focusables = mobileMenuRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled])'
        );
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [menuOpen]);

  const closeMenu = () => {
    setMenuOpen(false);
    setMobilePubMenuOpen(false);
    window.requestAnimationFrame(() => openBtnRef.current?.focus());
  };

  const closeMenuForNavigation = () => {
    setMenuOpen(false);
    setMobilePubMenuOpen(false);
    window.requestAnimationFrame(() => {
      document.getElementById('main-content')?.focus({ preventScroll: true });
    });
  };

  const isNavItemActive = (item: (typeof NAV_LINKS)[number]) => {
    if (item.to.includes('#')) return false;
    if (location.pathname === item.to) return true;
    if ('submenu' in item && item.submenu) {
      return item.submenu.some((sub) => location.pathname === sub.to);
    }
    return false;
  };

  const mobilePrimaryLinks = [
    { number: '01', label: 'About', to: '/about-atlas-ai-institute/' },
    { number: '02', label: 'Leadership', to: '/leadership/' },
    { number: '03', label: 'Publications', to: '/publications/' },
    { number: '04', label: 'Insights', to: '/insights/' },
    { number: '05', label: 'Projects', to: '/projects/' },
  ] as const;
  const publicationsItem = NAV_LINKS.find((item) => item.label === 'Publications');
  const publicationsSubmenu =
    publicationsItem && 'submenu' in publicationsItem
      ? publicationsItem.submenu
      : [];
  const contactDestination =
    NAV_LINKS.find((item) => item.label === 'Contact')?.to ?? '/#contact';
  const mobileSocialLinks = SITE_META.socialLinks.filter(
    (social) =>
      social.label === 'LinkedIn' ||
      social.label === 'Facebook' ||
      social.label === 'X'
  );

  return (
    <>
      <header className="atlas-site-header sticky top-0 z-40">
        <div
          ref={scrollProgressRef}
          aria-hidden="true"
          className="h-[2px] origin-left bg-[var(--cobalt)] will-change-transform"
          style={{ transform: 'scaleX(0)' }}
        />

        <div className="atlas-container">
          <div className="atlas-header-row">
            <Link
              to="/"
              aria-label={SITE_META.name}
              className="atlas-brand-link"
            >
              <Logo
                variant="mark"
                priority
                heightClass="h-10 sm:h-11"
                className="atlas-header-logo"
              />
              <span className="atlas-brand-copy">
                <span className="atlas-brand-name">Atlas AI Institute</span>
                <span className="atlas-brand-kicker">Research · Policy · Governance</span>
              </span>
            </Link>

            <nav
              aria-label="Primary navigation"
              className="atlas-desktop-nav hidden md:flex items-center gap-4 lg:gap-7"
            >
              {NAV_LINKS.map((item) => {
                const isActive = isNavItemActive(item);
                const hasSubmenu = 'submenu' in item && item.submenu.length > 0;

                if (hasSubmenu) {
                  return (
                    <div
                      key={item.label}
                      ref={pubMenuRef}
                      className="relative flex items-center"
                      onMouseEnter={() => setPubMenuOpen(true)}
                      onMouseLeave={() => setPubMenuOpen(false)}
                    >
                      <Link
                        to={item.to}
                        aria-current={
                          location.pathname === item.to ? 'page' : undefined
                        }
                        className={`font-[var(--font-mono)] text-[12px] font-medium uppercase tracking-[0.1em] whitespace-nowrap shrink-0 no-underline py-2 border-b-2 transition-colors ${
                          isActive
                            ? 'text-[var(--cobalt)] border-[var(--cobalt)]'
                            : 'text-[var(--ink)] border-transparent hover:text-[var(--cobalt)] hover:border-[var(--cobalt)]'
                        }`}
                      >
                        {item.label}
                      </Link>
                      <button
                        type="button"
                        aria-expanded={pubMenuOpen}
                        aria-controls="publications-nav-dropdown"
                        aria-label="Toggle Publications submenu"
                        onClick={() => setPubMenuOpen((open) => !open)}
                        className={`inline-flex items-center justify-center p-1.5 ml-0.5 cursor-pointer bg-transparent border-0 transition-colors ${
                          isActive || pubMenuOpen
                            ? 'text-[var(--cobalt)]'
                            : 'text-[var(--muted)] hover:text-[var(--cobalt)]'
                        }`}
                      >
                        <ChevronDown
                          size={13}
                          aria-hidden="true"
                          className={`transition-transform duration-150 ${
                            pubMenuOpen ? 'rotate-180' : ''
                          }`}
                        />
                      </button>

                      {pubMenuOpen && (
                        <div
                          id="publications-nav-dropdown"
                          role="menu"
                          aria-label="Publications categories"
                          className="absolute left-0 top-full pt-1 z-50 min-w-[200px]"
                        >
                          <div className="bg-[var(--white)] border border-[var(--hair)] border-t-2 border-t-[var(--ink)] flex flex-col">
                            {item.submenu.map((sub) => {
                              const subActive = location.pathname === sub.to;
                              return (
                                <Link
                                  key={sub.to}
                                  to={sub.to}
                                  role="menuitem"
                                  aria-current={subActive ? 'page' : undefined}
                                  onClick={() => setPubMenuOpen(false)}
                                  className={`px-4 py-3 font-[var(--font-mono)] text-[12px] font-medium uppercase tracking-[0.1em] whitespace-nowrap no-underline border-b border-[var(--hair)] last:border-b-0 transition-colors ${
                                    subActive
                                      ? 'bg-[var(--paper-deep)] text-[var(--cobalt)]'
                                      : 'text-[var(--ink)] hover:bg-[var(--paper-deep)] hover:text-[var(--cobalt)]'
                                  }`}
                                >
                                  {sub.label}
                                </Link>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                }

                return (
                  <Link
                    key={item.label}
                    to={item.to}
                    aria-current={isActive ? 'page' : undefined}
                    className={`font-[var(--font-mono)] text-[12px] font-medium uppercase tracking-[0.1em] whitespace-nowrap shrink-0 no-underline py-2 border-b-2 transition-colors ${
                      isActive
                        ? 'text-[var(--cobalt)] border-[var(--cobalt)]'
                        : 'text-[var(--ink)] border-transparent hover:text-[var(--cobalt)] hover:border-[var(--cobalt)]'
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            <button
              ref={openBtnRef}
              type="button"
              aria-expanded={menuOpen}
              aria-controls="mobile-fullscreen-nav"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              onClick={() => setMenuOpen(true)}
              className="atlas-menu-toggle md:hidden"
            >
              <span className="atlas-menu-icon" aria-hidden="true">
                <span />
                <span />
                <span />
              </span>
            </button>
          </div>
        </div>
      </header>

      <div
        className="atlas-menu-overlay"
        data-open={menuOpen}
        aria-hidden={!menuOpen}
        onClick={(event) => {
          if (event.target === event.currentTarget) closeMenu();
        }}
      >
        <div
          id="mobile-fullscreen-nav"
          ref={mobileMenuRef}
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
          className="atlas-menu-panel md:hidden"
        >
          <div className="atlas-mobile-menu-header">
            <Link
              to="/"
              aria-label={SITE_META.name}
              onClick={closeMenuForNavigation}
              className="atlas-brand-link"
            >
              <Logo
                variant="mark"
                priority
                heightClass="h-9"
                className="atlas-header-logo"
              />
              <span className="atlas-brand-copy">
                <span className="atlas-brand-name">Atlas AI Institute</span>
                <span className="atlas-brand-kicker">Research · Policy · Governance</span>
              </span>
            </Link>
            <button
              ref={closeBtnRef}
              type="button"
              aria-label="Close menu"
              onClick={closeMenu}
              className="atlas-menu-close"
            >
              <X size={20} aria-hidden="true" />
            </button>
          </div>

          <nav
            aria-label="Mobile navigation"
            className="atlas-mobile-nav"
          >
            {mobilePrimaryLinks.map((item, index) => {
              const sourceItem = NAV_LINKS.find(
                (candidate) => candidate.label === item.label
              );
              const isActive = sourceItem
                ? isNavItemActive(sourceItem)
                : location.pathname === item.to;

              return (
                <div
                  key={item.label}
                  className={`atlas-mobile-nav-group atlas-mobile-nav-group-${index + 1}`}
                >
                  <div className="atlas-mobile-primary-row">
                    <Link
                      to={item.to}
                      onClick={closeMenuForNavigation}
                      aria-current={isActive ? 'page' : undefined}
                      className="atlas-mobile-primary-link"
                    >
                      <span className="atlas-mobile-nav-number">{item.number}</span>
                      <span className="atlas-mobile-nav-title">{item.label}</span>
                      <span className="atlas-mobile-primary-arrow" aria-hidden="true">
                        →
                      </span>
                    </Link>

                    {item.label === 'Publications' && publicationsSubmenu.length > 0 && (
                      <button
                        type="button"
                        aria-expanded={mobilePubMenuOpen}
                        aria-controls="mobile-publications-submenu"
                        aria-label="Toggle Publications submenu"
                        onClick={() => setMobilePubMenuOpen((open) => !open)}
                        className="atlas-mobile-subnav-toggle"
                      >
                        <ChevronDown
                          size={20}
                          aria-hidden="true"
                          className={mobilePubMenuOpen ? 'is-open' : ''}
                        />
                      </button>
                    )}
                  </div>

                  {item.label === 'Publications' && publicationsSubmenu.length > 0 && (
                    <div
                      id="mobile-publications-submenu"
                      className={`atlas-mobile-subnav${mobilePubMenuOpen ? ' is-open' : ''}`}
                      aria-hidden={!mobilePubMenuOpen}
                    >
                      <div className="atlas-mobile-subnav-inner">
                        {publicationsSubmenu.map((sub) => {
                          const subActive = location.pathname === sub.to;
                          return (
                            <Link
                              key={sub.to}
                              to={sub.to}
                              onClick={closeMenuForNavigation}
                              aria-current={subActive ? 'page' : undefined}
                              className="atlas-mobile-subnav-link"
                            >
                              {sub.label}
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          <div className="atlas-mobile-menu-social" aria-label="Social media">
            <span className="atlas-mobile-social-label">FOLLOW ATLAS</span>
            <div className="atlas-mobile-social-links">
              {mobileSocialLinks.map((social) => (
                <a
                  key={social.href}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Atlas AI Institute on ${social.label} (opens in a new tab)`}
                  className="atlas-mobile-social-link"
                >
                  <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                    {social.label === 'LinkedIn' ? (
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.049c.476-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286ZM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124ZM7.119 20.452H3.554V9h3.565v11.452Z" />
                    ) : social.label === 'Facebook' ? (
                      <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073c0 6.019 4.388 11.027 10.125 11.927v-8.432H7.078v-3.495h3.047V9.41c0-3.021 1.792-4.697 4.533-4.697 1.312 0 2.686.235 2.686.235v2.965h-1.513c-1.491 0-1.956.931-1.956 1.887v2.273h3.328l-.532 3.495h-2.796V24C19.612 23.1 24 18.092 24 12.073Z" />
                    ) : (
                      <path d="M18.901 1.153h3.68l-8.04 9.19 9.46 12.504h-7.406l-5.8-7.584-6.625 7.584H.487l8.6-9.83L.012 1.153h7.593l5.242 6.932zM17.61 20.644h2.039L6.538 3.24H4.35z" />
                    )}
                  </svg>
                </a>
              ))}
            </div>
          </div>

          <div className="atlas-mobile-menu-ctas">
            <Link
              to="/atlas-global-south-ai-policy-coalition/"
              onClick={closeMenuForNavigation}
              className="atlas-mobile-cta atlas-mobile-cta-primary"
            >
              JOIN THE COALITION <span aria-hidden="true">→</span>
            </Link>
            <Link
              to={contactDestination}
              onClick={closeMenuForNavigation}
              className="atlas-mobile-cta atlas-mobile-cta-secondary"
            >
              CONTACT US <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
