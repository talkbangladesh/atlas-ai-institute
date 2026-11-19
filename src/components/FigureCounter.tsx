import { useEffect, useRef, useState } from 'react';

interface FigureCounterProps {
  figLabel: string;
  value: string;
  caption: string;
}

function parseValue(raw: string): { target: number; suffix: string } {
  const match = raw.match(/^(\d+)(.*)$/);
  if (!match) return { target: 0, suffix: raw };
  return {
    target: parseInt(match[1], 10),
    suffix: match[2] ?? '',
  };
}

export function FigureCounter({ figLabel, value, caption }: FigureCounterProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { target, suffix } = parseValue(value);
  const [displayValue, setDisplayValue] = useState<string>(value);
  const hasAnimatedRef = useRef(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mq.matches || target <= 0) {
      setDisplayValue(value);
      return;
    }

    let rafId = 0;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting && !hasAnimatedRef.current) {
          hasAnimatedRef.current = true;
          const duration = 900;
          const start = performance.now();

          const step = (now: number) => {
            const progress = Math.min(1, (now - start) / duration);
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = Math.round(target * eased);
            if (progress < 1) {
              setDisplayValue(`${current}${suffix}`);
              rafId = window.requestAnimationFrame(step);
            } else {
              setDisplayValue(value);
            }
          };

          rafId = window.requestAnimationFrame(step);
          io.disconnect();
        }
      },
      { threshold: 0.25 }
    );

    io.observe(el);
    return () => {
      io.disconnect();
      window.cancelAnimationFrame(rafId);
    };
  }, [target, suffix, value]);

  return (
    <div ref={containerRef} className="atlas-stat border-t border-[var(--hair)] pt-5">
      <span className="atlas-stat-label font-[var(--font-mono)] text-[11px] font-medium uppercase tracking-[0.1em] text-[var(--muted)] block mb-3">
        {figLabel}
      </span>
      <p
        className="atlas-stat-value font-[var(--font-serif)] font-bold tabular-nums mb-3"
        aria-label={`${value} ${caption}`}
      >
        {displayValue}
      </p>
      <span className="atlas-stat-caption atlas-eyebrow text-[var(--muted)] block">{caption}</span>
    </div>
  );
}
