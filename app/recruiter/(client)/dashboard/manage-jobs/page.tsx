import { ManageJobsTable } from "@/components/general/Tables/ManageJobsTable";

export default function ManageJobsPage() {
  return (
    <div className="w-full max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Manage Jobs</h1>
        <p className="text-gray-500 dark:text-gray-400">View and manage all your posted job listings.</p>
      </div>

      <div className="bg-white/80 dark:bg-zinc-900/50 backdrop-blur-sm rounded-3xl border border-gray-100 dark:border-zinc-800 shadow-xl shadow-gray-200/50 dark:shadow-black/20 overflow-hidden">
        <ManageJobsTable />
      </div>
    </div>
  );
}
