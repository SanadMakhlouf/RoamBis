import React, { useState } from "react";
import "./styles/login.css";
import { Link, useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (error) setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Basic validation
    if (formData.password !== formData.password_confirmation) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:8000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST",
          "Access-Control-Allow-Headers": "Content-Type, Authorization",
        },
        credentials: "include",
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          password_confirmation: formData.password_confirmation,
        }),
      });

      const data = await response.json();
      console.log("Registration response:", data); // Add this to debug the response

      // Check if registration was successful based on the response data
      if (data.status === "success" || data.token) {
        if (data.token) {
          // Store the token in localStorage
          localStorage.setItem("token", data.token);
          // Store user data if needed
          if (data.user) {
            localStorage.setItem("user", JSON.stringify(data.user));
          }
          // Redirect to dashboard or home
          navigate("/");
        } else {
          // If registration is successful but no token is returned, redirect to login
          alert("Registration successful! Please login to continue.");
          navigate("/login");
        }
      } else {
        // If registration failed, throw an error with the message from the server
        throw new Error(
          data.message || "Registration failed. Please try again."
        );
      }
    } catch (err) {
      console.error("Registration error:", err);
      if (err.message.includes("Failed to fetch")) {
        setError(
          "Cannot connect to the server. Please check if the backend server is running."
        );
      } else {
        setError(err.message || "Failed to register. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div className="login-container">
      <div className="login-content">
        <div className="secure-badge">
          <i className="fas fa-shield-alt"></i>
          <span>Secure Registration</span>
        </div>
        <h1>Join</h1>
        <h1 className="gradient-text">ROAMbis</h1>
        <p>Create your account to access global connectivity</p>
        <p>and manage your eSIM plans from anywhere in the world.</p>
        <div className="login-list">
          <div className="login-list-item">
            <div className="list-item">
              <i className="fas fa-check"></i>
              <span>Instant access to global eSIM plans</span>
            </div>
            <div className="list-item">
              <i className="fas fa-check"></i>
              <span>Manage multiple devices</span>
            </div>
            <div className="list-item">
              <i className="fas fa-check"></i>
              <span>24/7 customer support</span>
            </div>
          </div>
        </div>
      </div>

      <div className="login-form">
        <h1>Sign Up</h1>
        <p>Create your ROAMbis account</p>
        {error && <div className="error-message">{error}</div>}
        <div className="form-container">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <div className="input-group">
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
                <i className="fas fa-user"></i>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <div className="input-group">
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                <i className="fas fa-envelope"></i>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <div className="input-group">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  placeholder="Create a password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <i
                  className={`fas ${showPassword ? "fa-eye-slash" : "fa-eye"}`}
                  onClick={togglePasswordVisibility}
                  style={{ cursor: "pointer" }}
                ></i>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="password_confirmation">Confirm Password</label>
              <div className="input-group">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="password_confirmation"
                  name="password_confirmation"
                  placeholder="Confirm your password"
                  value={formData.password_confirmation}
                  onChange={handleChange}
                  required
                />
                <i
                  className={`fas ${
                    showConfirmPassword ? "fa-eye-slash" : "fa-eye"
                  }`}
                  onClick={toggleConfirmPasswordVisibility}
                  style={{ cursor: "pointer" }}
                ></i>
              </div>
            </div>
            <button
              type="submit"
              className={`sign-in-button ${loading ? "loading" : ""}`}
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="spinner"></span>
                  Creating Account...
                </>
              ) : (
                <>
                  Sign Up <i className="fas fa-arrow-right"></i>
                </>
              )}
            </button>
            <div className="continue-with">
              <span>or sign up with</span>
            </div>
            <div className="social-login">
              <button type="button" className="google-btn">
                <i className="fab fa-google"></i>
                Google
              </button>
              <button type="button" className="apple-btn">
                <i className="fab fa-apple"></i>
                Apple
              </button>
            </div>
            <p className="signup-prompt">
              Already have an account? <Link to="/login">Sign in</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;
