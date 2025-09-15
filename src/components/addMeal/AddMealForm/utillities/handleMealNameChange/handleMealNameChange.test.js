import { handleMealNameChange } from "./handleMealNameChange";
import { beforeEach, describe, expect, it, vi } from "vitest";

const mockSetInputMealName = vi.fn();
const mockEvent = {
  target: { value: "New Meal" },
};

beforeEach(() => {
  vi.clearAllMocks();
});

describe("handleMealNameChange", () => {
  it("should call setInputMealName with the correct value", () => {
    handleMealNameChange(mockEvent, mockSetInputMealName);

    expect(mockSetInputMealName).toHaveBeenCalledWith("New Meal");
  });

  it("should handle rapid successive calls", () => {
    const rapidEvents = [
      { target: { value: "Meal 1" } },
      { target: { value: "Meal 2" } },
      { target: { value: "Meal 3" } },
    ];

    rapidEvents.forEach((event) =>
      handleMealNameChange(event, mockSetInputMealName),
    );

    expect(mockSetInputMealName).toHaveBeenCalledTimes(3);
    expect(mockSetInputMealName).toHaveBeenLastCalledWith("Meal 3");
  });

  it("should handle special characters in meal name", () => {
    const specialCharEvent = {
      target: { value: "Meal @#$%^&*()" },
    };

    handleMealNameChange(specialCharEvent, mockSetInputMealName);

    expect(mockSetInputMealName).toHaveBeenCalledWith("Meal @#$%^&*()");
  });

  it("should handle empty string input", () => {
    const mockEvent = {
      target: { value: "" },
    };

    handleMealNameChange(mockEvent, mockSetInputMealName);

    expect(mockSetInputMealName).toHaveBeenCalledWith("");
  });

  it("should throw an error if event is invalid", () => {
    expect(() => handleMealNameChange(null, mockSetInputMealName)).toThrow(
      "Invalid event object",
    );
  });

  it("should throw an error if event.target.value is not a string", () => {
    const mockEvent = {
      target: { value: 123 },
    };

    expect(() => handleMealNameChange(mockEvent, mockSetInputMealName)).toThrow(
      "Invalid event object",
    );
  });

  it("should throw an error if setInputMealName is not a function", () => {
    expect(() => handleMealNameChange(mockEvent, null)).toThrow(
      "setInputMealName must be a function",
    );
  });
});
