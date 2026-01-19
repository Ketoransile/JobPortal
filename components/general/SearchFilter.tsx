"use client";
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import { CiSearch } from "react-icons/ci";
import { IoLocationOutline } from "react-icons/io5";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

const SearchFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const handleSearch = useDebouncedCallback((search: string) => {
    const params = new URLSearchParams(searchParams);
    if (search) {
      params.set("search", search);
    } else {
      params.delete("search");
    }
    const targetPath = `${pathname === "/" ? "/all-jobs" : pathname
      }?${params.toString()}`;
    router.replace(targetPath);
  }, 300);

  const handleLocationSearch = useDebouncedCallback((location: string) => {
    const params = new URLSearchParams(searchParams);
    if (location) {
      params.set("location", location);
    } else {
      params.delete("location");
    }
    const targetPath = `${pathname === "/" ? "/all-jobs" : pathname
      }?${params.toString()}`;
    router.replace(targetPath);
  }, 300);


  return (
    <div className="relative w-full max-w-3xl mx-auto z-10 group/search">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl md:rounded-full blur opacity-20 group-hover/search:opacity-50 transition duration-500"></div>
      <div className="relative w-full flex flex-col md:flex-row items-center gap-2 p-2 bg-white/80 dark:bg-zinc-900/90 backdrop-blur-xl border border-white/20 dark:border-white/10 shadow-2xl rounded-2xl md:rounded-full">
        <div className="relative w-full flex items-center px-4 h-12 rounded-xl md:rounded-l-full bg-zinc-100/20 dark:bg-zinc-800/30 hover:bg-zinc-100/50 dark:hover:bg-zinc-800/50 transition-colors group focus-within:bg-zinc-100/80 dark:focus-within:bg-zinc-800/80">
          <CiSearch size={22} className="text-zinc-500 group-focus-within:text-blue-500 transition-colors shrink-0" />
          <Input
            placeholder="Search by title or keyword..."
            className="border-0 shadow-none focus-visible:ring-0 focus-visible:ring-offset-0 bg-transparent dark:bg-transparent text-zinc-900 dark:text-white placeholder:text-zinc-400 h-full text-base w-full"
            onChange={(e) => {
              e.preventDefault();
              handleSearch(e.target.value);
            }}
            defaultValue={searchParams.get("search")?.toString()}
          />
        </div>

        <div className="hidden md:block w-px h-8 bg-zinc-200 dark:bg-zinc-700 mx-1"></div>

        <div className="relative w-full flex items-center px-4 h-12 rounded-xl bg-zinc-100/20 dark:bg-zinc-800/30 hover:bg-zinc-100/50 dark:hover:bg-zinc-800/50 transition-colors group focus-within:bg-zinc-100/80 dark:focus-within:bg-zinc-800/80">
          <IoLocationOutline size={22} className="text-zinc-500 group-focus-within:text-purple-500 transition-colors shrink-0" />
          <Input
            placeholder="Location (e.g. Remote, NY)"
            className="border-0 shadow-none focus-visible:ring-0 focus-visible:ring-offset-0 bg-transparent dark:bg-transparent text-zinc-900 dark:text-white placeholder:text-zinc-400 h-full text-base w-full"
            onChange={(e) => {
              e.preventDefault();
              handleLocationSearch(e.target.value);
            }}
            defaultValue={searchParams.get("location")?.toString()}
          />
        </div>

        <Button
          type="button"
          className="w-full md:w-auto h-12 px-8 rounded-xl md:rounded-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-medium shadow-lg shadow-blue-500/25 transition-all hover:shadow-blue-500/40 hover:scale-[1.02] active:scale-[0.98]"
          onClick={() => {
            router.replace(
              `${pathname}?${new URLSearchParams(searchParams).toString()}`
            );
          }}
        >
          Find Jobs
        </Button>
      </div>
    </div>
  );
};

export default SearchFilter;
