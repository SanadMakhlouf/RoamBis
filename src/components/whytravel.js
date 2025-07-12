import React, { useEffect, useRef } from "react";
import video from "../assets/video.mp4";
import "./styles/WhyTravel.css";

function WhyTravel() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.2,
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section className="why-travel" ref={sectionRef}>
      <div className="container">
        <div className="why-travel-grid">
          <div className="video-container">
            <video src={video} autoPlay muted loop playsInline />
          </div>
          <div className="content-container">
            <h2>Why Travel with RoamBis</h2>
            <p className="main-text">
              Stay online wherever you are — whether you're exploring Paris,
              working remotely in Bali, or attending a conference in Dubai.
            </p>
            <div className="features-list">
              <div className="feature-item">
                <i className="fa-solid fa-check"></i>
                <span>No roaming charges</span>
              </div>
              <div className="feature-item">
                <i className="fa-solid fa-check"></i>
                <span>Instant eSIM activation</span>
              </div>
              <div className="feature-item">
                <i className="fa-solid fa-check"></i>
                <span>Works in 200+ countries</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default WhyTravel;
