import type { Meta, StoryObj } from '@storybook/react-vite';
import { Controls, Description, Heading, Stories, Title } from '@storybook/addon-docs/blocks';
import { Button } from '../button/button';
import { TextField } from '../text-field/text-field';
import { Form } from './form';

const meta = {
  title: 'Components/Form',
  component: Form,
  tags: ['autodocs'],
  argTypes: {
    validationBehavior: {
      description:
        '`native` blocks submission and shows the browser message; `aria` validates as the user types and shows the component\'s own error.',
      control: 'inline-radio',
      options: ['native', 'aria'],
    },
    children: { control: false },
  },
  parameters: {
    docs: {
      description: {
        component:
          'A form container, built on the React Aria `Form`. It passes validation behavior and server errors (`validationErrors`) down to the fields inside it, and stacks them with consistent spacing. Styling comes from Bezel CSS variables, and the stable `tritium-form` class is available for overrides.',
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
} satisfies Meta<typeof Form>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <Form {...args} onSubmit={(event) => event.preventDefault()}>
      <TextField label="Email" name="email" type="email" isRequired />
      <TextField label="Password" name="password" type="password" isRequired />
      <Button type="submit">Sign in</Button>
    </Form>
  ),
};

export const ServerErrors: Story = {
  args: { validationErrors: { email: 'That email is already registered.' } },
  render: (args) => (
    <Form {...args}>
      <TextField label="Email" name="email" type="email" defaultValue="ada@example.com" />
      <Button type="submit">Create account</Button>
    </Form>
  ),
};
