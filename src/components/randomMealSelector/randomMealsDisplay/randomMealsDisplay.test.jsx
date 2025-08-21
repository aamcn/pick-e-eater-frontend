import RandomMealsDisplay from "./RandomMealsDisplay";
import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

const mockProps = {
  randomMeals: [
    {
      id: 1,
      name: "Spaghetti",
      type: "Italian",
      sub_type: "Pasta",
      difficulty: "Medium",
    },
    {
      id: 2,
      name: "Burger",
      type: "American",
      sub_type: "Main",
      difficulty: "Easy",
    },
    {
      id: 3,
      name: "Salad",
      type: "Healthy",
      sub_type: "Side",
      difficulty: "Easy",
    },
  ],
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
      expect(item).toHaveTextContent(mockProps.randomMeals[index].name);
    });
  });

  it("handles single entry in randomMeals array", () => {
    render(
      <RandomMealsDisplay
        randomMeals={[
          {
            id: 1,
            name: "Spaghetti",
            type: "Italian",
            sub_type: "Pasta",
            difficulty: "Medium",
          },
        ]}
      />,
    );
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
