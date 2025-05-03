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
// import { MdOutlineFileDownload } from "react-icons/md";
// // import { Checkbox } from "@/components/ui/checkbox";
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
// import Link from "next/link";
// import {
//   ActionComboBox,
//   // ActionDropDown,
// } from "@/components/client/ActionComboBox";

// export const data: Application[] = [
//   {
//     username: "john_doe",
//     jobTitle: "Frontend Developer",
//     location: "Bangalore",
//     resume: "https://example.com/resumes/john_doe.pdf",
//   },
//   {
//     username: "jane_smith",
//     jobTitle: "Data Scientist",
//     location: "New York",
//     resume: "https://example.com/resumes/jane_smith.pdf",
//   },
//   {
//     username: "alex_jones",
//     jobTitle: "UI/UX Designer",
//     location: "Mumbai",
//     resume: "https://example.com/resumes/alex_jones.pdf",
//   },
//   {
//     username: "sam_lee",
//     jobTitle: "Network Administrator",
//     location: "Chennai",
//     resume: "https://example.com/resumes/sam_lee.pdf",
//   },
//   {
//     username: "linda_ray",
//     jobTitle: "Marketing Manager",
//     location: "California",
//     resume: "https://example.com/resumes/linda_ray.pdf",
//   },
//   {
//     username: "tom_hardy",
//     jobTitle: "Backend Engineer",
//     location: "Hyderabad",
//     resume: "https://example.com/resumes/tom_hardy.pdf",
//   },
//   {
//     username: "emma_wilson",
//     jobTitle: "Product Manager",
//     location: "Washington",
//     resume: "https://example.com/resumes/emma_wilson.pdf",
//   },
//   {
//     username: "noah_khan",
//     jobTitle: "Cybersecurity Analyst",
//     location: "New York",
//     resume: "https://example.com/resumes/noah_khan.pdf",
//   },
//   {
//     username: "olivia_white",
//     jobTitle: "DevOps Engineer",
//     location: "Bangalore",
//     resume: "https://example.com/resumes/olivia_white.pdf",
//   },
//   {
//     username: "liam_brooks",
//     jobTitle: "Content Strategist",
//     location: "California",
//     resume: "https://example.com/resumes/liam_brooks.pdf",
//   },
// ];

// export type Application = {
//   username: string;
//   jobTitle: string;
//   location: string;
//   resume: string; // URL to the resume file
// };

// export const columns: ColumnDef<Application>[] = [
//   {
//     id: "row-number",
//     header: "#",
//     cell: ({ row }) => row.index + 1, // Show row number starting from 1
//     enableSorting: false,
//     enableHiding: false,
//   },
//   {
//     accessorKey: "username",
//     header: "Username",
//     cell: ({ row }) => <div>{row.getValue("username")}</div>,
//   },
//   {
//     accessorKey: "jobTitle",
//     header: "Job Title",
//     cell: ({ row }) => <div>{row.getValue("jobTitle")}</div>,
//   },
//   {
//     accessorKey: "location",
//     header: "Location",
//     cell: ({ row }) => <div>{row.getValue("location")}</div>,
//   },
//   {
//     accessorKey: "resume",
//     header: "Resume",
//     cell: ({ row }) => {
//       const resumeUrl = row.getValue("resume") as string;
//       return (
//         <div className="w-fit flex items-center justify-center pr-2   bg-blue-100 rounded-md  text-blue-500 ">
//           <Button variant="link" asChild>
//             <Link
//               href={resumeUrl}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="hover:none"
//             >
//               <p className="text-blue-500">View Resume</p>
//             </Link>
//           </Button>
//           <MdOutlineFileDownload size={20} className="" />
//         </div>
//       );
//     },
//   },
//   {
//     accessorKey: "action",
//     header: "Action",
//     // cell: ({ row }) => (
//     cell: () => (
//       <div className="">
//         <ActionComboBox />
//       </div>
//     ),
//   },
// ];

// export function ViewApplicationsTable() {
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
//     <div className=" ">
//       <div className="rounded-md border grid grid-cols-1 ">
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
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { MdOutlineFileDownload } from "react-icons/md";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";

export type Application = {
  username: string;
  jobTitle: string;
  location: string;
  resume: string;
  status: "Pending" | "Accepted" | "Rejected";
};

const initialData: Application[] = [
  {
    username: "john_doe",
    jobTitle: "Frontend Developer",
    location: "Bangalore",
    resume: "https://example.com/resumes/john_doe.pdf",
    status: "Pending",
  },
  {
    username: "jane_smith",
    jobTitle: "Data Scientist",
    location: "New York",
    resume: "https://example.com/resumes/jane_smith.pdf",
    status: "Pending",
  },
];

export function ViewApplicationsTable() {
  const [data, setData] = React.useState<Application[]>(initialData);
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const handleDecision = (
    index: number,
    status: "Accepted" | "Rejected" | "Pending"
  ) => {
    setData((prev) =>
      prev.map((app, i) => (i === index ? { ...app, status } : app))
    );
  };

  const columns: ColumnDef<Application>[] = [
    {
      id: "row-number",
      header: "#",
      cell: ({ row }) => row.index + 1,
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "username",
      header: "Username",
      cell: ({ row }) => <div>{row.getValue("username")}</div>,
    },
    {
      accessorKey: "jobTitle",
      header: "Job Title",
      cell: ({ row }) => <div>{row.getValue("jobTitle")}</div>,
    },
    {
      accessorKey: "location",
      header: "Location",
      cell: ({ row }) => <div>{row.getValue("location")}</div>,
    },
    {
      accessorKey: "resume",
      header: "Resume",
      cell: ({ row }) => {
        const resumeUrl = row.getValue("resume") as string;
        return (
          <div className="w-fit flex items-center pr-2 bg-blue-100 rounded-md text-blue-500">
            <Button variant="link" asChild>
              <Link href={resumeUrl} target="_blank" rel="noopener noreferrer">
                <p className="text-blue-500">View Resume</p>
              </Link>
            </Button>
            <MdOutlineFileDownload size={20} />
          </div>
        );
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.original.status;
        const statusColor =
          status === "Accepted"
            ? "text-green-600"
            : status === "Rejected"
            ? "text-red-600"
            : "text-yellow-500";

        return <span className={`font-semibold ${statusColor}`}>{status}</span>;
      },
    },
    {
      accessorKey: "action",
      header: "Action",
      cell: ({ row }) => {
        return (
          <div className="flex gap-2">
            <Button
              size="sm"
              className="bg-yellow-500 hover:bg-yellow-600 text-white"
              onClick={() => handleDecision(row.index, "Pending")}
            >
              Pending
            </Button>
            <Button
              size="sm"
              className="bg-green-500 hover:bg-green-600 text-white"
              onClick={() => handleDecision(row.index, "Accepted")}
            >
              Accept
            </Button>
            <Button
              size="sm"
              className="bg-red-500 hover:bg-red-600 text-white"
              onClick={() => handleDecision(row.index, "Rejected")}
            >
              Reject
            </Button>
          </div>
        );
      },
    },
  ];

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
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
    <div>
      <div className="rounded-md border grid grid-cols-1">
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
