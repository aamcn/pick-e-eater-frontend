import { filterArrayDuplicates } from "./filterArrayDuplicates";
import { describe, expect, it } from "vitest";

describe("filterArrayDuplicates", () => {
  it("should add an entry to the array if it doesn't exist", () => {
    const array = [1, 2, 3];
    filterArrayDuplicates(array, 4);
    expect(array).toContain(4);
  });

  it("should not add an entry to the array if it already exists", () => {
    const array = [1, 2, 3];
    filterArrayDuplicates(array, 2);
    expect(array).toHaveLength(3);
  });

  it("should not add a duplicate entry to the array", () => {
    const array = [1, 2, 3];
    filterArrayDuplicates(array, 2);
    expect(array).toHaveLength(3);
  });

  it("should only add unique entries to the array", () => {
    const array = [1, 2, 3];
    filterArrayDuplicates(array, 4);
    filterArrayDuplicates(array, 4);
    filterArrayDuplicates(array, 4);
    expect(array).toHaveLength(4);
    expect(array).toContain(4);
  });

  it("should throw an error if no entry is provided", () => {
    const array = [1, 2, 3];
    expect(() => filterArrayDuplicates(array)).toThrowError(
      "No entry provided to filterArrayDuplicates function",
    );
  });

  it("should add an entry to an empty array", () => {
    const array = [];
    filterArrayDuplicates(array, 4);
    expect(array).toContain(4);
  });

  it("should handle adding multiple unique entries", () => {
    const array = [];
    filterArrayDuplicates(array, 4);
    filterArrayDuplicates(array, 5);
    filterArrayDuplicates(array, 6);
    expect(array).toHaveLength(3);
    expect(array).toContain(4);
    expect(array).toContain(5);
    expect(array).toContain(6);
  });
});
