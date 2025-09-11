import DinerSelector from "./DinerSelector";
import { render, screen } from "@testing-library/react";
import { afterAll, describe, expect, it, vi } from "vitest";

const mockProps = {
  allDiners: [
    { name: "John", dislikes: ["pizza"] },
    { name: "Jane", dislikes: ["sushi"] },
  ],
  setDislikedMeals: vi.fn(),
  selectedDiners: [{ name: "John", dislikes: ["pizza"] }],
  setSelectedDiners: vi.fn(),
};

afterAll(() => {
  vi.restoreAllMocks();
});

describe("DinerSelector", () => {
  it("renders correctly", () => {
    render(<DinerSelector {...mockProps} />);
    const dinerSelector = screen.getByTestId("diner-selector");
    expect(dinerSelector).toBeInTheDocument();
  });

  it("renders diner selector title", () => {
    render(<DinerSelector {...mockProps} />);
    const title = screen.getByRole("heading", { name: /Choose Who's Eating/i });
    expect(title).toBeInTheDocument();
  });

  it("renders diner checkboxes", () => {
    render(<DinerSelector {...mockProps} />);
    const checkBoxes = screen.getAllByTestId("diner-checkbox");
    expect(checkBoxes.length).toBe(mockProps.allDiners.length);
  });

  it("renders diner checkboxes", () => {
    render(<DinerSelector {...mockProps} />);
    const checkBoxes = screen.getAllByTestId("diner-checkbox");
    expect(checkBoxes.length).toBe(mockProps.allDiners.length);
  });
});
