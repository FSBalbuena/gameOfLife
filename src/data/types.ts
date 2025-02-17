export type cell = 0 | 1;
export type Grid = cell[][];

export type BoardErr = null | {
  steps?: string;
  grid?: string;
};

export type RequestErr = null | {
  steps?: string[];
  grid?: string[];
};
