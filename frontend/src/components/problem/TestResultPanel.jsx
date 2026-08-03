function TestResultPanel({
  runResult,
  submitResult,
  isRunning,
  isSubmitting,
}) {
  // 1. Loading State
  if (isRunning || isSubmitting) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <span className="loading loading-spinner loading-lg text-primary"></span>
          <p className="text-sm text-base-content/70">
            {isRunning ? "Running your code..." : "Submitting solution..."}
          </p>
        </div>
      </div>
    );
  }

  // 2. Initial State (Nothing executed yet)
  if (!runResult && !submitResult) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-base-content/60">
          Press <span className="font-semibold text-base-content">Run</span> or{" "}
          <span className="font-semibold text-base-content">Submit</span> to execute your code.
        </p>
      </div>
    );
  }

  // Determine active mode & status directly
  const result = submitResult ?? runResult;
  const isSubmission = !!submitResult;
  const success = isSubmission ? result?.accepted : result?.success;

  // Status mapping for Submission results
  const submissionStatusMap = {
    accepted: {
      title: "Accepted",
      color: "alert-success",
      icon: "✓",
    },
    wrong: {
      title: "Wrong Answer",
      color: "alert-error",
      icon: "✗",
    },
    compile_error: {
      title: "Compile Error",
      color: "alert-error",
      icon: "✗",
    },
    runtime_error: {
      title: "Runtime Error",
      color: "alert-error",
      icon: "✗",
    },
    time_limit_exceeded: {
      title: "Time Limit Exceeded",
      color: "alert-warning",
      icon: "⏱",
    },
    error: {
      title: "Internal Error",
      color: "alert-error",
      icon: "!",
    },
  };

  const submissionStatus = isSubmission
    ? submissionStatusMap[result?.status] ?? submissionStatusMap.error
    : null;

  // Formatted Runtime and Memory
  const formattedRuntime =
    result?.runtime != null && result?.runtime !== ""
      ? `${Number(result.runtime).toFixed(3)} s`
      : "N/A";

  const formattedMemory =
    result?.memory != null && result?.memory !== ""
      ? `${result.memory} KB`
      : "N/A";

  return (
    <div className="p-4 space-y-4 font-sans">
      {/* Dynamic Summary Banner */}
      <div
        className={`alert ${
          isSubmission
            ? submissionStatus.color
            : success
            ? "alert-success"
            : "alert-error"
        } shadow-sm`}
      >
        <div className="flex w-full flex-col gap-1">
          <div className="text-lg font-bold">
            {isSubmission ? (
              <>
                {submissionStatus.icon} {submissionStatus.title}
              </>
            ) : success ? (
              <>✓ Accepted</>
            ) : (
              <>✗ Some visible testcases failed</>
            )}
          </div>

          <p className="text-sm opacity-80">
            {isSubmission
              ? `Passed ${result?.passedTestCases ?? 0} / ${
                  result?.totalTestCases ?? 0
                } testcases`
              : success
              ? "All visible testcases passed."
              : "Some visible testcases failed."}
          </p>
        </div>
      </div>

      {/* Dynamic Stats Grid (2 columns for Run, 3 columns for Submit) */}
      <div
        className={`grid gap-4 ${
          isSubmission ? "grid-cols-3" : "grid-cols-2"
        }`}
      >
        <div className="rounded-lg border border-base-300 bg-base-200 p-4">
          <p className="text-xs font-medium text-base-content/60 uppercase tracking-wider">
            Runtime
          </p>
          <p className="mt-1 text-2xl font-bold text-primary font-mono">
            {formattedRuntime}
          </p>
        </div>

        <div className="rounded-lg border border-base-300 bg-base-200 p-4">
          <p className="text-xs font-medium text-base-content/60 uppercase tracking-wider">
            Memory
          </p>
          <p className="mt-1 text-2xl font-bold text-secondary font-mono">
            {formattedMemory}
          </p>
        </div>

        {isSubmission && (
          <div className="rounded-lg border border-base-300 bg-base-200 p-4">
            <p className="text-xs font-medium text-base-content/60 uppercase tracking-wider">
              Testcases
            </p>
            <p className="mt-1 text-2xl font-bold text-accent font-mono">
              {result?.passedTestCases ?? 0}/{result?.totalTestCases ?? 0}
            </p>
          </div>
        )}
      </div>

      {/* Global Error Console Banner */}
      {result?.errorMessage && (
        <div className="space-y-1">
          <h3 className="text-xs font-semibold text-error uppercase tracking-wider">
            Execution Error
          </h3>
          <pre className="rounded-lg bg-neutral text-error border border-error/30 p-3 font-mono text-xs whitespace-pre-wrap overflow-x-auto shadow-inner">
            {result.errorMessage}
          </pre>
        </div>
      )}

      {/* Case-by-case Detailed Results (Only for Run execution) */}
      {!isSubmission &&
        runResult?.testCases?.map((testCase, index) => {
          const isCustom = testCase.expectedOutput === "";
          const passed = testCase.status?.id === 3;

          const statusDescription =
            testCase.status?.description || (passed ? "Accepted" : "Wrong Answer");

          const hasOutputMismatch =
            !isCustom &&
            !passed &&
            testCase.stdout?.trim() !== testCase.expectedOutput?.trim();

          return (
            <div
              key={index}
              className={`rounded-lg border p-4 space-y-3 transition-colors ${
                passed
                  ? "border-base-300 bg-base-200"
                  : "border-error/40 bg-error/5"
              }`}
            >
              {/* Header with Execution Status */}
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-sm">
                  {isCustom ? "Custom Run" : `Case ${index + 1}`}
                </h3>

                <div className="flex items-center gap-2">
                  <span
                    className={`badge ${
                      passed ? "badge-success" : "badge-error"
                    } text-xs font-semibold`}
                  >
                    {statusDescription}
                  </span>
                </div>
              </div>

              {/* Input Block */}
              <div>
                <p className="text-xs text-base-content/60 mb-1 font-medium">
                  Input
                </p>
                <pre className="rounded bg-base-300 p-2 text-xs font-mono whitespace-pre-wrap">
                  {testCase.input || "(empty)"}
                </pre>
              </div>

              {/* Expected Output Block */}
              {!isCustom && (
                <div>
                  <p className="text-xs text-base-content/60 mb-1 font-medium">
                    Expected Output
                  </p>
                  <pre className="rounded bg-base-300 p-2 text-xs font-mono whitespace-pre-wrap text-success font-semibold">
                    {testCase.expectedOutput}
                  </pre>
                </div>
              )}

              {/* Your Output Block */}
              <div>
                <p className="text-xs text-base-content/60 mb-1 font-medium">
                  Your Output
                </p>
                <pre
                  className={`rounded p-2 text-xs font-mono whitespace-pre-wrap ${
                    hasOutputMismatch
                      ? "bg-error/15 border border-error/30 text-error font-semibold"
                      : "bg-base-300"
                  }`}
                >
                  {testCase.stdout || "(no output)"}
                </pre>
              </div>

              {/* Console Errors */}
              {testCase.stderr && (
                <div>
                  <p className="text-xs font-semibold text-error mb-1">
                    Runtime Error
                  </p>
                  <pre className="rounded border border-error/30 bg-neutral text-error p-3 font-mono text-xs whitespace-pre-wrap overflow-x-auto">
                    {testCase.stderr}
                  </pre>
                </div>
              )}

              {testCase.compileOutput && (
                <div>
                  <p className="text-xs font-semibold text-error mb-1">
                    Compile Error
                  </p>
                  <pre className="rounded border border-error/30 bg-neutral text-error p-3 font-mono text-xs whitespace-pre-wrap overflow-x-auto">
                    {testCase.compileOutput}
                  </pre>
                </div>
              )}
            </div>
          );
        })}
    </div>
  );
}

export default TestResultPanel;