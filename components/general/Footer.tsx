import React from "react";
import { FaSquareFacebook } from "react-icons/fa6";
import { FaSquareXTwitter } from "react-icons/fa6";
import { AiFillInstagram } from "react-icons/ai";
// import Image from "next/image";
import Link from "next/link";
const Footer = () => {
  return (
    <footer className="w-full border-t border-gray-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-950/50 backdrop-blur-xl mt-20">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 py-12 flex flex-col gap-8 md:gap-0 md:flex-row items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-blue-600/10 text-blue-600 dark:text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
            {/* Replace with actual Logo Icon if available, for now using text or just the name */}
            <span className="font-bold text-xl">N</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tighter text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            Next<span className="text-blue-600 dark:text-blue-500">Jobs</span>
          </h1>
        </Link>

        <p className="text-gray-500 dark:text-zinc-400 text-sm font-medium">
          &copy; {new Date().getFullYear()} NextJobs. All rights reserved.
        </p>

        <div className="flex items-center gap-6">
          <Link href="#" className="text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors transform hover:scale-110">
            <FaSquareFacebook size={26} />
          </Link>
          <Link href="#" className="text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors transform hover:scale-110">
            <FaSquareXTwitter size={26} />
          </Link>
          <Link href="#" className="text-gray-400 hover:text-pink-600 dark:hover:text-pink-400 transition-colors transform hover:scale-110">
            <AiFillInstagram size={28} />
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
