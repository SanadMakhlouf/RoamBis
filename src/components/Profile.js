import React, { useState, useEffect } from "react";
import "./styles/Profile.css";
import { API_URL } from "../config";

const Profile = () => {
  const [activeSection, setActiveSection] = useState("personal");
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 6; // Show 6 orders per page (3 rows of 2)

  // Add password update state
  const [passwordData, setPasswordData] = useState({
    current_password: "",
    password: "",
    password_confirmation: "",
  });
  const [passwordUpdateLoading, setPasswordUpdateLoading] = useState(false);
  const [passwordUpdateError, setPasswordUpdateError] = useState(null);
  const [passwordUpdateSuccess, setPasswordUpdateSuccess] = useState(false);

  // Add state for personal info
  const [personalInfo, setPersonalInfo] = useState({
    name: localStorage.getItem("userName") || "",
    email: localStorage.getItem("userEmail") || "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);
  const [saveError, setSaveError] = useState(null);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPersonalInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle password input changes
  const handlePasswordInputChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle password update submission
  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    setPasswordUpdateLoading(true);
    setPasswordUpdateError(null);

    if (passwordData.password !== passwordData.password_confirmation) {
      setPasswordUpdateError("New passwords don't match");
      setPasswordUpdateLoading(false);
      return;
    }

    try {
      const token = localStorage.getItem("bearerToken");
      if (!token) {
        throw new Error("No authentication token found");
      }

      const response = await fetch(`${API_URL}/profile/password`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({
          current_password: passwordData.current_password,
          password: passwordData.password,
          password_confirmation: passwordData.password_confirmation,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update password");
      }

      setPasswordUpdateSuccess(true);
      setPasswordData({
        current_password: "",
        password: "",
        password_confirmation: "",
      });
    } catch (err) {
      setPasswordUpdateError(err.message);
    } finally {
      setPasswordUpdateLoading(false);
    }
  };

  // Handle save personal info
  const handleSavePersonalInfo = async () => {
    try {
      setSaveLoading(true);
      setSaveError(null);
      const token = localStorage.getItem("bearerToken");

      if (!token) {
        throw new Error("No authentication token found");
      }

      const response = await fetch(`${API_URL}/profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({
          name: personalInfo.name,
          email: personalInfo.email,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update profile");
      }

      // Update localStorage
      localStorage.setItem("userName", personalInfo.name);
      localStorage.setItem("userEmail", personalInfo.email);

      setIsEditing(false);
    } catch (err) {
      setSaveError(err.message);
    } finally {
      setSaveLoading(false);
    }
  };

  // Fetch orders from API
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        setError(null);
        const token = localStorage.getItem("bearerToken");

        if (!token) {
          throw new Error("No authentication token found");
        }

        const response = await fetch(`${API_URL}/orders?page=${currentPage}`, {
          headers: {
            Accept: "application/json",
            Authorization: token,
          },
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch orders: ${response.status}`);
        }

        const result = await response.json();
        setOrders(result.data || []);
      } catch (err) {
        console.error("Error fetching orders:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (activeSection === "orders") {
      fetchOrders();
    }
  }, [activeSection, currentPage]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getStatusClass = (status) => {
    switch (status.toLowerCase()) {
      case "completed":
        return "completed";
      case "pending":
        return "pending";
      case "active":
        return "active";
      case "expired":
        return "expired";
      default:
        return "";
    }
  };

  const renderPagination = (totalPages) => {
    return (
      <div className="pagination">
        <button
          className="pagination-btn"
          onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
          disabled={currentPage === 1}
        >
          <i className="fas fa-chevron-left"></i> Previous
        </button>
        <span className="page-info">
          Page {currentPage} of {totalPages}
        </span>
        <button
          className="pagination-btn"
          onClick={() => setCurrentPage((prev) => prev + 1)}
          disabled={currentPage === totalPages}
        >
          Next <i className="fas fa-chevron-right"></i>
        </button>
      </div>
    );
  };

  const renderContent = () => {
    switch (activeSection) {
      case "personal":
        return (
          <div className="profile-section user-info">
            <div className="section-header">
              <h2>Personal Information</h2>
              {!isEditing && (
                <button className="edit-btn" onClick={() => setIsEditing(true)}>
                  Edit Profile
                </button>
              )}
            </div>
            <div className="user-info-content">
              <div className="user-details">
                <div className="input-group">
                  <label>Name:</label>
                  <input
                    type="text"
                    name="name"
                    value={personalInfo.name}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    placeholder="Enter your name"
                  />
                </div>
                <div className="input-group">
                  <label>Email:</label>
                  <input
                    type="email"
                    name="email"
                    value={personalInfo.email}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    placeholder="Enter your email"
                  />
                </div>
                {isEditing && (
                  <div className="button-group">
                    <button
                      className="cancel-btn"
                      onClick={() => {
                        setIsEditing(false);
                        setPersonalInfo({
                          name: localStorage.getItem("userName") || "",
                          email: localStorage.getItem("userEmail") || "",
                        });
                      }}
                    >
                      Cancel
                    </button>
                    <button
                      className="save-btn"
                      onClick={handleSavePersonalInfo}
                      disabled={saveLoading}
                    >
                      {saveLoading ? "Saving..." : "Save Changes"}
                    </button>
                  </div>
                )}
                {saveError && (
                  <div className="error-message">
                    Failed to save changes: {saveError}
                  </div>
                )}
              </div>
            </div>
          </div>
        );

      case "orders":
        if (loading) {
          return <div className="loading">Loading orders...</div>;
        }

        if (error) {
          return <div className="error-message">{error}</div>;
        }

        return (
          <div className="profile-section orders">
            <h2>My Orders</h2>
            {orders.length === 0 ? (
              <p>No orders found.</p>
            ) : (
              <>
                <div className="orders-grid">
                  {orders.map((order) => (
                    <div key={order.id} className="order-card">
                      <div className="order-header">
                        <span className="order-id">Order #{order.id}</span>
                        <span
                          className={`order-status ${getStatusClass(
                            order.status
                          )}`}
                        >
                          {order.status}
                        </span>
                      </div>
                      <div className="order-details">
                        <p>
                          <strong>Date:</strong> {formatDate(order.created_at)}
                        </p>
                        <p>
                          <strong>Destination:</strong> {order.country.name}
                        </p>
                        <p>
                          <strong>Plan:</strong> {order.plan.name}
                        </p>
                        <p>
                          <strong>Amount:</strong> ${order.price}
                        </p>
                        <p>
                          <strong>Data:</strong> {order.plan.data_amount}GB
                        </p>
                        <p>
                          <strong>Validity:</strong> {order.plan.validity_days}{" "}
                          Days
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                {renderPagination(Math.ceil(orders.length / ordersPerPage))}
              </>
            )}
          </div>
        );

      case "payments":
        return (
          <div className="profile-section payment-methods">
            <h2>Payment Methods</h2>
            <p>Payment methods management coming soon.</p>
          </div>
        );

      case "password":
        return (
          <div className="profile-section password-update">
            <h2>Update Password</h2>
            <form
              onSubmit={handlePasswordUpdate}
              className="password-update-form"
            >
              <div className="input-group">
                <label>Current Password:</label>
                <input
                  type="password"
                  name="current_password"
                  value={passwordData.current_password}
                  onChange={handlePasswordInputChange}
                  required
                  placeholder="Enter your current password"
                />
              </div>
              <div className="input-group">
                <label>New Password:</label>
                <input
                  type="password"
                  name="password"
                  value={passwordData.password}
                  onChange={handlePasswordInputChange}
                  required
                  placeholder="Enter new password"
                  minLength="8"
                />
              </div>
              <div className="input-group">
                <label>Confirm New Password:</label>
                <input
                  type="password"
                  name="password_confirmation"
                  value={passwordData.password_confirmation}
                  onChange={handlePasswordInputChange}
                  required
                  placeholder="Confirm new password"
                  minLength="8"
                />
              </div>
              <div className="button-group">
                <button
                  type="submit"
                  className="save-btn"
                  disabled={passwordUpdateLoading}
                >
                  {passwordUpdateLoading ? "Updating..." : "Update Password"}
                </button>
              </div>
              {passwordUpdateError && (
                <div className="error-message">{passwordUpdateError}</div>
              )}
              {passwordUpdateSuccess && (
                <div className="success-message">
                  Password has been successfully updated!
                </div>
              )}
            </form>
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
          <h3>{localStorage.getItem("userName") || "User Profile"}</h3>
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
          <button
            className={`nav-item ${
              activeSection === "password" ? "active" : ""
            }`}
            onClick={() => setActiveSection("password")}
          >
            Update Password
          </button>
        </nav>
      </div>
      <div className="profile-content">{renderContent()}</div>
    </div>
  );
};

export default Profile;
