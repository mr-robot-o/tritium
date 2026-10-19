import type { ComponentProps } from 'react';
import {
  Button as AriaButton,
  DateInput as AriaDateInput,
  DatePicker as AriaDatePicker,
  DateRangePicker as AriaDateRangePicker,
  DateSegment as AriaDateSegment,
  Dialog as AriaDialog,
  Group as AriaGroup,
  Popover as AriaPopover,
  composeRenderProps,
  type DateValue,
} from 'react-aria-components';
import { Calendar, RangeCalendar } from '../calendar/calendar';
import type { InputSize } from '../input/input';
import '../input/input.css';
import '../_shared/popover.css';
import './date-picker.css';

function CalendarIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <rect x="2" y="3" width="12" height="11" rx="2" />
      <path d="M2 7h12M5 1.5v3M11 1.5v3" strokeLinecap="round" />
    </svg>
  );
}

function Segments() {
  return (
    <AriaDateInput className="tritium-date-picker__input">
      {(segment) => <AriaDateSegment segment={segment} className="tritium-date-picker__segment" />}
    </AriaDateInput>
  );
}

function PickerButton() {
  return (
    <AriaButton className="tritium-date-picker__button">
      <CalendarIcon />
    </AriaButton>
  );
}

export type DatePickerProps<T extends DateValue = DateValue> = Omit<
  ComponentProps<typeof AriaDatePicker<T>>,
  'children'
> & {
  /** Height and text size of the field, matching Input. */
  size?: InputSize;
};

/**
 * A date field with segments you can type into, plus a button that opens a calendar. Give it a
 * `Label`-ed field wrapper or an `aria-label`.
 */
export function DatePicker<T extends DateValue>({ className, size = 'default', ...props }: DatePickerProps<T>) {
  return (
    <AriaDatePicker
      {...props}
      className={composeRenderProps(className, (className) =>
        className ? `tritium-date-picker ${className}` : 'tritium-date-picker',
      )}
    >
      <AriaGroup className={`tritium-input-group tritium-input--size-${size} tritium-date-picker__group`}>
        <Segments />
        <PickerButton />
      </AriaGroup>
      <AriaPopover offset={8} className="tritium-popover tritium-popover--panel tritium-date-picker__popover">
        <AriaDialog className="tritium-popover__dialog">
          <Calendar />
        </AriaDialog>
      </AriaPopover>
    </AriaDatePicker>
  );
}

export type DateRangePickerProps<T extends DateValue = DateValue> = Omit<
  ComponentProps<typeof AriaDateRangePicker<T>>,
  'children'
> & {
  /** Height and text size of the field, matching Input. */
  size?: InputSize;
};

/** Two date fields, a start and an end, plus a button that opens a range calendar. */
export function DateRangePicker<T extends DateValue>({
  className,
  size = 'default',
  ...props
}: DateRangePickerProps<T>) {
  return (
    <AriaDateRangePicker
      {...props}
      className={composeRenderProps(className, (className) =>
        className ? `tritium-date-picker ${className}` : 'tritium-date-picker',
      )}
    >
      <AriaGroup className={`tritium-input-group tritium-input--size-${size} tritium-date-picker__group`}>
        <AriaDateInput slot="start" className="tritium-date-picker__input">
          {(segment) => <AriaDateSegment segment={segment} className="tritium-date-picker__segment" />}
        </AriaDateInput>
        <span aria-hidden="true" className="tritium-date-picker__separator">
          –
        </span>
        <AriaDateInput slot="end" className="tritium-date-picker__input">
          {(segment) => <AriaDateSegment segment={segment} className="tritium-date-picker__segment" />}
        </AriaDateInput>
        <PickerButton />
      </AriaGroup>
      <AriaPopover offset={8} className="tritium-popover tritium-popover--panel tritium-date-picker__popover">
        <AriaDialog className="tritium-popover__dialog">
          <RangeCalendar visibleDuration={{ months: 2 }} />
        </AriaDialog>
      </AriaPopover>
    </AriaDateRangePicker>
  );
}
