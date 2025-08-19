import FilterCheckBox from "./FilterCheckBox";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi} from "vitest";

const mockProps = {
  field: "Easy",
  onClick: vi.fn(),
};

describe("FilterCheckBox", () => {
  it("renders correctly", () => {
    render(<FilterCheckBox {...mockProps} />);
    const filterCheckBox = screen.getByTestId("filter-checkbox-container");
    expect(filterCheckBox).toBeInTheDocument();
  });

  it("calls onClick when clicked", () => {
    render(<FilterCheckBox {...mockProps} />);
    const filterCheckBox = screen.getByTestId("filter-checkbox-container");
    fireEvent.click(filterCheckBox);
    expect(mockProps.onClick).toHaveBeenCalledWith(false, mockProps.field);
  });

  it("toggles isClicked state on click", () => {
    render(<FilterCheckBox {...mockProps} />);
    const filterCheckBox = screen.getByTestId("filter-checkbox-container");
    
    // Initial state should be true
    expect(filterCheckBox.className).toContain("filterCheckBox");

    // Click to toggle
    fireEvent.click(filterCheckBox);
    expect(mockProps.onClick).toHaveBeenCalledWith(false, mockProps.field);
    
    // Check if className reflects the change
    expect(filterCheckBox.className).toContain("isClicked");

    // Click again to toggle back
    fireEvent.click(filterCheckBox);
    expect(mockProps.onClick).toHaveBeenCalledWith(true, mockProps.field);
    
    // Check if className reflects the change back
    expect(filterCheckBox.className).not.toContain("isClicked");
  });

});
