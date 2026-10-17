import type { ComponentProps, ReactNode } from 'react';
import {
  Header,
  MenuItem as AriaMenuItem,
  MenuSection as AriaMenuSection,
  Separator,
  composeRenderProps,
} from 'react-aria-components';
import '../_shared/list-box.css';
import './menu.css';

export type MenuItemProps = ComponentProps<typeof AriaMenuItem> & {
  /** `destructive` colors the item for actions that delete or can't be undone. */
  variant?: 'default' | 'destructive';
  /** Content before the label, usually an icon. */
  startContent?: ReactNode;
  /** A keyboard shortcut hint shown at the end, for example `⌘K`. It is a label only and does not bind the keys. */
  shortcut?: string;
};

/** An item in a `DropdownMenu` or `ContextMenu`. Give it an `onAction`, or an `href` to make it a link. */
export function MenuItem({
  className,
  children,
  textValue,
  variant = 'default',
  startContent,
  shortcut,
  ...props
}: MenuItemProps) {
  const base = `tritium-list-box__item tritium-menu__item tritium-menu__item--${variant}`;
  return (
    <AriaMenuItem
      {...props}
      // React Aria reads typeahead text from plain string children, and ours are wrapped.
      textValue={
        textValue ?? (typeof children === 'string' || typeof children === 'number' ? String(children) : undefined)
      }
      className={composeRenderProps(className, (className) =>
        className ? `${base} ${className}` : base,
      )}
      children={composeRenderProps(children, (children, { isSelected }) => (
        <>
          {startContent != null && <span className="tritium-menu__icon">{startContent}</span>}
          <span className="tritium-menu__label">{children}</span>
          {shortcut != null && <span className="tritium-menu__shortcut">{shortcut}</span>}
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

export type MenuSectionProps = Omit<ComponentProps<typeof AriaMenuSection>, 'children'> & {
  children?: ReactNode;
  /** A heading for the group. Without one, pass an `aria-label`. */
  title?: ReactNode;
};

/** A labelled group of items. */
export function MenuSection({ className, title, children, ...props }: MenuSectionProps) {
  return (
    <AriaMenuSection
      {...props}
      className={className ? `tritium-menu__section ${className}` : 'tritium-menu__section'}
    >
      {title != null && <Header className="tritium-menu__header">{title}</Header>}
      {children}
    </AriaMenuSection>
  );
}

/** A thin line between groups of items. */
export function MenuSeparator() {
  return <Separator className="tritium-menu__separator" />;
}
