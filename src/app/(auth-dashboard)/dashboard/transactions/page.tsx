import prisma from '@/lib/db';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { TransactionsDataTable } from './_components/TransactionTable';
import { columns } from './_components/column';

//TODO: Table responsivity , add/remove DATE column

const page = async () => {
  const { userId } = auth();
  if (!userId) redirect('/login');
  let transactions = null;
  try {
    transactions = await prisma.transaction.findMany({
      where: {
        userId,
      },
      include: {
        category: true,
      },
    });
  } catch (error) {
    console.error(error);
  }
  if (!transactions) return null;
  console.log(transactions);
  return (
    <>
      <div className="bg-red-500 lg:col-span-5">Item 1</div>
      <div className="bg-red-500 lg:col-span-5">Item 2</div>
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
