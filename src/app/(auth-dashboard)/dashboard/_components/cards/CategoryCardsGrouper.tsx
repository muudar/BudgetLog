import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import React from 'react';
import CategoryCard from './CategoryCard';
import prisma from '@/lib/db';
import { auth } from '@clerk/nextjs/server';

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

const CategoryCardsGrouper = async ({
  backgroundColor,
  title,
  data,
}: Props) => {
  const { userId } = auth();
  if (!userId) return null;
  const userData = await prisma.user.findFirst({
    where: {
      id: userId,
    },
  });
  if (!userData) return null;
  return (
    <Card className="bg-muted/40 lg:h-[200px]">
      <CardHeader>
        <CardTitle className="text-xl">{title}</CardTitle>
      </CardHeader>
      <CardContent className="-mt-2 grid grid-cols-3 grid-rows-2 gap-2 lg:grid-cols-6 lg:grid-rows-1">
        {data.length > 0 ? (
          data.map((category) => (
            <CategoryCard
              currency={userData?.currency}
              key={category.name}
              value={category.totalAmount}
              categoryName={category.name}
              emoji={category.emoji}
              backgroundColor={backgroundColor}
            ></CategoryCard>
          ))
        ) : (
          <div className="col-span-6 flex items-center justify-center text-lg">
            No transactions found.
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CategoryCardsGrouper;
