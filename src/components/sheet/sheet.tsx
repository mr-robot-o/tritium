import { ModalDialog, type ModalDialogProps, type ModalPlacement } from '../_shared/modal-dialog';

export type SheetSide = Exclude<ModalPlacement, 'center'>;

export type SheetProps = Omit<ModalDialogProps, 'placement'> & {
  /** The edge the sheet slides in from. */
  side?: SheetSide;
};

/**
 * A panel that slides in from an edge, for secondary tasks such as filters or settings. It is a
 * modal like Dialog: use it inside a `DialogTrigger`, and compose its content from
 * `DialogHeader`, `DialogTitle`, `DialogDescription` and `DialogFooter`.
 */
export function Sheet({ side = 'right', ...props }: SheetProps) {
  return <ModalDialog {...props} placement={side} />;
}
