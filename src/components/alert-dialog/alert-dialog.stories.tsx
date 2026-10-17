import type { Meta, StoryObj } from '@storybook/react-vite';
import { Controls, Description, Heading, Stories, Title } from '@storybook/addon-docs/blocks';
import { Button } from '../button/button';
import { DialogTrigger } from '../dialog/dialog';
import { AlertDialog } from './alert-dialog';

const meta = {
  title: 'Components/Alert Dialog',
  component: AlertDialog,
  tags: ['autodocs'],
  args: {
    title: 'Are you absolutely sure?',
    children: 'This action cannot be undone. This will permanently delete your account.',
    confirmLabel: 'Continue',
  },
  argTypes: {
    title: { description: 'What is being asked.', control: 'text' },
    children: { description: 'An explanation of the consequences.', control: 'text' },
    confirmLabel: { control: 'text' },
    cancelLabel: { control: 'text' },
    variant: { description: '`destructive` styles the confirm button for actions that can\'t be undone.', control: 'inline-radio', options: ['default', 'destructive'] },
    onConfirm: { description: 'Called when the user confirms.' },
    onCancel: { description: 'Called when the user cancels or presses Escape.' },
  },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A dialog that interrupts the user to confirm an action, built on the React Aria `Dialog` with `role="alertdialog"`. Unlike Dialog it can not be dismissed by clicking outside, and focus starts on the Cancel button so a stray Enter does not confirm. Use it inside a `DialogTrigger`. Styling comes from Bezel CSS variables.',
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
    <DialogTrigger>
      <Button variant={args.variant === 'destructive' ? 'destructive' : 'outline'}>Delete account</Button>
      <AlertDialog {...args} />
    </DialogTrigger>
  ),
} satisfies Meta<typeof AlertDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Destructive: Story = {
  args: { variant: 'destructive', confirmLabel: 'Delete account' },
};
