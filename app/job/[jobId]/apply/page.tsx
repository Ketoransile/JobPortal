// import { fetchJobs } from "@/components/general/fetchJobs";
import JobCard from "@/components/general/JobCard";
import UnAuthorized from "@/components/general/UnAuthorized";
import { JobApplicationForm } from "@/components/general/users/JobApplicationForm";
import { auth, currentUser } from "@clerk/nextjs/server";
export default async function ApplyPage({
  params,
}: {
  params: Promise<{ jobId: string }>;
}) {
  const user = await currentUser();
  const { getToken } = await auth();
  const token = await getToken();
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:5000";
  const userResponse = await fetch(`${baseUrl}/api/v1/users/current-user`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });
  if (!userResponse.ok) {
    return <UnAuthorized />;
  }
  const userData = await userResponse.json();
  if (!userData) {
    return <UnAuthorized />;
  }
  const mongodbUser = userData.data;
  console.log("moNGODB user is", mongodbUser);
  if (!mongodbUser || mongodbUser.role !== "user") {
    return <UnAuthorized />;
  }

  const { jobId } = await params;
  // const response = await fetchJobs();
  // const jobListings = response.jobs;
  // const job = jobListings.find((job) => job._id === jobId);
  const response = await fetch(`${baseUrl}/api/v1/jobs/getSingleJob/${jobId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });
  if (!response.ok) {
    return <div>Application Page for this job was not found</div>;
  }
  console.log("response from apply page is", response);
  const data = await response.json();
  console.log("Data from apply page i s", data);
  if (!data) {
    return <div>Application page for this job not found</div>;
  }
  const job = data.job;
  if (!job) {
    return <div>Application page for this job not found</div>;
  }

  console.log("Current user in apply pagi s", user);
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
