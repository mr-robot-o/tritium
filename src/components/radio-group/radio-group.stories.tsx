import type { Meta, StoryObj } from '@storybook/react-vite';
import { Controls, Description, Heading, Stories, Title } from '@storybook/addon-docs/blocks';
import { Radio, RadioGroup } from './radio-group';

const meta = {
  title: 'Components/Radio Group',
  component: RadioGroup,
  tags: ['autodocs'],
  args: { label: 'Plan', defaultValue: 'startup' },
  argTypes: {
    label: { description: 'The visible label. Without one, pass an `aria-label`.', control: 'text' },
    description: { description: 'Help text shown below the options.', control: 'text' },
    errorMessage: { description: 'Shown below the options when the group is invalid.', control: 'text' },
    orientation: { control: 'inline-radio', options: ['vertical', 'horizontal'] },
    isDisabled: { control: 'boolean' },
    isInvalid: { control: 'boolean' },
    isRequired: { control: 'boolean' },
    isReadOnly: { control: 'boolean' },
    children: { control: false },
  },
  parameters: {
    docs: {
      description: {
        component:
          'A set of mutually exclusive options, built on the React Aria `RadioGroup` and `Radio`. Arrow keys move between options and Tab leaves the group. `RadioGroup` adds the label, description and error message; each option is a `Radio`. Styling comes from Bezel CSS variables, and the stable `tritium-radio-group` and `tritium-radio` classes are available for overrides.',
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
    <RadioGroup {...args}>
      <Radio value="startup">Startup</Radio>
      <Radio value="business">Business</Radio>
      <Radio value="enterprise">Enterprise</Radio>
    </RadioGroup>
  ),
} satisfies Meta<typeof RadioGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Horizontal: Story = { args: { orientation: 'horizontal' } };

export const WithDescription: Story = {
  args: { description: 'You can change plans at any time.' },
};

export const Invalid: Story = {
  args: { isInvalid: true, defaultValue: undefined, errorMessage: 'Choose a plan.' },
};

export const Disabled: Story = { args: { isDisabled: true } };

export const OneOptionDisabled: Story = {
  render: (args) => (
    <RadioGroup {...args}>
      <Radio value="startup">Startup</Radio>
      <Radio value="business" isDisabled>Business (sold out)</Radio>
      <Radio value="enterprise">Enterprise</Radio>
    </RadioGroup>
  ),
};
