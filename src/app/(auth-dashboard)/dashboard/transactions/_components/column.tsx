'use client';

import { ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ArrowUpDown } from 'lucide-react';
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
import { DeleteTransactionModal } from './DeleteTransactionModal';

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
        <div className="font-bold text-green-500">EARNING</div>
      );
    },
  },
  {
    accessorKey: 'description',
    header: 'Description',
    cell: ({ row }) => {
      const description: string = row.getValue('description');
      return description ? (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <div className="w-[100px] truncate text-left text-sm text-slate-400">
                {description}
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>{description}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ) : (
        <div>None</div>
      );
    },
  },
  {
    accessorKey: 'category',
    header: 'Category',
    cell: ({ row }) => {
      const category = row.getValue('category') as Category;
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
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Amount
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const amount = row.getValue('amount');
      const type = row.getValue('type');
      return type == 'SPENDING' ? (
        <div className="ml-6 text-red-500">{`-${amount}`}</div>
      ) : (
        <div className="ml-6 text-green-500">{`+${amount}`}</div>
      );
    },
  },
  {
    accessorKey: 'createdAt',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Amount
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const date: Date = row.getValue('createdAt');
      const dateString = date.toISOString();
      return (
        <div>
          {dateString.replace('T', ' ').split(':')[0] +
            ':' +
            dateString.split(':')[1]}
        </div>
      );
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <div className="cursor-pointer rounded-md px-2 py-1 text-sm hover:bg-slate-100">
              Edit
            </div>
            <div className="cursor-pointer rounded-md px-2 py-1 text-sm text-red-500 hover:bg-slate-100">
              <DeleteTransactionModal
                id={row.original.id}
              ></DeleteTransactionModal>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
