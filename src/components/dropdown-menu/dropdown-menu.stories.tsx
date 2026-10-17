import type { Meta, StoryObj } from '@storybook/react-vite';
import { Controls, Description, Heading, Stories, Title } from '@storybook/addon-docs/blocks';
import { Button } from '../button/button';
import { MenuItem, MenuSection, MenuSeparator } from '../menu/menu';
import { DropdownMenu, DropdownMenuContent } from './dropdown-menu';

const icon = (path: string) => (
  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
    <path d={path} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const meta = {
  title: 'Components/Dropdown Menu',
  component: DropdownMenuContent,
  tags: ['autodocs'],
  args: { 'aria-label': 'Account' },
  argTypes: {
    placement: {
      description: 'Where the menu opens relative to its trigger. It flips when there is no room.',
      control: 'select',
      options: ['bottom start', 'bottom end', 'bottom', 'top start', 'top end', 'left', 'right'],
    },
    selectionMode: {
      description: 'Makes items selectable, as checkable options (`multiple`) or radio-like choices (`single`).',
      control: 'inline-radio',
      options: ['none', 'single', 'multiple'],
    },
    onAction: { description: 'Called with the key of the item that was activated.' },
    children: { control: false },
  },
  parameters: {
    docs: {
      description: {
        component:
          'A list of actions that opens from a button, built on the React Aria `MenuTrigger`, `Menu` and `MenuItem`. Arrow keys move through it, typeahead jumps to an item, and Escape closes it. Compose it from `MenuItem`, `MenuSection` and `MenuSeparator`. Use `selectionMode` for checkable items. For choosing a value for a form field, use Select instead. Styling comes from Bezel CSS variables, and the stable `tritium-menu` class is available for overrides.',
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
  decorators: [
    (Story) => (
      <div style={{ minHeight: 320 }}>
        <Story />
      </div>
    ),
  ],
  render: (args) => (
    <DropdownMenu>
      <Button variant="outline">Open menu</Button>
      <DropdownMenuContent {...args}>
        <MenuSection title="My account">
          <MenuItem id="profile" startContent={icon('M8 8a3 3 0 100-6 3 3 0 000 6zM2.5 14a5.5 5.5 0 0111 0')} shortcut="⇧⌘P">
            Profile
          </MenuItem>
          <MenuItem id="billing" startContent={icon('M2 5h12v8H2zM2 8h12')} shortcut="⌘B">
            Billing
          </MenuItem>
          <MenuItem id="settings" shortcut="⌘,">Settings</MenuItem>
        </MenuSection>
        <MenuSeparator />
        <MenuItem id="support">Support</MenuItem>
        <MenuItem id="api" isDisabled>API (coming soon)</MenuItem>
        <MenuSeparator />
        <MenuItem id="logout" variant="destructive">Log out</MenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
} satisfies Meta<typeof DropdownMenuContent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Checkboxes: Story = {
  args: { selectionMode: 'multiple', defaultSelectedKeys: ['status'], 'aria-label': 'View' },
  render: (args) => (
    <DropdownMenu>
      <Button variant="outline">View</Button>
      <DropdownMenuContent {...args}>
        <MenuItem id="status">Status bar</MenuItem>
        <MenuItem id="activity">Activity bar</MenuItem>
        <MenuItem id="panel">Panel</MenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
};

export const RadioChoice: Story = {
  args: { selectionMode: 'single', defaultSelectedKeys: ['bottom'], 'aria-label': 'Panel position' },
  render: (args) => (
    <DropdownMenu>
      <Button variant="outline">Panel position</Button>
      <DropdownMenuContent {...args}>
        <MenuItem id="top">Top</MenuItem>
        <MenuItem id="bottom">Bottom</MenuItem>
        <MenuItem id="right">Right</MenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
};
