import {
  handleDifficultyClick,
  handleMealTypeClick,
  handleMealSubTypeClick,
} from "./filterClickFunctions";
import { beforeEach, describe, expect, it, vi } from "vitest";

beforeEach(() => {
  vi.clearAllMocks();
});

// **handleDifficultyClick Tests**

const mockDifficultyArguments = {
  clicked: false,
  field: "easy",
  setCheckedDifficulties: vi.fn(),
  checkedDifficulties: ["hard"],
};

describe("handleDifficultyClick ", () => {
  describe("When handleDifficultyClick is called with clicked === false", () => {
    it("should call setCheckedDifficulties when clicked is false", () => {
      handleDifficultyClick(
        false,
        mockDifficultyArguments.field,
        mockDifficultyArguments.setCheckedDifficulties,
        mockDifficultyArguments.checkedDifficulties,
      );
      expect(mockDifficultyArguments.setCheckedDifficulties).toHaveBeenCalled();
    });

    it("should handle empty checkedDifficulties array when clicked is false", () => {
      handleDifficultyClick(
        false,
        mockDifficultyArguments.field,
        mockDifficultyArguments.setCheckedDifficulties,
        [],
      );
      expect(mockDifficultyArguments.setCheckedDifficulties).toHaveBeenCalled();
    });

    it("should throw an error for empty field argument  when clicked is false", () => {
      expect(() =>
        handleDifficultyClick(
          false,
          "",
          mockDifficultyArguments.setCheckedDifficulties,
          mockDifficultyArguments.checkedDifficulties,
        ),
      ).toThrow("Field cannot be empty or null");
    });

    it("should throw an error for null field argument when clicked is false", () => {
      expect(() =>
        handleDifficultyClick(
          false,
          null,
          mockDifficultyArguments.setCheckedDifficulties,
          mockDifficultyArguments.checkedDifficulties,
        ),
      ).toThrow("Field cannot be empty or null");
    });
  });

  describe("When handleDifficultyClick is called with clicked === true", () => {
    it("should call setCheckedDifficulties when clicked is true", () => {
      handleDifficultyClick(
        true,
        mockDifficultyArguments.field,
        mockDifficultyArguments.setCheckedDifficulties,
        mockDifficultyArguments.checkedDifficulties,
      );
      expect(mockDifficultyArguments.setCheckedDifficulties).toHaveBeenCalled();
    });

    it("should filter the checkedDifficulties array when clicked is true", () => {
      handleDifficultyClick(
        true,
        mockDifficultyArguments.field,
        mockDifficultyArguments.setCheckedDifficulties,
        mockDifficultyArguments.checkedDifficulties,
      );
      expect(
        mockDifficultyArguments.setCheckedDifficulties,
      ).toHaveBeenCalledWith(
        mockDifficultyArguments.checkedDifficulties.filter(
          (value) => value !== mockDifficultyArguments.field,
        ),
      );
    });

    it("should handle empty checkedDifficulties array when clicked is true", () => {
      handleDifficultyClick(
        true,
        mockDifficultyArguments.field,
        mockDifficultyArguments.setCheckedDifficulties,
        [],
      );
      expect(mockDifficultyArguments.setCheckedDifficulties).toHaveBeenCalled();
    });

    it("should throw an error for empty field argument when clicked is true", () => {
      expect(() =>
        handleDifficultyClick(
          true,
          "",
          mockDifficultyArguments.setCheckedDifficulties,
          mockDifficultyArguments.checkedDifficulties,
        ),
      ).toThrow("Field cannot be empty or null");
    });

    it("should throw an error for null field argument when clicked is true", () => {
      expect(() =>
        handleDifficultyClick(
          true,
          null,
          mockDifficultyArguments.setCheckedDifficulties,
          mockDifficultyArguments.checkedDifficulties,
        ),
      ).toThrow("Field cannot be empty or null");
    });
  });
});

////////////////////////////////////////////////

// **handleMealTypeClick Tests**

const mockMealTypeArguments = {
  clicked: false,
  field: "breakfast",
  setCheckedMealTypes: vi.fn(),
  checkedMealTypes: ["lunch"],
};


describe("handleMealTypeClick ", () => {
  describe("When handleMealTypeClick is called with clicked === false", () => {
    it("should call setCheckedMealTypes when clicked is false", () => {
      handleMealTypeClick(
        mockMealTypeArguments.clicked,
        mockMealTypeArguments.field,
        mockMealTypeArguments.setCheckedMealTypes,
        mockMealTypeArguments.checkedMealTypes,
      );
        expect(mockMealTypeArguments.setCheckedMealTypes).toHaveBeenCalled();
    });

    it("should handle empty checkedMealTypes array when clicked is false", () => {
      handleMealTypeClick(
        mockMealTypeArguments.clicked,
        mockMealTypeArguments.field,
        mockMealTypeArguments.setCheckedMealTypes,
        [],
      );
      expect(mockMealTypeArguments.setCheckedMealTypes).toHaveBeenCalled();
    });

    it("should throw an error for empty field argument when clicked is false", () => {
      expect(() =>
        handleMealTypeClick(
          mockMealTypeArguments.clicked,
          "",
          mockMealTypeArguments.setCheckedMealTypes,
          mockMealTypeArguments.checkedMealTypes,
        ),
      ).toThrow("Field cannot be empty or null");
    });

    it("should throw an error for null field argument when clicked is false", () => {
      expect(() =>
        handleMealTypeClick(
          mockMealTypeArguments.clicked,
          null,
          mockMealTypeArguments.setCheckedMealTypes,
          mockMealTypeArguments.checkedMealTypes,
        ),
      ).toThrow("Field cannot be empty or null");
    });
  });

  describe("When handleMealTypeClick is called with clicked === true", () => {
     it("should call setCheckedMealTypes when clicked is true", () => {
      handleMealTypeClick(
        true, 
        mockMealTypeArguments.field,
        mockMealTypeArguments.setCheckedMealTypes,
        mockMealTypeArguments.checkedMealTypes,
      );
        expect(mockMealTypeArguments.setCheckedMealTypes).toHaveBeenCalled();
    });

    it("should filter the checkedMealTypes array when clicked is true", () => {
      handleMealTypeClick(
        true,
        mockMealTypeArguments.field,
        mockMealTypeArguments.setCheckedMealTypes,
        mockMealTypeArguments.checkedMealTypes,
      );
      expect(mockMealTypeArguments.setCheckedMealTypes).toHaveBeenCalledWith(
        mockMealTypeArguments.checkedMealTypes.filter(
          (value) => value !== mockMealTypeArguments.field,
        ),
      );
    });

    it("should handle empty checkedMealTypes array when clicked is true", () => {
      handleMealTypeClick(
        true,
        mockMealTypeArguments.field,
        mockMealTypeArguments.setCheckedMealTypes,
        [],
      );
      expect(mockMealTypeArguments.setCheckedMealTypes).toHaveBeenCalled();
    });

    it("should throw an error for empty field argument when clicked is true", () => {
      expect(() =>
        handleMealTypeClick(
          true,
          "",
          mockMealTypeArguments.setCheckedMealTypes,
          mockMealTypeArguments.checkedMealTypes,
        ),
      ).toThrow("Field cannot be empty or null");
    });

    it("should throw an error for null field argument when clicked is true", () => {
      expect(() =>
        handleMealTypeClick(
          true,
          null,
          mockMealTypeArguments.setCheckedMealTypes,
          mockMealTypeArguments.checkedMealTypes,
        ),
      ).toThrow("Field cannot be empty or null");
    });
  });
});

////////////////////////////////////////////////

// **HandleMealSubTypeClick Tests**

const mockMealSubTypeArguments = {
  clicked: false,
  field: "breakfast",
  setCheckedMealSubTypes: vi.fn(),
  checkedMealSubTypes: ["lunch"],
};

describe("handleMealSubTypeClick ", () => {
  describe("When handleMealSubTypeClick is called with clicked === false", () => {
    it("should call setCheckedMealSubTypes when clicked is false", () => {
      handleMealSubTypeClick(
        mockMealSubTypeArguments.clicked,
        mockMealSubTypeArguments.field,
        mockMealSubTypeArguments.setCheckedMealSubTypes,
        mockMealSubTypeArguments.checkedMealSubTypes,
      );
      expect(
        mockMealSubTypeArguments.setCheckedMealSubTypes,
      ).toHaveBeenCalled();
    });

    it("should handle empty checkedMealSubTypes array", () => {
      handleMealSubTypeClick(
        mockMealSubTypeArguments.clicked,
        mockMealSubTypeArguments.field,
        mockMealSubTypeArguments.setCheckedMealSubTypes,
        [],
      );
      expect(
        mockMealSubTypeArguments.setCheckedMealSubTypes,
      ).toHaveBeenCalled();
    });

    it("should throw an error for empty field argument", () => {
      expect(() =>
        handleMealSubTypeClick(
          mockMealSubTypeArguments.clicked,
          "",
          mockMealSubTypeArguments.setCheckedMealSubTypes,
          mockMealSubTypeArguments.checkedMealSubTypes,
        ),
      ).toThrow("Field cannot be empty or null");
    });

    it("should throw an error for null field argument", () => {
      expect(() =>
        handleMealSubTypeClick(
          mockMealSubTypeArguments.clicked,
          null,
          mockMealSubTypeArguments.setCheckedMealSubTypes,
          mockMealSubTypeArguments.checkedMealSubTypes,
        ),
      ).toThrow("Field cannot be empty or null");
    });
  });

  describe("When handleMealSubTypeClick is called with clicked === true", () => {
    it("should filter the checkedMealSubTypes array when clicked is true", () => {
      handleMealSubTypeClick(
        true,
        mockMealSubTypeArguments.field,
        mockMealSubTypeArguments.setCheckedMealSubTypes,
        mockMealSubTypeArguments.checkedMealSubTypes,
      );
      expect(
        mockMealSubTypeArguments.setCheckedMealSubTypes,
      ).toHaveBeenCalledWith(
        mockMealSubTypeArguments.checkedMealSubTypes.filter(
          (value) => value !== mockMealSubTypeArguments.field,
        ),
      );
    });

    it("should handle empty checkedMealSubTypes array when clicked is true", () => {
      handleMealSubTypeClick(
        true,
        mockMealSubTypeArguments.field,
        mockMealSubTypeArguments.setCheckedMealSubTypes,
        [],
      );
      expect(
        mockMealSubTypeArguments.setCheckedMealSubTypes,
      ).toHaveBeenCalled();
    });

    it("should throw an error for empty field argument when clicked is true", () => {
      expect(() =>
        handleMealSubTypeClick(
          true,
          "",
          mockMealSubTypeArguments.setCheckedMealSubTypes,
          mockMealSubTypeArguments.checkedMealSubTypes,
        ),
      ).toThrow("Field cannot be empty or null");
    });

    it("should throw an error for null field argument when clicked is true", () => {
      expect(() =>
        handleMealSubTypeClick(
          true,
          null,
          mockMealSubTypeArguments.setCheckedMealSubTypes,
          mockMealSubTypeArguments.checkedMealSubTypes,
        ),
      ).toThrow("Field cannot be empty or null");
    });
  });
});
