import { updateMealCheckedState } from "./updateMealCheckedState";
import { describe, expect, it, vi } from "vitest";

const meal = {
  id: 1,
  name: "Pizza",
  type: "Fast Food",
  sub_type: "Italian",
  difficulty: "Easy",
};

const selectedDiner = { id: 1, name: "John", dislikes: [1] };
const setIsChecked = vi.fn();

describe("updateMealCheckedState", () => {
  it("should set isChecked to true if meal is in dislikes", () => {
    console.log(meal);
    updateMealCheckedState(selectedDiner, meal, setIsChecked);
    expect(setIsChecked).toHaveBeenCalledWith(true);
  });

  it("should set isChecked to false if meal is not in dislikes", () => {
    const dinerWithoutDislike = { id: 2, name: "Jane", dislikes: [2] };
    updateMealCheckedState(dinerWithoutDislike, meal, setIsChecked);
    expect(setIsChecked).toHaveBeenCalledWith(false);
  });

  it("should handle empty dislikes array", () => {
    const dinerWithEmptyDislikes = { id: 3, name: "Doe", dislikes: [] };
    updateMealCheckedState(dinerWithEmptyDislikes, meal, setIsChecked);
    expect(setIsChecked).toHaveBeenCalledWith(false);
  });

  it("should throw error if selectedDiner is null or undefined", () => {
    expect(() => updateMealCheckedState(null, meal, setIsChecked)).toThrow(
      "Invalid arguments provided to updateMealCheckedState, selectedDiner is required",
    );
    expect(() => updateMealCheckedState(undefined, meal, setIsChecked)).toThrow(
      "Invalid arguments provided to updateMealCheckedState, selectedDiner is required",
    );
  });

  it("should throw error if meal is null or undefined", () => {
    expect(() =>
      updateMealCheckedState(selectedDiner, null, setIsChecked),
    ).toThrow(
      "Invalid arguments provided to updateMealCheckedState, meal is required",
    );
    expect(() =>
      updateMealCheckedState(selectedDiner, undefined, setIsChecked),
    ).toThrow(
      "Invalid arguments provided to updateMealCheckedState, meal is required",
    );
  });

  it("should throw error if setIsChecked is not a function", () => {
    expect(() => updateMealCheckedState(selectedDiner, meal, null)).toThrow(
      "setIsChecked must be a function",
    );
    expect(() =>
      updateMealCheckedState(selectedDiner, meal, undefined),
    ).toThrow("setIsChecked must be a function");
    expect(() =>
      updateMealCheckedState(selectedDiner, meal, "notAFunction"),
    ).toThrow("setIsChecked must be a function");
  });

  it("should call setIsChecked only once per function call", () => {
    const mockSetIsChecked = vi.fn();
    updateMealCheckedState(selectedDiner, meal, mockSetIsChecked);
    expect(mockSetIsChecked).toHaveBeenCalledTimes(1);
  });
});
