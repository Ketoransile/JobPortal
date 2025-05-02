import React from "react";
// import Filter from "./Filter";
import JobCard from "./JobCard";
import { IJob } from "@/app/types/jobType";
import { fetchJobs } from "./fetchJobs";
import { Button } from "../ui/button";
// import { redirect } from "next/navigation";
import Link from "next/link";
const JobList = async () => {
  const response = await fetchJobs();
  const jobListings = response.jobs;
  return (
    <div className="w-full grid grid-cols-4 items-start justify-between  pt-20 pb-10">
      {/* <div className="col-span-1">
        <Filter />
      </div> */}
      <div className="w-full col-span-4 flex flex-col gap-4">
        <div className="flex items center justify-between pb-10">
          <div className="">
            <h1 className="text-3xl font-bold">Latest Jobs</h1>
            <h2 className="text-md">Get your desired job from top companies</h2>
          </div>
          <div className="">
            <Link href="/all-jobs">
              <Button className="bg-blue-600 hover:bg-blue-300 cursor-pointer">
                See All Jobs
              </Button>
            </Link>
          </div>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 items-start gap-4">
          {jobListings.length > 0 &&
            jobListings
              .slice(0, 6)
              .map((job: IJob, index: number) => (
                <JobCard job={job} key={index} />
              ))}
        </div>
      </div>
    </div>
    // </div>
  );
};

export default JobList;
