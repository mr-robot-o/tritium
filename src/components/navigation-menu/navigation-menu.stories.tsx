import type { Meta, StoryObj } from '@storybook/react-vite';
import { Controls, Description, Heading, Stories, Title } from '@storybook/addon-docs/blocks';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuLinkCard,
  NavigationMenuTrigger,
} from './navigation-menu';

const meta = {
  title: 'Components/Navigation Menu',
  component: NavigationMenu,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'A site\'s main navigation: links, and buttons that open a panel of more links. It follows the disclosure navigation pattern: Enter or Space toggles a panel, Tab moves through its links, and Escape closes it. Panels also open on hover. It renders a `nav` landmark, so give it an `aria-label`. Styling comes from Bezel CSS variables, and the stable `tritium-navigation-menu` class is available for overrides.',
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
  args: { 'aria-label': 'Main' },
  render: (args) => (
    <NavigationMenu {...args}>
      <NavigationMenuItem>
        <NavigationMenuLink href="#" isActive>
          Home
        </NavigationMenuLink>
      </NavigationMenuItem>
      <NavigationMenuItem>
        <NavigationMenuTrigger label="Getting started">
          <NavigationMenuLinkCard href="#" title="Introduction">
            Re-usable components built with React Aria and Bezel tokens.
          </NavigationMenuLinkCard>
          <NavigationMenuLinkCard href="#" title="Installation">
            How to install dependencies and structure your app.
          </NavigationMenuLinkCard>
          <NavigationMenuLinkCard href="#" title="Theming">
            Switch contexts and override tokens.
          </NavigationMenuLinkCard>
        </NavigationMenuTrigger>
      </NavigationMenuItem>
      <NavigationMenuItem>
        <NavigationMenuTrigger label="Components">
          <NavigationMenuLink href="#">Alert Dialog</NavigationMenuLink>
          <NavigationMenuLink href="#">Hover Card</NavigationMenuLink>
          <NavigationMenuLink href="#">Progress</NavigationMenuLink>
        </NavigationMenuTrigger>
      </NavigationMenuItem>
      <NavigationMenuItem>
        <NavigationMenuLink href="#">Docs</NavigationMenuLink>
      </NavigationMenuItem>
    </NavigationMenu>
  ),
} satisfies Meta<typeof NavigationMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
