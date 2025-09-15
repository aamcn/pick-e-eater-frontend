import { setCheckboxState } from "./setCheckboxState";
import { describe, expect, vi, it } from "vitest";

const event = { target: { checked: true} };
const setIsChecked = vi.fn();
const setDinerDislikedMeals = vi.fn()


describe("setCheckboxState", () => {   
  it("should set isChecked to true and add meal to disliked meals", () => {
    
    setCheckboxState(event, setIsChecked, setDinerDislikedMeals);
    expect(setIsChecked).toHaveBeenCalledWith(true);
    expect(setDinerDislikedMeals).toHaveBeenCalled();
  });

  it("should set isChecked to false and remove meal from disliked meals", () => {
    const uncheckedEvent = { target: { checked: false, value: "1" } };
    setCheckboxState(uncheckedEvent, setIsChecked, setDinerDislikedMeals);
    expect(setIsChecked).toHaveBeenCalledWith(false);
    expect(setDinerDislikedMeals).toHaveBeenCalled();
  }); 

  it("should handle missing event properties gracefully", () => {
    const incompleteEvent = { target: {} };
    expect(() => {setCheckboxState(incompleteEvent, setIsChecked, setDinerDislikedMeals)}).toThrowError("Invalid event object");
  });

  it("should handle null event gracefully", () => {
    expect(() => {setCheckboxState(null, setIsChecked, setDinerDislikedMeals)}).toThrowError("Invalid event object");
  });

  it("should handle undefined event gracefully", () => {
    expect(() => {setCheckboxState(undefined, setIsChecked, setDinerDislikedMeals)}).toThrowError("Invalid event object");
  });
  
});
