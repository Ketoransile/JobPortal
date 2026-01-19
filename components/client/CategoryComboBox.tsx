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

const jobCategories = [
  { value: "programming", label: "Programming" },
  { value: "dataScience", label: "Data Science" },
  { value: "designing", label: "Designing" },
  { value: "networking", label: "Networking" },
  { value: "management", label: "Management" },
  { value: "marketing", label: "Marketing" },
  { value: "cybersecurity", label: "Cybersecurity" },
];

interface CategoryComboBoxProps {
  field: any; // Using any to bypass strict type checking for now, or use ControllerRenderProps
  className?: string; // Add className prop
}

export function CategoryComboBox({ field, className }: CategoryComboBoxProps) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(field.value || "");

  // Sync internal state with field value
  React.useEffect(() => {
    setValue(field.value || "");
  }, [field.value]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn("w-[200px] justify-between", className)} // Merge classNames
        >
          {value
            ? jobCategories.find((category) => category.value === value)?.label
            : "Select category..."}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search category..." />
          <CommandList>
            <CommandEmpty>No category found.</CommandEmpty>
            <CommandGroup>
              {jobCategories.map((category) => (
                <CommandItem
                  key={category.value}
                  value={category.value}
                  onSelect={(currentValue) => {
                    const newValue = currentValue === value ? "" : currentValue;
                    setValue(newValue);
                    field.onChange(newValue); // Update form field
                    setOpen(false);
                  }}
                >
                  {category.label}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === category.value ? "opacity-100" : "opacity-0"
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
