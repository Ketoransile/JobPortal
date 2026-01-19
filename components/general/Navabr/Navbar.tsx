"use client";
import { Button } from "@/components/ui/button";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import UserButtonComponent from "./UserButtonComponent";
import { useAuth } from "@clerk/nextjs";
import { ThemeToggle } from "../ThemeToggle";

const Navbar = () => {
  const { userId, getToken } = useAuth();
  // const { user } = useUser(); // <-- Clerk hook to get user data
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
    <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 flex items-center justify-between py-3 px-6 lg:px-8 rounded-full border border-white/20 dark:border-white/5 bg-white/95 dark:bg-zinc-900/95 md:bg-white/70 md:dark:bg-zinc-900/40 backdrop-blur-2xl shadow-none md:shadow-xl dark:md:shadow-2xl dark:md:shadow-black/20 w-[90%] md:w-[85%] lg:w-[75%] max-w-5xl transition-all duration-300 hover:bg-white/100 dark:hover:bg-zinc-900/100 md:hover:bg-white/80 md:dark:hover:bg-zinc-900/60">
      <Link href="/" className="flex items-center gap-2 group">
        <div className="p-1.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg group-hover:from-blue-500 group-hover:to-purple-500 transition-all duration-300 shadow-lg shadow-blue-500/20">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-5 h-5 text-white"
          >
            <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
            <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
          </svg>
        </div>
        <h1 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white tracking-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          Next<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">Jobs</span>
        </h1>
      </Link>
      <div className="flex items-center gap-4">
        <SignedOut>
          <Link href="/sign-in" className="">
            <Button className="bg-blue-600 text-white hover:bg-blue-500 rounded-full px-6 shadow-md shadow-blue-500/20 transition-all hover:scale-105 active:scale-95">
              Login
            </Button>
          </Link>
        </SignedOut>
        <SignedIn>
          <div className="flex items-center gap-4">
            <UserButtonComponent userRole={userRole} />
          </div>
        </SignedIn>
        <div className="hidden md:block w-px h-6 bg-gray-200 dark:bg-white/10"></div>
        <ThemeToggle />
      </div>
    </div>
  );
};

export default Navbar;
