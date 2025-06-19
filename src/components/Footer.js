import React from "react";
import "./styles/Footer.css";
import logo from "../assets/logo.png";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
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
                <a href="/about">About Us</a>
              </li>
              <li>
                <a href="/careers">Careers</a>
              </li>
              <li>
                <a href="/press">Press</a>
              </li>
              <li>
                <a href="/blog">Blog</a>
              </li>
            </ul>
          </div>

          <div className="footer-links">
            <h4>Support</h4>
            <ul>
              <li>
                <a href="/help">Help Center</a>
              </li>
              <li>
                <a href="/contact">Contact Us</a>
              </li>
              <li>
                <a href="/compatibility">Device Compatibility</a>
              </li>
              <li>
                <a href="/coverage">Coverage Map</a>
              </li>
            </ul>
          </div>

          <div className="footer-links">
            <h4>Resources</h4>
            <ul>
              <li>
                <a href="/guides">Travel Guides</a>
              </li>
              <li>
                <a href="/setup">eSIM Setup Guide</a>
              </li>
              <li>
                <a href="/tips">Data Usage Tips</a>
              </li>
              <li>
                <a href="/alternatives">Roaming Alternatives</a>
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
