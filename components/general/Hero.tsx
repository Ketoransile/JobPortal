"use client";
import React from "react";
import SearchFilter from "./SearchFilter";

const Hero = () => {
  return (
    <div className="flex w-full flex-col gap-6 items-center  bg-purple-800 rounded-2xl text-white py-10 dark:bg-black">
      <h1 className="text-4xl font-bold text-center">
        Find Your Dream Job in Seconds
      </h1>
      <p className="text-sm w-full md:w-1/2 lg:w-1/3 text-center">
        Explore thousands of job opportunities from top companies. Whether you
        are starting out or leveling up, your next career move is just a click
        away.
      </p>
      <SearchFilter />
    </div>
  );
};

export default Hero;
