import React from "react";
import Filter from "./Filter";
import { jobListings } from "@/lib/jobsData";
import JobCard from "./JobCard";
const JobList = () => {
  return (
    <div className="w-full grid grid-cols-4 items-start justify-between  pt-20 pb-10">
      <div className="col-span-1">
        <Filter />
      </div>
      <div className="w-full col-span-3 flex flex-col gap-4">
        <h1 className="text-3xl font-bold">Latest Jobs</h1>
        <h2 className="text-md">Get your desired job from top companies</h2>
        <div className="grid grid-cols-3 items-start gap-4">
          {jobListings.slice(0, 6).map((job, index) => (
            <JobCard job={job} key={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default JobList;
