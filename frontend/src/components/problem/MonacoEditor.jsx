import Editor from "@monaco-editor/react";

function MonacoEditor({ language, code, setCode }) {
  return (
    <div className="h-full min-h-0">
      <Editor
        height="100%"
        language={language}
        value={code}
        onChange={(value) => setCode(value || "")}
        theme="vs-dark"
        options={{
          fontSize: 15,
          minimap: { enabled: false },
          scrollBeyondLastLine: false,
          automaticLayout: true,
          wordWrap: "on",
          tabSize: 4,
          padding: {
            top: 16,
          },
        }}
      />
    </div>
  );
}

export default MonacoEditor;