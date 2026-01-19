"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
// const jobs = [];
import { IJob } from "@/app/types/jobType";
import Link from "next/link";
import { useAuth } from "@clerk/nextjs";
const JobCard = ({ job }: { job: IJob }) => {
  const { isSignedIn, getToken } = useAuth();
  const [hasApplied, setHasApplied] = useState(false);
  useEffect(() => {
    // Check if the user has already applied for this job
    const checkApplicationStatus = async () => {
      try {
        const token = await getToken();
        if (!token) {
          // Handle case where token is missing (user not authenticated)
          setHasApplied(false);
          return;
        }

        const baseUrl =
          process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:5000";

        const response = await fetch(
          `${baseUrl}/api/v1/applications/check-application/${job._id}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
            credentials: "include",
          }
        );

        // If response is OK, update the state
        if (response.ok) {
          const data = await response.json();
          setHasApplied(data.hasApplied);
        } else {
          console.error("Failed to check application status");
          setHasApplied(false); // Handle failed response
        }
      } catch (error) {
        console.error("Error checking application status:", error);
        setHasApplied(false); // Set to false in case of error
      }
    };

    if (isSignedIn) {
      checkApplicationStatus();
    }
  }, [job._id, isSignedIn, getToken]);

  return (
    <div className="group flex flex-col gap-4 p-5 bg-white dark:bg-neutral-900/50 dark:backdrop-blur-md border border-gray-100 dark:border-neutral-800 rounded-xl hover:shadow-xl hover:border-blue-500/20 hover:-translate-y-1 transition-all duration-300">
      <div className="flex items-start justify-between">
        <div className="h-14 w-14 rounded-xl overflow-hidden bg-gray-50 dark:bg-neutral-800 border border-gray-100 dark:border-neutral-700 p-2 flex items-center justify-center">
          <Image
            src={job.companyId?.iconUrl || "/globe.svg"}
            width={40}
            height={40}
            alt="company-image"
            className="object-contain w-full h-full"
          />
        </div>
        {(hasApplied) && (
          <span className="px-2 py-1 bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 text-[10px] font-bold uppercase rounded-full">Applied</span>
        )}
      </div>

      <div>
        <h1 className="font-bold text-lg text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-1">{job.title}</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 line-clamp-1">{job.companyId?.name || "Unknown Company"}</p>
      </div>

      <div className="flex flex-wrap gap-2 text-xs font-medium">
        <span className="px-2.5 py-1 bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400 rounded-md border border-blue-100 dark:border-blue-500/20">
          {job.location}
        </span>
        <span className="px-2.5 py-1 bg-purple-50 text-purple-700 dark:bg-purple-500/10 dark:text-purple-400 rounded-md border border-purple-100 dark:border-purple-500/20">
          {job.level}
        </span>
      </div>

      <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 h-10 leading-relaxed">
        {job.description}
      </p>

      <div className="flex items-center gap-3 pt-2 mt-auto">
        <Link href={`/job/${job._id}`} passHref className="flex-1">
          <Button
            className="w-full bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-sm font-medium shadow-sm shadow-blue-500/20 disabled:opacity-70 disabled:cursor-not-allowed"
            disabled={hasApplied}
          >
            {hasApplied ? "Applied" : "Apply Now"}
          </Button>
        </Link>
        <Link href={`/job/${job._id}`} passHref>
          <Button variant="ghost" className="hover:bg-gray-100 dark:hover:bg-neutral-800 text-gray-600 dark:text-gray-300 rounded-lg text-sm font-medium border border-transparent hover:border-gray-200 dark:hover:border-neutral-700">
            Details
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default JobCard;
