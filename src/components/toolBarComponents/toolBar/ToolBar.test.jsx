import ToolBar from "./ToolBar";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import toolIcon from "../../../assets/svg/toolBarIcon.svg";

const mockProps = {
  toolButtonsClassName: "toolBarBackDrop",
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
      "toolBarBackDrop, hidden",
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
      "toolBarBackDrop",
    );
  });

  it("renders the filter meals icon", () => {
    render(<ToolBar {...mockProps} />);
    const icon = screen.getByTestId("filter-meals-icon");
    expect(icon).toBeInTheDocument();
  })

  it("renders the filter meals icon", () => {
    render(<ToolBar {...mockProps} />);
    const icon = screen.getByTestId("filter-meals-icon");
    expect(icon.getAttribute("src")).toBe(toolIcon);
  })

});
