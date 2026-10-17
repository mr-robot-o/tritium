import type { Meta, StoryObj } from '@storybook/react-vite';
import { Controls, Description, Heading, Stories, Title } from '@storybook/addon-docs/blocks';
import { Avatar } from '../avatar/avatar';
import { Link } from '../link/link';
import { HoverCard, HoverCardContent } from './hover-card';

const meta = {
  title: 'Components/Hover Card',
  component: HoverCardContent,
  tags: ['autodocs'],
  argTypes: {
    placement: {
      description: 'Where the card appears relative to its trigger.',
      control: 'select',
      options: ['top', 'bottom', 'left', 'right', 'top start', 'bottom start'],
    },
    offset: { description: 'Distance from the trigger, in pixels.', control: 'number' },
    children: { control: false },
  },
  parameters: {
    docs: {
      description: {
        component:
          'A preview card that appears when a link or button is hovered or focused, built on the React Aria `TooltipTrigger` and `Tooltip`. It stays open while the pointer is over it. Because it is a tooltip underneath, its content is not focusable: use it for supplementary previews, never for essential or interactive content (use a Popover for that). Styling comes from Bezel CSS variables, and the stable `tritium-hover-card` class is available for overrides.',
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
      <div style={{ padding: '24px 0 200px' }}>
        <Story />
      </div>
    ),
  ],
  render: (args) => (
    <HoverCard>
      <Link href="#">@tritium</Link>
      <HoverCardContent {...args} placement="bottom start">
        <div style={{ display: 'flex', gap: 12 }}>
          <Avatar fallback="TR" alt="Tritium" />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <strong>@tritium</strong>
            <span style={{ color: 'var(--muted-foreground)' }}>
              A component library built on React Aria and Bezel tokens.
            </span>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  ),
} satisfies Meta<typeof HoverCardContent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
