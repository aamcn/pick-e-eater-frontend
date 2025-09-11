import { collectDinerDislikes } from "./collectDinerDislikes";
import { describe, expect, it, vi } from "vitest";

const selectedDiners = [
  { name: "John", dislikes: ["pizza", "sushi"] },
  { name: "Jane", dislikes: ["sushi", "burger"] },
];

const setDislikedMeals = vi.fn();

describe("collectDinerDislikes", () => {
  it("collects and sets unique disliked meals", () => {
    collectDinerDislikes(selectedDiners, setDislikedMeals);

    expect(setDislikedMeals).toHaveBeenCalledWith(["pizza", "sushi", "burger"]);
  });

  it("handles empty selectedDiners", () => {
    collectDinerDislikes([], setDislikedMeals);
    expect(setDislikedMeals).toHaveBeenCalledWith([]);
  });

  it("handles no dislikes in selectedDiners", () => {
    const noDislikes = [{ name: "Alice", dislikes: [] }];
    collectDinerDislikes(noDislikes, setDislikedMeals);
    expect(setDislikedMeals).toHaveBeenCalledWith([]);
  });

  it("handles multiple diners with overlapping dislikes", () => {
    const overlappingDislikes = [
      { name: "Bob", dislikes: ["pizza", "sushi", "burger"] },
      { name: "Charlie", dislikes: ["sushi", "burger"] },
    ];
    collectDinerDislikes(overlappingDislikes, setDislikedMeals);
    expect(setDislikedMeals).toHaveBeenCalledWith(["pizza", "sushi", "burger"]);
  });

  it("returns an array", () => {
    collectDinerDislikes(selectedDiners, setDislikedMeals);
    expect(Array.isArray(setDislikedMeals.mock.calls[0][0])).toBe(true);
  });

  it("does not modify the original selectedDiners array", () => {
    const originalDiners = JSON.parse(JSON.stringify(selectedDiners));
    collectDinerDislikes(selectedDiners, setDislikedMeals);
    expect(selectedDiners).toEqual(originalDiners);
  });
});
