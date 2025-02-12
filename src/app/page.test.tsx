import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import GameOfLife from "@/app/page";

describe("GameOfLife", () => {
  describe("renders", () => {
    it('User should be able to see the title "Conway\'s game of life"', () => {
      render(<GameOfLife />);

      const heading = screen.getByRole("heading", { level: 1 });

      expect(heading).toBeInTheDocument();
      expect(heading).toHaveTextContent("Conway's Game of Life");
    });

    it('User should be able to see a description "A cellular automaton simulation."', () => {
      render(<GameOfLife />);

      const description = screen.getByRole("paragraph");

      expect(description).toBeInTheDocument();
      expect(description).toHaveTextContent("A cellular automaton simulation.");
    });
    it('User should be able to see the "Next state" button', () => {
      render(<GameOfLife />);

      const button = screen.getByRole("button", {
        name: "Next state",
      });

      expect(button).toBeInTheDocument();
      expect(button).toHaveTextContent("Next state");
    });

    it('User should be able to see the "Advance Steps"', () => {
      render(<GameOfLife />);

      const button = screen.getByRole("button", {
        name: "Advance state",
      });

      const input = screen.getByRole("spinbutton");

      expect(button).toBeInTheDocument();
      expect(input).toBeInTheDocument();
      expect(button).toHaveTextContent("Advance state");
    });

    it('User should be able to see the "Play Forever" checkbox', () => {
      render(<GameOfLife />);

      const checkbox = screen.getByRole("checkbox", {
        name: "Play Forever",
      });

      expect(checkbox).toBeInTheDocument();
    });

    it('"Play Forever" checkbox should be unchecked ', () => {
      render(<GameOfLife />);

      const checkbox = screen.getByRole("checkbox", {
        name: "Play Forever",
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

  xdescribe("behaviour", () => {
    xdescribe("Grid", () => {
      xit("User should be able to select the initial state", () => {});
    });
    xdescribe("Controls", () => {
      xdescribe("when click on Next step", () => {
        xit('User should be able to click on "Next state" button', () => {});
        xit("User should be able to see a loading state", () => {});
        xit("User should be able to see the game's next state", () => {});
      });
      xdescribe("when checks Play Forever", () => {
        xit('User should be able to check "Play Forever" checkbox', () => {});
        xit("User should be able to see the game's next state every second", () => {});
        xit('User should be able to see a message "Automated Game" on top of the grid', () => {});
        xit("Grid should be disabled", () => {});
        xit('User should be able to uncheck "Play Forever" checkbox', () => {});
      });
      xdescribe("when uses Advance Steps", () => {
        xit('User should be able to type a number on "Advance Steps" input', () => {});
        xit('User should be able to click on "Advance steps" button.', () => {});
        xit("User should be able to see the game's next state", () => {});
        xit("User should not be able to place a negative number, or zero.", () => {});
      });
    });
  });

  xdescribe("errors", () => {
    xdescribe("User should be able to see an error message", () => {
      xit("when he places a negative number", () => {});
      xit("when there is an internal error", () => {});
    });
    xit("User should be redirected if he places a wrong url.", () => {});
  });
});
