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

const experienceLevels = [
  {
    value: "entry",
    label: "Entry Level",
  },
  {
    value: "intermediate",
    label: "Intermediate Level",
  },
  {
    value: "senior",
    label: "Senior Level",
  },
];

interface LevelComboBoxProps {
  field: any;
  className?: string; // Add className
}

export function LevelComboBox({ field, className }: LevelComboBoxProps) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(field.value || "");

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
          className={cn("w-[200px] justify-between", className)}
        >
          {value
            ? experienceLevels.find((level) => level.value === value)?.label
            : "Select level..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search level..." />
          <CommandList>
            <CommandEmpty>No level found.</CommandEmpty>
            <CommandGroup>
              {experienceLevels.map((level) => (
                <CommandItem
                  key={level.value}
                  value={level.value}
                  onSelect={(currentValue) => {
                    const newValue = currentValue === value ? "" : currentValue;
                    setValue(newValue);
                    field.onChange(newValue);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === level.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {level.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
