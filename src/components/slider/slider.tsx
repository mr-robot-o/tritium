import type { ReactNode } from 'react';
import {
  Label,
  Slider as AriaSlider,
  SliderOutput,
  SliderThumb,
  SliderTrack,
  composeRenderProps,
  type SliderProps as AriaSliderProps,
} from 'react-aria-components';
import './slider.css';

export type SliderProps<T extends number | number[]> = Omit<AriaSliderProps<T>, 'children'> & {
  /** The visible label. Without one, pass an `aria-label`. */
  label?: ReactNode;
  /** Shows the current value next to the label. */
  showOutput?: boolean;
  /** Accessible names for each thumb of a range slider, for example `['Minimum', 'Maximum']`. */
  thumbLabels?: string[];
};

/** Pass a number for one thumb, or an array of numbers for a range. */
export function Slider<T extends number | number[]>({
  className,
  label,
  showOutput = false,
  thumbLabels,
  ...props
}: SliderProps<T>) {
  return (
    <AriaSlider
      {...props}
      className={composeRenderProps(className, (className) =>
        className ? `tritium-slider ${className}` : 'tritium-slider',
      )}
    >
      {(label != null || showOutput) && (
        <div className="tritium-slider__header">
          {label != null && <Label className="tritium-slider__label">{label}</Label>}
          {showOutput && <SliderOutput className="tritium-slider__output" />}
        </div>
      )}
      <SliderTrack className="tritium-slider__track">
        {({ state }) => {
          const count = state.values.length;
          // A single thumb fills from the start; a range fills between its first and last thumb.
          const start = count > 1 ? state.getThumbPercent(0) * 100 : 0;
          const end = state.getThumbPercent(count - 1) * 100;
          const vertical = state.orientation === 'vertical';
          return (
            <>
              <div
                className="tritium-slider__fill"
                style={
                  vertical
                    ? { bottom: `${start}%`, height: `${end - start}%` }
                    : { insetInlineStart: `${start}%`, width: `${end - start}%` }
                }
              />
              {state.values.map((_, index) => (
                <SliderThumb
                  key={index}
                  index={index}
                  aria-label={thumbLabels?.[index]}
                  className="tritium-slider__thumb"
                />
              ))}
            </>
          );
        }}
      </SliderTrack>
    </AriaSlider>
  );
}
