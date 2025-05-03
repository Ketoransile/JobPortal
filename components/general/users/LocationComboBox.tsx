"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const jobLocations = [
  { value: "Bangalore", label: "Bangalore" },
  { value: "Washington", label: "Washington" },
  { value: "Hyderabad", label: "Hyderabad" },
  { value: "Mumbai", label: "Mumbai" },
  { value: "California", label: "California" },
  { value: "Chennai", label: "Chennai" },
  { value: "New york", label: "New York" },
];

export function LocationComboBox() {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  console.log("location choosen is ", value);
  // const handleSelect = (currentValue) => {};
  React.useEffect(() => {
    const urlValue = searchParams.get("location");
    if (urlValue) {
      setValue(urlValue);
    }
  }, [setValue, searchParams]);
  React.useEffect(() => {
    const handleSelect = () => {
      const params = new URLSearchParams(searchParams);
      if (value) {
        params.set("location", value);
      } else {
        params.delete("location");
      }
      // params.set("page", "1");

      const newUrl = `${pathname}?${params.toString()}`;
      replace(newUrl);
      console.log("Navigating to:", newUrl);
    };

    handleSelect();
  }, [value, pathname, searchParams, replace]);
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value
            ? jobLocations.find((location) => location.value === value)?.label
            : "Select location..."}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search location..." />
          <CommandList>
            <CommandEmpty>No location found.</CommandEmpty>
            <CommandGroup>
              {jobLocations.map((location) => (
                <CommandItem
                  key={location.value}
                  value={location.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    console.log(
                      "New value after set:",
                      currentValue === value ? "" : currentValue
                    );
                    setOpen(false);
                  }}
                >
                  {location.label}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === location.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
