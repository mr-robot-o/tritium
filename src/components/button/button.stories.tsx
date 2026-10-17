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
        'The button size. Combine with `isIconOnly` for a square button of the same height.',
    },
    startContent: {
      control: false,
      description: 'Content shown before the label, usually an icon. While the button is pending, the spinner replaces it.',
    },
    endContent: {
      control: false,
      description: 'Content shown after the label, usually an icon.',
    },
    isIconOnly: {
      control: 'boolean',
      description: 'Renders a square button for a single icon. It needs an `aria-label`.',
    },
    isFullWidth: {
      control: 'boolean',
      description: 'Stretches the button to the full width of its container.',
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
      <Button {...args} isIconOnly size="xs" aria-label="Add item (extra small)">
        <span aria-hidden="true">+</span>
      </Button>
      <Button {...args} isIconOnly size="sm" aria-label="Add item (small)">
        <span aria-hidden="true">+</span>
      </Button>
      <Button {...args} isIconOnly aria-label="Add item">
        <span aria-hidden="true">+</span>
      </Button>
      <Button {...args} isIconOnly size="lg" aria-label="Add item (large)">
        <span aria-hidden="true">+</span>
      </Button>
    </div>
  ),
};

const variants = ['primary', 'secondary', 'tertiary', 'destructive', 'outline', 'ghost', 'link'] as const;

export const Disabled: Story = {
  args: { children: 'Disabled', isDisabled: true },
  render: (args) => (
    <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 16 }}>
      {variants.map((variant) => (
        <Button key={variant} {...args} variant={variant} />
      ))}
    </div>
  ),
};

export const Loading: Story = {
  args: { children: 'Saving', isPending: true },
  render: (args) => (
    <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 16 }}>
      {variants.map((variant) => (
        <Button key={variant} {...args} variant={variant} />
      ))}
    </div>
  ),
};

const PlusIcon = (
  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <path d="M10 4v12M4 10h12" />
  </svg>
);

const ArrowIcon = (
  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 10h12M11 5l5 5-5 5" />
  </svg>
);

export const WithIcons: Story = {
  render: (args) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
      <Button {...args} startContent={PlusIcon}>Add item</Button>
      <Button {...args} endContent={ArrowIcon}>Continue</Button>
      <Button {...args} startContent={PlusIcon} endContent={ArrowIcon}>Both</Button>
      <Button {...args} startContent={PlusIcon} isPending>Pending</Button>
    </div>
  ),
};

export const IconOnly: Story = {
  args: {
    'aria-label': 'Add item',
    isIconOnly: true,
    children: PlusIcon,
  },
};

export const FullWidth: Story = {
  args: { children: 'Full width', isFullWidth: true },
  decorators: [
    (Story) => (
      <div style={{ width: 320 }}>
        <Story />
      </div>
    ),
  ],
};
