'use client';

import { ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

type Category = {
  id: string;
  name: string;
  emoji: string;
  userId: string | null;
} | null;

type Transaction = {
  id: string;
  amount: number;
  type: 'SPENDING' | 'EARNING' | 'TRANSFER';
  to: string | null;
  from: string | null;
  description: string | null;
  userId: string;
  categoryId: string | null;
  createdAt: Date;
  updatedAt: Date;
  category: Category;
};

export const columns: ColumnDef<Transaction>[] = [
  {
    accessorKey: 'type',
    header: 'Type',
    cell: ({ row }) => {
      const type = row.getValue('type');
      return type == 'SPENDING' ? (
        <div className="fon-bold text-red-500">SPENDING</div>
      ) : (
        <div className="font-bold text-green-500">EARNINGZ</div>
      );
    },
  },
  {
    accessorKey: 'category',
    header: 'Category',
    cell: ({ row }) => {
      const category = row.getValue('category') as Category;
      console.log(category);
      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              {' '}
              <div className="ml-4 flex gap-1 md:ml-0">
                {category?.emoji}{' '}
                <span className="hidden md:block">{category?.name}</span>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>{category?.name}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    },
  },
  {
    accessorKey: 'amount',
    header: 'Amount',
    cell: ({ row }) => {
      const amount = row.getValue('amount');
      const type = row.getValue('type');
      return type == 'SPENDING' ? (
        <div className="text-red-500">{`-${amount}`}</div>
      ) : (
        <div className="text-green-500">{`+${amount}`}</div>
      );
    },
  },
  //   {
  //     accessorKey: 'createdAt',
  //     header: 'Date',
  //     cell: ({ row }) => {
  //       const date: Date = row.getValue('createdAt');
  //       const dateString = date.toISOString();
  //       return (
  //         <div>
  //           {dateString.replace('T', ' ').split(':')[0] +
  //             ':' +
  //             dateString.split(':')[1]}
  //         </div>
  //       );
  //     },
  //   },
  {
    id: 'actions',
    cell: ({ row }) => {
      const payment = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem className="cursor-pointer">Edit</DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer text-red-500">
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
