import ToolBar from "./ToolBar";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";

const mockProps = {
  toolButtonsClassName: "toolBarButtons",
  setToolButtonsClassName: vi.fn(),
};

beforeEach(() => {
  vi.clearAllMocks();
});

describe("ToolBar", () => {
  it("renders the toolbar", () => {
    render(<ToolBar {...mockProps} />);
    const toolBar = screen.getByTestId("tool-bar-container");
    expect(toolBar).toBeInTheDocument();
  });

  it("contains the correct number of buttons", () => {
    render(<ToolBar {...mockProps} />);
    const buttons = screen.getAllByRole("button");
    expect(buttons.length).toBe(1);
  });

  it("calls setToolButtonsClassName with correct value when button is clicked to hide element", () => {
    render(<ToolBar {...mockProps} />);
    const button = screen.getByTestId("tool-toggle-button");
    fireEvent.click(button);
    expect(mockProps.setToolButtonsClassName).toHaveBeenCalledWith(
      "toolBarButtons, hidden",
    );
  });

  it("calls setToolButtonsClassName with correct value when button is clicked to display element", () => {
    render(
      <ToolBar
        {...mockProps}
        toolButtonsClassName={"toolBarButtons, hidden"}
      />,
    );
    const button = screen.getByTestId("tool-toggle-button");
    fireEvent.click(button);
    expect(mockProps.setToolButtonsClassName).toHaveBeenCalledWith(
      "toolBarButtons",
    );
  });
});
