import React from "react";
import { Link } from "react-router-dom";
import "./styles/Hero.css";
import heroImage from "../assets/Flyers-Artboard-4-removebg-preview.png";

function Hero() {
  return (
    <section className="hero">
      <div className="container">
        <div className="hero-content">
          <div className="hero-text">
            <h1>
              Stay <br />
              <span className="highlight">Connected</span>
              <br />
              Anywhere
            </h1>
            <p>
              Experience the freedom to stay online globally
              <br />
              with data plans that work seamlessly across
              <br />
              devices, countries, and networks.
            </p>
            <div className="hero-buttons">
              <Link to="/countries" className="btn-primary">
                Get Started
                <i className="fa-solid fa-arrow-right"></i>
              </Link>
              <Link to="/coverage" className="btn-secondary">
                See Coverage
              </Link>
            </div>
            <div className="hero-stats">
              <span>
                {" "}
                <i className="fa-solid fa-globe"></i>190+ Countries
              </span>
              <span>
                {" "}
                <i className="fa-solid fa-bolt"></i> Instant Setup
              </span>
              <span>
                {" "}
                <i className="fa-solid fa-shield-halved"></i> Ultra Secure
              </span>
            </div>
          </div>
          <div className="hero-phone">
            <img
              src={heroImage}
              alt="RoamBis eSIM and App"
              className="hero-image"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
