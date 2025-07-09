import React from "react";
import { Link } from "react-router-dom";
import "./styles/Footer.css";
import logo from "../assets/logo.png";

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <img src={logo} alt="ROAMbis" className="footer-logo" />
            <p className="footer-description">
              Stay connected anywhere in the world with our reliable eSIM
              technology and global data plans.
            </p>
          </div>

          <div className="footer-links">
            <h4>Company</h4>
            <ul>
              <li>
                <Link to="/about">About Us</Link>
              </li>
              <li>
                <Link to="/how-it-works">How It Works</Link>
              </li>
              <li>
                <Link to="/coverage">Coverage</Link>
              </li>
              <li>
                <Link to="/contact">Contact</Link>
              </li>
            </ul>
          </div>

          <div className="footer-links">
            <h4>Support</h4>
            <ul>
              <li>
                <Link to="/help">Help Center</Link>
              </li>
              <li>
                <Link to="/faq">FAQs</Link>
              </li>
              <li>
                <Link to="/contact">Contact Us</Link>
              </li>
              <li>
                <Link to="/coverage">Coverage Map</Link>
              </li>
            </ul>
          </div>

          <div className="footer-links">
            <h4>Resources</h4>
            <ul>
              <li>
                <Link to="/guides">Travel Guides</Link>
              </li>
              <li>
                <Link to="/setup">eSIM Setup Guide</Link>
              </li>
              <li>
                <Link to="/tips">Data Usage Tips</Link>
              </li>
              <li>
                <Link to="/alternatives">Roaming Alternatives</Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2024 ROAMbis. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
