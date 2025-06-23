import React from "react";
import "./styles/Header.css";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="header">
      <div className="container">
        <div className="nav">
          <div className="logo">
            <Link to="/">
              <img src={logo} alt="ROAMbis Logo" className="logo-image" />
            </Link>
          </div>
          <nav className="nav-links">
            <a href="#how-it-works">How it Works</a>
            <Link to="/plans">Plans</Link>
            <Link to="/coverage">Coverage</Link>
            <a href="#support">Support</a>
          </nav>
          <div className="header-actions">
            <span className="language">EN</span>
            <Link to="/login" className="login-btn">
              Log In
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
