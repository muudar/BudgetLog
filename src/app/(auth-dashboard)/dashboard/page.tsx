import ChartDataWrapper from './_components/cards/ChartDataWrapper';
import HomeSpendingChart from './_components/cards/HomeSpendingChart';
import MainDashboardCards from './_components/cards/MainDashboardCards';
import RecentTransactions from './_components/cards/RecentTransactions';
import SpendingsAndEarnings from './_components/cards/SpendingsAndEarnings';

const page = () => {
  return (
    <>
      <div className="grid grid-cols-2 grid-rows-2 gap-2 lg:col-span-3">
        <MainDashboardCards></MainDashboardCards>
      </div>
      <div className="flex w-full flex-col justify-center border p-4 lg:col-span-2 lg:h-[350px] xl:h-[400px]">
        <ChartDataWrapper></ChartDataWrapper>
      </div>
      <div className="rounded-md border lg:col-span-2">
        <RecentTransactions></RecentTransactions>
      </div>
      <div className="flex h-full flex-col justify-between space-y-4 lg:col-span-3">
        <SpendingsAndEarnings></SpendingsAndEarnings>
      </div>
    </>
  );
};

export default page;
