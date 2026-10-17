import type { ComponentProps } from 'react';
import { ListBoxItem, composeRenderProps } from 'react-aria-components';
import './list-box.css';

export type OptionProps = ComponentProps<typeof ListBoxItem>;

// One option in a Select or Combobox list. React Aria reads the text of an option from plain
// string children, but we wrap the children in a render function, so it can't see them. Without a
// text value the Combobox can't filter or show the chosen option in its input, so take it from
// the children when they are text. Otherwise the caller must pass `textValue`.
export function Option({ className, children, textValue, ...props }: OptionProps) {
  return (
    <ListBoxItem
      {...props}
      textValue={
        textValue ?? (typeof children === 'string' || typeof children === 'number' ? String(children) : undefined)
      }
      className={composeRenderProps(className, (className) =>
        className ? `tritium-list-box__item ${className}` : 'tritium-list-box__item',
      )}
      children={composeRenderProps(children, (children, { isSelected }) => (
        <>
          <span className="tritium-list-box__item-text">{children}</span>
          {isSelected && (
            <svg
              className="tritium-list-box__item-check"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              aria-hidden="true"
            >
              <path d="M3.5 8.5l3 3 6-7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
        </>
      ))}
    />
  );
}
