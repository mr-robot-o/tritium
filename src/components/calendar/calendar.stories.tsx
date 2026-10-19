import type { Meta, StoryObj } from '@storybook/react-vite';
import { Controls, Description, Heading, Stories, Title } from '@storybook/addon-docs/blocks';
import { CalendarDate, today, getLocalTimeZone, isWeekend } from '@internationalized/date';
import { Calendar, RangeCalendar } from './calendar';

const meta = {
  title: 'Components/Calendar',
  component: Calendar,
  tags: ['autodocs'],
  argTypes: {
    isDisabled: { control: 'boolean' },
    isReadOnly: { control: 'boolean' },
    isInvalid: { control: 'boolean' },
  },
  parameters: {
    docs: {
      description: {
        component:
          'A month grid for choosing dates, built on the React Aria `Calendar` and `RangeCalendar`. Arrow keys move by day, Page Up and Page Down by month, and Home and End to the start and end of the week. Dates are `@internationalized/date` values, so locales and non-Gregorian calendars work through the `Provider` locale. Styling comes from Bezel CSS variables, and the stable `tritium-calendar` class is available for overrides.',
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
  render: (args) => <Calendar aria-label="Appointment date" {...args} />,
} satisfies Meta<typeof Calendar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithDefaultValue: Story = {
  args: { defaultValue: new CalendarDate(2026, 10, 19) },
};

export const MinMax: Story = {
  render: (args) => {
    const now = today(getLocalTimeZone());
    return <Calendar aria-label="Appointment date" minValue={now} maxValue={now.add({ days: 30 })} {...args} />;
  },
};

export const UnavailableWeekends: Story = {
  render: (args) => (
    <Calendar aria-label="Appointment date" isDateUnavailable={(date) => isWeekend(date, 'en-US')} {...args} />
  ),
};

export const Disabled: Story = { args: { isDisabled: true } };

export const TwoMonths: Story = {
  render: (args) => <Calendar aria-label="Appointment date" visibleDuration={{ months: 2 }} {...args} />,
};

export const Range: Story = {
  render: () => <RangeCalendar aria-label="Trip dates" />,
};

export const RangeTwoMonths: Story = {
  render: () => <RangeCalendar aria-label="Trip dates" visibleDuration={{ months: 2 }} />,
};
