import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
  CardFooter,
} from '@/components/ui/card';
import React from 'react';

type Props = {
  earnings: number;
};

const EarningsCard = ({ earnings }: Props) => {
  return (
    <Card className="bg-[#ECF5F4]">
      <CardHeader>
        <CardTitle className="text-lg">Earnings</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="-mt-4 flex items-center gap-1 text-2xl font-bold text-neutral-900">
          <span className="text-lg">EGP</span> {earnings}
        </CardDescription>
      </CardContent>
      <CardFooter className="-mt-4 text-sm">
        <span className="text-green-400">+2.5%&nbsp;</span>last month
      </CardFooter>
    </Card>
  );
};

export default EarningsCard;
