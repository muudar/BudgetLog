'use client';

import React, { useState } from 'react';
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';

import { Check, ChevronsUpDown } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const options = [
  { value: 'BOTH', label: 'Both' },
  {
    value: `Spending`,
    label: 'Spendings',
  },
  {
    value: 'Earnings',
    label: 'Earning',
  },
];

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

type WeekChartData = {
  day: string;
  spending: number;
  earning: number;
};

type Props = {
  data: WeekChartData[];
};

const HomeSpendingChart = ({ data }: Props) => {
  const [option, setOption] = useState('BOTH');
  return (
    <>
      <div className="mx-2 mb-6 flex items-center justify-between">
        <div className="text-xl font-bold">Analysis Chart</div>
        <div className="w-[120px] bg-muted/40">
          <Select
            defaultValue="BOTH"
            onValueChange={(e: string) => setOption(e)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select option" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Select option</SelectLabel>
                <SelectItem value="BOTH">Both</SelectItem>
                <SelectItem value="SPENDINGS">Spendings</SelectItem>
                <SelectItem value="EARNINGS">Earnings</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
      <ChartContainer config={chartConfig} className="min-h-[200px] md:w-full">
        <BarChart accessibilityLayer data={data}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="day"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) => value.slice(0, 3)}
          />
          <YAxis orientation="left" />
          <ChartTooltip content={<ChartTooltipContent />} />
          <ChartLegend content={<ChartLegendContent />} />
          {(option == 'BOTH' || option == 'SPENDINGS') && (
            <Bar dataKey="spending" fill="var(--color-spending)" radius={4} />
          )}
          {(option == 'BOTH' || option == 'EARNINGS') && (
            <Bar dataKey="earning" fill="var(--color-earning)" radius={4} />
          )}
        </BarChart>
      </ChartContainer>
    </>
  );
};

export default HomeSpendingChart;
