import type { Meta, StoryObj } from '@storybook/react-vite';
import { Controls, Description, Heading, Stories, Title } from '@storybook/addon-docs/blocks';
import { Button } from '../button/button';
import { TextField } from '../text-field/text-field';
import { Dialog, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './dialog';

const meta = {
  title: 'Components/Dialog',
  component: Dialog,
  tags: ['autodocs'],
  args: { size: 'default', children: null },
  argTypes: {
    size: { description: 'Width of the dialog.', control: 'inline-radio', options: ['sm', 'default', 'lg'] },
    isDismissable: { description: 'Whether clicking outside closes it.', control: 'boolean' },
    isKeyboardDismissDisabled: { description: 'Stops Escape from closing it.', control: 'boolean' },
    isOpen: { description: 'Controlled open state. Not needed inside a `DialogTrigger`.', control: 'boolean' },
    defaultOpen: { control: 'boolean' },
    children: { control: false },
  },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A modal window that interrupts the page for a focused task, built on the React Aria `Modal` and `Dialog`. Focus is trapped inside and the page behind is hidden from assistive technology. Escape and an outside click close it unless you turn that off. Wrap the trigger and dialog in `DialogTrigger`; inside the dialog a `Button` with `slot="close"` closes it. For a question that must be answered, use Alert Dialog; for a panel against an edge, use Sheet. Styling comes from Bezel CSS variables, and the stable `tritium-dialog` class is available for overrides.',
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
      <Button>Edit profile</Button>
      <Dialog {...args}>
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>Make changes to your profile here. Save when you're done.</DialogDescription>
        </DialogHeader>
        <TextField label="Name" defaultValue="Ada Lovelace" autoFocus />
        <TextField label="Username" defaultValue="@ada" />
        <DialogFooter>
          <Button slot="close" variant="outline">Cancel</Button>
          <Button slot="close">Save changes</Button>
        </DialogFooter>
      </Dialog>
    </DialogTrigger>
  ),
} satisfies Meta<typeof Dialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Small: Story = { args: { size: 'sm' } };

export const NotDismissable: Story = { args: { isDismissable: false } };
