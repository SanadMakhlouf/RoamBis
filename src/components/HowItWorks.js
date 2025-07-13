import React from "react";
import "./styles/HowItWorks.css";

function HowItWorks() {
  const cardStyle = {
    background: "rgba(255, 255, 255, 0.15)",
    border: "2px solid rgba(255, 255, 255, 0.3)",
    color: "#ffffff",
    backdropFilter: "blur(5px)",
  };

  const numberStyle = {
    background: "#8b2fd8",
    color: "#ffffff",
  };

  const textStyle = {
    color: "#ffffff",
  };

  const iconStyle = {
    color: "#ffffff",
  };

  return (
    <section className="how-it-works">
      <div className="container">
        <h2 style={textStyle}>How It Works</h2>
        <p className="section-subtitle" style={textStyle}>
          Get connected in three simple steps
        </p>
        <div className="steps">
          <div className="step">
            <div className="step-number" style={numberStyle}>
              1
            </div>
            <div className="step-content" style={cardStyle}>
              <div className="step-icon" style={iconStyle}>
                <i className="fa-solid fa-mobile"></i>
              </div>
              <h3 style={textStyle}>Choose Your Plan</h3>
              <p style={textStyle}>
                Select the perfect data plan for your destination and travel
                duration.
              </p>
            </div>
          </div>

          <div className="step">
            <div className="step-number" style={numberStyle}>
              2
            </div>
            <div className="step-content" style={cardStyle}>
              <div className="step-icon" style={iconStyle}>
                <i className="fa-solid fa-qrcode"></i>
              </div>
              <h3 style={textStyle}>Scan Your QR Code</h3>
              <p style={textStyle}>
                Download your eSIM instantly by scanning the QR code we provide.
              </p>
            </div>
          </div>

          <div className="step">
            <div className="step-number" style={numberStyle}>
              3
            </div>
            <div className="step-content" style={cardStyle}>
              <div className="step-icon" style={iconStyle}>
                <i className="fa-solid fa-signal"></i>
              </div>
              <h3 style={textStyle}>Connect & Explore</h3>
              <p style={textStyle}>
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
