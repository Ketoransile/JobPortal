import Image from "next/image";
import Link from "next/link";
import React from "react";

const DownloadApp = () => {
  return (
    <div className="w-full flex items-center justify-center  lg:gap-20 pt-10 px-20  mb-10  rounded-md bg-blue-200 dark:bg-black dark:border border-gray-500 dark:border-neutral-900">
      <Image
        src="/pointer.svg"
        width={300}
        height={300}
        alt="pointer-character "
        className="bg-transparent max-md:h-64"
      />
      <div className="flex flex-col items-center">
        <p className="text-lg sm:text-xl md:text2xl lg:text-3xl text-center font-bold ">
          Get the App for a Smoother Job Search Experience
        </p>
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center justify-between">
            <Image
              src="/googlePlay.svg"
              alt="goolge-play-icon"
              width={200}
              height={200}
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DownloadApp;
