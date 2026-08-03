import { useState } from "react";

function TestCasePanel({ visibleTestCases = [] }) {
  const [activeCase, setActiveCase] = useState(0);
  const [customInput, setCustomInput] = useState("");
  const [customOutput, setCustomOutput] = useState("");
  const [isCustomCase, setIsCustomCase] = useState(false);

  const currentCase = visibleTestCases[activeCase];

  return (
    <div className="px-3 py-2 overflow-y-auto space-y-2">
      {/* Tabs Header */}
      <div className="flex items-center gap-2">
        {visibleTestCases.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setIsCustomCase(false);
              setActiveCase(index);
            }}
            className={`btn btn-sm ${
              !isCustomCase && activeCase === index
                ? "btn-primary"
                : "btn-outline"
            }`}
          >
            Case {index + 1}
          </button>
        ))}

        <button
          className={`btn btn-sm ${
            isCustomCase ? "btn-primary" : "btn-outline"
          }`}
          onClick={() => setIsCustomCase(true)}
        >
          {isCustomCase ? "Custom" : "+"}
        </button>
      </div>

      {/* Content Section */}
      {!isCustomCase ? (
        /* Read-Only Mode */
        currentCase && (
          <div className="space-y-2">
            <div>
              <h3 className="font-semibold text-xs text-base-content/70 mb-1">
                Input
              </h3>
              <pre className="rounded-lg border border-base-300 bg-base-200 p-2.5 whitespace-pre-wrap font-mono text-sm">
                {currentCase.input}
              </pre>
            </div>

            <div>
              <h3 className="font-semibold text-xs text-base-content/70 mb-1">
                Output
              </h3>
              <pre className="rounded-lg border border-base-300 bg-base-200 p-2.5 whitespace-pre-wrap font-mono text-sm">
                {currentCase.output}
              </pre>
            </div>

            {currentCase.explanation && (
              <div>
                <h3 className="font-semibold text-xs text-base-content/70 mb-1">
                  Explanation
                </h3>
                <pre className="rounded-lg border border-base-300 bg-base-200 p-2.5 whitespace-pre-wrap font-mono text-sm">
                  {currentCase.explanation}
                </pre>
              </div>
            )}
          </div>
        )
      ) : (
        /* Custom Editable Mode */
        <div className="space-y-2">
          <div>
            <label className="font-semibold text-xs text-base-content/70 block mb-1">
              Input
            </label>
            <div className="rounded-lg border border-base-300 bg-base-200 p-2.5">
              <textarea
                rows={4}
                className="w-full bg-transparent outline-none resize-none font-mono text-sm"
                placeholder="Enter custom input..."
                value={customInput}
                onChange={(e) => setCustomInput(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="font-semibold text-xs text-base-content/70 block mb-1">
              Expected Output (optional)
            </label>
            <div className="rounded-lg border border-base-300 bg-base-200 p-2.5">
              <textarea
                rows={2}
                className="w-full bg-transparent outline-none resize-none font-mono text-sm"
                placeholder="Enter expected output..."
                value={customOutput}
                onChange={(e) => setCustomOutput(e.target.value)}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TestCasePanel;