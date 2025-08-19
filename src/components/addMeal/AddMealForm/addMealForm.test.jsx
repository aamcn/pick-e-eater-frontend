import AddMealForm from "./AddMealForm";
import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi} from "vitest";

const mockProps = {
    toggleFormDisplay: vi.fn(),
    getMeals: vi.fn(),
    allMeals: [ { id: 1, name: "Pizza", difficulty: 300 }, { id: 2, name: "Burger", difficulty: 500 } ]
}

describe("AddMealForm", () => {
  it("renders correctly", () => {
    render(<AddMealForm {...mockProps} />);
    const formElement = screen.getByTestId("add-meal-form");
    expect(formElement).toBeInTheDocument();
  });

}); 