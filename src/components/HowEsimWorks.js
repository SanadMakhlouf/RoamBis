import React from "react";
import "./styles/HowEsimWorks.css";
import logo from "../assets/logo.png";

const HowEsimWorks = () => {
  return (
    <>
      <section className="esim-hero-section">
        <div className="esim-hero-container">
          <div className="esim-hero-content">
            <h1>
              Stay
              <span className="esim-highlight">Connected</span>
              <br />
              Anywhere
            </h1>
            <p className="esim-hero-subtitle">
              Experience the freedom to stay online globally with data plans
              that work seamlessly across devices, countries, and networks.
            </p>
            <div className="esim-hero-buttons">
              <button className="esim-get-started">Get Started</button>
              <button className="esim-see-action">See It In Action</button>
            </div>
            <div className="esim-hero-stats">
              <div className="esim-stat-item">
                <span className="esim-stat-icon">🌍</span>
                <span className="esim-stat-value">200+</span>
                <span className="esim-stat-label">Countries</span>
              </div>
              <div className="esim-stat-item">
                <span className="esim-stat-icon">⚡</span>
                <span className="esim-stat-value">Instant</span>
                <span className="esim-stat-label">Activation</span>
              </div>
              <div className="esim-stat-item">
                <span className="esim-stat-icon">📱</span>
                <span className="esim-stat-value">Ultra</span>
                <span className="esim-stat-label">Compatible</span>
              </div>
            </div>
          </div>
          <div className="esim-hero-image">
            <img src={logo} alt="RoamBis Mobile App" />
          </div>
        </div>
      </section>

      <section className="esim-intro-section">
        <div className="esim-intro-container">
          <div className="esim-intro-content">
            <h2>
              It all starts
              <br />
              with RoamBis
            </h2>
            <p>
              Experience seamless connectivity worldwide with our advanced eSIM
              technology. No physical SIM needed, just instant activation and
              reliable coverage everywhere you go.
            </p>
          </div>
          <div className="esim-intro-image">
            <img src={logo} alt="RoamBis Logo" className="esim-brand-logo" />
          </div>
        </div>
      </section>

      <section className="esim-features-section">
        <div className="container">
          <div className="esim-section-header">
            <h2>
              Fast. Flexible. <span>The Future.</span>
            </h2>
            <p>
              Our eSIM technology revolutionizes how you stay connected
              worldwide. No physical SIM needed, just instant activation and
              seamless connectivity.
            </p>
          </div>

          <div className="esim-features-grid">
            <div className="esim-feature-card">
              <div className="esim-feature-icon">
                <i className="fa-solid fa-bolt"></i>
              </div>
              <h3>Instant Activation</h3>
              <p>
                Compatible with all unlocked iPhone and Android devices with
                built-in eSIM. Activate your plan instantly over the air.
              </p>
            </div>

            <div className="esim-feature-card">
              <div className="esim-feature-icon">
                <i className="fa-solid fa-sim-card"></i>
              </div>
              <h3>No Physical SIM</h3>
              <p>
                Your eSIM works like a virtual SIM card, downloading all
                necessary data directly to your device without any physical
                installation.
              </p>
            </div>

            <div className="esim-feature-card">
              <div className="esim-feature-icon">
                <i className="fa-solid fa-layer-group"></i>
              </div>
              <h3>Multiple Plans</h3>
              <p>
                Keep your existing plan and add our eSIM as a secondary
                connection. Switch between plans effortlessly as needed.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="esim-steps-section">
        <div className="container">
          <h2>Getting Started Is Easy</h2>
          <div className="esim-steps-grid">
            <div className="esim-step-card">
              <div className="esim-step-number">1</div>
              <div className="esim-step-icon">
                <i className="fa-solid fa-mobile"></i>
              </div>
              <h3>Choose Your Plan</h3>
              <p>
                Select from our range of flexible data plans tailored to your
                destination and needs.
              </p>
            
            </div>

            <div className="esim-step-card">
              <div className="esim-step-number">2</div>
              <div className="esim-step-icon">
                <i className="fa-solid fa-qrcode"></i>
              </div>
              <h3>Scan QR Code</h3>
              <p>
                Use your smartphone to scan the QR code we'll send to your email
                instantly.
              </p>
             
            </div>

            <div className="esim-step-card">
              <div className="esim-step-number">3</div>
              <div className="esim-step-icon">
                <i className="fa-solid fa-signal"></i>
              </div>
              <h3>Connect & Go</h3>
              <p>
                Follow the simple prompts on your device and get connected to
                our global network.
              </p>
              
            </div>
          </div>
        </div>
      </section>

      <section className="esim-cta-section">
        <div className="container">
          <div className="esim-cta-content">
            <h2>Ready to Get Started?</h2>
            <p>
              Join millions of satisfied travelers using our eSIM technology.
              Activate your plan in minutes and stay connected worldwide.
            </p>
            <button className="esim-cta-button">Get Your eSIM Now</button>
          </div>
        </div>
      </section>
    </>
  );
};

export default HowEsimWorks;
