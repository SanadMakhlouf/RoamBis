import React, { useState, useEffect } from "react";
import "./styles/Referral.css";
import { API_URL } from "../config";

function Referral() {
  const [referralCode, setReferralCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  // Fonction pour récupérer le code de parrainage existant
  const fetchReferralCode = async () => {
    try {
      setLoading(true);
      setError(null);

      const token = localStorage.getItem("bearerToken"); // Récupérer le token d'authentification
      if (!token) {
        setError("You must be logged in to access your referral code");
        setLoading(false);
        return;
      }

      const response = await fetch(`${API_URL}/referral/code`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch referral code");
      }

      const data = await response.json();
      if (data.success && data.data.referral_code) {
        setReferralCode(data.data.referral_code);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Fonction pour générer un nouveau code de parrainage
  const generateNewCode = async () => {
    try {
      setLoading(true);
      setError(null);
      setSuccessMessage("");

      const token = localStorage.getItem("bearerToken");
      if (!token) {
        throw new Error("Authentication required");
      }

      const response = await fetch(`${API_URL}/referral/code/generate`, {
        method: "POST",
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to generate new referral code");
      }

      const data = await response.json();
      if (data.success && data.data.referral_code) {
        setReferralCode(data.data.referral_code);
        setSuccessMessage("New referral code generated successfully!");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Copier le code dans le presse-papiers
  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(referralCode)
      .then(() => {
        setSuccessMessage("Code copied to clipboard!");
        setTimeout(() => setSuccessMessage(""), 3000);
      })
      .catch(() => {
        setError("Failed to copy code");
        setTimeout(() => setError(null), 3000);
      });
  };

  // Charger le code de parrainage au chargement du composant
  useEffect(() => {
    fetchReferralCode();
  }, []);

  return (
    <div className="referral-container">
      <div className="referral-content">
        <h1>Your Referral Code</h1>
        <p className="referral-description">
          Share your referral code with friends and earn rewards when they sign
          up!
        </p>

        <div className="referral-code-section">
          <div className="code-display">
            <input
              type="text"
              value={referralCode}
              readOnly
              placeholder="Your referral code"
              className="code-input"
            />
            <button
              className="copy-button"
              onClick={copyToClipboard}
              disabled={!referralCode || loading}
            >
              <i className="fas fa-copy"></i>
            </button>
          </div>

          <button
            className="generate-button"
            onClick={generateNewCode}
            disabled={loading}
          >
            {loading ? "Generating..." : "Generate New Code"}
          </button>
        </div>

        {error && <div className="error-message">{error}</div>}
        {successMessage && (
          <div className="success-message">{successMessage}</div>
        )}

        <div className="referral-info">
          <h2>How it works</h2>
          <div className="info-steps">
            <div className="step">
              <div className="step-icon">
                <i className="fas fa-share-alt"></i>
              </div>
              <h3>Share</h3>
              <p>Share your unique referral code with friends</p>
            </div>
            <div className="step">
              <div className="step-icon">
                <i className="fas fa-user-plus"></i>
              </div>
              <h3>Invite</h3>
              <p>Friends sign up using your code</p>
            </div>
            <div className="step">
              <div className="step-icon">
                <i className="fas fa-gift"></i>
              </div>
              <h3>Earn</h3>
              <p>Get rewards for successful referrals</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Referral;
