import type { ComponentProps } from 'react';
import {
  Tooltip as AriaTooltip,
  TooltipTrigger as AriaTooltipTrigger,
  composeRenderProps,
  type TooltipTriggerComponentProps,
} from 'react-aria-components';
import '../_shared/overlay.css';
import './tooltip.css';

/**
 * Wraps the trigger and the `Tooltip`. The trigger must be focusable, such as a `Button` or `Link`,
 * so keyboard users can open it too.
 */
export function TooltipTrigger({ delay = 500, closeDelay = 100, ...props }: TooltipTriggerComponentProps) {
  return <AriaTooltipTrigger delay={delay} closeDelay={closeDelay} {...props} />;
}

export type TooltipProps = ComponentProps<typeof AriaTooltip>;

export function Tooltip({ className, offset = 6, ...props }: TooltipProps) {
  return (
    <AriaTooltip
      {...props}
      offset={offset}
      className={composeRenderProps(className, (className) =>
        className ? `tritium-tooltip ${className}` : 'tritium-tooltip',
      )}
    />
  );
}
