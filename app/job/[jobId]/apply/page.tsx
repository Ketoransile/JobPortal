import { JobApplicationForm } from "@/components/general/users/JobApplicationForm";

export default function ApplyPage() {
  return (
    <div className="flex flex-col gap-6 items-center pt-10">
      <h1 className="text-4xl font-bold text-center text-gray-500">
        Apply Now!
      </h1>
      <div className="grid grid-cols-3 items-start justify-between gap-6">
        <div className="col-span-1 flex flex-col gap-2 pr-4">
          <h1 className="font-bold text-lg pb-6">Thank You for Choosing Us!</h1>
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

        <div className="col-span-2">
          <JobApplicationForm />
        </div>
      </div>
    </div>
  );
}
