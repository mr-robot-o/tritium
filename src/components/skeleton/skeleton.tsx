import type { ComponentProps } from 'react';
import './skeleton.css';

export type SkeletonShape = 'rectangle' | 'circle';

export type SkeletonProps = Omit<ComponentProps<'div'>, 'children'> & {
  /** `circle` makes the placeholder round, for avatars. Set a width and height with `style` or `className`. */
  shape?: SkeletonShape;
};

export function Skeleton({ className, shape = 'rectangle', ...props }: SkeletonProps) {
  const base = `tritium-skeleton tritium-skeleton--${shape}`;
  return <div {...props} className={className ? `${base} ${className}` : base} aria-hidden="true" />;
}
