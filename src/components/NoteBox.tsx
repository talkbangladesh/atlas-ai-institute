import { useId, useState, type ReactNode } from 'react';

interface NoteBoxProps {
  children: ReactNode;
  className?: string;
  mobileCompact?: boolean;
}

export function NoteBox({
  children,
  className = '',
  mobileCompact = false,
}: NoteBoxProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const fullNoteId = useId();

  return (
    <div
      className={`atlas-note-box ${mobileCompact ? 'atlas-note-box-compact' : ''} bg-[var(--white)] border border-[var(--hair)] border-l-4 border-l-[var(--ink)] px-5 py-4 ${className}`}
    >
      <span className="atlas-note-box-label font-[var(--font-mono)] text-[11px] font-medium uppercase tracking-[0.1em] text-[var(--ink)] block mb-1.5">
        NOTE
      </span>
      {mobileCompact ? (
        <>
          <div className="atlas-note-box-compact-summary">
            <span className="atlas-note-box-compact-text">
              <span aria-hidden="true">ⓘ</span>{' '}
              Research coverage does not indicate operational presence.
            </span>
            <button
              type="button"
              className="atlas-note-box-more"
              aria-controls={fullNoteId}
              aria-expanded={isExpanded}
              onClick={() => setIsExpanded((expanded) => !expanded)}
            >
              {isExpanded ? 'Less' : 'More'}
            </button>
          </div>
          <p
            id={fullNoteId}
            className={`atlas-note-box-full text-[15px] leading-[1.6] text-[var(--muted)]${isExpanded ? ' is-expanded' : ''}`}
          >
            {children}
          </p>
        </>
      ) : (
        <p className="text-[15px] leading-[1.6] text-[var(--muted)]">
          {children}
        </p>
      )}
    </div>
  );
}
