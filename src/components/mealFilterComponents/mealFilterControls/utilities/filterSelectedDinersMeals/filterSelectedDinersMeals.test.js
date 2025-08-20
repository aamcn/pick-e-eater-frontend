import {
  filterSelectedDinersMeals,
  filterFunction,
} from "./filterSelectedDinersMeals";
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

  it("should call mockSetFilteredMeals and return meals that do not contain the filter options", () => {
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
      ["Easy", "Hard", "Medium"],
      mockCheckedMealTypes,
      mockCheckedMealSubTypes,
      mockSetFilteredMeals,
    );
    expect(mockSetFilteredMeals).toHaveBeenCalledWith([]);
  });

  it("should return all meals when all filter arrays are empty", () => {
    filterSelectedDinersMeals(
      mockSelectedDinersMeals,
      [],
      [],
      [],
      mockSetFilteredMeals,
    );
    expect(mockSetFilteredMeals).toHaveBeenCalledWith(mockSelectedDinersMeals);
  });

  it("should filter by difficulty only when other filters are empty", () => {
    filterSelectedDinersMeals(
      mockSelectedDinersMeals,
      ["Medium"],
      [],
      [],
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

  it("should filter by meal type only when other filters are empty", () => {
    filterSelectedDinersMeals(
      mockSelectedDinersMeals,
      [],
      ["Italian"],
      [],
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

  it("should filter by meal sub_type only when other filters are empty", () => {
    filterSelectedDinersMeals(
      mockSelectedDinersMeals,
      [],
      [],
      ["Fish"],
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
});

////////////////////////////////

// **filterFunction tests**

let mockDifficultyValue = ["Easy"];
let mockTypeValue = ["Italian"];
let mockSubTypeValue = ["Fish"];

describe("filterFunction", () => {
  describe("filter by difficulty", () => {
    it("should return an array", () => {
      const filteredMeals = mockSelectedDinersMeals.filter((meal) => {
        return filterFunction(mockDifficultyValue, meal.difficulty);
      });
      expect(Array.isArray(filteredMeals)).toBe(true);
    });

    it("should return an array of objects", () => {
      const filteredMeals = mockSelectedDinersMeals.filter((meal) => {
        return filterFunction(mockDifficultyValue, meal.difficulty);
      });
      expect(filteredMeals.every((meal) => typeof meal === "object")).toBe(
        true,
      );
    });

    it("should filter OUT meals that match the mockDifficultyValue array", () => {
      const filteredMeals = mockSelectedDinersMeals.filter((meal) => {
        return filterFunction(mockDifficultyValue, meal.difficulty);
      });
      expect(filteredMeals).toEqual([
        {
          id: 2,
          name: "Sushi",
          type: "Japanese",
          sub_type: "Fish",
          difficulty: "Medium",
        },
      ]);
    });
  });

  describe("filter by type", () => {
    it("should return an array", () => {
      const filteredMeals = mockSelectedDinersMeals.filter((meal) => {
        return filterFunction(mockTypeValue, meal.type);
      });
      expect(Array.isArray(filteredMeals)).toBe(true);
    });

    it("should return an array of objects", () => {
      const filteredMeals = mockSelectedDinersMeals.filter((meal) => {
        return filterFunction(mockTypeValue, meal.type);
      });
      expect(filteredMeals.every((meal) => typeof meal === "object")).toBe(
        true,
      );
    });

    it("should filter OUT meals that match the mockTypeValue array", () => {
      const filteredMeals = mockSelectedDinersMeals.filter((meal) => {
        return filterFunction(mockTypeValue, meal.type);
      });
      expect(filteredMeals).toEqual([
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
  });

  describe("filter by subType", () => {
    it("should return an array", () => {
      const filteredMeals = mockSelectedDinersMeals.filter((meal) => {
        return filterFunction(mockSubTypeValue, meal.sub_type);
      });
      expect(Array.isArray(filteredMeals)).toBe(true);
    });

    it("should return an array of objects", () => {
      const filteredMeals = mockSelectedDinersMeals.filter((meal) => {
        return filterFunction(mockSubTypeValue, meal.sub_type);
      });
      expect(filteredMeals.every((meal) => typeof meal === "object")).toBe(
        true,
      );
    });

    it("should filter OUT meals that match the mockSubTypeValue array", () => {
      const filteredMeals = mockSelectedDinersMeals.filter((meal) => {
        return filterFunction(mockSubTypeValue, meal.sub_type);
      });
      expect(filteredMeals).toEqual([
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
  });
});
