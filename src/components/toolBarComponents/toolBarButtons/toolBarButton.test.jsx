import ToolBarButton from "./ToolBarButton";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";

const mockProps = {
  topText: "Mock TopText",
  bottomText: "Mock Bottom Text",
  toggleValue: "Mock Toggle Value",
  toolButtonIcon: "mock/path/to/icon.png",
  toggleFormDisplay: vi.fn(),
};

beforeEach(() => {
  vi.clearAllMocks();
});

describe("ToolBarButton", () => {
  it("renders correctly", () => {
    render(<ToolBarButton {...mockProps} />);
    const toolButtonTopText = screen.getByTestId("tool-button-top-text");
    expect(toolButtonTopText).toBeInTheDocument();
    expect(toolButtonTopText.textContent).toEqual("Mock TopText");
  });

  it("calls onClick when clicked", () => {
    render(<ToolBarButton {...mockProps} />);
    const toolButtonBottomText = screen.getByTestId("tool-button-bottom-text");
    expect(toolButtonBottomText).toBeInTheDocument();
  });

  it("calls onClick when clicked", () => {
    render(<ToolBarButton {...mockProps} />);
    const toolButtonBottomText = screen.getByTestId("tool-button-bottom-text");
    expect(toolButtonBottomText).toBeInTheDocument();
    expect(toolButtonBottomText.textContent).toEqual("Mock Bottom Text");
  });

  it("renders with correct toggleValue", () => {
    render(<ToolBarButton {...mockProps} />);
    const toolButtonToggleValue = screen.getByTestId("tool-button");
    expect(toolButtonToggleValue).toBeInTheDocument();
    expect(toolButtonToggleValue.getAttribute("value")).toEqual(
      "Mock Toggle Value",
    );
  });

  it("renders with the correct image", () => {
    render(<ToolBarButton {...mockProps} />);
    const toolButtonImage = screen.getByTestId("tool-button-icon");
    expect(toolButtonImage).toBeInTheDocument();
    expect(toolButtonImage.getAttribute("src")).toEqual(
      "mock/path/to/icon.png",
    );
  });

  it("calls toggleFormDisplay on click", () => {
    render(<ToolBarButton {...mockProps} />);
    const toolButtonContainer = screen.getByTestId("tool-button");
    fireEvent.click(toolButtonContainer);
    expect(mockProps.toggleFormDisplay).toHaveBeenCalledWith(
      "Mock Toggle Value",
    );
  });
});
