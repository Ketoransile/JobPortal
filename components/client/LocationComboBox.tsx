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

const locations = [
  {
    value: "Bangalore",
    label: "Bangalore",
  },
  {
    value: "Washington",
    label: "Washington",
  },
  {
    value: "Hyderabad",
    label: "Hyderabad",
  },
  {
    value: "Mumbai",
    label: "Mumbai",
  },
  {
    value: "California",
    label: "California",
  },
  {
    value: "Chennai",
    label: "Chennai",
  },
  {
    value: "New York",
    label: "New York",
  },
];

interface LocationComboBoxProps {
  field: {
    value?: string;
    onChange: (value: string) => void;
  };
  className?: string;
}

export function LocationComboBox({ field, className }: LocationComboBoxProps) {
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
            ? locations.find((location) => location.value === value)?.label
            : "Select location..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search location..." />
          <CommandList>
            <CommandEmpty>No location found.</CommandEmpty>
            <CommandGroup>
              {locations.map((location) => (
                <CommandItem
                  key={location.value}
                  value={location.value}
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
                      value === location.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {location.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
