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
      flagUrl: "https://flagsapi.com/BE/flat/64.png",
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
      flagUrl: "https://flagsapi.com/BE/flat/64.png",
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
      flagUrl: "https://flagsapi.com/BE/flat/64.png",
      tag: "Ultimate",
    },
  ];

  const franceFlagUrl = "https://flagsapi.com/FR/flat/64.png";

  return (
    <>
      <section className="plans-hero">
        <div className="hero-background-pattern"></div>
        <div className="plans-hero-container">
          <div className="plans-hero-content">
            <div className="hero-badge">
              <i className="fa-solid fa-globe"></i>
              <span>International Coverage</span>
            </div>
            <h1 className="plans-hero-title">
              Connect in <span>France</span> with Premium eSIM Plans
            </h1>
            <p className="plans-hero-subtitle">
              Fast, reliable connectivity across
              <span className="flag-icon">
                <img
                  src={franceFlagUrl}
                  alt="France Flag"
                  className="inline-flag"
                />
              </span>
              France with no contracts, no roaming fees, and instant activation.
            </p>
            <div className="plans-hero-features">
              <div className="hero-feature">
                <span className="hero-feature-icon">
                  <i className="fa-solid fa-infinity"></i>
                </span>
                <div className="hero-feature-text">
                  <span className="hero-feature-title">Unlimited Plans</span>
                  <span className="hero-feature-desc">
                    No data caps or throttling
                  </span>
                </div>
              </div>
              <div className="hero-feature">
                <span className="hero-feature-icon">
                  <i className="fa-solid fa-bolt"></i>
                </span>
                <div className="hero-feature-text">
                  <span className="hero-feature-title">Ultra-Fast 5G</span>
                  <span className="hero-feature-desc">
                    Premium network speeds
                  </span>
                </div>
              </div>
              <div className="hero-feature">
                <span className="hero-feature-icon">
                  <i className="fa-solid fa-mobile"></i>
                </span>
                <div className="hero-feature-text">
                  <span className="hero-feature-title">Device Compatible</span>
                  <span className="hero-feature-desc">
                    Works with iPhone & Android
                  </span>
                </div>
              </div>
            </div>
            <div className="hero-cta">
              <button className="hero-button">View Plans</button>
              <button className="hero-button-outline">How It Works</button>
            </div>
          </div>
          <div className="plans-hero-image">
            <div className="image-overlay-circle"></div>
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
                <span className="feature-icon">
                  <i className="fa-solid fa-check"></i>
                </span>
                <span>200+ Countries</span>
              </div>
              <div className="plan-feature">
                <span className="feature-icon">
                  <i className="fa-solid fa-check"> </i>{" "}
                </span>
                <span>Instant Setup</span>
              </div>
              <div className="plan-feature">
                <span className="feature-icon">
                  <i className="fa-solid fa-check"></i>{" "}
                </span>
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
