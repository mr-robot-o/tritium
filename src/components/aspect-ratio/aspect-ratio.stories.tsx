import type { Meta, StoryObj } from '@storybook/react-vite';
import { Controls, Description, Heading, Stories, Title } from '@storybook/addon-docs/blocks';
import { AspectRatio } from './aspect-ratio';

const meta = {
  title: 'Components/Aspect Ratio',
  component: AspectRatio,
  tags: ['autodocs'],
  args: { ratio: 16 / 9 },
  argTypes: {
    ratio: {
      description: 'Width divided by height, for example `16 / 9`. Defaults to 1 (square).',
      control: { type: 'number', step: 0.1 },
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          'Keeps its content at a fixed width-to-height ratio, using the CSS `aspect-ratio` property. A child `<img>` or `<video>` fills the box and is cropped to fit. The stable `tritium-aspect-ratio` class is available for overrides.',
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
      <div style={{ width: 320 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof AspectRatio>;

export default meta;
type Story = StoryObj<typeof meta>;

const placeholder = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100%',
  background: 'var(--muted)',
  color: 'var(--muted-foreground)',
};

export const Default: Story = {
  render: (args) => (
    <AspectRatio {...args}>
      <div style={placeholder}>16:9</div>
    </AspectRatio>
  ),
};

export const Square: Story = {
  args: { ratio: 1 },
  render: (args) => (
    <AspectRatio {...args}>
      <div style={placeholder}>1:1</div>
    </AspectRatio>
  ),
};
