import type { ComponentProps, ReactNode } from 'react';
import {
  Breadcrumb as AriaBreadcrumb,
  Breadcrumbs as AriaBreadcrumbs,
  composeRenderProps,
} from 'react-aria-components';
import { Link } from '../link/link';
import './breadcrumb.css';

export type BreadcrumbsProps<T extends object> = ComponentProps<typeof AriaBreadcrumbs<T>>;

/** The trail. The last `Breadcrumb` is treated as the current page. Give it an `aria-label`, for example "Breadcrumbs". */
export function Breadcrumbs<T extends object>({ className, ...props }: BreadcrumbsProps<T>) {
  return (
    <AriaBreadcrumbs
      {...props}
      className={className ? `tritium-breadcrumbs ${className}` : 'tritium-breadcrumbs'}
    />
  );
}

export type BreadcrumbProps = Omit<ComponentProps<typeof AriaBreadcrumb>, 'children'> & {
  /** Where the crumb links to. The current (last) crumb is not a link. */
  href?: string;
  children?: ReactNode;
};

export function Breadcrumb({ className, href, children, ...props }: BreadcrumbProps) {
  return (
    <AriaBreadcrumb
      {...props}
      className={composeRenderProps(className, (className) =>
        className ? `tritium-breadcrumb ${className}` : 'tritium-breadcrumb',
      )}
    >
      <Link variant="muted" href={href}>
        {children}
      </Link>
    </AriaBreadcrumb>
  );
}
