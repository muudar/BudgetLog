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
  balance: number;
};

const BalanceCard = ({ balance }: Props) => {
  return (
    <Card className="bg-[#ECF5E7]">
      <CardHeader>
        <CardTitle className="text-lg">Balance</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="-mt-4 flex items-center gap-1 text-2xl font-bold text-neutral-900">
          <span className="text-lg">EGP</span> {balance}
        </CardDescription>
      </CardContent>
      <CardFooter className="-mt-4 text-sm">
        <span className="text-green-400">+2.5%&nbsp;</span>last month
      </CardFooter>
    </Card>
  );
};

export default BalanceCard;
