import type { Meta, StoryObj } from '@storybook/react-vite';
import { Controls, Description, Heading, Stories, Title } from '@storybook/addon-docs/blocks';
import { MenuItem, MenuSeparator } from '../menu/menu';
import { Menubar, MenubarMenu } from './menubar';

const meta = {
  title: 'Components/Menubar',
  component: Menubar,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'A row of menus for an application, built on the React Aria `Toolbar` and `Menu`. Left and Right move between the buttons; while a menu is open, hovering another button or pressing Left or Right switches to it. Items are the same `MenuItem`, `MenuSection` and `MenuSeparator` as `DropdownMenu`. Note that it is announced as a toolbar of menu buttons, not as an ARIA `menubar`. Styling comes from Bezel CSS variables, and the stable `tritium-menubar` class is available for overrides.',
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
  args: { 'aria-label': 'Application' },
  render: (args) => (
    <Menubar {...args}>
      <MenubarMenu label="File">
        <MenuItem id="new" shortcut="⌘N">New tab</MenuItem>
        <MenuItem id="window" shortcut="⌘⇧N">New window</MenuItem>
        <MenuItem id="private" isDisabled>New private window</MenuItem>
        <MenuSeparator />
        <MenuItem id="print" shortcut="⌘P">Print…</MenuItem>
      </MenubarMenu>
      <MenubarMenu label="Edit">
        <MenuItem id="undo" shortcut="⌘Z">Undo</MenuItem>
        <MenuItem id="redo" shortcut="⇧⌘Z">Redo</MenuItem>
        <MenuSeparator />
        <MenuItem id="find" shortcut="⌘F">Find</MenuItem>
      </MenubarMenu>
      <MenubarMenu label="View">
        <MenuItem id="reload" shortcut="⌘R">Reload</MenuItem>
        <MenuItem id="fullscreen" shortcut="⌃⌘F">Toggle full screen</MenuItem>
      </MenubarMenu>
    </Menubar>
  ),
} satisfies Meta<typeof Menubar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
