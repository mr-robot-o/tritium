import type { ComponentProps } from 'react';
import { Group, Panel, Separator } from 'react-resizable-panels';
import './resizable.css';

const cx = (base: string, className?: string) => (className ? `${base} ${className}` : base);

export type ResizablePanelGroupProps = ComponentProps<typeof Group>;

/**
 * A row or column of panels with draggable dividers between them, built on
 * `react-resizable-panels`. Give it a height (or width) from its parent, and set `orientation`
 * to `vertical` to stack the panels.
 */
export function ResizablePanelGroup({ className, ...props }: ResizablePanelGroupProps) {
  return <Group {...props} className={cx('tritium-resizable', className)} />;
}

export type ResizablePanelProps = ComponentProps<typeof Panel>;

/** One pane. Sizes are percentages unless you pass a number, which is pixels, or a CSS unit string. */
export function ResizablePanel({ className, ...props }: ResizablePanelProps) {
  return <Panel {...props} className={cx('tritium-resizable__panel', className)} />;
}

export type ResizableHandleProps = ComponentProps<typeof Separator> & {
  /** Shows a grip on the divider so it reads as draggable. */
  withHandle?: boolean;
};

/** The divider. It is focusable: arrow keys resize, Home and End jump to the limits, Enter collapses a collapsible panel. */
export function ResizableHandle({ className, withHandle, children, ...props }: ResizableHandleProps) {
  return (
    <Separator {...props} className={cx('tritium-resizable__handle', className)}>
      {withHandle ? (
        <span className="tritium-resizable__grip" aria-hidden="true">
          <svg viewBox="0 0 16 16" fill="currentColor">
            <circle cx="6" cy="4" r="1" />
            <circle cx="10" cy="4" r="1" />
            <circle cx="6" cy="8" r="1" />
            <circle cx="10" cy="8" r="1" />
            <circle cx="6" cy="12" r="1" />
            <circle cx="10" cy="12" r="1" />
          </svg>
        </span>
      ) : (
        children
      )}
    </Separator>
  );
}
