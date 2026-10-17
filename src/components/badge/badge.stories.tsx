import type { Meta, StoryObj } from '@storybook/react-vite';
import { Controls, Description, Heading, Stories, Title } from '@storybook/addon-docs/blocks';
import { Badge } from './badge';

const meta = {
  title: 'Components/Badge',
  component: Badge,
  tags: ['autodocs'],
  args: { children: 'Badge' },
  argTypes: {
    variant: {
      description: 'The visual style, matching the Button variants that have a fill.',
      control: 'select',
      options: ['primary', 'secondary', 'tertiary', 'destructive', 'outline'],
    },
    children: { control: 'text' },
  },
  parameters: {
    docs: {
      description: {
        component:
          'A small label for status, counts or categories. It is a plain `<span>` and not interactive. Styling comes from Bezel CSS variables, and the stable `tritium-badge` class is available for overrides.',
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
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Variants: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
      {(['primary', 'secondary', 'tertiary', 'destructive', 'outline'] as const).map((variant) => (
        <Badge key={variant} {...args} variant={variant}>
          {variant}
        </Badge>
      ))}
    </div>
  ),
};

export const WithIcon: Story = {
  render: (args) => (
    <Badge {...args} variant="secondary">
      <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <path d="M3 8.5l3.5 3.5L13 4.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      Verified
    </Badge>
  ),
};
