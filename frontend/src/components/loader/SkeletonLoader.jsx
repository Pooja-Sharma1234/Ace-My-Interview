import React from "react";

const MarkdownSkeletonLoader = () => {
  return (
    <div className="space-y-4 animate-pulse">
      {/* Simulate text paragraph blocks */}
      <div className="space-y-2">
        <div className="h-4 bg-gray-300 rounded w-3/4"></div>
        <div className="h-4 bg-gray-300 rounded w-5/6"></div>
        <div className="h-4 bg-gray-300 rounded w-2/3"></div>
      </div>

      {/* Simulate a code block */}
      <div className="bg-gray-200 rounded-md p-4 space-y-2">
        <div className="h-4 bg-gray-400 rounded w-full"></div>
        <div className="h-4 bg-gray-400 rounded w-11/12"></div>
        <div className="h-4 bg-gray-400 rounded w-4/5"></div>
      </div>

      {/* Another paragraph */}
      <div className="space-y-2">
        <div className="h-4 bg-gray-300 rounded w-2/3"></div>
        <div className="h-4 bg-gray-300 rounded w-3/4"></div>
        <div className="h-4 bg-gray-300 rounded w-5/6"></div>
      </div>

      <div className="space-y-2">
        <div className="h-4 bg-gray-300 rounded w-2/3"></div>
        <div className="h-4 bg-gray-300 rounded w-3/4"></div>
        <div className="h-4 bg-gray-300 rounded w-5/6"></div>
      </div>
    </div>
  );
};

export default MarkdownSkeletonLoader;
