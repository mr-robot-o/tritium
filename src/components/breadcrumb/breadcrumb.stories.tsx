import type { Meta, StoryObj } from '@storybook/react-vite';
import { Controls, Description, Heading, Stories, Title } from '@storybook/addon-docs/blocks';
import { Breadcrumb, Breadcrumbs } from './breadcrumb';

const meta = {
  title: 'Components/Breadcrumb',
  component: Breadcrumbs,
  tags: ['autodocs'],
  args: { 'aria-label': 'Breadcrumbs' },
  argTypes: {
    isDisabled: { description: 'Disables every crumb.', control: 'boolean' },
    children: { control: false },
  },
  parameters: {
    docs: {
      description: {
        component:
          'Shows where the current page sits in a hierarchy, built on the React Aria `Breadcrumbs` and `Breadcrumb`. The last crumb is the current page: it is marked `aria-current` and is not a link. Styling comes from Bezel CSS variables, and the stable `tritium-breadcrumbs` and `tritium-breadcrumb` classes are available for overrides.',
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
} satisfies Meta<typeof Breadcrumbs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <Breadcrumbs {...args}>
      <Breadcrumb href="#">Home</Breadcrumb>
      <Breadcrumb href="#">Components</Breadcrumb>
      <Breadcrumb>Breadcrumb</Breadcrumb>
    </Breadcrumbs>
  ),
};

export const TwoLevels: Story = {
  render: (args) => (
    <Breadcrumbs {...args}>
      <Breadcrumb href="#">Settings</Breadcrumb>
      <Breadcrumb>Profile</Breadcrumb>
    </Breadcrumbs>
  ),
};
