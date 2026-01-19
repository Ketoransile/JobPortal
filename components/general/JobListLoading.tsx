import { Skeleton } from "@/components/ui/skeleton";

export function JobListLoading() {
    return (
        <section className="w-full py-20">
            <div className="w-full grid grid-cols-4 items-start gap-8">
                <div className="w-full col-span-4 flex flex-col gap-8">
                    {/* Header Skeleton */}
                    <div className="flex flex-col md:flex-row gap-6 items-end justify-between pb-6 border-b border-gray-200 dark:border-gray-800">
                        <div className="space-y-2">
                            <Skeleton className="h-10 w-48" />
                            <Skeleton className="h-5 w-64" />
                        </div>
                        <Skeleton className="h-10 w-32" />
                    </div>

                    {/* Grid Skeleton */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {[...Array(8)].map((_, i) => (
                            <div
                                key={i}
                                className="flex flex-col gap-4 p-5 bg-white dark:bg-neutral-900/50 border border-gray-100 dark:border-neutral-800 rounded-xl"
                            >
                                <div className="flex items-start justify-between">
                                    <Skeleton className="h-14 w-14 rounded-xl" />
                                    <Skeleton className="h-6 w-16 rounded-full" />
                                </div>
                                <div className="space-y-2">
                                    <Skeleton className="h-6 w-3/4" />
                                    <Skeleton className="h-4 w-1/2" />
                                </div>
                                <div className="flex gap-2">
                                    <Skeleton className="h-6 w-20" />
                                    <Skeleton className="h-6 w-20" />
                                </div>
                                <Skeleton className="h-10 w-full mt-2" />
                                <div className="flex gap-3 pt-2">
                                    <Skeleton className="flex-1 h-10 rounded-lg" />
                                    <Skeleton className="w-20 h-10 rounded-lg" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
