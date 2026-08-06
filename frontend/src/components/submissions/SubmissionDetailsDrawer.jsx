import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Editor from "@monaco-editor/react";

function SubmissionDetailsDrawer({ submission, onClose }) {
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);

  if (!submission) return null;

  const handleOpenProblem = () => {
    if (!submission.problemId?._id) return;

    navigate(
      `/problem/${submission.problemId._id}?submission=${submission._id}`
    );
  };

  const copyCode = async () => {
    if (!submission.code) return;
    await navigator.clipboard.writeText(submission.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Dynamic height calculation based on line count (Min: 120px, Max: 450px)
  const lineCount = submission.code ? submission.code.split("\n").length : 1;
  const editorHeight = Math.min(
    Math.max(lineCount * 22 + 20, 120),
    450
  );

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/30">
      <div className="w-full max-w-[520px] bg-base-100 h-full shadow-2xl flex flex-col">

        {/* Sticky Header */}
        <div className="sticky top-0 z-10 bg-base-100 flex items-start justify-between border-b border-base-300 px-6 py-4">
          <div className="space-y-3">
            <h2 className="text-2xl font-bold">
              {submission.problemId?.title || "Deleted Problem"}
            </h2>

            <div className="flex gap-2">
              {submission.problemId?.difficulty && (
                <span
                  className={`badge ${
                    submission.problemId.difficulty === "Easy"
                      ? "badge-success"
                      : submission.problemId.difficulty === "Medium"
                      ? "badge-warning"
                      : "badge-error"
                  }`}
                >
                  {submission.problemId.difficulty}
                </span>
              )}

              {submission.problemId?.topic && (
                <span className="badge badge-outline">
                  {submission.problemId.topic}
                </span>
              )}
            </div>
          </div>

          <button
            onClick={onClose}
            className="btn btn-sm btn-circle btn-ghost"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">

          {/* Status */}
          <div>
            <p className="text-sm opacity-60 mb-1">Status</p>
            <div>
              {submission.status === "accepted" && (
                <span className="badge badge-success">Accepted</span>
              )}

              {submission.status === "wrong" && (
                <span className="badge badge-error">Wrong Answer</span>
              )}

              {submission.status === "pending" && (
                <span className="badge badge-warning">Pending</span>
              )}

              {submission.status === "runtime_error" && (
                <span className="badge badge-error">Runtime Error</span>
              )}

              {submission.status === "compile_error" && (
                <span className="badge badge-info">Compile Error</span>
              )}
            </div>
          </div>

          {/* Info Grid */}
          <div className="grid grid-cols-2 gap-5">
            <div className="card bg-base-200 p-4">
              <p className="text-sm opacity-60">Language</p>
              <p className="font-semibold capitalize">
                {submission.language}
              </p>
            </div>

            <div className="card bg-base-200 p-4">
              <p className="text-sm opacity-60">Runtime</p>
              <p className="font-semibold">
                {Math.round(submission.runtime * 1000)} ms
              </p>
            </div>

            <div className="card bg-base-200 p-4">
              <p className="text-sm opacity-60">Memory</p>
              <p className="font-semibold">
                {submission.memory} KB
              </p>
            </div>

            <div className="card bg-base-200 p-4">
              <p className="text-sm opacity-60">Testcases</p>
              <p className="font-semibold">
                {submission.testCasesPassed} / {submission.testCasesTotal}
              </p>
            </div>
          </div>

          {/* Submitted Date */}
          <div>
            <p className="text-sm opacity-60 mb-1">Submitted On</p>
            <p className="font-semibold">
              {new Date(submission.createdAt).toLocaleString("en-GB", {
                day: "2-digit",
                month: "short",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </div>

          {/* Submitted Code View */}
          <div className="mt-8">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold">Submitted Code</h3>
              <button
                className="btn btn-xs btn-outline"
                onClick={copyCode}
              >
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>

            <div className="rounded-lg overflow-hidden border border-base-300">
              <Editor
                height={`${editorHeight}px`}
                language={submission.language}
                value={submission.code}
                theme="vs-dark"
                options={{
                  readOnly: true,
                  domReadOnly: true,
                  renderLineHighlight: "none",
                  cursorStyle: "line-thin",
                  minimap: { enabled: false },
                  scrollBeyondLastLine: false,
                  automaticLayout: true,
                  wordWrap: "on",
                  fontSize: 14,
                  lineNumbers: "on",
                }}
              />
            </div>
          </div>

          {/* Action Button */}
          <div className="mt-6">
            <button
              className="btn btn-primary w-full"
              onClick={handleOpenProblem}
              disabled={!submission.problemId}
            >
              Open Problem
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

export default SubmissionDetailsDrawer;