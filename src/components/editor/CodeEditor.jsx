import React, { useState } from "react";

const CodeEditor = () => {
  const [code, setCode] = useState("");

  return (
    <div className="flex flex-col gap-2">
      <textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="Write your code here..."
        className="w-full h-64 p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 font-mono text-sm"
      />
      <button
        onClick={() => alert("Code run functionality coming soon!")}
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition w-max"
      >
        Run Code
      </button>
    </div>
  );
};

export default CodeEditor;
