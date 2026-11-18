import { useEffect, useRef, useState, type ReactNode } from 'react';
import { Eyebrow } from './Eyebrow';

interface SectionShellProps {
  id?: string;
  eyebrow: string;
  headingId: string;
  children: ReactNode;
  variant?: 'paper' | 'deep';
  className?: string;
}

export function SectionShell({
  id,
  eyebrow,
  headingId,
  children,
  variant = 'paper',
  className = '',
}: SectionShellProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const tickRef = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    let tickFrame = 0;

    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mq.matches) {
      setVisible(true);
      tickRef.current?.style.setProperty('transform', 'scaleY(1)');
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

    const updateTick = () => {
      if (tickFrame) return;
      tickFrame = window.requestAnimationFrame(() => {
        tickFrame = 0;
        const rect = el.getBoundingClientRect();
        const total = rect.height;
        if (total <= 0) return;
        const scrolledInto = window.innerHeight * 0.45 - rect.top;
        const progress = Math.min(1, Math.max(0, scrolledInto / total));
        tickRef.current?.style.setProperty(
          'transform',
          `scaleY(${progress})`
        );
      });
    };

    updateTick();
    window.addEventListener('scroll', updateTick, { passive: true });
    window.addEventListener('resize', updateTick, { passive: true });

    return () => {
      io.disconnect();
      if (tickFrame) window.cancelAnimationFrame(tickFrame);
      window.removeEventListener('scroll', updateTick);
      window.removeEventListener('resize', updateTick);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id={id}
      aria-labelledby={headingId}
      className={`atlas-section ${
        variant === 'deep' ? 'atlas-section-deep' : ''
      } ${className}`}
    >
      <div className="atlas-container">
        <div className="atlas-section-grid">
          <div className="atlas-section-index">
            <div className="flex items-start gap-3">
              <div
                aria-hidden="true"
                className="w-[2px] h-7 bg-[var(--hair)] shrink-0 mt-0.5 relative overflow-hidden"
              >
                <div
                  ref={tickRef}
                  className="h-full w-full origin-top bg-[var(--cobalt)] will-change-transform"
                  style={{ transform: 'scaleY(0)' }}
                />
              </div>
              <Eyebrow>{eyebrow}</Eyebrow>
            </div>
          </div>

          <div
            className={`atlas-section-content atlas-reveal ${
              visible ? 'is-visible' : ''
            }`}
          >
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}
