export const runCode = (code) => {
  try {
    // eslint-disable-next-line no-eval
    const result = eval(code);
    return result;
  } catch (err) {
    return `Error: ${err.message}`;
  }
};
