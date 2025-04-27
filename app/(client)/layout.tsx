"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
// import { useState } from "react";
import { MdOutlineAddToPhotos } from "react-icons/md";
import { MdManageAccounts } from "react-icons/md";
import { VscGitStashApply } from "react-icons/vsc";
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const [active, setActive] = useState("add-jobs");
  const pathname = usePathname();
  // if (pathname === "/dashboard/add-jobs") {
  //   setActive("add-jobs");
  // }else if(pathname=== "/dashboard/manage-jobs"){
  //   setActive("manage-jobs")
  // }else{
  //   se
  // }
  return (
    <html lang="en">
      <body>
        <div className="grid grid-cols-6 items-start pt-10 -mx-20  ">
          <div className="min-h-screen col-span-1 flex flex-col  border-r border-r-gray-300 text-sm">
            {pathname === "/dashboard/add-jobs" ? (
              <Link
                href="/dashboard/add-jobs"
                className="flex items-center gap-2 bg-blue-100 p-4 border-r-4 border-blue-600
            "
              >
                <MdOutlineAddToPhotos size={20} />
                <h1>Add Job</h1>
              </Link>
            ) : (
              <Link
                href="/dashboard/add-jobs"
                className="flex items-center gap-2 p-4"
              >
                {" "}
                <MdOutlineAddToPhotos size={20} />
                <h1>Add Job</h1>
              </Link>
            )}
            {pathname === "/dashboard/manage-jobs" ? (
              <Link
                href="/dashboard/manage-jobs"
                className="flex items-center gap-2 bg-blue-100 p-4 border-r-4 border-blue-600
            "
              >
                <MdManageAccounts size={20} />
                <h1>Manage Jobs</h1>
              </Link>
            ) : (
              <Link
                href="/dashboard//manage-jobs"
                className="flex items-center gap-2 p-4"
              >
                {" "}
                <MdManageAccounts size={20} />
                <h1>Manage Jobs</h1>
              </Link>
            )}
            {pathname === "/dashboard/view-applications" ? (
              <Link
                href="/dashboard/view-applications"
                className="flex items-center gap-2 bg-blue-100 p-4 border-r-4 border-blue-600
            "
              >
                <VscGitStashApply size={20} />
                <h1>View Applications</h1>
              </Link>
            ) : (
              <Link
                href="/dashboard/view-applications"
                className="flex items-center gap-2 p-4
              "
              >
                <VscGitStashApply size={20} />
                <h1>View Applications</h1>
              </Link>
            )}
          </div>
          <main className="col-span-5">{children}</main>
        </div>
      </body>
    </html>
  );
}
