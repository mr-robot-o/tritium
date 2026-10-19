import { useMemo, type ComponentProps, type CSSProperties, type ReactElement, type ReactNode } from 'react';
import {
  Legend,
  ResponsiveContainer,
  Tooltip,
  type LegendPayload,
  type TooltipContentProps,
  type TooltipProps,
} from 'recharts';
import { ChartContext, useChart, type ChartConfig, type ChartConfigItem } from './chart-context';
import './chart.css';

const cx = (base: string, className?: string) => (className ? `${base} ${className}` : base);

const PALETTE_SIZE = 5;

/** The `--color-<key>` custom property a series reads its color from, as `var(--color-<key>)`. */
const colorVar = (key: string) => `--color-${key.replace(/[^a-zA-Z0-9_-]/g, '-')}`;

/**
 * Looks up a config entry for a tooltip or legend item. Tries the explicit `nameKey` field on the
 * item's data first, then the item's own key, so pie slices (keyed by name) and cartesian series
 * (keyed by dataKey) both resolve.
 */
function getItemConfig(
  config: ChartConfig,
  item: { dataKey?: unknown; name?: unknown; payload?: unknown },
  nameKey?: string,
): { key: string; item: ChartConfigItem | undefined } {
  const data = (item.payload ?? {}) as Record<string, unknown>;
  const candidates = [
    nameKey ? data[nameKey] : undefined,
    nameKey ? (item as Record<string, unknown>)[nameKey] : undefined,
    item.dataKey,
    item.name,
  ];
  for (const candidate of candidates) {
    if (typeof candidate === 'string' && candidate in config) return { key: candidate, item: config[candidate] };
  }
  const fallback = candidates.find((candidate) => typeof candidate === 'string') as string | undefined;
  return { key: fallback ?? '', item: undefined };
}

export type ChartContainerProps = Omit<ComponentProps<'div'>, 'children'> & {
  /** Labels, icons and colors for each series or slice, keyed by data key. */
  config: ChartConfig;
  /** A single Recharts chart, for example `<BarChart>`. */
  children: ReactElement;
};

/**
 * Wraps one Recharts chart. `config` gives every series a label and a color, exposed to the chart
 * as `var(--color-<key>)` (for example `fill="var(--color-desktop)"`). Series without a `color` use
 * the palette in order. The container is responsive: it fills its width at a 16:9 ratio, and you can
 * resize it with `className` or `style`. Put `accessibilityLayer` on the chart for keyboard access.
 */
export function ChartContainer({ config, className, style, children, ...props }: ChartContainerProps) {
  const value = useMemo(() => ({ config }), [config]);
  const colors = useMemo(() => {
    const vars: Record<string, string> = {};
    Object.keys(config).forEach((key, index) => {
      vars[colorVar(key)] = config[key].color ?? `var(--tritium-chart-color-${(index % PALETTE_SIZE) + 1})`;
    });
    return vars;
  }, [config]);

  return (
    <ChartContext value={value}>
      <div
        data-chart
        className={cx('tritium-chart', className)}
        style={{ ...colors, ...style } as CSSProperties}
        {...props}
      >
        <ResponsiveContainer width="100%" height="100%" initialDimension={{ width: 480, height: 270 }}>
          {children}
        </ResponsiveContainer>
      </div>
    </ChartContext>
  );
}

/**
 * The Recharts `Tooltip`. Pass `content={<ChartTooltipContent />}` to use Tritium styling. Position
 * animation is off by default, because Recharts otherwise slides the tooltip in from the chart's
 * top-left corner the first time it appears; pass `isAnimationActive` to turn it back on.
 */
export function ChartTooltip({ isAnimationActive = false, ...props }: TooltipProps) {
  return <Tooltip isAnimationActive={isAnimationActive} {...props} />;
}

/** The Recharts `Legend`. Pass `content={<ChartLegendContent />}` to use Tritium styling. */
export const ChartLegend = Legend;

export type ChartTooltipContentProps = Omit<ComponentProps<'div'>, 'children' | 'content'> &
  Partial<Pick<TooltipContentProps, 'active' | 'payload' | 'label'>> & {
    /** Shape of the marker beside each value. */
    indicator?: 'dot' | 'line' | 'dashed';
    /** Hides the heading above the values. */
    hideLabel?: boolean;
    /** Hides the marker beside each value. */
    hideIndicator?: boolean;
    /** Data field (or config key) to use as the heading instead of the axis label. */
    labelKey?: string;
    /** Data field that holds each item's config key, for example `browser` on a pie chart. */
    nameKey?: string;
    /** Custom value formatting; return the text to show. */
    valueFormatter?: (value: number | string) => ReactNode;
  };

/**
 * The tooltip body for `ChartTooltip`: a heading, then one row per series with its color marker,
 * label and value. Labels and colors come from the `ChartContainer` config.
 */
export function ChartTooltipContent({
  active,
  payload,
  label,
  indicator = 'dot',
  hideLabel = false,
  hideIndicator = false,
  labelKey,
  nameKey,
  valueFormatter,
  className,
  ...props
}: ChartTooltipContentProps) {
  const { config } = useChart();
  if (!active || !payload?.length) return null;

  let heading: ReactNode = null;
  if (!hideLabel) {
    const first = payload[0];
    const { item } = getItemConfig(config, first, labelKey);
    const fromData = labelKey ? ((first.payload as Record<string, unknown> | undefined)?.[labelKey] as ReactNode) : undefined;
    heading = (labelKey ? (item?.label ?? fromData) : label) ?? item?.label ?? null;
  }
  const nested = payload.length === 1 && indicator !== 'dot';

  return (
    <div className={cx('tritium-chart__tooltip', className)} {...props}>
      {heading ? <div className="tritium-chart__tooltip-label">{heading}</div> : null}
      <div className="tritium-chart__tooltip-items">
        {payload
          .filter((entry) => entry.type !== 'none')
          .map((entry, index) => {
            const { key, item } = getItemConfig(config, entry, nameKey);
            const color = (entry.payload as { fill?: string } | undefined)?.fill ?? entry.color ?? `var(${colorVar(key)})`;
            const Icon = item?.icon;
            return (
              <div
                key={`${key}-${index}`}
                className={cx('tritium-chart__tooltip-item', nested ? 'tritium-chart__tooltip-item--nested' : undefined)}
              >
                {Icon ? (
                  <Icon />
                ) : hideIndicator ? null : (
                  <span
                    className={`tritium-chart__indicator tritium-chart__indicator--${indicator}`}
                    style={{ '--tritium-chart-indicator-color': color } as CSSProperties}
                  />
                )}
                <span className="tritium-chart__tooltip-name">{item?.label ?? entry.name ?? key}</span>
                {entry.value !== undefined ? (
                  <span className="tritium-chart__tooltip-value">
                    {valueFormatter
                      ? valueFormatter(entry.value as number | string)
                      : typeof entry.value === 'number'
                        ? entry.value.toLocaleString()
                        : String(entry.value)}
                  </span>
                ) : null}
              </div>
            );
          })}
      </div>
    </div>
  );
}

export type ChartLegendContentProps = Omit<ComponentProps<'div'>, 'children' | 'content'> & {
  /** Recharts passes the legend entries in. */
  payload?: ReadonlyArray<LegendPayload>;
  /** Recharts passes the legend position in; legends above the chart get space below. */
  verticalAlign?: 'top' | 'middle' | 'bottom';
  /** Data field that holds each entry's config key, for example `browser` on a pie chart. */
  nameKey?: string;
  /** Hides the icons from the config, showing color swatches only. */
  hideIcon?: boolean;
};

/** The legend body for `ChartLegend`: one swatch (or config icon) and label per series. */
export function ChartLegendContent({
  payload,
  verticalAlign = 'bottom',
  nameKey,
  hideIcon = false,
  className,
  ...props
}: ChartLegendContentProps) {
  const { config } = useChart();
  if (!payload?.length) return null;

  return (
    <div
      className={cx('tritium-chart__legend', className)}
      data-vertical-align={verticalAlign}
      {...props}
    >
      {payload
        .filter((entry) => entry.type !== 'none')
        .map((entry, index) => {
          const { key, item } = getItemConfig(config, { dataKey: entry.dataKey, name: entry.value, payload: entry.payload }, nameKey);
          const Icon = item?.icon;
          return (
            <div key={`${key}-${index}`} className="tritium-chart__legend-item">
              {Icon && !hideIcon ? (
                <Icon />
              ) : (
                <span
                  className="tritium-chart__swatch"
                  style={{ backgroundColor: entry.color ?? `var(${colorVar(key)})` }}
                />
              )}
              {item?.label ?? entry.value}
            </div>
          );
        })}
    </div>
  );
}
