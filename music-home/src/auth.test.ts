import { login, getUser, logout } from "./auth";

const mockUsers = {
  admin: { username: 'admin', password: "admin123", role: "admin" },
  user: { username: 'user', password: "user123", role: "user" },
};

// Mock localStorage
beforeEach(() => {
  localStorage.clear();
});

describe("Auth Functions", () => {
  test("login() should return a token for valid credentials", () => {
    const token = login("admin", "admin123");

    expect(token).not.toBeNull();
    expect(localStorage.getItem("token")).toBe(token);
    expect(localStorage.getItem("userRole")).toBe("admin");
  });

  test("login() should return null for invalid credentials", () => {
    const token = login("admin", "wrongpassword");

    expect(token).toBeNull();
    expect(localStorage.getItem("token")).toBeNull();
  });

  test("getUser() should return user object if a token exists", () => {
    const token = btoa(JSON.stringify(mockUsers.admin));
    localStorage.setItem("token", token);

    const user = getUser();

    expect(user).toEqual(mockUsers.admin);
  });

  test("getUser() should return null if no token exists", () => {
    const user = getUser();
    expect(user).toBeNull();
  });

  test("logout() should remove the token from localStorage", () => {
    localStorage.setItem("token", "someToken");

    logout();

    expect(localStorage.getItem("token")).toBeNull();
  });
});
