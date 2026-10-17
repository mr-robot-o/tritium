import type { ComponentPropsWithRef } from 'react';
import { TextArea as AriaTextArea, composeRenderProps } from 'react-aria-components';
import type { InputSize } from '../input/input';
import '../input/input.css';
import './textarea.css';

// Textarea reuses the Input look (colors, borders, states, sizes), so it shares input.css
// and its `tritium-input` classes. textarea.css only adds what a multi-line field needs.
export type TextareaProps = ComponentPropsWithRef<typeof AriaTextArea> & {
  size?: InputSize;
  /** Disables the textarea. Same as the native `disabled` attribute. */
  isDisabled?: boolean;
  /** Makes the textarea read-only. Same as the native `readOnly` attribute. */
  isReadOnly?: boolean;
  /** Marks the textarea as invalid. Same as `aria-invalid`. Inside a `TextareaField`, set it on the field. */
  isInvalid?: boolean;
};

export function Textarea({
  className,
  size = 'default',
  isDisabled,
  isReadOnly,
  isInvalid,
  ...props
}: TextareaProps) {
  const base = `tritium-input tritium-textarea tritium-input--size-${size}`;
  return (
    <AriaTextArea
      {...props}
      disabled={props.disabled || isDisabled}
      readOnly={props.readOnly || isReadOnly}
      aria-invalid={props['aria-invalid'] || (isInvalid ? true : undefined)}
      className={composeRenderProps(className, (className) =>
        className ? `${base} ${className}` : base,
      )}
    />
  );
}
