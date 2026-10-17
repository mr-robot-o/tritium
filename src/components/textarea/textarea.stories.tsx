import type { Meta, StoryObj } from '@storybook/react-vite';
import { Controls, Description, Heading, Stories, Title } from '@storybook/addon-docs/blocks';
import { Textarea } from './textarea';

const meta = {
  title: 'Components/Textarea',
  component: Textarea,
  tags: ['autodocs'],
  args: { placeholder: 'Type your message here', 'aria-label': 'Message' },
  argTypes: {
    size: {
      description: 'Text size and padding, matching Input.',
      control: 'inline-radio',
      options: ['sm', 'default', 'lg'],
    },
    isDisabled: { description: 'Disables the textarea.', control: 'boolean' },
    isReadOnly: { description: 'Makes the textarea read-only.', control: 'boolean' },
    isInvalid: { description: 'Marks the textarea as invalid.', control: 'boolean' },
    placeholder: { control: 'text' },
  },
  parameters: {
    docs: {
      description: {
        component:
          'A multi-line text input, built on the React Aria `TextArea`. It looks and behaves like Input and grows vertically when dragged. For a label, description and error message, use `TextareaField`. Styling comes from Bezel CSS variables, and the stable `tritium-textarea` class is available for overrides.',
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
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Disabled: Story = { args: { isDisabled: true } };

export const ReadOnly: Story = { args: { isReadOnly: true, defaultValue: 'Read-only content' } };

export const Invalid: Story = { args: { isInvalid: true } };

export const Sizes: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <Textarea {...args} size="sm" />
      <Textarea {...args} size="default" />
      <Textarea {...args} size="lg" />
    </div>
  ),
};
