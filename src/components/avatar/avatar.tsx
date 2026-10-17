import { useState, type ComponentProps, type ReactNode } from 'react';
import './avatar.css';

export type AvatarSize = 'sm' | 'default' | 'lg';

export type AvatarProps = Omit<ComponentProps<'span'>, 'children'> & {
  /** Image URL. If it is missing or fails to load, the fallback is shown. */
  src?: string;
  /** Alternative text for the image. Also names the fallback for screen readers. */
  alt?: string;
  /** Shown when there is no image, usually initials or an icon. */
  fallback?: ReactNode;
  size?: AvatarSize;
};

export function Avatar({
  className,
  src,
  alt = '',
  fallback,
  size = 'default',
  ...props
}: AvatarProps) {
  // Remember which src failed so a new src gets a fresh attempt.
  const [failedSrc, setFailedSrc] = useState<string>();
  const showImage = src != null && src !== failedSrc;
  const base = `tritium-avatar tritium-avatar--size-${size}`;
  return (
    <span
      {...props}
      className={className ? `${base} ${className}` : base}
      {...(!showImage && alt ? { role: 'img', 'aria-label': alt } : {})}
    >
      {showImage ? (
        <img className="tritium-avatar__image" src={src} alt={alt} onError={() => setFailedSrc(src)} />
      ) : (
        <span className="tritium-avatar__fallback" aria-hidden={alt ? true : undefined}>
          {fallback}
        </span>
      )}
    </span>
  );
}
