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
  // const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((search: string) => {
    console.log("current pathname", pathname);

    const params = new URLSearchParams(searchParams);
    // console.log(search);
    if (search) {
      params.set("search", search);
    } else {
      params.delete("search");
    }
    const targetPath = `${
      pathname === "/" ? "/all-jobs" : pathname
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
    const targetPath = `${
      pathname === "/" ? "/all-jobs" : pathname
    }?${params.toString()}`;
    router.replace(targetPath);
  }, 300);
  return (
    <div className="lg:w-1/2  flex items-center justify-between p-2 mt-4  mx-4 bg-white border border-gray-300 rounded-md">
      <div className="w-full flex items-center ">
        <CiSearch size={20} className="text-gray-500" />
        <Input
          placeholder="Search by title or description"
          className="border-none focus-visible:ring-0 text-black text-sm"
          onChange={(e) => {
            e.preventDefault();
            handleSearch(e.target.value);
          }}
          defaultValue={searchParams.get("search")?.toString()}
        />
      </div>
      <div className=" w-full flex items-center  text-gray-500">
        <IoLocationOutline size={20} className="text-gray-500" />
        <Input
          placeholder="Location"
          className="border-none text-black text-sm  focus-visible:ring-0"
          onChange={(e) => {
            e.preventDefault();
            handleLocationSearch(e.target.value);
          }}
          defaultValue={searchParams.get("location")?.toString()}
        />
      </div>
      <Button
        type="button"
        className="bg-blue-600 hover:bg-blue-400 cursor-pointer"
        onClick={() => {
          // Force update with current params
          router.replace(
            `${pathname}?${new URLSearchParams(searchParams).toString()}`
          );
        }}
      >
        Search
      </Button>
    </div>
  );
};

export default SearchFilter;
