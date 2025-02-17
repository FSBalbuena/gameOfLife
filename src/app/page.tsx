"use client";
import { useCallback, useEffect, useState, useTransition } from "react";
import { clsx } from "clsx";
import BoardSVG from "@/app/BoardSVG";
import Controls from "@/app/Controls";
import { BoardErr, Grid } from "@/data/types";
import { EMPTY_GRID } from "@/data/common";
import {
  GAME_DESCRIPTION,
  GAME_LOADING_DESCRIPTION,
  GAME_PLAY_FOREVER_CHECKBOX,
  GAME_TITLE,
  SUCCESS,
} from "@/data/copy";
import { parseRequestErrToBoardErr } from "@/data/utils";
import { fetchNextGridGeneration } from "@/service/api";

const initialError = null;

export default function Home() {
  const [grid, setGrid] = useState(EMPTY_GRID);
  const [error, setError] = useState<BoardErr>(initialError);
  const [isPlayingForever, setIsPlayingForever] = useState(false);
  const [isPending, startTransition] = useTransition();

  const areControlsDisabled = isPlayingForever || isPending;
  const showError = !areControlsDisabled && error?.grid;

  const updateByIndex = useCallback((x: number, y: number) => {
    setGrid((prevGrid) => {
      const newGrid = prevGrid.map((row) => [...row]);
      newGrid[x][y] = newGrid[x][y] ? 0 : 1;
      return newGrid;
    });
  }, []);
  const restart = () => setGrid(EMPTY_GRID);
  const onNextStateGeneration = useCallback(
    (grid: Grid, steps?: number) => {
      startTransition(async () => {
        const { status, data, error } = await fetchNextGridGeneration(
          grid,
          steps
        );
        startTransition(() => {
          if (status === SUCCESS) {
            setGrid(data);
          } else {
            setError(parseRequestErrToBoardErr(error));
          }
        });
      });
    },
    [setGrid, setError, startTransition]
  );

  const onManualGeneration = useCallback(
    (steps?: number) => {
      onNextStateGeneration(grid, steps);
    },
    [grid, onNextStateGeneration]
  );

  useEffect(() => {
    if (isPlayingForever) {
      setTimeout(() => onNextStateGeneration(grid));
    }
  }, [isPlayingForever, grid, onNextStateGeneration]);

  return (
    <main
      className="flex flex-col align-center items-center p-10 pt-20 md:w-3/5 lg:w-1/2 xl:w-2/5 mx-auto h-svh"
      onFocus={() => setError(initialError)}
    >
      <h1 className="text-4xl mb-4">{GAME_TITLE}</h1>
      <p
        className={clsx("mb-1", {
          "text-indigo-600": areControlsDisabled,
          "text-red-600": error?.grid,
        })}
      >
        {showError
          ? error?.grid
          : areControlsDisabled
          ? GAME_LOADING_DESCRIPTION
          : GAME_DESCRIPTION}
      </p>

      <BoardSVG
        grid={grid}
        onUpdate={updateByIndex}
        disabled={areControlsDisabled}
      />
      <label htmlFor="play-forever" className="flex gap-2 p-1 self-end">
        <input
          checked={isPlayingForever}
          type="checkbox"
          id="play-forever"
          onChange={(e) => setIsPlayingForever(e.target.checked)}
        />
        {GAME_PLAY_FOREVER_CHECKBOX}
      </label>
      <Controls
        error={error?.steps}
        onGeneration={onManualGeneration}
        onRestart={restart}
        disabled={areControlsDisabled}
      />
    </main>
  );
}
