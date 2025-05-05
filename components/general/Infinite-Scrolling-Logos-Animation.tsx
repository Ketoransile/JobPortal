"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
const CompanyLogoData: Array<{ src: string; alt: string }> = [
  { src: "/companies/1.svg", alt: "Adobe" },
  { src: "/companies/2.svg", alt: "Meta" },
  { src: "/companies/3.svg", alt: "Google" },
  { src: "/companies/4.svg", alt: "Instagram" },
  { src: "/companies/5.svg", alt: "Microsoft" },
  { src: "/companies/6.svg", alt: "Samsung" },
  { src: "/companies/7.svg", alt: "Snapchat" },
  { src: "/companies/8.svg", alt: "X" },
  { src: "/companies/9.svg", alt: "Walmart" },
];

export const InfiniteScrollingLogosAnimation = () => {
  return (
    <div className="h-fit container p-5">
      {/* <h2 className="text-center text-md text-black  dark:text-white my-5 mb-10 font-mono">
        Trusted by the world&apos;s most innovative companies
      </h2> */}
      <div className="flex relative overflow-hidden before:absolute before:left-0 before:top-0 before:z-10 before:h-full before:w-10  before:content-[''] after:absolute after:right-0 after:top-0 after:h-full after:w-10 after:bg-gradient-to-l  after:content-['']">
        <motion.div
          transition={{
            duration: 10,
            ease: "linear",
            repeat: Infinity,
          }}
          initial={{ translateX: 0 }}
          animate={{ translateX: "-50%" }}
          className="flex flex-none gap-16 pr-16"
        >
          {[...new Array(2)].fill(0).map((_, index) => (
            <React.Fragment key={index}>
              {CompanyLogoData.map(({ src, alt }) => (
                <Image
                  key={alt}
                  src={src}
                  width={200}
                  height={200}
                  alt={alt}
                  className="h-16 w-auto flex-none"
                />
              ))}
            </React.Fragment>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

// export default InfiniteScrollingLogosAnimation;
