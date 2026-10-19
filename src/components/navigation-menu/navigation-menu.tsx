import { useEffect, useRef, useState, type ComponentProps, type ReactNode } from 'react';
import {
  Button as AriaButton,
  DialogTrigger,
  Link as AriaLink,
  composeRenderProps,
} from 'react-aria-components';
import { Popover } from '../popover/popover';
import './navigation-menu.css';

const cx = (base: string, className?: string) => (className ? `${base} ${className}` : base);

export type NavigationMenuProps = ComponentProps<'nav'>;

/**
 * The main navigation of a site: a row of links, some of which open a panel of more links.
 * Renders a `nav` landmark, so give it an `aria-label`. Fill it with `NavigationMenuItem`s.
 *
 * This follows the disclosure navigation pattern: panel buttons toggle with Enter or Space and
 * the links inside are reached with Tab, so it does not use menu roles.
 */
export function NavigationMenu({ className, children, ...props }: NavigationMenuProps) {
  return (
    <nav {...props} className={cx('tritium-navigation-menu', className)}>
      <ul className="tritium-navigation-menu__list">{children}</ul>
    </nav>
  );
}

export function NavigationMenuItem({ className, ...props }: ComponentProps<'li'>) {
  return <li {...props} className={cx('tritium-navigation-menu__item', className)} />;
}

export type NavigationMenuLinkProps = Omit<ComponentProps<typeof AriaLink>, 'className'> & {
  /** Marks the current page. */
  isActive?: boolean;
  className?: string;
};

/** A link in the bar or inside a panel. Pass `href`. */
export function NavigationMenuLink({ isActive, className, ...props }: NavigationMenuLinkProps) {
  return (
    <AriaLink
      {...props}
      data-active={isActive || undefined}
      aria-current={isActive ? 'page' : undefined}
      className={composeRenderProps(className, (className) => cx('tritium-navigation-menu__link', className))}
    />
  );
}

export type NavigationMenuTriggerProps = {
  /** The text of the button that opens the panel. */
  label: ReactNode;
  /** The panel's content, usually `NavigationMenuLink`s or a grid of them. */
  children: ReactNode;
  /** Opens on pointer hover as well as on press. */
  openOnHover?: boolean;
  className?: string;
};

// A single task, not a visible delay. It lets the panel's mouseenter cancel the close when the
// pointer moves from the button onto the panel, whose gap is bridged in CSS.
const HOVER_CLOSE_DELAY = 0;

/** A button in the bar that opens a panel of links. */
export function NavigationMenuTrigger({
  label,
  children,
  openOnHover = true,
  className,
}: NavigationMenuTriggerProps) {
  const [isOpen, setOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => () => clearTimeout(closeTimer.current), []);

  const cancelClose = () => clearTimeout(closeTimer.current);
  const scheduleClose = () => {
    cancelClose();
    closeTimer.current = setTimeout(() => setOpen(false), HOVER_CLOSE_DELAY);
  };

  return (
    <DialogTrigger isOpen={isOpen} onOpenChange={setOpen}>
      <AriaButton
        className={composeRenderProps(className, (className) => cx('tritium-navigation-menu__trigger', className))}
        onHoverStart={() => {
          if (!openOnHover) return;
          cancelClose();
          setOpen(true);
        }}
        onHoverEnd={() => openOnHover && scheduleClose()}
      >
        {label}
        <svg
          className="tritium-navigation-menu__chevron"
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          aria-hidden="true"
        >
          <path d="m4 6 4 4 4-4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </AriaButton>
      <Popover
        placement="bottom start"
        offset={6}
        // A modal popover puts an underlay over the page, which steals the hover from the trigger
        // and makes a hover-opened panel close and reopen in a loop.
        isNonModal
        aria-label={typeof label === 'string' ? label : undefined}
        className="tritium-navigation-menu__popover"
      >
        <div
          className="tritium-navigation-menu__panel"
          onMouseEnter={cancelClose}
          onMouseLeave={() => openOnHover && scheduleClose()}
        >
          {children}
        </div>
      </Popover>
    </DialogTrigger>
  );
}

export type NavigationMenuLinkCardProps = Omit<NavigationMenuLinkProps, 'children'> & {
  title: ReactNode;
  children?: ReactNode;
};

/** A link with a title and a short description, for use inside a panel. */
export function NavigationMenuLinkCard({ title, children, className, ...props }: NavigationMenuLinkCardProps) {
  return (
    <NavigationMenuLink {...props} className={cx('tritium-navigation-menu__card', className)}>
      <span className="tritium-navigation-menu__card-title">{title}</span>
      {children != null && <span className="tritium-navigation-menu__card-description">{children}</span>}
    </NavigationMenuLink>
  );
}
