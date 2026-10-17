import type { ComponentProps } from 'react';
import './item.css';

const cx = (base: string, className?: string) => (className ? `${base} ${className}` : base);

export type ItemVariant = 'default' | 'outline' | 'muted';
export type ItemSize = 'default' | 'sm';

export type ItemProps = ComponentProps<'div'> & {
  variant?: ItemVariant;
  size?: ItemSize;
};

/** A flexible row for a piece of content with optional media and actions, such as a list entry. */
export function Item({ className, variant = 'default', size = 'default', ...props }: ItemProps) {
  return (
    <div
      {...props}
      className={cx(`tritium-item tritium-item--${variant} tritium-item--size-${size}`, className)}
    />
  );
}

/** Stacks several items. */
export function ItemGroup({ className, ...props }: ComponentProps<'div'>) {
  return <div role="list" {...props} className={cx('tritium-item-group', className)} />;
}

export type ItemMediaProps = ComponentProps<'div'> & {
  /** `icon` frames an icon in a tile; `image` crops an image to a rounded square. */
  variant?: 'default' | 'icon' | 'image';
};

export function ItemMedia({ className, variant = 'default', ...props }: ItemMediaProps) {
  return <div {...props} className={cx(`tritium-item__media tritium-item__media--${variant}`, className)} />;
}

export function ItemContent({ className, ...props }: ComponentProps<'div'>) {
  return <div {...props} className={cx('tritium-item__content', className)} />;
}

export function ItemTitle({ className, ...props }: ComponentProps<'div'>) {
  return <div {...props} className={cx('tritium-item__title', className)} />;
}

export function ItemDescription({ className, ...props }: ComponentProps<'div'>) {
  return <div {...props} className={cx('tritium-item__description', className)} />;
}

export function ItemActions({ className, ...props }: ComponentProps<'div'>) {
  return <div {...props} className={cx('tritium-item__actions', className)} />;
}
