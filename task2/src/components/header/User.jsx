import React from "react";
import { RiImageAddLine } from "react-icons/ri";
import { BiLogOut } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export const User = () => {
  const { logout } = useAuth(); // Removed `currentUser` as it's not directly used here
  const navigate = useNavigate();

  // Handle Logout
  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login"); // Redirect to login page after logout
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  // Handle Add Blog Navigation
  const handleAddBlog = () => {
    navigate("/add");
  };

  return (
    <div className="profile">
      <div className="button-container">
        <button className="menu-item" onClick={handleAddBlog}>
          <RiImageAddLine className="menu-icon" />
          <span>Create Blog</span>
        </button>
        <button className="menu-item" onClick={handleLogout}>
          <BiLogOut className="menu-icon" />
          <span>Log Out</span>
        </button>
      </div>
    </div>
  );
};
