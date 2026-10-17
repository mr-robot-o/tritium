import type { ComponentProps } from 'react';
import { DialogTrigger as AriaDialogTrigger, Heading, type DialogTriggerProps } from 'react-aria-components';
import { ModalDialog, type ModalDialogProps, type ModalSize } from '../_shared/modal-dialog';
import './dialog.css';

const cx = (base: string, className?: string) => (className ? `${base} ${className}` : base);

export type { ModalSize as DialogSize };

/**
 * Wraps the trigger and the `Dialog`. Any pressable element, such as a `Button`, can be the
 * trigger. Inside a dialog, a `Button` with `slot="close"` closes it.
 */
export function DialogTrigger(props: DialogTriggerProps) {
  return <AriaDialogTrigger {...props} />;
}

export type DialogProps = Omit<ModalDialogProps, 'placement'>;

/** A modal window over the page. It needs a `DialogTitle` (or an `aria-label`). */
export function Dialog(props: DialogProps) {
  return <ModalDialog {...props} placement="center" />;
}

export function DialogHeader({ className, ...props }: ComponentProps<'div'>) {
  return <div {...props} className={cx('tritium-dialog__header', className)} />;
}

export function DialogTitle({ className, ...props }: ComponentProps<typeof Heading>) {
  return <Heading slot="title" level={2} {...props} className={cx('tritium-dialog__title', className)} />;
}

export function DialogDescription({ className, ...props }: ComponentProps<'p'>) {
  return <p {...props} className={cx('tritium-dialog__description', className)} />;
}

export function DialogFooter({ className, ...props }: ComponentProps<'div'>) {
  return <div {...props} className={cx('tritium-dialog__footer', className)} />;
}
