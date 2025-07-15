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
  faCopy,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { API_URL } from "../config";

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
  const [addingToCart, setAddingToCart] = useState(false);
  const [cartError, setCartError] = useState(null);

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
          `${API_URL}/plans/country/${countryCode}/`
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
    try {
      setAddingToCart(true);
      setCartError(null);

      // Check if user is logged in
      const token = localStorage.getItem("bearerToken");
      if (!token) {
        navigate("/login", { state: { from: `/plan/${planId}` } });
        return;
      }

      const response = await fetch(`${API_URL}/cart/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({
          plan_id: planId,
          quantity: quantity,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to add to cart");
      }

      const result = await response.json();
      if (result.status === "success") {
        navigate("/cart");
      }
    } catch (err) {
      console.error("Error adding to cart:", err);
      alert("Failed to add plan to cart. Please try again.");
    } finally {
      setAddingToCart(false);
    }
  };

  const handleBuyNow = async () => {
    if (!plan || !countryCode) return;

    try {
      // Check if user is authenticated
      const token = localStorage.getItem("bearerToken");

      if (!token) {
        // User is not logged in, redirect to login page
        alert(
          "Please log in to complete your purchase. You will be redirected back here after logging in."
        );
        // Save current path to redirect back after login
        localStorage.setItem("redirectAfterLogin", window.location.pathname);
        navigate("/login");
        return;
      }

      // First, fetch all countries and find the ID
      const countryResponse = await fetch(`${API_URL}/countries`, {
        headers: {
          Accept: "application/json",
          Authorization: token,
        },
      });

      if (!countryResponse.ok) {
        throw new Error(`Failed to fetch countries: ${countryResponse.status}`);
      }

      const responseData = await countryResponse.json();
      console.log("Countries API Response:", responseData);

      // Handle different response formats
      let countriesData = [];
      if (Array.isArray(responseData)) {
        countriesData = responseData;
      } else if (responseData.data && Array.isArray(responseData.data)) {
        countriesData = responseData.data;
      } else if (
        responseData.countries &&
        Array.isArray(responseData.countries)
      ) {
        countriesData = responseData.countries;
      } else {
        console.error("Unexpected countries response format:", responseData);
        throw new Error("Invalid countries data format received from server");
      }

      console.log("Looking for country code:", countryCode);
      
      // Find the country by code - try different matching strategies
      let country = null;
      
      // First try: exact match on code (case insensitive)
      country = countriesData.find(
        (c) => c.code?.toLowerCase() === countryCode.toLowerCase()
      );
      
      // Second try: match on iso2 if available
      if (!country) {
        country = countriesData.find(
          (c) => c.iso2?.toLowerCase() === countryCode.toLowerCase()
        );
      }
      
      // Third try: match on iso3 if available
      if (!country) {
        country = countriesData.find(
          (c) => c.iso3?.toLowerCase() === countryCode.toLowerCase()
        );
      }
      
      // Fourth try: if countryCode is 3 chars (ISO3) but countries use 2 chars (ISO2)
      if (!country && countryCode.length === 3) {
        // Try to find a country with matching name or partial code
        country = countriesData.find((c) => {
          // Check if the country name contains the country code (for common abbreviations)
          return c.name?.toLowerCase().includes(countryCode.toLowerCase());
        });
      }

      console.log("Found country:", country);

      if (!country || !country.id) {
        throw new Error(`Could not find country with code: ${countryCode}`);
      }

      // Prepare order data with the country ID
      const orderData = {
        plan_id: parseInt(plan.id),
        country_id: parseInt(country.id), // Use the numeric ID from filtered country
        payment: {
          method: "card",
        },
      };

      console.log("Sending order with data:", orderData);
      console.log("Using authorization token:", token);

      // Create the order
      const response = await fetch(`${API_URL}/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: token,
        },
        body: JSON.stringify(orderData),
      });

      // Log the response status and headers
      console.log("Response status:", response.status);
      console.log(
        "Response headers:",
        Object.fromEntries(response.headers.entries())
      );

      // Check if the response is JSON
      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        // If not JSON, get the text content for debugging
        const textContent = await response.text();
        console.error("Received non-JSON response:", textContent);
        throw new Error(
          `Server returned non-JSON response: ${response.status}`
        );
      }

      const result = await response.json();
      console.log("Order creation successful:", result);

      if (response.ok) {
        // Check if we have a checkout URL
        if (result.checkout_url) {
          // Store success redirect URL in localStorage with order ID
          localStorage.setItem(
            "paymentSuccessRedirect",
            `/thanks?order_id=${result.order.id}`
          );
          // Redirect to Stripe checkout
          window.location.href = result.checkout_url;
        } else if (result.order && result.order.id) {
          // Navigate to thank you page with order ID
          navigate(`/thanks?order_id=${result.order.id}`);
        } else {
          throw new Error("No checkout URL or order ID received");
        }
      } else {
        // Handle different types of errors
        if (response.status === 401) {
          // Token expired or invalid
          localStorage.removeItem("bearerToken");
          localStorage.removeItem("userId");
          localStorage.removeItem("userRole");
          localStorage.removeItem("userName");
          localStorage.removeItem("userEmail");
          alert("Your session has expired. Please login again.");
          localStorage.setItem("redirectAfterLogin", window.location.pathname);
          navigate("/login");
          return;
        }

        // For other error status codes, try to get error details from response
        throw new Error(
          result.message || `Failed to create order: ${response.status}`
        );
      }
    } catch (err) {
      console.error("Error processing purchase:", err);
      // Show more specific error message to user
      alert(err.message || "Failed to process purchase. Please try again.");
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
      <div className="order-steps">
        <div className="step active">
          <span className="step-check">✓</span>
          Choose Plan
        </div>
        <div className="step">2. Review Order</div>
        <div className="step">3. Confirm & Pay</div>
      </div>

      <div className="plan-details-main">
        <div className="shopping-cart-container">
          <h2>Shopping Cart</h2>

          <div className="cart-content">
            <div className="cart-details">
              <div className="esim-item">
                <div className="esim-header">
                  <FontAwesomeIcon icon={faGlobe} />
                  <span>Global eSIM</span>
                </div>

                <div className="esim-info">
                  <div className="info-row">
                    <span>Data Allowance</span>
                    <span>{plan.data}</span>
                  </div>
                  <div className="info-row">
                    <span>Validity</span>
                    <span>{plan.validity} Days</span>
                  </div>
                  <div className="info-row">
                    <span>Starting Date</span>
                    <span>
                      {startOption === "later" ? specificDate : "Immediate"}
                    </span>
                  </div>
                  <div className="info-row">
                    <span>Item Total</span>
                    <div className="price">
                      <span className="original-price">
                        ${(plan.price * 1.2).toFixed(2)}
                      </span>
                      <span className="final-price">
                        ${plan.price.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="cart-summary">
              <h3>Order Summary</h3>
              <div className="plan-summary-header">
                <img
                  src={`https://flagcdn.com/${plan.countryCode.toLowerCase()}.svg`}
                  alt={plan.country}
                  className="country-flag"
                />
                <div className="plan-summary-info">
                  <h4>{plan.country} eSIM</h4>
                  <span>{plan.name}</span>
                </div>
              </div>
              <div className="summary-row total">
                <span>Total (Taxes included)</span>
                <span>${plan.price.toFixed(2)}</span>
              </div>

              <button className="checkout-btn" onClick={handleBuyNow}>
                Proceed to Checkout
              </button>

              <div className="secure-checkout">
                <FontAwesomeIcon icon={faShieldAlt} />
                <span>SECURE CHECKOUT</span>

                <p>Your payment is encrypted and processed securely.</p>
              </div>

              <div className="trust-section">
                <div className="trustpilot">
                  <span>Excellent</span>
                  <div className="stars">★★★★★</div>
                  <img src="/trustpilot.png" alt="Trustpilot" />
                </div>
                <div className="terms">
                  <span>Our </span>
                  <a href="/terms">Terms of Service</a>
                  <span> and </span>
                  <a href="/privacy">Privacy Policy</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlanDetails;
