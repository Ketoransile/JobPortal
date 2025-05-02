"use client";
import { redirect } from "next/navigation";
import { Button } from "../ui/button";
import JobCard from "./JobCard";
import Image from "next/image";
import { GoOrganization } from "react-icons/go";
import { MdOutlineLocationOn } from "react-icons/md";
import { FaUser } from "react-icons/fa6";
import { GiMoneyStack } from "react-icons/gi";
import { IJob } from "@/app/types/jobType";

export const JobDetails = ({ job, jobListings, jobId }) => {
  const handleApplyJob = async () => {
    redirect(`/job/${jobId}/apply`);
  };
  function formatDate(dateString: string) {
    return new Date(dateString).toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }
  return (
    <div className="flex flex-col items-center mt-10">
      <div className="w-full flex max-lg:flex-col gap-20 lg:items-center bg-blue-100 border border-blue-300 rounded-xl px-10 lg:justify-between py-20">
        <div className="flex max-lg:flex-col lg:items-center gap-4">
          <Image
            src={job.companyId.iconUrl}
            width={100}
            height={100}
            alt="company-image"
            className="bg-white p-6 rounded-xl"
          />
          <div className="flex flex-col gap-2 text-gray-600">
            <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold">
              {job.title}
            </h1>
            <div className="grid grid-cols-2 md:grid-cols-4 items-center gap-6">
              <div className="flex items-center gap-2">
                <GoOrganization size={20} />
                {job.companyId.name}
              </div>
              <div className="flex items-center gap-2">
                <MdOutlineLocationOn size={20} />
                {job.location}
              </div>
              <div className="flex items-center gap-2">
                <FaUser size={20} />
                {job.level}
              </div>
              <div className="flex items-center gap-2">
                <GiMoneyStack size={20} />
                {job.ctc}
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4 lg:items-center ">
          <Button
            className="w-fit py-6 bg-blue-600 px-10 rounded-sm cursor-pointer hover:bg-blue-400"
            onClick={handleApplyJob}
          >
            Apply Now
          </Button>
          <p className="text-gray-600 text-xs lg:text-center">
            {formatDate(job.createdAt)}
          </p>
        </div>
      </div>
      <div className="w-full flex flex-col lg:grid grid-cols-5 gap-6 items-start pt-10 ">
        <div className="w-full col-span-3 flex flex-col gap-6  ">
          <h1 className="font-bold text-2xl">Job Description</h1>
          <p className="text-sm text-gray-600 pl-4">{job.description}</p>
          <h1 className="font-bold text-2xl">Key Responsibilities</h1>
          <ol className="flex flex-col gap-2 list-decimal pl-8">
            {job?.responsibilities?.map(
              (responsibility: string[], index: number) => (
                <li key={index}>
                  <p className="text-sm text-gray-600">{responsibility}</p>
                </li>
              )
            )}
          </ol>
          <h1 className="font-bold text-2xl">Skills Required</h1>
          <ol className="flex flex-col gap-2 list-decimal pl-8">
            {job?.skills?.map((skill: string[], index: number) => (
              <li key={index}>
                <p className="text-sm text-gray-600">{skill}</p>
              </li>
            ))}
          </ol>{" "}
          <Button
            className="w-fit py-6 bg-blue-600 px-10 rounded-sm cursor-pointer hover:bg-blue-400 mt-4"
            onClick={handleApplyJob}
          >
            Apply Now
          </Button>
        </div>
        <div className="col-span-2 flex flex-col gap-6">
          <h1 className="text-md text-gray-600">More jobs from Google</h1>
          {jobListings.slice(0, 3).map((job: IJob, index: number) => (
            <JobCard job={job} key={index} />
          ))}
        </div>
      </div>
    </div>
  );
};
