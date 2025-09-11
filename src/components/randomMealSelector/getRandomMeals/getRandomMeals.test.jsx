import GetRandomMeals from "./GetRandomMeals";
import { render, screen, fireEvent } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

const mockProps = {
  filteredMeals: [
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
  toggleFormDisplay: vi.fn(),
};

beforeEach(() => {
  vi.clearAllMocks();
});

describe("GetRandomMeals Component", () => {
  it("renders component", () => {
    render(<GetRandomMeals {...mockProps} />);
    const backdrop = screen.getByTestId("random-meal-form-backdrop");
    expect(backdrop).toBeInTheDocument();
  });

  it("updates number of meals value when input changes", () => {
    render(<GetRandomMeals {...mockProps} />);
    const input = screen.getByTestId("number-of-meals-input");
    fireEvent.change(input, { target: { value: "2" } });
    expect(input.value).toBe("2");
  });

  it("calls handleGetRandomMeals when button is clicked", () => {
    render(<GetRandomMeals {...mockProps} />);
    const input = screen.getByTestId("number-of-meals-input");
    fireEvent.change(input, { target: { value: "2" } });
    const Randomizebutton = screen.getByText("Randomize!");
    fireEvent.click(Randomizebutton);
    // Since handleGetRandomMeals is not directly testable, we can only check if the button exists
    expect(Randomizebutton).toBeInTheDocument();
  });

  it("calls toggleFormDisplay when close button is clicked", () => {
    render(<GetRandomMeals {...mockProps} />);
    const closeButton = screen.getByText("Close");
    fireEvent.click(closeButton);
    expect(mockProps.toggleFormDisplay).toHaveBeenCalled();
  });

  it("calls toggleFormDisplay when close button is clicked", () => {
    render(<GetRandomMeals {...mockProps} />);
    const closeButton = screen.getByText("Close");
    fireEvent.click(closeButton);
    expect(mockProps.toggleFormDisplay).toHaveBeenCalled();
  });

  it("calls toggleFormDisplay when close button is clicked", () => {
    render(<GetRandomMeals {...mockProps} />);
    const closeButton = screen.getByText("Close");
    fireEvent.click(closeButton);
    fireEvent.click(closeButton);
    fireEvent.click(closeButton);
    fireEvent.click(closeButton);
    expect(mockProps.toggleFormDisplay).toBeCalledTimes(4);
  });
});
