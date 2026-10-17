import type { Meta, StoryObj } from '@storybook/react-vite';
import { Controls, Description, Heading, Stories, Title } from '@storybook/addon-docs/blocks';
import { Select, SelectItem } from './select';

const meta = {
  title: 'Components/Select',
  component: Select,
  tags: ['autodocs'],
  args: { label: 'Fruit', placeholder: 'Select a fruit' },
  argTypes: {
    label: { description: 'The visible label. Without one, pass an `aria-label`.', control: 'text' },
    description: { description: 'Help text shown below the trigger.', control: 'text' },
    errorMessage: { description: 'Shown below the trigger when it is invalid.', control: 'text' },
    placeholder: { description: 'Shown when nothing is selected.', control: 'text' },
    size: { description: 'Height and text size of the trigger, matching Input.', control: 'inline-radio', options: ['sm', 'default', 'lg'] },
    items: { control: false },
    children: { control: false },
    isDisabled: { control: 'boolean' },
    isInvalid: { control: 'boolean' },
    isRequired: { control: 'boolean' },
  },
  parameters: {
    docs: {
      description: {
        component:
          'Picks one value from a list that opens below a button, built on the React Aria `Select` with `ListBox` and `Popover`. Arrow keys, typeahead and Escape work as expected, and the value submits with a form when you set `name`. Add options with `SelectItem`. For a short list where native behavior is preferable, use Native Select; to filter a long list by typing, use Combobox. Styling comes from Bezel CSS variables, and the stable `tritium-select` class is available for overrides.',
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
      <div style={{ width: 280, minHeight: 280 }}>
        <Story />
      </div>
    ),
  ],
  render: (args) => (
    <Select {...args}>
      <SelectItem id="apple">Apple</SelectItem>
      <SelectItem id="banana">Banana</SelectItem>
      <SelectItem id="blueberry">Blueberry</SelectItem>
      <SelectItem id="grapes" isDisabled>Grapes (out of season)</SelectItem>
      <SelectItem id="pineapple">Pineapple</SelectItem>
    </Select>
  ),
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithValue: Story = { args: { defaultSelectedKey: 'banana' } };

export const WithDescription: Story = { args: { description: 'Pick your favorite.' } };

export const Invalid: Story = { args: { isInvalid: true, errorMessage: 'Choose a fruit.' } };

export const Disabled: Story = { args: { isDisabled: true } };

export const Sizes: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      {(['sm', 'default', 'lg'] as const).map((size) => (
        <Select key={size} {...args} size={size} label={undefined} aria-label={`Fruit ${size}`}>
          <SelectItem id="apple">Apple</SelectItem>
          <SelectItem id="banana">Banana</SelectItem>
        </Select>
      ))}
    </div>
  ),
};
