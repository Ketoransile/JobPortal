"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import JobCard from "./JobCard";
import Image from "next/image";
import { GoOrganization } from "react-icons/go";
import { MdOutlineLocationOn } from "react-icons/md";
import { FaUser } from "react-icons/fa6";
import { GiMoneyStack } from "react-icons/gi";
import { IJob } from "@/app/types/jobType";

export const JobDetails = ({ job, jobListings, jobId }: { job: IJob, jobListings: IJob[], jobId: string }) => {
  const router = useRouter();

  const handleApplyJob = () => {
    router.push(`/job/${jobId}/apply`);
  };
  function formatDate(dateString: string) {
    return new Date(dateString).toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }
  return (
    <div className="flex flex-col items-center gap-10 mt-6 animate-in fade-in duration-500">
      <div className="w-full flex flex-col md:flex-row gap-8 items-start justify-between bg-white dark:bg-zinc-900/50 dark:backdrop-blur-md border border-gray-100 dark:border-zinc-800 rounded-3xl p-8 shadow-xl shadow-gray-200/50 dark:shadow-black/20">
        <div className="flex flex-col md:flex-row gap-6 items-start flex-1">
          <div className="h-24 w-24 rounded-2xl bg-white dark:bg-zinc-800 border border-gray-100 dark:border-zinc-700 p-4 flex items-center justify-center shrink-0">
            <Image
              src={job.companyId?.iconUrl || "/globe.svg"}
              width={80}
              height={80}
              alt="company-image"
              className="object-contain w-full h-full"
            />
          </div>
          <div className="flex flex-col gap-3">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white tracking-tight">
              {job.title}
            </h1>
            <div className="flex flex-wrap items-center gap-3 text-sm font-medium">
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-gray-100 dark:bg-zinc-800 text-gray-700 dark:text-gray-300">
                <GoOrganization className="text-blue-500" />
                {job.companyId?.name || "Unknown Company"}
              </span>
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-gray-100 dark:bg-zinc-800 text-gray-700 dark:text-gray-300">
                <MdOutlineLocationOn className="text-red-500" />
                {job.location}
              </span>
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-gray-100 dark:bg-zinc-800 text-gray-700 dark:text-gray-300">
                <FaUser className="text-purple-500" />
                {job.level}
              </span>
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-gray-100 dark:bg-zinc-800 text-gray-700 dark:text-gray-300">
                <GiMoneyStack className="text-green-500" />
                {job.ctc}
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-row md:flex-col gap-3 items-center w-full md:w-auto shrink-0">
          <Button
            className="w-full md:w-48 h-12 bg-blue-600 hover:bg-blue-500 text-white rounded-xl shadow-lg shadow-blue-500/25 transition-all hover:scale-105 active:scale-95"
            onClick={handleApplyJob}
          >
            Apply Now
          </Button>
          <p className="text-gray-400 dark:text-zinc-500 text-xs font-medium">
            Posted {formatDate(job.createdAt)}
          </p>
        </div>
      </div>

      <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <section className="bg-white dark:bg-zinc-900/50 border border-gray-100 dark:border-zinc-800 rounded-3xl p-8">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <span className="w-1 h-6 bg-blue-500 rounded-full"></span>
              Job Description
            </h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed whitespace-pre-line">
              {job.description}
            </p>
          </section>

          <section className="bg-white dark:bg-zinc-900/50 border border-gray-100 dark:border-zinc-800 rounded-3xl p-8">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <span className="w-1 h-6 bg-purple-500 rounded-full"></span>
              Key Responsibilities
            </h2>
            <ul className="space-y-3">
              {job?.responsibilities?.map(
                (responsibility: string, index: number) => (
                  <li key={index} className="flex items-start gap-3 text-gray-600 dark:text-gray-300">
                    <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-purple-500 shrink-0" />
                    {responsibility}
                  </li>
                )
              )}
            </ul>
          </section>

          <section className="bg-white dark:bg-zinc-900/50 border border-gray-100 dark:border-zinc-800 rounded-3xl p-8">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <span className="w-1 h-6 bg-green-500 rounded-full"></span>
              Skills Required
            </h2>
            <div className="flex flex-wrap gap-2">
              {job?.skills?.map((skill: string, index: number) => (
                <span key={index} className="px-3 py-1 bg-green-50 dark:bg-green-500/10 text-green-700 dark:text-green-400 border border-green-100 dark:border-green-500/20 rounded-lg text-sm font-medium">
                  {skill}
                </span>
              ))}
            </div>
          </section>
        </div>

        <div className="lg:col-span-1">
          <div className="sticky top-32 space-y-6">
            <div className="bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-800 rounded-2xl p-6">
              <h3 className="font-bold text-gray-900 dark:text-white mb-2">Interested in this role?</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Join thousands of others and take the next step in your career.
              </p>
              <Button
                className="w-full h-11 bg-blue-600 hover:bg-blue-500 text-white rounded-xl shadow-md transition-all"
                onClick={handleApplyJob}
              >
                Apply Now
              </Button>
            </div>

            <div className="border-t pt-6 dark:border-zinc-800">
              <h3 className="font-bold text-gray-900 dark:text-white mb-4">More from {job.companyId?.name}</h3>
              <div className="flex flex-col gap-4">
                {jobListings.filter(j => j._id !== jobId).slice(0, 3).map((job: IJob, index: number) => (
                  <JobCard job={job} key={index} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
