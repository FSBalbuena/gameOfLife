import { Grid } from "@/data/types";

export const RANGE = 30;

export const EMPTY_GRID: Grid = Array.from({ length: RANGE }, () =>
  Array.from({ length: RANGE }, () => 0)
);
