import type { Meta, StoryObj } from '@storybook/react-vite';
import { Controls, Description, Heading, Stories, Title } from '@storybook/addon-docs/blocks';
import { Progress } from './progress';

const meta = {
  title: 'Components/Progress',
  component: Progress,
  tags: ['autodocs'],
  args: { value: 60, 'aria-label': 'Upload progress' },
  argTypes: {
    value: { description: 'Current value. Omit it and set `isIndeterminate` when the amount is unknown.', control: { type: 'range', min: 0, max: 100 } },
    isIndeterminate: { description: 'Shows a moving bar for work of unknown length.', control: 'boolean' },
    label: { description: 'The visible label. Without one, pass an `aria-label`.', control: 'text' },
    showValue: { description: 'Shows the formatted value next to the label.', control: 'boolean' },
    size: { description: 'Height of the bar.', control: 'inline-radio', options: ['sm', 'default', 'lg'] },
    minValue: { control: 'number' },
    maxValue: { control: 'number' },
  },
  parameters: {
    docs: {
      description: {
        component:
          'Shows how far along a task is, built on the React Aria `ProgressBar` (role `progressbar`). Use it for work that completes; for a measurement within a known range, such as disk usage, use Meter. Styling comes from Bezel CSS variables, and the stable `tritium-progress` class is available for overrides.',
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
      <div style={{ width: 320 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Progress>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithLabelAndValue: Story = {
  args: { label: 'Uploading', showValue: true, 'aria-label': undefined },
};

export const Indeterminate: Story = {
  args: { isIndeterminate: true, value: undefined, label: 'Loading', 'aria-label': undefined },
};

export const Sizes: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Progress {...args} size="sm" />
      <Progress {...args} size="default" />
      <Progress {...args} size="lg" />
    </div>
  ),
};
