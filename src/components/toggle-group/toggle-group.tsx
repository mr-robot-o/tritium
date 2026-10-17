import type { ComponentProps } from 'react';
import { ToggleButtonGroup as AriaToggleButtonGroup, composeRenderProps } from 'react-aria-components';
import { ToggleGroupContext, type ToggleSize, type ToggleVariant } from '../toggle/toggle-context';
import './toggle-group.css';

export type ToggleGroupProps = ComponentProps<typeof AriaToggleButtonGroup> & {
  /** Applied to every `Toggle` in the group. */
  variant?: ToggleVariant;
  /** Applied to every `Toggle` in the group. */
  size?: ToggleSize;
};

export function ToggleGroup({ className, variant, size, ...props }: ToggleGroupProps) {
  return (
    <ToggleGroupContext.Provider value={{ variant, size }}>
      <AriaToggleButtonGroup
        {...props}
        className={composeRenderProps(className, (className) =>
          className ? `tritium-toggle-group ${className}` : 'tritium-toggle-group',
        )}
      />
    </ToggleGroupContext.Provider>
  );
}
