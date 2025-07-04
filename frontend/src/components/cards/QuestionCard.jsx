import React, { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import MarkdownRenderer from "../../pages/Home/AIResponsePreview.JSX";

const QuestionCard = ({
  question,
  answer,
  onLearnMore,
  isPinned,
  onTogglePin,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [contentHeight, setContentHeight] = useState(0);
  const answerRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (isExpanded && answerRef.current) {
        setContentHeight(answerRef.current.scrollHeight);
      } else {
        setContentHeight(0);
      }
    }, 50);
    return () => clearTimeout(timer);
  }, [isExpanded]);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="relative w-full bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 mb-6 border border-gray-100">
      {/* Header Section */}
      <div className="p-5 pr-[240px] border-b border-gray-200 flex items-start gap-10">
        {/* Question Text */}
        <div
          className="flex items-start cursor-pointer flex-grow"
          onClick={toggleExpand}
        >
          <span className="font-extrabold text-xl mr-3 text-purple-600">Q</span>
          <h3 className="text-lg md:text-xl font-semibold text-gray-800 leading-snug">
            {question}
          </h3>
        </div>
      </div>

      {/* Control Buttons - top-right aligned horizontally */}
      <div className="absolute top-4 right-4  flex items-center space-x-2 ml-10">
        {/* Toggle Button */}
        <button
          onClick={toggleExpand}
          className="p-2 text-gray-500 hover:bg-gray-100 rounded-full transition"
          aria-label="Toggle answer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-5 w-5 transform transition-transform duration-300 ${
              isExpanded ? "rotate-180" : "rotate-0"
            }`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>

        {/* Pin Button */}
        <button
          className="p-2 rounded-full text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition"
          onClick={onTogglePin}
          aria-label={isPinned ? "Unpin question" : "Pin question"}
          title={isPinned ? "Unpin question" : "Pin question"}
        >
          {isPinned ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-blue-500"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M14.5 4.5a3.5 3.5 0 11-7 0 3.5 3.5 0 017 0zm-.997 6.958A2.5 2.5 0 0013 13h-1v5a1 1 0 11-2 0v-5H8a2.5 2.5 0 00-2.003 3.958L4.66 18.571a1 1 0 11-1.72-1.002l1.64-2.834A4.5 4.5 0 017 12h1v-1.5a1.5 1.5 0 013 0V12h1a2.5 2.5 0 002.003-3.958L15.34 5.429a1 1 0 111.72 1.002l-1.64 2.834z"
                clipRule="evenodd"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
              />
            </svg>
          )}
        </button>

        {/* Learn More Button */}
        <button
          className="px-3 py-1.5 bg-teal-50 text-teal-700 text-sm font-medium rounded-md hover:bg-teal-100 transition"
          onClick={onLearnMore}
        >
          Learn More
        </button>
      </div>

      {/* Markdown Answer Section */}
      <div
        className="overflow-hidden transition-all duration-500 ease-in-out"
        style={{ maxHeight: isExpanded ? `${contentHeight}px` : "0px" }}
      >
        <div
          ref={answerRef}
          className="p-5 bg-gray-50 text-gray-700 text-base leading-relaxed max-w-4xl mx-auto
                     prose prose-slate dark:prose-invert prose-p:mb-4 prose-ul:list-disc prose-ul:pl-6 prose-ul:space-y-2
                     prose-ol:list-decimal prose-ol:pl-6 prose-ol:space-y-2 prose-strong:font-bold prose-code:bg-gray-100 prose-pre:bg-gray-100"
        >
          {/* <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={markdownComponents}
          >
            {answer}
          </ReactMarkdown> */}
          <MarkdownRenderer content={answer} />
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;
