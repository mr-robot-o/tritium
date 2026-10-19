import type { ComponentProps, CSSProperties } from 'react';
import {
  Cell as AriaCell,
  Collection,
  Column as AriaColumn,
  ColumnResizer,
  composeRenderProps,
  ResizableTableContainer,
  Row as AriaRow,
  Table as AriaTable,
  TableBody as AriaTableBody,
  TableHeader as AriaTableHeader,
  useTableOptions,
  type CellProps,
  type ColumnProps,
  type ResizableTableContainerProps,
  type RowProps,
  type TableBodyProps,
  type TableHeaderProps,
} from 'react-aria-components';
import { Checkbox } from '../checkbox/checkbox';
import './table.css';

export type TableVariant = 'default' | 'striped';
export type TableSize = 'sm' | 'default' | 'lg';

type ClassName<T> = string | ((values: T & { defaultClassName: string | undefined }) => string);

// Prefixes the component's base class onto a string or function className.
const withBase = <T,>(base: string, className: ClassName<T> | undefined) =>
  composeRenderProps(className, (className) => (className ? `${base} ${className}` : base));

export type TableProps = ComponentProps<typeof AriaTable> & {
  /** `striped` shades every other row. */
  variant?: TableVariant;
  /** Row density. */
  size?: TableSize;
  /** Pins the header while the body scrolls. Give the table a height with `containerStyle`. */
  isStickyHeader?: boolean;
  /** Lets columns be resized. Add `allowsResizing` to each `TableColumn` that should have a handle. */
  isResizable?: boolean;
  /** Class for the scrolling element that wraps the table. */
  containerClassName?: string;
  /** Style for the scrolling element that wraps the table, e.g. a `maxHeight`. */
  containerStyle?: CSSProperties;
  /** Called when a user starts resizing a column. Receives the current column widths. */
  onColumnResizeStart?: ResizableTableContainerProps['onResizeStart'];
  /** Called continuously while a column is resized. Use it with `TableColumn` `width` to control widths. */
  onColumnResize?: ResizableTableContainerProps['onResize'];
  /** Called after a column resize ends. Use it to persist widths. */
  onColumnResizeEnd?: ResizableTableContainerProps['onResizeEnd'];
};

export function Table({
  className,
  variant = 'default',
  size = 'default',
  isStickyHeader,
  isResizable,
  containerClassName,
  containerStyle,
  onColumnResizeStart,
  onColumnResize,
  onColumnResizeEnd,
  ...props
}: TableProps) {
  const base = `tritium-table tritium-table--${variant} tritium-table--size-${size}${
    isStickyHeader ? ' tritium-table--sticky-header' : ''
  }${isResizable ? ' tritium-table--resizable' : ''}`;
  const containerBase = containerClassName
    ? `tritium-table-container ${containerClassName}`
    : 'tritium-table-container';
  const table = <AriaTable {...props} className={withBase(base, className)} />;

  return isResizable ? (
    <ResizableTableContainer
      className={containerBase}
      style={containerStyle}
      onResizeStart={onColumnResizeStart}
      onResize={onColumnResize}
      onResizeEnd={onColumnResizeEnd}
    >
      {table}
    </ResizableTableContainer>
  ) : (
    <div className={containerBase} style={containerStyle}>
      {table}
    </div>
  );
}

/**
 * The header row. With `selectionMode="multiple"` it adds a select-all checkbox column, and with
 * `selectionMode` set it adds the leading selection column automatically.
 */
export function TableHeader<T extends object>({ className, columns, children, ...props }: TableHeaderProps<T>) {
  const { selectionBehavior, selectionMode } = useTableOptions();
  return (
    <AriaTableHeader {...props} className={withBase('tritium-table__header', className)}>
      {selectionBehavior === 'toggle' && (
        <AriaColumn
          className="tritium-table__column tritium-table__column--select"
          width={44}
          minWidth={44}
          maxWidth={44}
        >
          {selectionMode === 'multiple' && <Checkbox slot="selection" />}
        </AriaColumn>
      )}
      <Collection items={columns}>{children}</Collection>
    </AriaTableHeader>
  );
}

export type TableColumnProps = ColumnProps & {
  /** Adds a drag handle on the column's trailing edge. The table needs `isResizable`. */
  allowsResizing?: boolean;
};

const sortIcon = (
  <svg
    className="tritium-table__sort"
    viewBox="0 0 16 16"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    aria-hidden="true"
  >
    <path className="tritium-table__sort-up" d="M4 6.5l4-4 4 4" strokeLinecap="round" strokeLinejoin="round" />
    <path className="tritium-table__sort-down" d="M4 9.5l4 4 4-4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/** A column header. Add `allowsSorting` to make it sortable and `allowsResizing` to make it resizable. */
export function TableColumn({ className, children, allowsResizing, ...props }: TableColumnProps) {
  return (
    <AriaColumn {...props} className={withBase('tritium-table__column', className)}>
      {composeRenderProps(children, (children, { allowsSorting, sortDirection }) => (
        <>
          <div className="tritium-table__column-content">
            <span className="tritium-table__column-label">{children}</span>
            {allowsSorting && (
              <span className="tritium-table__sort-icon" data-direction={sortDirection}>
                {sortIcon}
              </span>
            )}
          </div>
          {allowsResizing && <ColumnResizer className="tritium-table__resizer" />}
        </>
      ))}
    </AriaColumn>
  );
}

/** The body. Use `renderEmptyState` to show an `Empty` when there are no rows. */
export function TableBody<T extends object>({ className, ...props }: TableBodyProps<T>) {
  return <AriaTableBody {...props} className={withBase('tritium-table__body', className)} />;
}

/** A row. With `selectionMode` set it adds the leading selection checkbox cell automatically. */
export function TableRow<T extends object>({ className, columns, children, ...props }: RowProps<T>) {
  const { selectionBehavior } = useTableOptions();
  return (
    <AriaRow {...props} className={withBase('tritium-table__row', className)}>
      {selectionBehavior === 'toggle' && (
        <AriaCell className="tritium-table__cell tritium-table__cell--select">
          <Checkbox slot="selection" />
        </AriaCell>
      )}
      <Collection items={columns}>{children}</Collection>
    </AriaRow>
  );
}

export function TableCell({ className, ...props }: CellProps) {
  return <AriaCell {...props} className={withBase('tritium-table__cell', className)} />;
}
