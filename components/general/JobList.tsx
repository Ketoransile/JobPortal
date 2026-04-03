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

          {response.error ? (
            <div className="flex flex-col items-center justify-center py-12 text-center col-span-full bg-red-50/50 dark:bg-red-900/10 rounded-2xl border border-red-100 dark:border-red-900/30 w-full">
              <h3 className="text-xl font-semibold text-red-600 dark:text-red-400 mb-2">Failed to load jobs</h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm max-w-md mx-auto">
                We're having trouble connecting to our database. Please try again later or check your connection.
              </p>
            </div>
          ) : jobListings.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center col-span-full bg-gray-50 dark:bg-zinc-900/30 rounded-2xl border border-gray-100 dark:border-zinc-800 w-full">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No jobs available</h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm max-w-md mx-auto">
                It looks like there are no job listings at the moment. Please check back later!
              </p>
            </div>
          ) : (
            <>
              <div className="hidden md:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full">
                {jobListings
                  .slice(0, 8)
                  .map((job: IJob, index: number) => (
                    <JobCard job={job} key={index} />
                  ))}
              </div>

              <div className="md:hidden w-full">
                <MobileScreenJobsCarousel jobListings={jobListings} />
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default JobList;
