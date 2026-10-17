import type { Meta, StoryObj } from '@storybook/react-vite';
import { Controls, Description, Heading, Stories, Title } from '@storybook/addon-docs/blocks';
import { Button } from '../button/button';
import { TextField } from '../text-field/text-field';
import { Popover, PopoverTrigger } from './popover';

const meta = {
  title: 'Components/Popover',
  component: Popover,
  tags: ['autodocs'],
  args: { 'aria-label': 'Dimensions' },
  argTypes: {
    placement: {
      description: 'Where the popover opens relative to its trigger. It flips when there is no room.',
      control: 'select',
      options: ['bottom', 'bottom start', 'bottom end', 'top', 'top start', 'top end', 'left', 'right'],
    },
    offset: { description: 'Distance from the trigger, in pixels.', control: 'number' },
    'aria-label': { description: 'Names the popover for screen readers.', control: 'text' },
    children: { control: false },
  },
  parameters: {
    docs: {
      description: {
        component:
          'A floating panel anchored to a trigger, built on the React Aria `Popover` and `DialogTrigger`. It opens on press, traps focus while open, closes on Escape or an outside click, and returns focus to the trigger. Put any content inside, including form controls. For text-only hints, use Tooltip; for a list of actions, use Dropdown Menu. Styling comes from Bezel CSS variables, and the stable `tritium-popover` class is available for overrides.',
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
      <div style={{ minHeight: 280 }}>
        <Story />
      </div>
    ),
  ],
  render: (args) => (
    <PopoverTrigger>
      <Button variant="outline">Set dimensions</Button>
      <Popover {...args}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <TextField label="Width" defaultValue="100%" />
          <TextField label="Height" defaultValue="25px" />
        </div>
      </Popover>
    </PopoverTrigger>
  ),
} satisfies Meta<typeof Popover>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const OpensAbove: Story = { args: { placement: 'top' } };

export const Text: Story = {
  render: (args) => (
    <PopoverTrigger>
      <Button variant="outline">What is this?</Button>
      <Popover {...args} aria-label="About this setting">
        This setting controls how often your data syncs across devices.
      </Popover>
    </PopoverTrigger>
  ),
};
