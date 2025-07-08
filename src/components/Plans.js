import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./styles/Plans.css";
import plansImage from "../assets/plans.png";

function Plans() {
  const { countryCode } = useParams();
  const navigate = useNavigate();
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [countryInfo, setCountryInfo] = useState(null);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const plansPerPage = 9; // Show 9 plans per page

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

  // Flag error handler
  const handleFlagError = (e) => {
    e.target.style.display = "none";
  };

  useEffect(() => {
    const fetchCountryAndPlans = async () => {
      try {
        setLoading(true);
        // Fetch country info and plans if countryCode is provided
        if (countryCode) {
          const response = await fetch(
            `http://127.0.0.1:8000/api/plans/country/${countryCode}/`
          );
          if (!response.ok) {
            throw new Error("Failed to fetch country information");
          }
          const data = await response.json();
          if (data.status === "success" && data.country) {
            setCountryInfo(data.country);
            setPlans(data.country.plans || []);
          } else {
            throw new Error("Invalid data format received from server");
          }
        } else {
          // Fetch all plans if no country code
          const plansResponse = await fetch("http://127.0.0.1:8000/api/plans");
          if (!plansResponse.ok) {
            throw new Error("Failed to fetch plans");
          }
          const plansData = await plansResponse.json();
          const plansArray = Array.isArray(plansData)
            ? plansData
            : plansData.data || [];
          setPlans(plansArray);
        }
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchCountryAndPlans();
  }, [countryCode]);

  // Helper function to get price from prices object
  const getPlanPrice = (prices) => {
    if (!prices) return 0;
    // Get the first price value from the prices object
    return Object.values(prices)[0] || 0;
  };

  // Get current plans for pagination
  const indexOfLastPlan = currentPage * plansPerPage;
  const indexOfFirstPlan = indexOfLastPlan - plansPerPage;
  const currentPlans = plans.slice(indexOfFirstPlan, indexOfLastPlan);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Generate pagination buttons
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(plans.length / plansPerPage); i++) {
    pageNumbers.push(i);
  }

  // Handle plan selection
  const handlePlanSelect = (planId) => {
    navigate(`/plan-details/${countryCode}/${planId}`);
  };

  if (loading) return <div className="loading">Loading plans...</div>;
  if (error) return <div className="error">{error}</div>;

  const flagUrl = countryInfo ? getFlagUrl(countryInfo.code) : null;

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
              Connect in{" "}
              <span>{countryInfo ? countryInfo.name : "Worldwide"}</span> with
              Premium eSIM Plans
            </h1>
            <p className="plans-hero-subtitle">
              Fast, reliable connectivity across{" "}
              {countryInfo && countryCode && (
                <span className="flag-icon">
                  <img
                    src={getFlagUrl(countryCode)}
                    alt={`${countryInfo.name} flag`}
                    className="country-flag-img"
                    onError={handleFlagError}
                  />
                </span>
              )}{" "}
              {countryInfo ? countryInfo.name : "the world"} with no contracts,
              no roaming fees, and instant activation.
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
            <img
              src={plansImage}
              alt={`eSIM Plans for ${
                countryInfo ? countryInfo.name : "Global"
              }`}
            />
          </div>
        </div>
        <div className="wave-divider"></div>
      </section>

      <section className="plans-section">
        <div className="plans-container">
          <div className="plans-header">
            <h1 className="plans-title">
              {flagUrl && (
                <img
                  src={flagUrl}
                  alt={`${countryInfo.name} flag`}
                  className="title-flag-img"
                  onError={handleFlagError}
                />
              )}{" "}
              {countryInfo ? countryInfo.name : "Global"}{" "}
              <span>eSIM Plans</span>
            </h1>
            <p className="plans-subtitle">
              Choose from our premium collection of data plans for{" "}
              {countryInfo ? countryInfo.name : "every destination"}. Instant
              activation, premium networks, unbeatable prices.
            </p>
            <div className="plans-features">
              <div className="plan-feature">
                <span className="feature-icon">
                  <i className="fa-solid fa-check"></i>
                </span>
                <span>Premium Networks</span>
              </div>
              <div className="plan-feature">
                <span className="feature-icon">
                  <i className="fa-solid fa-check"></i>
                </span>
                <span>Instant Setup</span>
              </div>
              <div className="plan-feature">
                <span className="feature-icon">
                  <i className="fa-solid fa-check"></i>
                </span>
                <span>24/7 Support</span>
              </div>
            </div>
          </div>

          <h2 className="featured-title">Available eSIM Plans</h2>
          <p className="featured-subtitle">
            Premium data plans for your next adventure
          </p>

          <div className="plans-grid">
            {currentPlans && currentPlans.length > 0 ? (
              currentPlans.map((plan) => (
                <div className="plan-card" key={plan.id}>
                  {plan.is_featured && (
                    <div
                      className="plan-tag"
                      style={{ backgroundColor: "#ad0fd8" }}
                    >
                      Featured
                    </div>
                  )}
                  {flagUrl && (
                    <div className="plan-flag">
                      <img
                        src={flagUrl}
                        alt={`${countryInfo.name} flag`}
                        className="plan-flag-img"
                        onError={handleFlagError}
                      />
                    </div>
                  )}
                  <h3 className="plan-name">{plan.name}</h3>
                  <p className="plan-countries">{plan.description}</p>
                  <div className="plan-data" style={{ color: "#ad0fd8" }}>
                    {plan.data_amount ? `${plan.data_amount}GB` : "Unlimited"}
                  </div>
                  <p className="plan-validity">
                    {plan.validity_days} Days Validity
                  </p>

                  <div className="plan-features-list">
                    <div className="plan-feature-item">
                      <span
                        className="feature-icon"
                        style={{ backgroundColor: "#ad0fd820" }}
                      >
                        📶
                      </span>
                      <span className="feature-text">5G/4G High-Speed</span>
                    </div>
                    <div className="plan-feature-item">
                      <span
                        className="feature-icon"
                        style={{ backgroundColor: "#ad0fd820" }}
                      >
                        🔒
                      </span>
                      <span className="feature-text">Secure Connection</span>
                    </div>
                  </div>

                  <div className="plan-pricing">
                    <div className="plan-price">
                      ${getPlanPrice(plan.prices).toFixed(2)}
                    </div>
                    {plan.data_amount && (
                      <div className="plan-price-per-gb">
                        $
                        {(getPlanPrice(plan.prices) / plan.data_amount).toFixed(
                          2
                        )}
                        /GB
                      </div>
                    )}
                  </div>

                  <button
                    className="plan-button"
                    style={{
                      backgroundColor: "#ad0fd8",
                      boxShadow: "0 8px 16px #ad0fd840",
                    }}
                    onClick={() => handlePlanSelect(plan.id)}
                  >
                    Buy Now
                  </button>
                </div>
              
              ))
            ) : (
              <div className="no-plans">
                No plans available for this destination
              </div>
            )}
          </div>

          {/* Pagination */}
          {plans.length > plansPerPage && (
            <div className="pagination">
              <button
                className="pagination-button"
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
              >
                <i className="fa-solid fa-chevron-left"></i>
              </button>
              {pageNumbers.map((number) => (
                <button
                  key={number}
                  className={`pagination-button ${
                    currentPage === number ? "active" : ""
                  }`}
                  onClick={() => paginate(number)}
                >
                  {number}
                </button>
              ))}
              <button
                className="pagination-button"
                onClick={() => paginate(currentPage + 1)}
                disabled={
                  currentPage === Math.ceil(plans.length / plansPerPage)
                }
              >
                <i className="fa-solid fa-chevron-right"></i>
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default Plans;
