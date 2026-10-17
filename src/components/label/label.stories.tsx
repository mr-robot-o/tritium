import type { Meta, StoryObj } from '@storybook/react-vite';
import { Controls, Description, Heading, Stories, Title } from '@storybook/addon-docs/blocks';
import { Label } from './label';

const meta = {
  title: 'Components/Label',
  component: Label,
  tags: ['autodocs'],
  args: { children: 'Email address' },
  argTypes: {
    isRequired: {
      description:
        'Appends a required marker. Fields that set `isRequired` get the marker automatically.',
      control: 'boolean',
    },
    children: { control: 'text' },
  },
  parameters: {
    docs: {
      description: {
        component:
          'A text label for a form control, built on the React Aria `Label`. Inside a React Aria field it is wired to the control automatically; on its own, pair it with `htmlFor`. Styling comes from Bezel CSS variables, and the stable `tritium-label` class is available for overrides.',
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
} satisfies Meta<typeof Label>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Required: Story = { args: { isRequired: true } };

export const WithControl: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6, width: 320 }}>
      <Label {...args} htmlFor="label-email" />
      <input id="label-email" type="email" />
    </div>
  ),
  parameters: {
    docs: { description: { story: 'Standalone, link the label to its control with `htmlFor`.' } },
  },
};
