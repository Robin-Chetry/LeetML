function EditorToolbar({
  language,
  setLanguage,
  onReset,
  onRun,
  onSubmit,
  isRunning,
  isSubmitting,
}) {
  return (
    <div className="flex items-center justify-between border-b border-base-300 px-4 py-2">
      {/* Left */}
      <div>
        <select
          className="select select-bordered select-sm w-36"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          disabled={isRunning || isSubmitting}
        >
          <option value="python">Python</option>
          <option value="cpp">C++</option>
        </select>
      </div>

      {/* Right */}
      <div className="flex items-center gap-3">
        <button
          className="btn btn-sm btn-outline"
          onClick={onReset}
          disabled={isRunning || isSubmitting}
        >
          Reset
        </button>
        <button
          className="btn btn-primary btn-sm"
          onClick={onRun}
          disabled={isRunning || isSubmitting}
        >
          {isRunning ? (
            <>
              <span className="loading loading-spinner loading-xs"></span>
              Running
            </>
          ) : (
            "Run"
          )}
        </button>
        <button
          className="btn btn-success btn-sm"
          onClick={onSubmit}
          disabled={isRunning || isSubmitting}
        >
          {isSubmitting ? (
            <>
              <span className="loading loading-spinner loading-xs"></span>
              Submitting
            </>
          ) : (
            "Submit"
          )}
        </button>
      </div>
    </div>
  );
}

export default EditorToolbar;