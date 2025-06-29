import React, { useState } from "react";
import "./styles/Header.css";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  // Check if user is logged in
  const isLoggedIn = localStorage.getItem("token") !== null;
  const userData = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.reload();
  };

  return (
    <header className="header">
      <div className="container">
        <div className="nav">
          <div className="logo">
            <Link to="/">
              <img src={logo} alt="ROAMbis Logo" className="logo-image" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className={`hamburger ${isMenuOpen ? "active" : ""}`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

          {/* Navigation Links - Will be hidden on mobile unless menu is open */}
          <nav className={`nav-links ${isMenuOpen ? "active" : ""}`}>
            <Link to="/how-it-works" onClick={() => setIsMenuOpen(false)}>
              How it Works
            </Link>
            <Link to="/Countries" onClick={() => setIsMenuOpen(false)}>
              Countries
            </Link>
            <Link to="/coverage" onClick={() => setIsMenuOpen(false)}>
              Coverage
            </Link>
            <a href="#support" onClick={() => setIsMenuOpen(false)}>
              Support
            </a>
          </nav>

          <div className={`header-actions ${isMenuOpen ? "active" : ""}`}>
            <span className="language">EN</span>
            {isLoggedIn ? (
              <div className="user-menu">
                <button
                  className="user-menu-button"
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                >
                  <i className="fas fa-user"></i>
                  {userData?.name || "User"}
                  <i
                    className={`fas fa-chevron-down ${
                      isUserMenuOpen ? "rotate" : ""
                    }`}
                  ></i>
                </button>
                {isUserMenuOpen && (
                  <div className="user-dropdown">
                    <Link to="/profile">Profile</Link>
                    <Link to="/orders">My Orders</Link>
                    <Link to="/settings">Settings</Link>
                    <button onClick={handleLogout}>Logout</button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="login-btn"
                onClick={() => setIsMenuOpen(false)}
              >
                Log In
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
