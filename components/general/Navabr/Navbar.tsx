import { Button } from "@/components/ui/button";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";
// import { currentUser } from "@clerk/nextjs/server";
const Navbar = async () => {
  // const user = await currentUser();
  return (
    <div className="z-10 top-0 sticky flex items-center justify-between py-4  px-20 backdrop-blur-3xl bg-white/60 drop-shadow-xl shadow-gray-500   ">
      <Link href="/" className="flex items-center gap-2">
        <Image src="/logo.png" width={32} height={32} alt="logo-image" />
        <h1 className="text-2xl font-bold  text-black">
          <span className="text-blue-600">Next</span>
          Jobs
        </h1>
      </Link>
      <div className="flex items-center gap-4">
        <SignedOut>
          <Button className="rounded-md bg-transparent border hover:border-none border-gray-300 text-gray-500 hover:bg-gray-300">
            Recruiters Login
          </Button>
          <Link href="/sign-in">
            <Button className="bg-blue-600 hover:bg-blue-400 rounded-full px-6 cursor-pointer">
              Login
            </Button>
          </Link>
        </SignedOut>{" "}
        <SignedIn>
          <div className="flex items-center gap-2">
            <div className="">
              <Link href="/my-applications" className="text-black">
                My applications
              </Link>
            </div>
            {/* {user.firstName && (
              <h1 className="text-gray-600">| Hi {user.firstName} !</h1>
            )} */}
            <UserButton />
          </div>
        </SignedIn>
      </div>
    </div>
  );
};

export default Navbar;
