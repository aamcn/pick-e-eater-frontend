import { tickedBox } from "./tickedBox";
import { afterEach, describe, expect, it, vi } from "vitest";

const mockArguments = {
  selectedDiners: [{ id: 1, name: "Diner 1" }],
  setSelectedDiners: vi.fn(),
  diner: { id: 2, name: "Diner 2" },
  isClicked: false,
  setIsClicked: vi.fn(),
};

afterEach(() => {
  vi.restoreAllMocks();
});

describe("tickedBox Module", () => {
  it("should call setIsClicked with true when isClicked is false", () => {
    tickedBox(
      mockArguments.selectedDiners,
      mockArguments.setIsClicked,
      mockArguments.isClicked,
      mockArguments.diner,
      mockArguments.setSelectedDiners,
    );
    expect(mockArguments.setIsClicked).toHaveBeenCalledWith(true);
  });

  it("should call setIsClicked with false when isClicked is true", () => {
    tickedBox(
      mockArguments.selectedDiners,
      mockArguments.setIsClicked,
      true,
      mockArguments.diner,
      mockArguments.setSelectedDiners,
    );
    expect(mockArguments.setIsClicked).toHaveBeenCalledWith(false);
  });

  it("should add diner to selectedDiners when isClicked is false", () => {
    tickedBox(
      mockArguments.selectedDiners,
      mockArguments.setIsClicked,
      mockArguments.isClicked,
      mockArguments.diner,
      mockArguments.setSelectedDiners,
    );
    expect(mockArguments.setSelectedDiners).toHaveBeenCalled();
  });

  it("should remove diner from selectedDiners when isClicked is true", () => {
    tickedBox(
      mockArguments.selectedDiners,
      mockArguments.setIsClicked,
      true,
      mockArguments.diner,
      mockArguments.setSelectedDiners,
    );
    expect(mockArguments.setSelectedDiners).toHaveBeenCalledWith([
      { id: 1, name: "Diner 1" },
    ]);
  });
});
