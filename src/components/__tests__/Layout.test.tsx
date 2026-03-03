import React from "react";
import { render, screen } from "@testing-library/react";
import Layout from "../layout/Layout";

// Mock Next.js router
jest.mock("next/navigation", () => ({
  usePathname: () => "/dashboard",
}));

describe("Layout", () => {
  it("renders children correctly", () => {
    render(
      <Layout title="Test Page">
        <div>Test Content</div>
      </Layout>,
    );

    expect(screen.getByText("Test Content")).toBeInTheDocument();
    expect(screen.getByText("Test Page")).toBeInTheDocument();
  });

  it("renders breadcrumbs when provided", () => {
    const breadcrumbs = [{ label: "Pages / Test" }];
    render(
      <Layout title="Test Page" breadcrumbs={breadcrumbs}>
        <div>Test Content</div>
      </Layout>,
    );

    expect(screen.getByText("Pages / Test")).toBeInTheDocument();
  });
});
