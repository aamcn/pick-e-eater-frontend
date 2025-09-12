import AddMealForm from "./AddMealForm";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach} from "vitest";
import * as postNewMeal from './utillities/postNewMeal/postNewMeal'

const mockProps = {
  toggleFormDisplay: vi.fn(),
  getMeals: vi.fn(),
  allMeals: [
    { id: 1, name: "Pizza", difficulty: 300 },
    { id: 2, name: "Burger", difficulty: 500 },
  ],
};

beforeEach(() => {
  vi.resetAllMocks();
});

window.alert = vi.fn();


describe("AddMealForm", () => {
  it("renders correctly", () => {
    render(<AddMealForm {...mockProps} />);
    const formElement = screen.getByTestId("add-meal-form");
    expect(formElement).toBeInTheDocument();
  });


  it("renders the form fields", () => {
    render(<AddMealForm {...mockProps} />);
    const nameInput = screen.getByLabelText("Meal Name:");
    const typeInput = screen.getByLabelText("Type:");
    const subTypeInput = screen.getByLabelText("Main Ingredient:");
    const difficultyInput = screen.getByLabelText("Difficulty:");
    expect(nameInput).toBeInTheDocument();
    expect(typeInput).toBeInTheDocument();
    expect(subTypeInput).toBeInTheDocument();
    expect(difficultyInput).toBeInTheDocument();
  })

  it("renders error message and text when user inputs a meal name that already exists in allMealNames", async  () => {
     window.alert = vi.fn();

    render(<AddMealForm {...mockProps} />);
    const nameInput = screen.getByLabelText("Meal Name:");
    const user = userEvent.setup();
    await user.type(nameInput, "Pizza");
    
    const errorElement = screen.getByTestId("error-message-element");
    expect(errorElement.textContent).toBe("Pizza is already on the list!");
  })

  it("renders success message and text when user inputs a unique meal and submits the form", async () => {
    render(<AddMealForm {...mockProps} />);
    const user = userEvent.setup();
    const nameInput = screen.getByLabelText("Meal Name:");
    const typeInput = screen.getByLabelText("Type:");
    const subTypeInput = screen.getByLabelText("Main Ingredient:");
    const difficultyInput = screen.getByLabelText("Difficulty:");
    await user.type(nameInput, "Pasta");
    await user.type(typeInput, "Italian");
    await user.type(subTypeInput, "Tomato");
    await user.type(difficultyInput, "Easy");
    const submitButton = screen.getByRole("button", { name: "Submit" });
    await user.click(submitButton);
    const successElement = screen.getByTestId("success-message-element");
    expect(successElement.textContent).toBe("Pasta has been submitted!");
  });

  it("renders success message and text when user inputs a unique meal and submits the form", async () => {
    render(<AddMealForm {...mockProps} />);
    const user = userEvent.setup();
    const nameInput = screen.getByLabelText("Meal Name:");
    const typeInput = screen.getByLabelText("Type:");
    const subTypeInput = screen.getByLabelText("Main Ingredient:");
    const difficultyInput = screen.getByLabelText("Difficulty:");
    await user.type(nameInput, "Pasta");
    await user.type(typeInput, "Italian");
    await user.type(subTypeInput, "Tomato");
    await user.type(difficultyInput, "Easy");
    const submitButton = screen.getByRole("button", { name: "Submit" });
    await user.click(submitButton);
    const successElement = screen.getByTestId("success-message-element");
    expect(successElement.textContent).toBe("Pasta has been submitted!");
  });

  it("renders success message and text when user inputs a unique meal and submits the form", async () => {
    render(<AddMealForm {...mockProps} />);
    const postNewMealSpy = vi.spyOn(postNewMeal, "postNewMeal");
    const user = userEvent.setup();
    const nameInput = screen.getByLabelText("Meal Name:");
    const typeInput = screen.getByLabelText("Type:");
    const subTypeInput = screen.getByLabelText("Main Ingredient:");
    const difficultyInput = screen.getByLabelText("Difficulty:");
    await user.type(nameInput, "Pasta");
    await user.type(typeInput, "Italian");
    await user.type(subTypeInput, "Tomato");
    await user.type(difficultyInput, "Easy");
    const submitButton = screen.getByRole("button", { name: "Submit" });
    await user.click(submitButton);
    expect(postNewMealSpy).toHaveBeenCalled();
  });

  it("Resets form fields when reset button is clicked", async () => {
    render(<AddMealForm {...mockProps} />);
    const user = userEvent.setup();
    const nameInput = screen.getByLabelText("Meal Name:");
    const typeInput = screen.getByLabelText("Type:");
    const subTypeInput = screen.getByLabelText("Main Ingredient:");
    const difficultyInput = screen.getByLabelText("Difficulty:");
    await user.type(nameInput, "Pasta");
    await user.type(typeInput, "Italian");
    await user.type(subTypeInput, "Tomato");
    await user.type(difficultyInput, "Easy");

    const resetButton = screen.getByRole("button", { name: "Reset" });
    await user.click(resetButton);
    expect(nameInput.getAttribute("value")).toBe(null);
    expect(typeInput.getAttribute("value")).toBe(null)
    expect(subTypeInput.getAttribute("value")).toBe(null)
    expect(difficultyInput.getAttribute("value")).toBe(null);
  });

   it("should not call postNewMeal when form is submitted with empty fields", async () => {
    render(<AddMealForm {...mockProps} />);
    const postNewMealSpy = vi.spyOn(postNewMeal, "postNewMeal");
    const user = userEvent.setup();
    const submitButton = screen.getByRole("button", { name: "Submit" });
    await user.click(submitButton);
    expect(postNewMealSpy).not.toHaveBeenCalled();
  });

  it("should not call postNewMeal when form is submitted with empty fields", async () => {
    render(<AddMealForm {...mockProps} />);
    const postNewMealSpy = vi.spyOn(postNewMeal, "postNewMeal");
    const user = userEvent.setup();
    const submitButton = screen.getByRole("button", { name: "Submit" });
    await user.click(submitButton);
    expect(postNewMealSpy).not.toHaveBeenCalled();
  });


   it("should not call postNewMeal when form is submitted with any empty fields", async () => {
    render(<AddMealForm {...mockProps} />);
    const postNewMealSpy = vi.spyOn(postNewMeal, "postNewMeal");
    const user = userEvent.setup();

    const nameInput = screen.getByLabelText("Meal Name:");
    const typeInput = screen.getByLabelText("Type:");
    const subTypeInput = screen.getByLabelText("Main Ingredient:");
    const difficultyInput = screen.getByLabelText("Difficulty:");
    const submitButton = screen.getByRole("button", { name: "Submit" });


    await user.type(nameInput, "Pasta");
    await user.click(submitButton);
    expect(postNewMealSpy).not.toHaveBeenCalled();

    await user.type(typeInput, "Italian");
    await user.click(submitButton);
    expect(postNewMealSpy).not.toHaveBeenCalled();

    await user.type(subTypeInput, "Tomato");
    await user.click(submitButton);
    expect(postNewMealSpy).not.toHaveBeenCalled();

    await user.type(difficultyInput, "Easy");
    await user.click(submitButton);
    expect(postNewMealSpy).toHaveBeenCalled();

  });

   it("calls toggleFormDisplay when the close button is clicked", async () => {
    const user = userEvent.setup();
    render(<AddMealForm {...mockProps} />);
    const closeFormButton = screen.getByRole("button", { name: "Close" });
    await user.click(closeFormButton);
    expect(mockProps.toggleFormDisplay).toHaveBeenCalled();
   })

  
})