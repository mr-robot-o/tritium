import type { Meta, StoryObj } from '@storybook/react-vite';
import { Controls, Description, Heading, Stories, Title } from '@storybook/addon-docs/blocks';
import { CalendarDate } from '@internationalized/date';
import { DatePicker, DateRangePicker } from './date-picker';

const meta = {
  title: 'Components/Date Picker',
  component: DatePicker,
  tags: ['autodocs'],
  argTypes: {
    size: {
      description: 'Height and text size of the field, matching Input.',
      control: 'inline-radio',
      options: ['sm', 'default', 'lg'],
    },
    granularity: { control: 'inline-radio', options: ['day', 'hour', 'minute', 'second'] },
    isDisabled: { control: 'boolean' },
    isReadOnly: { control: 'boolean' },
    isInvalid: { control: 'boolean' },
  },
  parameters: {
    docs: {
      description: {
        component:
          'A date field with typeable segments and a calendar popover, built on the React Aria `DatePicker` and `DateRangePicker`. Left and Right move between segments, Up and Down change a value, and the button opens a `Calendar`. Values are `@internationalized/date` objects. Styling comes from Bezel CSS variables, and the stable `tritium-date-picker` class is available for overrides.',
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
  render: (args) => <DatePicker aria-label="Birth date" {...args} />,
} satisfies Meta<typeof DatePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithDefaultValue: Story = {
  args: { defaultValue: new CalendarDate(2026, 10, 19) },
};

export const WithTime: Story = {
  args: { granularity: 'minute' },
};

export const Invalid: Story = {
  args: { isInvalid: true, defaultValue: new CalendarDate(2026, 10, 19) },
};

export const Disabled: Story = { args: { isDisabled: true } };

export const Range: Story = {
  render: () => <DateRangePicker aria-label="Trip dates" />,
};
