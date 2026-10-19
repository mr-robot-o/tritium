import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  useSyncExternalStore,
  type ComponentProps,
  type ReactNode,
} from 'react';
import { Button as AriaButton, Link as AriaLink, Separator, composeRenderProps } from 'react-aria-components';
import { Button, type ButtonProps } from '../button/button';
import { Sheet } from '../sheet/sheet';
import { Tooltip, TooltipTrigger } from '../tooltip/tooltip';
import { SidebarContext, useSidebar } from './sidebar-context';
import './sidebar.css';

const MOBILE_QUERY = '(max-width: 768px)';

function subscribeMobile(onChange: () => void) {
  const query = window.matchMedia(MOBILE_QUERY);
  query.addEventListener('change', onChange);
  return () => query.removeEventListener('change', onChange);
}

const cx = (base: string, className?: string) => (className ? `${base} ${className}` : base);

export type SidebarProviderProps = ComponentProps<'div'> & {
  /** Whether the sidebar starts expanded. */
  defaultOpen?: boolean;
  /** Controlled expanded state. */
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  /**
   * Key that toggles the sidebar together with Cmd (macOS) or Ctrl. Pass `null` to turn the
   * shortcut off.
   */
  shortcut?: string | null;
};

/** Holds the sidebar's state and lays out the `Sidebar` next to a `SidebarInset`. Wrap the whole page shell in it. */
export function SidebarProvider({
  defaultOpen = true,
  open: openProp,
  onOpenChange,
  shortcut = 'b',
  className,
  ...props
}: SidebarProviderProps) {
  const isMobile = useSyncExternalStore(
    subscribeMobile,
    () => window.matchMedia(MOBILE_QUERY).matches,
    () => false,
  );
  const [openMobile, setOpenMobile] = useState(false);
  const [openState, setOpenState] = useState(defaultOpen);
  const open = openProp ?? openState;

  const setOpen = useCallback(
    (next: boolean) => {
      if (openProp === undefined) setOpenState(next);
      onOpenChange?.(next);
    },
    [openProp, onOpenChange],
  );

  const toggleSidebar = useCallback(() => {
    if (isMobile) setOpenMobile((value) => !value);
    else setOpen(!open);
  }, [isMobile, open, setOpen]);

  useEffect(() => {
    if (!shortcut) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === shortcut.toLowerCase()) {
        event.preventDefault();
        toggleSidebar();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [shortcut, toggleSidebar]);

  const value = useMemo(
    () => ({
      state: open ? ('expanded' as const) : ('collapsed' as const),
      open,
      setOpen,
      isMobile,
      openMobile,
      setOpenMobile,
      toggleSidebar,
    }),
    [open, setOpen, isMobile, openMobile, toggleSidebar],
  );

  return (
    <SidebarContext.Provider value={value}>
      <div {...props} className={cx('tritium-sidebar-wrapper', className)} />
    </SidebarContext.Provider>
  );
}

export type SidebarProps = Omit<ComponentProps<'aside'>, 'children'> & {
  children?: ReactNode;
  /** Which edge the sidebar sits on. */
  side?: 'left' | 'right';
  /**
   * What happens when it collapses: `offcanvas` slides it out of view, `icon` shrinks it to an
   * icon rail, and `none` keeps it always expanded.
   */
  collapsible?: 'offcanvas' | 'icon' | 'none';
  /** Names the navigation landmark and the mobile sheet. */
  'aria-label'?: string;
};

/**
 * The side navigation panel. On small screens it becomes a `Sheet` opened by the
 * `SidebarTrigger`. Fill it with `SidebarHeader`, `SidebarContent` and `SidebarFooter`.
 */
export function Sidebar({
  side = 'left',
  collapsible = 'offcanvas',
  className,
  children,
  'aria-label': ariaLabel = 'Sidebar',
  ...props
}: SidebarProps) {
  const { state, isMobile, openMobile, setOpenMobile } = useSidebar();

  if (isMobile && collapsible !== 'none') {
    return (
      <Sheet side={side} isOpen={openMobile} onOpenChange={setOpenMobile} aria-label={ariaLabel} className="tritium-sidebar__sheet">
        <div className="tritium-sidebar tritium-sidebar--sheet" data-side={side}>
          <div className="tritium-sidebar__inner">{children}</div>
        </div>
      </Sheet>
    );
  }

  return (
    <aside
      aria-label={ariaLabel}
      {...props}
      data-state={collapsible === 'none' ? 'expanded' : state}
      data-collapsible={collapsible}
      data-side={side}
      className={cx('tritium-sidebar', className)}
    >
      <div className="tritium-sidebar__inner">{children}</div>
    </aside>
  );
}

export type SidebarTriggerProps = Omit<ButtonProps, 'isIconOnly' | 'children'>;

/** A button that expands and collapses the sidebar. */
export function SidebarTrigger({ variant = 'ghost', size = 'sm', onPress, ...props }: SidebarTriggerProps) {
  const { toggleSidebar } = useSidebar();
  return (
    <Button
      aria-label="Toggle sidebar"
      {...props}
      variant={variant}
      size={size}
      isIconOnly
      onPress={(event) => {
        onPress?.(event);
        toggleSidebar();
      }}
    >
      <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <rect x="2" y="3" width="12" height="10" rx="2" />
        <path d="M6 3v10" />
      </svg>
    </Button>
  );
}

/** The page content beside the sidebar. Renders a `main` landmark. */
export function SidebarInset({ className, ...props }: ComponentProps<'main'>) {
  return <main {...props} className={cx('tritium-sidebar-inset', className)} />;
}

export function SidebarHeader({ className, ...props }: ComponentProps<'div'>) {
  return <div {...props} className={cx('tritium-sidebar__header', className)} />;
}

/** The scrolling middle of the sidebar, holding the groups. */
export function SidebarContent({ className, ...props }: ComponentProps<'div'>) {
  return <div {...props} className={cx('tritium-sidebar__content', className)} />;
}

export function SidebarFooter({ className, ...props }: ComponentProps<'div'>) {
  return <div {...props} className={cx('tritium-sidebar__footer', className)} />;
}

export function SidebarSeparator({ className, ...props }: ComponentProps<typeof Separator>) {
  return <Separator {...props} className={cx('tritium-sidebar__separator', className)} />;
}

/** A labelled section of menus. Wrap a `SidebarGroupLabel` and a `SidebarMenu` in it. */
export function SidebarGroup({ className, ...props }: ComponentProps<'div'>) {
  return <div role="group" {...props} className={cx('tritium-sidebar__group', className)} />;
}

export function SidebarGroupLabel({ className, ...props }: ComponentProps<'div'>) {
  return <div {...props} className={cx('tritium-sidebar__group-label', className)} />;
}

export function SidebarGroupContent({ className, ...props }: ComponentProps<'div'>) {
  return <div {...props} className={cx('tritium-sidebar__group-content', className)} />;
}

export function SidebarMenu({ className, ...props }: ComponentProps<'ul'>) {
  return <ul {...props} className={cx('tritium-sidebar__menu', className)} />;
}

export function SidebarMenuItem({ className, ...props }: ComponentProps<'li'>) {
  return <li {...props} className={cx('tritium-sidebar__menu-item', className)} />;
}

type MenuButtonCommon = {
  /** Marks the current page. */
  isActive?: boolean;
  /** Icon shown before the label. It stays visible when the sidebar is an icon rail. */
  icon?: ReactNode;
  /** Text for the tooltip shown when the sidebar is collapsed to icons. */
  tooltip?: string;
  size?: 'sm' | 'default' | 'lg';
  isDisabled?: boolean;
  className?: string;
  children?: ReactNode;
};

export type SidebarMenuButtonProps = MenuButtonCommon &
  (
    | ({ href: string } & Omit<ComponentProps<typeof AriaLink>, keyof MenuButtonCommon | 'children' | 'className'>)
    | ({ href?: undefined } & Omit<ComponentProps<typeof AriaButton>, keyof MenuButtonCommon | 'children' | 'className'>)
  );

/** A row in a `SidebarMenu`. Pass `href` to make it a link, or `onPress` for a button. */
export function SidebarMenuButton({
  isActive,
  icon,
  tooltip,
  size = 'default',
  className,
  children,
  ...props
}: SidebarMenuButtonProps) {
  const { state, isMobile } = useSidebar();
  const classes = (extra?: string) =>
    cx(`tritium-sidebar__menu-button tritium-sidebar__menu-button--size-${size}`, extra);
  const content = (
    <>
      {icon != null && <span className="tritium-sidebar__menu-icon">{icon}</span>}
      <span className="tritium-sidebar__menu-label">{children}</span>
    </>
  );

  const control =
    'href' in props && props.href !== undefined ? (
      <AriaLink
        {...(props as ComponentProps<typeof AriaLink>)}
        data-active={isActive || undefined}
        aria-current={isActive ? 'page' : undefined}
        className={composeRenderProps(className, (c) => classes(c))}
      >
        {content}
      </AriaLink>
    ) : (
      <AriaButton
        {...(props as ComponentProps<typeof AriaButton>)}
        data-active={isActive || undefined}
        className={composeRenderProps(className, (c) => classes(c))}
      >
        {content}
      </AriaButton>
    );

  if (!tooltip || isMobile || state !== 'collapsed') return control;
  return (
    <TooltipTrigger>
      {control}
      <Tooltip placement="right">{tooltip}</Tooltip>
    </TooltipTrigger>
  );
}

/** A small count or label at the end of a menu row. */
export function SidebarMenuBadge({ className, ...props }: ComponentProps<'span'>) {
  return <span {...props} className={cx('tritium-sidebar__menu-badge', className)} />;
}

/** A nested list under a menu row. It is hidden while the sidebar is an icon rail. */
export function SidebarMenuSub({ className, ...props }: ComponentProps<'ul'>) {
  return <ul {...props} className={cx('tritium-sidebar__menu-sub', className)} />;
}

export function SidebarMenuSubItem({ className, ...props }: ComponentProps<'li'>) {
  return <li {...props} className={cx('tritium-sidebar__menu-sub-item', className)} />;
}

export type SidebarMenuSubButtonProps = Omit<ComponentProps<typeof AriaLink>, 'className'> & {
  isActive?: boolean;
  className?: string;
};

export function SidebarMenuSubButton({ isActive, className, ...props }: SidebarMenuSubButtonProps) {
  return (
    <AriaLink
      {...props}
      data-active={isActive || undefined}
      aria-current={isActive ? 'page' : undefined}
      className={composeRenderProps(className, (c) => cx('tritium-sidebar__menu-sub-button', c))}
    />
  );
}

