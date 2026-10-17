import {
  Menu,
  MenuTrigger,
  Popover,
  type MenuProps,
  type MenuTriggerProps,
  type PopoverProps,
} from 'react-aria-components';
import '../_shared/popover.css';
import '../menu/menu.css';

/**
 * Wraps the trigger and the `DropdownMenuContent`. Any pressable element, such as a `Button`, can
 * be the trigger.
 */
export function DropdownMenu(props: MenuTriggerProps) {
  return <MenuTrigger {...props} />;
}

export type DropdownMenuContentProps<T extends object> = MenuProps<T> & {
  /** Where the menu opens relative to its trigger. It flips when there is no room. */
  placement?: PopoverProps['placement'];
};

/** The list of actions. Fill it with `MenuItem`, `MenuSection` and `MenuSeparator`. */
export function DropdownMenuContent<T extends object>({
  className,
  placement = 'bottom start',
  ...props
}: DropdownMenuContentProps<T>) {
  return (
    <Popover placement={placement} offset={4} className="tritium-popover tritium-popover--menu">
      <Menu
        {...props}
        className={
          typeof className === 'function'
            ? (renderProps) => `tritium-list-box tritium-menu ${className(renderProps)}`
            : className
              ? `tritium-list-box tritium-menu ${className}`
              : 'tritium-list-box tritium-menu'
        }
      />
    </Popover>
  );
}
