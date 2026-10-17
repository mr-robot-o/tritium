import { useContext, type ComponentPropsWithRef, type ReactNode } from 'react';
import { Input as AriaInput, composeRenderProps } from 'react-aria-components';
import { focusInput } from './focus-input';
import { InputGroupContext } from './input-group-context';
import './input.css';

export type InputSize = 'sm' | 'default' | 'lg';

// React 19 treats `ref` as a regular prop, so ComponentPropsWithRef carries the
// HTMLInputElement ref through. AriaInput still reads TextField's InputContext.
// The native numeric `size` attribute is replaced by the design `size` below.
export type InputProps = Omit<ComponentPropsWithRef<typeof AriaInput>, 'size'> & {
  size?: InputSize;
  /** Disables the input. Same as the native `disabled` attribute. */
  isDisabled?: boolean;
  /** Makes the input read-only. Same as the native `readOnly` attribute. */
  isReadOnly?: boolean;
  /** Marks the input as invalid. Same as `aria-invalid`. Inside a `TextField`, set it on the field. */
  isInvalid?: boolean;
  /** Content shown inside the field, before the text. Icons, text or a button. */
  startContent?: ReactNode;
  /** Content shown inside the field, after the text. Icons, text or a button. */
  endContent?: ReactNode;
};

export function Input({
  className,
  size = 'default',
  isDisabled,
  isReadOnly,
  isInvalid,
  startContent,
  endContent,
  ...props
}: InputProps) {
  // Inside an InputGroup the group draws the box, so the input is always the bare, grouped kind.
  const inGroup = useContext(InputGroupContext);
  const hasContent = startContent != null || endContent != null;
  const base = [
    'tritium-input',
    `tritium-input--size-${size}`,
    (hasContent || inGroup) && 'tritium-input--grouped',
  ]
    .filter(Boolean)
    .join(' ');

  const input = (
    <AriaInput
      {...props}
      disabled={props.disabled || isDisabled}
      readOnly={props.readOnly || isReadOnly}
      aria-invalid={props['aria-invalid'] || (isInvalid ? true : undefined)}
      className={composeRenderProps(className, (className) =>
        className ? `${base} ${className}` : base,
      )}
    />
  );

  if (!hasContent) return input;

  // The group draws the border, background and focus ring so the start and end content sit inside them.
  return (
    <div className={`tritium-input-group tritium-input--size-${size}`} onMouseDown={focusInput}>
      {startContent != null && (
        <span className="tritium-input__content">{startContent}</span>
      )}
      {input}
      {endContent != null && <span className="tritium-input__content">{endContent}</span>}
    </div>
  );
}
