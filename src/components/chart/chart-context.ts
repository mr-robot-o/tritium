import { createContext, useContext, type ComponentType, type ReactNode } from 'react';

/** How one series (or pie slice) is labelled and colored, keyed by its data key or name. */
export type ChartConfigItem = {
  /** Text shown in the tooltip and legend. */
  label?: ReactNode;
  /** Icon shown in the legend and tooltip instead of the color swatch. */
  icon?: ComponentType;
  /** Any CSS color, for example `var(--success)`. Defaults to the next palette color. */
  color?: string;
};

/** Maps each data key used in a chart to its label, icon and color. */
export type ChartConfig = Record<string, ChartConfigItem>;

export const ChartContext = createContext<{ config: ChartConfig } | null>(null);

export function useChart() {
  const context = useContext(ChartContext);
  if (!context) throw new Error('Chart parts must be used inside a <ChartContainer>.');
  return context;
}
