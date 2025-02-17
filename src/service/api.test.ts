import { fetchNextGridGeneration, createResponse } from "@/service/api";

import { Grid } from "@/data/types";
import {
  SUCCESS,
  FAIL,
  INVALID_STEP_MIN,
  INVALID_STEP_INT,
  INVALID_STEP_NUMBER,
  INVALID_GRID,
  REQUIRED_GRID,
  INVALID_GRID_CELL,
  STANDAR_ERR,
} from "@/data/copy";

const GRID_EXAMPLE: Grid = [
  [0, 0, 0, 0, 0],
  [0, 0, 1, 0, 0],
  [0, 0, 1, 0, 0],
  [0, 0, 1, 0, 0],
  [0, 0, 0, 0, 0],
];
const GRID_EXAMPLE_NEXT: Grid = [
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
  [0, 1, 1, 1, 0],
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
];

const GRID_EXAMPLE_NEXT_2 = GRID_EXAMPLE; // it returns to it's previous value

describe("Game of life API", () => {
  describe("when request ask for advance generations", () => {
    it("should work with valid grid and positive steps", async () => {
      const steps = 2;
      const result = await fetchNextGridGeneration(GRID_EXAMPLE, steps);
      expect(result.status).toBe(SUCCESS);
      expect(result.error).toBe(null);
      expect(result.data).toStrictEqual(GRID_EXAMPLE_NEXT_2);
    });

    it("should work with valid grid and undefined steps", async () => {
      const result = await fetchNextGridGeneration(GRID_EXAMPLE);
      expect(result.status).toBe(SUCCESS);
      expect(result.error).toBe(null);
      expect(result.data).toStrictEqual(GRID_EXAMPLE_NEXT);
    });

    it("should throw an error if steps is a negative number", async () => {
      const steps = -1;
      const result = await fetchNextGridGeneration(GRID_EXAMPLE, steps);
      expect(result.status).toBe(FAIL);
      expect(result.error).toStrictEqual({
        steps: [INVALID_STEP_MIN],
      });
      expect(result.data).toBe(GRID_EXAMPLE);
    });

    it("should throw an error if steps is a non-integer number", async () => {
      const steps = 1.5;
      const result = await fetchNextGridGeneration(GRID_EXAMPLE, steps);
      expect(result.status).toBe(FAIL);
      expect(result.error).toStrictEqual({
        steps: [INVALID_STEP_INT],
      });
      expect(result.data).toStrictEqual(GRID_EXAMPLE);
    });

    it("should throw an error if steps is not a number", async () => {
      const steps = "invalid";
      // @ts-expect-error: testing invalid steps
      const result = await fetchNextGridGeneration(GRID_EXAMPLE, steps);
      expect(result.status).toBe(FAIL);
      expect(result.error).toStrictEqual({
        steps: [INVALID_STEP_NUMBER],
      });
      expect(result.data).toStrictEqual(GRID_EXAMPLE);
    });
  });

  describe("when request sents a wrong grid", () => {
    it("should throw an error if grid is not sent", async () => {
      // @ts-expect-error: testing invalid call
      const result = await fetchNextGridGeneration();
      expect(result.status).toBe(FAIL);
      expect(result.error).toStrictEqual({
        grid: [REQUIRED_GRID],
      });
      expect(result.data).toBeUndefined();
    });

    it("should throw an error if grid is not valid", async () => {
      const grid = "grid";
      // @ts-expect-error: testing invalid grid
      const result = await fetchNextGridGeneration(grid);
      expect(result.status).toBe(FAIL);
      expect(result.error).toStrictEqual({
        grid: [INVALID_GRID],
      });
      expect(result.data).toStrictEqual(grid);
    });

    it("should throw an error if grid has no valid values", async () => {
      const grid = [
        ["2", "2", "2", "2"],
        ["2", "2", "2", "2"],
        ["2", "2", "2", "2"],
        ["2", "2", NaN, "2"],
      ];

      // @ts-expect-error: testing invalid grid
      const result = await fetchNextGridGeneration(grid);
      expect(result.status).toBe(FAIL);
      expect(result?.error?.grid?.[0]).toBe(INVALID_GRID_CELL);
      expect(result.data).toStrictEqual(grid);
    });
  });
  xdescribe("internal error", () => {
    it("should throw an error if something happens", async () => {
      const result = await fetchNextGridGeneration(GRID_EXAMPLE);
      expect(result.status).toBe(FAIL);
      expect(result?.error?.grid?.[0]).toBe(STANDAR_ERR);
      expect(result.data).toStrictEqual(GRID_EXAMPLE);
    });
  });
});
