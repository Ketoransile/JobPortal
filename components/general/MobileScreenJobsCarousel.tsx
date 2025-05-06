import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import JobCard from "./JobCard";

const MobileScreenJobsCarousel = ({ jobListings }) => {
  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className="relative w-full max-w-screen pt-10 "
    >
      <CarouselNext className="absolute -top-0 right-0" />
      {/* <div className="absolute right-1 flex items-center justify-between"> */}
      {/* </div> */}
      {/* <div className="absolute left-2 flex items-center justify-between">
      </div> */}
      <CarouselPrevious className="absolute -top-0 left-0" />
      <CarouselContent>
        {" "}
        {jobListings.map((job, index) => (
          <CarouselItem
            key={index}
            className="max-sm:basis-[80%] max-sm:mr-4 md:basis-1/2"
          >
            <div className="p-1">
              <JobCard job={job} />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};

export default MobileScreenJobsCarousel;
