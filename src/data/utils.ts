export const createGridByRange = (range: number) =>
  Array.from({ length: range }, () =>
    Array.from({ length: range }, () => false)
  );
