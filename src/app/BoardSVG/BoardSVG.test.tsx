import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { createGridByRange } from "@/data/utils";
import BoardSVG from "@/app/BoardSVG";

const range = 5; // 5x5 grid
const grid = createGridByRange(range);
const onUpdate = jest.fn();

const defaultProps = {
  range,
  grid,
  onUpdate,
};

describe("BoardSVG", () => {
  it("Renders without crashing", () => {
    const { container } = render(<BoardSVG {...defaultProps} />);

    // Take the snapshot after the state update
    expect(container).toMatchSnapshot();
  });

  it("Renders the correct number of cells", () => {
    render(<BoardSVG {...defaultProps} />);
    const cellGroup = screen.getAllByRole("button");
    expect(cellGroup.length).toBe(defaultProps.range ** 2);
  });

  it("Renders the correct state for cells", () => {
    const statedGrid = grid.map((row) => [...row]);
    statedGrid[0][3] = 1;
    render(<BoardSVG {...defaultProps} grid={statedGrid} />);
    const cellGroup = screen.getAllByRole("button");
    const liveCell = cellGroup.at(3);
    expect(liveCell).toHaveAttribute("fill", "black");
  });

  describe("When a cell is clicked", () => {
    it("onUpdate should be called", () => {
      render(<BoardSVG {...defaultProps} />);
      expect(defaultProps.onUpdate).not.toHaveBeenCalled();
      const cellGroup = screen.getAllByRole("button");
      fireEvent.click(cellGroup.at(0) as Element);

      expect(defaultProps.onUpdate).toHaveBeenCalled();
    });
  });
});
