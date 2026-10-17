import type { Meta, StoryObj } from '@storybook/react-vite';
import { Controls, Description, Heading, Stories, Title } from '@storybook/addon-docs/blocks';
import { Kbd } from './kbd';

const meta = {
  title: 'Components/Kbd',
  component: Kbd,
  tags: ['autodocs'],
  args: { children: '⌘' },
  argTypes: { children: { control: 'text' } },
  parameters: {
    docs: {
      description: {
        component:
          'Displays a keyboard key or shortcut, built on the React Aria `Keyboard` (a `<kbd>` element). Group several keys in an element with the `tritium-kbd-group` class. Styling comes from Bezel CSS variables, and the stable `tritium-kbd` class is available for overrides.',
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
} satisfies Meta<typeof Kbd>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Shortcut: Story = {
  render: () => (
    <span className="tritium-kbd-group">
      <Kbd>⌘</Kbd>
      <Kbd>⇧</Kbd>
      <Kbd>K</Kbd>
    </span>
  ),
};

export const Words: Story = {
  render: () => (
    <span className="tritium-kbd-group">
      <Kbd>Ctrl</Kbd>
      <Kbd>Enter</Kbd>
    </span>
  ),
};
