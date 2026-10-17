import type { ComponentProps } from 'react';
import {
  FieldError as AriaFieldError,
  Text,
  type FieldErrorProps as AriaFieldErrorProps,
} from 'react-aria-components';
import '../_shared/field.css';
import './field.css';

const cx = (base: string, className?: string) => (className ? `${base} ${className}` : base);

export type FieldProps = ComponentProps<'div'> & {
  /** `horizontal` puts the control and its text side by side, for example a Checkbox or Switch. */
  orientation?: 'vertical' | 'horizontal';
};

/** Lays out a control with its label, description and error. Pair it with `Label`, `FieldDescription` and `FieldError`. */
export function Field({ className, orientation = 'vertical', ...props }: FieldProps) {
  return (
    <div
      {...props}
      className={cx(`tritium-field tritium-field--${orientation}`, className)}
    />
  );
}

/** Stacks several fields with consistent spacing. */
export function FieldGroup({ className, ...props }: ComponentProps<'div'>) {
  return <div {...props} className={cx('tritium-field-group', className)} />;
}

/** A semantic group of related fields. Name it with a `FieldLegend`. */
export function FieldSet({ className, ...props }: ComponentProps<'fieldset'>) {
  return <fieldset {...props} className={cx('tritium-field-set', className)} />;
}

export function FieldLegend({ className, ...props }: ComponentProps<'legend'>) {
  return <legend {...props} className={cx('tritium-field-set__legend', className)} />;
}

export function FieldDescription({ className, ...props }: ComponentProps<typeof Text>) {
  return <Text slot="description" {...props} className={cx('tritium-field__description', className)} />;
}

export function FieldError({ className, ...props }: AriaFieldErrorProps) {
  return (
    <AriaFieldError
      {...props}
      className={
        typeof className === 'function'
          ? (renderProps) => cx('tritium-field__error', className(renderProps))
          : cx('tritium-field__error', className)
      }
    />
  );
}
