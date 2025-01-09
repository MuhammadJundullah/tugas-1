import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (username === "ahmad" && password === "123") {
      // Simpan status login ke localStorage
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("username", username);
      navigate("/");
      window.location.reload();
    } else {
      alert("Invalid username or password");
    }
  };

  return (
    <div className="bg-gray-100">
      <div>
        <p>username: ahmad</p>
        <p>password: 123</p>
      </div>
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-white p-8 rounded-lg shadow-lg w-96">
          <h2 className="text-2xl mb-4 text-center">Login</h2>
          <input
            type="text"
            placeholder="Username"
            className="w-full p-2 mb-4 border border-gray-300 rounded"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-2 mb-4 border border-gray-300 rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            onClick={handleLogin}
            className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-700">
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
