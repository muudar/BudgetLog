'use client';

import React from 'react';
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';

const chartConfig = {
  earning: {
    label: 'Earning',
    color: '#D8F3D6',
  },
  spending: {
    label: 'Spending',
    color: '#f6d5d4',
  },
} satisfies ChartConfig;

//TODO: Get data from db By month
//TODO: Add (month or week) picker
//TODO: Add (spending or earning or both picker)

type WeekChartData = {
  day: string;
  spending: number;
  earning: number;
};

type Props = {
  data: WeekChartData[];
};
const HomeSpendingChart = ({ data }: Props) => {
  return (
    <>
      <div className="mx-2 mb-6 text-xl font-bold">Analysis Chart</div>
      <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
        <BarChart accessibilityLayer data={data}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="month"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) => value.slice(0, 3)}
          />
          <YAxis orientation="left" />
          <ChartTooltip content={<ChartTooltipContent />} />
          <ChartLegend content={<ChartLegendContent />} />
          <Bar dataKey="spending" fill="var(--color-spending)" radius={4} />
          <Bar dataKey="earning" fill="var(--color-earning)" radius={4} />
        </BarChart>
      </ChartContainer>
    </>
  );
};

export default HomeSpendingChart;
