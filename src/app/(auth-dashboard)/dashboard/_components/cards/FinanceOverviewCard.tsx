import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
  CardFooter,
} from '@/components/ui/card';
import { ArrowUpRight } from 'lucide-react';
import React from 'react';

type Props = {
  value: number;
  title: string;
  backgroundColor: string;
};

const FinanceOverviewCard = ({ value, title, backgroundColor }: Props) => {
  return (
    <Card className={`bg-[${backgroundColor}]`}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">{title}</CardTitle>
          <div className="b-1 cursor-pointer rounded-md border bg-white p-1">
            <ArrowUpRight />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <CardDescription className="-mt-4 flex items-center gap-1 text-2xl font-bold text-neutral-900">
          <span className="text-lg">EGP</span> {value}
        </CardDescription>
      </CardContent>
      <CardFooter className="-mt-4 text-sm">
        <span className="text-green-400">+2.5%&nbsp;</span>last month
      </CardFooter>
    </Card>
  );
};

export default FinanceOverviewCard;
