import { useCallback, ReactEventHandler } from "react";

type Props = {
  onUpdate: (x: number, y: number) => void;
  grid: boolean[][];
  range: number;
};

export default function BoardSVG({ onUpdate, grid, range }: Props) {
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
            x={`${(rowIndex * 100) / range}%`}
            y={`${(colIndex * 100) / range}%`}
            aria-rowindex={rowIndex}
            aria-colindex={colIndex}
            width={`${100 / range}%`}
            height={`${100 / range}%`}
            fill={cell ? "black" : "white"}
            className="stroke-gray-400 stroke-1"
          />
        ))
      )}
    </svg>
  );
}
