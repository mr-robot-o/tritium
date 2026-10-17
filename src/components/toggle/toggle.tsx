import { useContext, type ComponentProps } from 'react';
import { ToggleButton as AriaToggleButton, composeRenderProps } from 'react-aria-components';
import { ToggleGroupContext, type ToggleSize, type ToggleVariant } from './toggle-context';
import './toggle.css';

export type { ToggleSize, ToggleVariant };

export type ToggleProps = ComponentProps<typeof AriaToggleButton> & {
  /** Inside a `ToggleGroup`, the group's variant is used unless this is set. */
  variant?: ToggleVariant;
  /** Heights match Button. Inside a `ToggleGroup`, the group's size is used unless this is set. */
  size?: ToggleSize;
  /** Renders a square toggle for a single icon. It needs an `aria-label`. */
  isIconOnly?: boolean;
};

export function Toggle({
  className,
  variant,
  size,
  isIconOnly = false,
  ...props
}: ToggleProps) {
  const group = useContext(ToggleGroupContext);
  const base = [
    'tritium-toggle',
    `tritium-toggle--${variant ?? group.variant ?? 'default'}`,
    `tritium-toggle--size-${size ?? group.size ?? 'default'}`,
    isIconOnly && 'tritium-toggle--icon-only',
  ]
    .filter(Boolean)
    .join(' ');
  return (
    <AriaToggleButton
      {...props}
      className={composeRenderProps(className, (className) =>
        className ? `${base} ${className}` : base,
      )}
    />
  );
}
