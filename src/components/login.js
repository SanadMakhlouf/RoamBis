import React, { useState } from "react";
import "./styles/login.css";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

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

    try {
      const response = await fetch("http://127.0.0.1:8000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      // Check if response is JSON
      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error(
          "Server error - Expected JSON response but got HTML. Please check if the API server is running correctly."
        );
      }

      const responseData = await response.json();
      console.log("Login response:", responseData);

      if (!response.ok) {
        throw new Error(
          responseData.message || "Login failed. Please try again."
        );
      }

      // Check if we have a token in the response
      if (responseData.token) {
        // Store only the bearer token format for API calls
        localStorage.setItem("bearerToken", `Bearer ${responseData.token}`);

        // Store user data
        if (responseData.user) {
          // Store individual user fields for easier access
          localStorage.setItem("userId", responseData.user.id);
          localStorage.setItem("userRole", responseData.user.role);
          localStorage.setItem("userName", responseData.user.name);
          localStorage.setItem("userEmail", responseData.user.email);
        }

        console.log("Stored user data:", {
          user: responseData.user,
        });

        // Check if there's a redirect URL stored
        const redirectUrl = localStorage.getItem("redirectAfterLogin");
        if (redirectUrl) {
          // Clear the stored redirect URL
          localStorage.removeItem("redirectAfterLogin");
          // Redirect to the stored URL
          navigate(redirectUrl);
        } else {
          // If no redirect URL, go to home
          navigate("/");
        }
      } else {
        // If no token in response
        throw new Error("Login failed - no token received");
      }
    } catch (err) {
      console.error("Login error:", err);
      if (err.message.includes("Failed to fetch")) {
        setError(
          "Cannot connect to the server. Please check if the backend server is running."
        );
      } else {
        setError(err.message || "Failed to login. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="login-container">
      <div className="login-content">
        <div className="secure-badge">
          <i className="fas fa-shield-alt"></i>
          <span>Secure Access</span>
        </div>
        <h1>Welcome Back to</h1>
        <h1 className="gradient-text">ROAMbis</h1>
        <p>Access your global connectivity dashboard and</p>
        <p>manage your eSIM plans from anywhere in the world.</p>
        <div className="login-list">
          <div className="login-list-item">
            <div className="list-item">
              <i className="fas fa-check"></i>
              <span>Secure encrypted connection</span>
            </div>
            <div className="list-item">
              <i className="fas fa-check"></i>
              <span>24/7 account protection</span>
            </div>
            <div className="list-item">
              <i className="fas fa-check"></i>
              <span>Multi-device synchronization</span>
            </div>
          </div>
        </div>
      </div>

      <div className="login-form">
        <h1>Sign In</h1>
        <p>Access your ROAMbis account</p>
        {error && <div className="error-message">{error}</div>}
        <div className="form-container">
          <form onSubmit={handleSubmit}>
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
                  placeholder="Enter your password"
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
            <div className="form-options">
              <div className="remember-me">
                <input type="checkbox" id="remember" />
                <label htmlFor="remember">Remember me</label>
              </div>
              <Link to="/forgot-password" className="forgot-password">
                Forgot password?
              </Link>
            </div>
            <button
              type="submit"
              className={`sign-in-button ${loading ? "loading" : ""}`}
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="spinner"></span>
                  Signing in...
                </>
              ) : (
                <>
                  Sign In <i className="fas fa-arrow-right"></i>
                </>
              )}
            </button>
            <div className="continue-with">
              <span>or continue with</span>
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
              Don't have an account? <Link to="/signup">Sign up now</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
