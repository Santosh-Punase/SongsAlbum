import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";

const loginMock = jest.fn();
const navigateMock = jest.fn();
import Login from "./Login";

jest.mock("../auth", () => ({
  login: loginMock,
}));

jest.mock("react-router-dom", () => ({
  useNavigate: jest.fn().mockReturnValue(navigateMock),
}));

describe("Login Component", () => {

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders Login component correctly", () => {
    render(
      <Login />
    );

    expect(screen.getByTestId("login-button")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Username")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
    expect(screen.getByTestId("login-button")).toBeInTheDocument();
  });

  it("updates username and password state on input", () => {
    render(
      <Login />
    );

    const usernameInput = screen.getByPlaceholderText("Username");
    const passwordInput = screen.getByPlaceholderText("Password");

    fireEvent.change(usernameInput, { target: { value: "testuser" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });

    expect(usernameInput).toHaveValue("testuser");
    expect(passwordInput).toHaveValue("password123");
  });

  it("calls login function and navigates on success", () => {
    loginMock.mockReturnValue("mockToken");

    render(
      <Login />
    );

    fireEvent.change(screen.getByPlaceholderText("Username"), { target: { value: "admin" } });
    fireEvent.change(screen.getByPlaceholderText("Password"), { target: { value: "admin123" } });

    fireEvent.click(screen.getByTestId("login-button"));

    expect(loginMock).toHaveBeenCalledWith("admin", "admin123");
    expect(navigateMock).toHaveBeenCalledWith("/");
  });

  it("shows alert on failed login", () => {
    jest.spyOn(window, "alert").mockImplementation(() => {});
    loginMock.mockReturnValue(null);

    render(
      <Login />
    );

    fireEvent.change(screen.getByPlaceholderText("Username"), { target: { value: "wrongUser" } });
    fireEvent.change(screen.getByPlaceholderText("Password"), { target: { value: "wrongPass" } });

    fireEvent.click(screen.getByTestId("login-button"));

    expect(loginMock).toHaveBeenCalledWith("wrongUser", "wrongPass");
    expect(navigateMock).not.toHaveBeenCalled();
    expect(window.alert).toHaveBeenCalledWith("Invalid credentials");
  });
});
