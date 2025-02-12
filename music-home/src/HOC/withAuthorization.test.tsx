import React from "react";
import { render } from "@testing-library/react";


const getUserMock = jest.fn();
const navigateMock = (props: { to: string }) => `href="${props.to}"`;

jest.mock("../auth", () => ({
  getUser: getUserMock,
}));
jest.mock("react-router-dom", () => ({
  Navigate: navigateMock,
}));
import withAuthorization from "../HOC/withAuthorization";
import { UserRole } from "../types/User";


// Test Component
const TestComponent = () => <div data-testid="protected-content">Protected Content</div>;

// Wrap component with HOC
const AuthorizedComponent = withAuthorization(["admin"])(TestComponent);

describe("withAuthorization HOC", () => {
  it("redirects to /login if user is not logged in", () => {
    getUserMock.mockReturnValue(null);

    const { container } = render(
      <AuthorizedComponent />
    );

    expect(container.innerHTML).toContain(`href="/login"`);
  });

  it("redirects to /unauthorized if user does not have the required role", () => {
    getUserMock.mockReturnValue({ role: "user" as UserRole });

    const { container } = render(
      <AuthorizedComponent />
    );

    expect(container.innerHTML).toContain(`href="/unauthorized"`);
  });

  it("renders the component if user has the correct role", () => {
    getUserMock.mockReturnValue({ role: "admin" as UserRole });

    const { getByTestId } = render(
      <AuthorizedComponent />
    )
    
    expect(getByTestId("protected-content")).toBeInTheDocument();
  });
});