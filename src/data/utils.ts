import { BoardErr, Grid, RequestErr } from "@/data/types";

export const createGridByRange = (range: number): Grid =>
  Array.from({ length: range }, () => Array.from({ length: range }, () => 0));

export const parseRequestErrToBoardErr = (error: RequestErr): BoardErr => ({
  steps: error?.steps?.[0],
  grid: error?.grid?.[0],
});
