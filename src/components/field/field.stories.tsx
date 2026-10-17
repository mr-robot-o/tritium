import type { Meta, StoryObj } from '@storybook/react-vite';
import { Controls, Description, Heading, Stories, Title } from '@storybook/addon-docs/blocks';
import { Checkbox } from '../checkbox/checkbox';
import { Input } from '../input/input';
import { Label } from '../label/label';
import { Field, FieldDescription, FieldGroup, FieldLegend, FieldSet } from './field';

const meta = {
  title: 'Components/Field',
  component: Field,
  tags: ['autodocs'],
  argTypes: {
    orientation: { control: 'inline-radio', options: ['vertical', 'horizontal'] },
    children: { control: false },
  },
  parameters: {
    docs: {
      description: {
        component:
          'Layout building blocks for forms: `Field` arranges a control with its label, description and error; `FieldGroup` spaces several fields; `FieldSet` and `FieldLegend` group related fields semantically. For a ready-made labeled input, use TextField instead. Styling comes from Bezel CSS variables, and the stable `tritium-field` class is available for overrides.',
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
      <div style={{ width: 360 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Field>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <Field {...args}>
      <Label htmlFor="field-name">Full name</Label>
      <Input id="field-name" placeholder="Ada Lovelace" />
      <FieldDescription>As it appears on your passport.</FieldDescription>
    </Field>
  ),
};

export const Horizontal: Story = {
  args: { orientation: 'horizontal' },
  render: (args) => (
    <Field {...args}>
      <Checkbox>Send me product updates</Checkbox>
    </Field>
  ),
};

export const Grouped: Story = {
  render: () => (
    <FieldSet>
      <FieldLegend>Profile</FieldLegend>
      <FieldGroup>
        <Field>
          <Label htmlFor="field-first">First name</Label>
          <Input id="field-first" />
        </Field>
        <Field>
          <Label htmlFor="field-last">Last name</Label>
          <Input id="field-last" />
        </Field>
      </FieldGroup>
    </FieldSet>
  ),
};
