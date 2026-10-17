import type { Meta, StoryObj } from '@storybook/react-vite';
import { Controls, Description, Heading, Stories, Title } from '@storybook/addon-docs/blocks';
import { Tab, TabList, TabPanel, Tabs } from './tabs';

const meta = {
  title: 'Components/Tabs',
  component: Tabs,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      description: '`default` is a segmented control; `line` underlines the selected tab.',
      control: 'inline-radio',
      options: ['default', 'line'],
    },
    orientation: { control: 'inline-radio', options: ['horizontal', 'vertical'] },
    keyboardActivation: {
      description: '`automatic` selects a tab as it gets focus; `manual` waits for Enter or Space.',
      control: 'inline-radio',
      options: ['automatic', 'manual'],
    },
    isDisabled: { control: 'boolean' },
    children: { control: false },
  },
  parameters: {
    docs: {
      description: {
        component:
          'Switches between panels of related content, built on the React Aria `Tabs`, `TabList`, `Tab` and `TabPanel`. Arrow keys move between tabs, and each tab is linked to its panel for screen readers. Give the `TabList` an `aria-label`. Styling comes from Bezel CSS variables, and the stable `tritium-tabs` class is available for overrides.',
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
      <div style={{ width: 420 }}>
        <Story />
      </div>
    ),
  ],
  render: (args) => (
    <Tabs {...args}>
      <TabList aria-label="Account">
        <Tab id="account">Account</Tab>
        <Tab id="password">Password</Tab>
        <Tab id="billing">Billing</Tab>
      </TabList>
      <TabPanel id="account">Make changes to your account here.</TabPanel>
      <TabPanel id="password">Change your password here.</TabPanel>
      <TabPanel id="billing">Manage your plan and payment method.</TabPanel>
    </Tabs>
  ),
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Line: Story = { args: { variant: 'line' } };

export const Vertical: Story = { args: { orientation: 'vertical', variant: 'line' } };

export const DisabledTab: Story = {
  render: (args) => (
    <Tabs {...args}>
      <TabList aria-label="Account">
        <Tab id="account">Account</Tab>
        <Tab id="password" isDisabled>Password</Tab>
      </TabList>
      <TabPanel id="account">Make changes to your account here.</TabPanel>
      <TabPanel id="password">Change your password here.</TabPanel>
    </Tabs>
  ),
};
