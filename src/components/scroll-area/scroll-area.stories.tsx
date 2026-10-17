import type { Meta, StoryObj } from '@storybook/react-vite';
import { Controls, Description, Heading, Stories, Title } from '@storybook/addon-docs/blocks';
import { ScrollArea } from './scroll-area';

const tags = Array.from({ length: 40 }, (_, index) => `v1.2.${40 - index}-beta`);

const meta = {
  title: 'Components/Scroll Area',
  component: ScrollArea,
  tags: ['autodocs'],
  args: { 'aria-label': 'Release tags' },
  argTypes: {
    orientation: { control: 'inline-radio', options: ['vertical', 'horizontal', 'both'] },
  },
  parameters: {
    docs: {
      description: {
        component:
          'A region that scrolls its content with a slim, themed scrollbar. It uses the browser\'s native scrolling, so touch, wheel and keyboard behave as expected, and it is focusable so keyboard users can scroll with the arrow keys. Set a height (or width) on it. Styling comes from Bezel CSS variables, and the stable `tritium-scroll-area` class is available for overrides.',
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
} satisfies Meta<typeof ScrollArea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <ScrollArea
      {...args}
      style={{ width: 240, height: 200, border: '1px solid var(--border)', borderRadius: 8 }}
    >
      <div style={{ padding: 16 }}>
        {tags.map((tag) => (
          <div key={tag} style={{ padding: '6px 0', borderBottom: '1px solid var(--border)' }}>
            {tag}
          </div>
        ))}
      </div>
    </ScrollArea>
  ),
};

export const Horizontal: Story = {
  args: { orientation: 'horizontal', 'aria-label': 'Gallery' },
  render: (args) => (
    <ScrollArea
      {...args}
      style={{ width: 320, border: '1px solid var(--border)', borderRadius: 8 }}
    >
      <div style={{ display: 'flex', gap: 12, padding: 16, width: 'max-content' }}>
        {Array.from({ length: 12 }, (_, index) => (
          <div
            key={index}
            style={{ width: 96, height: 96, borderRadius: 8, background: 'var(--muted)' }}
          />
        ))}
      </div>
    </ScrollArea>
  ),
};
