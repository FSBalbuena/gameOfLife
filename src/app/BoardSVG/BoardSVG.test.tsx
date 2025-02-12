import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { EMPTY_GRID } from "@/data/common";
import BoardSVG from "@/app/BoardSVG";

const defaultProps = {
  grid: EMPTY_GRID,
  onUpdate: jest.fn(),
};

describe("BoardSVG", () => {
  it("Renders without crashing", () => {
    render(<BoardSVG {...defaultProps} />);
    expect(screen.getByRole("application")).toBeInTheDocument();
  });
});
