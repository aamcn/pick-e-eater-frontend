import Header from "./Header";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";


describe("Header", () => {
  it("renders correctly", () => {
    render(<Header />);
    const header = screen.getByTestId("header");
    expect(header).toBeInTheDocument();
  });

  it("renders page title", () => {
    render(<Header />);
    const title = screen.getByRole("heading", { name: /Pick 'e' Eater/i });
    expect(title).toBeInTheDocument();
  });


});
