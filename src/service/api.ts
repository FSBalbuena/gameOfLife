"use server";

import { Grid } from "@/data/types";
import { getGridNextState } from "@/service/actions";

import { requestSchema } from "@/data/common";
import { SUCCESS, FAIL, STANDAR_ERR } from "@/data/copy";

// Function to validate the argument
type ApiResponse = {
  data: Grid;
  error: { grid?: string[] | undefined; steps?: string[] | undefined } | null;
  status: typeof SUCCESS | typeof FAIL;
};

export const createResponse = async (
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
