import type { Meta, StoryObj } from '@storybook/react-vite';
import { Controls, Description, Heading, Stories, Title } from '@storybook/addon-docs/blocks';
import { TextareaField } from './textarea-field';

const meta = {
  title: 'Components/Textarea Field',
  component: TextareaField,
  tags: ['autodocs'],
  args: { label: 'Message', placeholder: 'Type your message here' },
  argTypes: {
    label: { description: 'The visible label. Without one, pass an `aria-label`.', control: 'text' },
    description: { description: 'Help text shown below the textarea.', control: 'text' },
    errorMessage: { description: 'Shown below the textarea when it is invalid.', control: 'text' },
    rows: { description: 'Number of visible text lines.', control: 'number' },
    size: { control: 'inline-radio', options: ['sm', 'default', 'lg'] },
    isDisabled: { control: 'boolean' },
    isInvalid: { control: 'boolean' },
    isRequired: { control: 'boolean' },
  },
  parameters: {
    docs: {
      description: {
        component:
          'A Textarea composed with a label, description and error message, built on the React Aria `TextField`. It is the multi-line counterpart of TextField. Styling comes from Bezel CSS variables.',
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
} satisfies Meta<typeof TextareaField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithDescription: Story = {
  args: { description: 'Tell us what you think. Markdown is not supported.' },
};

export const Required: Story = { args: { isRequired: true } };

export const Invalid: Story = { args: { isInvalid: true, errorMessage: 'Enter a message.' } };

export const Disabled: Story = { args: { isDisabled: true } };
