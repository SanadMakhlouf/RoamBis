import React from "react";
import "./styles/Testimonials.css";

function Testimonials() {
  return (
    <section className="testimonials">
      <div className="container">
        <p className="section-note">
          Here's what people are saying about their experience with our services
        </p>
        <div className="testimonials-grid">
          <div className="testimonial-card">
            <div className="testimonial-avatar"></div>
            <h4>Janet Moore</h4>
            <div className="rating">⭐⭐⭐⭐⭐</div>
            <p>
              "RoamBis made my European vacation so much easier. I was connected
              instantly in every country without any hassle."
            </p>
          </div>
          <div className="testimonial-card">
            <div className="testimonial-avatar"></div>
            <h4>Robert Taylor</h4>
            <div className="rating">⭐⭐⭐⭐⭐</div>
            <p>
              "As a frequent business traveler, RoamBis has been a game-changer.
              Reliable connectivity in every city I visit."
            </p>
          </div>
          <div className="testimonial-card">
            <div className="testimonial-avatar"></div>
            <h4>Sarah Zhang</h4>
            <div className="rating">⭐⭐⭐⭐⭐</div>
            <p>
              "The setup was incredibly simple and the connection quality
              exceeded my expectations. Highly recommended!"
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
