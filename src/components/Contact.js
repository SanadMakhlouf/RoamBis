import React from "react";
import "./styles/Contact.css";

const Contact = () => {
  return (
    <div className="contact-container">
      <div className="contact-hero">
        <h1>Get in Touch</h1>
        <p>We're here to help with your global connectivity needs</p>
      </div>

      <div className="contact-content">
        <div className="contact-card contact-info">
          <div className="card-header">
            <i className="fas fa-location-dot"></i>
            <h2>Visit Us</h2>
          </div>
          <p className="address">
            14 Albert Road,
            <br />
            Belvedere, London.
            <br />
            DA17 5LJ
          </p>
          <div className="contact-actions">
            <a
              href="https://maps.google.com/?q=14 Albert Road, Belvedere, London, DA17 5LJ"
              target="_blank"
              rel="noopener noreferrer"
              className="map-btn"
            >
              <i className="fas fa-map-marker-alt"></i>
              View on Map
            </a>
          </div>
        </div>

        <div className="contact-card chat-card">
          <div className="card-header">
            <i className="fab fa-whatsapp"></i>
            <h2>Chat with Us</h2>
          </div>
          <p>Get instant support via WhatsApp</p>
          <div className="contact-actions">
            <a
              href="https://wa.me/1234567890"
              target="_blank"
              rel="noopener noreferrer"
              className="whatsapp-btn"
            >
              <i className="fab fa-whatsapp"></i>
              Start Chat
            </a>
          </div>
        </div>

        <div className="contact-card email-card">
          <div className="card-header">
            <i className="fas fa-envelope"></i>
            <h2>Email Us</h2>
          </div>
          <p>Send us your queries anytime</p>
          <div className="contact-actions">
            <a href="mailto:support@roambis.com" className="email-btn">
              <i className="fas fa-envelope"></i>
              Send Email
            </a>
          </div>
        </div>
      </div>

      <div className="social-section">
        <h2>Connect With Us</h2>
        <p>Follow us on social media for updates and special offers</p>

        <div className="social-links">
          <a
            href="https://uk.trustpilot.com/review/roambis.com"
            target="_blank"
            rel="noopener noreferrer"
            className="social-link trustpilot"
          >
            <i className="fas fa-star"></i>
            
          </a>

          <a
            href="https://www.facebook.com/profile.php?id=61573623737810"
            target="_blank"
            rel="noopener noreferrer"
            className="social-link facebook"
          >
            <i className="fab fa-facebook"></i>
            
          </a>

          <a
            href="https://www.instagram.com/roambis_mobile"
            target="_blank"
            rel="noopener noreferrer"
            className="social-link instagram"
          >
            <i className="fab fa-instagram"></i>
            
          </a>

          <a
            href="https://www.tiktok.com/@roambis_mobile"
            target="_blank"
            rel="noopener noreferrer"
            className="social-link tiktok"
          >
            <i className="fab fa-tiktok"></i>
            
          </a>

          <a
            href="https://x.com/roambis_mobile"
            target="_blank"
            rel="noopener noreferrer"
            className="social-link twitter"
          >
            <i className="fab fa-x-twitter"></i>
            
          </a>
        </div>
      </div>

      <div className="contact-form">
        <h2>Send Us a Message</h2>
        <p>Fill out the form below and we'll get back to you soon</p>

        <form>
          <div className="form-group">
            <input type="text" placeholder="Your Name" required />
          </div>

          <div className="form-group">
            <input type="email" placeholder="Your Email" required />
          </div>

          <div className="form-group">
            <input type="text" placeholder="Subject" required />
          </div>

          <div className="form-group">
            <textarea placeholder="Your Message" rows="5" required></textarea>
          </div>

          <button type="submit" className="submit-btn">
            <i className="fas fa-paper-plane"></i>
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
