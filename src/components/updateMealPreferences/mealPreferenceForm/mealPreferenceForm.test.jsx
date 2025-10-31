import MealPreferenceForm from "./MealPreferenceForm";
import { describe, expect, vi, it, afterEach } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

const mockProps = {
  allDiners: [
    { id: 1, name: "Alice" },
    { id: 2, name: "Bob" },
  ],
  allMeals: [
    { id: 1, name: "Pizza" },
    { id: 2, name: "Sushi" },
  ],
  toggleFormDisplay: vi.fn(),
  getUsers: vi.fn(),
};

afterEach(() => {
  vi.clearAllMocks();
});

describe("MealPreferenceForm", () => {
  it("should render successfully", () => {
    render(<MealPreferenceForm {...mockProps} />);
    const formElement = screen.getByTestId("meal-preference-form-container");
    expect(formElement).toBeInTheDocument();
  });

  it("should display the correct number of diner options", () => {
    render(<MealPreferenceForm {...mockProps} />);
    const dinerOptions = screen.getAllByRole("option");
    expect(dinerOptions).toHaveLength(mockProps.allDiners.length + 1); // +1 for the "Pick a Name" option});
    expect(dinerOptions[1].textContent).toBe("Alice");
    expect(dinerOptions[2].textContent).toBe("Bob");
  });

  it("should call toggleFormDisplay when Close button is clicked", async () => {
    const user = userEvent.setup();
    render(<MealPreferenceForm {...mockProps} />);
    const closeButton = screen.getByText("Close");
    await user.click(closeButton);
    expect(mockProps.toggleFormDisplay).toHaveBeenCalled();
    expect(mockProps.toggleFormDisplay).toHaveBeenCalledTimes(1);
  });

  it("should call getUsers on component mount", () => {
    render(<MealPreferenceForm {...mockProps} />);
    expect(mockProps.getUsers).toHaveBeenCalled();
    expect(mockProps.getUsers).toHaveBeenCalledTimes(1);
  });

  it("should update selectedDiner state when a diner is selected", async () => {
    render(<MealPreferenceForm {...mockProps} />);
    const selectElement = screen.getByTestId("diner-select");
    const dinerOptions = screen.getAllByTestId("diner-option");

    // choose option value 1, option 1 IS selected. Option 2 should NOT be selected
    fireEvent.click(selectElement, { target: { value: 1 } });
    expect(dinerOptions[1].selected).toBe(true);
    expect(dinerOptions[2].selected).toBe(false);

    // then choose option value 2, option 2 IS selected. Option 1 should NOT be selected
    fireEvent.click(selectElement, { target: { value: 2 } });
    expect(dinerOptions[2].selected).toBe(true);
    expect(dinerOptions[1].selected).toBe(false);
  });
});
