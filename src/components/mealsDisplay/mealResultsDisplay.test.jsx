import MealResultsDisplay from "./MealResultsDisplay";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

const mockProps = {
  filteredMeals: [
    {
      id: 1,
      name: "Pizza",
      type: "Italian",
      sub_type: "Main Course",
      difficulty: "Easy",
    },
    {
      id: 2,
      name: "Sushi",
      type: "Japanese",
      sub_type: "Main Course",
      difficulty: "Medium",
    },
  ],
};

describe("MealResultsDisplay", () => {
  it("renders the component", () => {
    render(<MealResultsDisplay {...mockProps} />);
  });

  it("renders the ul element", () => {
    render(<MealResultsDisplay {...mockProps} />);
    const mealDisplayList = screen.getByTestId("meal-results-list");
    expect(mealDisplayList).toBeInTheDocument();
  });

  it("renders the list items", () => {
    render(<MealResultsDisplay {...mockProps} />);
    const mealDisplayList = screen.getByTestId("meal-results-list");
    const listItems = mealDisplayList.querySelectorAll("li");
    expect(listItems.length).toBe(mockProps.filteredMeals.length);
  });

  it("renders the list items with correct values", () => {
    render(<MealResultsDisplay {...mockProps} />);
    const mealDisplayList = screen.getByTestId("meal-results-list");
    const listItems = mealDisplayList.querySelectorAll("li");
    const listEntry1 = listItems[0];
    const listEntry2 = listItems[1];
    expect(listEntry1.firstChild.textContent).toBe("Pizza");
    expect(listEntry1.firstChild.nextSibling.textContent).toBe(
      "Italian | Main Course | Easy",
    );
    expect(listEntry2.firstChild.textContent).toBe("Sushi");
    expect(listEntry2.firstChild.nextSibling.textContent).toBe(
      "Japanese | Main Course | Medium",
    );
  });

  it("renders the no meals found message", () => {
    render(<MealResultsDisplay filteredMeals={[]} />);
    const noMealsFoundMessage = screen.getByText("No meals found");
    expect(noMealsFoundMessage).toBeInTheDocument();
  });
});
