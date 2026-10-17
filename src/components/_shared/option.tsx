import type { ComponentProps } from 'react';
import { ListBoxItem, composeRenderProps } from 'react-aria-components';
import './list-box.css';

export type OptionProps = ComponentProps<typeof ListBoxItem>;

// One option in a Select or Combobox list. `textValue` is needed when the children are
// not plain text, so typeahead and the selected value can still read it.
export function Option({ className, children, ...props }: OptionProps) {
  return (
    <ListBoxItem
      {...props}
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
