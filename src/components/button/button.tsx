import type { ComponentProps } from 'react';
import { Button as AriaButton, composeRenderProps } from 'react-aria-components';
import './button.css';

export type ButtonProps = ComponentProps<typeof AriaButton>;

export function Button({ className, ...props }: ButtonProps) {
  return (
    <AriaButton
      {...props}
      className={composeRenderProps(className, (className) =>
        className ? `button ${className}` : 'button',
      )}
    />
  );
}
