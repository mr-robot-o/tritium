import type { Meta, StoryObj } from '@storybook/react-vite';
import { Controls, Description, Heading, Stories, Title } from '@storybook/addon-docs/blocks';
import { Meter } from './meter';

const meta = {
  title: 'Components/Meter',
  component: Meter,
  tags: ['autodocs'],
  args: { value: 45, label: 'Storage used', showValue: true },
  argTypes: {
    value: { control: { type: 'range', min: 0, max: 100 } },
    minValue: { control: 'number' },
    maxValue: { control: 'number' },
    label: { description: 'The visible label. Without one, pass an `aria-label`.', control: 'text' },
    showValue: { description: 'Shows the formatted value next to the label.', control: 'boolean' },
    size: { control: 'inline-radio', options: ['sm', 'default', 'lg'] },
    variant: {
      description: 'The fill color. Choose it from the value yourself, since Meter has no built-in thresholds.',
      control: 'inline-radio',
      options: ['default', 'success', 'warning', 'destructive'],
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          'Shows a measurement within a known range, such as disk usage, built on the React Aria `Meter` (role `meter`). Unlike Progress, it does not represent a task that completes. It shares its track and fill styles with Progress. Styling comes from Bezel CSS variables, and the stable `tritium-meter` class is available for overrides.',
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
} satisfies Meta<typeof Meter>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Variants: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Meter {...args} value={30} variant="success" label="Healthy" />
      <Meter {...args} value={75} variant="warning" label="Getting full" />
      <Meter {...args} value={95} variant="destructive" label="Almost full" />
    </div>
  ),
};
