"use client";
// import UnAuthorized from "@/components/general/UnAuthorized";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
// import { useState } from "react";
import { MdOutlineAddToPhotos } from "react-icons/md";
import { MdManageAccounts } from "react-icons/md";
import { VscGitStashApply } from "react-icons/vsc";
import { toast } from "sonner";
import { useAuth } from "@clerk/nextjs";
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const [active, setActive] = useState("add-jobs");
  const { getToken } = useAuth();
  const router = useRouter();

  const pathname = usePathname();
  // if (pathname === "/dashboard/add-jobs") {
  //   setActive("add-jobs");
  // }else if(pathname=== "/dashboard/manage-jobs"){
  //   setActive("manage-jobs")
  // }else{
  //   se
  // } const token = await getToken();
  useEffect(() => {
    async function fetchUserData() {
      const baseUrl =
        process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:5000";

      const token = await getToken();
      if (!token) {
        // Handle case where token is missing (user not authenticated)
        // setHasApplied(false);
        toast.error("Please login first");
        return;
      }
      const userResponse = await fetch(`${baseUrl}/api/v1/users/current-user`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
      });
      if (!userResponse.ok) {
        return router.push("/unauthorized");
      }
      const userData = await userResponse.json();
      if (!userData) {
        return router.push("/unauthorized");
      }
      const mongodbUser = userData.data;
      console.log("moNGODB user is", mongodbUser);
      if (!mongodbUser || mongodbUser.role !== "recruiter") {
        return router.push("/unauthorized");
      }
    }
    fetchUserData();
  }, [router, getToken]);
  return (
    <html lang="en">
      <body>
        <div className="flex flex-col gap-6 lg:grid lg:grid-cols-6 items-start pt-10 lg:-mx-20  ">
          <div className="lg:min-h-screen lg:col-span-1 flex lg:flex-col max-lg:border max-lg:border-gray-300  lg:border-r border-r-gray-300 dark:border-r-neutral-800 text-sm">
            {pathname === "/recruiter/dashboard/add-jobs" ? (
              <Link
                href="/recruiter/dashboard/add-jobs"
                className="flex items-center gap-2 bg-blue-100 dark:bg-muted p-4 border-r-4 border-blue-600
            "
              >
                <MdOutlineAddToPhotos size={20} />
                <h1>Add Job</h1>
              </Link>
            ) : (
              <Link
                href="/recruiter/dashboard/add-jobs"
                className="flex items-center gap-2 p-4"
              >
                {" "}
                <MdOutlineAddToPhotos size={20} />
                <h1>Add Job</h1>
              </Link>
            )}
            {pathname === "/recruiter/dashboard/manage-jobs" ? (
              <Link
                href="/recruiter/dashboard/manage-jobs"
                className="flex items-center gap-2 bg-blue-100 dark:bg-muted p-4 border-r-4 border-blue-600
            "
              >
                <MdManageAccounts size={20} />
                <h1>Manage Jobs</h1>
              </Link>
            ) : (
              <Link
                href="/recruiter/dashboard//manage-jobs"
                className="flex items-center gap-2 p-4"
              >
                {" "}
                <MdManageAccounts size={20} />
                <h1>Manage Jobs</h1>
              </Link>
            )}
            {pathname === "/recruiter/dashboard/view-applications" ? (
              <Link
                href="/recruiter/dashboard/view-applications"
                className="flex items-center gap-2 bg-blue-100 dark:bg-muted p-4 border-r-4 border-blue-600
            "
              >
                <VscGitStashApply size={20} />
                <h1>View Applications</h1>
              </Link>
            ) : (
              <Link
                href="/recruiter/dashboard/view-applications"
                className="flex items-center gap-2 p-4
              "
              >
                <VscGitStashApply size={20} />
                <h1>View Applications</h1>
              </Link>
            )}
          </div>
          <main className="lg:col-span-5">{children}</main>
        </div>
      </body>
    </html>
  );
}
