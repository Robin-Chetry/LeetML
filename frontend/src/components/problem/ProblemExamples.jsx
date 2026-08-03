function ProblemExamples({ examples }) {
  return (
    <div className="mt-10">
      <h2 className="text-2xl font-semibold mb-6">Examples</h2>

      {examples?.map((example, index) => (
        <div
          key={index}
          className="mb-8 rounded-lg border border-base-300 p-5"
        >
          <h3 className="font-semibold mb-3">
            Example {index + 1}
          </h3>

          <div className="space-y-2">
            <p>
              <strong>Input:</strong>{" "}
              <code>{example.input}</code>
            </p>

            <p>
              <strong>Output:</strong>{" "}
              <code>{example.output}</code>
            </p>

            {example.explanation && (
              <p>
                <strong>Explanation:</strong>{" "}
                {example.explanation}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default ProblemExamples;