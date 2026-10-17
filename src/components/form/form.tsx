import type { ComponentProps } from 'react';
import { Form as AriaForm } from 'react-aria-components';
import './form.css';

export type FormProps = ComponentProps<typeof AriaForm>;

export function Form({ className, ...props }: FormProps) {
  return <AriaForm {...props} className={className ? `tritium-form ${className}` : 'tritium-form'} />;
}
