import type { ComponentProps } from 'react';
import { Group, composeRenderProps } from 'react-aria-components';
import './button-group.css';

export type ButtonGroupProps = ComponentProps<typeof Group> & {
  /** Direction the buttons are laid out in. */
  orientation?: 'horizontal' | 'vertical';
};

export function ButtonGroup({ className, orientation = 'horizontal', ...props }: ButtonGroupProps) {
  const base = `tritium-button-group tritium-button-group--${orientation}`;
  return (
    <Group
      {...props}
      className={composeRenderProps(className, (className) =>
        className ? `${base} ${className}` : base,
      )}
    />
  );
}
