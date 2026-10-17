import type { ComponentProps } from 'react';
import './card.css';

const cx = (base: string, className?: string) => (className ? `${base} ${className}` : base);

export type CardProps = ComponentProps<'div'>;

export function Card({ className, ...props }: CardProps) {
  return <div {...props} className={cx('tritium-card', className)} />;
}

export function CardHeader({ className, ...props }: ComponentProps<'div'>) {
  return <div {...props} className={cx('tritium-card__header', className)} />;
}

/** The card heading. It renders a `div`; pass `role="heading"` and `aria-level`, or put a heading element inside, to match the page outline. */
export function CardTitle({ className, ...props }: ComponentProps<'div'>) {
  return <div {...props} className={cx('tritium-card__title', className)} />;
}

export function CardDescription({ className, ...props }: ComponentProps<'div'>) {
  return <div {...props} className={cx('tritium-card__description', className)} />;
}

/** An element in the top right of the header, such as a button. */
export function CardAction({ className, ...props }: ComponentProps<'div'>) {
  return <div {...props} className={cx('tritium-card__action', className)} />;
}

export function CardContent({ className, ...props }: ComponentProps<'div'>) {
  return <div {...props} className={cx('tritium-card__content', className)} />;
}

export function CardFooter({ className, ...props }: ComponentProps<'div'>) {
  return <div {...props} className={cx('tritium-card__footer', className)} />;
}
