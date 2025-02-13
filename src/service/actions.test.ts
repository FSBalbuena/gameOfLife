import { Grid } from "@/data/types";
import { countLiveNeighbors, getGridNextState } from "@/service/actions";

describe("Conway's Game of Life actions", () => {
  describe("countLiveNeighbors", () => {
    it("should count live neighbors correctly", () => {
      const grid: Grid = [
        [1, 0, 1],
        [0, 1, 0],
        [1, 0, 1],
      ];
      expect(countLiveNeighbors(grid, 1, 1)).toBe(4); // Center cell
      expect(countLiveNeighbors(grid, 0, 0)).toBe(1); // Top-left corner
      expect(countLiveNeighbors(grid, 2, 2)).toBe(1); // Bottom-right corner
    });
  });

  describe("getGridNextState", () => {
    it("should kill a live cell with fewer than 2 live neighbors (underpopulation)", () => {
      const grid: Grid = [
        [0, 0, 0],
        [0, 1, 0],
        [0, 0, 0],
      ];
      const nextGrid = getGridNextState(grid);
      expect(nextGrid[1][1]).toBe(0);
    });

    it("should kill a live cell with more than 3 live neighbors (overpopulation)", () => {
      const grid: Grid = [
        [1, 1, 1],
        [1, 1, 1],
        [1, 1, 1],
      ];
      const nextGrid = getGridNextState(grid);
      expect(nextGrid[0][1]).toBe(0);
      expect(nextGrid[1][1]).toBe(0);
      expect(nextGrid[2][1]).toBe(0);
    });

    it("should keep a live cell alive with 2 or 3 live neighbors", () => {
      const grid: Grid = [
        [0, 1, 0],
        [0, 1, 0],
        [0, 1, 0],
      ];
      const nextGrid = getGridNextState(grid);
      expect(nextGrid[1][1]).toBe(1);
    });

    it("should revive a dead cell with exactly 3 live neighbors (reproduction)", () => {
      const grid: Grid = [
        [0, 1, 1],
        [1, 0, 0],
        [0, 0, 0],
      ];
      const nextGrid = getGridNextState(grid);
      expect(nextGrid[1][1]).toBe(1);
    });

    it("should correctly evolve a blinker pattern", () => {
      const grid1: Grid = [
        [0, 0, 0, 0, 0],
        [0, 0, 1, 0, 0],
        [0, 0, 1, 0, 0],
        [0, 0, 1, 0, 0],
        [0, 0, 0, 0, 0],
      ];
      const grid2: Grid = [
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 1, 1, 1, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
      ];
      const nextGrid1 = getGridNextState(grid1);
      expect(nextGrid1).toEqual(grid2);
      const nextGrid2 = getGridNextState(grid2);
      expect(nextGrid2).toEqual(grid1);
    });

    it("should correctly advance the blink pattern", () => {
      const grid1: Grid = [
        [0, 0, 0, 0, 0],
        [0, 0, 1, 0, 0],
        [0, 0, 1, 0, 0],
        [0, 0, 1, 0, 0],
        [0, 0, 0, 0, 0],
      ];
      const nextGrid1 = getGridNextState(grid1, 2);
      expect(nextGrid1).toEqual(grid1);
    });
  });
});
