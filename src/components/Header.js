import React from "react";
import "./styles/Header.css";
import logo from "../assets/logo.png";

function Header() {
  return (
    <header className="header">
      <div className="container">
        <div className="nav">
          <div className="logo">
            <img src={logo} alt="ROAMbis Logo" className="logo-image" />
          </div>
          <nav className="nav-links">
            <a href="#how-it-works">How it Works</a>
            <a href="#plans">Plans</a>
            <a href="#coverage">Coverage</a>
            <a href="#support">Support</a>
          </nav>
          <div className="header-actions">
            <span className="language">EN</span>
            <button className="login-btn">Log In</button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
