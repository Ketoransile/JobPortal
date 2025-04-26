import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import { CiSearch } from "react-icons/ci";
import { IoLocationOutline } from "react-icons/io5";
const Hero = () => {
  return (
    <div className="flex w-full flex-col gap-6 items-center  bg-purple-800 rounded-2xl text-white py-10">
      <h1 className="text-4xl font-bold ">Find Your Dream Job in Seconds</h1>
      <p className="text-sm w-1/3 text-center">
        Explore thousands of job opportunities from top companies. Whether you
        are starting out or leveling up, your next career move is just a click
        away.
      </p>
      <div className="flex items-center justify-between p-2 mt-4   bg-white border-none border-gray-200 rounded-md">
        <div className="flex items-center ">
          <CiSearch size={20} className="text-gray-500" />
          <Input
            placeholder="Search for jobs"
            className="border-none focus:border-none"
          />
        </div>
        <div className="flex items-center  text-gray-500">
          <IoLocationOutline size={20} className="text-gray-500" />
          <Input placeholder="Location" className="border-none" />
        </div>
        <Button className="bg-blue-600 hover:bg-blue-400 cursor-pointer">
          Search
        </Button>
      </div>
    </div>
  );
};

export default Hero;
