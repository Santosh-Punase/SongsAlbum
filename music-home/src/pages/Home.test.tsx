import React, { FC } from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";

const logoutMock = jest.fn();
const navigateMock = jest.fn();

jest.mock("../auth", () => ({
  logout: logoutMock,
}));
jest.mock("../HOC/withAuthorization", () => ({
  __esModule: true,
  default: () => (Component: FC) => Component,
}));
jest.mock("react-router-dom", () => ({
  useNavigate: jest.fn().mockReturnValue(navigateMock),
}));

import Home from "../pages/Home";

describe("Home Page", () => {
  it("renders Home page correctly", async () => {
    render(
      <Home />
    );

    // Ensure the welcome message is displayed
    expect(screen.getByText("Welcome to the Music App")).toBeInTheDocument();

    // Ensure the music library is loaded
    await waitFor(() => {
      expect(screen.getByTestId("music-library")).toBeInTheDocument();
    });

    // Ensure the logout button is present
    expect(screen.getByRole("button", { name: /logout/i })).toBeInTheDocument();
  });

  it("calls logout and navigates to login on Logout button click", async () => {
    render(
      <Home />
    );

    const logoutButton = screen.getByRole("button", { name: /logout/i });

    // Click logout button
    fireEvent.click(logoutButton);

    // Ensure logout function is called
    expect(logoutMock).toHaveBeenCalled();

    // Ensure navigation to login occurs
    expect(navigateMock).toHaveBeenCalledWith("/login");
  });
});
