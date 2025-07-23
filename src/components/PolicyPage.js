import React, { useState } from "react";
import "./styles/PolicyPage.css";

function PolicyPage() {
  const [activeTab, setActiveTab] = useState("privacy");

  const tabs = [
    { id: "privacy", label: "Privacy Policy" },
    { id: "terms", label: "Terms & Conditions" },
    { id: "cookies", label: "Cookie Policy" },
  ];

  return (
    <div className="policy-page">
      <div className="policy-container">
        <div className="policy-tabs">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`tab-button ${activeTab === tab.id ? "active" : ""}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="policy-content">
          {activeTab === "privacy" && (
            <div className="policy-section">
              <h1>🔐 Privacy Policy for Roambis Mobile</h1>
              <p className="effective-date">Effective Date: July 9, 2025</p>

              <p className="intro">
              RoamBis Mobile ("we," "our," or "us") is committed to protecting
                your privacy. This Privacy Policy explains how we collect, use,
                disclose, and safeguard your information when you visit our
                website or use our eSIM services.
              </p>

              <section>
                <h2>1. Information We Collect</h2>
                <h3>a. Personal Information</h3>
                <ul>
                  <li>Full name</li>
                  <li>Email address</li>
                  <li>Phone number</li>
                  <li>Country of travel</li>
                  <li>Device type (for eSIM compatibility)</li>
                  <li>Billing address and payment details</li>
                </ul>

                <h3>b. Usage Data</h3>
                <ul>
                  <li>IP address</li>
                  <li>Browser and device details</li>
                  <li>Website activity</li>
                  <li>Referral source</li>
                </ul>
                <div style={{ marginTop: '20px' }}>
                  <a 
                    href="https://docs.google.com/document/d/1dOE8ZROUY7j_NsoU3YD11ildmain5sl2QA9qV2fmiOc/edit?usp=drive_link" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="read-more-button"
                  >
                    Read more
                  </a>
                </div>
              </section>

              {/* Continue with other privacy policy sections */}
            </div>
          )}

          {activeTab === "terms" && (
            <div className="policy-section">
              <h1>📜 Terms and Conditions for Roambis Mobile</h1>
              <p className="effective-date">Effective Date: July 9, 2025</p>

              <p className="intro">
                These Terms and Conditions ("Terms") govern your use of
                roambis.com and our eSIM services. By accessing or purchasing
                from our site, you agree to these Terms.
              </p>

              <section>
                <h2>1. About Roambis</h2>
                <p>
                  Roambis Mobile offers digital eSIM plans for international
                  mobile data, delivered through partnerships with global
                  telecom networks.
                </p>

                <h2>2. Eligibility</h2>
                <p>
                  You must be at least 16 years old to use our services. By
                  using our site or purchasing a plan, you confirm this
                  requirement.
                </p>
                <div style={{ marginTop: '20px' }}>
                  <a 
                    href="https://docs.google.com/document/d/1-WtMQAlmp38wSs7jQloCRNA6kW81hUrHmwdZ7Ok3BMY/edit?usp=drive_link" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="read-more-button"
                  >
                    Read more
                  </a>
                </div>
              </section>

              {/* Continue with other terms sections */}
            </div>
          )}

          {activeTab === "cookies" && (
            <div className="policy-section">
              <h1>🍪 Cookie Policy for RoamBis Mobile</h1>
              <p className="effective-date">Effective Date: July 9, 2025</p>

              <p className="intro">
                At Roambis Mobile, we use cookies and similar technologies to
                enhance your browsing experience, analyze website usage, and
                personalize content and advertisements.
              </p>

              <section>
                <h2>1. What Are Cookies?</h2>
                <p>
                  Cookies are small text files stored on your device when you
                  visit a website. They help us recognize returning users,
                  remember preferences, and improve overall functionality.
                </p>

                <h2>2. Types of Cookies We Use</h2>
                <div className="cookie-types">
                  <div className="cookie-type">
                    <h3>Essential Cookies</h3>
                    <p>
                      Necessary for the website to function properly (e.g.,
                      login, shopping cart, eSIM activation).
                    </p>
                  </div>
                  <div className="cookie-type">
                    <h3>Performance Cookies</h3>
                    <p>
                      Help us analyze website usage and performance (e.g.,
                      Google Analytics).
                    </p>
                  </div>
                  <div className="cookie-type">
                    <h3>Functionality Cookies</h3>
                    <p>Store user preferences such as language and region.</p>
                  </div>
                  <div className="cookie-type">
                    <h3>Marketing Cookies</h3>
                    <p>
                      Enable us to show relevant ads and measure campaign
                      effectiveness.
                    </p>
                  </div>
                </div>
                <div style={{ marginTop: '20px' }}>
                  <a 
                    href="https://docs.google.com/document/d/1fgSZU-rCqGMG1P9jjgRFeFPUzdL5PPz_ouSJSzhHgSs/edit?usp=drive_link" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="read-more-button"
                  >
                    Read more
                  </a>
                </div>
              </section>

              {/* Continue with other cookie policy sections */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default PolicyPage;
