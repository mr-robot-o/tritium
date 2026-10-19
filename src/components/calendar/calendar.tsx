import type { ComponentProps } from 'react';
import {
  Button as AriaButton,
  Calendar as AriaCalendar,
  CalendarCell as AriaCalendarCell,
  CalendarGrid as AriaCalendarGrid,
  CalendarGridBody as AriaCalendarGridBody,
  CalendarGridHeader as AriaCalendarGridHeader,
  CalendarHeaderCell as AriaCalendarHeaderCell,
  Heading as AriaHeading,
  RangeCalendar as AriaRangeCalendar,
  composeRenderProps,
  type DateValue,
} from 'react-aria-components';
import '../_shared/calendar.css';

const BASE = 'tritium-calendar';

function ChevronIcon({ direction }: { direction: 'left' | 'right' }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path d={direction === 'left' ? 'M10 3 5 8l5 5' : 'm6 3 5 5-5 5'} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CalendarBody({ visibleDuration }: { visibleDuration?: number }) {
  const months = visibleDuration ?? 1;
  return (
    <>
      <header className="tritium-calendar__header">
        <AriaButton slot="previous" className="tritium-calendar__nav">
          <ChevronIcon direction="left" />
        </AriaButton>
        <AriaHeading className="tritium-calendar__heading" />
        <AriaButton slot="next" className="tritium-calendar__nav">
          <ChevronIcon direction="right" />
        </AriaButton>
      </header>
      <div className="tritium-calendar__months">
        {Array.from({ length: months }, (_, offset) => (
          <AriaCalendarGrid key={offset} offset={{ months: offset }} className="tritium-calendar__grid">
            <AriaCalendarGridHeader>
              {(day) => (
                <AriaCalendarHeaderCell className="tritium-calendar__header-cell">{day}</AriaCalendarHeaderCell>
              )}
            </AriaCalendarGridHeader>
            <AriaCalendarGridBody>
              {(date) => <AriaCalendarCell date={date} className="tritium-calendar__cell" />}
            </AriaCalendarGridBody>
          </AriaCalendarGrid>
        ))}
      </div>
    </>
  );
}

export type CalendarProps<T extends DateValue = DateValue> = Omit<
  ComponentProps<typeof AriaCalendar<T>>,
  'children'
>;

/** A month grid for picking one date. Arrow keys move by day, Page Up/Down by month. */
export function Calendar<T extends DateValue>({ className, visibleDuration, ...props }: CalendarProps<T>) {
  return (
    <AriaCalendar
      {...props}
      visibleDuration={visibleDuration}
      className={composeRenderProps(className, (className) => (className ? `${BASE} ${className}` : BASE))}
    >
      <CalendarBody visibleDuration={visibleDuration?.months} />
    </AriaCalendar>
  );
}

export type RangeCalendarProps<T extends DateValue = DateValue> = Omit<
  ComponentProps<typeof AriaRangeCalendar<T>>,
  'children'
>;

/** A month grid for picking a start and an end date. */
export function RangeCalendar<T extends DateValue>({
  className,
  visibleDuration,
  ...props
}: RangeCalendarProps<T>) {
  return (
    <AriaRangeCalendar
      {...props}
      visibleDuration={visibleDuration}
      className={composeRenderProps(className, (className) => (className ? `${BASE} ${className}` : BASE))}
    >
      <CalendarBody visibleDuration={visibleDuration?.months} />
    </AriaRangeCalendar>
  );
}
