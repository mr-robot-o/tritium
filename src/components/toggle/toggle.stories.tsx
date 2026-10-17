import type { Meta, StoryObj } from '@storybook/react-vite';
import { Controls, Description, Heading, Stories, Title } from '@storybook/addon-docs/blocks';
import { Toggle } from './toggle';

const boldIcon = (
  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <path d="M4 3h4.5a2.5 2.5 0 0 1 0 5H4zM4 8h5.5a2.5 2.5 0 0 1 0 5H4z" strokeLinejoin="round" />
  </svg>
);

const meta = {
  title: 'Components/Toggle',
  component: Toggle,
  tags: ['autodocs'],
  args: { children: 'Bold' },
  argTypes: {
    variant: { control: 'inline-radio', options: ['default', 'outline'] },
    size: { control: 'inline-radio', options: ['sm', 'default', 'lg'] },
    isIconOnly: { description: 'Renders a square toggle for a single icon.', control: 'boolean' },
    isSelected: { description: 'Controlled pressed state.', control: 'boolean' },
    defaultSelected: { description: 'Initial pressed state when uncontrolled.', control: 'boolean' },
    isDisabled: { control: 'boolean' },
    children: { control: 'text' },
  },
  parameters: {
    docs: {
      description: {
        component:
          'A two-state button that can be on or off, built on the React Aria `ToggleButton` (`aria-pressed`). Use a ToggleGroup for related toggles. Styling comes from Bezel CSS variables, and the stable `tritium-toggle` class is available for overrides.',
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
} satisfies Meta<typeof Toggle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Outline: Story = { args: { variant: 'outline' } };

export const Pressed: Story = { args: { defaultSelected: true } };

export const IconOnly: Story = {
  args: { isIconOnly: true, children: boldIcon, 'aria-label': 'Toggle bold' },
};

export const WithIcon: Story = {
  args: { children: <>{boldIcon}Bold</> },
};

export const Sizes: Story = {
  render: (args) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <Toggle {...args} variant="outline" size="sm" />
      <Toggle {...args} variant="outline" size="default" />
      <Toggle {...args} variant="outline" size="lg" />
    </div>
  ),
};

export const Disabled: Story = { args: { isDisabled: true } };
