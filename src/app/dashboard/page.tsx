import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CirclePlus, MoreHorizontal } from 'lucide-react';

const page = () => {
  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-primary">💸 Cash</CardTitle>
            <MoreHorizontal className="h-4 w-4" />
          </div>
        </CardHeader>
        <CardContent className="-mt-3">
          <div className="flex items-center gap-2">
            <div className="text-3xl font-bold">6000</div>
            <div className="text-slate-500">EGP</div>
          </div>
          <div className="mt-2 text-slate-600">
            <div>Number of transactions:</div>
            <div>Last Transaction: </div>
          </div>
        </CardContent>
        <CardFooter className="-mt-3 flex justify-end gap-2">
          <Button>Add Record</Button>
        </CardFooter>
      </Card>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-primary">💸 Cash</CardTitle>
            <MoreHorizontal className="h-4 w-4" />
          </div>
        </CardHeader>
        <CardContent className="-mt-3">
          <div className="flex items-center gap-2">
            <div className="text-3xl font-bold">6000</div>
            <div className="text-slate-500">EGP</div>
          </div>
          <div className="mt-2 text-slate-600">
            <div>Number of transactions:</div>
            <div>Last Transaction: </div>
          </div>
        </CardContent>
        <CardFooter className="-mt-3 flex justify-end gap-2">
          <Button>Add Record</Button>
        </CardFooter>
      </Card>
      <Card className="flex h-[228px] items-center justify-center">
        <div className="flex cursor-pointer flex-col items-center gap-2 text-2xl text-primary">
          <CirclePlus />
          <div>Add Wallet</div>
        </div>
      </Card>
    </>
  );
};

export default page;
