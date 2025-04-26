import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
// const jobs = [];

const JobCard = ({ job }) => {
  return (
    <div className="flex flex-col gap-2 p-6 border border-gray-200 rounded-md shadow-2xl shadow-gray-200">
      <Image
        src={job.icon_url}
        width={32}
        height={32}
        alt="company-image"
        className="w-20 h-20"
      />
      <h1 className="font-semibold text-lg">{job.title}</h1>
      <div className="flex items-center gap-2 text-xs ">
        <div className=" px-6 py-2 bg-blue-100 border border-blue-200 rounded-sm text-black text-xs">
          {job.location}
        </div>
        <div className=" px-6 py-2 bg-red-100 border border-red-200 rounded-sm text-black text-xs">
          {job.level}
        </div>
      </div>
      <p className="text-xs pt-4 text-gray-500 gap-2 h-20 overflow-auto">
        {job.description}
      </p>
      <div className="flex items-center gap-4">
        <Button className="bg-blue-600 cursor-pointer hover:bg-blue-400 text-white rounded-md text-xs">
          Apply now
        </Button>
        <Button className="bg-transparent hover:bg-gray-300 cursor-pointer text-gray-600 border border-gray-200 rounded-md text-xs">
          Learn More
        </Button>
      </div>
    </div>
  );
};

export default JobCard;
