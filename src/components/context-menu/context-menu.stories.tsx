import type { Meta, StoryObj } from '@storybook/react-vite';
import { Controls, Description, Heading, Stories, Title } from '@storybook/addon-docs/blocks';
import { MenuItem, MenuSeparator } from '../menu/menu';
import { ContextMenu } from './context-menu';

const meta = {
  title: 'Components/Context Menu',
  component: ContextMenu,
  tags: ['autodocs'],
  args: { menuLabel: 'Page actions', menu: null },
  argTypes: {
    menu: { description: 'The items: `MenuItem`, `MenuSection` and `MenuSeparator`.', control: false },
    menuLabel: { description: 'Names the menu for screen readers.', control: 'text' },
    onAction: { description: 'Called with the key of the item that was activated.' },
  },
  parameters: {
    docs: {
      description: {
        component:
          'A menu that opens at the pointer on right-click, or from the context menu key or Shift+F10 when the area has focus. React Aria has no context menu, so this anchors a Popover and Menu to the click position. The browser\'s own menu is replaced only inside the wrapped area. It is hidden by default, so also expose the same actions somewhere visible. Styling comes from Bezel CSS variables, and the stable `tritium-menu` class is available for overrides.',
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
  render: (args) => (
    <ContextMenu
      {...args}
      tabIndex={0}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 320,
        height: 160,
        border: '1px dashed var(--border)',
        borderRadius: 12,
        color: 'var(--muted-foreground)',
      }}
      menu={
        <>
          <MenuItem id="back" shortcut="⌘[">Back</MenuItem>
          <MenuItem id="forward" shortcut="⌘]" isDisabled>Forward</MenuItem>
          <MenuItem id="reload" shortcut="⌘R">Reload</MenuItem>
          <MenuSeparator />
          <MenuItem id="inspect" variant="destructive">Delete page</MenuItem>
        </>
      }
    >
      Right-click here
    </ContextMenu>
  ),
} satisfies Meta<typeof ContextMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
