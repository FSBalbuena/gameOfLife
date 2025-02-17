"use client";
import { useCallback, useMemo } from "react";
import { clsx } from "clsx";
import { Grid } from "@/data/types";
type Props = {
  onUpdate: (x: number, y: number) => void;
  grid: Grid;
  disabled: boolean;
};

export default function BoardSVG({ onUpdate, grid, disabled }: Props) {
  const xRange = useMemo(() => grid.length, [grid]);
  const yRange = useMemo(() => grid[0].length, [grid]); // type ensures safe empty

  const makeCellHandle = useCallback(
    (x: number, y: number) => () => onUpdate(x, y),
    [onUpdate]
  );

  return (
    <svg
      aria-disabled={disabled}
      role="application"
      className={clsx("w-full sm:w-2/3 aspect-square border", {
        "pointer-events-none cursor-not-allowed": disabled,
      })}
    >
      {grid.map((row, rowIndex) =>
        row.map((cell, colIndex) => (
          <rect
            role="button"
            onClick={makeCellHandle(rowIndex, colIndex)}
            key={`${rowIndex}-${colIndex}`}
            x={`${(rowIndex * 100) / xRange}%`}
            y={`${(colIndex * 100) / yRange}%`}
            width={`${100 / xRange}%`}
            height={`${100 / yRange}%`}
            fill={cell ? "black" : "white"}
            className="stroke-gray-400 stroke-1"
          />
        ))
      )}
    </svg>
  );
}
