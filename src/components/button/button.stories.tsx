import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from './button';

const meta = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'An unstyled button built on React Aria. Supports accessible press interactions, keyboard activation, and disabled states.',
      },
    },
  },
  argTypes: {
    children: {
      control: 'text',
      description: 'The button label.',
    },
    isDisabled: {
      control: 'boolean',
      description: 'Disables button interaction.',
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
    children: <span aria-hidden="true">+</span>,
  },
};