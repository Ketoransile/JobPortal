import { GoOrganization } from "react-icons/go";
import { MdOutlineLocationOn } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { GiMoneyStack } from "react-icons/gi";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { jobListings } from "@/lib/jobsData";
import JobCard from "@/components/general/JobCard";
const dummyJob = {
  title: "AI/ML Engineer",
  company: "Apple",
  location: "London",
  level: "Entry Level",
  ctc: "CTC: 85k",
  apply_label: "Apply Now",
  posted: "Posted 0 months ago",
  description:
    "As an AI/ML Engineer, you'll innovate on intelligent systems, build learning algorithms, and apply ML models to real-world challenges.",
  responsibilities: [
    "Design and develop scalable solutions.",
    "Work with cross-functional teams to ensure quality.",
    "Optimize systems for performance and cost.",
    "Implement security best practices.",
    "Provide support and troubleshooting as needed.",
  ],
  skills: [
    "Strong programming skills.",
    "Experience with cloud platforms or full-stack development.",
    "Good understanding of DevOps and CI/CD.",
    "Knowledge of security and networking principles.",
    "Excellent communication and problem-solving skills.",
  ],
};
export default function JObDetailPage() {
  return (
    <div className="flex flex-col items-center mt-10">
      <div className="w-full flex items-center bg-blue-100 border border-blue-300 rounded-xl px-10 justify-between py-20">
        <div className="flex items-center gap-4">
          <Image
            src="/companies/3.svg"
            width={100}
            height={100}
            alt="company-image"
            className="bg-white p-6 rounded-xl"
          />
          <div className="flex flex-col gap-2 text-gray-600">
            <h1 className="text-4xl font-semibold">{dummyJob.title}</h1>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <GoOrganization size={20} />
                {dummyJob.company}
              </div>
              <div className="flex items-center gap-2">
                <MdOutlineLocationOn size={20} />
                {dummyJob.location}
              </div>
              <div className="flex items-center gap-2">
                <FaUser size={20} />
                {dummyJob.level}
              </div>
              <div className="flex items-center gap-2">
                <GiMoneyStack size={20} />
                {dummyJob.ctc}
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4 items-center ">
          <Button className="w-fit py-6 bg-blue-600 px-10 rounded-sm cursor-pointer hover:bg-blue-400">
            Apply Now
          </Button>
          <p className="text-gray-600 text-xs text-center">{dummyJob.posted}</p>
        </div>
      </div>
      <div className="w-full grid grid-cols-5 gap-6 items-start pt-10 ">
        <div className="w-full col-span-3 flex flex-col gap-6  ">
          <h1 className="font-bold text-2xl">Job Description</h1>
          <p className="text-sm text-gray-600 pl-4">{dummyJob.description}</p>
          <h1 className="font-bold text-2xl">Key Responsibilities</h1>
          <ol className="flex flex-col gap-2 list-decimal pl-8">
            {dummyJob.responsibilities.map((responsibility, index) => (
              <li key={index}>
                <p className="text-sm text-gray-600">{responsibility}</p>
              </li>
            ))}
          </ol>
          <h1 className="font-bold text-2xl">Skills Required</h1>
          <ol className="flex flex-col gap-2 list-decimal pl-8">
            {dummyJob.skills.map((skill, index) => (
              <li key={index}>
                <p className="text-sm text-gray-600">{skill}</p>
              </li>
            ))}
          </ol>{" "}
          <Button className="w-fit py-6 bg-blue-600 px-10 rounded-sm cursor-pointer hover:bg-blue-400 mt-4">
            Apply Now
          </Button>
        </div>
        <div className="col-span-2 flex flex-col gap-6">
          <h1 className="text-md text-gray-600">More jobs from Google</h1>
          {jobListings.slice(0, 3).map((job, index) => (
            <JobCard job={job} key={index} />
          ))}
        </div>
      </div>
    </div>
  );
}
