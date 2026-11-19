import type { ReactNode } from 'react';
import { SITE_META } from '../data/siteContent';

export type LogoVariant =
  | 'horizontal'
  | 'horizontal-white'
  | 'mark'
  | 'coalition'
  | 'coalition-white';

const brandLogoGlob = import.meta.glob<string>(
  '/src/assets-optimized/brand/logo/*.{svg,png,webp}',
  { eager: true, query: '?url', import: 'default' }
);

const coalitionLogoGlob = import.meta.glob<string>(
  '/src/assets-optimized/brand/coalition/*.{svg,png,webp}',
  { eager: true, query: '?url', import: 'default' }
);

const PREFERRED_EXTENSIONS = ['svg', 'png', 'webp'] as const;

function resolveBrandAsset(
  globMap: Record<string, string>,
  prefix: string,
  baseName: string
): string | undefined {
  const entries = Object.entries(globMap);
  for (const ext of PREFERRED_EXTENSIONS) {
    const expected = `${prefix}${baseName}.${ext}`.toLowerCase();
    const match = entries.find(([path]) => path.toLowerCase() === expected);
    if (match) return match[1];
  }
  return undefined;
}

export function getLogoAssetUrl(variant: LogoVariant): string | undefined {
  switch (variant) {
    case 'horizontal':
      return resolveBrandAsset(
        brandLogoGlob,
        '/src/assets-optimized/brand/logo/',
        'logo-horizontal'
      );
    case 'horizontal-white':
      return resolveBrandAsset(
        brandLogoGlob,
        '/src/assets-optimized/brand/logo/',
        'logo-horizontal-white'
      );
    case 'mark':
      return resolveBrandAsset(
        brandLogoGlob,
        '/src/assets-optimized/brand/logo/',
        'logo-mark'
      );
    case 'coalition':
      return resolveBrandAsset(
        coalitionLogoGlob,
        '/src/assets-optimized/brand/coalition/',
        'coalition-logo'
      );
    case 'coalition-white':
      return resolveBrandAsset(
        coalitionLogoGlob,
        '/src/assets-optimized/brand/coalition/',
        'coalition-logo-white'
      );
  }
}

export function hasLogoAsset(variant: LogoVariant): boolean {
  return Boolean(getLogoAssetUrl(variant));
}

export interface LogoProps {
  variant: LogoVariant;
  heightClass?: string;
  className?: string;
  fallbackClassName?: string;
  fallback?: ReactNode;
  isOnlyContent?: boolean;
  priority?: boolean;
}

export function Logo({
  variant,
  heightClass = 'h-10',
  className = '',
  fallbackClassName = '',
  fallback,
  isOnlyContent = true,
  priority = false,
}: LogoProps) {
  const src = getLogoAssetUrl(variant);

  if (!src) {
    if (fallback !== undefined) {
      return <>{fallback}</>;
    }
    if (variant === 'coalition' || variant === 'coalition-white') {
      return null;
    }
    return <span className={fallbackClassName}>{SITE_META.name}</span>;
  }

  const isCoalition =
    variant === 'coalition' || variant === 'coalition-white';
  const alt = isOnlyContent
    ? isCoalition
      ? 'Atlas Global South AI Policy Coalition'
      : SITE_META.name
    : '';
  const intrinsicWidth = variant === 'mark' ? 40 : 200;
  const intrinsicHeight = 40;

  return (
    <img
      src={src}
      alt={alt}
      width={intrinsicWidth}
      height={intrinsicHeight}
      loading={priority ? 'eager' : 'lazy'}
      decoding={priority ? 'sync' : 'async'}
      fetchPriority={priority ? 'high' : undefined}
      className={`${heightClass} min-h-[28px] w-auto max-w-full object-contain block select-none shrink-0 ${className}`.trim()}
    />
  );
}
