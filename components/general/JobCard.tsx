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
    <div className="flex flex-col  gap-2 p-2 sm:p-6 dark:bg-neutral-900 border border-gray-200 dark:border-neutral-900 rounded-md shadow-2xl dark:shadow-none shadow-gray-200">
      <Image
        src={job.companyId.iconUrl}
        width={32}
        height={32}
        alt="company-image "
        className="w-20 h-20 bg-white dark:p-2"
      />
      <h1 className="font-semibold text-lg">{job.title}</h1>
      <div className="flex max-sm:w-fit  sm:items-center gap-2 text-xs ">
        <div className=" max-sm:w-fit  px-2 sm:px-6 py-2 bg-blue-100 border border-blue-200 rounded-sm text-black text-xs">
          {job.location}
        </div>
        <div className=" max-sm:w-fit  px-2 sm:px-6 py-2 bg-red-100 border border-red-200 rounded-sm text-black text-xs">
          {job.level}
        </div>
      </div>
      <p className="text-xs pt-4 text-gray-500  dark:text-white gap-2 h-20 overflow-auto">
        {job.description}
      </p>
      <div className="flex items-center gap-4">
        <Button
          className="bg-blue-600 cursor-pointer hover:bg-blue-400 text-white rounded-md text-xs disabled:bg-blue-300"
          disabled={hasApplied}
          // onClick={handleApplyButton} disabled={hasApplied}
        >
          <Link href={`/job/${job._id}`}>
            {" "}
            {hasApplied ? "Applied" : "Apply"}
          </Link>
        </Button>
        <Button className="bg-transparent hover:bg-gray-300 dark:hover:bg-neutral-800 cursor-pointer text-gray-600 dark:text-white border border-gray-200 dark:border-neutral-900 rounded-md text-xs ">
          <Link href={`/job/${job._id}`}>Learn More</Link>
        </Button>
      </div>
    </div>
  );
};

export default JobCard;
