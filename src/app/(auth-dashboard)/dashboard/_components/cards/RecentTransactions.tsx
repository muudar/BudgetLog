import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import prisma from '@/lib/db';
import { auth } from '@clerk/nextjs/server';
import React from 'react';

const RecentTransactions = async ({ currency }: { currency: string }) => {
  const { userId } = auth();
  if (!userId) return null;
  const recentTransactions = await prisma.transaction.findMany({
    where: {
      userId: userId,
      type: {
        in: ['SPENDING', 'EARNING'],
      },
    },
    include: {
      category: true,
    },
    orderBy: {
      createdAt: 'desc', // Sorts by 'createdAt' in descending order
    },
    take: 8,
  });
  return (
    <Card className="bg-muted/40 lg:h-[520px]">
      <CardHeader>
        <CardTitle className="text-xl">Recent Transactions</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        {recentTransactions.length > 0 ? (
          recentTransactions.map((transaction) => (
            <div key={transaction.id} className="-mt-1 flex justify-between">
              <div className="flex items-center gap-4">
                <div
                  className={`b-1 text-md flex size-10 items-center justify-center border bg-${transaction.type == 'SPENDING' ? 'spendingsBg' : 'earningsBg'}`}
                >
                  {transaction.category?.emoji}
                </div>
                <div className="flex flex-col">
                  <div className="text-md w-[30vw] truncate font-bold sm:w-full sm:text-lg">
                    {transaction.category?.name}
                  </div>
                  <div className="-mt-1 w-[30vwpx] truncate text-xs sm:w-full sm:text-sm">
                    {!transaction.description
                      ? 'No details given.'
                      : transaction.description.substring(0, 16) +
                        (transaction.description.length >= 16 ? '...' : '')}
                  </div>
                </div>
              </div>
              <div
                className={`text-md self-center sm:text-lg ${transaction.type == 'SPENDING' ? 'text-red-500' : 'text-green-500'}`}
              >
                {(transaction.type == 'SPENDING' ? '-' : '+') +
                  transaction.amount +
                  ' ' +
                  currency}
              </div>
            </div>
          ))
        ) : (
          <div className="flex h-[100px] items-center justify-center text-lg">
            No transactions found.
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RecentTransactions;
