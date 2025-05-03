import React from "react";
import { FaSquareFacebook } from "react-icons/fa6";
import { FaSquareXTwitter } from "react-icons/fa6";
import { AiFillInstagram } from "react-icons/ai";
// import Image from "next/image";
import Link from "next/link";
const Footer = () => {
  return (
    <div className="flex items-center justify-between px-4 md:px-12 lg:px-20 pt-40 pb-10">
      <div className="flex max-md:flex-col max-md:items-start items-center gap-4">
        <Link href="/" className="flex items-center gap-2">
          {/* <Image src="/logo.png" width={32} height={32} alt="logo-image" /> */}
          <h1 className="text-2xl font-bold hover:scale-110">
            <span className="text-blue-600">Next</span>
            Jobs
          </h1>
        </Link>
        <div className="flex flex-col items-center gap-2">
          <p className="text-gray-400 text-sm">
            | Copyright @NextJobs All right reserved.
          </p>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <FaSquareFacebook size={32} />
        <FaSquareXTwitter size={32} />
        <AiFillInstagram size={32} />
      </div>
    </div>
  );
};

export default Footer;
