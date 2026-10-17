import type { ComponentProps } from 'react';
import { Group, composeRenderProps } from 'react-aria-components';
import { focusInput } from '../input/focus-input';
import { InputGroupContext } from '../input/input-group-context';
import type { InputSize } from '../input/input';
import '../input/input.css';

export type InputGroupProps = ComponentProps<typeof Group> & {
  /** Height and text size of the whole group, matching Input. */
  size?: InputSize;
};

/**
 * Draws one field box around an `Input` and any number of `InputGroupAddon`s. Use it when
 * Input's `startContent` and `endContent` are not enough, for example several addons on a side.
 */
export function InputGroup({ className, size = 'default', ...props }: InputGroupProps) {
  const base = `tritium-input-group tritium-input--size-${size}`;
  return (
    <InputGroupContext.Provider value={true}>
      <Group
        onMouseDown={focusInput}
        {...props}
        className={composeRenderProps(className, (className) =>
          className ? `${base} ${className}` : base,
        )}
      />
    </InputGroupContext.Provider>
  );
}

export type InputGroupAddonProps = ComponentProps<'span'>;

/** Text, an icon, a Kbd or a small button next to the input. Place it before or after the `Input`. */
export function InputGroupAddon({ className, ...props }: InputGroupAddonProps) {
  return (
    <span
      {...props}
      className={className ? `tritium-input__content ${className}` : 'tritium-input__content'}
    />
  );
}
