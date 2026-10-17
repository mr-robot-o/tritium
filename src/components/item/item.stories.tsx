import type { Meta, StoryObj } from '@storybook/react-vite';
import { Controls, Description, Heading, Stories, Title } from '@storybook/addon-docs/blocks';
import { Button } from '../button/button';
import { Item, ItemActions, ItemContent, ItemDescription, ItemGroup, ItemMedia, ItemTitle } from './item';

const icon = (
  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
    <path d="M8 1.5l5.5 2v4c0 3-2.3 5.4-5.5 7-3.2-1.6-5.5-4-5.5-7v-4z" strokeLinejoin="round" />
  </svg>
);

const meta = {
  title: 'Components/Item',
  component: Item,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'inline-radio', options: ['default', 'outline', 'muted'] },
    size: { control: 'inline-radio', options: ['default', 'sm'] },
    children: { control: false },
  },
  parameters: {
    docs: {
      description: {
        component:
          'A flexible row that pairs content with optional media and actions, for list entries, settings and notices. Compose it from `ItemMedia`, `ItemContent` (with `ItemTitle` and `ItemDescription`) and `ItemActions`. Styling comes from Bezel CSS variables, and the stable `tritium-item` class is available for overrides.',
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
    <Item {...args}>
      <ItemMedia variant="icon">{icon}</ItemMedia>
      <ItemContent>
        <ItemTitle>Security alerts</ItemTitle>
        <ItemDescription>Get notified about sign-ins from new devices.</ItemDescription>
      </ItemContent>
      <ItemActions>
        <Button variant="outline" size="sm">Manage</Button>
      </ItemActions>
    </Item>
  ),
} satisfies Meta<typeof Item>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Outline: Story = { args: { variant: 'outline' } };

export const Muted: Story = { args: { variant: 'muted' } };

export const Small: Story = { args: { variant: 'outline', size: 'sm' } };

export const Group: Story = {
  render: (args) => (
    <ItemGroup>
      {['Profile', 'Billing', 'Team'].map((name) => (
        <Item key={name} {...args} role="listitem">
          <ItemContent>
            <ItemTitle>{name}</ItemTitle>
            <ItemDescription>Manage your {name.toLowerCase()} settings.</ItemDescription>
          </ItemContent>
        </Item>
      ))}
    </ItemGroup>
  ),
};
