interface PullQuoteProps {
  quote: string;
  label?: string;
  className?: string;
}

export function PullQuote({ quote, label, className = '' }: PullQuoteProps) {
  return (
    <blockquote
      className={`m-0 border-t-2 border-[var(--ink)] pt-6 pb-2 ${className}`}
    >
      {label && (
        <span className="atlas-eyebrow text-[var(--muted)] block mb-3">
          {label}
        </span>
      )}
      <p className="font-[var(--font-serif)] font-semibold text-[clamp(24px,2.5vw,34px)] leading-[1.2] tracking-[-0.02em] text-[var(--ink)]">
        “{quote}”
      </p>
    </blockquote>
  );
}
