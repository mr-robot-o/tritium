import type { ComponentProps, ReactNode } from 'react';
import {
  Dialog,
  DialogTrigger,
  Popover as AriaPopover,
  composeRenderProps,
  type DialogTriggerProps,
} from 'react-aria-components';
import '../_shared/popover.css';
import './popover.css';

/** Wraps the trigger and the `Popover`. Any pressable element, such as a `Button`, can be the trigger. */
export function PopoverTrigger(props: DialogTriggerProps) {
  return <DialogTrigger {...props} />;
}

export type PopoverProps = Omit<ComponentProps<typeof AriaPopover>, 'children'> & {
  children?: ReactNode;
  /** Names the popover for screen readers. Give it this or `aria-labelledby`. */
  'aria-label'?: string;
  'aria-labelledby'?: string;
};

export function Popover({
  className,
  children,
  offset = 8,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledby,
  ...props
}: PopoverProps) {
  return (
    <AriaPopover
      {...props}
      offset={offset}
      className={composeRenderProps(className, (className) =>
        className ? `tritium-popover tritium-popover--panel ${className}` : 'tritium-popover tritium-popover--panel',
      )}
    >
      <Dialog
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledby}
        className="tritium-popover__dialog"
      >
        {children}
      </Dialog>
    </AriaPopover>
  );
}
