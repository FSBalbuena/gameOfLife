import "@testing-library/jest-dom";
import {
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from "@testing-library/react";
import GameOfLife from "@/app/page";
import { fetchNextGridGeneration } from "@/service/api";
import {
  GAME_TITLE,
  GAME_DESCRIPTION,
  SUCCESS,
  GAME_NEXT_BUTTON,
  GAME_ADVANCE_BUTTON,
  GAME_PLAY_FOREVER_CHECKBOX,
  FAIL,
  INVALID_STEP_MIN,
  INVALID_GRID,
} from "@/data/copy";

// Mock the entire module
jest.mock("../service/api", () => ({
  fetchNextGridGeneration: jest.fn(),
}));

describe("GameOfLife", () => {
  describe("renders", () => {
    it("User should be able to see the title ", () => {
      render(<GameOfLife />);

      const heading = screen.getByRole("heading", { level: 1 });

      expect(heading).toBeInTheDocument();
      expect(heading).toHaveTextContent(GAME_TITLE);
    });

    it("User should be able to see the right description", () => {
      render(<GameOfLife />);

      const description = screen.getByText(GAME_DESCRIPTION);

      expect(description).toBeInTheDocument();
    });
    it("User should be able to see the next state button", () => {
      render(<GameOfLife />);

      const button = screen.getByRole("button", {
        name: GAME_NEXT_BUTTON,
      });

      expect(button).toBeInTheDocument();
      expect(button).toHaveTextContent(GAME_NEXT_BUTTON);
    });

    it('User should be able to see the "Advance state"', () => {
      render(<GameOfLife />);

      const button = screen.getByRole("button", {
        name: GAME_ADVANCE_BUTTON,
      });

      const input = screen.getByRole("spinbutton");

      expect(button).toBeInTheDocument();
      expect(input).toBeInTheDocument();
      expect(button).toHaveTextContent(GAME_ADVANCE_BUTTON);
    });

    it("User should be able to see the checkbox", () => {
      render(<GameOfLife />);

      const checkbox = screen.getByRole("checkbox", {
        name: GAME_PLAY_FOREVER_CHECKBOX,
      });

      expect(checkbox).toBeInTheDocument();
    });

    it("checkbox should be unchecked ", () => {
      render(<GameOfLife />);

      const checkbox = screen.getByRole("checkbox", {
        name: GAME_PLAY_FOREVER_CHECKBOX,
      });

      expect(checkbox).toBeInTheDocument();
      expect(checkbox).not.toBeChecked();
    });

    it("renders homepage unchanged", () => {
      //mostly for style changes
      //"User should be able to see the grid"
      const { container } = render(<GameOfLife />);
      expect(container).toMatchSnapshot();
    });
  });

  describe("behaviour", () => {
    describe("Grid", () => {
      it("User should be able to select the initial state", () => {
        render(<GameOfLife />);
        const board = screen.getByRole("application");
        expect(board).toBeInTheDocument();
        const cells = within(board).getAllByRole("button");
        const secondCell = cells.at(2);
        expect(secondCell).toHaveAttribute("fill", "white");
        fireEvent.click(secondCell as Element);
        expect(secondCell).toHaveAttribute("fill", "black");
        fireEvent.click(secondCell as Element);
        expect(secondCell).toHaveAttribute("fill", "white");
      });
    });
    describe("Controls", () => {
      describe("when click on Next step", () => {
        beforeEach(() => {
          fetchNextGridGeneration.mockClear();
          fetchNextGridGeneration.mockResolvedValue({
            status: SUCCESS,
            data: [
              [0, 0],
              [0, 0],
            ],
            error: null,
          });
        });
        afterEach(() => {
          fetchNextGridGeneration.mockClear();
        });
        it("User should be able to click on GAME_NEXT_BUTTON button", () => {
          render(<GameOfLife />);
          expect(fetchNextGridGeneration).not.toHaveBeenCalled();
          const button = screen.getByRole("button", {
            name: GAME_NEXT_BUTTON,
          });

          expect(button).toBeInTheDocument();
          expect(button).not.toBeDisabled();
          fireEvent.click(button);
          expect(fetchNextGridGeneration).toHaveBeenCalled();
        });
        it("User should be able to see a loading state", async () => {
          render(<GameOfLife />);
          expect(fetchNextGridGeneration).not.toHaveBeenCalled();
          const button = screen.getByRole("button", {
            name: GAME_NEXT_BUTTON,
          });

          expect(button).toBeInTheDocument();
          expect(button).not.toBeDisabled();
          fireEvent.click(button);
          await waitFor(() => {
            const description = screen.getByText("Generating next state.");
            expect(description).toBeInTheDocument();
          });
        });
        it("User should be able to see the game's next state", async () => {
          render(<GameOfLife />);

          const secondCell = within(screen.getByRole("application"))
            .getAllByRole("button")
            .at(2);
          expect(secondCell).toHaveAttribute("fill", "white");
          fireEvent.click(secondCell as Element);
          expect(secondCell).toHaveAttribute("fill", "black");
          const button = screen.getByRole("button", {
            name: GAME_NEXT_BUTTON,
          });

          fireEvent.click(button);
          await waitFor(() => {
            const newRenderedCell = within(screen.getByRole("application"))
              .getAllByRole("button")
              .at(2);
            expect(newRenderedCell).toHaveAttribute("fill", "white");
          });
        });
      });
      describe("when click on Restart", () => {
        it("User should be able to see the game's empty state", async () => {
          const { container } = render(<GameOfLife />);
          const restartButton = within(screen.getByRole("group"))
            .getAllByRole("button")
            .at(2);

          expect(restartButton).toBeInTheDocument();
          expect(restartButton).not.toBeDisabled();

          const secondCell = within(screen.getByRole("application"))
            .getAllByRole("button")
            .at(2);
          expect(secondCell).toHaveAttribute("fill", "white");
          fireEvent.click(secondCell as Element);
          expect(secondCell).toHaveAttribute("fill", "black");
          fireEvent.click(restartButton as Element);
          expect(container).toMatchSnapshot();
        });
      });
      describe("when checks Play Forever", () => {
        beforeEach(() => {
          fetchNextGridGeneration.mockClear();
        });
        afterEach(() => {
          fetchNextGridGeneration.mockClear();
        });
        it("User should be able to check the checkbox", async () => {
          render(<GameOfLife />);
          const checkbox = screen.getByRole("checkbox", {
            name: GAME_PLAY_FOREVER_CHECKBOX,
          });

          expect(checkbox).toBeInTheDocument();
          expect(checkbox).not.toBeChecked();
          expect(fetchNextGridGeneration).not.toHaveBeenCalled();

          fireEvent.click(checkbox);
          expect(checkbox).toBeChecked();
          await waitFor(() => {
            expect(fetchNextGridGeneration).toHaveBeenCalledTimes(2);
          });
          jest.clearAllTimers();
        });
        it('User should be able to see a message "Generating next state." on top of the grid', async () => {
          render(<GameOfLife />);
          const checkbox = screen.getByRole("checkbox", {
            name: GAME_PLAY_FOREVER_CHECKBOX,
          });

          expect(checkbox).toBeInTheDocument();
          expect(checkbox).not.toBeChecked();
          expect(fetchNextGridGeneration).not.toHaveBeenCalled();
          expect(screen.getByText(GAME_DESCRIPTION)).toBeInTheDocument();

          fireEvent.click(checkbox);
          expect(checkbox).toBeChecked();
          await waitFor(() => {
            expect(
              screen.getByText("Generating next state.")
            ).toBeInTheDocument();
          });
          jest.clearAllTimers();
        });
        it("Grid should be disabled", async () => {
          render(<GameOfLife />);
          const checkbox = screen.getByRole("checkbox", {
            name: GAME_PLAY_FOREVER_CHECKBOX,
          });

          expect(checkbox).not.toBeChecked();
          expect(screen.getByRole("application")).toHaveAttribute(
            "aria-disabled",
            "false"
          );

          fireEvent.click(checkbox);

          expect(checkbox).toBeChecked();

          await waitFor(() => {
            expect(screen.getByRole("application")).toHaveAttribute(
              "aria-disabled",
              "true"
            );
          });
          jest.clearAllTimers();
        });
        it("Controls should be disabled", async () => {
          render(<GameOfLife />);
          const checkbox = screen.getByRole("checkbox", {
            name: GAME_PLAY_FOREVER_CHECKBOX,
          });
          const nextButton = screen.getByRole("button", {
            name: GAME_NEXT_BUTTON,
          });
          const AdvanceButton = screen.getByRole("button", {
            name: GAME_ADVANCE_BUTTON,
          });
          const restartButton = within(screen.getByRole("group"))
            .getAllByRole("button")
            .at(2);

          const input = screen.getByRole("spinbutton");
          expect(checkbox).not.toBeChecked();
          expect(nextButton).not.toBeDisabled();
          expect(restartButton).not.toBeDisabled();
          expect(AdvanceButton).not.toBeDisabled();
          expect(input).not.toBeDisabled();

          fireEvent.click(checkbox);

          expect(checkbox).toBeChecked();

          await waitFor(() => {
            expect(nextButton).toBeDisabled();
            expect(AdvanceButton).toBeDisabled();
            expect(restartButton).toBeDisabled();
            expect(input).toBeDisabled();
          });
          jest.clearAllTimers();
        });
        it("User should be able to uncheck the checkbox", () => {
          render(<GameOfLife />);
          const checkbox = screen.getByRole("checkbox", {
            name: GAME_PLAY_FOREVER_CHECKBOX,
          });

          expect(checkbox).not.toBeChecked();
          fireEvent.click(checkbox);
          expect(checkbox).toBeChecked();
          fireEvent.click(checkbox);
          expect(checkbox).not.toBeChecked();
        });
      });
      describe("when uses Advance Steps", () => {
        beforeEach(() => {
          fetchNextGridGeneration.mockClear();
          fetchNextGridGeneration.mockResolvedValue({
            status: SUCCESS,
            data: [
              [0, 0],
              [0, 0],
            ],
            error: null,
          });
        });
        afterEach(() => {
          fetchNextGridGeneration.mockClear();
        });
        it('User should be able to type a number on "Advance Steps" input', () => {
          render(<GameOfLife />);

          const input = screen.getByRole("spinbutton");
          expect(input).toBeInTheDocument();
          expect(input).toHaveValue(1);
          fireEvent.change(input, {
            target: { value: "2" },
          });
          expect(input).toHaveValue(2);
        });
        it('User should be able to click on "Advance steps" button.', () => {
          render(<GameOfLife />);
          const input = screen.getByRole("spinbutton");
          expect(input).toBeInTheDocument();
          expect(input).toHaveValue(1);
          fireEvent.change(input, {
            target: { value: "2" },
          });
          expect(fetchNextGridGeneration).not.toHaveBeenCalled();
          const button = screen.getByRole("button", {
            name: GAME_ADVANCE_BUTTON,
          });
          expect(button).toBeInTheDocument();
          fireEvent.click(button);
          expect(fetchNextGridGeneration).toHaveBeenCalledWith(
            expect.anything(),
            2
          );
        });
        it("User should be able to action pressing enter.", () => {
          render(<GameOfLife />);
          const input = screen.getByRole("spinbutton");
          expect(input).toBeInTheDocument();
          expect(input).toHaveValue(1);
          fireEvent.change(input, {
            target: { value: "2" },
          });
          expect(fetchNextGridGeneration).not.toHaveBeenCalled();
          fireEvent.keyDown(input, {
            key: "Enter",
          });
          expect(fetchNextGridGeneration).toHaveBeenCalledWith(
            expect.anything(),
            2
          );
        });
        it("User should be able to see the game's next state", async () => {
          render(<GameOfLife />);

          const secondCell = within(screen.getByRole("application"))
            .getAllByRole("button")
            .at(2);

          expect(secondCell).toHaveAttribute("fill", "white");
          fireEvent.click(secondCell as Element);
          expect(secondCell).toHaveAttribute("fill", "black");
          const button = screen.getByRole("button", {
            name: GAME_ADVANCE_BUTTON,
          });

          fireEvent.click(button);
          await waitFor(() => {
            const newRenderedCell = within(screen.getByRole("application"))
              .getAllByRole("button")
              .at(2);
            expect(newRenderedCell).toHaveAttribute("fill", "white");
          });
        });
        it("User should not be able to place a negative number, or zero.", () => {
          render(<GameOfLife />);
          const input = screen.getByRole("spinbutton");
          expect(input).toBeInTheDocument();
          expect(input).toHaveValue(1);
          fireEvent.change(input, {
            target: { value: "-4" },
          });
          expect(input).toHaveValue(1);
          fireEvent.change(input, {
            target: { value: "0" },
          });
          expect(input).toHaveValue(1);
        });
      });
    });
  });

  describe("errors", () => {
    describe("User should be able to see an error message", () => {
      beforeEach(() => {
        fetchNextGridGeneration.mockClear();
      });
      afterEach(() => {
        fetchNextGridGeneration.mockClear();
      });
      it("when he places a negative number", async () => {
        fetchNextGridGeneration.mockResolvedValue({
          status: FAIL,
          data: [
            [0, 0],
            [0, 0],
          ],
          error: {
            steps: [INVALID_STEP_MIN],
          },
        });
        render(<GameOfLife />);
        const controls = screen.getByRole("group");
        expect(controls).toBeInTheDocument();
        const error = within(controls.parentElement as HTMLElement).queryByText(
          INVALID_STEP_MIN
        );
        expect(error).toBe(null);

        fireEvent.click(
          screen.getByRole("button", {
            name: GAME_NEXT_BUTTON,
          })
        );
        await waitFor(() => {
          const error = within(controls.parentElement as HTMLElement).getByText(
            INVALID_STEP_MIN
          );
          expect(error).toBeInTheDocument();
        });
      });

      it("when there is a grid error", async () => {
        fetchNextGridGeneration.mockResolvedValue({
          status: FAIL,
          data: [
            [0, 0],
            [0, 0],
          ],
          error: {
            grid: [INVALID_GRID],
          },
        });
        render(<GameOfLife />);
        const pElements = screen.getAllByRole("paragraph");
        const description = pElements.at(0);

        expect(description).toHaveTextContent(GAME_DESCRIPTION);

        fireEvent.click(
          screen.getByRole("button", {
            name: GAME_NEXT_BUTTON,
          })
        );

        await waitFor(() => {
          expect(description).toHaveTextContent(INVALID_GRID);
        });
      });
    });
  });
});
