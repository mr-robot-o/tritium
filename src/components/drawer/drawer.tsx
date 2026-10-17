import { ModalDialog, type ModalDialogProps } from '../_shared/modal-dialog';
import './drawer.css';

export type DrawerProps = Omit<ModalDialogProps, 'placement' | 'size'>;

/**
 * A bottom sheet with a grab handle and rounded top corners, for mobile-style flows. It is a
 * modal like Dialog: use it inside a `DialogTrigger`, and compose its content from
 * `DialogHeader`, `DialogTitle`, `DialogDescription` and `DialogFooter`. The handle is visual
 * only; the drawer does not drag.
 */
export function Drawer({ className, children, ...props }: DrawerProps) {
  return (
    <ModalDialog
      {...props}
      placement="bottom"
      className={className ? `tritium-drawer ${className}` : 'tritium-drawer'}
    >
      {(renderProps) => (
        <>
          <div className="tritium-drawer__handle" aria-hidden="true" />
          {typeof children === 'function' ? children(renderProps) : children}
        </>
      )}
    </ModalDialog>
  );
}
