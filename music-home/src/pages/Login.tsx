import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { login } from "../auth";
import './Login.css';

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    const token = login(username, password);
    if (token) navigate("/");
    else alert("Invalid credentials");
  };

  return (
    <div className="mh-container">
      <h2>Login</h2>
      <input onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
      <input type="password" onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
      <button onClick={handleLogin} data-testid="login-button">Login</button>
    </div>
  );
}
