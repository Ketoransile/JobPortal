"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  flexRender,
} from "@tanstack/react-table";

import { Button } from "@/components/ui/button";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";

export type ApplicationType = {
  _id: string;
  userId: string;
  jobId: {
    _id: string;
    title: string;
    description: string;
    category: string;
    location: string;
    ctc: string;
    level: string;
    responsibilities: string[];
    skills: string[];
    applyLabel: string;
    postedBy: string;
    createdAt: string;
    updatedAt: string;
  };
  companyId: {
    _id: string;
    name: string;
    description: string;
    iconUrl: string;
    website: string;
    createdAt: string;
    updatedAt: string;
  };
  portfolio?: string;
  coverLetter: string;
  status: "accepted" | "rejected" | "pending";
  resumeUrl: string;
  createdAt: string;
  updatedAt: string;
};

export const columns: ColumnDef<ApplicationType>[] = [
  {
    accessorKey: "companyId", // Using companyId instead of 'company' since companyId is an object
    header: "Company",
    cell: ({ row }) => {
      const company = row.getValue("companyId"); // Accessing the populated companyId field
      return (
        <div className="flex items-center gap-4">
          <Image
            src={company?.iconUrl || "/default-logo.svg"} // Show a default logo if iconUrl is missing
            alt="company-image"
            width={32}
            height={32}
          />
          <div className="capitalize">{company?.name}</div>{" "}
          {/* Show company name */}
        </div>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "jobId", // This is accessed from jobId
    header: "Job Title",
    cell: ({ row }) => {
      const job = row.getValue("jobId"); // Accessing the populated jobId field
      return (
        <div className="capitalize">{job?.title}</div> // Show job title
      );
    },
  },
  {
    accessorKey: "location", // This is accessed from jobId
    header: "Location",
    cell: ({ row }) => {
      const job = row.getValue("jobId"); // Accessing jobId for location
      return (
        <div className="lowercase">{job?.location}</div> // Show job location
      );
    },
  },
  {
    accessorKey: "createdAt", // Using createdAt for application date
    header: "Date",
    cell: ({ row }) => (
      <div className="lowercase">
        {new Date(row.getValue("createdAt")).toLocaleDateString()}
      </div> // Format the createdAt date
    ),
  },
  {
    accessorKey: "status", // Status is directly on the application document
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status");

      const statusStyles: Record<string, string> = {
        accepted: "bg-green-100 text-green-700",
        rejected: "bg-red-50 text-red-700",
        pending: "bg-transparent text-gray-500 border border-gray-300",
      };

      const label: Record<string, string> = {
        accepted: "Accepted",
        rejected: "Rejected",
        pending: "Pending",
      };

      return (
        <Button
          className={`px-6 rounded-md w-20 text-xs hover:bg-inherit ${
            statusStyles[status] || "bg-gray-100 text-gray-600"
          }`}
        >
          {label[status] || status}
        </Button>
      );
    },
  },
];

export function UserApplicationsTable({
  applications,
}: {
  applications: ApplicationType[];
}) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data: applications,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      rowSelection,
    },
  });

  return (
    <div className="w-full">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className="font-bold">
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
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
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="space-x-2">
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
    </div>
  );
}
