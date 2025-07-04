import React from "react";
import { LuTrash2 } from "react-icons/lu";
import { getInitials } from "../../utils/helper";

const SummaryCard = ({
  role,
  topicsToFocus,
  experience,
  questions,
  description,
  lastUpdatedAt,
  onSelect,
  onDelete,
}) => {
  return (
    <div className="w-full max-w-lg bg-gradient-to-br from-[#2d003d] to-black border border-purple-800 rounded-2xl shadow-md hover:shadow-lg transition cursor-pointer relative text-white">
      {/* Card Body */}
      <div onClick={onSelect} className="p-5">
        {/* Header */}
        <div className="flex items-center gap-4 bg-purple-800/30 border border-purple-700 rounded-xl px-4 py-3 mb-4">
          <div className="w-12 h-12 bg-black border border-purple-600 rounded-full flex items-center justify-center text-lg font-semibold text-purple-300">
            {getInitials(role)}
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">{role}</h3>
            <p className="text-sm text-purple-300">{topicsToFocus}</p>
          </div>
        </div>

        {/* Badges */}
        <div className="flex flex-wrap gap-3 mb-4">
          <span className="px-4 py-1 rounded-full border border-purple-700 text-sm font-medium text-purple-200">
            Experience: {experience} {experience === "1" ? "Year" : "Years"}
          </span>
          <span className="px-4 py-1 rounded-full border border-purple-700 text-sm font-medium text-purple-200">
            {questions} Q&amp;A
          </span>
          <span className="px-4 py-1 rounded-full border border-purple-700 text-sm font-medium text-purple-200">
            Last Updated: {lastUpdatedAt}
          </span>
        </div>

        {/* Description */}
        <p className="text-md text-purple-100 ">{description}</p>
      </div>

      {/* Delete Button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onDelete();
        }}
        title="Delete"
        className="absolute top-3 right-3 p-2 bg-purple-950 hover:bg-red-800 text-red-400 hover:text-white rounded-full shadow-sm transition"
      >
        <LuTrash2 size={18} />
      </button>
    </div>
  );
};

export default SummaryCard;
