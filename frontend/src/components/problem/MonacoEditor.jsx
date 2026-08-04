import Editor from "@monaco-editor/react";

function MonacoEditor({
  language,
  code,
  setCode = () => {},
  readOnly = false,
}) {
  return (
    <div className="h-full min-h-0">
      <Editor
        height="100%"
        language={language}
        value={code}
        onChange={readOnly ? undefined : (value) => setCode(value || "")}
        theme="vs-dark"
        options={{
          fontSize: 15,
          minimap: { enabled: false },
          scrollBeyondLastLine: false,
          automaticLayout: true,
          wordWrap: "on",
          tabSize: 4,
          readOnly,
          padding: {
            top: 16,
          },
        }}
      />
    </div>
  );
}

export default MonacoEditor;