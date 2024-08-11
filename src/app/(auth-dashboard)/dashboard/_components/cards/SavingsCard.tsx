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
  savings: number;
};

const SavingsCard = ({ savings }: Props) => {
  return (
    <Card className="bg-[#EBEFFE]">
      <CardHeader>
        <CardTitle className="text-lg">Savings</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="-mt-4 flex items-center gap-1 text-2xl font-bold text-neutral-900">
          <span className="text-lg">EGP</span> {savings}
        </CardDescription>
      </CardContent>
      <CardFooter className="-mt-4 text-sm">
        <span className="text-green-400">+2.5%&nbsp;</span>last month
      </CardFooter>
    </Card>
  );
};

export default SavingsCard;
