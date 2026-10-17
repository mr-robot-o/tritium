import type { Meta, StoryObj } from '@storybook/react-vite';
import { Controls, Description, Heading, Stories, Title } from '@storybook/addon-docs/blocks';
import { Button } from '../button/button';
import { Input } from '../input/input';
import { Kbd } from '../kbd/kbd';
import { InputGroup, InputGroupAddon } from './input-group';

const meta = {
  title: 'Components/Input Group',
  component: InputGroup,
  tags: ['autodocs'],
  args: { 'aria-label': 'Website' },
  argTypes: {
    size: { control: 'inline-radio', options: ['sm', 'default', 'lg'] },
    isDisabled: { control: 'boolean' },
    isInvalid: { control: 'boolean' },
    children: { control: false },
  },
  parameters: {
    docs: {
      description: {
        component:
          'Puts text, icons, keys or buttons inside the border of an Input, using the React Aria `Group`. The group draws the border, background and focus ring; the `Input` inside is bare. For a single icon on each side, Input\'s `startContent` and `endContent` props are simpler. Styling comes from Bezel CSS variables, and the stable `tritium-input-group` class is available for overrides.',
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
} satisfies Meta<typeof InputGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <InputGroup {...args}>
      <InputGroupAddon>https://</InputGroupAddon>
      <Input aria-label="Website" placeholder="example.com" />
    </InputGroup>
  ),
};

export const BothSides: Story = {
  render: (args) => (
    <InputGroup {...args}>
      <InputGroupAddon>$</InputGroupAddon>
      <Input aria-label="Amount" placeholder="0.00" />
      <InputGroupAddon>USD</InputGroupAddon>
    </InputGroup>
  ),
};

export const WithKeyAndButton: Story = {
  render: (args) => (
    <InputGroup {...args}>
      <Input aria-label="Search" placeholder="Search…" />
      <InputGroupAddon>
        <Kbd>⌘K</Kbd>
      </InputGroupAddon>
      <InputGroupAddon>
        <Button variant="ghost" size="xs">Go</Button>
      </InputGroupAddon>
    </InputGroup>
  ),
};

export const Sizes: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      {(['sm', 'default', 'lg'] as const).map((size) => (
        <InputGroup key={size} {...args} size={size}>
          <InputGroupAddon>https://</InputGroupAddon>
          <Input aria-label={`Website ${size}`} placeholder="example.com" />
        </InputGroup>
      ))}
    </div>
  ),
};

export const Disabled: Story = {
  render: (args) => (
    <InputGroup {...args}>
      <InputGroupAddon>https://</InputGroupAddon>
      <Input aria-label="Website" placeholder="example.com" isDisabled />
    </InputGroup>
  ),
};
