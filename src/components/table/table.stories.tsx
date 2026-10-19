import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Controls, Description, Heading, Stories, Title } from '@storybook/addon-docs/blocks';
import type { SortDescriptor } from 'react-aria-components';
import { Button } from '../button/button';
import { DropdownMenu, DropdownMenuContent } from '../dropdown-menu/dropdown-menu';
import { Empty, EmptyDescription, EmptyHeader, EmptyTitle } from '../empty/empty';
import { MenuItem } from '../menu/menu';
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from './table';

type Person = { id: number; name: string; role: string; email: string };

const people: Person[] = [
  { id: 1, name: 'Ada Lovelace', role: 'Engineer', email: 'ada@example.com' },
  { id: 2, name: 'Grace Hopper', role: 'Admiral', email: 'grace@example.com' },
  { id: 3, name: 'Katherine Johnson', role: 'Mathematician', email: 'katherine@example.com' },
  { id: 4, name: 'Margaret Hamilton', role: 'Engineer', email: 'margaret@example.com' },
  { id: 5, name: 'Annie Easley', role: 'Computer scientist', email: 'annie@example.com' },
];

const defaultChildren = (
  <>
    <TableHeader>
      <TableColumn isRowHeader>Name</TableColumn>
      <TableColumn>Role</TableColumn>
      <TableColumn>Email</TableColumn>
    </TableHeader>
    <TableBody>
      {people.map((person) => (
        <TableRow key={person.id} id={person.id}>
          <TableCell>{person.name}</TableCell>
          <TableCell>{person.role}</TableCell>
          <TableCell>{person.email}</TableCell>
        </TableRow>
      ))}
    </TableBody>
  </>
);

const meta = {
  title: 'Components/Table',
  component: Table,
  tags: ['autodocs'],
  args: { 'aria-label': 'Team members', children: defaultChildren },
  argTypes: {
    variant: {
      description: '`striped` shades every other row.',
      control: 'select',
      options: ['default', 'striped'],
    },
    size: { description: 'Row density.', control: 'select', options: ['sm', 'default', 'lg'] },
    isStickyHeader: {
      description: 'Pins the header while the body scrolls. Give the table a height with `containerStyle`.',
      control: 'boolean',
    },
    isResizable: {
      description: 'Lets columns be resized. Add `allowsResizing` to each `TableColumn` that should have a handle.',
      control: 'boolean',
    },
    selectionMode: { description: 'Whether rows can be selected.', control: 'select', options: ['none', 'single', 'multiple'] },
    selectedKeys: { description: 'Controlled selection.', control: false },
    defaultSelectedKeys: { description: 'Initial selection when uncontrolled.', control: false },
    onSelectionChange: { description: 'Called when the selection changes.' },
    sortDescriptor: { description: 'The controlled sort column and direction.', control: false },
    onSortChange: { description: 'Called when a sortable column header is activated.' },
    onRowAction: { description: 'Called when a row is activated. Makes rows act as buttons.' },
    containerClassName: { description: 'Class for the scrolling element that wraps the table.', control: 'text' },
    containerStyle: { description: 'Style for the scrolling element that wraps the table.', control: false },
    onColumnResizeStart: { description: 'Called when a user starts resizing a column.' },
    onColumnResize: { description: 'Called continuously while a column is resized.' },
    onColumnResizeEnd: { description: 'Called after a column resize ends. Use it to persist widths.' },
    children: { control: false },
  },
  parameters: {
    docs: {
      description: {
        component:
          'A data table built on the React Aria `Table`. Keyboard navigation, row selection, sorting, and column resizing come from React Aria; selection adds a checkbox column automatically. Compose it from `TableHeader`, `TableColumn`, `TableBody`, `TableRow` and `TableCell`. Styling comes from Bezel CSS variables, and the stable `tritium-table` class is available for overrides. For sorting, filtering and pagination over a data set, see Data Grid.',
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
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Striped: Story = { args: { variant: 'striped' } };

export const Sizes: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {(['sm', 'default', 'lg'] as const).map((size) => (
        <Table key={size} {...args} size={size} aria-label={`${size} table`} />
      ))}
    </div>
  ),
};

export const Selectable: Story = {
  args: { selectionMode: 'multiple', defaultSelectedKeys: [2] },
};

function SortableTable(args: Story['args']) {
  const [sort, setSort] = useState<SortDescriptor>({ column: 'name', direction: 'ascending' });
  const rows = [...people].sort((a, b) => {
    const key = sort.column as 'name' | 'role' | 'email';
    const result = a[key].localeCompare(b[key]);
    return sort.direction === 'descending' ? -result : result;
  });
  return (
    <Table {...args!} sortDescriptor={sort} onSortChange={setSort}>
      <TableHeader>
        <TableColumn id="name" isRowHeader allowsSorting>
          Name
        </TableColumn>
        <TableColumn id="role" allowsSorting>
          Role
        </TableColumn>
        <TableColumn id="email" allowsSorting>
          Email
        </TableColumn>
      </TableHeader>
      <TableBody items={rows}>
        {(person) => (
          <TableRow>
            <TableCell>{person.name}</TableCell>
            <TableCell>{person.role}</TableCell>
            <TableCell>{person.email}</TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}

export const Sortable: Story = { render: (args) => <SortableTable {...args} /> };

export const StickyHeader: Story = {
  args: { isStickyHeader: true, containerStyle: { maxHeight: 180 } },
};

export const ResizableColumns: Story = {
  args: {
    isResizable: true,
    children: (
      <>
        <TableHeader>
          <TableColumn isRowHeader allowsResizing defaultWidth="1fr" minWidth={120}>
            Name
          </TableColumn>
          <TableColumn allowsResizing defaultWidth="1fr" minWidth={120}>
            Role
          </TableColumn>
          <TableColumn allowsResizing defaultWidth="2fr" minWidth={160}>
            Email
          </TableColumn>
        </TableHeader>
        <TableBody>
          {people.map((person) => (
            <TableRow key={person.id} id={person.id}>
              <TableCell>{person.name}</TableCell>
              <TableCell>{person.role}</TableCell>
              <TableCell>{person.email}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </>
    ),
  },
};

export const NoRows: Story = {
  args: {
    children: (
      <>
        <TableHeader>
          <TableColumn isRowHeader>Name</TableColumn>
          <TableColumn>Role</TableColumn>
          <TableColumn>Email</TableColumn>
        </TableHeader>
        <TableBody
          renderEmptyState={() => (
            <Empty>
              <EmptyHeader>
                <EmptyTitle>No team members</EmptyTitle>
                <EmptyDescription>Invite someone to get started.</EmptyDescription>
              </EmptyHeader>
            </Empty>
          )}
        >
          {[]}
        </TableBody>
      </>
    ),
  },
};

export const WithActions: Story = {
  args: {
    children: (
      <>
        <TableHeader>
          <TableColumn isRowHeader>Name</TableColumn>
          <TableColumn>Role</TableColumn>
          <TableColumn width={56} minWidth={56}>
            <span style={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden' }}>Actions</span>
          </TableColumn>
        </TableHeader>
        <TableBody>
          {people.map((person) => (
            <TableRow key={person.id} id={person.id}>
              <TableCell>{person.name}</TableCell>
              <TableCell>{person.role}</TableCell>
              <TableCell>
                <DropdownMenu>
                  <Button isIconOnly size="xs" variant="ghost" aria-label={`Actions for ${person.name}`}>
                    …
                  </Button>
                  <DropdownMenuContent placement="bottom end">
                    <MenuItem>Edit</MenuItem>
                    <MenuItem variant="destructive">Remove</MenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </>
    ),
  },
};
