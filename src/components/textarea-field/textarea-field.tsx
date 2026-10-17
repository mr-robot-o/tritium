import type { ReactNode } from 'react';
import {
  FieldError,
  Label,
  Text,
  TextField as AriaTextField,
  composeRenderProps,
  type TextFieldProps as AriaTextFieldProps,
  type ValidationResult,
} from 'react-aria-components';
import type { InputSize } from '../input/input';
import { Textarea } from '../textarea/textarea';
import '../_shared/field.css';

export type TextareaFieldProps = Omit<AriaTextFieldProps, 'children'> & {
  /** The visible label. Without one, pass an `aria-label`. */
  label?: ReactNode;
  /** Help text shown below the textarea. */
  description?: ReactNode;
  /** Shown below the textarea when it is invalid. A function receives the validation result. */
  errorMessage?: ReactNode | ((validation: ValidationResult) => ReactNode);
  placeholder?: string;
  /** Number of visible text lines. */
  rows?: number;
  size?: InputSize;
};

export function TextareaField({
  className,
  label,
  description,
  errorMessage,
  placeholder,
  rows,
  size,
  ...props
}: TextareaFieldProps) {
  return (
    <AriaTextField
      {...props}
      className={composeRenderProps(className, (className) =>
        className ? `tritium-field ${className}` : 'tritium-field',
      )}
    >
      {label != null && <Label className="tritium-field__label">{label}</Label>}
      <Textarea placeholder={placeholder} rows={rows} size={size} />
      {description != null && (
        <Text slot="description" className="tritium-field__description">
          {description}
        </Text>
      )}
      <FieldError className="tritium-field__error">{errorMessage}</FieldError>
    </AriaTextField>
  );
}
