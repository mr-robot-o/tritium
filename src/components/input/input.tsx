import type { ComponentPropsWithRef, MouseEvent, ReactNode } from 'react';
import { Input as AriaInput, composeRenderProps } from 'react-aria-components';
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

// Clicking the padding or a non-interactive start or end content should focus the input,
// the way clicking inside a plain input does.
function focusInput(event: MouseEvent<HTMLDivElement>) {
  const target = event.target as HTMLElement;
  if (target instanceof HTMLInputElement || target.closest('button, a, [role="button"]')) return;
  event.preventDefault();
  event.currentTarget.querySelector('input')?.focus();
}

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
  const hasContent = startContent != null || endContent != null;
  const base = [
    'tritium-input',
    `tritium-input--size-${size}`,
    hasContent && 'tritium-input--grouped',
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
