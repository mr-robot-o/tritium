import type { ReactNode } from 'react';
import { UNSTABLE_ToastQueue as ToastQueue } from 'react-aria-components';

export type ToastVariant = 'default' | 'success' | 'info' | 'warning' | 'destructive';

export type ToastContent = {
  title: ReactNode;
  description?: ReactNode;
  variant?: ToastVariant;
};

export type ToastOptions = {
  /** Milliseconds before it closes on its own. Pass `0` to keep it until dismissed. Defaults to 5000. */
  timeout?: number;
  /** Called when the toast closes. */
  onClose?: () => void;
};

/** The queue the `Toaster` renders. Most code should use the `toast` function instead. */
export const toastQueue = new ToastQueue<ToastContent>({ maxVisibleToasts: 5 });

const show = (content: ToastContent, { timeout = 5000, onClose }: ToastOptions = {}) =>
  toastQueue.add(content, { timeout: timeout === 0 ? undefined : timeout, onClose });

type Shorthand = (title: ReactNode, options?: ToastOptions & { description?: ReactNode }) => string;

const variantShorthand =
  (variant: ToastVariant): Shorthand =>
  (title, { description, ...options } = {}) =>
    show({ title, description, variant }, options);

/**
 * Shows a toast. `toast('Saved')`, or with details: `toast({ title, description, variant })`.
 * Needs a `Toaster` rendered once near the root of the app. Returns a key for `toast.close`.
 */
export const toast = Object.assign(
  (content: ToastContent | string, options?: ToastOptions) =>
    show(typeof content === 'string' ? { title: content } : content, options),
  {
    success: variantShorthand('success'),
    info: variantShorthand('info'),
    warning: variantShorthand('warning'),
    error: variantShorthand('destructive'),
    /** Closes the toast with this key. */
    close: (key: string) => toastQueue.close(key),
  },
);
