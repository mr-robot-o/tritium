import type { ComponentProps, ReactNode } from 'react';
import {
  Button as AriaButton,
  Disclosure,
  DisclosureGroup,
  DisclosurePanel,
  Heading,
  composeRenderProps,
} from 'react-aria-components';
import './accordion.css';

export type AccordionProps = ComponentProps<typeof DisclosureGroup>;

/** A stack of expandable sections. Set `allowsMultipleExpanded` to let several be open at once. */
export function Accordion({ className, ...props }: AccordionProps) {
  return (
    <DisclosureGroup
      {...props}
      className={composeRenderProps(className, (className) =>
        className ? `tritium-accordion ${className}` : 'tritium-accordion',
      )}
    />
  );
}

export type AccordionItemProps = Omit<ComponentProps<typeof Disclosure>, 'children'> & {
  /** The text of the header button. */
  title: ReactNode;
  /** The panel content. */
  children?: ReactNode;
  /** Heading level of the header, so it fits the page outline. */
  headingLevel?: 2 | 3 | 4 | 5 | 6;
};

export function AccordionItem({
  className,
  title,
  children,
  headingLevel = 3,
  ...props
}: AccordionItemProps) {
  return (
    <Disclosure
      {...props}
      className={composeRenderProps(className, (className) =>
        className ? `tritium-accordion__item ${className}` : 'tritium-accordion__item',
      )}
    >
      <Heading level={headingLevel} className="tritium-accordion__heading">
        <AriaButton slot="trigger" className="tritium-accordion__trigger">
          <span className="tritium-accordion__title">{title}</span>
          <svg
            className="tritium-accordion__chevron"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            aria-hidden="true"
          >
            <path d="M4 6l4 4 4-4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </AriaButton>
      </Heading>
      <DisclosurePanel className="tritium-accordion__panel">
        <div className="tritium-accordion__content">{children}</div>
      </DisclosurePanel>
    </Disclosure>
  );
}
