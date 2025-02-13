"use client";
import { useCallback, useState } from "react";
import BoardSVG from "@/app/BoardSVG";
import { EMPTY_GRID } from "@/data/common";

export default function Home() {
  const [grid, setGrid] = useState(EMPTY_GRID);
  const updateByIndex = useCallback((x: number, y: number) => {
    setGrid((prevGrid) => {
      const newGrid = prevGrid.map((row) => [...row]);
      newGrid[x][y] = newGrid[x][y] ? 0 : 1;
      return newGrid;
    });
  }, []);

  return (
    <main className="flex flex-col align-center items-center p-10 pt-20 md:w-3/5 lg:w-1/2 xl:w-2/5 mx-auto h-svh">
      <h1 className="text-4xl mb-4">Conway&apos;s Game of Life</h1>
      <p>A cellular automaton simulation.</p>
      <BoardSVG grid={grid} onUpdate={updateByIndex} />
      <label htmlFor="play-forever" className="flex gap-2 p-1 self-end">
        <input type="checkbox" id="play-forever" />
        Play Forever
      </label>
      <div role="group" className="flex w-full justify-center gap-10">
        <button
          type="button"
          className="fold-bold rounded border-2 border-black bg-white px-3 py-1 text-base font-bold text-black transition duration-100 hover:bg-yellow-400 hover:text-gray-900"
        >
          Next state
        </button>
        <div className="flex">
          <input
            type="number"
            min={1}
            className="border-2 p-1 rounded-md rounded-r-none w-10 text-center"
          />
          <button
            type="button"
            className="fold-bold rounded rounded-l-none border-2 border-black bg-black px-3 py-1 text-base font-bold text-white transition duration-100 hover:bg-gray-900 hover:text-yellow-500"
          >
            Advance state
          </button>
        </div>
      </div>
    </main>
  );
}
