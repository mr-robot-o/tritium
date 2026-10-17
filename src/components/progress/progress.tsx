import type { ReactNode } from 'react';
import {
  Label,
  ProgressBar as AriaProgressBar,
  composeRenderProps,
  type ProgressBarProps as AriaProgressBarProps,
} from 'react-aria-components';
import './progress.css';

export type ProgressSize = 'sm' | 'default' | 'lg';

export type ProgressProps = Omit<AriaProgressBarProps, 'children'> & {
  /** The visible label. Without one, pass an `aria-label`. */
  label?: ReactNode;
  /** Shows the formatted value next to the label. Hidden while indeterminate. */
  showValue?: boolean;
  /** Height of the bar. */
  size?: ProgressSize;
};

export function Progress({
  className,
  label,
  showValue = false,
  size = 'default',
  ...props
}: ProgressProps) {
  const base = `tritium-progress tritium-progress--size-${size}`;
  return (
    <AriaProgressBar
      {...props}
      className={composeRenderProps(className, (className) =>
        className ? `${base} ${className}` : base,
      )}
    >
      {({ percentage, valueText, isIndeterminate }) => (
        <>
          {(label != null || (showValue && !isIndeterminate)) && (
            <div className="tritium-progress__header">
              {label != null && <Label className="tritium-progress__label">{label}</Label>}
              {showValue && !isIndeterminate && (
                <span className="tritium-progress__value">{valueText}</span>
              )}
            </div>
          )}
          <div className="tritium-progress__track">
            <div
              className="tritium-progress__fill"
              style={isIndeterminate ? undefined : { width: `${percentage}%` }}
            />
          </div>
        </>
      )}
    </AriaProgressBar>
  );
}
