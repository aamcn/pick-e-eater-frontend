import AddMealForm from "./AddMealForm";
import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi} from "vitest";

const mockProps = {
    toggleFormDisplay: vi.fn(),
    getMeals: vi.fn(),
    allMeals: []
}

describe("AddMealForm", () => {
  it("renders correctly", () => {
    render(<AddMealForm {...mockProps} />);
    const formElement = screen.getByTestId("add-meal-form");
    expect(formElement).toBeInTheDocument();
  });
}); 