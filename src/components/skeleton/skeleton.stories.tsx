import type { Meta, StoryObj } from '@storybook/react-vite';
import { Controls, Description, Heading, Stories, Title } from '@storybook/addon-docs/blocks';
import { Skeleton } from './skeleton';

const meta = {
  title: 'Components/Skeleton',
  component: Skeleton,
  tags: ['autodocs'],
  argTypes: {
    shape: {
      description: 'Rectangle (rounded) or circle.',
      control: 'inline-radio',
      options: ['rectangle', 'circle'],
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          'A pulsing placeholder shown while content loads. It is hidden from assistive technology, so mark the loading region with `aria-busy` on its container. The pulse stops for users who prefer reduced motion. Styling comes from Bezel CSS variables, and the stable `tritium-skeleton` class is available for overrides.',
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
} satisfies Meta<typeof Skeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const CardPlaceholder: Story = {
  render: () => (
    <div aria-busy="true" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <Skeleton shape="circle" style={{ width: 48, height: 48 }} />
      <div style={{ display: 'flex', flex: 1, flexDirection: 'column', gap: 8 }}>
        <Skeleton />
        <Skeleton style={{ width: '70%' }} />
      </div>
    </div>
  ),
};
