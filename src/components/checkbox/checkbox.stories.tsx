import type { Meta, StoryObj } from '@storybook/react-vite';
import { Controls, Description, Heading, Stories, Title } from '@storybook/addon-docs/blocks';
import { Checkbox } from './checkbox';

const meta = {
  title: 'Components/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  args: { children: 'Accept terms and conditions' },
  argTypes: {
    isSelected: { description: 'Controlled selected state.', control: 'boolean' },
    defaultSelected: { description: 'Initial selected state when uncontrolled.', control: 'boolean' },
    isIndeterminate: { description: 'Shows a mixed state. It is visual only; selection is unchanged.', control: 'boolean' },
    isDisabled: { control: 'boolean' },
    isInvalid: { control: 'boolean' },
    isReadOnly: { control: 'boolean' },
    isRequired: { control: 'boolean' },
    children: { control: 'text' },
  },
  parameters: {
    docs: {
      description: {
        component:
          'A control for toggling an option on or off, built on the React Aria `Checkbox`. Click, Space, and screen reader semantics come from React Aria. Styling comes from Bezel CSS variables, and the stable `tritium-checkbox` class is available for overrides.',
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
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Checked: Story = { args: { defaultSelected: true } };

export const Indeterminate: Story = { args: { isIndeterminate: true } };

export const Invalid: Story = { args: { isInvalid: true } };

export const States: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <Checkbox {...args}>Unchecked</Checkbox>
      <Checkbox {...args} defaultSelected>Checked</Checkbox>
      <Checkbox {...args} isIndeterminate>Indeterminate</Checkbox>
      <Checkbox {...args} isDisabled>Disabled</Checkbox>
      <Checkbox {...args} isDisabled defaultSelected>Disabled checked</Checkbox>
      <Checkbox {...args} isInvalid>Invalid</Checkbox>
    </div>
  ),
};
