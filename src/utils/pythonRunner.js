// src/utils/pythonRunner.js
let pyodideInstance = null;

export const runPython = async (code) => {
  if (!pyodideInstance) {
    // Only load once to save memory
    pyodideInstance = await window.loadPyodide();
  }
  
  try {
    // Redirect Python's print() to our logs
    let output = "";
    pyodideInstance.setStdout({
      batched: (str) => { output += str + "\n"; }
    });

    await pyodideInstance.runPythonAsync(code);
    return output || "Code executed successfully (no output)";
  } catch (err) {
    return `Python Error: ${err.message}`;
  }
};