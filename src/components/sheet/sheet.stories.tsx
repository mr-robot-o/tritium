import type { Meta, StoryObj } from '@storybook/react-vite';
import { Controls, Description, Heading, Stories, Title } from '@storybook/addon-docs/blocks';
import { Button } from '../button/button';
import { DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../dialog/dialog';
import { TextField } from '../text-field/text-field';
import { Sheet } from './sheet';

const meta = {
  title: 'Components/Sheet',
  component: Sheet,
  tags: ['autodocs'],
  args: { side: 'right', children: null },
  argTypes: {
    side: { description: 'The edge the sheet slides in from.', control: 'inline-radio', options: ['right', 'left', 'top', 'bottom'] },
    size: { description: 'Width of a side sheet.', control: 'inline-radio', options: ['sm', 'default', 'lg'] },
    isDismissable: { control: 'boolean' },
    isKeyboardDismissDisabled: { control: 'boolean' },
    children: { control: false },
  },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A modal panel that slides in from an edge of the screen, built on the React Aria `Modal` and `Dialog`. It behaves like Dialog (focus trap, Escape, outside click) but suits longer, secondary content. Use it inside a `DialogTrigger`. For a bottom panel with a grab handle, use Drawer. Styling comes from Bezel CSS variables, and the stable `tritium-modal` class is available for overrides.',
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
      <Button variant="outline">Open sheet</Button>
      <Sheet {...args}>
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>Make changes to your profile here.</DialogDescription>
        </DialogHeader>
        <TextField label="Name" defaultValue="Ada Lovelace" />
        <TextField label="Username" defaultValue="@ada" />
        <DialogFooter>
          <Button slot="close">Save changes</Button>
        </DialogFooter>
      </Sheet>
    </DialogTrigger>
  ),
} satisfies Meta<typeof Sheet>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Right: Story = {};

export const Left: Story = { args: { side: 'left' } };

export const Top: Story = { args: { side: 'top' } };

export const Bottom: Story = { args: { side: 'bottom' } };
