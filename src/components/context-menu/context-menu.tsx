import { useRef, useState, type ComponentProps, type MouseEvent, type ReactNode } from 'react';
import { Menu, Popover } from 'react-aria-components';
import '../_shared/popover.css';
import '../menu/menu.css';

export type ContextMenuProps = ComponentProps<'div'> & {
  /** The items: `MenuItem`, `MenuSection` and `MenuSeparator`. */
  menu: ReactNode;
  /** Names the menu for screen readers. */
  menuLabel?: string;
  /** Called with the key of the item that was activated. */
  onAction?: (key: React.Key) => void;
};

/**
 * Opens a menu at the pointer when the user right-clicks (or presses the context menu key on)
 * the wrapped content. The browser's own menu is replaced only inside this area. Because it is
 * hidden until used, always offer the same actions somewhere visible too.
 */
export function ContextMenu({
  children,
  menu,
  menuLabel = 'Context menu',
  onAction,
  onContextMenu,
  className,
  ...props
}: ContextMenuProps) {
  const [point, setPoint] = useState<{ x: number; y: number } | null>(null);
  // A zero-size element at the pointer gives the popover something to anchor to.
  const anchorRef = useRef<HTMLSpanElement>(null);

  const open = (event: MouseEvent<HTMLDivElement>) => {
    onContextMenu?.(event);
    if (event.defaultPrevented) return;
    event.preventDefault();
    setPoint({ x: event.clientX, y: event.clientY });
  };

  return (
    <div
      {...props}
      onContextMenu={open}
      className={className ? `tritium-context-menu ${className}` : 'tritium-context-menu'}
    >
      {children}
      <span
        ref={anchorRef}
        aria-hidden="true"
        style={{
          position: 'fixed',
          left: point?.x ?? 0,
          top: point?.y ?? 0,
          width: 0,
          height: 0,
          pointerEvents: 'none',
        }}
      />
      <Popover
        triggerRef={anchorRef}
        isOpen={point != null}
        onOpenChange={(isOpen) => {
          if (!isOpen) setPoint(null);
        }}
        placement="bottom start"
        offset={0}
        className="tritium-popover tritium-popover--menu"
      >
        <Menu
          aria-label={menuLabel}
          autoFocus="first"
          onAction={onAction}
          onClose={() => setPoint(null)}
          className="tritium-list-box tritium-menu"
        >
          {menu}
        </Menu>
      </Popover>
    </div>
  );
}
