import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Pagination from "../Components/Pagination";

describe("Pagination Component", () => {
  const mockOnPageChange = jest.fn();

  test("renders correct page buttons for single page data", () => {
    render(
      <Pagination
        currentPage={1}
        totalPages={1}
        onPageChange={mockOnPageChange}
      />
    );
    expect(screen.getByText("1")).toHaveClass("active");
  });

  test("handles click events correctly", () => {
    render(
      <Pagination
        currentPage={1}
        totalPages={3}
        onPageChange={mockOnPageChange}
      />
    );

    fireEvent.click(screen.getByText("2"));
    expect(mockOnPageChange).toHaveBeenCalledWith(2);

    fireEvent.click(screen.getByText("3"));
    expect(mockOnPageChange).toHaveBeenCalledWith(3);
  });

  test("disables previous and next buttons at boundaries", () => {
    render(
      <Pagination
        currentPage={1}
        totalPages={3}
        onPageChange={mockOnPageChange}
      />
    );

    expect(screen.getByText("< Previous")).toBeDisabled();
    fireEvent.click(screen.getByText("Next >"));
    expect(mockOnPageChange).toHaveBeenCalledWith(2);
  });
});
