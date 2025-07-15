import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./styles/Pricing.css";
import { API_URL } from "../config";

function Pricing() {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPlans = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${API_URL}/plans`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch plans");
        }

        const result = await response.json();
        console.log("API Response for plans:", result);

        // Sélectionner 3 plans au hasard
        const allPlans = result.data;
        const shuffled = [...allPlans].sort(() => 0.5 - Math.random());
        const selectedPlans = shuffled.slice(0, 3).map((plan, index) => ({
          ...plan,
          isPopular: index === 1, // Le deuxième plan sera marqué comme populaire
        }));

        setPlans(selectedPlans);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching plans:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPlans();
  }, []);

  if (loading) {
    return (
      <section className="pricing">
        <div className="container">
          <div className="loading">Loading plans...</div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="pricing">
        <div className="container">
          <div className="error-message">{error}</div>
        </div>
      </section>
    );
  }

  return (
    <section className="pricing">
      <div className="container">
        <p className="section-note">
          Choose the data plan that matches your travel needs and budget
        </p>
        <div className="pricing-cards">
          {plans.map((plan, index) => (
            <div
              className={`pricing-card ${plan.isPopular ? "popular" : ""}`}
              key={plan.id || index}
            >
              {plan.isPopular && (
                <div className="popular-tag">Most Popular</div>
              )}
              <h3>{plan.name || "Plan"}</h3>
              <p className="plan-description">{plan.description || "eSIM data plan"}</p>
              <div className="coverage">
                <span className="countries-count">
                  {plan.countries_count || "10+"}
                </span>
                <span className="countries-text">Countries</span>
              </div>
              <div className="price">
                <span className="currency">US</span>
                <span className="amount">${plan.price || "0"}</span>
                <span className="period">/month</span>
              </div>
              <ul className="features-list">
                {(
                  plan.features || [
                    "Wi-Fi Hotspot Enabled",
                    "Instant Digital eSIM Delivery",
                    "4G/5G Network Coverage",
                    "Optional Auto-Renew",
                    "24/7 Customer Support",
                  ]
                ).filter(feature => feature !== null).map((feature, featureIndex) => (
                  <li key={featureIndex}>
                    <div className="feature-icon">
                      <i className="fa-solid fa-check"></i>
                    </div>
                    <span>
                      {typeof feature === "object" && feature !== null ? feature.name || "Feature" : feature}
                    </span>
                  </li>
                ))}
              </ul>
              <button className="btn-outline">Get Started</button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Pricing;
