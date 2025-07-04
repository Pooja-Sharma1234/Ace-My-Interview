import React from "react";

const RoleInfoHeader = ({
  role,
  topicsToFocus,
  experience,
  questions,
  description,
  lastUpdated,
}) => {
  return (
    <div className="bg-white rounded-xl shadow-sm m-10 border border-gray-200 p-6">
      {/* Role Title */}
      <h1 className="text-2xl font-bold text-gray-900">{role}</h1>

      {/* Topics to Focus */}
      {topicsToFocus && (
        <p className="text-gray-600 mt-1 font-bold">{topicsToFocus}</p>
      )}

      {/* Metadata Chips */}
      <div className="flex flex-wrap gap-3 mt-4">
        <InfoBadge label="Experience" value={experience} />
        <InfoBadge label="Q&A" value={questions} />
        <InfoBadge label="Last Updated" value={lastUpdated} />
      </div>

      {/* Optional description block */}
      {description && (
        <p className="mt-4 text-gray-700 font-semibold leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
};

const InfoBadge = ({ label, value }) => (
  <span className="inline-flex items-center bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm font-medium border border-gray-300">
    <span className="font-semibold mr-1">{label}:</span> {value}
  </span>
);

export default RoleInfoHeader;
