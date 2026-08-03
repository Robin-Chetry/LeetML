function ProblemConstraints({ constraints }) {
  return (
    <section className="mt-10">
      <h2 className="text-2xl font-bold mb-5">
        Constraints
      </h2>

      <div className="rounded-lg border border-base-300 p-5 space-y-3">
        <div className="flex justify-between">
          <span className="font-medium">Time Limit</span>
          <span>{constraints.timeLimit} sec</span>
        </div>

        <div className="flex justify-between">
          <span className="font-medium">Memory Limit</span>
          <span>{constraints.memoryLimit} MB</span>
        </div>

        {constraints.limits?.length > 0 && (
          <>
            <div className="divider my-2"></div>

            <ul className="list-disc pl-5 space-y-2">
              {constraints.limits.map((limit, index) => (
                <li key={index}>{limit}</li>
              ))}
            </ul>
          </>
        )}
      </div>
    </section>
  );
}

export default ProblemConstraints;