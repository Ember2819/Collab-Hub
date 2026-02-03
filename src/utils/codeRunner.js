export const runJavascript = async (code) => {
  return new Promise((resolve) => {
    const logs = [];
    const workerCode = `
      self.onmessage = function(e) {
        const console = {
          log: (...args) => self.postMessage({ type: 'log', content: args.join(' ') })
        };
        try {
          const result = eval(e.data);
          self.postMessage({ type: 'result', content: result });
        } catch (err) {
          self.postMessage({ type: 'error', content: err.message });
        }
      };
    `;

    const blob = new Blob([workerCode], { type: 'application/javascript' });
    const worker = new Worker(URL.createObjectURL(blob));

    worker.onmessage = (e) => {
      if (e.data.type === 'log') logs.push(e.data.content);
      if (e.data.type === 'result' || e.data.type === 'error') {
        resolve(logs.join('\n') + (e.data.content !== undefined ? `\n> ${e.data.content}` : ''));
        worker.terminate();
      }
    };
    worker.postMessage(code);
    setTimeout(() => { worker.terminate(); resolve("Timed out after 5s"); }, 5000);
  });
};