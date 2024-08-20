import { Skeleton } from '@/components/ui/skeleton';
import MainCardLoader from './_components/loaders/MainCardLoader';

const loading = () => {
  return (
    <>
      <div className="grid grid-cols-2 grid-rows-2 gap-2 lg:col-span-6">
        <Skeleton
          className={`h-[150px] w-full bg-slate-200 lg:h-[172px] xl:h-[200px]`}
        ></Skeleton>
        <Skeleton
          className={`h-[150px] w-full bg-slate-200 lg:h-[172px] xl:h-[200px]`}
        ></Skeleton>
        <Skeleton
          className={`h-[150px] w-full bg-slate-200 lg:h-[172px] xl:h-[200px]`}
        ></Skeleton>
        <Skeleton
          className={`h-[150px] w-full bg-slate-200 lg:h-[172px] xl:h-[200px]`}
        ></Skeleton>
      </div>
      <div className="lg:col-span-4">
        <Skeleton
          className={`h-[307px] w-full bg-slate-200 lg:h-[350px] xl:h-[405px]`}
        ></Skeleton>
      </div>
      <div className="lg:col-span-4">
        <Skeleton
          className={`h-[250px] w-full bg-slate-200 lg:h-[420px] xl:h-[420px]`}
        ></Skeleton>
      </div>
      <div className="flex flex-col justify-between gap-4 lg:col-span-6">
        <Skeleton
          className={`h-[200px] w-full bg-slate-200 lg:h-[200px] xl:h-[200px]`}
        ></Skeleton>
        <Skeleton
          className={`h-[200px] w-full bg-slate-200 lg:h-[200px] xl:h-[200px]`}
        ></Skeleton>
      </div>
    </>
  );
};

export default loading;
