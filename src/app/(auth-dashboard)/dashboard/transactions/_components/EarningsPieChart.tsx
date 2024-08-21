'use client';

import { Label, Pie, PieChart } from 'recharts';

import {
  Card,
  CardContent,
  CardDescription,
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
import { getEarningsChartData } from '@/actions/transactions';
import LoadingSpinner from '../../_components/loaders/LoadingSpinner';

const chartConfig = {
  category: {
    label: 'Category',
  },
} satisfies ChartConfig;

export function EarningsPieChart() {
  const [chartData, setChartData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  useEffect(() => {
    async function fetchChartData() {
      try {
        const result = await getEarningsChartData();
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
  console.log(chartData);
  const total = chartData.reduce((total, item) => total + item.earnt, 0);
  return (
    <Card className="flex flex-col bg-muted/40">
      <CardHeader className="items-center pb-0">
        <CardTitle>Pie Chart - Earnings</CardTitle>
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
                dataKey="earnt"
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
                            Earnt
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
