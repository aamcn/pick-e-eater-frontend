import { checkIfDuplicate } from "./checkIfDuplicate";
import { beforeEach, describe, expect, it, vi } from "vitest";

const mockArguments = {
  allMealNames: ["spaghetti", "tacos", "salad"],
  setErrorMessage: vi.fn(),
  setIsMealDuplicate: vi.fn(),
};

beforeEach(() => {
  vi.clearAllMocks();
});

describe("checkIfDuplicate", () => {
  it("should set error message and duplicate flag if meal name is a duplicate", () => {
    checkIfDuplicate(
      mockArguments.allMealNames,
      mockArguments.setErrorMessage,
      mockArguments.setIsMealDuplicate,
      "Tacos",
    );
    expect(mockArguments.setErrorMessage).toHaveBeenCalledWith(
      "Tacos is already on the list!",
    );
  });

  it("should clear error message and set duplicate flag to false if meal name is not a duplicate", () => {
    checkIfDuplicate(
      mockArguments.allMealNames,
      mockArguments.setErrorMessage,
      mockArguments.setIsMealDuplicate,
      "Pizza",
    );
    expect(mockArguments.setErrorMessage).toHaveBeenCalledWith(null);
    expect(mockArguments.setIsMealDuplicate).toHaveBeenCalledWith(false);
  });

  it("should handle case insensitivity when inputMeal is a duplicate", () => {
    checkIfDuplicate(
      mockArguments.allMealNames,
      mockArguments.setErrorMessage,
      mockArguments.setIsMealDuplicate,
      "sPaGhEtTi",
    );
    expect(mockArguments.setErrorMessage).toHaveBeenCalledWith(
      "sPaGhEtTi is already on the list!",
    );
  });

  it("should handle case insensitivity when inputMeal is not a duplicate", () => {
    checkIfDuplicate(
      mockArguments.allMealNames,
      mockArguments.setErrorMessage,
      mockArguments.setIsMealDuplicate,
      "PiZza",
    );
    expect(mockArguments.setErrorMessage).toHaveBeenCalledWith(null);
    expect(mockArguments.setIsMealDuplicate).toHaveBeenCalledWith(false);
  });

  it("should handle 'null' inputMealName", () => {
    checkIfDuplicate(
      mockArguments.allMealNames,
      mockArguments.setErrorMessage,
      mockArguments.setIsMealDuplicate,
      null,
    );
    expect(mockArguments.setErrorMessage).toHaveBeenCalledWith(
      "Input name cannot be empty.",
    );
    expect(mockArguments.setIsMealDuplicate).toHaveBeenCalledWith(false);
  });

  it("should handle whitespace inputMealName", () => {
    checkIfDuplicate(
      mockArguments.allMealNames,
      mockArguments.setErrorMessage,
      mockArguments.setIsMealDuplicate,
      "   ",
    );
    expect(mockArguments.setErrorMessage).toHaveBeenCalledWith(
      "Input name cannot be empty.",
    );
    expect(mockArguments.setIsMealDuplicate).toHaveBeenCalledWith(false);
  });

  it("should handle 'null' inputMealName", () => {
    checkIfDuplicate(
      mockArguments.allMealNames,
      mockArguments.setErrorMessage,
      mockArguments.setIsMealDuplicate,
      undefined,
    );
    expect(mockArguments.setErrorMessage).toHaveBeenCalledWith(
      "Input name cannot be empty.",
    );
    expect(mockArguments.setIsMealDuplicate).toHaveBeenCalledWith(false);
  });

  it("should handle multiple calls with non duplicate inputMealNames", () => {
    checkIfDuplicate(
      mockArguments.allMealNames,
      mockArguments.setErrorMessage,
      mockArguments.setIsMealDuplicate,
      "Toast",
    );
    checkIfDuplicate(
      mockArguments.allMealNames,
      mockArguments.setErrorMessage,
      mockArguments.setIsMealDuplicate,
      "Cake",
    );
    checkIfDuplicate(
      mockArguments.allMealNames,
      mockArguments.setErrorMessage,
      mockArguments.setIsMealDuplicate,
      "Breakfast",
    );
    checkIfDuplicate(
      mockArguments.allMealNames,
      mockArguments.setErrorMessage,
      mockArguments.setIsMealDuplicate,
      "Pizza",
    );
    expect(mockArguments.setErrorMessage).toHaveBeenCalledTimes(4);
    expect(mockArguments.setIsMealDuplicate).toHaveBeenCalledTimes(4);
  });

  it("should handle multiple calls with duplicate inputMealNames", () => {
    checkIfDuplicate(
      mockArguments.allMealNames,
      mockArguments.setErrorMessage,
      mockArguments.setIsMealDuplicate,
      "Tacos",
    );
    checkIfDuplicate(
      mockArguments.allMealNames,
      mockArguments.setErrorMessage,
      mockArguments.setIsMealDuplicate,
      "Spaghetti",
    );
    checkIfDuplicate(
      mockArguments.allMealNames,
      mockArguments.setErrorMessage,
      mockArguments.setIsMealDuplicate,
      "Tacos",
    );
    checkIfDuplicate(
      mockArguments.allMealNames,
      mockArguments.setErrorMessage,
      mockArguments.setIsMealDuplicate,
      "Salad",
    );
    expect(mockArguments.setErrorMessage).toHaveBeenCalledTimes(4);
    expect(mockArguments.setIsMealDuplicate).toHaveBeenCalledTimes(4);
  });
});
