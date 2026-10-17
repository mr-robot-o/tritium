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
import { Input, type InputSize } from '../input/input';
import '../_shared/field.css';

export type TextFieldProps = Omit<AriaTextFieldProps, 'children'> & {
  /** The visible label. Without one, pass an `aria-label`. */
  label?: ReactNode;
  /** Help text shown below the input. */
  description?: ReactNode;
  /** Shown below the input when it is invalid. A function receives the validation result. */
  errorMessage?: ReactNode | ((validation: ValidationResult) => ReactNode);
  placeholder?: string;
  size?: InputSize;
  startContent?: ReactNode;
  endContent?: ReactNode;
};

export function TextField({
  className,
  label,
  description,
  errorMessage,
  placeholder,
  size,
  startContent,
  endContent,
  ...props
}: TextFieldProps) {
  return (
    <AriaTextField
      {...props}
      className={composeRenderProps(className, (className) =>
        className ? `tritium-field ${className}` : 'tritium-field',
      )}
    >
      {label != null && <Label className="tritium-field__label">{label}</Label>}
      <Input
        placeholder={placeholder}
        size={size}
        startContent={startContent}
        endContent={endContent}
      />
      {description != null && (
        <Text slot="description" className="tritium-field__description">
          {description}
        </Text>
      )}
      <FieldError className="tritium-field__error">{errorMessage}</FieldError>
    </AriaTextField>
  );
}
