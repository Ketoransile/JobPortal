import { ViewApplicationsTable } from "@/components/general/Tables/ViewApplicationsTable";

export default function ViewApplicationsPage() {
  return (
    <div className="w-full max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Applications</h1>
        <p className="text-gray-500 dark:text-gray-400">Track and manage candidates who have applied to your jobs.</p>
      </div>

      <div className="bg-white/80 dark:bg-zinc-900/50 backdrop-blur-sm rounded-3xl border border-gray-100 dark:border-zinc-800 shadow-xl shadow-gray-200/50 dark:shadow-black/20 overflow-hidden">
        <ViewApplicationsTable />
      </div>
    </div>
  );
}
