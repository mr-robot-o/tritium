import type { ComponentProps } from 'react';
import './badge.css';

export type BadgeVariant = 'primary' | 'secondary' | 'tertiary' | 'destructive' | 'outline';

export type BadgeProps = ComponentProps<'span'> & {
  variant?: BadgeVariant;
};

export function Badge({ className, variant = 'primary', ...props }: BadgeProps) {
  const base = `tritium-badge tritium-badge--${variant}`;
  return <span {...props} className={className ? `${base} ${className}` : base} />;
}
