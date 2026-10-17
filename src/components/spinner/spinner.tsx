import type { ComponentProps } from 'react';
import './spinner.css';

export type SpinnerProps = Omit<ComponentProps<'span'>, 'children'> & {
  /** Accessible label announced to screen readers. Pass `null` when the spinner is decorative, for example inside a pending button. */
  label?: string | null;
};

export function Spinner({ className, label = 'Loading', ...props }: SpinnerProps) {
  const base = className ? `tritium-spinner ${className}` : 'tritium-spinner';
  if (label === null) {
    return <span {...props} className={base} aria-hidden="true" />;
  }
  return <span {...props} className={base} role="status" aria-label={label} />;
}
