import { fetchJobs } from "@/components/general/fetchJobs";
import JobCard from "@/components/general/JobCard";
import { JobApplicationForm } from "@/components/general/users/JobApplicationForm";

export default async function ApplyPage({
  params,
}: {
  params: Promise<{ jobId: string }>;
}) {
  const { jobId } = await params;
  const response = await fetchJobs();
  const jobListings = response.jobs;
  const job = jobListings.find((job) => job._id === jobId);
  if (!job) {
    return <div>Application page for this job found</div>;
  }
  // console.log("jobid from apply page is ", jobId);
  return (
    <div className="flex flex-col gap-6 items-center pt-10">
      <h1 className="text-4xl font-bold text-center text-gray-500 pb-10">
        Apply Now!
      </h1>
      <div className="grid lg:grid-cols-2 items-start justify-between gap-12">
        <div className="col-span-1">
          <JobApplicationForm jobId={jobId} />
        </div>
        <div className="flex flex-col gap-12">
          <JobCard job={job} />
          <div className="col-span-1 flex flex-col gap-2 pr-4">
            <h1 className="font-bold text-lg pb-6">
              Thank You for Choosing Us!
            </h1>
            <p className="text-base">
              We appreciate your interest in joining our team.
            </p>
            <p className="text-base">
              ✔ We&apos;re committed to fostering a creative, supportive, and
              innovative environment.
            </p>
            <p className="text-base">
              ✔ Your application is the first step towards an exciting and
              impactful career journey.
            </p>
            <p className="text-base">
              ✔ We can&apos;t wait to learn more about you!
            </p>
            <p className="text-base">
              Thank you for trusting us with your next big move. Together, we
              build something amazing.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
