import { Grid } from "@/data/types";
export const createGridByRange = (range: number): Grid =>
  Array.from({ length: range }, () => Array.from({ length: range }, () => 0));
