import type { Meta, StoryObj } from '@storybook/react-vite';
import { Controls, Description, Heading, Stories, Title } from '@storybook/addon-docs/blocks';
import { Button } from '../button/button';
import { DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../dialog/dialog';
import { Drawer } from './drawer';

const meta = {
  title: 'Components/Drawer',
  component: Drawer,
  tags: ['autodocs'],
  args: { children: null },
  argTypes: {
    isDismissable: { control: 'boolean' },
    isKeyboardDismissDisabled: { control: 'boolean' },
    children: { control: false },
  },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A bottom sheet with a grab handle, built on the React Aria `Modal` and `Dialog`. It is the same modal as Sheet anchored to the bottom, with rounded top corners. The handle is decorative: it does not drag. Use it inside a `DialogTrigger`. Styling comes from Bezel CSS variables, and the stable `tritium-drawer` class is available for overrides.',
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
      <Button variant="outline">Open drawer</Button>
      <Drawer {...args}>
        <DialogHeader>
          <DialogTitle>Move goal</DialogTitle>
          <DialogDescription>Set your daily activity goal.</DialogDescription>
        </DialogHeader>
        <div style={{ textAlign: 'center', fontSize: 38, fontWeight: 600 }}>350</div>
        <DialogFooter>
          <Button slot="close" variant="outline">Cancel</Button>
          <Button slot="close">Submit</Button>
        </DialogFooter>
      </Drawer>
    </DialogTrigger>
  ),
} satisfies Meta<typeof Drawer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
