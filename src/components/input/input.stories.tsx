import type { Meta, StoryObj } from '@storybook/react-vite';
import { Controls, Description, Heading, Stories, Title } from '@storybook/addon-docs/blocks';
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
    size: {
      description:
        'The input height. `sm`, `default` and `lg` match the Button `sm`, `default` and `lg` heights.',
    },
    startContent: {
      control: false,
      description: 'Content shown inside the field before the text. Icons, text or a button.',
    },
    endContent: {
      control: false,
      description: 'Content shown inside the field after the text. Icons, text or a button.',
    },
    isDisabled: {
      control: 'boolean',
      description: 'Disables the input. Same as the native `disabled` attribute.',
    },
    isReadOnly: {
      control: 'boolean',
      description:
        'Makes the input read-only. It stays focusable but its value cannot be edited. Same as the native `readOnly` attribute.',
    },
    isInvalid: {
      control: 'boolean',
      description:
        'Marks the input as invalid. Same as `aria-invalid`. Inside a `TextField`, set `isInvalid` or use validation on the field instead.',
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
  args: { defaultValue: 'Disabled input', isDisabled: true },
};

export const ReadOnly: Story = {
  args: { defaultValue: 'Read-only input', isReadOnly: true },
};

export const Invalid: Story = {
  args: { defaultValue: 'Not valid', isInvalid: true },
  parameters: {
    docs: {
      description: {
        story: 'Tab to the field: the focus ring stays visible on top of the invalid border.',
      },
    },
  },
};

export const States: Story = {
  render: () => (
    <div style={column}>
      <Input aria-label="Default" placeholder="Default" />
      <Input aria-label="With value" defaultValue="With value" />
      <Input aria-label="Disabled" defaultValue="Disabled" isDisabled />
      <Input aria-label="Read-only" defaultValue="Read-only" isReadOnly />
      <Input aria-label="Invalid" defaultValue="Invalid" isInvalid />
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={column}>
      <Input aria-label="Small" size="sm" placeholder="Small" />
      <Input aria-label="Default" placeholder="Default" />
      <Input aria-label="Large" size="lg" placeholder="Large" />
    </div>
  ),
};

const SearchIcon = (
  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
    <circle cx="9" cy="9" r="5" />
    <path d="M13 13l4 4" />
  </svg>
);

export const WithContent: Story = {
  render: () => (
    <div style={column}>
      <Input aria-label="Search" placeholder="Search" startContent={SearchIcon} />
      <Input aria-label="Amount" defaultValue="100" startContent="$" endContent="USD" />
      <Input aria-label="Website" placeholder="example.com" startContent="https://" size="sm" />
      <Input aria-label="Search, large" placeholder="Search" startContent={SearchIcon} size="lg" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Start and end content sit inside the field border and focus ring. Clicking it focuses the input. Interactive content, such as a `Button`, keep their own click.',
      },
    },
  },
};

export const ContentStates: Story = {
  render: () => (
    <div style={column}>
      <Input aria-label="Default" placeholder="Default" startContent={SearchIcon} />
      <Input aria-label="Disabled" defaultValue="Disabled" isDisabled startContent={SearchIcon} />
      <Input aria-label="Read-only" defaultValue="Read-only" isReadOnly startContent={SearchIcon} />
      <Input aria-label="Invalid" defaultValue="Invalid" isInvalid startContent={SearchIcon} />
    </div>
  ),
};
