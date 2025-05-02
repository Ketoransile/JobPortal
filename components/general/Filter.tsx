// "use client";
// import React from "react";
// import { Checkbox } from "@/components/ui/checkbox";
// import { CiSearch } from "react-icons/ci";
// import { Input } from "../ui/input";
// import { IoLocationOutline } from "react-icons/io5";
// import { Button } from "../ui/button";
// const jobCategories = [
//   "Programming",
//   "Data Science",
//   "Designing",
//   "Networking",
//   "Management",
//   "Marketing",
//   "Cybersecurity",
// ];
// const jobLocations = [
//   "Bangalore",
//   "Washington",
//   "Hyderabad",
//   "Mumbai",
//   "California",
//   "Chennai",
//   "New York",
// ];

// const Filter = () => {
//   return (
//     <div className="w-full flex flex-col gap-6">
//       {" "}
//       <div className="flex flex-col gap-2 border-gray-200 rounded-md shadow-2xl shadow-gray-200 p-4">
//         <h1 className="font-bold text-xl">Search By Category</h1>
//         {jobCategories.map((category, index) => (
//           <div className="flex items-center gap-2" key={index}>
//             <Checkbox />
//             <h1 className="text-sm text-gray-600">{category}</h1>
//           </div>
//         ))}
//       </div>
//       <div className="flex flex-col gap-2 border-gray-200 rounded-md shadow-2xl shadow-gray-200 p-4">
//         <h1 className="font-bold text-xl">Search By Location</h1>
//         {jobLocations.map((location, index) => (
//           <div className="flex items-center gap-2" key={index}>
//             <Checkbox />
//             <h1 className="text-sm text-gray-600">{location}</h1>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Filter;
"use client";
import React from "react";
// import { Checkbox } from "@/components/ui/checkbox";
// import { CiSearch } from "react-icons/ci";
// import { Input } from "../ui/input";
// import { IoLocationOutline } from "react-icons/io5";
// import { Button } from "../ui/button";
import { CategoryComboBox } from "../client/CategoryComboBox";
import { LocationComboBox } from "../client/LocationComboBox";

// const jobCategories = [
//   "Programming",
//   "Data Science",
//   "Designing",
//   "Networking",
//   "Management",
//   "Marketing",
//   "Cybersecurity",
// ];

// const jobLocations = [
//   "Bangalore",
//   "Washington",
//   "Hyderabad",
//   "Mumbai",
//   "California",
//   "Chennai",
//   "New York",
// ];

// const jobCompanies = [
//   "Google",
//   "Amazon",
//   "Microsoft",
//   "Facebook",
//   "Apple",
//   "Netflix",
// ];

// const FilterSection = ({
//   title,
//   options,
// }: {
//   title: string;
//   options: string[];
// }) => (
//   <div className="min-w-[250px] flex-shrink-0 bg-white border border-gray-200 rounded-2xl shadow-sm px-5 py-4">
//     <h2 className="text-base font-semibold text-gray-800 mb-3">{title}</h2>
//     <div className="flex flex-col gap-2">
//       {options.map((option, index) => (
//         <label key={index} className="flex items-center gap-2 cursor-pointer">
//           <Checkbox className="border-gray-300 data-[state=checked]:bg-blue-600" />
//           <span className="text-sm text-gray-600">{option}</span>
//         </label>
//       ))}
//     </div>
//   </div>
// );

const Filter = () => {
  return (
    <div className="w-full overflow-x-auto">
      <div className="w-full flex items-center justify-between gap-6  py-6 md:px-10 md:py-8 overflow-x-auto flex-nowrap">
        {/* <FilterSection title="Category" options={jobCategories} />
        <FilterSection title="Location" options={jobLocations} />
        <FilterSection title="Company" options={jobCompanies} /> */}
        <CategoryComboBox />
        <CategoryComboBox />
        <LocationComboBox />
      </div>
    </div>
  );
};

export default Filter;
