import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface ButtonProps {
  children: ReactNode;
  to?: string;
  href?: string;
  external?: boolean;
  variant?: 'primary' | 'ghost' | 'ghost-light';
  size?: 'md' | 'lg';
  showArrow?: boolean;
  className?: string;
  ariaLabel?: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

export function Button({
  children,
  to,
  href,
  external = false,
  variant = 'primary',
  size = 'md',
  showArrow = true,
  className = '',
  ariaLabel,
  onClick,
  type = 'button',
  disabled = false,
}: ButtonProps) {
  const variantClass =
    variant === 'primary'
      ? 'atlas-btn-primary'
      : variant === 'ghost-light'
        ? 'atlas-btn-ghost-light'
        : 'atlas-btn-ghost';
  const sizeClass = size === 'lg' ? 'atlas-btn-lg' : '';
  const classes = `atlas-btn ${variantClass} ${sizeClass} ${className}`.trim();

  const content = (
    <>
      <span>{children}</span>
      {showArrow && (
        <span className="atlas-arrow" aria-hidden="true">
          →
        </span>
      )}
    </>
  );

  if (to) {
    return (
      <Link to={to} className={classes} aria-label={ariaLabel}>
        {content}
      </Link>
    );
  }

  if (href) {
    if (external) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={classes}
          aria-label={ariaLabel}
        >
          {content}
        </a>
      );
    }
    return (
      <a href={href} className={classes} aria-label={ariaLabel}>
        {content}
      </a>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={classes}
      aria-label={ariaLabel}
    >
      {content}
    </button>
  );
}
