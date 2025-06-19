import React, { useState } from "react";
import "./styles/login.css";
import { Link } from "react-router-dom";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login attempt with:", formData);
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
                />
                <i className="fas fa-envelope"></i>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <div className="input-group">
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                />
                <i className="fas fa-eye"></i>
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
            <button type="submit" className="sign-in-button">
              Sign In <i className="fas fa-arrow-right"></i>
            </button>
            <div className="continue-with">
              <span>or continue with</span>
            </div>
            <div className="social-login">
              <button className="google-btn">
                <i className="fab fa-google"></i>
                Google
              </button>
              <button className="apple-btn">
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
