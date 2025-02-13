"use client";
import { useCallback, useMemo, ReactEventHandler } from "react";
import { Grid } from "@/data/types";
type Props = {
  onUpdate: (x: number, y: number) => void;
  grid: Grid;
};

export default function BoardSVG({ onUpdate, grid }: Props) {
  const xRange = useMemo(() => grid.length, [grid]);
  const yRange = useMemo(() => grid[0].length, [grid]); // type ensures safe empty
  const handleClick: ReactEventHandler<SVGSVGElement> = useCallback(
    (event) => {
      const cell = event.target as SVGSVGElement & {
        ariaRowIndex: number;
        ariaColIndex: number;
      };
      const { ariaRowIndex: x, ariaColIndex: y } = cell;
      onUpdate(Number(x), Number(y));
    },
    [onUpdate]
  );

  return (
    <svg
      role="application"
      className="w-full sm:w-2/3 aspect-square border"
      onClick={handleClick}
    >
      {grid.map((row, rowIndex) =>
        row.map((cell, colIndex) => (
          <rect
            role="button"
            key={`${rowIndex}-${colIndex}`}
            x={`${(rowIndex * 100) / xRange}%`}
            y={`${(colIndex * 100) / yRange}%`}
            aria-rowindex={rowIndex}
            aria-colindex={colIndex}
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
