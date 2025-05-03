import Image from "next/image";
import React from "react";

const UnAuthorized = () => {
  return (
    <div className="min-h-screen flex flex-col gap-4 items-center justify-center">
      <Image
        src="/Unauthorized.svg"
        width={400}
        height={400}
        alt="unauthorized image"
      />
      <p className="text-lg">You are not authorized to access this page</p>
    </div>
  );
};

export default UnAuthorized;
