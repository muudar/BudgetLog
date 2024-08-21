'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
  SortingState,
  getSortedRowModel,
} from '@tanstack/react-table';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useEffect, useState } from 'react';
import React from 'react';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function TransactionsDataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [columnVisibility, setColumnVisibility] = useState({
    type: true,
    createdAt: true,
    description: true,
  });
  useEffect(() => {
    const updateColumnVisibility = () => {
      const smallMobileMedia = window.matchMedia('(max-width: 425px)');
      const mobileMedia = window.matchMedia(
        '(max-width: 500px) and (min-width: 425px)'
      );
      const tabletMedia = window.matchMedia(
        '(max-width: 860px) and (min-width:500px)'
      );

      if (smallMobileMedia.matches) {
        setColumnVisibility({
          type: false,
          createdAt: false,
          description: false,
        });
      } else if (mobileMedia.matches) {
        setColumnVisibility({
          type: false,
          createdAt: false,
          description: true,
        });
      } else if (tabletMedia.matches) {
        setColumnVisibility({
          type: false,
          createdAt: true,
          description: true,
        });
      } else {
        setColumnVisibility({
          type: true,
          createdAt: true,
          description: true,
        });
      }
    };

    updateColumnVisibility(); // Set the initial column visibility based on screen width

    const tabletMedia = window.matchMedia(
      '(max-width: 860px) and (min-width:500px)'
    );
    tabletMedia.addEventListener('change', updateColumnVisibility);
    const mobileMedia = window.matchMedia(
      '(max-width: 500px) and (min-width: 425px)'
    );
    mobileMedia.addEventListener('change', updateColumnVisibility);
    const smallMobileMedia = window.matchMedia('(max-width: 425px)');
    smallMobileMedia.addEventListener('change', updateColumnVisibility);

    return () => {
      tabletMedia.removeEventListener('change', updateColumnVisibility);
      mobileMedia.removeEventListener('change', updateColumnVisibility);
      smallMobileMedia.removeEventListener('change', updateColumnVisibility);
    };
  }, []);
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const table = useReactTable({
    data,
    columns,

    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),

    state: {
      columnVisibility,
      sorting,
    },
  });
  return (
    <div>
      <div className="w-full rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="mr-6 flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
