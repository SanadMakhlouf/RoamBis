import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import "./styles/PlanDetails.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faWifi,
  faGlobe,
  faMobileAlt,
  faShieldAlt,
  faBolt,
  faClock,
  faCalendarAlt,
  faShoppingCart,
  faCreditCard,
  faCheck,
  faMinus,
  faPlus,
  faList,
} from "@fortawesome/free-solid-svg-icons";

const PlanDetails = () => {
  const { planId, countryCode } = useParams();
  const navigate = useNavigate();
  const [plan, setPlan] = useState(null);
  const [allPlans, setAllPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [startOption, setStartOption] = useState("now"); // "now" or "later"
  const [specificDate, setSpecificDate] = useState("");
  const [countryName, setCountryName] = useState("");

  // Helper function to get flag URL
  const getFlagUrl = (code) => {
    try {
      // Validate country code format (2 letters)
      if (!code || typeof code !== "string" || code.length !== 2) {
        return null;
      }

      // Convert to uppercase and ensure only letters
      const cleanCode = code.toUpperCase().replace(/[^A-Z]/g, "");
      if (cleanCode.length !== 2) {
        return null;
      }

      // Using the flagsapi.com service
      return `https://flagsapi.com/${cleanCode}/flat/64.png`;
    } catch (err) {
      console.error("Error generating flag URL:", err);
      return null;
    }
  };

  // Helper function to get price from prices object
  const getPlanPrice = (prices) => {
    if (!prices) return 0;
    // Get the first price value from the prices object
    return Object.values(prices)[0] || 0;
  };

  // Format plan data
  const formatPlanData = (rawPlan, countryData) => {
    return {
      id: rawPlan.id?.toString() || rawPlan.plan_id?.toString(), // Convert ID to string
      name: rawPlan.name || "Plan",
      regions: rawPlan.description || "Global Coverage",
      price: getPlanPrice(rawPlan.prices),
      pricePerGB: rawPlan.data_amount
        ? getPlanPrice(rawPlan.prices) / rawPlan.data_amount
        : 0,
      data: rawPlan.data_amount ? `${rawPlan.data_amount}GB` : "Unlimited",
      validity: rawPlan.validity_days?.toString() || "30",
      features: [
        { icon: faWifi, text: "5G/4G High-Speed Data" },
        { icon: faShieldAlt, text: "Secure Connection" },
        {
          icon: faGlobe,
          text: rawPlan.coverage_description || "Global Coverage",
        },
        { icon: faBolt, text: "Instant Activation" },
        { icon: faMobileAlt, text: "Dual SIM Support" },
        { icon: faClock, text: "24/7 Support" },
      ],
      coverage: rawPlan.countries || [],
      totalCountries: rawPlan.countries?.length || 45,
      countryCode: countryCode,
      countryName: countryData.name,
      rawPlan: rawPlan, // Store the original plan data
    };
  };

  // Fetch plan details
  useEffect(() => {
    const fetchPlanDetails = async () => {
      try {
        if (!countryCode || !planId) {
          throw new Error("Missing country code or plan ID");
        }

        setLoading(true);
        setError(null);

        // Fetch plans for the specific country
        const response = await fetch(
          `http://127.0.0.1:8000/api/plans/country/${countryCode}/`
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch plans: ${response.status}`);
        }

        const data = await response.json();

        if (!data || !data.status || data.status !== "success") {
          throw new Error("Invalid response format from server");
        }

        if (
          !data.country ||
          !data.country.plans ||
          !Array.isArray(data.country.plans)
        ) {
          throw new Error("No plans available for this country");
        }

        setCountryName(data.country.name);

        // Store all plans
        const formattedPlans = data.country.plans.map((p) =>
          formatPlanData(p, data.country)
        );
        setAllPlans(formattedPlans);

        // Find the specific plan - compare as strings to handle both number and string IDs
        const selectedPlan = formattedPlans.find(
          (p) =>
            p.id === planId.toString() ||
            p.rawPlan.id?.toString() === planId.toString() ||
            p.rawPlan.plan_id?.toString() === planId.toString()
        );

        if (!selectedPlan) {
          console.log(
            "Available plans:",
            formattedPlans.map((p) => ({
              id: p.id,
              plan_id: p.rawPlan.plan_id,
            }))
          );
          console.log("Looking for plan ID:", planId);
          throw new Error(
            `Plan ${planId} not found for country ${countryCode}`
          );
        }

        setPlan(selectedPlan);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching plan details:", err);
        setError(err.message || "Failed to load plan details");
        setLoading(false);
      }
    };

    fetchPlanDetails();
  }, [countryCode, planId]);

  const handlePlanSelect = (newPlanId) => {
    navigate(`/plan-details/${countryCode}/${newPlanId}`);
  };

  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = async () => {
    if (!plan || !countryCode) return;

    try {
      // You can add your cart API endpoint here
      const cartData = {
        plan_id: plan.id,
        country_code: countryCode,
        quantity: quantity,
        start_option: startOption,
        start_date: startOption === "later" ? specificDate : null,
        total_price: (plan.price * quantity).toFixed(2),
      };

      console.log("Adding to cart:", cartData);

      // Example API call (uncomment and modify when you have the cart API endpoint)
      /*
      const response = await fetch('http://127.0.0.1:8000/api/cart/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(cartData)
      });

      if (!response.ok) {
        throw new Error('Failed to add to cart');
      }

      const result = await response.json();
      if (result.status === 'success') {
        navigate('/cart');
      }
      */

      // For now, just show an alert
      alert(
        `Added ${quantity} ${plan.name} plan(s) to cart for ${plan.countryName}!`
      );
    } catch (err) {
      console.error("Error adding to cart:", err);
      alert("Failed to add plan to cart. Please try again.");
    }
  };

  const handleBuyNow = async () => {
    if (!plan || !countryCode) return;

    try {
      // You can add your purchase API endpoint here
      const purchaseData = {
        plan_id: plan.id,
        country_code: countryCode,
        quantity: quantity,
        start_option: startOption,
        start_date: startOption === "later" ? specificDate : null,
        total_price: (plan.price * quantity).toFixed(2),
      };

      console.log("Processing purchase:", purchaseData);

      // Example API call (uncomment and modify when you have the purchase API endpoint)
      /*
      const response = await fetch('http://127.0.0.1:8000/api/purchase/direct', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(purchaseData)
      });

      if (!response.ok) {
        throw new Error('Failed to process purchase');
      }

      const result = await response.json();
      if (result.status === 'success') {
        navigate('/checkout/confirmation');
      }
      */

      // For now, just show an alert
      alert(
        `Processing purchase for ${quantity} ${plan.name} plan(s) for ${plan.countryName}!`
      );
      navigate("/checkout");
    } catch (err) {
      console.error("Error processing purchase:", err);
      alert("Failed to process purchase. Please try again.");
    }
  };

  if (loading) return <div className="loading">Loading plan details...</div>;
  if (error)
    return (
      <div className="error-container">
        <div className="error-message">
          <FontAwesomeIcon icon={faGlobe} className="error-icon" />
          <h2>Error Loading Plan</h2>
          <p>{error}</p>
          <button
            onClick={() => navigate(`/plans/${countryCode}`)}
            className="back-button"
          >
            Back to Plans
          </button>
        </div>
      </div>
    );
  if (!plan) return null;

  const flagUrl = getFlagUrl(plan.countryCode);

  return (
    <div className="plan-details-page">
      {/* Plans Sidebar */}
      <div className="plans-sidebar">
        <div className="sidebar-title">
          <FontAwesomeIcon icon={faList} />
          {flagUrl && (
            <img
              src={flagUrl}
              alt={`${countryName} flag`}
              className="country-flag"
              onError={(e) => {
                e.target.style.display = "none";
              }}
            />
          )}
          {countryName} Plans
        </div>
        {allPlans.map((p) => (
          <div
            key={p.id}
            className={`sidebar-plan-card ${p.id === plan.id ? "active" : ""}`}
            onClick={() => handlePlanSelect(p.id)}
          >
            <div className="sidebar-plan-name">{p.name}</div>
            <div className="sidebar-plan-data">{p.data}</div>
            <div className="sidebar-plan-price">
              ${p.price} - {p.validity} Days
            </div>
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="plan-details-main">
        <div className="plan-details-container">
          <div className="plan-details-header">
            <div className="plan-title">
              {flagUrl && (
                <img
                  src={flagUrl}
                  alt={`${plan.countryName} flag`}
                  className="country-flag"
                  onError={(e) => {
                    e.target.style.display = "none";
                    console.warn(
                      `Failed to load flag for country: ${plan.countryCode}`
                    );
                  }}
                />
              )}
              <h1>{plan.name}</h1>
            </div>
            <p className="plan-subtitle">{plan.regions}</p>
          </div>

          <div className="plan-info-section">
            <div className="plan-flag">
              <div className="plan-title">
                <h1>{plan.name}</h1>
                <p>{plan.regions}</p>
              </div>
            </div>

            <div className="plan-highlights">
              <div className="highlight-box">
                <h2>{plan.data}</h2>
                <p>High-Speed Data</p>
              </div>
              <div className="highlight-box">
                <h2>{plan.validity}</h2>
                <p>Days Validity</p>
              </div>
            </div>

            <div className="plan-features">
              <h3>What's Included</h3>
              <div className="features-grid">
                {plan.features.map((feature, index) => (
                  <div className="feature-item" key={index}>
                    <FontAwesomeIcon icon={feature.icon} />
                    <span>{feature.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="plan-purchase-section">
            <div className="plan-price">
              <h2>${plan.price.toFixed(2)}</h2>
              <p>One-time payment • ${plan.pricePerGB.toFixed(2)} per GB</p>
            </div>

            <div className="start-date-section">
              <h3>Select Start Date</h3>
              <div className="start-options">
                <div
                  className={`start-option ${
                    startOption === "now" ? "selected" : ""
                  }`}
                  onClick={() => setStartOption("now")}
                >
                  <FontAwesomeIcon icon={faBolt} />
                  <h4>Start Now</h4>
                  <p>Immediate activation</p>
                </div>
                <div
                  className={`start-option ${
                    startOption === "later" ? "selected" : ""
                  }`}
                  onClick={() => setStartOption("later")}
                >
                  <FontAwesomeIcon icon={faCalendarAlt} />
                  <h4>Start Later</h4>
                  <p>Choose specific date</p>
                </div>
              </div>
              {startOption === "later" && (
                <div className="date-picker">
                  <input
                    type="date"
                    value={specificDate}
                    onChange={(e) => setSpecificDate(e.target.value)}
                    min={new Date().toISOString().split("T")[0]}
                  />
                </div>
              )}
            </div>

            <div className="quantity-section">
              <h3>Quantity</h3>
              <div className="quantity-selector">
                <button
                  className="quantity-btn"
                  onClick={() => handleQuantityChange(-1)}
                  disabled={quantity <= 1}
                >
                  <FontAwesomeIcon icon={faMinus} />
                </button>
                <span className="quantity-value">{quantity}</span>
                <button
                  className="quantity-btn"
                  onClick={() => handleQuantityChange(1)}
                >
                  <FontAwesomeIcon icon={faPlus} />
                </button>
              </div>
            </div>

            <div className="total-section">
              <span>Total:</span>
              <span className="total-price">
                ${(plan.price * quantity).toFixed(2)}
              </span>
            </div>

            <div className="action-buttons">
              <button className="add-to-cart-btn" onClick={handleAddToCart}>
                <FontAwesomeIcon icon={faShoppingCart} /> Add to Cart
              </button>
              <button className="buy-now-btn" onClick={handleBuyNow}>
                <FontAwesomeIcon icon={faCreditCard} /> Buy Now
              </button>
            </div>

            <div className="trust-section">
              <p>Trusted by 500,000+ travelers</p>
              <div className="ratings">
                <div className="stars">★★★★★</div>
                <span>4.9/5 (12,000+ reviews)</span>
              </div>
              <div className="trust-features">
                <div className="trust-feature">
                  <FontAwesomeIcon icon={faShieldAlt} /> Secure Payment
                </div>
                <div className="trust-feature">
                  <FontAwesomeIcon icon={faCheck} /> 30-Day Refund
                </div>
              </div>
            </div>
          </div>

          <div className="coverage-section">
            <h2>Coverage Areas</h2>
            <div className="coverage-grid">
              {plan.coverage.map((country, index) => (
                <div className="country-item" key={index}>
                  <FontAwesomeIcon icon={faCheck} /> {country}
                </div>
              ))}
            </div>
            <button className="view-all-btn">
              View all {plan.totalCountries}+ countries →
            </button>
          </div>

          <div className="how-it-works-section">
            <h2>How It Works</h2>
            <div className="steps-container">
              <div className="step-item">
                <div className="step-icon purchase-icon">
                  <FontAwesomeIcon icon={faCreditCard} />
                </div>
                <h3>1. Purchase Plan</h3>
                <p>Complete your purchase and receive instant confirmation</p>
              </div>
              <div className="step-item">
                <div className="step-icon scan-icon">
                  <FontAwesomeIcon icon={faMobileAlt} />
                </div>
                <h3>2. Scan QR Code</h3>
                <p>Use your phone to scan the QR code we send you</p>
              </div>
              <div className="step-item">
                <div className="step-icon connect-icon">
                  <FontAwesomeIcon icon={faWifi} />
                </div>
                <h3>3. Connect Instantly</h3>
                <p>Start using high-speed data immediately</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlanDetails;
