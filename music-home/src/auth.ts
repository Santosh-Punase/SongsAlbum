import { User } from "./types/User";

const users: { [user: string]: User } = {
  admin: { username: 'admin', role: "admin", password: 'admin123' },
  user: { username: 'user', role: "user", password: 'user123' }
}

export function login(username: string, password: string) {
  if (users[username] && users[username].password === password) {
    const token = btoa(JSON.stringify(users[username]));
    localStorage.setItem("token", token);
    localStorage.setItem("userRole", users[username].role);
    return token;
  }
  return null;
}

export function getUser(): User | null {
  const token = localStorage.getItem("token");
  return token ? JSON.parse(atob(token)) : null;
}

export function logout() {
  localStorage.removeItem("token");
}