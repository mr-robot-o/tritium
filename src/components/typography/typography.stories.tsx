import type { Meta, StoryObj } from '@storybook/react-vite';
import { Controls, Description, Heading, Stories, Title } from '@storybook/addon-docs/blocks';
import { Typography } from './typography';

const variants = [
  'h1',
  'h2',
  'h3',
  'h4',
  'p',
  'lead',
  'large',
  'small',
  'muted',
  'blockquote',
  'code',
] as const;

const meta = {
  title: 'Components/Typography',
  component: Typography,
  tags: ['autodocs'],
  args: { children: 'The quick brown fox jumps over the lazy dog' },
  argTypes: {
    variant: {
      description: 'The text style. It also picks the default element.',
      control: 'select',
      options: variants,
    },
    as: {
      description: 'Renders a different element than the variant default.',
      control: false,
    },
    children: { control: 'text' },
  },
  parameters: {
    docs: {
      description: {
        component:
          'Text styles for headings, body copy, quotes and inline code, drawn from the Bezel typography tokens. Each variant renders a sensible HTML element; use `as` to keep the look but change the element, so the document outline stays correct. The stable `tritium-typography` class is available for overrides.',
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
} satisfies Meta<typeof Typography>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Variants: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {variants.map((variant) => (
        <Typography key={variant} {...args} variant={variant} />
      ))}
    </div>
  ),
};

export const ElementOverride: Story = {
  render: (args) => (
    <Typography {...args} variant="h4" as="h2" />
  ),
  parameters: {
    docs: { description: { story: 'An `h2` element that is styled like an `h4`.' } },
  },
};
