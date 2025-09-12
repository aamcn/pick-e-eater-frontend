import RandomMealsDisplay from "./RandomMealsDisplay";
import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

const mockProps = {
  randomMeals: ["Spaghetti", "Burger", "Salad"],
};

beforeEach(() => {
  vi.resetAllMocks();
});

describe("RandomMealsDisplay Component", () => {
  it("renders component", () => {
    render(<RandomMealsDisplay {...mockProps} />);
    const backdrop = screen.getByTestId("random-meal-backdrop");
    expect(backdrop).toBeInTheDocument();
  });

  it("displays the correct number of meals", () => {
    render(<RandomMealsDisplay {...mockProps} />);
    const mealItems = screen.getAllByTestId("random-meal-item");
    expect(mealItems.length).toBe(mockProps.randomMeals.length);
  });

  it("displays meal names correctly", () => {
    render(<RandomMealsDisplay {...mockProps} />);
    const mealItems = screen.getAllByTestId("random-meal-item");
    mealItems.forEach((item, index) => {
      expect(item).toHaveTextContent(mockProps.randomMeals[index]);
    });
  });

  it("handles single entry in randomMeals array", () => {
    render(<RandomMealsDisplay randomMeals={["Spaghetti"]} />);
    const mealItem = screen.getByTestId("random-meal-item");
    expect(mealItem).toBeInTheDocument();
    expect(mealItem).toHaveTextContent("Spaghetti");
  });

  it("handles empty randomMeals array", () => {
    render(<RandomMealsDisplay randomMeals={[]} />);
    const noMealsElement = screen.getByTestId("no-meals-element");
    expect(noMealsElement).toBeInTheDocument();
    expect(noMealsElement).toHaveTextContent("No meals found");
  });
});
