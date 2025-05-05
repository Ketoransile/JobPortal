import { fetchJobs } from "@/components/general/fetchJobs";
import JobCard from "@/components/general/JobCard";
import { IJob } from "../types/jobType";
// import Filter from "@/components/general/Filter";
import SearchFilter from "@/components/general/SearchFilter";
import { CategoryComboBox } from "@/components/general/users/CategoryComboBox";
import { LocationComboBox } from "@/components/general/users/LocationComboBox";
import { CompanyComboBox } from "@/components/general/users/CompanyComboBox";
import {
  // Pagination,
  PaginationComponent,
} from "@/components/general/Pagination";
import { JobsPerPage } from "@/components/general/JobsPerPage";

export default async function JobsPage(props: {
  searchParams?: Promise<{
    search?: string;
    location?: string;
    company?: string;
    category?: string;
    page?: string;
    limit?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const search = searchParams?.search || "";
  const location = searchParams?.location || "";
  const company = searchParams?.company || "";
  const category = searchParams?.category || "";
  const page = searchParams?.page || "";
  const limit = searchParams?.limit || "4";
  console.log("Frontend params are ", search, location, page, limit);
  const response = await fetchJobs(
    search,
    location,
    company,
    category,
    page,
    limit
  );
  const jobListings = response.jobs;
  const totalPages = response.totalPages;
  console.log("ztotal pages from alljobs page is", totalPages);
  // console.log("joblistings found in all-jobs page is", jobListings);
  return (
    <div className="w-full pt-10 px-4">
      <div className="w-full flex flex-col gap-4">
        <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mb-4 md:mb-6 lg:mb-10 ">
          Explore All Job Listings
        </h1>
        <div className="w-full flex flex-col items-start justify-between mb-10 gap-10">
          {/* <div className="">
            <Filter />
            </div>{" "} */}
          <SearchFilter />
          <div className="w-full flex flex-wrap items-center max-md:justify-center gap-4">
            <CategoryComboBox />
            <CompanyComboBox />
            <LocationComboBox />
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-10">
        {/* <div className="">
          <Filter />
        </div> */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 items-start gap-4">
          {jobListings.length > 0
            ? jobListings.map((job: IJob, index: number) => (
                <JobCard job={job} key={index} />
              ))
            : "No Jobs found!!"}
        </div>
        <div className="flex items-center justify-between">
          <JobsPerPage />
          <PaginationComponent pageCount={totalPages} />
        </div>
        {/* <Pagination /> */}
      </div>
    </div>
  );
}
