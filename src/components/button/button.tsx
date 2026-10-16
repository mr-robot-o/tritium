import type { ComponentProps } from 'react';
import { Button as AriaButton, composeRenderProps } from 'react-aria-components';
import './button.css';

export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'destructive'
  | 'outline'
  | 'ghost'
  | 'link';

export type ButtonSize =
  | 'xs'
  | 'sm'
  | 'default'
  | 'lg'
  | 'icon-xs'
  | 'icon-sm'
  | 'icon'
  | 'icon-lg';

export type ButtonProps = ComponentProps<typeof AriaButton> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
};

export function Button({
  className,
  variant = 'primary',
  size = 'default',
  ...props
}: ButtonProps) {
  const base = `tritium-button tritium-button--${variant} tritium-button--size-${size}`;
  return (
    <AriaButton
      {...props}
      className={composeRenderProps(className, (className) =>
        className ? `${base} ${className}` : base,
      )}
    />
  );
}
