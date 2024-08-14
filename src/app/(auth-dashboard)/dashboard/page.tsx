import MainDashboardCards from './_components/cards/MainDashboardCards';
import RecentTransactions from './_components/cards/RecentTransactions';

const page = () => {
  return (
    <>
      <div className="grid grid-cols-2 grid-rows-2 gap-2 lg:col-span-3">
        <MainDashboardCards></MainDashboardCards>
      </div>
      <div className="b-1 flex h-full w-full items-center justify-center border border-red-500 lg:col-span-2">
        CHART
      </div>
      <div className="b-1 rounded-md border border-slate-400 lg:col-span-2">
        <RecentTransactions></RecentTransactions>
      </div>
      <div className="b-1 flex h-full w-full items-center justify-center border border-red-500 lg:col-span-3">
        SPENDING ANALYSIS
      </div>
    </>
  );
};

export default page;
