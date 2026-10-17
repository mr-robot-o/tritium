import type { ComponentProps, ReactNode } from 'react';
import {
  FieldError,
  Label,
  Radio as AriaRadio,
  RadioGroup as AriaRadioGroup,
  Text,
  composeRenderProps,
  type RadioGroupProps as AriaRadioGroupProps,
  type ValidationResult,
} from 'react-aria-components';
import '../_shared/field.css';
import './radio-group.css';

export type RadioGroupProps = AriaRadioGroupProps & {
  /** The visible label. Without one, pass an `aria-label`. */
  label?: ReactNode;
  /** Help text shown below the options. */
  description?: ReactNode;
  /** Shown below the options when the group is invalid. A function receives the validation result. */
  errorMessage?: ReactNode | ((validation: ValidationResult) => ReactNode);
};

export function RadioGroup({
  className,
  children,
  label,
  description,
  errorMessage,
  ...props
}: RadioGroupProps) {
  return (
    <AriaRadioGroup
      {...props}
      className={composeRenderProps(className, (className) =>
        className
          ? `tritium-field tritium-radio-group ${className}`
          : 'tritium-field tritium-radio-group',
      )}
    >
      {composeRenderProps(children, (children) => (
        <>
          {label != null && <Label className="tritium-field__label">{label}</Label>}
          <div className="tritium-radio-group__items">{children}</div>
          {description != null && (
            <Text slot="description" className="tritium-field__description">
              {description}
            </Text>
          )}
          <FieldError className="tritium-field__error">{errorMessage}</FieldError>
        </>
      ))}
    </AriaRadioGroup>
  );
}

export type RadioProps = ComponentProps<typeof AriaRadio>;

export function Radio({ className, children, ...props }: RadioProps) {
  return (
    <AriaRadio
      {...props}
      children={composeRenderProps(children, (children) => (
        <>
          <span className="tritium-radio__control" aria-hidden="true" />
          {children != null && <span className="tritium-radio__label">{children}</span>}
        </>
      ))}
      className={composeRenderProps(className, (className) =>
        className ? `tritium-radio ${className}` : 'tritium-radio',
      )}
    />
  );
}
