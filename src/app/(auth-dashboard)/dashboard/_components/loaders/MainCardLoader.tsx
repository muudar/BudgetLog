import { Skeleton } from '@/components/ui/skeleton';
import React from 'react';

type Props = {
  normalHeight: number;
  largeHeight: number;
  xLargeHeight: number;
};
const MainCardLoader = ({ normalHeight, largeHeight, xLargeHeight }: Props) => {
  return (
    <Skeleton
      className={`h-[${normalHeight}px] w-full bg-slate-200 lg:h-[${largeHeight}px] xl:h-[${xLargeHeight}px]`}
    ></Skeleton>
  );
};

export default MainCardLoader;
