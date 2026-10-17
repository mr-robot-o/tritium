import type { ReactNode } from 'react';
import { Button } from '../button/button';
import { Dialog, DialogDescription, DialogFooter, DialogHeader, DialogTitle, type DialogProps } from '../dialog/dialog';

export type AlertDialogProps = Omit<DialogProps, 'children' | 'role' | 'isDismissable'> & {
  /** What is being asked, for example "Delete this project?". */
  title: ReactNode;
  /** An explanation of the consequences. */
  children: ReactNode;
  /** Label of the confirm button. */
  confirmLabel?: string;
  /** Label of the cancel button. */
  cancelLabel?: string;
  /** `destructive` styles the confirm button for actions that can't be undone. */
  variant?: 'default' | 'destructive';
  /** Called when the user confirms. The dialog closes afterwards. */
  onConfirm?: () => void;
  /** Called when the user cancels or presses Escape. */
  onCancel?: () => void;
};

/** A dialog that asks the user to confirm before continuing. Use it inside a `DialogTrigger`. */
export function AlertDialog({
  title,
  children,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  variant = 'default',
  onConfirm,
  onCancel,
  onOpenChange,
  ...props
}: AlertDialogProps) {
  return (
    <Dialog
      {...props}
      role="alertdialog"
      size="sm"
      // The user must choose; clicking outside does not answer the question.
      isDismissable={false}
      onOpenChange={(isOpen) => {
        if (!isOpen) onCancel?.();
        onOpenChange?.(isOpen);
      }}
    >
      {({ close }) => (
        <>
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{children}</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            {/* Focus starts on the safe choice. */}
            <Button variant="outline" autoFocus onPress={close}>
              {cancelLabel}
            </Button>
            <Button
              variant={variant === 'destructive' ? 'destructive' : 'primary'}
              onPress={() => {
                onConfirm?.();
                close();
              }}
            >
              {confirmLabel}
            </Button>
          </DialogFooter>
        </>
      )}
    </Dialog>
  );
}
