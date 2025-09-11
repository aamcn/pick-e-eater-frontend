import FilterCheckBox from "./FilterCheckBox";
import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

const mockProps = {
  clickFunction: vi.fn(),
  field: "Easy",
  setCheckedFields: vi.fn(),
  checkedFields: [],
};

beforeEach(() => {
  vi.clearAllMocks();
});

describe("FilterCheckBox", () => {
  it("renders correctly", () => {
    render(<FilterCheckBox {...mockProps} />);
    const filterCheckBox = screen.getByTestId("filter-checkbox-container");
    expect(filterCheckBox).toBeInTheDocument();
  });

  it("calls clickFunction when clicked", () => {
    render(<FilterCheckBox {...mockProps} />);
    const filterCheckBox = screen.getByTestId("filter-checkbox-container");
    expect(mockProps.clickFunction).toHaveBeenCalledWith(
      true,
      mockProps.field,
      mockProps.setCheckedFields,
      mockProps.checkedFields,
    );
    fireEvent.click(filterCheckBox);
    expect(mockProps.clickFunction).toHaveBeenCalledWith(
      false,
      mockProps.field,
      mockProps.setCheckedFields,
      mockProps.checkedFields,
    );
  });

  it("toggles isClicked state on click", () => {
    render(<FilterCheckBox {...mockProps} />);
    const filterCheckBox = screen.getByTestId("filter-checkbox-container");

    // Initial state should be true
    expect(filterCheckBox.className).toContain("filterCheckBox");

    // Click to toggle
    fireEvent.click(filterCheckBox);
    expect(mockProps.clickFunction).toHaveBeenCalledWith(
      false,
      mockProps.field,
      mockProps.setCheckedFields,
      mockProps.checkedFields,
    );

    // Check if className reflects the change
    expect(filterCheckBox.className).toContain("isClicked");

    // Click again to toggle back
    fireEvent.click(filterCheckBox);
    expect(mockProps.clickFunction).toHaveBeenCalledWith(
      true,
      mockProps.field,
      mockProps.setCheckedFields,
      mockProps.checkedFields,
    );

    // Check if className reflects the change back
    expect(filterCheckBox.className).not.toContain("isClicked");
  });
});
