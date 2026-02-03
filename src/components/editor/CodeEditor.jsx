import { runJavascript } from '../../utils/codeRunner';
import { runPython } from '../../utils/pythonRunner';

// ... inside handleRun function ...
async function handleRun() {
  setIsRunning(true);
  const code = editorRef.current.getValue();
  
  try {
    let result;
    if (language === 'javascript') {
      result = await runJavascript(code);
    } else if (language === 'python') {
      result = await runPython(code);
    }
    setOutput(result);
  } catch (err) {
    setOutput(`Error: ${err}`);
  }
  setIsRunning(false);
}