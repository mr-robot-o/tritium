import type { Meta, StoryObj } from '@storybook/react-vite';
import { Controls, Description, Heading, Stories, Title } from '@storybook/addon-docs/blocks';
import { NativeSelect } from './native-select';

const meta = {
  title: 'Components/Native Select',
  component: NativeSelect,
  tags: ['autodocs'],
  args: { 'aria-label': 'Fruit' },
  argTypes: {
    size: { description: 'Height and text size, matching Input.', control: 'inline-radio', options: ['sm', 'default', 'lg'] },
    isDisabled: { description: 'Disables the select.', control: 'boolean' },
    isInvalid: { description: 'Marks the select as invalid.', control: 'boolean' },
    children: { control: false },
  },
  parameters: {
    docs: {
      description: {
        component:
          'A styled browser `<select>`. It keeps the operating system\'s picker, which is the best experience on touch devices, and works without any JavaScript state. Use `<option>` and `<optgroup>` children, and pair it with `Label` through `htmlFor`. For custom option content or a searchable list, use Select or Combobox. `className` and `style` apply to the wrapper; all other props go on the `<select>`. Styling comes from Bezel CSS variables, and the stable `tritium-native-select` class is available for overrides.',
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
      <div style={{ width: 280 }}>
        <Story />
      </div>
    ),
  ],
  render: (args) => (
    <NativeSelect {...args}>
      <option value="">Select a fruit</option>
      <option value="apple">Apple</option>
      <option value="banana">Banana</option>
      <option value="blueberry">Blueberry</option>
    </NativeSelect>
  ),
} satisfies Meta<typeof NativeSelect>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Invalid: Story = { args: { isInvalid: true } };

export const Disabled: Story = { args: { isDisabled: true } };

export const Sizes: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      {(['sm', 'default', 'lg'] as const).map((size) => (
        <NativeSelect key={size} {...args} size={size} aria-label={`Fruit ${size}`}>
          <option>Apple</option>
          <option>Banana</option>
        </NativeSelect>
      ))}
    </div>
  ),
};
