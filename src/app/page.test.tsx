import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Page from "@/app/page";

describe("Page", () => {
  it("renders a heading", () => {
    render(<Page />);

    const heading = screen.getByRole("heading", { level: 1 });

    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent("Conway's Game of Life");
  });

  it("renders a description", () => {
    render(<Page />);

    const description = screen.getByRole("paragraph");

    expect(description).toBeInTheDocument();
    expect(description).toHaveTextContent("A cellular automaton simulation.");
  });

  it("renders homepage unchanged", () => {
    const { container } = render(<Page />);
    expect(container).toMatchSnapshot();
  });
});
