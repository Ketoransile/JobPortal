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
    <div className="flex flex-col lg:flex-row min-h-screen bg-white dark:bg-zinc-950 pt-10">
      <aside className="lg:w-64 shrink-0 flex flex-row lg:flex-col lg:border-r border-gray-100 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/50 backdrop-blur-sm lg:min-h-[calc(100vh-80px)] sticky top-24 z-30 overflow-x-auto lg:overflow-visible">
        <nav className="flex lg:flex-col gap-1 p-4 w-full">
          <NavLink
            href="/recruiter/dashboard/add-jobs"
            active={pathname === "/recruiter/dashboard/add-jobs"}
            icon={<MdOutlineAddToPhotos size={20} />}
            label="Add Job"
          />
          <NavLink
            href="/recruiter/dashboard/manage-jobs"
            active={pathname === "/recruiter/dashboard/manage-jobs"}
            icon={<MdManageAccounts size={20} />}
            label="Manage Jobs"
          />
          <NavLink
            href="/recruiter/dashboard/view-applications"
            active={pathname === "/recruiter/dashboard/view-applications"}
            icon={<VscGitStashApply size={20} />}
            label="View Applications"
          />
        </nav>
      </aside>
      <main className="flex-1 p-6 lg:p-10 animate-in fade-in duration-500">
        {children}
      </main>
    </div>
  );
}

function NavLink({ href, active, icon, label }: { href: string; active: boolean; icon: React.ReactNode; label: string }) {
  return (
    <Link
      href={href}
      className={`
        flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 whitespace-nowrap
        ${active
          ? "bg-blue-600 text-white shadow-lg shadow-blue-500/25 font-medium"
          : "text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-zinc-800 hover:text-gray-900 dark:hover:text-white"
        }
      `}
    >
      {icon}
      <span>{label}</span>
      {active && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-white/50 lg:block hidden" />}
    </Link>
  );
}
