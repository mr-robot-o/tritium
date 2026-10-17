import type { ComponentProps } from 'react';
import {
  Tooltip,
  TooltipTrigger,
  composeRenderProps,
  type TooltipTriggerComponentProps,
} from 'react-aria-components';
import '../_shared/popover.css';
import './hover-card.css';

/**
 * Wraps the trigger and the `HoverCardContent`. The trigger must be focusable, such as a `Link` or
 * `Button`, so keyboard users can open the card too.
 */
export function HoverCard({ delay = 700, closeDelay = 300, ...props }: TooltipTriggerComponentProps) {
  return <TooltipTrigger delay={delay} closeDelay={closeDelay} {...props} />;
}

export type HoverCardContentProps = ComponentProps<typeof Tooltip>;

export function HoverCardContent({ className, offset = 8, ...props }: HoverCardContentProps) {
  return (
    <Tooltip
      {...props}
      offset={offset}
      className={composeRenderProps(className, (className) =>
        className ? `tritium-popover tritium-hover-card ${className}` : 'tritium-popover tritium-hover-card',
      )}
    />
  );
}
