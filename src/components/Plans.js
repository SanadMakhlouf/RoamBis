import React from "react";
import "./styles/Plans.css";
import plansImage from "../assets/plans.png";

function Plans() {
  // Dummy data for plans
  const plans = [
    {
      id: 1,
      name: "Europe Premium",
      countries: "45+ Countries • Premium Networks",
      dataAmount: "10GB",
      validity: "30 Days Validity",
      features: [
        { icon: "wifi", text: "5G/4G High-Speed" },
        { icon: "shield", text: "Secure Connection" },
      ],
      price: 29.99,
      pricePerGB: "$3.00/GB",
      color: "#ad0fd8", // Purple color from the first card
      flagUrl: "https://flagsapi.com/BE/flat/64.png",
      tag: "Popular",
    },
    {
      id: 2,
      name: "Asia Explorer",
      countries: "30+ Countries • Premium Networks",
      dataAmount: "15GB",
      validity: "30 Days Validity",
      features: [
        { icon: "wifi", text: "5G/4G High-Speed" },
        { icon: "globe", text: "Multi-Country Coverage" },
      ],
      price: 34.99,
      pricePerGB: "$2.33/GB",
      color: "#ad0fd8",
      flagUrl:
        "https://flagsapi.com/BE/flat/64.png",
      tag: "Best Value",
    },
    {
      id: 3,
      name: "USA Unlimited",
      countries: "Nationwide • Premium Carriers",
      dataAmount: "20GB",
      validity: "30 Days Validity",
      features: [
        { icon: "bolt", text: "Ultra-Fast 5G" },
        { icon: "star", text: "Premium Networks" },
      ],
      price: 39.99,
      pricePerGB: "$2.00/GB",
      color: "#ad0fd8",
      flagUrl:
        "https://flagsapi.com/BE/flat/64.png",
      tag: "Premium",
    },
    {
      id: 4,
      name: "Global Nomad",
      countries: "200+ Countries • Worldwide",
      dataAmount: "50GB",
      validity: "30 Days Validity",
      features: [
        { icon: "globe", text: "Worldwide Coverage" },
        { icon: "headset", text: "VIP Support" },
      ],
      price: 79.99,
      pricePerGB: "$1.60/GB",
      color: "#ad0fd8",
      flagUrl:
        "https://flagsapi.com/BE/flat/64.png",
      tag: "Ultimate",
    },
  ];

  const franceFlagUrl = "https://flagsapi.com/FR/flat/64.png";

  return (
    <>
      <section className="plans-hero">
        <div className="plans-hero-container">
          <div className="plans-hero-content">
            <h1 className="plans-hero-title">
              France <span>eSIM Plans</span>
            </h1>
            <p className="plans-hero-subtitle">
              Enjoy fast and reliable internet in
              <span className="flag-icon">
                <img
                  src={franceFlagUrl}
                  alt="France Flag"
                  className="inline-flag"
                />
              </span>
              France, with no contracts and no roaming fees.
            </p>
            <div className="plans-hero-features">
              <div className="hero-feature">
                <span className="hero-feature-icon">∞</span>
                <span>Unlimited Plans</span>
              </div>
              <div className="hero-feature">
                <span className="hero-feature-icon">⚡</span>
                <span>Fast 5G Data</span>
              </div>
              <div className="hero-feature">
                <span className="hero-feature-icon">📱</span>
                <span>iPhone + Android</span>
              </div>
            </div>
          </div>
          <div className="plans-hero-image">
            <img src={plansImage} alt="eSIM Plans for France" />
          </div>
        </div>
        <div className="wave-divider"></div>
      </section>

      <section className="plans-section">
        <div className="plans-container">
          <div className="plans-header">
            <h1 className="plans-title">
              Global <span>eSIM Plans</span>
            </h1>
            <p className="plans-subtitle">
              Choose from our premium collection of data plans for every
              destination. Instant activation, premium networks, unbeatable
              prices.
            </p>
            <div className="plans-features">
              <div className="plan-feature">
                <span className="feature-icon"><i className="fa-solid fa-check"></i></span>
                <span>200+ Countries</span>
              </div>
              <div className="plan-feature">
                <span className="feature-icon"><i className="fa-solid fa-check"> </i> </span>
                <span>Instant Setup</span>
              </div>
              <div className="plan-feature">
                <span className="feature-icon"><i className="fa-solid fa-check"></i> </span>
                <span>Premium Networks</span>
              </div>
            </div>
          </div>

          <h2 className="featured-title">Featured eSIM Plans</h2>
          <p className="featured-subtitle">
            Premium data plans for your next adventure
          </p>

          <div className="plans-grid">
            {plans.map((plan) => (
              <div className="plan-card" key={plan.id}>
                <div
                  className="plan-tag"
                  style={{ backgroundColor: plan.color }}
                >
                  {plan.tag}
                </div>
                <div className="plan-flag">
                  <img
                    src={plan.flagUrl}
                    alt={`${plan.name} flag`}
                    className="flag-image"
                  />
                </div>
                <h3 className="plan-name">{plan.name}</h3>
                <p className="plan-countries">{plan.countries}</p>
                <div className="plan-data" style={{ color: plan.color }}>
                  {plan.dataAmount}
                </div>
                <p className="plan-validity">{plan.validity}</p>

                <div className="plan-features-list">
                  {plan.features.map((feature, index) => (
                    <div className="plan-feature-item" key={index}>
                      <span
                        className="feature-icon"
                        style={{ backgroundColor: `${plan.color}20` }}
                      >
                        {feature.icon === "wifi" && "📶"}
                        {feature.icon === "shield" && "🔒"}
                        {feature.icon === "globe" && "🌐"}
                        {feature.icon === "bolt" && "⚡"}
                        {feature.icon === "star" && "⭐"}
                        {feature.icon === "headset" && "🎧"}
                      </span>
                      <span className="feature-text">{feature.text}</span>
                    </div>
                  ))}
                </div>

                <div className="plan-pricing">
                  <div className="plan-price">${plan.price.toFixed(2)}</div>
                  <div className="plan-price-per-gb">{plan.pricePerGB}</div>
                </div>

                <button
                  className="plan-button"
                  style={{
                    backgroundColor: plan.color,
                    boxShadow: `0 8px 16px ${plan.color}40`,
                  }}
                >
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default Plans;
