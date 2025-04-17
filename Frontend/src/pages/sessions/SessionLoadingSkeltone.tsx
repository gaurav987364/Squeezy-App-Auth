const SessionItemSkeleton = () => {
  return (
    <div className="flex items-center justify-between bg-white dark:bg-gray-800 p-2 rounded-lg shadow w-full animate-pulse">
      {/* Icon skeleton */}
      <div
        className="shrink-0 mr-[16px] flex items-center justify-center
        w-[48px] h-[48px] rounded-full border border-[#eee] dark:border-[rgb(42,45,48)] bg-gray-200 dark:bg-gray-700"
      ></div>

      {/* Text content skeleton */}
      <div className="flex-1 flex items-center justify-between">
        <div className="flex-1">
          {/* OS / Browser skeleton */}
          <div className="h-4 w-32 bg-gray-200 dark:bg-gray-600 rounded mb-2 mt-2" />
          
          {/* Status badge skeleton */}
          <div className="flex items-center mt-2">
            <div className="h-[25px] w-[81px] rounded-lg bg-gray-300 dark:bg-gray-600" />
          </div>
        </div>

        {/* Remove button skeleton */}
        <div className="ml-4 w-6 h-6 bg-gray-200 dark:bg-gray-600 rounded-full" />
      </div>
    </div>
  );
};

export default SessionItemSkeleton;
