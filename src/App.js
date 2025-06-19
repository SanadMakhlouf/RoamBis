import React from "react";
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
function App() {
  return (
    <div className="App">
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
  );
}

export default App;
