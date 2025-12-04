import React from "react";
import axiosInstance from "../api/axiosInstance";
import apiConfig from "../config/apiconfig";
import { removeToken } from "../utils/token";
import { useNavigate } from "react-router-dom";

const LogoutButton = () => {

    const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axiosInstance.post(apiConfig.AUTH.LOGOUT);

      removeToken();
    // window.location.href = "/login";
     navigate("/");
    } catch (err) {
      console.log("Logout failed:", err);
    }
  };

  return (
    <button
      onClick={handleLogout}
      style={{
        padding: "10px 20px",
        background: "#e74c3c",
        color: "white",
        border: "none",
        borderRadius: "6px",
        cursor: "pointer",
      }}
    >
      Logout
    </button>
  );
};

export default LogoutButton;
