import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import Controls from "@/app/Controls";
import { GAME_NEXT_BUTTON, GAME_ADVANCE_BUTTON } from "@/data/copy";
const onGeneration = jest.fn();
const onRestart = jest.fn();
const disabled = false;
const error = "";
const defaultProps = {
  error,
  onGeneration,
  disabled,
  onRestart,
};

describe("Controls", () => {
  it("Renders without crashing", () => {
    const { container } = render(<Controls {...defaultProps} />);

    expect(container).toMatchSnapshot();
  });
  it("Renders disabled state", () => {
    const { container } = render(
      <Controls {...defaultProps} disabled={true} />
    );

    expect(container).toMatchSnapshot();
  });
  it("Renders without crashing error state", () => {
    const { container } = render(
      <Controls {...defaultProps} error="Something went wrong" />
    );

    expect(container).toMatchSnapshot();
  });

  describe("Interactive", () => {
    describe("When click on next button", () => {
      beforeEach(() => {
        onGeneration.mockClear();
      });
      afterEach(() => {
        onGeneration.mockClear();
      });
      it("it should call onGeneration", () => {
        render(<Controls {...defaultProps} />);
        const button = screen.getByRole("button", {
          name: GAME_NEXT_BUTTON,
        });
        expect(button).toBeInTheDocument();
        expect(onGeneration).not.toHaveBeenCalled();
        fireEvent.click(button as Element);
        expect(onGeneration).toHaveBeenCalled();
      });
    });

    describe("when uses Advance Steps", () => {
      beforeEach(() => {
        onGeneration.mockClear();
      });
      afterEach(() => {
        onGeneration.mockClear();
      });
      it('User should be able to type a number on "Advance Steps" input', () => {
        render(<Controls {...defaultProps} />);

        const input = screen.getByRole("spinbutton");
        expect(input).toBeInTheDocument();
        expect(input).toHaveValue(1);
        fireEvent.change(input, {
          target: { value: "2" },
        });
        expect(input).toHaveValue(2);
      });
      it('User should be able to click on "Advance steps" button.', () => {
        render(<Controls {...defaultProps} />);
        const input = screen.getByRole("spinbutton");
        expect(input).toBeInTheDocument();
        expect(input).toHaveValue(1);
        fireEvent.change(input, {
          target: { value: "2" },
        });
        expect(onGeneration).not.toHaveBeenCalled();
        const button = screen.getByRole("button", {
          name: GAME_ADVANCE_BUTTON,
        });
        expect(button).toBeInTheDocument();
        fireEvent.click(button);
        expect(onGeneration).toHaveBeenCalledWith(2);
      });
      it("User should be able to action with enter key.", () => {
        render(<Controls {...defaultProps} />);
        const input = screen.getByRole("spinbutton");
        expect(input).toBeInTheDocument();
        expect(input).toHaveValue(1);
        fireEvent.change(input, {
          target: { value: "2" },
        });
        expect(onGeneration).not.toHaveBeenCalled();
        fireEvent.keyDown(input, {
          key: "Enter",
        });
        expect(onGeneration).toHaveBeenCalledWith(2);
      });
      it("User should not be able to place a negative number, or zero.", () => {
        render(<Controls {...defaultProps} />);
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
    describe("When click on restart button", () => {
      beforeEach(() => {
        onRestart.mockClear();
      });
      afterEach(() => {
        onRestart.mockClear();
      });
      it("it should call onRestart", () => {
        render(<Controls {...defaultProps} />);
        const button = screen.getAllByRole("button").at(2);
        expect(button).toBeInTheDocument();
        expect(onRestart).not.toHaveBeenCalled();
        fireEvent.click(button as Element);
        expect(onRestart).toHaveBeenCalled();
      });
    });
  });
});
