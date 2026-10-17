import type { Meta, StoryObj } from '@storybook/react-vite';
import { Controls, Description, Heading, Stories, Title } from '@storybook/addon-docs/blocks';
import { Accordion, AccordionItem } from './accordion';

const meta = {
  title: 'Components/Accordion',
  component: Accordion,
  tags: ['autodocs'],
  argTypes: {
    allowsMultipleExpanded: {
      description: 'Lets several sections be open at once. By default opening one closes the others.',
      control: 'boolean',
    },
    isDisabled: { control: 'boolean' },
    children: { control: false },
  },
  parameters: {
    docs: {
      description: {
        component:
          'A vertically stacked set of sections that expand and collapse, built on the React Aria `DisclosureGroup` and `Disclosure`. Each header is a heading containing a button, so screen readers can jump between sections. Styling comes from Bezel CSS variables, and the stable `tritium-accordion` class is available for overrides.',
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
    <Accordion {...args}>
      <AccordionItem id="accessible" title="Is it accessible?">
        Yes. It follows the WAI-ARIA disclosure pattern.
      </AccordionItem>
      <AccordionItem id="styled" title="Is it styled?">
        Yes. It uses your Bezel tokens.
      </AccordionItem>
      <AccordionItem id="animated" title="Is it animated?">
        The chevron turns; the panel opens instantly.
      </AccordionItem>
    </Accordion>
  ),
} satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { defaultExpandedKeys: ['accessible'] } };

export const Multiple: Story = {
  args: { allowsMultipleExpanded: true, defaultExpandedKeys: ['accessible', 'styled'] },
};

export const Disabled: Story = { args: { isDisabled: true } };
