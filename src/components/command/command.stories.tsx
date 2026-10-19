import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Controls, Description, Heading, Stories, Title } from '@storybook/addon-docs/blocks';
import { Button } from '../button/button';
import { Command, CommandDialog, CommandGroup, CommandItem, CommandSeparator } from './command';

const meta = {
  title: 'Components/Command',
  component: Command,
  tags: ['autodocs'],
  argTypes: {
    placeholder: { control: 'text' },
    emptyMessage: { control: 'text' },
  },
  parameters: {
    docs: {
      description: {
        component:
          'A searchable list of actions, built on the React Aria `Autocomplete` and `Menu`. Typing filters the items while focus stays in the field, and arrow keys and Enter pick one. `CommandDialog` puts it in a modal opened with Cmd or Ctrl + K. Items are the same as `MenuItem`, so `startContent`, `shortcut` and `onAction` work. Styling comes from Bezel CSS variables, and the stable `tritium-command` class is available for overrides.',
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
    <Command {...args}>
      <CommandGroup title="Suggestions">
        <CommandItem id="calendar" shortcut="⌘C">Calendar</CommandItem>
        <CommandItem id="search" shortcut="⌘F">Search emoji</CommandItem>
        <CommandItem id="calculator">Calculator</CommandItem>
      </CommandGroup>
      <CommandSeparator />
      <CommandGroup title="Settings">
        <CommandItem id="profile" shortcut="⌘P">Profile</CommandItem>
        <CommandItem id="billing">Billing</CommandItem>
        <CommandItem id="settings" shortcut="⌘S">Settings</CommandItem>
        <CommandItem id="disabled" isDisabled>Disabled</CommandItem>
      </CommandGroup>
    </Command>
  ),
  args: { 'aria-label': 'Command menu' },
} satisfies Meta<typeof Command>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Empty: Story = {
  render: (args) => <Command {...args} />,
};

export const InDialog: Story = {
  decorators: [],
  render: (args) => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button variant="outline" onPress={() => setOpen(true)}>
          Open command menu (⌘K)
        </Button>
        <CommandDialog {...args} isOpen={open} onOpenChange={setOpen}>
          <CommandGroup title="Suggestions">
            <CommandItem id="calendar">Calendar</CommandItem>
            <CommandItem id="search">Search emoji</CommandItem>
            <CommandItem id="calculator">Calculator</CommandItem>
          </CommandGroup>
        </CommandDialog>
      </>
    );
  },
};
