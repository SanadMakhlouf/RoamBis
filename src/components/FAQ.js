import React, { useState } from "react";
import "./styles/FAQ.css";

const FAQ = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedItems, setExpandedItems] = useState({});

  const faqSections = [
    {
      title: "General",
      icon: "fa-solid fa-lightbulb",
      questions: [
        {
          q: "What is an eSIM?",
          a: "An eSIM (Embedded SIM) is a digital SIM built into your device, allowing you to activate a mobile data plan without a physical SIM card.",
        },
        {
          q: "What is RoamBis?",
          a: "RoamBis is your gateway to fast, reliable, and affordable international data through travel-ready eSIMs. We cover 200+ countries and regions.",
        },
        {
          q: "How do I purchase and activate an eSIM?",
          a: "Choose a plan for your destination, receive a QR code by email, and scan it with your device. Activation usually takes under 20 seconds.",
        },
        {
          q: "Can I use RoamBis globally?",
          a: "Yes! Our plans work in over 200 countries. We also offer a Global eSIM that works across regions.",
        },
      ],
    },
    {
      title: "Device Compatibility",
      icon: "fa-solid fa-mobile-screen",
      questions: [
        {
          q: "What devices are compatible with RoamBis eSIMs?",
          a: "Our eSIMs work with the latest iPhones, Samsung Galaxy, Google Pixel, Huawei, Motorola, Oppo, and select iPads. See our device compatibility list for details.",
        },
        {
          q: "Can I use RoamBis on a smartwatch or tablet?",
          a: "Yes, as long as the device supports eSIM and is unlocked.",
        },
        {
          q: "Can I use one eSIM on multiple devices?",
          a: "No. Each eSIM is valid for one device. You can use mobile hotspot or purchase additional plans for other devices.",
        },
      ],
    },
    {
      title: "Activation & Usage",
      icon: "fa-solid fa-rocket",
      questions: [
        {
          q: "Do I need internet to activate my eSIM?",
          a: "Yes, you must be connected to Wi-Fi or cellular data to install and activate the eSIM.",
        },
        {
          q: "Can I schedule eSIM activation for a later date?",
          a: "Absolutely! Pick a future activation date when purchasing.",
        },
        {
          q: "How long does eSIM activation take?",
          a: "Activation typically completes in less than 30 seconds.",
        },
      ],
    },
  ];

  const toggleQuestion = (sectionIndex, questionIndex) => {
    const key = `${sectionIndex}-${questionIndex}`;
    setExpandedItems((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const filteredSections = faqSections
    .map((section) => ({
      ...section,
      questions: section.questions.filter(
        (q) =>
          q.q.toLowerCase().includes(searchTerm.toLowerCase()) ||
          q.a.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    }))
    .filter((section) => section.questions.length > 0);

  return (
    <div className="faq-container">
      <div className="faq-content">
        <h1>Frequently Asked Questions</h1>
        <p className="faq-intro">
          Find answers to common questions about RoamBis eSIM services, device
          compatibility, activation process, and more.
        </p>

        <div className="faq-search">
          <div className="search-bar">
            <i className="fas fa-search"></i>
            <input
              type="text"
              placeholder="Search FAQ..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="faq-categories">
          {filteredSections.map((section, sectionIndex) => (
            <div key={sectionIndex} className="faq-category">
              <div className="category-header">
                <i className={section.icon}></i>
                <h2>{section.title}</h2>
              </div>
              <div className="faq-items">
                {section.questions.map((item, questionIndex) => (
                  <div
                    key={questionIndex}
                    className={`faq-item ${
                      expandedItems[`${sectionIndex}-${questionIndex}`]
                        ? "expanded"
                        : ""
                    }`}
                    onClick={() => toggleQuestion(sectionIndex, questionIndex)}
                  >
                    <div className="faq-question">
                      <h3>{item.q}</h3>
                      <i
                        className={`fas ${
                          expandedItems[`${sectionIndex}-${questionIndex}`]
                            ? "fa-chevron-up"
                            : "fa-chevron-down"
                        }`}
                      ></i>
                    </div>
                    <div className="faq-answer">
                      <p>{item.a}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="faq-contact">
          <h3>Still have questions?</h3>
          <p>We're here to help! Reach out to our support team.</p>
          <div className="contact-buttons">
            <a
              href="mailto:support@roambis.com"
              className="contact-btn email-btn"
            >
              <i className="fas fa-envelope"></i>
              Email Support
            </a>
            <a
              href="https://wa.me/1234567890"
              className="contact-btn whatsapp-btn"
            >
              <i className="fab fa-whatsapp"></i>
              WhatsApp Support
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
