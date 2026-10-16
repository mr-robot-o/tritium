import type { Meta, StoryObj } from '@storybook/react-vite';
import { Controls, Description, Heading, Stories, Title } from '@storybook/addon-docs/blocks';
import { FieldError, Label, Text, TextField } from 'react-aria-components';
import { Input } from './input';

const meta = {
  title: 'Components/Input',
  component: Input,
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
          'A text input built on React Aria Components. React Aria provides the behavior: hover and focus-visible tracking and form integration. Colors, spacing, radius, and typography come from Bezel CSS variables. The component renders with the stable `tritium-input` class, and any `className` or `style` you pass is applied alongside it. Used on its own, give it an `aria-label`. Inside a `TextField` it is labelled by the field.',
      },
    },
  },
  argTypes: {
    placeholder: {
      control: 'text',
      description: 'Temporary text shown when the input is empty.',
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the input.',
    },
    readOnly: {
      control: 'boolean',
      description: 'Makes the input read-only. It stays focusable but its value cannot be edited.',
    },
    'aria-invalid': {
      control: 'boolean',
      description: 'Marks the input as invalid. Inside a `TextField`, use `isInvalid` or validation instead.',
    },
    className: {
      control: false,
      description:
        'A class name, or a function of the render props, added alongside `tritium-input`.',
    },
    style: {
      control: false,
      description: 'Inline styles, or a function of the render props.',
    },
  },
  args: {
    'aria-label': 'Example input',
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

const column = { display: 'flex', flexDirection: 'column', gap: 24, width: 320 } as const;

export const Default: Story = {
  args: { placeholder: 'Placeholder text' },
  parameters: {
    docs: {
      description: {
        story:
          'Hover, and Tab to focus, to see the hover and focus-visible states.',
      },
    },
  },
};

export const WithValue: Story = {
  args: { defaultValue: 'Entered text' },
};

export const Disabled: Story = {
  args: { defaultValue: 'Disabled input', disabled: true },
};

export const ReadOnly: Story = {
  args: { defaultValue: 'Read-only input', readOnly: true },
};

export const Invalid: Story = {
  args: { defaultValue: 'Not valid', 'aria-invalid': true },
  parameters: {
    docs: {
      description: {
        story: 'Tab to the field: the focus ring stays visible on top of the invalid border.',
      },
    },
  },
};

export const WithLabel: Story = {
  render: () => (
    <TextField className="tritium-field" style={{ width: 320 }}>
      <Label className="tritium-field__label">Email</Label>
      <Input placeholder="you@example.com" />
    </TextField>
  ),
};

export const WithDescription: Story = {
  render: () => (
    <TextField className="tritium-field" style={{ width: 320 }}>
      <Label className="tritium-field__label">Username</Label>
      <Input placeholder="username" />
      <Text slot="description" className="tritium-field__description">
        Letters and numbers only.
      </Text>
    </TextField>
  ),
};

export const WithError: Story = {
  render: () => (
    <TextField
      className="tritium-field"
      style={{ width: 320 }}
      isInvalid
      defaultValue="not-an-email"
    >
      <Label className="tritium-field__label">Email</Label>
      <Input />
      <FieldError className="tritium-field__error">Enter a valid email address.</FieldError>
    </TextField>
  ),
};

export const States: Story = {
  render: () => (
    <div style={column}>
      <Input aria-label="Default" placeholder="Default" />
      <Input aria-label="With value" defaultValue="With value" />
      <Input aria-label="Disabled" defaultValue="Disabled" disabled />
      <Input aria-label="Read-only" defaultValue="Read-only" readOnly />
      <Input aria-label="Invalid" defaultValue="Invalid" aria-invalid="true" />
    </div>
  ),
};
