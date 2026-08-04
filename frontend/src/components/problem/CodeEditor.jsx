import { useState, useEffect } from "react";
import { Group, Panel, Separator } from "react-resizable-panels";
import MonacoEditor from "./MonacoEditor";
import EditorToolbar from "./EditorToolbar";
import TestCasePanel from "./TestCasePanel";
import TestResultPanel from "./TestResultPanel";
import SubmissionHistoryPanel from "./SubmissionHistoryPanel";
import SubmissionDetailsPanel from "./SubmissionDetailsPanel";
import { runCode, submitCode } from "../../api/codeApi";

const PANEL = {
  TESTCASES: "testcases",
  RESULT: "result",
  SUBMISSIONS: "submissions",
};

function CodeEditor({ problemId, starterCode, visibleTestCases }) {
  const [language, setLanguage] = useState("python");
  const [code, setCode] = useState(starterCode);

  // Top-Level Bottom Panel Tab State
  const [bottomTab, setBottomTab] = useState(PANEL.TESTCASES);

  // TestCasePanel Specific State
  const [activeCase, setActiveCase] = useState(0);
  const [isCustomCase, setIsCustomCase] = useState(false);
  const [customInput, setCustomInput] = useState("");
  const [customOutput, setCustomOutput] = useState("");

  // Execution State
  const [isRunning, setIsRunning] = useState(false);
  const [runResult, setRunResult] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState(null);

  // Submission History State
  const [selectedSubmission, setSelectedSubmission] = useState(null);

  useEffect(() => {
    setCode(starterCode);
    setActiveCase(0);
    setIsCustomCase(false);
    setCustomInput("");
    setCustomOutput("");
    setRunResult(null);
    setSubmitResult(null);
    setBottomTab(PANEL.TESTCASES);
    setSelectedSubmission(null);
  }, [starterCode]);

  const handleReset = () => {
    setCode(starterCode);
    setRunResult(null);
    setSubmitResult(null);
    setSelectedSubmission(null);
    setBottomTab(PANEL.TESTCASES);
  };

  const handleRun = async () => {
    try {
      setIsRunning(true);
      setBottomTab(PANEL.RESULT);

      const payload = {
        language,
        code,
        ...(isCustomCase && customInput.trim() && { customInput }),
      };

      const result = await runCode(problemId, payload);
      setSubmitResult(null);
      setRunResult(result);
    } catch (err) {
      console.error("Run Error:", err);
    } finally {
      setIsRunning(false);
    }
  };

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      setBottomTab(PANEL.RESULT);

      const payload = {
        language,
        code,
      };

      const result = await submitCode(problemId, payload);
      setRunResult(null);
      setSubmitResult(result);
    } catch (err) {
      console.error("Submit Error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Step 1: Handler to replace editor code with submission code
  const handleUseSubmissionCode = (code) => {
    setCode(code);
    setSelectedSubmission(null);
  };

  return (
    <Group orientation="vertical" className="h-full">
      {/* Code Editor Panel */}
      <Panel defaultSize={70} minSize={30}>
        <div className="flex h-full flex-col">
          <EditorToolbar
            language={language}
            setLanguage={setLanguage}
            starterCode={starterCode}
            setCode={setCode}
            onReset={handleReset}
            onRun={handleRun}
            onSubmit={handleSubmit}
            isRunning={isRunning}
            isSubmitting={isSubmitting}
          />

          <div className="flex-1 min-h-0">
            <MonacoEditor
              language={language}
              code={code}
              setCode={setCode}
            />
          </div>
        </div>
      </Panel>

      <Separator className="h-1 cursor-row-resize bg-base-300 transition-colors hover:bg-primary" />

      {/* Bottom Dock Panel */}
      <Panel defaultSize={30} minSize={15}>
        <div className="flex h-full flex-col bg-base-100">
          {/* Navigation Tabs */}
          <div className="border-b border-base-300 px-3 pt-2">
            <div className="tabs tabs-bordered">
              <button
                className={`tab tab-xs font-semibold ${
                  bottomTab === PANEL.TESTCASES ? "tab-active" : ""
                }`}
                onClick={() => setBottomTab(PANEL.TESTCASES)}
              >
                Testcases
              </button>
              <button
                className={`tab tab-xs font-semibold ${
                  bottomTab === PANEL.RESULT ? "tab-active" : ""
                }`}
                onClick={() => setBottomTab(PANEL.RESULT)}
              >
                Test Result
              </button>
              <button
                className={`tab tab-xs font-semibold ${
                  bottomTab === PANEL.SUBMISSIONS ? "tab-active" : ""
                }`}
                onClick={() => setBottomTab(PANEL.SUBMISSIONS)}
              >
                Submissions
              </button>
            </div>
          </div>

          {/* Dynamic Panel Content Switcher */}
          <div className="flex-1 min-h-0 overflow-y-auto">
            {bottomTab === PANEL.TESTCASES && (
              <TestCasePanel
                visibleTestCases={visibleTestCases}
                activeCase={activeCase}
                setActiveCase={setActiveCase}
                isCustomCase={isCustomCase}
                setIsCustomCase={setIsCustomCase}
                customInput={customInput}
                setCustomInput={setCustomInput}
                customOutput={customOutput}
                setCustomOutput={setCustomOutput}
              />
            )}

            {bottomTab === PANEL.RESULT && (
              <TestResultPanel
                runResult={runResult}
                submitResult={submitResult}
                isRunning={isRunning}
                isSubmitting={isSubmitting}
              />
            )}

            {bottomTab === PANEL.SUBMISSIONS && (
              selectedSubmission ? (
                /* Step 2: Pass onUseCode handler */
                <SubmissionDetailsPanel
                  submission={selectedSubmission}
                  onBack={() => setSelectedSubmission(null)}
                  onUseCode={handleUseSubmissionCode}
                />
              ) : (
                <SubmissionHistoryPanel
                  problemId={problemId}
                  selectedSubmission={selectedSubmission}
                  setSelectedSubmission={setSelectedSubmission}
                />
              )
            )}
          </div>
        </div>
      </Panel>
    </Group>
  );
}

export default CodeEditor;