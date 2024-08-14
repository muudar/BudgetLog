import MainDashboardCards from './_components/cards/MainDashboardCards';

const page = () => {
  return (
    <>
      <div className="grid grid-cols-2 grid-rows-2 gap-2 lg:col-span-3">
        <MainDashboardCards></MainDashboardCards>
      </div>
      <div className="b-1 flex h-full w-full items-center justify-center border border-red-500 lg:col-span-2">
        CHART
      </div>
    </>
  );
};

export default page;
