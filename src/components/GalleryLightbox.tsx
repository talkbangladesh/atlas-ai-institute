import { useEffect, useRef, useState } from 'react';
import type { ProfileGalleryItem } from '../lib/profileAssets';

interface GalleryLightboxProps {
  items: ProfileGalleryItem[];
  memberName: string;
  accent?: 'cobalt' | 'gold';
}

export function GalleryLightbox({
  items,
  memberName,
  accent = 'cobalt',
}: GalleryLightboxProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (activeIndex === null) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const focusTimer = window.setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 0);

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        setActiveIndex(null);
        return;
      }

      if (e.key === 'ArrowRight' && items.length > 1) {
        e.preventDefault();
        setActiveIndex((prev) =>
          prev === null ? 0 : (prev + 1) % items.length
        );
        return;
      }

      if (e.key === 'ArrowLeft' && items.length > 1) {
        e.preventDefault();
        setActiveIndex((prev) =>
          prev === null ? 0 : (prev - 1 + items.length) % items.length
        );
        return;
      }

      if (e.key === 'Tab') {
        const container = dialogRef.current;
        if (!container) return;
        const focusable = Array.from(
          container.querySelectorAll<HTMLElement>(
            'button:not([disabled]), [href], [tabindex]:not([tabindex="-1"])'
          )
        );
        if (focusable.length === 0) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last.focus();
          }
        } else if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener('keydown', onKeyDown);

    return () => {
      window.clearTimeout(focusTimer);
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKeyDown);
      triggerRef.current?.focus();
    };
  }, [activeIndex, items.length]);

  if (items.length === 0) return null;

  const activeItem = activeIndex !== null ? items[activeIndex] : null;
  const focusRingClass =
    accent === 'gold'
      ? 'focus-visible:outline-[var(--c-gold-ink)]'
      : 'focus-visible:outline-[var(--cobalt)]';

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {items.map((item, idx) => (
          <figure key={item.filename} className="atlas-profile-gallery-figure m-0 flex flex-col">
            <button
              type="button"
              onClick={(e) => {
                triggerRef.current = e.currentTarget;
                setActiveIndex(idx);
              }}
              aria-label={
                item.caption
                  ? `Open image: ${item.caption}`
                  : `Open gallery image ${idx + 1} for ${memberName}`
              }
              className={`block w-full aspect-[4/3] border border-[var(--hair)] bg-[var(--paper-deep)] overflow-hidden p-0 cursor-pointer text-left ${focusRingClass}`}
            >
              <img
                src={item.url}
                alt={item.caption ?? `${memberName} gallery image ${idx + 1}`}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover block"
              />
            </button>
            {item.caption && (
              <figcaption className="mt-2 font-[var(--font-mono)] text-[11px] uppercase tracking-[0.08em] leading-[1.45] text-[var(--muted)]">
                {item.caption}
              </figcaption>
            )}
          </figure>
        ))}
      </div>

      {activeItem && activeIndex !== null && (
        <div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label={`${memberName} image viewer`}
          className="fixed inset-0 z-50 bg-[var(--navy)] text-[var(--white)] flex flex-col justify-between p-5 sm:p-8"
        >
          <div className="flex items-center justify-between gap-4 border-b border-white/20 pb-4">
            <span className="font-[var(--font-mono)] text-[12px] uppercase tracking-[0.1em] text-white/80 tabular-nums">
              {memberName} · {String(activeIndex + 1).padStart(2, '0')} /{' '}
              {String(items.length).padStart(2, '0')}
            </span>
            <button
              ref={closeButtonRef}
              type="button"
              onClick={() => setActiveIndex(null)}
              className="atlas-btn atlas-btn-white-ink min-h-[44px] px-4 py-2 text-[14px]"
            >
              Close
            </button>
          </div>

          <div className="flex-1 flex flex-col items-center justify-center py-6 min-h-0">
            <img
              src={activeItem.url}
              alt={
                activeItem.caption ??
                `${memberName} gallery image ${activeIndex + 1}`
              }
              decoding="async"
              className="max-w-[80%] max-h-[56vh] object-contain border border-white/20 block"
            />
            {activeItem.caption && (
              <p className="mt-4 font-[var(--font-mono)] text-[12px] uppercase tracking-[0.08em] text-white/85 text-center max-w-[65ch]">
                {activeItem.caption}
              </p>
            )}
          </div>

          <div className="flex items-center justify-between gap-4 border-t border-white/20 pt-4">
            {items.length > 1 ? (
              <>
                <button
                  type="button"
                  onClick={() =>
                    setActiveIndex(
                      (activeIndex - 1 + items.length) % items.length
                    )
                  }
                  className="atlas-btn atlas-btn-ghost-white min-h-[44px] px-4 py-2 text-[14px]"
                >
                  ← Previous
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setActiveIndex((activeIndex + 1) % items.length)
                  }
                  className="atlas-btn atlas-btn-ghost-white min-h-[44px] px-4 py-2 text-[14px]"
                >
                  Next →
                </button>
              </>
            ) : (
              <span className="font-[var(--font-mono)] text-[11px] uppercase tracking-[0.1em] text-white/60">
                Press Esc to close
              </span>
            )}
          </div>
        </div>
      )}
    </>
  );
}
