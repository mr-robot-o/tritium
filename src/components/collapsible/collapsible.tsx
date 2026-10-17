import type { ComponentProps } from 'react';
import { Disclosure, DisclosurePanel, composeRenderProps } from 'react-aria-components';
import './collapsible.css';

export type CollapsibleProps = ComponentProps<typeof Disclosure>;

/**
 * A single section that expands and collapses. Put a `Button` with `slot="trigger"` and a
 * `CollapsiblePanel` inside it.
 */
export function Collapsible({ className, ...props }: CollapsibleProps) {
  return (
    <Disclosure
      {...props}
      className={composeRenderProps(className, (className) =>
        className ? `tritium-collapsible ${className}` : 'tritium-collapsible',
      )}
    />
  );
}

export type CollapsiblePanelProps = ComponentProps<typeof DisclosurePanel>;

export function CollapsiblePanel({ className, ...props }: CollapsiblePanelProps) {
  return (
    <DisclosurePanel
      {...props}
      className={className ? `tritium-collapsible__panel ${className}` : 'tritium-collapsible__panel'}
    />
  );
}
