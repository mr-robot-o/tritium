import type { ComponentProps } from 'react';
import { Link as AriaLink, composeRenderProps } from 'react-aria-components';
import './link.css';

export type LinkVariant = 'default' | 'muted';

export type LinkProps = ComponentProps<typeof AriaLink> & {
  /** `muted` is quieter and underlines only on hover, for secondary navigation. */
  variant?: LinkVariant;
};

export function Link({ className, variant = 'default', ...props }: LinkProps) {
  const base = `tritium-link tritium-link--${variant}`;
  return (
    <AriaLink
      {...props}
      className={composeRenderProps(className, (className) =>
        className ? `${base} ${className}` : base,
      )}
    />
  );
}
