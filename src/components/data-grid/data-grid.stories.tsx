import type { Meta, StoryObj } from '@storybook/react-vite';
import { Controls, Description, Heading, Stories, Title } from '@storybook/addon-docs/blocks';
import { DataGrid, type DataGridColumnDef } from './data-grid';

type Employee = { id: string; name: string; role: string; team: string; salary: number };

const names = [
  'Ada Lovelace', 'Grace Hopper', 'Katherine Johnson', 'Margaret Hamilton', 'Annie Easley', 'Mary Jackson',
  'Dorothy Vaughan', 'Hedy Lamarr', 'Radia Perlman', 'Barbara Liskov', 'Frances Allen', 'Jean Bartik',
];
const roles = ['Engineer', 'Designer', 'Manager', 'Analyst'];
const teams = ['Platform', 'Product', 'Data', 'Growth'];

const employees: Employee[] = Array.from({ length: 36 }, (_, index) => ({
  id: `emp-${index + 1}`,
  name: `${names[index % names.length]}${index >= names.length ? ` ${Math.floor(index / names.length) + 1}` : ''}`,
  role: roles[index % roles.length],
  team: teams[(index * 3) % teams.length],
  salary: 70000 + ((index * 7919) % 50000),
}));

const currency = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });

const columns: DataGridColumnDef<Employee>[] = [
  { accessorKey: 'name', header: 'Name' },
  { accessorKey: 'role', header: 'Role' },
  { accessorKey: 'team', header: 'Team' },
  { accessorKey: 'salary', header: 'Salary', cell: ({ cell }) => currency.format(cell.getValue<number>()) },
];

const meta = {
  title: 'Components/Data Grid',
  component: DataGrid<Employee>,
  tags: ['autodocs'],
  args: {
    'aria-label': 'Employees',
    columns,
    data: employees.slice(0, 8),
    getRowId: (row: Employee) => row.id,
  },
  argTypes: {
    columns: { description: 'Column definitions (TanStack Table `ColumnDef`). Keep them referentially stable.', control: false },
    data: { description: 'The rows. Keep the array referentially stable.', control: false },
    getRowId: { description: 'A stable unique id for a row, so selection survives sorting and filtering.', control: false },
    initialState: { description: 'Initial sorting, selection, column visibility, search text and page.', control: false },
    enableSorting: { description: 'Whether sortable columns can be sorted by clicking their header.', control: 'boolean' },
    enableRowSelection: { description: 'Adds a checkbox column. Select all applies to the current page.', control: 'boolean' },
    enableGlobalFilter: { description: 'Adds a search box that filters every column.', control: 'boolean' },
    enableColumnVisibility: { description: 'Adds a Columns menu for showing and hiding columns.', control: 'boolean' },
    enableColumnResizing: { description: 'Lets columns be resized by dragging their trailing edge.', control: 'boolean' },
    enablePagination: { description: 'Splits the rows into pages and adds page controls.', control: 'boolean' },
    pageSize: { description: 'Rows per page.', control: 'number' },
    pageSizeOptions: { description: 'Choices for the rows-per-page select.', control: false },
    isLoading: { description: 'Shows skeleton rows in place of the data.', control: 'boolean' },
    renderEmptyState: { description: 'Content shown when there are no rows.', control: false },
    onSelectionChange: { description: 'Called with the ids of the selected rows when the selection changes.' },
    variant: { description: '`striped` shades every other row.', control: 'select', options: ['default', 'striped'] },
    size: { description: 'Row density.', control: 'select', options: ['sm', 'default', 'lg'] },
    isStickyHeader: { description: 'Pins the header while the body scrolls.', control: 'boolean' },
    containerStyle: { description: 'Style for the scrolling element that wraps the table.', control: false },
  },
  parameters: {
    docs: {
      description: {
        component:
          'A data table that adds sorting, row selection, search, column visibility, column resizing and pagination to the Table. It is built on the Table components and [TanStack Table](https://tanstack.com/table) v9: pass `columns` and `data`, and turn features on with the `enable*` props. TanStack owns the data state and React Aria handles keyboard navigation, selection and resizing. Sorting is client-side and applies to one column at a time. Styling comes from Bezel CSS variables, and the stable `tritium-data-grid` class is available for overrides.',
      },
      page: () => (
        <>
          <Title />
          <Description />
          <Stories title="Examples" includePrimary />
          <Heading>Props</Heading>
          <Controls />
        </>
      ),
    },
  },
} satisfies Meta<typeof DataGrid<Employee>>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Sortable: Story = {
  args: { enableSorting: true, initialState: { sorting: [{ id: 'name', desc: false }] } },
};

export const Selectable: Story = {
  args: { enableRowSelection: true, initialState: { rowSelection: { 'emp-2': true } } },
};

export const Filtering: Story = {
  args: { enableGlobalFilter: true, data: employees.slice(0, 12), initialState: { globalFilter: 'engineer' } },
};

export const Pagination: Story = {
  args: { enablePagination: true, pageSize: 10, data: employees },
};

export const ColumnVisibility: Story = {
  args: { enableColumnVisibility: true, initialState: { columnVisibility: { team: false } } },
};

export const ResizableColumns: Story = {
  args: { enableColumnResizing: true },
};

export const Loading: Story = {
  args: { isLoading: true, enableRowSelection: true },
};

export const Empty: Story = {
  args: { data: [], enableGlobalFilter: true },
};

export const AllFeatures: Story = {
  args: {
    data: employees,
    enableSorting: true,
    enableRowSelection: true,
    enableGlobalFilter: true,
    enableColumnVisibility: true,
    enableColumnResizing: true,
    enablePagination: true,
    pageSize: 10,
  },
};
