// "use client";

// import * as React from "react";
// import {
//   ColumnDef,
//   ColumnFiltersState,
//   SortingState,
//   VisibilityState,
//   flexRender,
//   getCoreRowModel,
//   getFilteredRowModel,
//   getPaginationRowModel,
//   getSortedRowModel,
//   useReactTable,
// } from "@tanstack/react-table";
// // import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react";

// import { Button } from "@/components/ui/button";
// import { Checkbox } from "@/components/ui/checkbox";
// // import {
// //   DropdownMenu,
// //   DropdownMenuCheckboxItem,
// //   DropdownMenuContent,
// //   DropdownMenuItem,
// //   DropdownMenuLabel,
// //   DropdownMenuSeparator,
// //   DropdownMenuTrigger,
// // } from "@/components/ui/dropdown-menu";
// // import { Input } from "@/components/ui/input";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";

// const data: Job[] = [
//   {
//     title: "Frontend Developer",
//     date: "2025-04-20",
//     location: "Bangalore",
//     applicants: 45,
//     visible: true,
//   },
//   {
//     title: "Data Scientist",
//     date: "2025-04-18",
//     location: "New York",
//     applicants: 32,
//     visible: false,
//   },
//   {
//     title: "UI/UX Designer",
//     date: "2025-04-15",
//     location: "Mumbai",
//     applicants: 21,
//     visible: true,
//   },
//   {
//     title: "Network Administrator",
//     date: "2025-04-10",
//     location: "Chennai",
//     applicants: 16,
//     visible: false,
//   },
//   {
//     title: "Marketing Manager",
//     date: "2025-04-22",
//     location: "California",
//     applicants: 38,
//     visible: true,
//   },
//   {
//     title: "Backend Engineer",
//     date: "2025-04-19",
//     location: "Hyderabad",
//     applicants: 27,
//     visible: true,
//   },
//   {
//     title: "Product Manager",
//     date: "2025-04-13",
//     location: "Washington",
//     applicants: 19,
//     visible: false,
//   },
//   {
//     title: "Cybersecurity Analyst",
//     date: "2025-04-09",
//     location: "New York",
//     applicants: 25,
//     visible: true,
//   },
//   {
//     title: "DevOps Engineer",
//     date: "2025-04-16",
//     location: "Bangalore",
//     applicants: 30,
//     visible: false,
//   },
//   {
//     title: "Content Strategist",
//     date: "2025-04-21",
//     location: "California",
//     applicants: 14,
//     visible: true,
//   },
// ];

// export type Job = {
//   title: string;
//   date: string; // ISO date format
//   location: string;
//   applicants: number;
//   visible: boolean;
// };

// export const columns: ColumnDef<Job>[] = [
//   {
//     id: "row-number",
//     header: "#",
//     cell: ({ row }) => row.index + 1,
//     enableSorting: false,
//     enableHiding: false,
//   },
//   {
//     accessorKey: "title",
//     header: "Job Title",
//     cell: ({ row }) => <div>{row.getValue("title")}</div>,
//   },
//   {
//     accessorKey: "date",
//     header: "Date",
//     cell: ({ row }) => {
//       const date = new Date(row.getValue("date"));
//       return <div>{date.toLocaleDateString()}</div>;
//     },
//   },
//   {
//     accessorKey: "location",
//     header: "Location",
//     cell: ({ row }) => <div>{row.getValue("location")}</div>,
//   },
//   {
//     accessorKey: "applicants",
//     header: "Applicants",
//     cell: ({ row }) => <div>{row.getValue("applicants")}</div>,
//   },
//   {
//     accessorKey: "visible",
//     header: "Visible",
//     cell: ({ row }) => {
//       const checked = row.getValue("visible");
//       return (
//         <Checkbox
//           checked={checked as boolean}
//           onCheckedChange={(value) => {
//             if (row.getValue("visible") !== value) {
//               console.log("Toggle visible:", row.original.title, value);
//             }
//           }}
//         />
//       );
//     },
//   },
// ];

// export function ManageJobsTable() {
//   const [sorting, setSorting] = React.useState<SortingState>([]);
//   const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
//     []
//   );
//   const [columnVisibility, setColumnVisibility] =
//     React.useState<VisibilityState>({});
//   const [rowSelection, setRowSelection] = React.useState({});

//   const table = useReactTable({
//     data,
//     columns,
//     onSortingChange: setSorting,
//     onColumnFiltersChange: setColumnFilters,
//     getCoreRowModel: getCoreRowModel(),
//     getPaginationRowModel: getPaginationRowModel(),
//     getSortedRowModel: getSortedRowModel(),
//     getFilteredRowModel: getFilteredRowModel(),
//     onColumnVisibilityChange: setColumnVisibility,
//     onRowSelectionChange: setRowSelection,
//     state: {
//       sorting,
//       columnFilters,
//       columnVisibility,
//       rowSelection,
//     },
//   });

//   return (
//     <div className="w-full ">
//       <div className="w-full rounded-md border grid grid-cols-1">
//         <Table>
//           <TableHeader>
//             {table.getHeaderGroups().map((headerGroup) => (
//               <TableRow key={headerGroup.id}>
//                 {headerGroup.headers.map((header) => {
//                   return (
//                     <TableHead key={header.id} className="font-bold">
//                       {header.isPlaceholder
//                         ? null
//                         : flexRender(
//                             header.column.columnDef.header,
//                             header.getContext()
//                           )}
//                     </TableHead>
//                   );
//                 })}
//               </TableRow>
//             ))}
//           </TableHeader>
//           <TableBody>
//             {table.getRowModel().rows?.length ? (
//               table.getRowModel().rows.map((row) => (
//                 <TableRow
//                   key={row.id}
//                   data-state={row.getIsSelected() && "selected"}
//                 >
//                   {row.getVisibleCells().map((cell) => (
//                     <TableCell key={cell.id}>
//                       {flexRender(
//                         cell.column.columnDef.cell,
//                         cell.getContext()
//                       )}
//                     </TableCell>
//                   ))}
//                 </TableRow>
//               ))
//             ) : (
//               <TableRow>
//                 <TableCell
//                   colSpan={columns.length}
//                   className="h-24 text-center"
//                 >
//                   No results.
//                 </TableCell>
//               </TableRow>
//             )}
//           </TableBody>
//         </Table>
//       </div>
//       <div className="flex items-center justify-end space-x-2 py-4">
//         {/* <div className="flex-1 text-sm text-muted-foreground">
//           {table.getFilteredSelectedRowModel().rows.length} of{" "}
//           {table.getFilteredRowModel().rows.length} row(s) selected.
//         </div> */}
//         <div className="space-x-2">
//           <Button
//             variant="outline"
//             size="sm"
//             onClick={() => table.previousPage()}
//             disabled={!table.getCanPreviousPage()}
//           >
//             Previous
//           </Button>
//           <Button
//             variant="outline"
//             size="sm"
//             onClick={() => table.nextPage()}
//             disabled={!table.getCanNextPage()}
//           >
//             Next
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// }
"use client";

import * as React from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  useReactTable,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
// import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";

export type Job = {
  title: string;
  date: string;
  location: string;
  applicants: number;
  visible: boolean;
};

const initialData: Job[] = [
  {
    title: "Frontend Developer",
    date: "2025-04-20",
    location: "Bangalore",
    applicants: 45,
    visible: true,
  },
  {
    title: "Data Scientist",
    date: "2025-04-18",
    location: "New York",
    applicants: 32,
    visible: false,
  },
  {
    title: "UI/UX Designer",
    date: "2025-04-15",
    location: "Mumbai",
    applicants: 21,
    visible: true,
  },
  {
    title: "Network Administrator",
    date: "2025-04-10",
    location: "Chennai",
    applicants: 16,
    visible: false,
  },
  {
    title: "Marketing Manager",
    date: "2025-04-22",
    location: "California",
    applicants: 38,
    visible: true,
  },
  {
    title: "Backend Engineer",
    date: "2025-04-19",
    location: "Hyderabad",
    applicants: 27,
    visible: true,
  },
  {
    title: "Product Manager",
    date: "2025-04-13",
    location: "Washington",
    applicants: 19,
    visible: false,
  },
  {
    title: "Cybersecurity Analyst",
    date: "2025-04-09",
    location: "New York",
    applicants: 25,
    visible: true,
  },
  {
    title: "DevOps Engineer",
    date: "2025-04-16",
    location: "Bangalore",
    applicants: 30,
    visible: false,
  },
  {
    title: "Content Strategist",
    date: "2025-04-21",
    location: "California",
    applicants: 14,
    visible: true,
  },
];

export function ManageJobsTable() {
  const [data, setData] = React.useState<Job[]>(initialData);
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const handleDelete = (index: number) => {
    const newData = [...data];
    newData.splice(index, 1);
    setData(newData);
  };

  const columns: ColumnDef<Job>[] = [
    {
      id: "row",
      header: "#",
      cell: ({ row }) => row.index + 1,
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "title",
      header: "Job Title",
    },
    {
      accessorKey: "date",
      header: "Date",
      cell: ({ row }) => {
        const date = new Date(row.getValue("date"));
        return <div>{date.toLocaleDateString()}</div>;
      },
    },
    {
      accessorKey: "location",
      header: "Location",
    },
    {
      accessorKey: "applicants",
      header: "Applicants",
    },
    // {
    //   accessorKey: "visible",
    //   header: "Visible",
    //   cell: ({ row }) => {
    //     const checked = row.getValue("visible") as boolean;
    //     return (
    //       <Checkbox
    //         checked={checked}
    //         onCheckedChange={(value) => {
    //           const newData = [...data];
    //           newData[row.index].visible = !!value;
    //           setData(newData);
    //         }}
    //       />
    //     );
    //   },
    // },
    {
      id: "actions",
      header: "Actions",
      enableHiding: false,
      cell: ({ row }) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">Open menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => handleDelete(row.index)}
              className="text-red-500"
            >
              Delete
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View Details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="w-full">
      <div className="rounded-md border grid grid-cols-1 ">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
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
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
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
                  className="text-center py-6"
                >
                  No jobs found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-end space-x-2 py-4">
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
