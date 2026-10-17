import type { ReactNode } from 'react';
import {
  Dialog as AriaDialog,
  Modal,
  ModalOverlay,
  type DialogRenderProps,
} from 'react-aria-components';
import './modal.css';

export type ModalPlacement = 'center' | 'left' | 'right' | 'top' | 'bottom';
export type ModalSize = 'sm' | 'default' | 'lg';

export type ModalDialogProps = {
  /** Where the panel sits: centered for a dialog, or against an edge for a sheet. */
  placement: ModalPlacement;
  size?: ModalSize;
  /** Controlled open state. Not needed inside a `DialogTrigger`. */
  isOpen?: boolean;
  /** Initial open state when uncontrolled. */
  defaultOpen?: boolean;
  onOpenChange?: (isOpen: boolean) => void;
  /** Whether clicking outside closes it. */
  isDismissable?: boolean;
  /** Stops Escape from closing it. */
  isKeyboardDismissDisabled?: boolean;
  /** `alertdialog` for a dialog that needs an explicit answer. */
  role?: 'dialog' | 'alertdialog';
  className?: string;
  'aria-label'?: string;
  'aria-labelledby'?: string;
  children: ReactNode | ((renderProps: DialogRenderProps) => ReactNode);
};

// The overlay, panel and dialog shared by Dialog, Alert Dialog, Sheet and Drawer.
export function ModalDialog({
  placement,
  size = 'default',
  isOpen,
  defaultOpen,
  onOpenChange,
  isDismissable = true,
  isKeyboardDismissDisabled,
  role,
  className,
  children,
  ...aria
}: ModalDialogProps) {
  return (
    <ModalOverlay
      isOpen={isOpen}
      defaultOpen={defaultOpen}
      onOpenChange={onOpenChange}
      isDismissable={isDismissable}
      isKeyboardDismissDisabled={isKeyboardDismissDisabled}
      className="tritium-overlay"
    >
      <Modal
        className={`tritium-modal tritium-modal--${placement} tritium-modal--size-${size}`}
      >
        <AriaDialog
          {...aria}
          role={role}
          className={className ? `tritium-dialog ${className}` : 'tritium-dialog'}
        >
          {children}
        </AriaDialog>
      </Modal>
    </ModalOverlay>
  );
}
