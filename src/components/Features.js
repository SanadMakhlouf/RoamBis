import React from "react";
import "./styles/Features.css";

function Features() {
  return (
    <section className="why-choose">
      <div className="container">
        <h2>Why Choose RoamBis</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">
              <i className="fa-solid fa-bolt"></i>
            </div>
            <h3>Instant Activation</h3>
            <p>
              Get connected instantly without waiting for physical SIM cards or
              lengthy activation processes.
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <i className="fa-solid fa-globe"></i>
            </div>
            <h3>Global Coverage</h3>
            <p>
              Stay connected in over 200 countries and territories with our
              extensive network partnerships.
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <i className="fa-solid fa-shield"></i>
            </div>
            <h3>Secure Connection</h3>
            <p>
              Enjoy bank-level encryption and secure data transmission wherever
              you are in the world.
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <i className="fa-solid fa-sim-card"></i>
            </div>
            <h3>No Physical SIM</h3>
            <p>
              No more worrying about losing your SIM card or dealing with
              different carriers in each country.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Features;
