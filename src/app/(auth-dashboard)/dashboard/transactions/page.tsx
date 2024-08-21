import prisma from '@/lib/db';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { TransactionsDataTable } from './_components/TransactionTable';
import { columns } from './_components/column';
import { SpendingsPieChart } from './_components/SpendingsPieChart';
import { EarningsPieChart } from './_components/EarningsPieChart';

const page = async () => {
  const { userId } = auth();
  if (!userId) redirect('/login');
  let transactions = null;
  try {
    transactions = await prisma.transaction.findMany({
      where: {
        userId,
        type: {
          in: ['SPENDING', 'EARNING'],
        },
      },
      include: {
        category: true,
      },
    });
  } catch (error) {
    console.error(error);
  }
  if (!transactions) return null;
  return (
    <>
      <div className="lg:col-span-5">
        <SpendingsPieChart></SpendingsPieChart>
      </div>
      <div className="lg:col-span-5">
        <EarningsPieChart></EarningsPieChart>
      </div>
      <div className="border bg-balanceBg lg:col-span-full">
        <TransactionsDataTable
          data={transactions}
          columns={columns}
        ></TransactionsDataTable>
      </div>
    </>
  );
};

export default page;
