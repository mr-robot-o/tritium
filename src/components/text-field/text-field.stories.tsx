import type { Meta, StoryObj } from '@storybook/react-vite';
import { Controls, Description, Heading, Stories, Title } from '@storybook/addon-docs/blocks';
import { TextField } from './text-field';

const meta = {
  title: 'Components/Text Field',
  component: TextField,
  tags: ['autodocs'],
  parameters: {
    docs: {
      // Examples first, then the props table (autodocs puts the props table first).
      page: () => (
        <>
          <Title />
          <Description />
          <Stories title="Examples" includePrimary />
          <Heading>Props</Heading>
          <Controls />
        </>
      ),
      description: {
        component:
          'A labelled text field: a label, an `Input`, help text and an error message, wired together with React Aria Components so the label, description and error are announced with the input. Validation props such as `isRequired`, `isInvalid` and `validate` come from React Aria. The component renders with the stable `tritium-field` class.',
      },
    },
  },
  argTypes: {
    label: { control: 'text', description: 'The visible label. Without one, pass an `aria-label`.' },
    description: { control: 'text', description: 'Help text shown below the input.' },
    errorMessage: {
      control: 'text',
      description:
        'Shown below the input when it is invalid. A function receives the validation result.',
    },
    placeholder: { control: 'text', description: 'Temporary text shown when the input is empty.' },
    size: { description: 'The input height, matching the Button heights.' },
    startContent: { control: false, description: 'Content shown inside the field before the text.' },
    endContent: { control: false, description: 'Content shown inside the field after the text.' },
    isDisabled: { control: 'boolean', description: 'Disables the field.' },
    isReadOnly: { control: 'boolean', description: 'Makes the field read-only.' },
    isRequired: { control: 'boolean', description: 'Requires a value and shows a required marker on the label.' },
    isInvalid: { control: 'boolean', description: 'Marks the field as invalid.' },
    className: { control: false, description: 'A class name, or a function of the render props, added alongside `tritium-field`.' },
  },
  args: {
    label: 'Email',
    placeholder: 'you@example.com',
  },
  decorators: [
    (Story) => (
      <div style={{ width: 320 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof TextField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithDescription: Story = {
  args: { label: 'Username', placeholder: 'username', description: 'Letters and numbers only.' },
};

export const Required: Story = {
  args: { isRequired: true },
};

export const WithError: Story = {
  args: {
    isInvalid: true,
    defaultValue: 'not-an-email',
    errorMessage: 'Enter a valid email address.',
  },
};

export const Validation: Story = {
  args: {
    type: 'email',
    isRequired: true,
    description: 'Submit the empty or invalid form to see the error.',
    errorMessage: ({ validationDetails }) =>
      validationDetails.valueMissing ? 'Email is required.' : 'Enter a valid email address.',
  },
  render: (args) => (
    <form onSubmit={(e) => e.preventDefault()} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <TextField {...args} />
      <button type="submit" style={{ alignSelf: 'start' }}>Submit</button>
    </form>
  ),
};

export const Disabled: Story = {
  args: { isDisabled: true, defaultValue: 'Disabled' },
};

export const ReadOnly: Story = {
  args: { isReadOnly: true, defaultValue: 'Read-only' },
};

export const Sizes: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <TextField {...args} size="sm" label="Small" />
      <TextField {...args} label="Default" />
      <TextField {...args} size="lg" label="Large" />
    </div>
  ),
};

export const WithContent: Story = {
  args: { label: 'Amount', placeholder: '0.00', startContent: '$', endContent: 'USD' },
};
