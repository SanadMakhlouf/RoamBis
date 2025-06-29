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
import Plans from "./components/Plans";
import Coverage from "./components/Coverage";
import Countries from "./components/Countries";
import HowEsimWorks from "./components/HowEsimWorks";
import PlanDetails from "./components/PlanDetails";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/countries"
          element={
            <>
              <Header />
              <Countries />
              <Footer />
            </>
          }
        />
        <Route
          path="/plans/:countryCode"
          element={
            <>
              <Header />
              <Plans />
              <Footer />
            </>
          }
        />
        <Route
          path="/plans"
          element={
            <>
              <Header />
              <Plans />
              <Footer />
            </>
          }
        />
        <Route
          path="/plan-details/:countryCode/:planId"
          element={
            <>
              <Header />
              <PlanDetails />
              <Footer />
            </>
          }
        />
        <Route
          path="/coverage"
          element={
            <>
              <Header />
              <Coverage />
              <Footer />
            </>
          }
        />
        <Route
          path="/how-it-works"
          element={
            <>
              <Header />
              <HowEsimWorks />
              <Footer />
            </>
          }
        />
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
