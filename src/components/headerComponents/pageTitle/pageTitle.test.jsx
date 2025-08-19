import PageTitle from "./PageTitle";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

describe("PageTitle", () => {
  it("renders correctly", () => {
    render(<PageTitle />);
    const pageTitle = screen.getByTestId("page-title-container");
    expect(pageTitle).toBeInTheDocument();
  });

  it("renders the correct title", () => {
    render(<PageTitle />);
    const title = screen.getByRole("heading", { name: /Pick 'e' Eater/i });
    expect(title).toBeInTheDocument();
  });

});
