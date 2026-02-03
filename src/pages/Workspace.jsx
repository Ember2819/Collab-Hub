import React from "react";
import CodeEditor from "../components/editor/CodeEditor.jsx";
import TodoBoard from "../components/todos/TodoBoard.jsx";
import AppWrapper from "../components/AppWrapper.jsx";

<div className="bg-red-500 text-white p-4">Hello Tailwind</div>


const Workspace = () => {
  return (
    <AppWrapper>
      <div className="flex flex-col lg:flex-row gap-6 w-full max-w-7xl">
        {/* Code Editor Panel */}
        <div className="flex-1 bg-white rounded-xl shadow-lg p-6">
          <h2 className="font-bold text-xl mb-2">Code Editor</h2>
          <CodeEditor />
        </div>

        {/* Todo Panel */}
        <div className="w-full lg:w-1/3 bg-white rounded-xl shadow-lg p-6">
          <h2 className="font-bold text-xl mb-2">Todos</h2>
          <TodoBoard />
        </div>
      </div>
    </AppWrapper>
  );
};

export default Workspace;
