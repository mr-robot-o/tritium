import type { Meta, StoryObj } from '@storybook/react-vite';
import { Controls, Description, Heading, Stories, Title } from '@storybook/addon-docs/blocks';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './carousel';

const slide = (n: number) => (
  <div
    style={{
      display: 'flex',
      aspectRatio: '1 / 1',
      alignItems: 'center',
      justifyContent: 'center',
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius-lg)',
      background: 'var(--card)',
      color: 'var(--card-foreground)',
      fontSize: 36,
      fontWeight: 600,
    }}
  >
    {n}
  </div>
);

const slides = [1, 2, 3, 4, 5];

const meta = {
  title: 'Components/Carousel',
  component: Carousel,
  tags: ['autodocs'],
  argTypes: {
    orientation: { control: 'inline-radio', options: ['horizontal', 'vertical'] },
    opts: { control: 'object', description: 'Embla options, for example `{ loop: true }`.' },
  },
  parameters: {
    docs: {
      description: {
        component:
          'A swipeable set of slides, built on Embla Carousel. Drag, swipe or use the arrow buttons; Left and Right (Up and Down when vertical) scroll while it has focus. Pass Embla `opts` and `plugins` for looping, alignment or autoplay, and `setApi` to control it from outside. A vertical carousel needs a height: it defaults to 16rem, and `--tritium-carousel-vertical-height` changes it. Styling comes from Bezel CSS variables, and the stable `tritium-carousel` class is available for overrides.',
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
      <div style={{ width: 240, margin: '0 64px' }}>
        <Story />
      </div>
    ),
  ],
  args: { 'aria-label': 'Numbers' },
  render: (args) => (
    <Carousel {...args}>
      <CarouselContent>
        {slides.map((n) => (
          <CarouselItem key={n}>{slide(n)}</CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  ),
} satisfies Meta<typeof Carousel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Loop: Story = { args: { opts: { loop: true } } };

export const Vertical: Story = {
  args: { orientation: 'vertical' },
  decorators: [
    (Story) => (
      // One 240px square slide is visible at a time.
      <div
        style={{ width: 240, margin: '64px 0', '--tritium-carousel-vertical-height': '240px' } as React.CSSProperties}
      >
        <Story />
      </div>
    ),
  ],
};

export const MultipleVisible: Story = {
  args: { opts: { align: 'start' } },
  decorators: [
    (Story) => (
      <div style={{ width: 400, margin: '0 64px' }}>
        <Story />
      </div>
    ),
  ],
  render: (args) => (
    <Carousel {...args}>
      <CarouselContent>
        {slides.map((n) => (
          <CarouselItem key={n} className="" style={{ flexBasis: '50%' }}>
            {slide(n)}
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  ),
};
