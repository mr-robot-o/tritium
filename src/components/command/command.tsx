import { useEffect, useState, type ComponentProps, type Key, type ReactNode } from 'react';
import {
  Autocomplete,
  Input as AriaInput,
  Menu as AriaMenu,
  SearchField,
  useFilter,
} from 'react-aria-components';
import { ModalDialog } from '../_shared/modal-dialog';
import { MenuItem, MenuSection, MenuSeparator } from '../menu/menu';
import '../_shared/list-box.css';
import '../menu/menu.css';
import './command.css';

function SearchIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <circle cx="7" cy="7" r="4.5" />
      <path d="m10.5 10.5 3 3" strokeLinecap="round" />
    </svg>
  );
}

export type CommandProps = Omit<ComponentProps<'div'>, 'onSelect' | 'children'> & {
  /** Names the list for screen readers. */
  'aria-label': string;
  /** Hint shown in the empty search field. */
  placeholder?: string;
  /** Shown when no item matches the search. */
  emptyMessage?: ReactNode;
  /** Called with the key of the item that was chosen, by click or by Enter. */
  onAction?: (key: Key) => void;
  /** Items, groups and separators. */
  children?: ReactNode;
};

/**
 * A search field over a filterable list of actions. Typing narrows the items; arrow keys move
 * through them while the focus stays in the field. Fill it with `CommandItem`, `CommandGroup` and
 * `CommandSeparator`.
 */
export function Command({
  className,
  placeholder = 'Type a command or search…',
  emptyMessage = 'No results found.',
  onAction,
  children,
  'aria-label': ariaLabel,
  ...props
}: CommandProps) {
  const { contains } = useFilter({ sensitivity: 'base' });
  return (
    <div {...props} className={className ? `tritium-command ${className}` : 'tritium-command'}>
      <Autocomplete filter={contains}>
        <SearchField aria-label={ariaLabel} className="tritium-command__search" autoFocus>
          <SearchIcon />
          <AriaInput placeholder={placeholder} className="tritium-command__input" />
        </SearchField>
        <AriaMenu
          aria-label={ariaLabel}
          onAction={onAction}
          renderEmptyState={() => <div className="tritium-command__empty">{emptyMessage}</div>}
          className="tritium-list-box tritium-menu tritium-command__list"
        >
          {children}
        </AriaMenu>
      </Autocomplete>
    </div>
  );
}

export type CommandDialogProps = Omit<CommandProps, 'className'> & {
  isOpen?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (isOpen: boolean) => void;
  /**
   * Key that opens the palette together with Cmd (macOS) or Ctrl. Pass `null` to turn the
   * shortcut off.
   */
  shortcut?: string | null;
};

/** A `Command` in a modal, opened with Cmd/Ctrl + K. Closes after an item is chosen. */
export function CommandDialog({
  isOpen,
  defaultOpen = false,
  onOpenChange,
  shortcut = 'k',
  onAction,
  ...props
}: CommandDialogProps) {
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const open = isOpen ?? internalOpen;
  const setOpen = (next: boolean) => {
    if (isOpen === undefined) setInternalOpen(next);
    onOpenChange?.(next);
  };

  useEffect(() => {
    if (!shortcut) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === shortcut.toLowerCase()) {
        event.preventDefault();
        if (isOpen === undefined) setInternalOpen((value) => !value);
        onOpenChange?.(!open);
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [shortcut, isOpen, open, onOpenChange]);

  return (
    <ModalDialog
      placement="center"
      isOpen={open}
      onOpenChange={setOpen}
      aria-label={props['aria-label']}
      className="tritium-command-dialog"
    >
      <Command
        {...props}
        onAction={(key) => {
          onAction?.(key);
          setOpen(false);
        }}
      />
    </ModalDialog>
  );
}

export const CommandItem = MenuItem;
export const CommandGroup = MenuSection;
export const CommandSeparator = MenuSeparator;

