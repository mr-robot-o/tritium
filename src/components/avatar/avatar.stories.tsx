import type { Meta, StoryObj } from '@storybook/react-vite';
import { Controls, Description, Heading, Stories, Title } from '@storybook/addon-docs/blocks';
import { Avatar } from './avatar';

// A tiny inline image so the stories don't depend on the network.
const image =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40"><rect width="40" height="40" fill="#6d4fd6"/><circle cx="20" cy="16" r="7" fill="#fff"/><path d="M6 40a14 14 0 0 1 28 0z" fill="#fff"/></svg>',
  );

const meta = {
  title: 'Components/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  args: { src: image, alt: 'Ada Lovelace', fallback: 'AL' },
  argTypes: {
    src: { description: 'Image URL. If it is missing or fails to load, the fallback is shown.', control: 'text' },
    alt: { description: 'Alternative text for the image. Also names the fallback.', control: 'text' },
    fallback: { description: 'Shown when there is no image, usually initials or an icon.', control: false },
    size: {
      control: 'inline-radio',
      options: ['sm', 'default', 'lg'],
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          'A circular user image that falls back to initials or an icon when the image is missing or fails to load. Styling comes from Bezel CSS variables, and the stable `tritium-avatar` class is available for overrides.',
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
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Fallback: Story = {
  args: { src: undefined },
  parameters: { docs: { description: { story: 'Without an image, the fallback is shown.' } } },
};

export const BrokenImage: Story = {
  args: { src: 'https://invalid.invalid/missing.png' },
  parameters: { docs: { description: { story: 'A failed load switches to the fallback.' } } },
};

export const Sizes: Story = {
  render: (args) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <Avatar {...args} size="sm" />
      <Avatar {...args} size="default" />
      <Avatar {...args} size="lg" />
      <Avatar {...args} size="sm" src={undefined} />
      <Avatar {...args} size="default" src={undefined} />
      <Avatar {...args} size="lg" src={undefined} />
    </div>
  ),
};
