import React from "react";
import { Link } from "react-router-dom";
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
        <Link to="/countries" className="btn-cta">
          Discover all Countries
        </Link>
      </div>
    </section>
  );
}

export default CTA;
