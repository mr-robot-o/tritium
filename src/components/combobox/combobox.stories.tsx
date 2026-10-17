import type { Meta, StoryObj } from '@storybook/react-vite';
import { Controls, Description, Heading, Stories, Title } from '@storybook/addon-docs/blocks';
import { Combobox, ComboboxItem } from './combobox';

const meta = {
  title: 'Components/Combobox',
  component: Combobox,
  tags: ['autodocs'],
  args: { label: 'Framework', placeholder: 'Search frameworks' },
  argTypes: {
    label: { description: 'The visible label. Without one, pass an `aria-label`.', control: 'text' },
    description: { description: 'Help text shown below the input.', control: 'text' },
    errorMessage: { description: 'Shown below the input when it is invalid.', control: 'text' },
    placeholder: { control: 'text' },
    emptyState: { description: 'Shown in the list when nothing matches.', control: 'text' },
    size: { control: 'inline-radio', options: ['sm', 'default', 'lg'] },
    allowsCustomValue: { description: 'Lets the user submit text that is not in the list.', control: 'boolean' },
    menuTrigger: {
      description: '`input` opens the list as the user types; `focus` opens it on focus; `manual` only on the button or arrow keys.',
      control: 'inline-radio',
      options: ['input', 'focus', 'manual'],
    },
    items: { control: false },
    children: { control: false },
    isDisabled: { control: 'boolean' },
    isInvalid: { control: 'boolean' },
    isRequired: { control: 'boolean' },
  },
  parameters: {
    docs: {
      description: {
        component:
          'A text input with a filterable list of suggestions, built on the React Aria `ComboBox`. Typing filters the list, arrow keys move through it and Enter picks an option. It reuses InputGroup for the field and the shared list styles from Select. Add options with `ComboboxItem`. Styling comes from Bezel CSS variables, and the stable `tritium-combobox` class is available for overrides.',
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
      <div style={{ width: 280, minHeight: 280 }}>
        <Story />
      </div>
    ),
  ],
  render: (args) => (
    <Combobox {...args}>
      <ComboboxItem id="next">Next.js</ComboboxItem>
      <ComboboxItem id="sveltekit">SvelteKit</ComboboxItem>
      <ComboboxItem id="nuxt">Nuxt</ComboboxItem>
      <ComboboxItem id="remix">Remix</ComboboxItem>
      <ComboboxItem id="astro">Astro</ComboboxItem>
    </Combobox>
  ),
} satisfies Meta<typeof Combobox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithValue: Story = { args: { defaultSelectedKey: 'astro' } };

export const WithDescription: Story = { args: { description: 'Type to filter the list.' } };

export const Invalid: Story = { args: { isInvalid: true, errorMessage: 'Choose a framework.' } };

export const Disabled: Story = { args: { isDisabled: true } };
