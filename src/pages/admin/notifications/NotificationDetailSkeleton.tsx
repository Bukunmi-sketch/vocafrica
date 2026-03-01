const NotificationDetailSkeleton = () => {
  return (
    <div className="p-6 max-w-4xl mx-auto animate-pulse">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-700" />
          <div className="h-6 w-48 rounded bg-gray-200 dark:bg-gray-700" />
        </div>
        <div className="h-9 w-24 rounded bg-gray-200 dark:bg-gray-700" />
      </div>

      {/* Card */}
      <div className="bg-white dark:bg-boxdark rounded-lg border border-stroke dark:border-strokedark shadow-default p-6">
        {/* Title */}
        <div className="h-7 w-3/4 mb-4 rounded bg-gray-200 dark:bg-gray-700" />

        {/* Meta */}
        <div className="flex flex-wrap gap-4 mb-6">
          <div className="h-4 w-28 rounded bg-gray-200 dark:bg-gray-700" />
          <div className="h-4 w-40 rounded bg-gray-200 dark:bg-gray-700" />
          <div className="h-4 w-32 rounded bg-gray-200 dark:bg-gray-700" />
        </div>

        {/* Body */}
        <div className="space-y-3">
          <div className="h-4 w-full rounded bg-gray-200 dark:bg-gray-700" />
          <div className="h-4 w-full rounded bg-gray-200 dark:bg-gray-700" />
          <div className="h-4 w-5/6 rounded bg-gray-200 dark:bg-gray-700" />
          <div className="h-4 w-2/3 rounded bg-gray-200 dark:bg-gray-700" />
        </div>

        {/* Footer badges */}
        <div className="mt-6 flex gap-3">
          <div className="h-6 w-16 rounded-full bg-gray-200 dark:bg-gray-700" />
          <div className="h-6 w-20 rounded-full bg-gray-200 dark:bg-gray-700" />
        </div>
      </div>

      {/* Bottom link */}
      <div className="mt-8 h-4 w-48 rounded bg-gray-200 dark:bg-gray-700" />
    </div>
  );
};

export default NotificationDetailSkeleton
