import MainCardLoader from './_components/loaders/MainCardLoader';

const loading = () => {
  return (
    <div className="grid grid-cols-2 grid-rows-2 gap-2 lg:col-span-3">
      <MainCardLoader></MainCardLoader>
      <MainCardLoader></MainCardLoader>
      <MainCardLoader></MainCardLoader>
      <MainCardLoader></MainCardLoader>
    </div>
  );
};

export default loading;
