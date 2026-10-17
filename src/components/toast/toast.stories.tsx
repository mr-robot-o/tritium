import type { Meta, StoryObj } from '@storybook/react-vite';
import { Controls, Description, Heading, Stories, Title } from '@storybook/addon-docs/blocks';
import { Button } from '../button/button';
import { Toaster } from './toast';
import { toast } from './toast-queue';

const meta = {
  title: 'Components/Toast',
  component: Toaster,
  tags: ['autodocs'],
  argTypes: {
    'aria-label': { description: 'Names the region for screen reader users.', control: 'text' },
  },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Brief, temporary messages that appear in a corner of the screen, built on the React Aria toast region. Render one `Toaster` near the root of the app, then call `toast()` from anywhere: `toast("Saved")`, or `toast.success`, `toast.info`, `toast.warning` and `toast.error` for variants. Toasts close after 5 seconds (set `timeout: 0` to keep one until dismissed), pause while hovered or focused, and press F6 to move keyboard focus into the region. React Aria marks its toast API as unstable, so it may change. Styling comes from Bezel CSS variables, and the stable `tritium-toast` class is available for overrides.',
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
    <>
      <Toaster {...args} />
      <Button variant="outline" onPress={() => toast('Event has been created')}>
        Show toast
      </Button>
    </>
  ),
} satisfies Meta<typeof Toaster>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Variants: Story = {
  render: (args) => (
    <>
      <Toaster {...args} />
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, maxWidth: 360 }}>
        <Button variant="outline" onPress={() => toast.success('Saved', { description: 'Your changes are live.' })}>
          Success
        </Button>
        <Button variant="outline" onPress={() => toast.info('Update available')}>
          Info
        </Button>
        <Button variant="outline" onPress={() => toast.warning('Storage almost full')}>
          Warning
        </Button>
        <Button variant="outline" onPress={() => toast.error('Could not save', { description: 'Check your connection and try again.' })}>
          Error
        </Button>
      </div>
    </>
  ),
};

export const Persistent: Story = {
  render: (args) => (
    <>
      <Toaster {...args} />
      <Button variant="outline" onPress={() => toast({ title: 'Needs your attention', description: 'This stays until you dismiss it.' }, { timeout: 0 })}>
        Show persistent toast
      </Button>
    </>
  ),
};
