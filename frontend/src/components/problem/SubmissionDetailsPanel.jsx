import MonacoEditor from "./MonacoEditor";

function SubmissionDetailsPanel({ submission, onBack, onUseCode }) {
  const statusStyle = {
    accepted: "alert-success",
    wrong: "alert-error",
    runtime_error: "alert-error",
    compile_error: "alert-error",
    time_limit_exceeded: "alert-warning",
    pending: "alert-info",
    error: "alert-error",
  };

  return (
    <div className="p-4 space-y-4">
      {/* Back & Action Buttons */}
      <div className="mb-4 flex gap-3">
        <button
          className="btn btn-outline btn-sm"
          onClick={onBack}
        >
          ← Back to submissions
        </button>

        {onUseCode && (
          <button
            className="btn btn-primary btn-sm"
            onClick={() => onUseCode(submission.code)}
          >
            Use this code
          </button>
        )}
      </div>

      {/* Colored Status Banner */}
      <div
        className={`alert ${statusStyle[submission?.status] || "alert-info"} mb-6`}
      >
        <span className="font-semibold capitalize">
          {submission?.status ? submission.status.replaceAll("_", " ") : "Unknown"}
        </span>
      </div>

      <div>
        <h2 className="text-xl font-bold">
          Submission Details
        </h2>
      </div>

      {/* Stat Cards Grid */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="rounded-lg border border-base-300 bg-base-200 p-4">
          <p className="text-xs uppercase text-base-content/60">
            Runtime
          </p>
          <p className="text-2xl font-bold">
            {submission.runtime} s
          </p>
        </div>

        <div className="rounded-lg border border-base-300 bg-base-200 p-4">
          <p className="text-xs uppercase text-base-content/60">
            Testcases
          </p>
          <p className="text-2xl font-bold">
            {submission.testCasesPassed}/{submission.testCasesTotal}
          </p>
        </div>

        <div className="rounded-lg border border-base-300 bg-base-200 p-4">
          <p className="text-xs uppercase text-base-content/60">
            Language
          </p>
          <p className="text-xl font-semibold capitalize">
            {submission.language}
          </p>
        </div>

        <div className="rounded-lg border border-base-300 bg-base-200 p-4">
          <p className="text-xs uppercase text-base-content/60">
            Submitted
          </p>
          <p className="font-medium">
            {new Date(submission.createdAt).toLocaleString()}
          </p>
        </div>
      </div>

      {/* Read-only Code View */}
      <div>
        <h3 className="mb-2 font-semibold">Code</h3>

        <div className="h-72 rounded-xl overflow-hidden border border-base-300">
          <MonacoEditor
            language={submission.language}
            code={submission.code}
            setCode={() => {}}
            readOnly={true}
          />
        </div>
      </div>
    </div>
  );
}

export default SubmissionDetailsPanel;