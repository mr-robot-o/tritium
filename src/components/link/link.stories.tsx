import type { Meta, StoryObj } from '@storybook/react-vite';
import { Controls, Description, Heading, Stories, Title } from '@storybook/addon-docs/blocks';
import { Link } from './link';

const meta = {
  title: 'Components/Link',
  component: Link,
  tags: ['autodocs'],
  args: { href: '#', children: 'Read the documentation' },
  argTypes: {
    variant: {
      description: '`muted` is quieter and underlines only on hover.',
      control: 'inline-radio',
      options: ['default', 'muted'],
    },
    href: { control: 'text' },
    isDisabled: { control: 'boolean' },
    children: { control: 'text' },
  },
  parameters: {
    docs: {
      description: {
        component:
          'A link to another page or place, built on the React Aria `Link`. With an `href` it renders an `<a>`; without one it renders a `<span role="link">` for custom routing. It inherits the surrounding font. For a link that looks like a button, use Button. Styling comes from Bezel CSS variables, and the stable `tritium-link` class is available for overrides.',
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
} satisfies Meta<typeof Link>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Muted: Story = { args: { variant: 'muted' } };

export const Disabled: Story = { args: { isDisabled: true } };

export const InText: Story = {
  render: (args) => (
    <p style={{ maxWidth: 360, margin: 0 }}>
      Tritium is built on React Aria. See the <Link {...args}>component docs</Link> for details.
    </p>
  ),
};
