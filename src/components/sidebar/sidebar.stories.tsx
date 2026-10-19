import type { ReactNode } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Controls, Description, Heading, Stories, Title } from '@storybook/addon-docs/blocks';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarSeparator,
  SidebarTrigger,
} from './sidebar';

const Icon = ({ d }: { d: string }) => (
  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
    <path d={d} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const home = <Icon d="M2.5 7.5 8 3l5.5 4.5V13h-11zM6.5 13V9.5h3V13" />;
const inbox = <Icon d="M2 9l1.5-5h9L14 9v4H2zM2 9h3.5l.5 1.5h4L10.5 9H14" />;
const calendar = <Icon d="M2.5 4h11v9.5h-11zM2.5 7h11M5.5 2v3M10.5 2v3" />;
const settings = <Icon d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM8 1.5v2M8 12.5v2M1.5 8h2M12.5 8h2" />;

function Shell({ children, ...props }: { children: ReactNode } & Partial<React.ComponentProps<typeof Sidebar>>) {
  return (
    <SidebarProvider style={{ height: 420, border: '1px solid var(--border)', overflow: 'hidden' }}>
      <Sidebar {...props} aria-label="Main">
        {children}
      </Sidebar>
      <SidebarInset>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: 12, borderBottom: '1px solid var(--border)' }}>
          <SidebarTrigger />
          <span style={{ fontWeight: 600 }}>Dashboard</span>
        </div>
        <div style={{ padding: 16 }}>Page content. Press Cmd or Ctrl + B to toggle the sidebar.</div>
      </SidebarInset>
    </SidebarProvider>
  );
}

const nav = (
  <>
    <SidebarHeader>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton icon={home} size="lg" tooltip="Acme Inc" href="#">
            Acme Inc
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarHeader>
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupLabel>Application</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton icon={home} tooltip="Home" href="#" isActive>
                Home
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton icon={inbox} tooltip="Inbox" href="#">
                Inbox
              </SidebarMenuButton>
              <SidebarMenuBadge>12</SidebarMenuBadge>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton icon={calendar} tooltip="Calendar" href="#">
                Calendar
              </SidebarMenuButton>
              <SidebarMenuSub>
                <SidebarMenuSubItem>
                  <SidebarMenuSubButton href="#">Upcoming</SidebarMenuSubButton>
                </SidebarMenuSubItem>
                <SidebarMenuSubItem>
                  <SidebarMenuSubButton href="#">Past</SidebarMenuSubButton>
                </SidebarMenuSubItem>
              </SidebarMenuSub>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
      <SidebarSeparator />
      <SidebarGroup>
        <SidebarGroupLabel>Account</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton icon={settings} tooltip="Settings" href="#">
                Settings
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton icon={settings} isDisabled>
                Disabled
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
    <SidebarFooter>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton icon={settings} tooltip="Profile" onPress={() => {}}>
            Jane Doe
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarFooter>
  </>
);

const meta = {
  title: 'Components/Sidebar',
  component: Sidebar,
  tags: ['autodocs'],
  argTypes: {
    side: { control: 'inline-radio', options: ['left', 'right'] },
    collapsible: {
      description: '`offcanvas` slides it away, `icon` shrinks it to an icon rail, `none` keeps it open.',
      control: 'inline-radio',
      options: ['offcanvas', 'icon', 'none'],
    },
  },
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'The app\'s side navigation. A `SidebarProvider` holds the open state and lays out a `Sidebar` beside a `SidebarInset`; a `SidebarTrigger` or Cmd/Ctrl + B toggles it. Menu rows are React Aria links or buttons with a tooltip when collapsed to icons. Below 768px it becomes a `Sheet`. Uses the Bezel `sidebar-*` tokens, and the stable `tritium-sidebar` class is available for overrides.',
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
  render: (args) => <Shell {...args}>{nav}</Shell>,
} satisfies Meta<typeof Sidebar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { collapsible: 'icon' } };

export const Hidden: Story = { args: { collapsible: 'offcanvas' } };

export const Right: Story = { args: { side: 'right' } };

export const AlwaysOpen: Story = { args: { collapsible: 'none' } };
