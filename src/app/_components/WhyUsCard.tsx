import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { TrendingUp } from 'lucide-react';
import { LucideIcon } from 'lucide-react';
import React from 'react';

type Props = {
  title: string;
  description: string;
  Icon: LucideIcon;
};

const WhyUsCard = ({ title, description, Icon }: Props) => {
  return (
    <Card className="relative bg-muted/60">
      <div className="-mt-5 ml-6 flex h-[50px] w-[50px] items-center justify-center rounded border bg-spendingsBg p-2">
        <Icon />
      </div>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
    </Card>
  );
};

export default WhyUsCard;
