import type { ReactNode } from 'react';

interface NoteBoxProps {
  children: ReactNode;
  className?: string;
}

export function NoteBox({ children, className = '' }: NoteBoxProps) {
  return (
    <div
      className={`bg-[var(--white)] border border-[var(--hair)] border-l-4 border-l-[var(--ink)] px-5 py-4 ${className}`}
    >
      <span className="font-[var(--font-mono)] text-[11px] font-medium uppercase tracking-[0.1em] text-[var(--ink)] block mb-1.5">
        NOTE
      </span>
      <p className="text-[15px] leading-[1.6] text-[var(--muted)]">
        {children}
      </p>
    </div>
  );
}
