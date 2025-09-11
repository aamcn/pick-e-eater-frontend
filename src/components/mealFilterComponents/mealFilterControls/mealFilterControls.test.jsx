import MealFilterControls from "./MealFilterControls";
import { render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { fireEvent } from "@testing-library/react";

const mockProps = {
  allMeals: [
    {
      id: 1,
      name: "Spaghetti",
      type: "Pasta",
      subType: "Italian",
      difficulty: "Easy",
    },
    {
      id: 2,
      name: "Salad",
      type: "Vegetarian",
      subType: "Raw",
      difficulty: "Medium",
    },
  ],
  selectedDinersMeals: [
    {
      id: 1,
      name: "Spaghetti",
      type: "Pasta",
      subType: "Italian",
      difficulty: "Easy",
    },
    {
      id: 2,
      name: "Salad",
      type: "Vegetarian",
      subType: "Raw",
      difficulty: "Medium",
    },
  ],
  setFilteredMeals: vi.fn(),
  selectedDiners: [
    { id: 1, name: "John Doe" },
    { id: 2, name: "Jane Smith" },
  ],
};

afterEach(() => {
  vi.clearAllMocks();
});

describe("MealFilterControls", () => {
  it("renders the component container", () => {
    render(<MealFilterControls {...mockProps} />);
    const filterControlsContainer = screen.getByTestId("meal-filter-controls");
    expect(filterControlsContainer).toBeInTheDocument();
  });

  it("should render the filter form", () => {
    render(<MealFilterControls {...mockProps} />);
    const form = screen.getByTestId("filter-form");
    expect(form).toBeInTheDocument();
  });

  it("should display the filter title for type", () => {
    render(<MealFilterControls {...mockProps} />);
    const filterTypeTitle = screen.getByTestId("filter-title-type");
    expect(filterTypeTitle).toBeInTheDocument();
    expect(filterTypeTitle.textContent).toBe("Type");
  });

  it("toggles filter display when button is clicked", () => {
    render(<MealFilterControls {...mockProps} />);
    const button = screen.getByText("Filter");
    fireEvent.click(button);
    expect(mockProps.setFilteredMeals).toHaveBeenCalled();
  });

  it("should have the correct className when rendered", () => {
    render(<MealFilterControls {...mockProps} />);
    const container = screen.getByTestId("filter-form-backdrop");
    expect(container).toHaveClass("filterFormBackDrop, hidden");
  });

  it("should change the filter form className when toggled", () => {
    render(<MealFilterControls {...mockProps} />);
    const button = screen.getByTestId("filter-form-toggle");
    const container = screen.getByTestId("filter-form-backdrop");

    expect(container).toHaveClass("filterFormBackDrop, hidden");

    fireEvent.click(button);
    expect(container).toHaveClass("filterFormBackDrop");

    fireEvent.click(button);
    expect(container).toHaveClass("filterFormBackDrop, hidden");
  });

  it("should alert when no diners are selected", () => {
    const originalAlert = window.alert;
    window.alert = vi.fn();

    render(<MealFilterControls {...mockProps} selectedDiners={[]} />);
    const button = screen.getByTestId("filter-form-toggle");
    fireEvent.click(button);

    expect(window.alert).toHaveBeenCalledWith("Please add a diner");

    window.alert = originalAlert; // Restore original alert
  });
});
