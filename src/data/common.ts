import { Grid } from "@/data/types";
import { z } from "zod";

export const RANGE = 30;

export const EMPTY_GRID: Grid = Array.from({ length: RANGE }, () =>
  Array.from({ length: RANGE }, () => 0)
);
import {
  REQUIRED_GRID,
  REQUIRED_STEP,
  INVALID_STEP_INT,
  INVALID_GRID,
  INVALID_GRID_CELL,
  INVALID_STEP_MIN,
  INVALID_STEP_NUMBER,
} from "@/data/copy";

//---request schema
export const stepsSchema = z
  .number({
    required_error: REQUIRED_STEP,
    invalid_type_error: INVALID_STEP_NUMBER,
  })
  .int(INVALID_STEP_INT)
  .positive(INVALID_STEP_MIN)
  .optional();

export const requestSchema = z.object({
  grid: z.array(
    z.array(
      z.number({
        invalid_type_error: INVALID_GRID_CELL,
      })
    ),
    {
      required_error: REQUIRED_GRID,
      invalid_type_error: INVALID_GRID,
    }
  ),
  steps: stepsSchema,
});
