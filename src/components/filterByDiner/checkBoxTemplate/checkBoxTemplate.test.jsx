import CheckBoxTemplate from "./CheckBoxTemplate";
import { render, screen, fireEvent } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

const mockProps = {
  diner: { id: 2, name: "Diner 2" },
  setSelectedDiners: vi.fn(),
  selectedDiners: [{ id: 1, name: "Diner 1" }],
  isClicked: false,
  setIsClicked: vi.fn(),
};

afterEach(() => {
  vi.restoreAllMocks();
});

describe("CheckBoxTemplate", () => {
  it("renders the component", () => {
    render(<CheckBoxTemplate {...mockProps} />);
    expect(screen.getByText("Diner 2")).toBeInTheDocument();
  });

  it("renders the checkbox with correct class", () => {
    render(<CheckBoxTemplate {...mockProps} />);
    const dinerCheckbox = screen.getByTestId("diner-checkbox");
    expect(dinerCheckbox).toHaveClass("dinerCheckBox");
  });

  it("renders the checkbox with correct class", () => {
    render(<CheckBoxTemplate {...mockProps} />);
    fireEvent.click(screen.getByTestId("diner-checkbox"));
    const dinerCheckbox = screen.getByTestId("diner-checkbox");
    expect(dinerCheckbox).toHaveClass("dinerCheckBox, clicked");
  });

  it("renders with the correct diners name", () => {
    render(<CheckBoxTemplate {...mockProps} />);
    expect(screen.getByText("Diner 2")).toBeInTheDocument();
  });

  it("calls setSelectedDiners when checkbox is clicked", () => {
    render(<CheckBoxTemplate {...mockProps} />);
    const dinerCheckbox = screen.getByTestId("diner-checkbox");
    fireEvent.click(dinerCheckbox);
    expect(mockProps.setSelectedDiners).toHaveBeenCalled();
  });

  it("should remove diner from selectedDiners when checkbox is unchecked", () => {
    render(<CheckBoxTemplate {...mockProps} />);
    const dinerCheckbox = screen.getByTestId("diner-checkbox");
    fireEvent.click(dinerCheckbox);
    fireEvent.click(dinerCheckbox);
    expect(mockProps.setSelectedDiners).toHaveBeenCalledTimes(2);
    expect(mockProps.setSelectedDiners).toHaveBeenCalledWith(
      mockProps.selectedDiners,
    );
  });
});
