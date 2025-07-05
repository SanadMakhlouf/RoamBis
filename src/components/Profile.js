import React, { useState } from "react";
import "./styles/Profile.css";

// Mock data for user profile
const mockUserData = {
  name: "John Doe",
  email: "john.doe@example.com",
  phone: "+1 234 567 8900",
  location: "New York, USA",
  profilePicture: "https://via.placeholder.com/150",
};

// Mock data for orders
const mockOrders = [
  {
    id: "ORD001",
    date: "2024-03-15",
    destination: "France",
    plan: "Europe Travel eSIM",
    status: "Active",
    amount: "$29.99",
  },
  {
    id: "ORD002",
    date: "2024-02-28",
    destination: "Spain",
    plan: "Premium Data Pack",
    status: "Completed",
    amount: "$39.99",
  },
  {
    id: "ORD003",
    date: "2024-01-15",
    destination: "Italy",
    plan: "Europe Unlimited",
    status: "Expired",
    amount: "$49.99",
  },
];

// Mock data for payment methods
const mockPaymentMethods = [
  {
    id: "PAY001",
    type: "Credit Card",
    last4: "4242",
    expiryDate: "12/25",
    isDefault: true,
  },
  {
    id: "PAY002",
    type: "PayPal",
    email: "john.doe@example.com",
    isDefault: false,
  },
];

const Profile = () => {
  const [activeSection, setActiveSection] = useState("personal");

  const renderContent = () => {
    switch (activeSection) {
      case "personal":
        return (
          <div className="profile-section user-info">
            <h2>Personal Information</h2>
            <div className="user-info-content">
              <img
                src={mockUserData.profilePicture}
                alt="Profile"
                className="profile-picture"
              />
              <div className="user-details">
                <p>
                  <strong>Name:</strong> {mockUserData.name}
                </p>
                <p>
                  <strong>Email:</strong> {mockUserData.email}
                </p>
                <p>
                  <strong>Phone:</strong> {mockUserData.phone}
                </p>
                <p>
                  <strong>Location:</strong> {mockUserData.location}
                </p>
              </div>
            </div>
          </div>
        );
      case "orders":
        return (
          <div className="profile-section orders">
            <h2>My Orders</h2>
            <div className="orders-list">
              {mockOrders.map((order) => (
                <div key={order.id} className="order-card">
                  <div className="order-header">
                    <span className="order-id">Order #{order.id}</span>
                    <span
                      className={`order-status ${order.status.toLowerCase()}`}
                    >
                      {order.status}
                    </span>
                  </div>
                  <div className="order-details">
                    <p>
                      <strong>Date:</strong> {order.date}
                    </p>
                    <p>
                      <strong>Destination:</strong> {order.destination}
                    </p>
                    <p>
                      <strong>Plan:</strong> {order.plan}
                    </p>
                    <p>
                      <strong>Amount:</strong> {order.amount}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case "payments":
        return (
          <div className="profile-section payment-methods">
            <h2>Payment Methods</h2>
            <div className="payment-methods-list">
              {mockPaymentMethods.map((payment) => (
                <div key={payment.id} className="payment-card">
                  <div className="payment-type">
                    {payment.type}
                    {payment.isDefault && (
                      <span className="default-badge">Default</span>
                    )}
                  </div>
                  <div className="payment-details">
                    {payment.type === "Credit Card" ? (
                      <>
                        <p>**** **** **** {payment.last4}</p>
                        <p>Expires: {payment.expiryDate}</p>
                      </>
                    ) : (
                      <p>{payment.email}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-sidebar">
        <div className="sidebar-header">
          <img
            src={mockUserData.profilePicture}
            alt="Profile"
            className="sidebar-profile-picture"
          />
          <h3>{mockUserData.name}</h3>
        </div>
        <nav className="sidebar-nav">
          <button
            className={`nav-item ${
              activeSection === "personal" ? "active" : ""
            }`}
            onClick={() => setActiveSection("personal")}
          >
            Personal Information
          </button>
          <button
            className={`nav-item ${activeSection === "orders" ? "active" : ""}`}
            onClick={() => setActiveSection("orders")}
          >
            My Orders
          </button>
          <button
            className={`nav-item ${
              activeSection === "payments" ? "active" : ""
            }`}
            onClick={() => setActiveSection("payments")}
          >
            Payment Methods
          </button>
        </nav>
      </div>
      <div className="profile-content">{renderContent()}</div>
    </div>
  );
};

export default Profile;
