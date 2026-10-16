import type { ComponentPropsWithRef } from 'react';
import { Input as AriaInput, composeRenderProps } from 'react-aria-components';
import './input.css';

// React 19 treats `ref` as a regular prop, so ComponentPropsWithRef carries the
// HTMLInputElement ref through. AriaInput still reads TextField's InputContext.
export type InputProps = ComponentPropsWithRef<typeof AriaInput>;

export function Input({ className, ...props }: InputProps) {
  return (
    <AriaInput
      {...props}
      className={composeRenderProps(className, (className) =>
        className ? `tritium-input ${className}` : 'tritium-input',
      )}
    />
  );
}
