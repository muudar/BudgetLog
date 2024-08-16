import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import React from 'react';
import CategoryCard from './CategoryCard';

type CategoryData = {
  name: string;
  emoji: string;
  totalAmount: number;
};

type Props = {
  backgroundColor: string;
  title: string;
  data: CategoryData[];
};

const CategoryCardsGrouper = ({ backgroundColor, title, data }: Props) => {
  return (
    <Card className="bg-muted/40 lg:h-[200px]">
      <CardHeader>
        <CardTitle className="text-xl">{title}</CardTitle>
      </CardHeader>
      <CardContent className="-mt-2 grid grid-cols-3 grid-rows-2 gap-2 lg:grid-cols-6 lg:grid-rows-1">
        {data.length > 0 ? (
          data.map((category) => (
            <CategoryCard
              key={category.name}
              value={category.totalAmount}
              categoryName={category.name}
              emoji={category.emoji}
              backgroundColor={backgroundColor}
            ></CategoryCard>
          ))
        ) : (
          <div>Error fetching Data</div>
        )}
      </CardContent>
    </Card>
  );
};

export default CategoryCardsGrouper;
