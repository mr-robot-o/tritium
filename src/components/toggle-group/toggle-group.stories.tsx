import type { Meta, StoryObj } from '@storybook/react-vite';
import { Controls, Description, Heading, Stories, Title } from '@storybook/addon-docs/blocks';
import { Toggle } from '../toggle/toggle';
import { ToggleGroup } from './toggle-group';

const meta = {
  title: 'Components/Toggle Group',
  component: ToggleGroup,
  tags: ['autodocs'],
  args: { 'aria-label': 'Text formatting', selectionMode: 'multiple' },
  argTypes: {
    variant: { control: 'inline-radio', options: ['default', 'outline'] },
    size: { control: 'inline-radio', options: ['sm', 'default', 'lg'] },
    selectionMode: {
      description: '`single` allows one pressed toggle, `multiple` allows any number.',
      control: 'inline-radio',
      options: ['single', 'multiple'],
    },
    orientation: { control: 'inline-radio', options: ['horizontal', 'vertical'] },
    isDisabled: { control: 'boolean' },
    children: { control: false },
  },
  parameters: {
    docs: {
      description: {
        component:
          'A set of related toggles joined into one control, built on the React Aria `ToggleButtonGroup`. The group sets the variant and size of its `Toggle` children, manages single or multiple selection, and supports arrow-key navigation. Styling comes from Bezel CSS variables, and the stable `tritium-toggle-group` class is available for overrides.',
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
  render: (args) => (
    <ToggleGroup {...args}>
      <Toggle id="bold">Bold</Toggle>
      <Toggle id="italic">Italic</Toggle>
      <Toggle id="underline">Underline</Toggle>
    </ToggleGroup>
  ),
} satisfies Meta<typeof ToggleGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Outline: Story = { args: { variant: 'outline' } };

export const SingleSelection: Story = {
  args: { variant: 'outline', selectionMode: 'single', defaultSelectedKeys: ['left'] },
  render: (args) => (
    <ToggleGroup {...args} aria-label="Alignment">
      <Toggle id="left">Left</Toggle>
      <Toggle id="center">Center</Toggle>
      <Toggle id="right">Right</Toggle>
    </ToggleGroup>
  ),
};

export const Vertical: Story = { args: { variant: 'outline', orientation: 'vertical' } };

export const Sizes: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 12 }}>
      {(['sm', 'default', 'lg'] as const).map((size) => (
        <ToggleGroup key={size} {...args} variant="outline" size={size}>
          <Toggle id="bold">Bold</Toggle>
          <Toggle id="italic">Italic</Toggle>
          <Toggle id="underline">Underline</Toggle>
        </ToggleGroup>
      ))}
    </div>
  ),
};

export const Disabled: Story = { args: { variant: 'outline', isDisabled: true } };
