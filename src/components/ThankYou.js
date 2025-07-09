import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faHome,
  faList,
} from "@fortawesome/free-solid-svg-icons";
import "./styles/ThankYou.css";

const ThankYou = () => {
  return (
    <div className="thank-you-container">
      <div className="thank-you-card">
        <div className="success-icon">
          <FontAwesomeIcon icon={faCheckCircle} className="check-icon" />
        </div>

        <h1>Thank You for Your Purchase!</h1>
        <p>Your order has been successfully processed.</p>
        <p>
          You will receive a confirmation email shortly with your eSIM details.
        </p>

        <div className="order-info">
          <h3>What's Next?</h3>
          <ul>
            <li>Check your email for eSIM installation instructions</li>
            <li>Download your eSIM profile</li>
            <li>Activate your plan when you're ready to use it</li>
          </ul>
        </div>

        <div className="support-info">
          <p>Need help? Our support team is available 24/7</p>
          <p>Email: support@example.com</p>
        </div>

        <div className="action-buttons">
          <Link to="/" className="button home-button">
            <FontAwesomeIcon icon={faHome} /> Back to Home
          </Link>
          <Link to="/profile" className="button orders-button">
            <FontAwesomeIcon icon={faList} /> View Orders
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ThankYou;
