import MainDashboardCards from './_components/cards/MainDashboardCards';

const page = () => {
  return (
    <>
      <div className="grid grid-cols-2 grid-rows-2 gap-2 lg:col-span-3">
        <MainDashboardCards></MainDashboardCards>
      </div>
    </>
  );
};

export default page;
