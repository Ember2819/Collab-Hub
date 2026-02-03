import React from "react";
import CodeEditor from "../components/editor/CodeEditor";

const Workspace = () => {
  return (
    <div className="workspace p-4">
      <h1 className="text-2xl font-bold mb-4">Workspace</h1>
      <CodeEditor />
    </div>
  );
};

export default Workspace;
