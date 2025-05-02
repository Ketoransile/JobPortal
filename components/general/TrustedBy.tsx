import Image from "next/image";
import React from "react";
const companiesImages = [
  "/companies/2.svg",
  "/companies/3.svg",
  "/companies/4.svg",
  "/companies/5.svg",
  "/companies/6.svg",
  "/companies/7.svg",
  "/companies/8.svg",
  "/companies/9.svg",
  "/companies/1.svg",
];
const TrustedBy = () => {
  return (
    <div className="w-full flex flex-wrap items-center gap-10 lg:justify-between p-4  mt-10 border border-gray-200 drop-shadow-gray-200 shadow-xl rounded-md">
      {companiesImages.map((company, index) => (
        <Image
          src={company}
          width={64}
          height={64}
          alt={company}
          key={index}
          className="h-10 w-10 lg:h-20 lg:w-20"
        />
      ))}
    </div>
  );
};

export default TrustedBy;
