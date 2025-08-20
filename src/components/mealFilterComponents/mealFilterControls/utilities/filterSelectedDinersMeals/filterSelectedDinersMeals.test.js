import { filterSelectedDinersMeals } from "./filterSelectedDinersMeals";
import { describe, it, expect, vi, beforeEach } from "vitest";

let mockCheckedDifficulties = ["Easy"];
let mockCheckedMealTypes = ["Italian"];
let mockCheckedMealSubTypes = ["Fast Food", "Raw"];

const mockSelectedDinersMeals = [
  {
    id: 1,
    name: "Pizza",
    type: "Italian",
    sub_type: "Fast Food",
    difficulty: "Easy",
  },
  {
    id: 2,
    name: "Sushi",
    type: "Japanese",
    sub_type: "Fish",
    difficulty: "Medium",
  },
  {
    id: 3,
    name: "Salad",
    type: "Vegetarian",
    sub_type: "Raw",
    difficulty: "Easy",
  },
];
const mockSetFilteredMeals = vi.fn();

beforeEach(() => {
  vi.clearAllMocks();
});

describe("filterSelectedDinersMeals", () => {
  it("should call mockSetFilteredMeals", () => {
    filterSelectedDinersMeals(
      mockSelectedDinersMeals,
      mockCheckedDifficulties,
      mockCheckedMealTypes,
      mockCheckedMealSubTypes,
      mockSetFilteredMeals,
    );
    expect(mockSetFilteredMeals).toHaveBeenCalled();
  });

  it("should call mockSetFilteredMeals with the correct filtered arguments", () => {
    filterSelectedDinersMeals(
      mockSelectedDinersMeals,
      mockCheckedDifficulties,
      mockCheckedMealTypes,
      mockCheckedMealSubTypes,
      mockSetFilteredMeals,
    );
    expect(mockSetFilteredMeals).toHaveBeenCalledWith([
      {
        id: 2,
        name: "Sushi",
        type: "Japanese",
        sub_type: "Fish",
        difficulty: "Medium",
      },
    ]);
  });

  it("should call mockSetFilteredMeals with empty array when all meals are filtered out", () => {
    filterSelectedDinersMeals(
      mockSelectedDinersMeals,
      mockCheckedDifficulties = ["Easy", "Hard", "Medium"],
      mockCheckedMealTypes,
      mockCheckedMealSubTypes,
      mockSetFilteredMeals,
    );
    expect(mockSetFilteredMeals).toHaveBeenCalledWith([]);
  });

  it("should call mockSetFilteredMeals with no filters applied when all filter options are empty", () => {
    filterSelectedDinersMeals(
      mockSelectedDinersMeals,
      mockCheckedDifficulties = [],
      mockCheckedMealTypes = [],
      mockCheckedMealSubTypes = [], 
      mockSetFilteredMeals,
    );
    expect(mockSetFilteredMeals).toHaveBeenCalledWith(mockSelectedDinersMeals);
  });

    it("should return the correct meal when only mockCheckedDifficulties has an argument", () => {
        filterSelectedDinersMeals(
        mockSelectedDinersMeals,
        mockCheckedDifficulties = ["Medium"],
        mockCheckedMealTypes = [],
        mockCheckedMealSubTypes = [],
        mockSetFilteredMeals,
        );
        expect(mockSetFilteredMeals).toHaveBeenCalledWith([
        {
            id: 1,
            name: "Pizza",
            type: "Italian",
            sub_type: "Fast Food",
            difficulty: "Easy",
        },
        {
            id: 3,
            name: "Salad",
            type: "Vegetarian",
            sub_type: "Raw",
            difficulty: "Easy",
        },
        ]);
    });

    it("should return the correct meal when only mockCheckedMealTypes has an argument", () => {
        filterSelectedDinersMeals(
        mockSelectedDinersMeals,
        mockCheckedDifficulties = [],
        mockCheckedMealTypes = ["Italian"],
        mockCheckedMealSubTypes = [],
        mockSetFilteredMeals,
        );
        expect(mockSetFilteredMeals).toHaveBeenCalledWith([
        {
            id: 2,
            name: "Sushi",
            type: "Japanese",
            sub_type: "Fish",
            difficulty: "Medium",
        },
        {
            id: 3,
            name: "Salad",
            type: "Vegetarian",
            sub_type: "Raw",
            difficulty: "Easy",
        },
        ]);
    });

    it("should return the correct meal when only mockCheckedMealSubTypes has an argument", () => {
        filterSelectedDinersMeals(
        mockSelectedDinersMeals,
        mockCheckedDifficulties = [],
        mockCheckedMealTypes = [],
        mockCheckedMealSubTypes = ["Fish"],
        mockSetFilteredMeals,
        );
        expect(mockSetFilteredMeals).toHaveBeenCalledWith([
        {
            id: 1,
            name: "Pizza",
            type: "Italian",
            sub_type: "Fast Food",
            difficulty: "Easy",
        },
        {
            id: 3,
            name: "Salad",
            type: "Vegetarian",
            sub_type: "Raw",
            difficulty: "Easy",
        }
    ]);
});
})
