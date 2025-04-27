import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
const jobCategories = [
  "Programming",
  "Data Science",
  "Designing",
  "Networking",
  "Management",
  "Marketing",
  "Cybersecurity",
];
const jobLocations = [
  "Bangalore",
  "Washington",
  "Hyderabad",
  "Mumbai",
  "California",
  "Chennai",
  "New York",
];

const Filter = () => {
  return (
    <div className="w-full flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="font-bold text-xl">Search By Category</h1>
        {jobCategories.map((category, index) => (
          <div className="flex items-center gap-2" key={index}>
            <Checkbox />
            <h1 className="text-sm text-gray-600">{category}</h1>
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-2">
        <h1 className="font-bold text-xl">Search By Location</h1>
        {jobLocations.map((location, index) => (
          <div className="flex items-center gap-2" key={index}>
            <Checkbox />
            <h1 className="text-sm text-gray-600">{location}</h1>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Filter;
