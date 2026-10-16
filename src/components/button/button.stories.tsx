import type { Meta, StoryObj } from '@storybook/react-vite';
import { Controls, Description, Heading, Stories, Title } from '@storybook/addon-docs/blocks';
import { Button } from './button';

const meta = {
  title: 'Components/Button',
  component: Button,
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
          'A button styled with Bezel design tokens and built on React Aria Components. React Aria provides the behavior: accessible press interactions, keyboard activation, focus management, and disabled and pending states. Colors, spacing, radius, and typography come from Bezel CSS variables. The component renders with the stable `tritium-button` class, and any `className` or `style` you pass is applied alongside it.',
      },
    },
  },
  argTypes: {
    children: {
      control: 'text',
      description: 'The button label.',
    },
    variant: {
      description:
        'The visual treatment. `primary`, `secondary`, `tertiary` and `destructive` map to the matching Bezel semantic color groups. `outline`, `ghost` and `link` use the neutral and primary tokens.',
    },
    size: {
      description:
        'The button size. The `icon` sizes are square and are meant for icon-only buttons, which need an `aria-label`.',
    },
    isDisabled: {
      control: 'boolean',
      description: 'Disables button interaction.',
    },
    isPending: {
      control: 'boolean',
      description:
        'Marks the button as pending. It stays focusable but ignores presses until the pending state ends.',
    },
    className: {
      control: false,
      description:
        'A class name, or a function of the render props, added alongside `tritium-button`.',
    },
    style: {
      control: false,
      description: 'Inline styles, or a function of the render props.',
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Button',
    onPress: () => console.log('Button pressed'),
  },
  parameters: {
    docs: {
      description: {
        story:
          'Hover, press, and use the keyboard (Tab to focus, Enter or Space to activate) to see the hover, pressed, and focus-visible states.',
      },
    },
  },
};

export const Secondary: Story = {
  args: { children: 'Secondary', variant: 'secondary' },
};

export const Tertiary: Story = {
  args: { children: 'Tertiary', variant: 'tertiary' },
};

export const Destructive: Story = {
  args: { children: 'Delete', variant: 'destructive' },
};

export const Outline: Story = {
  args: { children: 'Outline', variant: 'outline' },
};

export const Ghost: Story = {
  args: { children: 'Ghost', variant: 'ghost' },
};

export const Link: Story = {
  args: { children: 'Link', variant: 'link' },
};

export const Sizes: Story = {
  render: (args) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
      <Button {...args} size="xs">Extra small</Button>
      <Button {...args} size="sm">Small</Button>
      <Button {...args} size="default">Default</Button>
      <Button {...args} size="lg">Large</Button>
    </div>
  ),
};

export const IconSizes: Story = {
  render: (args) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
      <Button {...args} size="icon-xs" aria-label="Add item (extra small)">
        <span aria-hidden="true">+</span>
      </Button>
      <Button {...args} size="icon-sm" aria-label="Add item (small)">
        <span aria-hidden="true">+</span>
      </Button>
      <Button {...args} size="icon" aria-label="Add item">
        <span aria-hidden="true">+</span>
      </Button>
      <Button {...args} size="icon-lg" aria-label="Add item (large)">
        <span aria-hidden="true">+</span>
      </Button>
    </div>
  ),
};

export const Disabled: Story = {
  args: { children: 'Disabled button', isDisabled: true },
};

export const Loading: Story = {
  args: { children: 'Loading…', isPending: true },
};

export const WithIcon: Story = {
  args: {
    children: <><span aria-hidden="true">+</span> Add item</>,
  },
};

export const IconOnly: Story = {
  args: {
    'aria-label': 'Add item',
    size: 'icon',
    children: <span aria-hidden="true">+</span>,
  },
};
