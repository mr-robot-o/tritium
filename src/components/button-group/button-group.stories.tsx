import type { Meta, StoryObj } from '@storybook/react-vite';
import { Controls, Description, Heading, Stories, Title } from '@storybook/addon-docs/blocks';
import { Button } from '../button/button';
import { ButtonGroup } from './button-group';

const meta = {
  title: 'Components/Button Group',
  component: ButtonGroup,
  tags: ['autodocs'],
  args: { 'aria-label': 'Pagination' },
  argTypes: {
    orientation: {
      description: 'Direction the buttons are laid out in.',
      control: 'inline-radio',
      options: ['horizontal', 'vertical'],
    },
    children: { control: false },
  },
  parameters: {
    docs: {
      description: {
        component:
          'Joins related Buttons into one control, built on the React Aria `Group` (role `group`). Give the group an `aria-label` so assistive technology can name the set. Set the variant and size on each Button. Styling comes from Bezel CSS variables, and the stable `tritium-button-group` class is available for overrides.',
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
} satisfies Meta<typeof ButtonGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <ButtonGroup {...args}>
      <Button variant="outline">Archive</Button>
      <Button variant="outline">Report</Button>
      <Button variant="outline">Snooze</Button>
    </ButtonGroup>
  ),
};

export const Filled: Story = {
  render: (args) => (
    <ButtonGroup {...args}>
      <Button>Save</Button>
      <Button>Save and close</Button>
    </ButtonGroup>
  ),
};

export const Vertical: Story = {
  args: { orientation: 'vertical' },
  render: (args) => (
    <ButtonGroup {...args}>
      <Button variant="outline">Top</Button>
      <Button variant="outline">Middle</Button>
      <Button variant="outline">Bottom</Button>
    </ButtonGroup>
  ),
};
