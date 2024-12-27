import React from "react";
import { useAuth } from "../../context/AuthContext"; // Import useAuth
import logo from "../../assets/images/logo.svg";
import "./header.css";
import { User } from "./User";
import { nav } from "../../assets/data/data";
import { Link } from "react-router-dom";


export const Header = () => {
  return (
    <header className="header">
      <div className="scontainer flex">
        <div className="logo">
          
        </div>
        <nav>
          <ul>
            {nav.map((link) => (
              <li key={link.id}>
                <Link to={link.url}>{link.text}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="account flexCenter">
          <User />
        </div>
      </div>
    </header>
  );
};
