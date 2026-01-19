import React from "react";
// import Filter from "./Filter";
import JobCard from "./JobCard";
import { IJob } from "@/app/types/jobType";
import { fetchJobs } from "./fetchJobs";
import { Button } from "../ui/button";
// import { redirect } from "next/navigation";
import Link from "next/link";
import MobileScreenJobsCarousel from "./MobileScreenJobsCarousel";
import { ArrowRight } from "lucide-react";

const JobList = async () => {
  const response = await fetchJobs();
  const jobListings = response.jobs;
  return (
    <section className="w-full py-20">
      <div className="w-full grid grid-cols-4 items-start gap-8">
        {/* <div className="col-span-1">
        <Filter />
        </div> */}
        <div className="w-full col-span-4 flex flex-col gap-8">
          <div className="flex flex-col md:flex-row gap-6 items-end justify-between pb-6 border-b border-gray-200 dark:border-gray-800">
            <div>
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white mb-2">
                Latest <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">Jobs</span>
              </h1>
              <h2 className="text-gray-500 dark:text-gray-400">
                Get your desired job from top companies
              </h2>
            </div>
            <div>
              <Link href="/all-jobs">
                <Button variant="outline" className="group border-blue-200 bg-blue-50 text-blue-600 hover:bg-blue-100 hover:text-blue-700 dark:border-blue-900/30 dark:bg-blue-900/10 dark:text-blue-400 dark:hover:bg-blue-900/20">
                  See All Jobs <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
          </div>

          <div className="hidden md:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {jobListings.length > 0 &&
              jobListings
                .slice(0, 8)
                .map((job: IJob, index: number) => (
                  <JobCard job={job} key={index} />
                ))}
          </div>

          <div className="md:hidden">
            <MobileScreenJobsCarousel jobListings={jobListings} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default JobList;
