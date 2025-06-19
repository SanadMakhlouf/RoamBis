import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./components/styles/common.css";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Features from "./components/Features";
import HowItWorks from "./components/HowItWorks";
import Destinations from "./components/Destinations";
import Pricing from "./components/Pricing";
import Testimonials from "./components/Testimonials";
import TrustedBy from "./components/TrustedBy";
import CTA from "./components/CTA";
import Footer from "./components/Footer";
import WhyTravel from "./components/whytravel";
import Login from "./components/login";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <div className="landing-page">
              <Header />
              <Hero />
              <Features />
              <HowItWorks />
              <WhyTravel />
              <Destinations />
              <Pricing />
              <Testimonials />
              <TrustedBy />
              <CTA />
              <Footer />
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
