import { Skeleton } from '@/components/ui/skeleton';
import React from 'react';

const loading = () => {
  return (
    <>
      <Skeleton className={`h-[325px] bg-slate-200 lg:col-span-5`}></Skeleton>
      <Skeleton className={`h-[325px] bg-slate-200 lg:col-span-5`}></Skeleton>
      <Skeleton
        className={`h-[500px] bg-slate-200 lg:col-span-full`}
      ></Skeleton>
    </>
  );
};

export default loading;
