import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

import JobCard from "./JobCard";

const MobileScreenJobsCarousel = ({ jobListings }) => {
  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className="w-full max-w-screen max-sm:pl-4 max-sm:pr-0"
    >
      <CarouselContent>
        {jobListings.map((job, index) => (
          <CarouselItem
            key={index}
            className="max-sm:basis-[70%] max-sm:mr-4 md:basis-1/2"
          >
            <div className="p-2">
              <JobCard job={job} />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};

export default MobileScreenJobsCarousel;
