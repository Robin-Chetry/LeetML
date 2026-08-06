import { useState, useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { Group, Panel, Separator } from "react-resizable-panels";
import { getProblemById, getSubmissionById } from "../../api/problemApi";
import ProblemHeader from "../../components/problem/ProblemHeader";
import ProblemExamples from "../../components/problem/ProblemExamples";
import ProblemConstraints from "../../components/problem/ProblemConstraints";
import CodeEditor from "../../components/problem/CodeEditor";

function Problem() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const submissionId = searchParams.get("submission");

  const [problemData, setProblemData] = useState(null);
  const [initialCode, setInitialCode] = useState("");
  const [initialLanguage, setInitialLanguage] = useState("python");
  const [loadingProblem, setLoadingProblem] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProblem = async () => {
      try {
        setLoadingProblem(true);

        const data = await getProblemById(id);
        setProblemData(data);
        setInitialCode(data.starterCode);
        setInitialLanguage("python");

        if (submissionId) {
          const submission = await getSubmissionById(submissionId);
          setInitialCode(submission.code);
          setInitialLanguage(submission.language);
        }
      } catch (err) {
        console.error(err);
        setError("Failed to load problem.");
      } finally {
        setLoadingProblem(false);
      }
    };

    if (id) {
      fetchProblem();
    }
  }, [id, submissionId]);

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-error">{error}</p>
      </div>
    );
  }

  if (loadingProblem) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <Group orientation="horizontal" className="h-full">
      {/* Left Panel */}
      <Panel defaultSize={40} minSize={25}>
        <div className="h-full overflow-y-auto p-8">
          <ProblemHeader problem={problemData} />
          <ProblemExamples examples={problemData.examples} />
          <ProblemConstraints constraints={problemData.constraints} />
        </div>
      </Panel>

      <Separator className="w-1 cursor-col-resize bg-base-300 transition-colors hover:bg-primary" />

      {/* Right Panel */}
      <Panel defaultSize={60} minSize={35}>
        <CodeEditor
          problemId={id}
          starterCode={problemData.starterCode}
          initialCode={initialCode}
          initialLanguage={initialLanguage}
          visibleTestCases={problemData.visibleTestCases}
        />
      </Panel>
    </Group>
  );
}

export default Problem;