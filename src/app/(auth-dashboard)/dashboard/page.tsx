import MainDashboardCards from './_components/cards/MainDashboardCards';
import RecentTransactions from './_components/cards/RecentTransactions';
import SpendingsAndEarnings from './_components/cards/SpendingsAndEarnings';

const page = () => {
  return (
    <>
      <div className="grid grid-cols-2 grid-rows-2 gap-2 lg:col-span-3">
        <MainDashboardCards></MainDashboardCards>
      </div>
      <div className="b-1 flex h-full w-full items-center justify-center border border-red-500 lg:col-span-2">
        CHART
      </div>
      <div className="rounded-md border lg:col-span-2">
        <RecentTransactions></RecentTransactions>
      </div>
      <div className="flex h-full flex-col justify-between lg:col-span-3">
        <SpendingsAndEarnings></SpendingsAndEarnings>
      </div>
    </>
  );
};

export default page;
