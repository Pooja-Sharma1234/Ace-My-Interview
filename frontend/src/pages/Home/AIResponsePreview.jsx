import React, { useState } from "react";
import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const MarkdownRenderer = ({ content }) => {
  const components = {
    p: ({ node, children }) => {
      const hasOnlyText = node.children.every(
        (child) => child.type === "text" || child.tagName === "inlineCode"
      );

      return hasOnlyText ? (
        <p className="mb-4 text-black leading-relaxed">{children}</p>
      ) : (
        <div className="mb-4 text-black leading-relaxed">{children}</div>
      );
    },

    strong: ({ children }) => (
      <strong className="font-bold text-black">{children}</strong>
    ),
    em: ({ children }) => <em className="italic text-black">{children}</em>,
    ul: ({ children }) => (
      <ul className="list-disc pl-6 space-y-2 text-black">{children}</ul>
    ),
    ol: ({ children }) => (
      <ol className="list-decimal pl-6 space-y-2 text-black">{children}</ol>
    ),
    code: ({ inline, className, children }) => {
      const language = className?.replace("language-", "") || "javascript";

      // Inline code (<code> inside <p>) — safe to render as <code>
      if (inline) {
        return (
          <code className="bg-gray-100 text-red-600 px-1 py-0.5 rounded text-sm">
            {children}
          </code>
        );
      }

      // Block code (<pre><code>) — render SyntaxHighlighter inside a wrapper
      const [copied, setCopied] = useState(false);
      const handleCopy = () => {
        navigator.clipboard.writeText(children);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      };

      return (
        <div className="relative my-4">
          <button
            onClick={handleCopy}
            className="absolute top-2 right-2 bg-purple-700 text-white text-xs px-2 py-1 rounded hover:bg-purple-600 transition-all z-10"
          >
            {copied ? "Copied!" : "Copy"}
          </button>
          <SyntaxHighlighter
            language={language}
            style={atomOneDark}
            customStyle={{
              borderRadius: "0.5rem",
              fontSize: "0.875rem",
              padding: "1rem",
              margin: 0,
            }}
          >
            {String(children).trim()}
          </SyntaxHighlighter>
        </div>
      );
    },
  };

  return (
    <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
      {content}
    </ReactMarkdown>
  );
};

export default MarkdownRenderer;
