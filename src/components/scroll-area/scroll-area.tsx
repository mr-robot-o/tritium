import type { ComponentProps } from 'react';
import './scroll-area.css';

export type ScrollAreaProps = ComponentProps<'div'> & {
  /** Which directions scroll. */
  orientation?: 'vertical' | 'horizontal' | 'both';
};

/**
 * A region that scrolls its content. It is focusable so keyboard users can scroll it with the
 * arrow keys; give it an `aria-label` (it then gets `role="region"`) and set a height or width.
 */
export function ScrollArea({
  className,
  orientation = 'vertical',
  tabIndex = 0,
  ...props
}: ScrollAreaProps) {
  const base = `tritium-scroll-area tritium-scroll-area--${orientation}`;
  return (
    <div
      role={props['aria-label'] || props['aria-labelledby'] ? 'region' : undefined}
      {...props}
      tabIndex={tabIndex}
      className={className ? `${base} ${className}` : base}
    />
  );
}
