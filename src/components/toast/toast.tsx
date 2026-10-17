import {
  Text,
  UNSTABLE_Toast as Toast,
  UNSTABLE_ToastContent as ToastContent,
  UNSTABLE_ToastRegion as ToastRegion,
} from 'react-aria-components';
import { Button } from '../button/button';
import { toastQueue } from './toast-queue';
import '../_shared/overlay.css';
import './toast.css';

export type ToasterProps = {
  /** Names the region for screen reader users. */
  'aria-label'?: string;
};

/**
 * Renders the toasts. Put one near the root of the app, then call `toast()` from anywhere.
 * Toasts pause their timer while hovered or focused, and F6 moves keyboard focus into the region.
 */
export function Toaster({ 'aria-label': ariaLabel = 'Notifications' }: ToasterProps) {
  return (
    <ToastRegion queue={toastQueue} aria-label={ariaLabel} className="tritium-toast-region">
      {({ toast }) => (
        <Toast
          toast={toast}
          className={`tritium-toast tritium-toast--${toast.content.variant ?? 'default'}`}
        >
          <ToastContent className="tritium-toast__content">
            <Text slot="title" className="tritium-toast__title">
              {toast.content.title}
            </Text>
            {toast.content.description != null && (
              <Text slot="description" className="tritium-toast__description">
                {toast.content.description}
              </Text>
            )}
          </ToastContent>
          <Button slot="close" variant="ghost" size="xs" isIconOnly aria-label="Dismiss">
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
              <path d="M4 4l8 8M12 4l-8 8" strokeLinecap="round" />
            </svg>
          </Button>
        </Toast>
      )}
    </ToastRegion>
  );
}
