import type { ComponentProps } from 'react';
import { Label as AriaLabel } from 'react-aria-components';
import './label.css';

export type LabelProps = ComponentProps<typeof AriaLabel> & {
  /** Appends a required marker (*). Fields that set `isRequired` get the marker automatically, so this is for standalone labels. */
  isRequired?: boolean;
};

export function Label({ className, isRequired = false, ...props }: LabelProps) {
  const base = ['tritium-label', isRequired && 'tritium-label--required']
    .filter(Boolean)
    .join(' ');
  return <AriaLabel {...props} className={className ? `${base} ${className}` : base} />;
}
