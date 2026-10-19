import type { Meta, StoryObj } from '@storybook/react-vite';
import { Controls, Description, Heading, Stories, Title } from '@storybook/addon-docs/blocks';
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Label, Line, LineChart, Pie, PieChart, XAxis, YAxis } from 'recharts';
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from './chart';
import type { ChartConfig } from './chart-context';

const monthly = [
  { month: 'January', desktop: 186, mobile: 80 },
  { month: 'February', desktop: 305, mobile: 200 },
  { month: 'March', desktop: 237, mobile: 120 },
  { month: 'April', desktop: 73, mobile: 190 },
  { month: 'May', desktop: 209, mobile: 130 },
  { month: 'June', desktop: 214, mobile: 140 },
];

const monthlyConfig = {
  desktop: { label: 'Desktop' },
  mobile: { label: 'Mobile' },
} satisfies ChartConfig;

const browsers = [
  { browser: 'chrome', visitors: 275, fill: 'var(--color-chrome)' },
  { browser: 'safari', visitors: 200, fill: 'var(--color-safari)' },
  { browser: 'firefox', visitors: 187, fill: 'var(--color-firefox)' },
  { browser: 'edge', visitors: 173, fill: 'var(--color-edge)' },
  { browser: 'other', visitors: 90, fill: 'var(--color-other)' },
];

const browserConfig = {
  chrome: { label: 'Chrome' },
  safari: { label: 'Safari' },
  firefox: { label: 'Firefox' },
  edge: { label: 'Edge' },
  other: { label: 'Other' },
} satisfies ChartConfig;

const shortMonth = (value: string) => value.slice(0, 3);

const meta = {
  title: 'Components/Chart',
  component: ChartContainer,
  tags: ['autodocs'],
  args: {
    config: monthlyConfig,
    children: (
      <BarChart accessibilityLayer data={monthly}>
        <CartesianGrid vertical={false} />
        <XAxis dataKey="month" tickLine={false} tickMargin={10} axisLine={false} tickFormatter={shortMonth} />
        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
        <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
      </BarChart>
    ),
  },
  argTypes: {
    config: {
      description: 'Label, optional icon and optional color for each series or slice, keyed by data key.',
      control: 'object',
    },
    children: { control: false },
  },
  parameters: {
    docs: {
      description: {
        component:
          'A set of parts that style [Recharts](https://recharts.org) charts with Bezel tokens. Wrap one Recharts chart in `ChartContainer` with a `config`, then use `ChartTooltip` with `ChartTooltipContent` and `ChartLegend` with `ChartLegendContent`. The Recharts components themselves (`BarChart`, `Line`, `Pie` and so on) are imported from `recharts`. Series colors are available as `var(--color-<key>)`; keys without a `color` use the palette in order. The container is 16:9 and fills its width; set `className` or `style` to change that.',
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
} satisfies Meta<typeof ChartContainer>;

export default meta;
type Story = StoryObj<typeof meta>;

/** A single-series bar chart with a tooltip. */
export const BarDefault: Story = { name: 'Bar' };

/** Two series side by side, with a legend. */
export const BarMultiple: Story = {
  render: (args) => (
    <ChartContainer {...args}>
      <BarChart accessibilityLayer data={monthly}>
        <CartesianGrid vertical={false} />
        <XAxis dataKey="month" tickLine={false} tickMargin={10} axisLine={false} tickFormatter={shortMonth} />
        <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dashed" />} />
        <ChartLegend content={<ChartLegendContent />} />
        <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
        <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
      </BarChart>
    </ChartContainer>
  ),
};

/** Series stacked on top of each other. Only the outer bars get rounded corners. */
export const BarStacked: Story = {
  render: (args) => (
    <ChartContainer {...args}>
      <BarChart accessibilityLayer data={monthly}>
        <CartesianGrid vertical={false} />
        <XAxis dataKey="month" tickLine={false} tickMargin={10} axisLine={false} tickFormatter={shortMonth} />
        <ChartTooltip content={<ChartTooltipContent hideLabel />} />
        <ChartLegend content={<ChartLegendContent />} />
        <Bar dataKey="desktop" stackId="a" fill="var(--color-desktop)" radius={[0, 0, 4, 4]} />
        <Bar dataKey="mobile" stackId="a" fill="var(--color-mobile)" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ChartContainer>
  ),
};

/** Bars that run left to right. Set `layout="vertical"` on the chart and swap the axis types. */
export const BarHorizontal: Story = {
  render: (args) => (
    <ChartContainer {...args}>
      <BarChart accessibilityLayer data={monthly} layout="vertical" margin={{ left: 8 }}>
        <CartesianGrid horizontal={false} />
        <YAxis dataKey="month" type="category" tickLine={false} tickMargin={10} axisLine={false} tickFormatter={shortMonth} />
        <XAxis type="number" hide />
        <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
        <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
      </BarChart>
    </ChartContainer>
  ),
};

/** A single smooth line. */
export const LineDefault: Story = {
  name: 'Line',
  render: (args) => (
    <ChartContainer {...args}>
      <LineChart accessibilityLayer data={monthly} margin={{ left: 12, right: 12 }}>
        <CartesianGrid vertical={false} />
        <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} tickFormatter={shortMonth} />
        <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
        <Line dataKey="desktop" type="monotone" stroke="var(--color-desktop)" strokeWidth={2} dot={false} />
      </LineChart>
    </ChartContainer>
  ),
};

/** Two lines with a legend and a line-style tooltip indicator. */
export const LineMultiple: Story = {
  render: (args) => (
    <ChartContainer {...args}>
      <LineChart accessibilityLayer data={monthly} margin={{ left: 12, right: 12 }}>
        <CartesianGrid vertical={false} />
        <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} tickFormatter={shortMonth} />
        <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="line" />} />
        <ChartLegend content={<ChartLegendContent />} />
        <Line dataKey="desktop" type="monotone" stroke="var(--color-desktop)" strokeWidth={2} dot={false} />
        <Line dataKey="mobile" type="monotone" stroke="var(--color-mobile)" strokeWidth={2} dot={false} />
      </LineChart>
    </ChartContainer>
  ),
};

/** Dots on every data point; the hovered dot grows. */
export const LineDots: Story = {
  render: (args) => (
    <ChartContainer {...args}>
      <LineChart accessibilityLayer data={monthly} margin={{ left: 12, right: 12 }}>
        <CartesianGrid vertical={false} />
        <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} tickFormatter={shortMonth} />
        <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
        <Line
          dataKey="desktop"
          type="linear"
          stroke="var(--color-desktop)"
          strokeWidth={2}
          dot={{ fill: 'var(--color-desktop)' }}
          activeDot={{ r: 6 }}
        />
      </LineChart>
    </ChartContainer>
  ),
};

/** A filled area under a single line. */
export const AreaDefault: Story = {
  name: 'Area',
  render: (args) => (
    <ChartContainer {...args}>
      <AreaChart accessibilityLayer data={monthly} margin={{ left: 12, right: 12 }}>
        <CartesianGrid vertical={false} />
        <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} tickFormatter={shortMonth} />
        <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="line" />} />
        <Area dataKey="desktop" type="natural" fill="var(--color-desktop)" fillOpacity={0.4} stroke="var(--color-desktop)" />
      </AreaChart>
    </ChartContainer>
  ),
};

/** Series stacked into one filled shape, with a legend. */
export const AreaStacked: Story = {
  render: (args) => (
    <ChartContainer {...args}>
      <AreaChart accessibilityLayer data={monthly} margin={{ left: 12, right: 12 }}>
        <CartesianGrid vertical={false} />
        <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} tickFormatter={shortMonth} />
        <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dot" />} />
        <ChartLegend content={<ChartLegendContent />} />
        <Area dataKey="mobile" type="natural" stackId="a" fill="var(--color-mobile)" fillOpacity={0.4} stroke="var(--color-mobile)" />
        <Area dataKey="desktop" type="natural" stackId="a" fill="var(--color-desktop)" fillOpacity={0.4} stroke="var(--color-desktop)" />
      </AreaChart>
    </ChartContainer>
  ),
};

/** A fill that fades out, drawn with an SVG gradient that reads the series color variable. */
export const AreaGradient: Story = {
  render: (args) => (
    <ChartContainer {...args}>
      <AreaChart accessibilityLayer data={monthly} margin={{ left: 12, right: 12 }}>
        <defs>
          <linearGradient id="chart-fill-desktop" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="var(--color-desktop)" stopOpacity={0.8} />
            <stop offset="95%" stopColor="var(--color-desktop)" stopOpacity={0.05} />
          </linearGradient>
          <linearGradient id="chart-fill-mobile" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="var(--color-mobile)" stopOpacity={0.8} />
            <stop offset="95%" stopColor="var(--color-mobile)" stopOpacity={0.05} />
          </linearGradient>
        </defs>
        <CartesianGrid vertical={false} />
        <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} tickFormatter={shortMonth} />
        <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dot" />} />
        <ChartLegend content={<ChartLegendContent />} />
        <Area dataKey="mobile" type="natural" fill="url(#chart-fill-mobile)" stroke="var(--color-mobile)" stackId="a" />
        <Area dataKey="desktop" type="natural" fill="url(#chart-fill-desktop)" stroke="var(--color-desktop)" stackId="a" />
      </AreaChart>
    </ChartContainer>
  ),
};

/** A pie chart. Each slice is colored from the config entry that matches its `browser` value. */
export const PieDefault: Story = {
  name: 'Pie',
  args: { config: browserConfig },
  render: (args) => (
    <ChartContainer {...args} style={{ maxWidth: 360, aspectRatio: '1 / 1' }}>
      <PieChart accessibilityLayer>
        <ChartTooltip content={<ChartTooltipContent hideLabel nameKey="browser" />} />
        <Pie data={browsers} dataKey="visitors" nameKey="browser" />
      </PieChart>
    </ChartContainer>
  ),
};

/** A donut: a pie with an inner radius. */
export const Donut: Story = {
  args: { config: browserConfig },
  render: (args) => (
    <ChartContainer {...args} style={{ maxWidth: 360, aspectRatio: '1 / 1' }}>
      <PieChart accessibilityLayer>
        <ChartTooltip content={<ChartTooltipContent hideLabel nameKey="browser" />} />
        <Pie data={browsers} dataKey="visitors" nameKey="browser" innerRadius="60%" strokeWidth={2} />
        <ChartLegend content={<ChartLegendContent nameKey="browser" />} />
      </PieChart>
    </ChartContainer>
  ),
};

/** A donut with the total in the middle, drawn with a Recharts `Label`. */
export const DonutWithCenterLabel: Story = {
  args: { config: browserConfig },
  render: (args) => {
    const total = browsers.reduce((sum, row) => sum + row.visitors, 0);
    return (
      <ChartContainer {...args} style={{ maxWidth: 360, aspectRatio: '1 / 1' }}>
        <PieChart accessibilityLayer>
          <ChartTooltip content={<ChartTooltipContent hideLabel nameKey="browser" />} />
          <Pie data={browsers} dataKey="visitors" nameKey="browser" innerRadius="60%" strokeWidth={2}>
            <Label
              content={({ viewBox }) => {
                if (!viewBox || !('cx' in viewBox)) return null;
                return (
                  <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle" dominantBaseline="middle">
                    <tspan x={viewBox.cx} y={viewBox.cy} fontSize="var(--typography-3xl-font-size)" fontWeight="600" fill="var(--foreground)">
                      {total.toLocaleString()}
                    </tspan>
                    <tspan x={viewBox.cx} y={(viewBox.cy ?? 0) + 24} fill="var(--muted-foreground)">
                      Visitors
                    </tspan>
                  </text>
                );
              }}
            />
          </Pie>
        </PieChart>
      </ChartContainer>
    );
  },
};

/** The three tooltip indicators, plus a tooltip with the heading and markers hidden. */
export const TooltipIndicators: Story = {
  render: (args) => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
      {(['dot', 'line', 'dashed'] as const).map((indicator) => (
        <ChartContainer key={indicator} {...args}>
          <BarChart accessibilityLayer data={monthly}>
            <CartesianGrid vertical={false} />
            <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={10} tickFormatter={shortMonth} />
            <ChartTooltip
              defaultIndex={2}
              cursor={false}
              content={<ChartTooltipContent indicator={indicator} />}
              active
            />
            <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
            <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
          </BarChart>
        </ChartContainer>
      ))}
    </div>
  ),
};

/** A config with a custom color and no color, which falls back to the palette. */
export const CustomColors: Story = {
  args: {
    config: {
      desktop: { label: 'Desktop', color: 'var(--destructive)' },
      mobile: { label: 'Mobile' },
    },
  },
  render: (args) => (
    <ChartContainer {...args}>
      <BarChart accessibilityLayer data={monthly}>
        <CartesianGrid vertical={false} />
        <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={10} tickFormatter={shortMonth} />
        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
        <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
        <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
      </BarChart>
    </ChartContainer>
  ),
};
