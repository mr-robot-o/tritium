import type { Meta, StoryObj } from '@storybook/react-vite';
import { Controls, Description, Heading, Stories, Title } from '@storybook/addon-docs/blocks';
import { Alert, AlertDescription, AlertTitle } from './alert';

const icon = (
  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
    <circle cx="8" cy="8" r="6.5" />
    <path d="M8 7.25V11M8 5v.01" strokeLinecap="round" />
  </svg>
);

const meta = {
  title: 'Components/Alert',
  component: Alert,
  tags: ['autodocs'],
  args: { icon },
  argTypes: {
    variant: {
      description: 'The intent. It colors the border and icon.',
      control: 'select',
      options: ['default', 'destructive', 'info', 'success', 'warning'],
    },
    icon: { description: 'An icon shown before the text. It is decorative.', control: false },
    role: {
      description: 'Defaults to `alert`, which interrupts screen readers. Use `status` for non-urgent messages.',
      control: 'text',
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          'A callout that draws attention to a message. It has `role="alert"` by default, which announces it right away; set `role="status"` for non-urgent information. Compose it with `AlertTitle` and `AlertDescription`. Styling comes from Bezel CSS variables, and the stable `tritium-alert` class is available for overrides.',
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
      <div style={{ width: 420 }}>
        <Story />
      </div>
    ),
  ],
  render: (args) => (
    <Alert {...args}>
      <AlertTitle>Heads up!</AlertTitle>
      <AlertDescription>You can add components to your app with the CLI.</AlertDescription>
    </Alert>
  ),
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Variants: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      {(['default', 'destructive', 'info', 'success', 'warning'] as const).map((variant) => (
        <Alert key={variant} {...args} variant={variant}>
          <AlertTitle>{variant}</AlertTitle>
          <AlertDescription>A short message for the {variant} variant.</AlertDescription>
        </Alert>
      ))}
    </div>
  ),
};

export const TitleOnly: Story = {
  render: (args) => (
    <Alert {...args} variant="success" role="status">
      <AlertTitle>Your changes were saved.</AlertTitle>
    </Alert>
  ),
};
