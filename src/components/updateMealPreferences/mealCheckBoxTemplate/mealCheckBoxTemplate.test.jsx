import MealCheckBoxTemplate from "./MealCheckBoxTemplate";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";

const mockProps = {
  meal: {
    id: 1,
    name: "Pizza",
    type: "Fast Food",
    sub_type: "Italian",
    difficulty: "Easy",
  },
  selectedDiner: { id: 1, name: "John", dislikes: [] },
  setDinerDislikedMeals: vi.fn(),
  dinerDislikedMeals: [],
};

beforeEach(() => {
  vi.resetAllMocks();
});

describe("MealCheckBoxTemplate", () => {
  it("renders correctly", () => {
    render(<MealCheckBoxTemplate {...mockProps} />);
    const container = screen.getByTestId("meal-checkbox");
    expect(container).toBeInTheDocument();
  });

  it("renders label with correct meal props", () => {
    render(<MealCheckBoxTemplate {...mockProps} />);
    const label = screen.getByText("Pizza");
    expect(label.getAttribute("for")).toBe("1");
    expect(label).toBeInTheDocument();
  });

  it("toggles checkbox on click", () => {
    render(<MealCheckBoxTemplate {...mockProps} />);
    const input = screen.getByTestId("meal-checkbox-input");
    fireEvent.click(input);
    expect(input.checked).toBe(true);
    fireEvent.click(input);
    expect(input.checked).toBe(false);
  });

  it("calls setDinerDislikedMeals on each click", () => {
    render(<MealCheckBoxTemplate {...mockProps} />);
    const input = screen.getByTestId("meal-checkbox-input");
    fireEvent.click(input);
    expect(mockProps.setDinerDislikedMeals).toHaveBeenCalledTimes(1);
    fireEvent.click(input);
    fireEvent.click(input);
    fireEvent.click(input);
    expect(mockProps.setDinerDislikedMeals).toHaveBeenCalledTimes(4);
  });

  it("checkbox is unchecked if meal is not in dinerDislikedMeals", () => {
    render(<MealCheckBoxTemplate {...mockProps} />);
    const input = screen.getByTestId("meal-checkbox-input");
    expect(input.checked).toBe(false);
  });

  it("checkbox is checked if meal is already in dinerDislikedMeals on render", () => {
    const mockProps = {
      meal: {
        id: 1,
        name: "Pizza",
        type: "Fast Food",
        sub_type: "Italian",
        difficulty: "Easy",
      },
      selectedDiner: { id: 1, name: "John", dislikes: [1] },
      setDinerDislikedMeals: vi.fn(),
      dinerDislikedMeals: [],
    };
    render(<MealCheckBoxTemplate {...mockProps} />);
    const input = screen.getByTestId("meal-checkbox-input");
    expect(input.checked).toBe(true);
  });
});
