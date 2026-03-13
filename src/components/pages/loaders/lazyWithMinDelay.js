export default function lazyWithMinDelay(importFn, delay = 5000) {
  return async () => {
    const [moduleExports] = await Promise.all([
      importFn(),
      new Promise((resolve) => setTimeout(resolve, delay)),
    ]);

    return moduleExports;
  };
}