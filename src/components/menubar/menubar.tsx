import {
  useContext,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type ComponentProps,
  type ReactNode,
} from 'react';
import { Button as AriaButton, Toolbar, composeRenderProps } from 'react-aria-components';
import { DropdownMenu, DropdownMenuContent, type DropdownMenuContentProps } from '../dropdown-menu/dropdown-menu';
import { MenubarContext } from './menubar-context';
import './menubar.css';

const cx = (base: string, className?: string) => (className ? `${base} ${className}` : base);

const TRIGGER_SELECTOR = '[data-tritium-menubar-trigger]';

export type MenubarProps = Omit<ComponentProps<typeof Toolbar>, 'orientation'>;

/**
 * A horizontal row of menus, such as File, Edit and View. Arrow keys move between the menu
 * buttons; once one menu is open, hovering another or pressing Left or Right switches to it. Give
 * it an `aria-label`, and fill it with `MenubarMenu`.
 *
 * It is built on the React Aria `Toolbar`, so it is announced as a toolbar of menu buttons rather
 * than an ARIA `menubar`.
 */
export function Menubar({ className, ...props }: MenubarProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [openId, setOpenId] = useState<string | null>(null);
  const value = useMemo(() => ({ rootRef, openId, setOpenId }), [openId]);
  return (
    <MenubarContext.Provider value={value}>
      <Toolbar
        {...props}
        ref={rootRef}
        orientation="horizontal"
        className={composeRenderProps(className, (className) => cx('tritium-menubar', className))}
      />
    </MenubarContext.Provider>
  );
}

export type MenubarMenuProps<T extends object> = Omit<DropdownMenuContentProps<T>, 'children'> & {
  /** The text of the button that opens the menu. */
  label: ReactNode;
  /** `MenuItem`s, `MenuSection`s and `MenuSeparator`s. */
  children?: ReactNode;
};

/** One menu in a `Menubar`. Its `children` are the same items a `DropdownMenuContent` takes. */
export function MenubarMenu<T extends object>({ label, children, ...menuProps }: MenubarMenuProps<T>) {
  const context = useContext(MenubarContext);
  if (!context) throw new Error('<MenubarMenu> must be used inside a <Menubar>.');
  const { rootRef, openId, setOpenId } = context;
  const id = useId();
  const isOpen = openId === id;

  // While a menu is open, Left and Right switch to the neighboring menu, unless the key belongs
  // to a submenu (Right opens one, Left closes it).
  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
      const target = event.target as HTMLElement | null;
      const menu = target?.closest('[role="menu"]');
      if (!menu) return;
      // A root menu is labelled by its menubar button; a submenu by the item that opened it.
      const labelledBy = menu.getAttribute('aria-labelledby');
      const label = labelledBy ? document.getElementById(labelledBy) : null;
      const inSubmenu = !label?.hasAttribute('data-tritium-menubar-trigger');
      const opensSubmenu = event.key === 'ArrowRight' && target?.getAttribute('aria-haspopup') === 'menu';
      if (inSubmenu || opensSubmenu) return;
      const triggers = Array.from(rootRef.current?.querySelectorAll<HTMLElement>(TRIGGER_SELECTOR) ?? []);
      const index = triggers.findIndex((trigger) => trigger.dataset.tritiumMenubarTrigger === id);
      if (index < 0 || triggers.length < 2) return;
      const step = event.key === 'ArrowRight' ? 1 : -1;
      const next = triggers[(index + step + triggers.length) % triggers.length];
      event.preventDefault();
      event.stopPropagation();
      setOpenId(next.dataset.tritiumMenubarTrigger ?? null);
      next.focus();
    };
    document.addEventListener('keydown', onKeyDown, true);
    return () => document.removeEventListener('keydown', onKeyDown, true);
  }, [isOpen, id, rootRef, setOpenId]);

  return (
    <DropdownMenu isOpen={isOpen} onOpenChange={(open) => setOpenId(open ? id : openId === id ? null : openId)}>
      <AriaButton
        data-tritium-menubar-trigger={id}
        className="tritium-menubar__trigger"
        // With a menu already open, moving over another menu button switches to it.
        onHoverStart={() => {
          if (openId !== null && openId !== id) setOpenId(id);
        }}
      >
        {label}
      </AriaButton>
      <DropdownMenuContent {...(menuProps as DropdownMenuContentProps<T>)}>{children}</DropdownMenuContent>
    </DropdownMenu>
  );
}
