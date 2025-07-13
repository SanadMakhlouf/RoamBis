import React from "react";
import { Link } from "react-router-dom";
import "./styles/Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About Us</Link>
            </li>
            <li>
              <Link to="/coverage">Coverage</Link>
            </li>
            <li>
              <Link to="/plans">Plans</Link>
            </li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Support</h3>
          <ul>
            <li>
              <Link to="/faq">FAQ</Link>
            </li>
            <li>
              <Link to="/contact">Contact Us</Link>
            </li>
            <li>
              <Link to="/policies">Privacy Policy</Link>
            </li>
            <li>
              <Link to="/policies">Terms & Conditions</Link>
            </li>
            <li>
              <Link to="/policies">Cookie Policy</Link>
            </li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Contact</h3>
          <ul>
            <li>14 Albert Road</li>
            <li>Belvedere, London</li>
            <li>DA17 5LJ</li>
            <li>Email: support@roambis.com</li>
            <li>WhatsApp: +44 7956 649223</li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Follow Us</h3>
          <div className="social-links">
            <a
              href="https://www.facebook.com/profile.php?id=61573623737810"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-facebook"></i>
            </a>
            <a
              href="https://www.instagram.com/roambis_mobile"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-instagram"></i>
            </a>
            <a
              href="https://www.tiktok.com/@roambis_mobile"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-tiktok"></i>
            </a>
            <a
              href="https://x.com/roambis_mobile"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-x-twitter"></i>
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2024 Roambis Mobile. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
