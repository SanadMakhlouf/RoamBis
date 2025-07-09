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
            <div className="footer-contact">
              <p>
                <i className="fas fa-location-dot"></i> 14 Albert Road,
                Belvedere, London. DA17 5LJ
              </p>
              <p>
                <i className="fas fa-envelope"></i> support@roambis.com
              </p>
              <p>
                <i className="fab fa-whatsapp"></i> +44 7956 649223
              </p>
            </div>
          </div>

          <div className="footer-links">
            <h4>Quick Links</h4>
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
                <Link to="/contact">Contact</Link>
              </li>
            </ul>
          </div>

          <div className="footer-links">
            <h4>Support</h4>
            <ul>
              <li>
                <Link to="/faq">FAQs</Link>
              </li>
              <li>
                <Link to="/contact">Contact Us</Link>
              </li>
              <li>
                <a
                  href="https://wa.me/447956649223"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  WhatsApp Support
                </a>
              </li>
            </ul>
          </div>

          <div className="footer-links">
            <h4>Follow Us</h4>
            <ul>
              <li>
                <a
                  href="https://uk.trustpilot.com/review/roambis.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fas fa-star"></i> Trustpilot
                </a>
              </li>
              <li>
                <a
                  href="https://www.facebook.com/profile.php?id=61573623737810"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fab fa-facebook"></i> Facebook
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/roambis_mobile"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fab fa-instagram"></i> Instagram
                </a>
              </li>
              <li>
                <a
                  href="https://www.tiktok.com/@roambis_mobile"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fab fa-tiktok"></i> TikTok
                </a>
              </li>
              <li>
                <a
                  href="https://x.com/roambis_mobile"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fab fa-x-twitter"></i> X
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} ROAMbis. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
