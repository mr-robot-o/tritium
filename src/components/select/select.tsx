import type { ReactNode } from 'react';
import {
  Button as AriaButton,
  FieldError,
  Label,
  ListBox,
  Popover,
  Select as AriaSelect,
  SelectValue,
  Text,
  composeRenderProps,
  type SelectProps as AriaSelectProps,
  type ValidationResult,
} from 'react-aria-components';
import type { InputSize } from '../input/input';
import { Option, type OptionProps } from '../_shared/option';
import '../_shared/field.css';
import '../_shared/popover.css';
import '../_shared/list-box.css';
import './select.css';

export type SelectProps<T extends object> = Omit<AriaSelectProps<T>, 'children'> & {
  /** The visible label. Without one, pass an `aria-label`. */
  label?: ReactNode;
  /** Help text shown below the trigger. */
  description?: ReactNode;
  /** Shown below the trigger when it is invalid. A function receives the validation result. */
  errorMessage?: ReactNode | ((validation: ValidationResult) => ReactNode);
  /** Height and text size of the trigger, matching Input. */
  size?: InputSize;
  /** Data to build the options from. Pass a render function as `children` to use it. */
  items?: Iterable<T>;
  /** `SelectItem`s, or a function that renders one for each of `items`. */
  children?: ReactNode | ((item: T) => ReactNode);
};

export function Select<T extends object>({
  className,
  label,
  description,
  errorMessage,
  size = 'default',
  items,
  children,
  ...props
}: SelectProps<T>) {
  const base = `tritium-field tritium-select tritium-select--size-${size}`;
  return (
    <AriaSelect
      {...props}
      className={composeRenderProps(className, (className) =>
        className ? `${base} ${className}` : base,
      )}
    >
      {label != null && <Label className="tritium-field__label">{label}</Label>}
      <AriaButton className="tritium-select__trigger">
        <SelectValue className="tritium-select__value" />
        <svg
          className="tritium-select__chevron"
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          aria-hidden="true"
        >
          <path d="M4 6l4 4 4-4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </AriaButton>
      {description != null && (
        <Text slot="description" className="tritium-field__description">
          {description}
        </Text>
      )}
      <FieldError className="tritium-field__error">{errorMessage}</FieldError>
      <Popover className="tritium-popover">
        <ListBox items={items} className="tritium-list-box">
          {children}
        </ListBox>
      </Popover>
    </AriaSelect>
  );
}

export type SelectItemProps = OptionProps;

/** An option in a `Select`. Give each an `id`, and a `textValue` if the children are not plain text. */
export function SelectItem(props: SelectItemProps) {
  return <Option {...props} />;
}
