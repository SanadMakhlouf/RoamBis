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

  const extraFAQs = [
    {
      q: "What is an eSIM?",
      a: "An eSIM also known as Embedded SIM is a digital SIM card that allows you to activate a cellular plan without using a physical SIM card. It's built into your device, so there's no need to insert or swap physical cards."
    },
    {
      q: "How do I activate my RoamBis eSIM?",
      a: "To activate your RoamBis eSIM, simply scan the QR code provided by us or follow the setup instructions in your device’s settings. Activation steps may vary depending on the device, and location but we will be with you every step of the way."
    },
    {
      q: "What devices support RoamBis eSIM?",
      a: "eSIM technology is supported on many newer smartphones, tablets, laptops, and smartwatches. Popular devices include the latest iPhones, Google Pixel phones, Samsung Galaxy devices, and more. Kindly check our compatibility page for a full list of supported devices."
    },
    {
      q: "Can I use an RoamBis eSIM on multiple devices?",
      a: "No, an eSIM can only be activated on one device at a time. However, if you have other devices that need mobile data, you can either turn on Mobile Hotspot / Internet Sharing on your phone (if supported in your country), and connect with your other devices using the broadcasted Wi-Fi network or you can purchase an additional eSIM plan for your extra devices."
    },
    {
      q: "Can I use my RoamBis eSIM internationally?",
      a: "Yes you can use your RoamBis eSIM internationally. It allows you to switch to local networks and access cellular services without needing to change physical SIM cards when traveling internationally. At RoamBis we offer many international data plans and we also have global data plans."
    },
    {
      q: "Will I lose my phone number when I switch to eSIM?",
      a: "No, your phone number will remain the same when switching from a physical SIM to an eSIM."
    },
    {
      q: "What should I do if I need to reinstall my eSIM?",
      a: "If you need to reinstall your eSIM (for example, after resetting your device), you can follow the reactivation instructions. You may be able to use the original QR code or activation details."
    },
    {
      q: "How do I manage multiple eSIM profiles on my device?",
      a: "Some devices allow you to store multiple eSIM profiles. You can manage these profiles through your device's settings, enabling you to switch between networks as needed."
    },
    {
      q: "Is eSIM secure?",
      a: "Yes, eSIM technology is designed with enhanced security features. It’s built to prevent unauthorized access and SIM swapping, making it a secure option for mobile communication."
    },
    {
      q: "What happens if I lose my phone or it gets stolen with an eSIM?",
      a: "Contact us immediately to disable your eSIM. You can also lock or wipe your device remotely using your device's built-in security features, such as Find My iPhone or Find My Device."
    },
    {
      q: "Can I use RoamBis eSIM with prepaid plans?",
      a: "Yes, we offer many prepaid plans in different locations, just like physical SIM cards. You can choose a plan that fits your needs and activate it using an eSIM."
    },
    {
      q: "Do I need an internet connection to activate eSIM?",
      a: "Yes, an internet connection (Wi-Fi or cellular data) is required to download the eSIM profile to your device."
    },
    {
      q: "Can I have both an eSIM and a physical SIM in my device?",
      a: "Many modern devices support dual SIM functionality, allowing you to use both an eSIM and a physical SIM at the same time. You can manage which line is used for calls, texts, and data."
    },
    {
      q: "How can I check my eSIM balance and usage?",
      a: "You can check your eSIM balance and data usage by logging into your account on our website."
    },
    {
      q: "Can I transfer my eSIM to a different phone?",
      a: "Yes, you can transfer your eSIM to another compatible phone. The process typically involves deactivating the eSIM from the old phone and activating it on the new one. Contact us for assistance."
    },
    {
      q: "What should I do if my eSIM is not working?",
      a: "If you're having issues with your eSIM, try restarting your device, checking for software updates, or ensuring that your eSIM profile is correctly activated. If the issue persists, contact customer support for further assistance."
    },
    {
      q: "What is the difference between eSIM and a physical SIM?",
      a: "A physical SIM is a removable card that stores your mobile plan data, while an eSIM is a digital SIM built into your device. Both serve the same purpose, but eSIMs offer more flexibility, such as easier switching between carriers and multiple profiles."
    },
    {
      q: "How do I remove or deactivate my eSIM?",
      a: "You can remove or deactivate your eSIM from the settings menu on your device. If you're changing carriers or need to cancel your plan, it's recommended to contact your provider for assistance."
    },
    {
      q: "Which phones are compatible RoamBis Mobile eSIM?",
      a: `The below devices support eSIM installation via automatic online activation. If your device is not listed below, unfortunately it will not work with our eSIM packages. Kindly note that your device must be unlocked and free of any carrier restrictions in order to install eSIM data plans! For smart watches, tablets, and laptops, see our complete list of compatible devices. <br/><br/><strong>iOS - Apple iPhone</strong><br/>iPhone 16 Pro Max, iPhone 16 Pro, iPhone 16 Plus, iPhone 16, iPhone 15 Pro Max, iPhone 15 Pro, iPhone 15 Plus, iPhone 15, iPhone 14 Pro Max, iPhone 14 Pro, iPhone 14 Plus, iPhone 14, iPhone 13 Pro Max, iPhone 13 Pro, iPhone 13 mini, iPhone 13, iPhone 12 Pro Max, iPhone 12 Pro, iPhone 12 mini, iPhone 12, iPhone 11 Pro Max, iPhone 11 Pro, iPhone 11, iPhone XS, iPhone XS Max, iPhone XR, iPhone SE 2nd Gen. (2020), iPhone SE 3rd Gen. (2022)<br/><br/><strong>Android - Google Pixel</strong><br/>Google Pixel 9 Pro / Pro XL, Google Pixel 9, Google Pixel 8 Pro, Google Pixel 8 / 8a, Google Pixel 7 Pro, Google Pixel 7 / 7a, Google Pixel 6 Pro, Google Pixel 6 / 6a, Google Pixel 5, Google Pixel 4, Google Pixel 4a, Google Pixel 4 XL, Google Pixel 3, Google Pixel 3 XL, Google Pixel 3a, Google Pixel 3a XL<br/><br/><strong>Samsung Galaxy</strong><br/>Samsung Galaxy S25 / 5G, S25+ / 5G, S25 Ultra / 5G, S24 / 5G, S24+ / 5G, S24 Ultra / 5G, S23 / 5G, S23+ / 5G, S23 Ultra / 5G, S23 FE, S22 / 5G, S22+ / 5G, S22 Ultra / 5G, S21 / 5G, S21+ / 5G, S21 Ultra / 5G, S20, S20+, S20 Ultra, Z Flip, Z Fold 2, Z Fold 3 5G, Z Flip 3 5G Fold, Z Flip 3 5G, Z Flip 4, Z Fold 4, Z Flip 5, Z Fold 5, A55 5G, A54 5G, A34 5G, Fold, Note20, Note20 Ultra. NOTE: Samsung Galaxy "FE" models are NOT compatible.<br/><br/><strong>Huawei</strong><br/>Huawei P40, P40 Pro, Mate 40 Pro<br/><br/><strong>Motorola</strong><br/>Motorola Razr (2019), Razr 5G, Razr (2022), Razr 40, Razr 40 Ultra, Edge (2022), Edge 40, Edge 40 Pro, Edge 40 Neo, Edge 50 Pro, Edge 50 Fusion, Edge 50 Ultra, Moto G52J 5G, Moto G53 5G, Moto G53J 5G, Moto G54 5G, Moto G84<br/><br/><strong>Oppo</strong><br/>Oppo Find N2 Flip, Find X3 Pro, Find X5, Find X5 Pro, Reno 5 A, A55s 5G, Reno6 Pro 5G<br/><br/><strong>Nokia</strong><br/>Nokia G60 5G, X30 5G, XR21<br/><br/><strong>Xiaomi</strong><br/>Xiaomi 12T Pro, 13, 13 Lite, 13 Pro<br/><br/><strong>Honor</strong><br/>Honor 90, Magic 3, Magic 3 Pro, Magic 3 Pro+, Magic 4 Pro<br/><br/><strong>Microsoft</strong><br/>Surface Duo 2, Surface Duo<br/><br/><strong>iPads with eSIM</strong><br/>iPad Air (3rd/4th gen), iPad Pro 11 inch (1st/2nd/3rd gen), iPad Pro 12.9 inch (3rd/4th/5th/6th gen), iPad (7th/8th/9th gen), iPad Mini (5th/6th gen)<br/><br/><strong>Apple Watch</strong><br/>Apple Watch is currently NOT compatible."
    },
    {
      q: "Does RoamBis Mobile record your location or internet activity?",
      a: "We do not record your device location or web browsing activity. Your browsing activity is completely private. As required by law, we keep records containing only the time, data (Megabytes) consumed, and cellular provider of each data connection."
    }
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
        <h1>Frequently Asked Questions (FAQs)</h1>
        <div className="extra-faq-section">
          {extraFAQs.map((item, idx) => (
            <div key={idx} className="faq-item">
              <div className="faq-question">
                <h3>{item.q}</h3>
              </div>
              <div className="faq-answer">
                <p dangerouslySetInnerHTML={{ __html: item.a }} />
              </div>
            </div>
          ))}
        </div>

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
