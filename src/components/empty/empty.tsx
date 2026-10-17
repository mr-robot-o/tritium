import type { ComponentProps } from 'react';
import './empty.css';

const cx = (base: string, className?: string) => (className ? `${base} ${className}` : base);

/** A placeholder for a view that has no content yet. */
export function Empty({ className, ...props }: ComponentProps<'div'>) {
  return <div {...props} className={cx('tritium-empty', className)} />;
}

export function EmptyHeader({ className, ...props }: ComponentProps<'div'>) {
  return <div {...props} className={cx('tritium-empty__header', className)} />;
}

export type EmptyMediaProps = ComponentProps<'div'> & {
  /** `icon` frames an icon in a tile. */
  variant?: 'default' | 'icon';
};

export function EmptyMedia({ className, variant = 'default', ...props }: EmptyMediaProps) {
  return <div {...props} className={cx(`tritium-empty__media tritium-empty__media--${variant}`, className)} />;
}

export function EmptyTitle({ className, ...props }: ComponentProps<'div'>) {
  return <div {...props} className={cx('tritium-empty__title', className)} />;
}

export function EmptyDescription({ className, ...props }: ComponentProps<'div'>) {
  return <div {...props} className={cx('tritium-empty__description', className)} />;
}

/** Actions, such as a Button, shown below the text. */
export function EmptyContent({ className, ...props }: ComponentProps<'div'>) {
  return <div {...props} className={cx('tritium-empty__content', className)} />;
}
