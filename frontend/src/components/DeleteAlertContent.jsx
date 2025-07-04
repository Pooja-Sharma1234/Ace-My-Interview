import React from "react";
import { LuCircleAlert } from "react-icons/lu";

const DeleteAlertContent = ({ content, onDelete, onCancel }) => {
  return (
    <div className="p-6 text-center">
      {/* Alert Icon */}
      <div className="flex justify-center mb-4">
        <LuCircleAlert className="text-red-500 w-10 h-10" />
      </div>

      {/* Title */}
      <h2 className="text-xl font-semibold text-gray-900 mb-2">
        Are you sure?
      </h2>

      {/* Content */}
      <p className="text-sm text-gray-600 mb-6">
        {content ||
          "This action cannot be undone. Are you sure you want to proceed?"}
      </p>

      {/* Action Buttons */}
      <div className="flex justify-center space-x-4">
        <button
          onClick={onDelete}
          className="px-4 py-2 rounded bg-red-600 hover:bg-red-700 text-white text-sm"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default DeleteAlertContent;
