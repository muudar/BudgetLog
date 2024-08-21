'use client';

import * as React from 'react';
import { TrendingUp } from 'lucide-react';
import { Label, Legend, Pie, PieChart } from 'recharts';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { useEffect, useState } from 'react';
import {
  getSpendingsChartData,
  getTopSpendingCategories,
} from '@/actions/transactions';
import LoadingSpinner from '../../_components/loaders/LoadingSpinner';

const chartConfig = {
  category: {
    label: 'Category',
  },
} satisfies ChartConfig;

const chartData = [
  { category: 'Food', spent: 800, fill: 'hsl(var(--chart-1))' },
  { category: 'Health', spent: 200, fill: 'hsl(var(--chart-2))' },
  { category: 'GF', spent: 287, fill: 'hsl(var(--chart-3))' },
  { category: 'Gifts', spent: 173, fill: 'hsl(var(--chart-4))' },
  { category: 'other', spent: 190, fill: 'hsl(var(--chart-5))' },
  { category: 'other', spent: 190, fill: 'hsl(var(--chart-6))' },
  { category: 'other', spent: 190, fill: 'hsl(var(--chart-7))' },
];

export function SpendingsPieChart() {
  const [chartData, setChartData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  useEffect(() => {
    async function fetchChartData() {
      try {
        const result = await getSpendingsChartData();
        if (result.ok) {
          if (result.data) setChartData(result.data);
        } else {
          throw new Error(result.message);
        }
      } catch (err) {
        console.error('Failed to fetch chart data', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    fetchChartData();
  }, []);
  const total = chartData.reduce((total, item) => total + item.spent, 0);
  return (
    <Card className="flex flex-col bg-muted/40">
      <CardHeader className="items-center pb-0">
        <CardTitle>Pie Chart - Spendings</CardTitle>
        <CardDescription>All time stats</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        {loading ? (
          <div className="flex h-[250px] items-center justify-center">
            <LoadingSpinner size={40}></LoadingSpinner>
          </div>
        ) : error ? (
          <div className="flex h-[250px] items-center justify-center text-red-500">
            Loading...
          </div>
        ) : (
          <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square max-h-[250px]"
          >
            <PieChart>
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Pie
                data={chartData}
                dataKey="spent"
                nameKey="category"
                innerRadius={60}
                strokeWidth={5}
              >
                <Label
                  content={({ viewBox }) => {
                    if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                      return (
                        <text
                          x={viewBox.cx}
                          y={viewBox.cy}
                          textAnchor="middle"
                          dominantBaseline="middle"
                        >
                          <tspan
                            x={viewBox.cx}
                            y={viewBox.cy}
                            className="fill-foreground text-3xl font-bold"
                          >
                            {total}
                          </tspan>
                          <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) + 24}
                            className="fill-muted-foreground"
                          >
                            Spent
                          </tspan>
                        </text>
                      );
                    }
                  }}
                />
              </Pie>
            </PieChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
}
