import React from "react";
import "./styles/CTA.css";

function CTA() {
  return (
    <section className="cta">
      <div className="container">
        <h2>Ready to explore the world with seamless data?</h2>
        <p>
          Join thousands of happy travelers who stay connected with RoamBis
          without worrying about expensive roaming charges or unreliable
          connections.
        </p>
        <button className="btn-cta">Discover all Countries</button>
      </div>
    </section>
  );
}

export default CTA;
