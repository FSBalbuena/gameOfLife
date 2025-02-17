import { Grid } from "@/data/types";
export const countLiveNeighbors = (grid: Grid, x: number, y: number) => {
  let count = 0;
  for (let i = -1; i < 2; i++) {
    for (let j = -1; j < 2; j++) {
      if (i === 0 && j === 0) {
        //do not count the current cell
        continue;
      }
      if (grid[x + i]?.[y + j]) {
        count++;
      }
    }
  }
  return count;
};

export const getCellNextState = (grid: Grid, x: number, y: number) => {
  const neighbors = countLiveNeighbors(grid, x, y);
  if (grid[x][y]) {
    return neighbors === 2 || neighbors === 3 ? 1 : 0;
  } else {
    return neighbors === 3 ? 1 : 0;
  }
};

export const getGridNextState = (grid: Grid, stepsForward?: number): Grid => {
  const nextGrid = grid.map((row) => [...row]);

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      nextGrid[i][j] = getCellNextState(grid, i, j);
    }
  }

  if (!stepsForward || stepsForward <= 1) {
    return nextGrid;
  }
  return getGridNextState(nextGrid, stepsForward - 1);
};
