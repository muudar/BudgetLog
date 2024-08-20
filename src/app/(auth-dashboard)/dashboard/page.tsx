import { auth } from '@clerk/nextjs/server';
import ChartDataWrapper from './_components/cards/ChartDataWrapper';
import HomeSpendingChart from './_components/cards/HomeSpendingChart';
import MainDashboardCards from './_components/cards/MainDashboardCards';
import RecentTransactions from './_components/cards/RecentTransactions';
import SpendingsAndEarnings from './_components/cards/SpendingsAndEarnings';
import { userData } from '@/lib/types';
import { getCurrentUserData } from '@/actions/actions';

const page = async () => {
  const userData: userData | null = await getCurrentUserData();
  if (!userData) return null;
  return (
    <>
      <div className="grid grid-cols-2 grid-rows-2 gap-2 lg:col-span-6">
        <MainDashboardCards userData={userData}></MainDashboardCards>
      </div>
      <div className="flex w-full flex-col justify-center border py-4 md:px-4 lg:col-span-4 lg:h-[350px] xl:h-[400px]">
        <ChartDataWrapper></ChartDataWrapper>
      </div>
      <div className="rounded-md border lg:col-span-4">
        <RecentTransactions currency={userData.currency}></RecentTransactions>
      </div>
      <div className="flex h-full flex-col justify-between space-y-4 lg:col-span-6">
        <SpendingsAndEarnings
          currency={userData.currency}
        ></SpendingsAndEarnings>
      </div>
    </>
  );
};

export default page;
