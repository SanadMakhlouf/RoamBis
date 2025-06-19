import React from "react";
import "./styles/HowItWorks.css";

function HowItWorks() {
  return (
    <section className="how-it-works">
      <div className="container">
        <h2>How It Works</h2>
        <p className="section-subtitle">Get connected in three simple steps</p>
        <div className="steps">
          <div className="step">
            <div className="step-number">1</div>
            <div className="step-content">
              <div className="step-icon">📱</div>
              <h3>Choose Your Plan</h3>
              <p>
                Select the perfect data plan for your destination and travel
                duration.
              </p>
            </div>
          </div>
          <div className="step-connector"></div>
          <div className="step">
            <div className="step-number">2</div>
            <div className="step-content">
              <div className="step-icon">📲</div>
              <h3>Scan Your QR Code</h3>
              <p>
                Download your eSIM instantly by scanning the QR code we provide.
              </p>
            </div>
          </div>
          <div className="step-connector"></div>
          <div className="step">
            <div className="step-number">3</div>
            <div className="step-content">
              <div className="step-icon">🌍</div>
              <h3>Connect & Explore</h3>
              <p>
                Start using your data immediately and explore without limits.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;
