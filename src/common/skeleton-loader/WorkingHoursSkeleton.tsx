// src/components/skeletons/WorkingHoursSkeleton.tsx
import React from "react";

const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const WorkingHoursSkeleton: React.FC = () => {
    return (
        <div className="w-full max-w-xl bg-white dark:bg-bodydark p-4 animate-pulse">
            <div className="space-y-4">
                <div className="h-4 bg-gray-300 w-1/2 rounded" />

                <div className="mt-2 grid gap-2 bg-gray-50 dark:bg-bodydark border border-stroke dark:border-strokedark p-4 rounded-md">
                    {daysOfWeek.map((day) => (
                        <div key={day} className="flex items-center justify-between text-xs">
                            <div className="h-4 w-1/4 bg-gray-300 rounded" />
                            <div className="h-8 w-20 bg-gray-200 dark:bg-bodydark rounded" />
                            <div className="h-8 w-20 bg-gray-200 dark:bg-bodydark rounded" />
                            <div className="h-5 w-10 bg-gray-300 rounded-full" />
                            <div className="h-4 w-6 bg-gray-200 dark:bg-bodydark rounded" />
                        </div>
                    ))}
                </div>

                <div className="flex justify-between gap-4 mt-4 w-3/4 mx-auto">
                    <div className="h-10 w-1/2 bg-gray-300 rounded" />
                    <div className="h-10 w-1/2 bg-gray-200 dark:bg-bodydark rounded" />
                </div>
            </div>
        </div>
    );
};

export default WorkingHoursSkeleton;
