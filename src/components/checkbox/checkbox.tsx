import type { ComponentProps } from 'react';
import { Checkbox as AriaCheckbox, composeRenderProps } from 'react-aria-components';
import './checkbox.css';

export type CheckboxProps = ComponentProps<typeof AriaCheckbox>;

export function Checkbox({ className, children, ...props }: CheckboxProps) {
  return (
    <AriaCheckbox
      {...props}
      children={composeRenderProps(children, (children, { isSelected, isIndeterminate }) => (
        <>
          <span className="tritium-checkbox__box" aria-hidden="true">
            {isIndeterminate ? (
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 8h8" strokeLinecap="round" />
              </svg>
            ) : isSelected ? (
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3.5 8.5l3 3 6-7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            ) : null}
          </span>
          {children != null && <span className="tritium-checkbox__label">{children}</span>}
        </>
      ))}
      className={composeRenderProps(className, (className) =>
        className ? `tritium-checkbox ${className}` : 'tritium-checkbox',
      )}
    />
  );
}
