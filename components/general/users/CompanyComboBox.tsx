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

const jobCompanies = [
  { value: "Google", label: "Google" },
  { value: "Amazon", label: "Amazon" },
  { value: "Microsoft", label: "Microsoft" },
  { value: "Facebook", label: "Facebook" },
  { value: "Apple", label: "Apple" },
  { value: "Netflix", label: "Netflix" },
];

export function CompanyComboBox() {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  console.log("company choosen is ", value);
  React.useEffect(() => {
    const urlValue = searchParams.get("company");
    if (urlValue) {
      setValue(urlValue);
    }
  }, [setValue, searchParams]);
  React.useEffect(() => {
    const handleSelect = () => {
      const params = new URLSearchParams(searchParams);
      if (value) {
        params.set("company", value);
      } else {
        params.delete("company");
      }
      // params.set("page", "1");
      console.log("params right now are", params);
      replace(`${pathname}?${params.toString()}`);
    };
    handleSelect();
  }, [value, pathname, replace, searchParams]);

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
            ? jobCompanies.find((company) => company.value === value)?.label
            : "Select company..."}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search company..." />
          <CommandList>
            <CommandEmpty>No company found.</CommandEmpty>
            <CommandGroup>
              {jobCompanies.map((company) => (
                <CommandItem
                  key={company.value}
                  value={company.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                >
                  {company.label}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === company.value ? "opacity-100" : "opacity-0"
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
