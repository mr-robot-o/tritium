import type { ComponentProps, ReactNode } from 'react';
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

export type ButtonSize = 'xs' | 'sm' | 'default' | 'lg';

export type ButtonProps = ComponentProps<typeof AriaButton> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Content shown before the label, usually an icon. While pending, the spinner replaces it. */
  startContent?: ReactNode;
  /** Content shown after the label, usually an icon. */
  endContent?: ReactNode;
  /** Renders a square button for a single icon. It needs an `aria-label`. */
  isIconOnly?: boolean;
  /** Stretches the button to the full width of its container. */
  isFullWidth?: boolean;
};

export function Button({
  className,
  children,
  variant = 'primary',
  size = 'default',
  startContent,
  endContent,
  isIconOnly = false,
  isFullWidth = false,
  ...props
}: ButtonProps) {
  const base = [
    'tritium-button',
    `tritium-button--${variant}`,
    `tritium-button--size-${size}`,
    isIconOnly && 'tritium-button--icon-only',
    isFullWidth && 'tritium-button--full-width',
  ]
    .filter(Boolean)
    .join(' ');
  return (
    <AriaButton
      {...props}
      // While pending, a spinner takes the place of the start icon (or of the icon in an
      // icon-only button). The label stays so the width doesn't jump.
      children={composeRenderProps(children, (children, { isPending }) => {
        const spinner = <span className="tritium-button__spinner" aria-hidden="true" />;
        if (isIconOnly) return isPending ? spinner : children;
        return (
          <>
            {isPending ? (
              spinner
            ) : (
              startContent && (
                <span className="tritium-button__content">
                  {startContent}
                </span>
              )
            )}
            {children}
            {endContent && (
              <span className="tritium-button__content">
                {endContent}
              </span>
            )}
          </>
        );
      })}
      className={composeRenderProps(className, (className) =>
        className ? `${base} ${className}` : base,
      )}
    />
  );
}
