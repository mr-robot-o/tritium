import type { Meta, StoryObj } from '@storybook/react-vite';
import { Controls, Description, Heading, Stories, Title } from '@storybook/addon-docs/blocks';
import { Button } from '../button/button';
import { Collapsible, CollapsiblePanel } from './collapsible';

const meta = {
  title: 'Components/Collapsible',
  component: Collapsible,
  tags: ['autodocs'],
  argTypes: {
    isExpanded: { description: 'Controlled expanded state.', control: 'boolean' },
    defaultExpanded: { description: 'Initial expanded state when uncontrolled.', control: 'boolean' },
    isDisabled: { control: 'boolean' },
    children: { control: false },
  },
  parameters: {
    docs: {
      description: {
        component:
          'Shows and hides a region of content, built on the React Aria `Disclosure`. Use any `Button` with `slot="trigger"` to control it; the button gets `aria-expanded` and `aria-controls` automatically. For a set of related sections, use Accordion. The stable `tritium-collapsible` class is available for overrides.',
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
  render: (args) => (
    <Collapsible {...args}>
      <Button slot="trigger" variant="outline">Show more</Button>
      <CollapsiblePanel>
        <p style={{ margin: 0 }}>These details were hidden until you asked for them.</p>
      </CollapsiblePanel>
    </Collapsible>
  ),
} satisfies Meta<typeof Collapsible>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const OpenByDefault: Story = { args: { defaultExpanded: true } };
