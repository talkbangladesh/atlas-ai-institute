import type { ReactNode } from 'react';

interface EyebrowProps {
  children: ReactNode;
  className?: string;
  cobalt?: boolean;
}

export function Eyebrow({ children, className = '', cobalt = false }: EyebrowProps) {
  return (
    <span
      className={`atlas-eyebrow block ${
        cobalt ? 'text-[var(--cobalt)]' : 'text-[var(--muted)]'
      } ${className}`}
    >
      {children}
    </span>
  );
}
