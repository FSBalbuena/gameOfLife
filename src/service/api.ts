"use server";
import { Grid } from "@/data/types";
import { getGridNextState } from "@/service/actions";
import { z } from "zod";

export const SUCCESS = "success";
export const FAIL = "fail";
export const REQUIRED_GRID = "Board is required";
export const INVALID_GRID = "Board must be a 2D array of numbers";
export const INVALID_GRID_CELL = "Invalid Cell value";
export const REQUIRED_STEP = "Step is required";
export const INVALID_STEP_NUMBER = "Step must be a number";
export const INVALID_STEP_INT = "Step must be an integer";
export const INVALID_STEP_MIN = "Step must be a positive number";
export const STANDAR_ERR =
  "Sorry, something went wrong with next state calculation";

const requestSchema = z.object({
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
  steps: z
    .number({
      required_error: REQUIRED_STEP,
      invalid_type_error: INVALID_STEP_NUMBER,
    })
    .int(INVALID_STEP_INT)
    .positive(INVALID_STEP_MIN)
    .optional(),
});

// Function to validate the argument
type ApiResponse = {
  data: Grid;
  error: { grid?: string[] | undefined; steps?: string[] | undefined } | null;
  status: typeof SUCCESS | typeof FAIL;
};

const createResponse = (
  status: ApiResponse["status"],
  data: ApiResponse["data"],
  error: ApiResponse["error"]
) => ({
  status,
  data,
  error,
});

export const fetchNextGridGeneration = async (
  grid: Grid,
  steps?: number
): Promise<ApiResponse> => {
  const validateArgs = requestSchema.safeParse({
    grid,
    steps,
  });

  // Artificially delay a response for demo purposes.

  await new Promise((resolve) => setTimeout(resolve, 2000));

  //"Data fetch completed after 3 seconds."

  if (!validateArgs.success) {
    return createResponse(FAIL, grid, validateArgs.error.flatten().fieldErrors);
  }

  try {
    const data = getGridNextState(grid, steps);
    return createResponse(SUCCESS, data, null);
  } catch {
    return createResponse(FAIL, grid, {
      grid: [STANDAR_ERR],
    });
  }
};
