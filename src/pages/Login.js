import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import apiConfig from "../config/apiconfig";
import { setToken } from "../utils/token";

export default function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // const handleLogin = async (e) => {
  //   e.preventDefault();
  //   setError("");

  //   try {
  //     const res = await fetch("http://localhost:3002/auth/login", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({ username, password }),
  //       credentials: "include",
  //     });

  //     const data = await res.json();

  //     if (!res.ok) {
  //       setError(data.message || "Login failed");
  //       return;
  //     }

  //     // Save access token
  //     localStorage.setItem("accessToken", data.accessToken);

  //     // redirect to Sudoku dashboard
  //   //   window.location.href = "/sudoku";
  //   navigate("/sudoku");
  //   } catch (err) {
  //     setError("Something went wrong"+err);
  //   }
  // };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axiosInstance.post(
        apiConfig.AUTH.LOGIN,
        { username, password },
        { withCredentials: true }
      );

      // access token returned from backend
      const accessToken = res.data.accessToken;

      // store in localStorage using helper
      setToken(accessToken);

      // redirect
      navigate("/sudoku");
    } catch (error) {
      const msg =
        error.response?.data?.message || error.message || "Login failed";

      setError(msg);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-center mb-6">Login</h2>

        {error && <p className="text-red-600 text-center mb-4">{error}</p>}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">Username</label>
            <input
              type="text"
              className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300 outline-none"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300 outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>

        <p className="text-center mt-4 text-gray-600">
          Don't have an account?{" "}
          <a href="/register" className="text-blue-600 hover:underline">
            Register
          </a>
        </p>
      </div>
    </div>
  );
}
