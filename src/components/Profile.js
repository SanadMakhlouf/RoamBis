import React, { useState, useEffect } from "react";
import "./styles/Profile.css";

const Profile = () => {
  const [activeSection, setActiveSection] = useState("personal");
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 6; // Show 6 orders per page (3 rows of 2)

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

        const response = await fetch(
          `http://127.0.0.1:8000/api/orders?page=${currentPage}`,
          {
            headers: {
              Accept: "application/json",
              Authorization: token,
            },
          }
        );

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
        const userData = {
          name: localStorage.getItem("userName") || "User",
          email: localStorage.getItem("userEmail") || "No email provided",
        };
        return (
          <div className="profile-section user-info">
            <h2>Personal Information</h2>
            <div className="user-info-content">
              <div className="user-details">
                <p>
                  <strong>Name:</strong> {userData.name}
                </p>
                <p>
                  <strong>Email:</strong> {userData.email}
                </p>
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
        </nav>
      </div>
      <div className="profile-content">{renderContent()}</div>
    </div>
  );
};

export default Profile;
