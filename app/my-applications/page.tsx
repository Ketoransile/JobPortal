"use client";
import { UserApplicationsTable } from "@/components/general/users/UserApplicationsTable";
// import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { SVGProps } from "react";
export default function MyApplicationsPage() {
  const { isSignedIn, getToken } = useAuth();

  const router = useRouter();
  const [applications, setApplications] = useState([]);
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
      console.log("Response from my applications page", userResponse);
      if (!userResponse.ok) {
        return router.push("/unauthorized");
      }
      const userData = await userResponse.json();
      console.log("user data from my app page", userData);
      if (!userData) {
        return router.push("/unauthorized");
      }
      const mongodbUser = userData.data;
      console.log("moNGODB user is", mongodbUser);
      if (!mongodbUser || mongodbUser.role !== "user") {
        return router.push("/unauthorized");
      }

      const applicationResponse = await fetch(
        `${baseUrl}/api/v1/applications/my-applications`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          cache: "no-store",
        }
      );
      if (applicationResponse) {
        const appliationData = await applicationResponse.json();
        setApplications(appliationData.data);
        console.log(appliationData);
      }
    }
    fetchUserData();
  }, [router, getToken]);
  const totalApplications = applications ? applications.length : 0;
  const inProgress = applications
    ? applications.filter((app) => app.status === "pending").length
    : 0;
  const accepted = applications
    ? applications.filter((app) => app.status === "accepted").length
    : 0;

  if (!isSignedIn) {
    return router.push("/sign-in");
  }
  return (
    <div className="container mx-auto px-6 py-10">
      <div className="flex flex-col gap-10">
        {/* Header Section */}
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight">My Applications</h1>
          <p className="text-muted-foreground text-lg">
            Track and manage your job applications effortlessly.
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard
            title="Total Applications"
            value={totalApplications.toString()}
            change="+3 this week"
            icon={<TrendingUpIcon className="h-6 w-6 text-green-500" />}
          />
          <StatCard
            title="Pending"
            value={inProgress.toString()}
            change="+1 this week"
            icon={<ClockIcon className="h-6 w-6 text-blue-500" />}
          />
          <StatCard
            title="Accepted"
            value={accepted.toString()}
            change="No change"
            icon={<CalendarCheckIcon className="h-6 w-6 text-purple-500" />}
          />
        </div>

        {/* Applications Table */}
        <Card className="shadow-md rounded-2xl border border-gray-200 dark:border-neutral-900">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl font-semibold">
              Recent Applications
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-xl overflow-hidden">
              <UserApplicationsTable applications={applications} />
            </div>
          </CardContent>
        </Card>

        {/* Empty State (Optional) */}
        {/* 
        <div className="flex flex-col items-center justify-center py-16 gap-6">
          <FolderOpenIcon className="h-14 w-14 text-gray-300" />
          <h3 className="text-xl font-semibold">No applications yet</h3>
          <p className="text-muted-foreground text-center max-w-sm">
            You haven't applied to any jobs yet. Start your journey by exploring new opportunities.
          </p>
          <Button className="mt-4">Browse Jobs</Button>
        </div> 
        */}
      </div>
    </div>
  );
}

// StatCard component
function StatCard({
  title,
  value,
  change,
  icon,
}: {
  title: string;
  value: string;
  change: string;
  icon: React.ReactNode;
}) {
  return (
    <Card className="hover:shadow-lg transition-shadow duration-300 rounded-2xl border border-gray-200 dark:border-neutral-900">
      <CardContent className="p-6 flex flex-col gap-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center justify-center h-10 w-10 bg-muted rounded-full">
            {icon}
          </div>
          <div>
            <p className="text-sm text-muted-foreground font-medium">{title}</p>
            <h3 className="text-2xl font-bold">{value}</h3>
          </div>
        </div>
        <p className="text-xs text-muted-foreground">{change}</p>
      </CardContent>
    </Card>
  );
}
function TrendingUpIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
      <polyline points="16 7 22 7 22 13" />
    </svg>
  );
}

function ClockIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function CalendarCheckIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
      <line x1="16" x2="16" y1="2" y2="6" />
      <line x1="8" x2="8" y1="2" y2="6" />
      <line x1="3" x2="21" y1="10" y2="10" />
      <path d="m9 16 2 2 4-4" />
    </svg>
  );
}

// function FolderOpenIcon(props: any) {
//   return (
//     <svg
//       {...props}
//       xmlns="http://www.w3.org/2000/svg"
//       width="24"
//       height="24"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     >
//       <path d="m6 14 1.5-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.54 6a2 2 0 0 1-1.95 1.5H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H18a2 2 0 0 1 2 2v2" />
//     </svg>
//   );
// }
