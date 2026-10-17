import type { ComponentPropsWithRef } from 'react';
import type { InputSize } from '../input/input';
import './native-select.css';

export type NativeSelectProps = Omit<ComponentPropsWithRef<'select'>, 'size'> & {
  size?: InputSize;
  /** Disables the select. Same as the native `disabled` attribute. */
  isDisabled?: boolean;
  /** Marks the select as invalid. Same as `aria-invalid`. */
  isInvalid?: boolean;
};

// className and style go on the wrapper, which sets the width; every other prop goes on the <select>.
export function NativeSelect({
  className,
  style,
  size = 'default',
  isDisabled,
  isInvalid,
  ...props
}: NativeSelectProps) {
  const base = `tritium-native-select tritium-native-select--size-${size}`;
  return (
    <span className={className ? `${base} ${className}` : base} style={style}>
      <select
        {...props}
        disabled={props.disabled || isDisabled}
        aria-invalid={props['aria-invalid'] || (isInvalid ? true : undefined)}
        className="tritium-native-select__control"
      />
      <svg
        className="tritium-native-select__chevron"
        viewBox="0 0 16 16"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        aria-hidden="true"
      >
        <path d="M4 6l4 4 4-4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}
