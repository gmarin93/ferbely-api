"use client";

import React, { useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
  SortingState,
  ColumnFiltersState,
  ColumnDef,
} from "@tanstack/react-table";
import { 
  ChevronUp, 
  ChevronDown, 
  ChevronsUpDown, 
  Search, 
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight
} from "lucide-react";
import { 
  cardVariants, 
  textVariants, 
  inputVariants, 
  buttonVariants,
  tableVariants,
  tableHeaderVariants,
  tableCellVariants
} from "@/styles/variants";
import { cn } from "@/lib/utils";
import type { VariantProps } from "class-variance-authority";

interface TableProps extends VariantProps<typeof tableVariants> {
  data: any[];
  columns: ColumnDef<any>[];
  title: string;
  className?: string;
}

const Table: React.FC<TableProps> = ({ 
  data, 
  columns, 
  title, 
  variant = 'default', 
  size = 'md', 
  className 
}) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState("");

  const table = useReactTable({
    data: data || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    state: {
      sorting,
      columnFilters,
      globalFilter,
    },
    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
  });

  return (
    <div className={cn(cardVariants({ padding: 'none' }), className)}>
      {/* Header with Title and Search */}
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h2 className={textVariants({ variant: 'h3' })}>{title}</h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              value={globalFilter ?? ""}
              onChange={(e) => setGlobalFilter(e.target.value)}
              className={cn(inputVariants({ size }), "pl-10")}
              placeholder={`Search ${title.toLowerCase()}...`}
            />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        {data && data.length > 0 ? (
          <>
            <table className={tableVariants({ variant, size })}>
              <thead className="bg-gray-50">
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <th
                        key={header.id}
                        className={tableHeaderVariants({ size })}
                        onClick={header.column.getToggleSortingHandler()}
                      >
                        <div className="flex items-center space-x-1">
                          <span>
                            {header.isPlaceholder
                              ? null
                              : flexRender(
                                  header.column.columnDef.header,
                                  header.getContext()
                                )}
                          </span>
                          <span className="ml-1">
                            {{
                              asc: <ChevronUp className="h-4 w-4" />,
                              desc: <ChevronDown className="h-4 w-4" />,
                            }[header.column.getIsSorted() as string] ?? (
                              <ChevronsUpDown className="h-4 w-4 opacity-50" />
                            )}
                          </span>
                        </div>
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {table.getRowModel().rows.map((row) => (
                  <tr key={row.id} className="hover:bg-gray-50 transition-colors">
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id} className={tableCellVariants({ size })}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination */}
            <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className={textVariants({ variant: 'body' })}>
                  Showing{" "}
                  <span className={textVariants({ weight: 'medium' })}>
                    {table.getState().pagination.pageIndex *
                      table.getState().pagination.pageSize +
                      1}
                  </span>{" "}
                  to{" "}
                  <span className={textVariants({ weight: 'medium' })}>
                    {Math.min(
                      (table.getState().pagination.pageIndex + 1) *
                        table.getState().pagination.pageSize,
                      table.getFilteredRowModel().rows.length
                    )}
                  </span>{" "}
                  of{" "}
                  <span className={textVariants({ weight: 'medium' })}>
                    {table.getFilteredRowModel().rows.length}
                  </span>{" "}
                  results
                </span>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  className={buttonVariants({ variant: 'ghost', size: 'icon' })}
                  onClick={() => table.setPageIndex(0)}
                  disabled={!table.getCanPreviousPage()}
                >
                  <ChevronsLeft className="h-4 w-4" />
                </button>
                <button
                  className={buttonVariants({ variant: 'ghost', size: 'icon' })}
                  onClick={() => table.previousPage()}
                  disabled={!table.getCanPreviousPage()}
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                
                <span className="flex items-center space-x-1">
                  <span className={textVariants({ variant: 'body' })}>Page</span>
                  <strong className={textVariants({ variant: 'body', weight: 'medium' })}>
                    {table.getState().pagination.pageIndex + 1} of{" "}
                    {table.getPageCount()}
                  </strong>
                </span>

                <button
                  className={buttonVariants({ variant: 'ghost', size: 'icon' })}
                  onClick={() => table.nextPage()}
                  disabled={!table.getCanNextPage()}
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
                <button
                  className={buttonVariants({ variant: 'ghost', size: 'icon' })}
                  onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                  disabled={!table.getCanNextPage()}
                >
                  <ChevronsRight className="h-4 w-4" />
                </button>

                <select
                  value={table.getState().pagination.pageSize}
                  onChange={(e) => {
                    table.setPageSize(Number(e.target.value));
                  }}
                  className={cn(inputVariants({ size: 'sm' }), "ml-2")}
                >
                  {[5, 10, 20, 30, 40, 50].map((pageSize) => (
                    <option key={pageSize} value={pageSize}>
                      Show {pageSize}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </>
        ) : (
          // No data state
          <div className="px-6 py-12 text-center">
            <CalendarDays className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className={cn(textVariants({ variant: 'h4' }), "mb-2")}>
              No {title.toLowerCase()} found
            </h3>
            <p className={textVariants({ variant: 'muted' })}>
              There are currently no {title.toLowerCase()} in the system.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Table;
