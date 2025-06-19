import React from "react";
import "./styles/Pricing.css";

function Pricing() {
  const plans = [
    {
      name: "Europe+",
      description:
        "Perfect for European travelers seeking reliable connectivity",
      price: 15,
      countries: "+10",
      features: [
        "Wi-Fi Hotspot Enabled",
        "Instant Digital eSIM Delivery",
        "4G/5G Network Coverage",
        "Optional Auto-Renew",
        "24/7 Customer Support",
      ],
    },
    {
      name: "Middle East",
      description: "Ideal for business and leisure travel in the Middle East",
      price: 35,
      countries: "+10",
      features: [
        "Wi-Fi Hotspot Enabled",
        "Instant Digital eSIM Delivery",
        "4G/5G Network Coverage",
        "Optional Auto-Renew",
        "24/7 Customer Support",
      ],
    },
    {
      name: "Global",
      description: "Our most comprehensive plan for worldwide travelers",
      price: 65,
      countries: 119,
      isPopular: true,
      features: [
        "Wi-Fi Hotspot Enabled",
        "Instant Digital eSIM Delivery",
        "4G/5G Network Coverage",
        "Optional Auto-Renew",
        "Priority 24/7 Support",
      ],
    },
  ];

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
              key={index}
            >
              {plan.isPopular && (
                <div className="popular-tag">Most Popular</div>
              )}
              <h3>{plan.name}</h3>
              <p className="plan-description">{plan.description}</p>
              <div className="coverage">
                <span className="countries-count">{plan.countries}</span>
                <span className="countries-text">Countries</span>
              </div>
              <div className="price">
                <span className="currency">US</span>
                <span className="amount">${plan.price}</span>
                <span className="period">/month</span>
              </div>
              <ul className="features-list">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex}>
                    <div className="feature-icon" >
                      <i className="fa-solid fa-check"></i>
                    </div>
                    <span>{feature}</span>
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
