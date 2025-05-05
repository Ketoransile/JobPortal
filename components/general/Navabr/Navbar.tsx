"use client";
import { Button } from "@/components/ui/button";
import { SignedIn, SignedOut, useUser } from "@clerk/nextjs";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import UserButtonComponent from "./UserButtonComponent";
import { useAuth } from "@clerk/nextjs";
import { ThemeToggle } from "../ThemeToggle";

const Navbar = () => {
  const { userId, getToken } = useAuth();
  const { user } = useUser(); // <-- Clerk hook to get user data
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserRole = async () => {
      if (userId) {
        try {
          const token = await getToken();
          const baseUrl =
            process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:5000";
          const response = await fetch(`${baseUrl}/api/v1/users/current-user`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            cache: "no-store",
          });
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          console.log("data from navabr is", data.data);
          setUserRole(data?.data?.role || null);
        } catch (error) {
          console.error("Error fetching user role:", error);
        }
      }
    };

    fetchUserRole();
  }, [userId, getToken]);

  return (
    <div className="z-10 top-0 sticky flex items-center justify-between py-4 px-4 lg:px-20 backdrop-blur-3xl bg-white dark:bg-black dark:border-b border-b-neutral-900 shadow-none">
      <Link href="/" className="flex items-center gap-2">
        <h1 className="text-lg md:text-xl lg:text-2xl font-bold text-black dark:text-white">
          <span className=" ">Next</span>
          Jobs
        </h1>
      </Link>
      <div className="flex items-center gap-6">
        <SignedOut>
          <Link href="/recruiter/sign-up" className="">
            <Button className="p-2 rounded-md bg-transparent border border-gray-300 dark:border-neutral-900 dark:hover:bg-neutral-900 text-gray-500 dark:text-white hover:bg-gray-300 cursor-pointer">
              Recruiters
            </Button>
          </Link>
          <Link href="/sign-in" className="">
            <Button className="bg-blue-600 dark:text-white hover:bg-blue-400 rounded-full px-6 cursor-pointer">
              Login
            </Button>
          </Link>
        </SignedOut>
        <SignedIn>
          <div className="flex items-center gap-4">
            {/* <h1 className="hidden lg:flex text-base text-center  ">
              Hi, {user?.firstName}
            </h1> */}
            {userRole && <UserButtonComponent userRole={userRole} />}
          </div>
        </SignedIn>
        <ThemeToggle />
      </div>
    </div>
  );
};

export default Navbar;
