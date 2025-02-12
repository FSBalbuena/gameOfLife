"use client";
import {
  useEffect,
  useState,
  useRef,
  useCallback,
  ReactEventHandler,
} from "react";
import { RANGE } from "@/data/common";

type Props = {
  onUpdate: (x: number, y: number) => void;
  grid: boolean[][];
};

export default function BoardSVG({ onUpdate, grid }: Props) {
  const [cellSize, setCellSize] = useState(0);
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const addSize = () => {
      const svg = svgRef.current;
      if (svg) {
        setCellSize(svg.clientWidth / RANGE);
      }
    };
    addSize();
    window.addEventListener("resize", addSize);
    return () => {
      window.removeEventListener("resize", addSize);
    };
  });

  const handleClick: ReactEventHandler<SVGSVGElement> = useCallback(
    (event) => {
      const { x, y } = event.target?.dataset || {};
      onUpdate(Number(x), Number(y));
    },
    [onUpdate]
  );

  return (
    <svg
      role="application"
      ref={svgRef}
      className="w-full sm:w-2/3 aspect-square border"
      onClick={handleClick}
    >
      {cellSize
        ? grid.map((row, rowIndex) =>
            row.map((cell, colIndex) => (
              <rect
                key={`${rowIndex}-${colIndex}`}
                x={rowIndex * cellSize}
                y={colIndex * cellSize}
                data-x={rowIndex}
                data-y={colIndex}
                width={cellSize}
                height={cellSize}
                fill={cell ? "black" : "white"}
                className="stroke-gray-400 stroke-1"
              />
            ))
          )
        : null}
    </svg>
  );
}
