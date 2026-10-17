import type { Meta, StoryObj } from '@storybook/react-vite';
import { Description, Heading, Controls, Stories, Title } from '@storybook/addon-docs/blocks';
import { Spinner } from './spinner';

const meta = {
  title: 'Components/Spinner',
  component: Spinner,
  tags: ['autodocs'],
  argTypes: {
    label: {
      description:
        'Accessible label announced to screen readers. Pass `null` when the spinner is decorative.',
      control: 'text',
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          'An indeterminate loading indicator. It is 1em square and draws in the current text color, so it scales and recolors with its surroundings. Styling comes from Bezel CSS variables, and the stable `tritium-spinner` class is available for overrides.',
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
} satisfies Meta<typeof Spinner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Sizes: Story = {
  render: (args) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
      {['12px', '15px', '24px', '38px'].map((size) => (
        <span key={size} style={{ fontSize: size }}>
          <Spinner {...args} />
        </span>
      ))}
    </div>
  ),
  parameters: {
    docs: { description: { story: 'The spinner follows the font size of its parent.' } },
  },
};

export const Decorative: Story = {
  args: { label: null },
  parameters: {
    docs: {
      description: {
        story: 'With `label={null}` the spinner is hidden from assistive technology.',
      },
    },
  },
};
