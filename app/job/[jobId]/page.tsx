import { fetchJobs } from "@/components/general/fetchJobs";
import { JobDetails } from "@/components/general/JobDetails";

export default async function JobDetailsPage({
  params,
}: {
  params: Promise<{ jobId: string }>;
}) {
  const { jobId } = await params;
  // console.log("JOBID from job/[jobId] page is", jobId);
  const response = await fetchJobs();
  const jobListings = response.jobs;
  const job = jobListings.find((job) => job._id === jobId);

  if (!job) {
    return (
      <div className="flex flex-col items-center justify-center pt-32 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Job Not Found</h2>
        <p className="text-lg text-gray-600">
          Sorry, we couldn&apos;t find the job you&apos;re looking for.
        </p>
      </div>
    );
  }

  return <JobDetails jobId={jobId} job={job} jobListings={jobListings} />;
}
