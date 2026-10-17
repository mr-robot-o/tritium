import type { ReactNode } from 'react';
import {
  ComboBox as AriaComboBox,
  FieldError,
  Label,
  ListBox,
  Popover,
  Text,
  composeRenderProps,
  type ComboBoxProps as AriaComboBoxProps,
  type ValidationResult,
} from 'react-aria-components';
import { Button } from '../button/button';
import { Input, type InputSize } from '../input/input';
import { InputGroup, InputGroupAddon } from '../input-group/input-group';
import { Option, type OptionProps } from '../_shared/option';
import '../_shared/field.css';
import '../_shared/popover.css';
import '../_shared/list-box.css';

export type ComboboxProps<T extends object> = Omit<AriaComboBoxProps<T>, 'children'> & {
  /** The visible label. Without one, pass an `aria-label`. */
  label?: ReactNode;
  /** Help text shown below the input. */
  description?: ReactNode;
  /** Shown below the input when it is invalid. A function receives the validation result. */
  errorMessage?: ReactNode | ((validation: ValidationResult) => ReactNode);
  placeholder?: string;
  /** Height and text size of the input, matching Input. */
  size?: InputSize;
  /** Data to build the options from. Pass a render function as `children` to use it. */
  items?: Iterable<T>;
  /** Shown in the list when nothing matches. */
  emptyState?: ReactNode;
  /** `ComboboxItem`s, or a function that renders one for each of `items`. */
  children?: ReactNode | ((item: T) => ReactNode);
};

export function Combobox<T extends object>({
  className,
  label,
  description,
  errorMessage,
  placeholder,
  size = 'default',
  items,
  emptyState = 'No results.',
  children,
  ...props
}: ComboboxProps<T>) {
  return (
    <AriaComboBox
      {...props}
      className={composeRenderProps(className, (className) =>
        className ? `tritium-field tritium-combobox ${className}` : 'tritium-field tritium-combobox',
      )}
    >
      {label != null && <Label className="tritium-field__label">{label}</Label>}
      <InputGroup size={size}>
        <Input placeholder={placeholder} />
        <InputGroupAddon>
          <Button variant="ghost" size="xs" isIconOnly>
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
              <path d="M4 6l4 4 4-4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Button>
        </InputGroupAddon>
      </InputGroup>
      {description != null && (
        <Text slot="description" className="tritium-field__description">
          {description}
        </Text>
      )}
      <FieldError className="tritium-field__error">{errorMessage}</FieldError>
      <Popover className="tritium-popover">
        <ListBox
          items={items}
          className="tritium-list-box"
          renderEmptyState={() => <div className="tritium-list-box__empty">{emptyState}</div>}
        >
          {children}
        </ListBox>
      </Popover>
    </AriaComboBox>
  );
}

export type ComboboxItemProps = OptionProps;

/** An option in a `Combobox`. Give each an `id`, and a `textValue` if the children are not plain text. */
export function ComboboxItem(props: ComboboxItemProps) {
  return <Option {...props} />;
}
