import DownloadApp from "@/components/general/DownloadApp";
import { GridBackground } from "@/components/general/GridBackground";
import Hero from "@/components/general/Hero";
import JobList from "@/components/general/JobList";
import { JobListLoading } from "@/components/general/JobListLoading";
import TrustedBy from "@/components/general/TrustedBy";
import { Suspense } from "react";

export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <main className="min-h-screen relative selection:bg-blue-500/30">
      <GridBackground />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 space-y-24 pb-20 relative z-10">
        <Hero />
        <TrustedBy />
        <Suspense fallback={<JobListLoading />}>
          <JobList />
        </Suspense>
        <DownloadApp />
      </div>
    </main>
  );
}
