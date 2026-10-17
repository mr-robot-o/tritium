import type { Meta, StoryObj } from '@storybook/react-vite';
import { Controls, Description, Heading, Stories, Title } from '@storybook/addon-docs/blocks';
import { Button } from '../button/button';
import { Tooltip, TooltipTrigger } from './tooltip';

const meta = {
  title: 'Components/Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
  args: { children: 'Add to library' },
  argTypes: {
    placement: {
      description: 'Where the tooltip appears relative to its trigger. It flips when there is no room.',
      control: 'select',
      options: ['top', 'bottom', 'left', 'right', 'top start', 'top end', 'bottom start', 'bottom end'],
    },
    offset: { description: 'Distance from the trigger, in pixels.', control: 'number' },
    children: { control: 'text' },
  },
  parameters: {
    docs: {
      description: {
        component:
          'A short text hint shown when the trigger is hovered or focused, built on the React Aria `Tooltip` (role `tooltip`). It appears after a short delay and closes on Escape. Keep it to plain text: tooltips are not focusable, so put anything interactive in a Popover instead. Do not rely on it for essential information. Styling comes from Bezel CSS variables, and the stable `tritium-tooltip` class is available for overrides.',
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
      <div style={{ padding: '48px 0' }}>
        <Story />
      </div>
    ),
  ],
  render: (args) => (
    <TooltipTrigger>
      <Button variant="outline">Hover or focus me</Button>
      <Tooltip {...args} />
    </TooltipTrigger>
  ),
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Below: Story = { args: { placement: 'bottom' } };

export const IconButton: Story = {
  render: (args) => (
    <TooltipTrigger>
      <Button isIconOnly variant="outline" aria-label="Add to library">
        <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
          <path d="M8 3v10M3 8h10" strokeLinecap="round" />
        </svg>
      </Button>
      <Tooltip {...args} />
    </TooltipTrigger>
  ),
};
