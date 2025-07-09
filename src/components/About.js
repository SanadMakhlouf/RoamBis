import React from "react";
import "./styles/About.css";

const About = () => {
  return (
    <div className="about-page">
      <div className="about-hero">
        <div className="container">
          <h1>About Us</h1>
        </div>
      </div>

      <div className="about-content">
        <div className="container">
          <div className="about-story">
            <p className="lead">
              We're a family-owned eSIM distribution company built on connection
              — not just through technology, but through love, travel, and the
              ties that bind us.
            </p>

            <p>
              With family spread across continents and stories shared across
              time zones, we started this journey with a simple goal: to make
              staying connected easier, no matter where in the world life takes
              us. What began as a solution to our own need for reliable,
              affordable mobile access while traveling soon became something we
              knew could help others, too.
            </p>

            <p>
              Our mission is to take the hassle out of staying connected abroad
              — for families, friends, adventurers, and remote workers alike.
              With eSIM technology, there's no need for physical SIM cards,
              expensive roaming fees, or complicated setups. Just instant access
              to local networks wherever you land.
            </p>

            <p>
              We believe that connection is everything. Whether it's a video
              call to grandma, sharing a sunset photo from the other side of the
              world, or simply staying online while exploring new places — we're
              here to help make those moments seamless.
            </p>

            <p className="closing">
              From our family to yours, welcome — and thank you for letting us
              be part of your journey.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
