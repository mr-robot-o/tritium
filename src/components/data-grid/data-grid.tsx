import { useEffect, useMemo, type ReactNode } from 'react';
import {
  columnSizingFeature,
  columnFilteringFeature,
  columnVisibilityFeature,
  createFilteredRowModel,
  createPaginatedRowModel,
  createSortedRowModel,
  filterFn_includesString,
  globalFilteringFeature,
  rowPaginationFeature,
  rowSelectionFeature,
  rowSortingFeature,
  sortFn_alphanumeric,
  sortFn_basic,
  sortFn_datetime,
  sortFn_text,
  tableFeatures,
  useTable,
  type ColumnDef,
  type ColumnVisibilityState,
  type PaginationState,
  type RowData,
  type RowSelectionState,
  type SortingState,
} from '@tanstack/react-table';
import type { Key, Selection, SortDescriptor } from 'react-aria-components';
import { Button } from '../button/button';
import { DropdownMenu, DropdownMenuContent } from '../dropdown-menu/dropdown-menu';
import { Empty, EmptyDescription, EmptyHeader, EmptyTitle } from '../empty/empty';
import { Input } from '../input/input';
import { MenuItem } from '../menu/menu';
import { NativeSelect } from '../native-select/native-select';
import { Pagination } from '../pagination/pagination';
import { Skeleton } from '../skeleton/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  type TableProps,
} from '../table/table';
import './data-grid.css';

// Stable, module-level registry: TanStack recomputes row models when this changes identity.
const features = tableFeatures({
  columnSizingFeature,
  rowSortingFeature,
  sortedRowModel: createSortedRowModel(),
  sortFns: {
    alphanumeric: sortFn_alphanumeric,
    basic: sortFn_basic,
    datetime: sortFn_datetime,
    text: sortFn_text,
  },
  columnFilteringFeature,
  globalFilteringFeature,
  filteredRowModel: createFilteredRowModel(),
  filterFns: { includesString: filterFn_includesString },
  rowPaginationFeature,
  paginatedRowModel: createPaginatedRowModel(),
  rowSelectionFeature,
  columnVisibilityFeature,
});

type Features = typeof features;

// TanStack gives every column `size: 150`, `minSize: 20` and a huge `maxSize`. Clear them so only
// widths a column sets itself are passed on, and the rest share the space (React Aria's `1fr`).
const defaultColumn = { size: undefined, minSize: undefined, maxSize: undefined };

/**
 * A column definition. This is TanStack Table's `ColumnDef`, so `accessorKey`, `header`, `cell`,
 * `enableSorting`, `enableHiding` and the rest work as they do there. `size`, `minSize` and
 * `maxSize` set pixel widths.
 */
export type DataGridColumnDef<TData extends RowData> = ColumnDef<Features, TData>;

export type DataGridInitialState = {
  sorting?: SortingState;
  rowSelection?: RowSelectionState;
  columnVisibility?: ColumnVisibilityState;
  globalFilter?: string;
  pagination?: Partial<PaginationState>;
};

export type DataGridProps<TData extends RowData> = Omit<
  TableProps,
  | 'children'
  | 'selectionMode'
  | 'selectedKeys'
  | 'defaultSelectedKeys'
  | 'onSelectionChange'
  | 'sortDescriptor'
  | 'onSortChange'
  | 'isResizable'
> & {
  /** What each column shows and how it behaves. Keep it referentially stable (module scope or `useMemo`). */
  columns: DataGridColumnDef<TData>[];
  /** The rows. Keep it referentially stable. */
  data: TData[];
  /** A stable unique id for a row. Defaults to the row index; set it so selection survives sorting and filtering. */
  getRowId?: (row: TData, index: number) => string;
  /** Initial sorting, selection, column visibility, search text and page. */
  initialState?: DataGridInitialState;
  /** Whether sortable columns can be sorted by clicking their header. Clicking cycles ascending, descending, then unsorted. */
  enableSorting?: boolean;
  /** Adds a checkbox column. Select all applies to the rows on the current page. */
  enableRowSelection?: boolean;
  /** Adds a search box above the grid that filters every column. */
  enableGlobalFilter?: boolean;
  /** Adds a Columns menu above the grid for showing and hiding columns. */
  enableColumnVisibility?: boolean;
  /** Lets columns be resized by dragging their trailing edge. */
  enableColumnResizing?: boolean;
  /** Splits the rows into pages and adds a footer with page controls. */
  enablePagination?: boolean;
  /** Rows per page. */
  pageSize?: number;
  /** Choices for the rows-per-page select. */
  pageSizeOptions?: number[];
  /** Shows skeleton rows in place of the data. */
  isLoading?: boolean;
  /** Content shown when there are no rows. */
  renderEmptyState?: () => ReactNode;
  /** Called with the ids of the selected rows when the selection changes. */
  onSelectionChange?: (rowIds: string[]) => void;
};

const defaultEmptyState = () => (
  <Empty>
    <EmptyHeader>
      <EmptyTitle>No results</EmptyTitle>
      <EmptyDescription>Try changing your search or filters.</EmptyDescription>
    </EmptyHeader>
  </Empty>
);

const SKELETON_ROWS = 5;
const NO_PAGINATION_SIZE = Number.MAX_SAFE_INTEGER;
const defaultPageSizeOptions = [10, 20, 50];

export function DataGrid<TData extends RowData>({
  columns,
  data,
  getRowId,
  initialState,
  enableSorting = false,
  enableRowSelection = false,
  enableGlobalFilter = false,
  enableColumnVisibility = false,
  enableColumnResizing = false,
  enablePagination = false,
  pageSize = 10,
  pageSizeOptions = defaultPageSizeOptions,
  isLoading = false,
  renderEmptyState = defaultEmptyState,
  onSelectionChange,
  ...tableProps
}: DataGridProps<TData>) {
  const table = useTable({
    features,
    columns,
    data,
    defaultColumn,
    getRowId,
    enableSorting,
    enableRowSelection,
    globalFilterFn: 'includesString',
    initialState: {
      ...initialState,
      pagination: {
        pageIndex: initialState?.pagination?.pageIndex ?? 0,
        pageSize: enablePagination ? (initialState?.pagination?.pageSize ?? pageSize) : NO_PAGINATION_SIZE,
      },
    },
  });

  const { sorting, rowSelection, globalFilter, pagination } = table.state;
  const rows = table.getRowModel().rows;
  const leafColumns = table.getVisibleLeafColumns();

  // TanStack sorts by a list of columns; React Aria describes a single one.
  const sortDescriptor: SortDescriptor | undefined = sorting[0]
    ? { column: sorting[0].id, direction: sorting[0].desc ? 'descending' : 'ascending' }
    : undefined;
  const onSortChange = (descriptor: SortDescriptor) => {
    const column = String(descriptor.column);
    // React Aria only toggles ascending and descending. Going from descending back to
    // ascending on the same column is our cue to clear the sort instead.
    if (sorting[0]?.id === column && sorting[0].desc && descriptor.direction === 'ascending') {
      table.setSorting([]);
      return;
    }
    table.setSorting([{ id: column, desc: descriptor.direction === 'descending' }]);
  };

  const selectedKeys = useMemo(
    () => new Set<Key>(Object.keys(rowSelection).filter((id) => rowSelection[id])),
    [rowSelection],
  );
  const handleSelectionChange = (keys: Selection) => {
    // "all" means every row React Aria can see, which is the current page. Keep other pages' picks.
    const ids = keys === 'all' ? [...selectedKeys, ...rows.map((row) => row.id)] : [...keys];
    table.setRowSelection(Object.fromEntries(ids.map((id) => [String(id), true])));
    onSelectionChange?.(ids.map(String));
  };

  // Report the initial selection once, so a consumer that tracks selection starts in sync.
  useEffect(() => {
    const ids = Object.keys(initialState?.rowSelection ?? {}).filter((id) => initialState?.rowSelection?.[id]);
    if (ids.length > 0) onSelectionChange?.(ids);
    // Mount only: later changes are reported by handleSelectionChange.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Count against the filtered rows, so picks hidden by a search don't make "5 of 3".
  const filteredRows = enableRowSelection ? table.getFilteredRowModel().rows : [];
  const selectedCount = filteredRows.filter((row) => rowSelection[row.id]).length;
  const skeletonIds = useMemo(() => Array.from({ length: SKELETON_ROWS }, (_, index) => `skeleton-${index}`), []);
  const hasToolbar = enableGlobalFilter || enableColumnVisibility;
  const hideableColumns = table.getAllLeafColumns().filter((column) => column.getCanHide());
  const visibleColumnKeys = new Set<Key>(hideableColumns.filter((column) => column.getIsVisible()).map((column) => column.id));
  const pageCount = table.getPageCount();

  return (
    <div className="tritium-data-grid">
      {hasToolbar && (
        <div className="tritium-data-grid__toolbar">
          {enableGlobalFilter && (
            <Input
              className="tritium-data-grid__search"
              type="search"
              aria-label="Search"
              placeholder="Search…"
              value={globalFilter ?? ''}
              onChange={(event) => table.setGlobalFilter(event.target.value)}
            />
          )}
          {enableColumnVisibility && (
            <DropdownMenu>
              <Button variant="outline">Columns</Button>
              <DropdownMenuContent
                placement="bottom end"
                aria-label="Toggle columns"
                selectionMode="multiple"
                selectedKeys={visibleColumnKeys}
                onSelectionChange={(keys) => {
                  const next = keys === 'all' ? new Set(hideableColumns.map((column) => column.id)) : keys;
                  hideableColumns.forEach((column) => column.toggleVisibility(next.has(column.id)));
                }}
              >
                {hideableColumns.map((column) => (
                  <MenuItem key={column.id} id={column.id}>
                    {typeof column.columnDef.header === 'string' ? column.columnDef.header : column.id}
                  </MenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      )}

      <Table
        {...tableProps}
        isResizable={enableColumnResizing}
        selectionMode={enableRowSelection ? 'multiple' : 'none'}
        selectedKeys={selectedKeys}
        onSelectionChange={handleSelectionChange}
        disabledKeys={isLoading ? skeletonIds : undefined}
        sortDescriptor={sortDescriptor}
        onSortChange={onSortChange}
      >
        <TableHeader>
          {table.getHeaderGroups()[0]?.headers.map((header, index) => {
            const { column } = header;
            const { size, minSize, maxSize } = column.columnDef;
            return (
              <TableColumn
                key={header.id}
                id={column.id}
                isRowHeader={index === 0}
                allowsSorting={enableSorting && column.getCanSort()}
                allowsResizing={enableColumnResizing}
                defaultWidth={size ?? '1fr'}
                minWidth={minSize}
                maxWidth={maxSize}
              >
                {header.isPlaceholder ? null : <table.FlexRender header={header} />}
              </TableColumn>
            );
          })}
        </TableHeader>
        <TableBody
          renderEmptyState={isLoading ? undefined : renderEmptyState}
        >
          {isLoading
            ? skeletonIds.map((id) => (
                <TableRow key={id} id={id}>
                  {leafColumns.map((column) => (
                    <TableCell key={column.id}>
                      <Skeleton />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            : rows.map((row) => (
                <TableRow key={row.id} id={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      <table.FlexRender cell={cell} />
                    </TableCell>
                  ))}
                </TableRow>
              ))}
        </TableBody>
      </Table>

      {(enablePagination || enableRowSelection) && (
        <div className="tritium-data-grid__footer">
          <div className="tritium-data-grid__summary" aria-live="polite">
            {enableRowSelection &&
              `${selectedCount} of ${filteredRows.length} row${filteredRows.length === 1 ? '' : 's'} selected`}
          </div>
          {enablePagination && (
            <div className="tritium-data-grid__pager">
              <label className="tritium-data-grid__page-size">
                Rows per page
                <NativeSelect
                  size="sm"
                  value={pagination.pageSize}
                  onChange={(event) => table.setPageSize(Number(event.target.value))}
                >
                  {pageSizeOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </NativeSelect>
              </label>
              <Pagination
                totalPages={pageCount}
                page={pagination.pageIndex + 1}
                onPageChange={(page) => table.setPageIndex(page - 1)}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
