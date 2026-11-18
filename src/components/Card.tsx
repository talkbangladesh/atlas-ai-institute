import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface CardProps {
  children: ReactNode;
  to?: string;
  className?: string;
}

export function Card({ children, to, className = '' }: CardProps) {
  if (to) {
    return (
      <Link
        to={to}
        className={`atlas-card h-full flex flex-col justify-between no-underline text-inherit group ${className}`}
      >
        {children}
      </Link>
    );
  }

  return (
    <div className={`atlas-card h-full flex flex-col justify-between ${className}`}>
      {children}
    </div>
  );
}
