"use client";
import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
export function JobsPerPage() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  function handleSelect(value: string) {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set("limit", value);
      params.set("page", "1");
    } else {
      params.delete("limit");
    }
    replace(`${pathname}?${params.toString()}`);
    console.log(value);
  }
  return (
    <Select
      onValueChange={(value) => {
        handleSelect(value);
      }}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Jobs per page" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Select Number Of Jobs Per Page</SelectLabel>
          <SelectItem value="4">4</SelectItem>
          <SelectItem value="8">8</SelectItem>
          <SelectItem value="12">12</SelectItem>
          <SelectItem value="16">16</SelectItem>
          <SelectItem value="20">20</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
