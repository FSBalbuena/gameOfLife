"use client";
import {
  ChangeEventHandler,
  KeyboardEventHandler,
  useCallback,
  useState,
} from "react";
import { clsx } from "clsx";
import Image from "next/image";
import { stepsSchema } from "@/data/common";
import { GAME_ADVANCE_BUTTON, GAME_NEXT_BUTTON } from "@/data/copy";
import refreshIcon from "@/../public/restart-icon.svg";

type Props = {
  error?: string;
  disabled?: boolean;
  onGeneration: (steps?: number) => void;
  onRestart: () => void;
};
export default function Controls({
  error,
  onGeneration,
  disabled,
  onRestart,
}: Props) {
  const [steps, setSteps] = useState(1);

  const handleStepsChange: ChangeEventHandler<HTMLInputElement> = useCallback(
    (event) => {
      const value = Number(event.target.value);
      const validatedStep = stepsSchema.safeParse(value);
      if (validatedStep.success) {
        setSteps(value);
      }
    },
    []
  );

  const onAdvance = useCallback(
    () => onGeneration(steps),
    [steps, onGeneration]
  );

  const handleEnter: KeyboardEventHandler<HTMLInputElement> = useCallback(
    (event) => {
      if (event.key === "Enter") {
        onAdvance();
      }
    },
    [onAdvance]
  );

  return (
    <div>
      <div
        role="group"
        className={clsx(
          "flex-col gap-2 sm:flex-row sm:gap-10 flex w-full justify-center",
          {
            disabled,
          }
        )}
      >
        <button
          disabled={disabled}
          onClick={() => onGeneration()}
          type="button"
          className="fold-bold rounded border-2 border-black bg-white px-3 py-1 text-base font-bold text-black transition duration-100 hover:bg-yellow-400 hover:text-gray-900"
        >
          {GAME_NEXT_BUTTON}
        </button>

        <div className="flex">
          <input
            disabled={disabled}
            aria-describedby="steps-errors advance button"
            value={steps}
            onChange={handleStepsChange}
            onKeyDown={handleEnter}
            type="number"
            id="steps"
            className="border-2 p-1 rounded-md rounded-r-none w-10 text-center"
          />
          <button
            disabled={disabled}
            onClick={onAdvance}
            type="button"
            id="advance button"
            className="fold-bold rounded border-2 border-black bg-white px-3 py-1 text-base font-bold text-black transition duration-100 hover:bg-yellow-400 hover:text-gray-900"
          >
            {GAME_ADVANCE_BUTTON}
          </button>
        </div>
        <button
          disabled={disabled}
          onClick={onRestart}
          type="button"
          className="flex justify-center fold-bold rounded border-2 border-black bg-black px-1 py-1 text-base font-bold text-white transition duration-100 hover:bg-gray-900 hover:border-yellow-700"
        >
          <Image priority src={refreshIcon} alt="restart" className="w-6" />
        </button>
      </div>
      <p id="steps-errors" className="text-red-500 text-right m-4">
        {error}
      </p>
    </div>
  );
}
