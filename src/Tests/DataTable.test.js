import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import DataTable from "../Components/DataTable";

jest.mock("../Utils/constants", () => ({
  DEFAULT_API_ERROR_MESSAGE: "An error occurred. Please try again later.",
  RESPONSE_OK_ERROR_MESSAGE: "Failed to fetch data.",
  NUMBER0: 0,
  NUMBER1: 1,
  NUMBER2: 2,
  NUMBER5: 5,
  rowsToFetch: [
    { id: "column1", name: "Header 1" },
    { id: "column2", name: "Header 2" },
    { id: "column3", name: "Header 3" },
  ],
}));

jest.mock("../Utils/api", () => ({
  KICKSTARTER_PROJECT_FETCH_API: "mock_api_endpoint",
}));

describe("DataTable Component", () => {
  const mockData = Array.from({ length: 50 }, (_, i) => ({
    column1: `Row ${i + 1} Col 1`,
    column2: `Row ${i + 1} Col 2`,
    column3: `Row ${i + 1} Col 3`,
  }));

  const originalFetch = global.fetch;

  beforeEach(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockData),
      })
    );
  });

  afterEach(() => {
    global.fetch = originalFetch;
    jest.clearAllMocks();
  });

  test("renders loading screen while fetching data", async () => {
    render(<DataTable />);
    expect(screen.getByRole("status", { name: "Loading" })).toBeInTheDocument();
    await waitFor(() =>
      expect(screen.queryByRole("status")).not.toBeInTheDocument()
    );
  });

  test("renders error screen on fetch failure", async () => {
    global.fetch = jest.fn(() => Promise.reject(new Error("Network Error")));
    render(<DataTable />);
    await screen.findByText("Error Occurred");
    expect(screen.getByText("Network Error")).toBeInTheDocument();
  });

  test("renders data table with correct number of rows per page", async () => {
    render(<DataTable />);
    await screen.findByRole("table");
    expect(screen.getAllByRole("row")).toHaveLength(6); // 1 header row + 5 data rows
  });

  test("renders no data message when the API returns no data", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve([]),
      })
    );

    render(<DataTable />);
    await screen.findByText("No data available");
  });
});
