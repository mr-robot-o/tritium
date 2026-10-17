import type { ComponentProps } from 'react';
import {
  Tab as AriaTab,
  TabList as AriaTabList,
  TabPanel as AriaTabPanel,
  Tabs as AriaTabs,
  composeRenderProps,
} from 'react-aria-components';
import './tabs.css';

export type TabsVariant = 'default' | 'line';

export type TabsProps = ComponentProps<typeof AriaTabs> & {
  /** `default` is a segmented control; `line` underlines the selected tab. */
  variant?: TabsVariant;
};

export function Tabs({ className, variant = 'default', ...props }: TabsProps) {
  const base = `tritium-tabs tritium-tabs--${variant}`;
  return (
    <AriaTabs
      {...props}
      className={composeRenderProps(className, (className) =>
        className ? `${base} ${className}` : base,
      )}
    />
  );
}

export type TabListProps<T extends object> = ComponentProps<typeof AriaTabList<T>>;

/** The row of tabs. Give it an `aria-label`. */
export function TabList<T extends object>({ className, ...props }: TabListProps<T>) {
  return (
    <AriaTabList
      {...props}
      className={composeRenderProps(className, (className) =>
        className ? `tritium-tabs__list ${className}` : 'tritium-tabs__list',
      )}
    />
  );
}

export type TabProps = ComponentProps<typeof AriaTab>;

export function Tab({ className, ...props }: TabProps) {
  return (
    <AriaTab
      {...props}
      className={composeRenderProps(className, (className) =>
        className ? `tritium-tabs__tab ${className}` : 'tritium-tabs__tab',
      )}
    />
  );
}

export type TabPanelProps = ComponentProps<typeof AriaTabPanel>;

export function TabPanel({ className, ...props }: TabPanelProps) {
  return (
    <AriaTabPanel
      {...props}
      className={composeRenderProps(className, (className) =>
        className ? `tritium-tabs__panel ${className}` : 'tritium-tabs__panel',
      )}
    />
  );
}
