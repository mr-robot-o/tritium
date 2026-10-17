import type { Meta, StoryObj } from '@storybook/react-vite';
import { Controls, Description, Heading, Stories, Title } from '@storybook/addon-docs/blocks';
import { Switch } from './switch';

const meta = {
  title: 'Components/Switch',
  component: Switch,
  tags: ['autodocs'],
  args: { children: 'Airplane mode' },
  argTypes: {
    size: { description: 'Track and thumb size.', control: 'inline-radio', options: ['sm', 'default'] },
    isSelected: { description: 'Controlled on/off state.', control: 'boolean' },
    defaultSelected: { description: 'Initial state when uncontrolled.', control: 'boolean' },
    isDisabled: { control: 'boolean' },
    isReadOnly: { control: 'boolean' },
    children: { control: 'text' },
  },
  parameters: {
    docs: {
      description: {
        component:
          'A control for turning a setting on or off immediately, built on the React Aria `Switch` (role `switch`). Use a Checkbox instead when the choice is submitted with a form. Styling comes from Bezel CSS variables, and the stable `tritium-switch` class is available for overrides.',
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
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const On: Story = { args: { defaultSelected: true } };

export const Disabled: Story = { args: { isDisabled: true } };

export const Sizes: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <Switch {...args} size="sm">Small</Switch>
      <Switch {...args} size="default">Default</Switch>
      <Switch {...args} size="sm" defaultSelected>Small on</Switch>
      <Switch {...args} size="default" defaultSelected>Default on</Switch>
    </div>
  ),
};
