import React, { useState } from "react";

const CodeEditor = () => {
  const [code, setCode] = useState("");

  return (
    <div className="code-editor">
      <h2>Code Editor</h2>
      <textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="Write your code here..."
        className="w-full h-64 p-2 border border-gray-300 rounded"
      />
    </div>
  );
};

export default CodeEditor;
