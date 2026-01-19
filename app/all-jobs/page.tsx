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
    <div className="w-full max-w-7xl mx-auto space-y-10 pb-20">
      <div className="flex flex-col gap-6 items-center text-center max-w-2xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 dark:text-white">
          Explore All <span className="text-blue-600">Job Listings</span>
        </h1>
        <p className="text-lg text-gray-500 dark:text-gray-400">
          Find the perfect role for you from our extensive list of opportunities.
        </p>
      </div>

      <div className="w-full flex flex-col gap-6 bg-gray-50/50 dark:bg-zinc-900/30 p-6 rounded-3xl border border-gray-100 dark:border-zinc-800">
        <SearchFilter />
        <div className="w-full flex flex-wrap items-center justify-center gap-4">
          <CategoryComboBox />
          <CompanyComboBox />
          <LocationComboBox />
        </div>
      </div>

      <div className="flex flex-col gap-10">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {jobListings.length > 0
            ? jobListings.map((job: IJob, index: number) => (
              <JobCard job={job} key={index} />
            ))
            : (
              <div className="col-span-full flex flex-col items-center justify-center py-20 text-center text-gray-500">
                <p className="text-xl">No jobs found matching your criteria.</p>
              </div>
            )}
        </div>
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 border-t border-gray-100 dark:border-zinc-800 pt-8">
          <JobsPerPage />
          <PaginationComponent pageCount={totalPages} />
        </div>
      </div>
    </div>
  );
}
