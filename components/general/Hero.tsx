"use client";
import React from "react";
import SearchFilter from "./SearchFilter";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section className="relative w-full flex flex-col items-center justify-center pt-28 pb-16 overflow-hidden">
      {/* Background Effects */}
      {/* Fancy Background with Grid */}
      {/* Background Effects removed to use global GridBackground */}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center gap-8 text-center max-w-5xl px-4 z-10"
      >
        <div className="inline-flex items-center rounded-full border border-blue-500/20 bg-blue-500/5 px-3 py-1 text-sm font-medium text-blue-600 dark:text-blue-400 backdrop-blur-sm">
          <span className="flex h-2 w-2 rounded-full bg-blue-500 mr-2 animate-pulse"></span>
          #1 Job Portal in 2026
        </div>

        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-gray-900 dark:text-white leading-[1.1]">
          Find Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">Dream Job</span> <br /> in Seconds
        </h1>

        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl leading-relaxed">
          Explore thousands of job opportunities from top companies. Whether you
          are starting out or leveling up, your next career move is just a click
          away.
        </p>

        <div className="w-full mt-4 p-2">
          <React.Suspense fallback={<div className="h-14 w-full bg-white/20 rounded-full animate-pulse" />}>
            <SearchFilter />
          </React.Suspense>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
