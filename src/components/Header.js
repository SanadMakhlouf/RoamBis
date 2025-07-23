import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./styles/Header.css";
import logo from "../assets/logo.png";

function Header() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  // Check if user is logged in
  const isLoggedIn = localStorage.getItem("bearerToken") !== null;
  const userName = localStorage.getItem("userName");

  const handleLogout = () => {
    // Clear all auth-related items
    localStorage.removeItem("bearerToken");
    localStorage.removeItem("userId");
    localStorage.removeItem("userRole");
    localStorage.removeItem("userName");
    localStorage.removeItem("userEmail");

    // Close the user menu
    setIsUserMenuOpen(false);

    // Navigate to home page
    navigate("/");
  };

  return (
    <header className="header">
      <div className="container">
        <div className="nav">
          <div className="logo">
            <Link to="/">
              <img src={logo} alt="RoamBis Logo" className="logo-image" />
            </Link>
          </div>

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
            <Link to="/blog" onClick={() => setIsMenuOpen(false)}>
              Blog
            </Link>
            <Link to="/faq" onClick={() => setIsMenuOpen(false)}>
              FAQ
            </Link>
            <Link to="/contact" onClick={() => setIsMenuOpen(false)}>
              Contact Us
            </Link>
            <Link to="/about" onClick={() => setIsMenuOpen(false)}>
              About Us
            </Link>
            <Link to="/policies" onClick={() => setIsMenuOpen(false)}>
              Legal
            </Link>
            <Link to="/referral" onClick={() => setIsMenuOpen(false)}>
              Referral
            </Link>
          </nav>

          {/* Header Actions - Always visible */}
          <div className="header-actions">
            {/* Google Translate Widget */}
            <div className="translate-wrapper">
              <button
                className="translate-button"
                onClick={() => {
                  const googleTranslateElement = document.getElementById(
                    "google_translate_element"
                  );
                  const select =
                    googleTranslateElement?.querySelector(".goog-te-combo");
                  if (select) {
                    select.focus();
                    const event = new MouseEvent("mousedown", {
                      view: window,
                      bubbles: true,
                      cancelable: true,
                    });
                    select.dispatchEvent(event);
                  }
                }}
              >
                <i className="fas fa-language"></i>
              </button>
              <div id="google_translate_element"></div>
            </div>

            {isLoggedIn ? (
              <div className="user-menu">
                <button
                  className="user-menu-button"
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                >
                  <i className="fas fa-user"></i>
                  <span className="user-name">{userName || "User"}</span>
                  <i
                    className={`fas fa-chevron-down ${
                      isUserMenuOpen ? "rotate" : ""
                    }`}
                  ></i>
                </button>
                {isUserMenuOpen && (
                  <div className="user-dropdown">
                    <Link
                      to="/profile"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      <i className="fas fa-user-circle"></i> Profile
                    </Link>
                    <Link
                      to="/profile"
                      onClick={() => {
                        setIsUserMenuOpen(false);
                        document
                          .querySelector('[data-section="orders"]')
                          ?.click();
                      }}
                    >
                      <i className="fas fa-shopping-bag"></i> My Orders
                    </Link>
                    <Link
                      to="/referral"
                      onClick={() => setIsUserMenuOpen(false)}
                      className="referral-link"
                    >
                      <i className="fas fa-user-plus"></i> Refer a Friend
                    </Link>
                    <button onClick={handleLogout} className="logout-btn">
                      <i className="fas fa-sign-out-alt"></i> Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login" className="login-btn">
                Log In
              </Link>
            )}

            {/* Mobile Menu Button - Moved to the end */}
            <button
              className={`hamburger ${isMenuOpen ? "active" : ""}`}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
