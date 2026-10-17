import type { ComponentProps, ElementType } from 'react';
import './typography.css';

export type TypographyVariant =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'p'
  | 'lead'
  | 'large'
  | 'small'
  | 'muted'
  | 'blockquote'
  | 'code';

const defaultElement = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  p: 'p',
  lead: 'p',
  large: 'div',
  small: 'small',
  muted: 'p',
  blockquote: 'blockquote',
  code: 'code',
} as const satisfies Record<TypographyVariant, ElementType>;

export type TypographyProps = ComponentProps<'p'> & {
  /** The text style. It also picks the default element. */
  variant?: TypographyVariant;
  /** Renders a different element than the variant's default, for example an `h2` styled as `h4`. */
  as?: ElementType;
};

export function Typography({ className, variant = 'p', as, ...props }: TypographyProps) {
  const Component = as ?? defaultElement[variant];
  const base = `tritium-typography tritium-typography--${variant}`;
  return <Component {...props} className={className ? `${base} ${className}` : base} />;
}
