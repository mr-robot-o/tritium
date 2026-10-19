import type { Meta, StoryObj } from '@storybook/react-vite';
import { Controls, Description, Heading, Stories, Title } from '@storybook/addon-docs/blocks';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from './resizable';

const pane = (label: string) => (
  <div style={{ display: 'flex', height: '100%', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
    <span style={{ fontWeight: 600 }}>{label}</span>
  </div>
);

const meta = {
  title: 'Components/Resizable',
  component: ResizablePanelGroup,
  tags: ['autodocs'],
  argTypes: {
    orientation: { control: 'inline-radio', options: ['horizontal', 'vertical'] },
    disabled: { control: 'boolean' },
  },
  parameters: {
    docs: {
      description: {
        component:
          'Panels with draggable dividers, built on `react-resizable-panels`. The divider is a focusable separator: arrow keys resize, Home and End jump to the limits, and Enter collapses a collapsible panel. Sizes are percentages by default; numbers are pixels. Styling comes from Bezel CSS variables, and the stable `tritium-resizable` class is available for overrides.',
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
      <div
        style={{
          width: 480,
          height: 200,
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius-lg)',
          overflow: 'hidden',
          color: 'var(--foreground)',
        }}
      >
        <Story />
      </div>
    ),
  ],
  render: (args) => (
    <ResizablePanelGroup {...args}>
      <ResizablePanel defaultSize={50} minSize={20}>{pane('One')}</ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize={50} minSize={20}>{pane('Two')}</ResizablePanel>
    </ResizablePanelGroup>
  ),
} satisfies Meta<typeof ResizablePanelGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithHandle: Story = {
  render: (args) => (
    <ResizablePanelGroup {...args}>
      <ResizablePanel defaultSize={50} minSize={20}>{pane('One')}</ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={50} minSize={20}>{pane('Two')}</ResizablePanel>
    </ResizablePanelGroup>
  ),
};

export const Vertical: Story = {
  args: { orientation: 'vertical' },
  render: (args) => (
    <ResizablePanelGroup {...args}>
      <ResizablePanel defaultSize={30} minSize={15}>{pane('Header')}</ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={70} minSize={15}>{pane('Content')}</ResizablePanel>
    </ResizablePanelGroup>
  ),
};

export const Nested: Story = {
  render: () => (
    <ResizablePanelGroup>
      <ResizablePanel defaultSize={30} minSize={15}>{pane('Sidebar')}</ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={70}>
        <ResizablePanelGroup orientation="vertical">
          <ResizablePanel defaultSize={60}>{pane('Editor')}</ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={40}>{pane('Terminal')}</ResizablePanel>
        </ResizablePanelGroup>
      </ResizablePanel>
    </ResizablePanelGroup>
  ),
};

export const Collapsible: Story = {
  render: () => (
    <ResizablePanelGroup>
      <ResizablePanel defaultSize={30} minSize={15} collapsible collapsedSize={0}>{pane('Collapsible')}</ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={70}>{pane('Content')}</ResizablePanel>
    </ResizablePanelGroup>
  ),
};
