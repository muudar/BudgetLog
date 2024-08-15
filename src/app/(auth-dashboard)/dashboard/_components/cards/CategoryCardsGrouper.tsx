import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import React from 'react';
import CategoryCard from './CategoryCard';

type Props = {
  backgroundColor: string;
  title: string;
};

const SpendingGrouper = ({ backgroundColor, title }: Props) => {
  return (
    <Card className="bg-muted/40">
      <CardHeader>
        <CardTitle className="text-xl">{title}</CardTitle>
      </CardHeader>
      <CardContent className="-mt-2 grid grid-cols-3 grid-rows-2 gap-2 lg:flex lg:flex-nowrap lg:justify-evenly">
        <CategoryCard
          value={5000}
          categoryName="Expenses"
          emoji="😅"
          backgroundColor={backgroundColor}
        ></CategoryCard>
        <CategoryCard
          value={5000}
          categoryName="Expenses"
          emoji="😅"
          backgroundColor={backgroundColor}
        ></CategoryCard>
        <CategoryCard
          value={5000}
          categoryName="Expenses"
          emoji="😅"
          backgroundColor={backgroundColor}
        ></CategoryCard>
        <CategoryCard
          value={5000}
          categoryName="Expenses"
          emoji="😅"
          backgroundColor={backgroundColor}
        ></CategoryCard>
        <CategoryCard
          value={5000}
          categoryName="Expenses"
          emoji="😅"
          backgroundColor={backgroundColor}
        ></CategoryCard>
        <CategoryCard
          value={5000}
          categoryName="Expenses"
          emoji="😅"
          backgroundColor={backgroundColor}
        ></CategoryCard>
      </CardContent>
    </Card>
  );
};

export default SpendingGrouper;
