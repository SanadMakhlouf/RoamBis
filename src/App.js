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
import Signup from "./components/signup";
import Plans from "./components/Plans";
import Coverage from "./components/Coverage";
import Countries from "./components/Countries";
import HowEsimWorks from "./components/HowEsimWorks";
import PlanDetails from "./components/PlanDetails";
import Profile from "./components/Profile";
import ThankYou from "./components/ThankYou";
import About from "./components/About";
import FAQ from "./components/FAQ";
import Contact from "./components/Contact";
import ScrollToTop from "./components/ScrollToTop";
import PolicyPage from "./components/PolicyPage";

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/profile"
          element={
            <>
              <Header />
              <Profile />
            </>
          }
        />
        <Route
          path="/about"
          element={
            <>
              <Header />
              <About />
              <Footer />
            </>
          }
        />
        <Route
          path="/faq"
          element={
            <>
              <Header />
              <FAQ />
              <Footer />
            </>
          }
        />
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
        <Route path="/thanks" element={<ThankYou />} />
        <Route
          path="/contact"
          element={
            <>
              <Header />
              <Contact />
              <Footer />
            </>
          }
        />
        <Route
          path="/policies"
          element={
            <>
              <Header />
              <PolicyPage />
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
