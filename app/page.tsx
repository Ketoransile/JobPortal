import DownloadApp from "@/components/general/DownloadApp";
import Hero from "@/components/general/Hero";
import JobList from "@/components/general/JobList";
import TrustedBy from "@/components/general/TrustedBy";

export default function Home() {
  return (
    <div className="flex flex-col gap-10 items-center pt-20 ">
      <Hero />
      <TrustedBy />
      <JobList />
      <DownloadApp />
    </div>
  );
}
