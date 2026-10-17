import type { ReactNode } from 'react';
import {
  Label,
  Meter as AriaMeter,
  composeRenderProps,
  type MeterProps as AriaMeterProps,
} from 'react-aria-components';
import type { ProgressSize } from '../progress/progress';
import '../progress/progress.css';
import './meter.css';

export type MeterVariant = 'default' | 'success' | 'warning' | 'destructive';

// Meter shares Progress's track and fill, so it uses the `tritium-progress` classes too.
export type MeterProps = Omit<AriaMeterProps, 'children'> & {
  /** The visible label. Without one, pass an `aria-label`. */
  label?: ReactNode;
  /** Shows the formatted value next to the label. */
  showValue?: boolean;
  /** Height of the bar. */
  size?: ProgressSize;
  /** The fill color. Meter has no built-in thresholds, so choose the variant from the value yourself. */
  variant?: MeterVariant;
};

export function Meter({
  className,
  label,
  showValue = false,
  size = 'default',
  variant = 'default',
  ...props
}: MeterProps) {
  const base = `tritium-progress tritium-meter tritium-meter--${variant} tritium-progress--size-${size}`;
  return (
    <AriaMeter
      {...props}
      className={composeRenderProps(className, (className) =>
        className ? `${base} ${className}` : base,
      )}
    >
      {({ percentage, valueText }) => (
        <>
          {(label != null || showValue) && (
            <div className="tritium-progress__header">
              {label != null && <Label className="tritium-progress__label">{label}</Label>}
              {showValue && <span className="tritium-progress__value">{valueText}</span>}
            </div>
          )}
          <div className="tritium-progress__track">
            <div className="tritium-progress__fill" style={{ width: `${percentage}%` }} />
          </div>
        </>
      )}
    </AriaMeter>
  );
}
