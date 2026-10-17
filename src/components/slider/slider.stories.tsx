import type { Meta, StoryObj } from '@storybook/react-vite';
import { Controls, Description, Heading, Stories, Title } from '@storybook/addon-docs/blocks';
import { Slider } from './slider';

const meta = {
  title: 'Components/Slider',
  component: Slider,
  tags: ['autodocs'],
  args: { label: 'Volume', defaultValue: 40, showOutput: true },
  argTypes: {
    label: { description: 'The visible label. Without one, pass an `aria-label`.', control: 'text' },
    showOutput: { description: 'Shows the current value next to the label.', control: 'boolean' },
    thumbLabels: { description: 'Accessible names for each thumb of a range slider.', control: false },
    minValue: { control: 'number' },
    maxValue: { control: 'number' },
    step: { control: 'number' },
    orientation: { control: 'inline-radio', options: ['horizontal', 'vertical'] },
    isDisabled: { control: 'boolean' },
    defaultValue: { control: false },
    value: { control: false },
  },
  parameters: {
    docs: {
      description: {
        component:
          'Selects a number, or a range, by dragging a thumb, built on the React Aria `Slider` (role `slider`). Arrow keys, Home, End and Page Up/Down adjust the value. Pass an array as the value for a range. Styling comes from Bezel CSS variables, and the stable `tritium-slider` class is available for overrides.',
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
} satisfies Meta<typeof Slider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Range: Story = {
  args: {
    label: 'Price range',
    defaultValue: [20, 70],
    thumbLabels: ['Minimum price', 'Maximum price'],
  },
};

export const Stepped: Story = { args: { step: 10, label: 'Brightness' } };

export const Vertical: Story = {
  args: { orientation: 'vertical', label: undefined, showOutput: false, 'aria-label': 'Volume' },
  decorators: [
    (Story) => (
      <div style={{ height: 160 }}>
        <Story />
      </div>
    ),
  ],
};

export const Disabled: Story = { args: { isDisabled: true } };
