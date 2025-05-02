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
const categories = [
  {
    value: "programming",
    label: "Programming",
  },
  {
    value: "dataScience",
    label: "Data Science",
  },
  {
    value: "designing",
    label: "Designing",
  },
  {
    value: "networking",
    label: "Networking",
  },
  {
    value: "management",
    label: "Management",
  },
  {
    value: "marketing",
    label: "Marketing",
  },
  {
    value: "cybersecurity",
    label: "Cybersecurity",
  },
];

export function CategoryComboBox() {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  console.log("category choosen is ", value);
  React.useEffect(() => {
    const urlValue = searchParams.get("category");
    if (urlValue) {
      setValue(urlValue);
    }
  }, [setValue, searchParams]);
  React.useEffect(() => {
    const handleSelect = () => {
      const params = new URLSearchParams(searchParams);
      if (value) {
        params.set("category", value);
      } else {
        params.delete("category");
      }
      // params.set("page", "1");
      replace(`${pathname}?${params.toString()}`);
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
            ? categories.find((category) => category.value === value)?.label
            : "Select category..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search category..." />
          <CommandList>
            <CommandEmpty>No category found.</CommandEmpty>
            <CommandGroup>
              {categories.map((category) => (
                <CommandItem
                  key={category.value}
                  value={category.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === category.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {category.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
