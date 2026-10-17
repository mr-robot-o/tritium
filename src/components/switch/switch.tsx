import type { ComponentProps } from 'react';
import { Switch as AriaSwitch, composeRenderProps } from 'react-aria-components';
import './switch.css';

export type SwitchSize = 'sm' | 'default';

export type SwitchProps = ComponentProps<typeof AriaSwitch> & {
  size?: SwitchSize;
};

export function Switch({ className, children, size = 'default', ...props }: SwitchProps) {
  const base = `tritium-switch tritium-switch--size-${size}`;
  return (
    <AriaSwitch
      {...props}
      children={composeRenderProps(children, (children) => (
        <>
          <span className="tritium-switch__track" aria-hidden="true">
            <span className="tritium-switch__thumb" />
          </span>
          {children != null && <span className="tritium-switch__label">{children}</span>}
        </>
      ))}
      className={composeRenderProps(className, (className) =>
        className ? `${base} ${className}` : base,
      )}
    />
  );
}
