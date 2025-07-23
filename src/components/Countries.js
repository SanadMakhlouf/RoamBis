import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/Countries.css";
import worldImage from "../assets/europe.png"; // Using existing world image
import { API_URL } from "../config";

const Countries = () => {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const countriesPerPage = 12;
  const navigate = useNavigate();

  useEffect(() => {
    fetchCountries();
  }, []);

  useEffect(() => {
    if (countries.length > 0) {
      // Filter out countries named 'Europe' or 'Asia'
      const visibleCountries = countries.filter(
        (country) =>
          country.name.toLowerCase() !== "europe" &&
          country.name.toLowerCase() !== "asia"
      );
      const filtered = visibleCountries.filter(
        (country) =>
          country.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          country.code.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredCountries(filtered);
      setCurrentPage(1); // Reset to first page when search changes
    }
  }, [searchTerm, countries]);

  const fetchCountries = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/countries`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      const countriesArray = Array.isArray(data) ? data : data.data || [];
      // Filter out countries named 'Europe' or 'Asia'
      const visibleCountries = countriesArray.filter(
        (country) =>
          country.name.toLowerCase() !== "europe" &&
          country.name.toLowerCase() !== "asia"
      );
      setCountries(visibleCountries);
      setFilteredCountries(visibleCountries);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const handleCountryClick = (countryCode, countryName) => {
    // Special case for Negeri Sembilan
    if (countryName.toLowerCase() === 'negeri sembilan') {
      navigate('/nn');
    } else {
      navigate(`/plans/${countryCode}`);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // Get current countries
  const indexOfLastCountry = currentPage * countriesPerPage;
  const indexOfFirstCountry = indexOfLastCountry - countriesPerPage;
  const currentCountries = filteredCountries.slice(
    indexOfFirstCountry,
    indexOfLastCountry
  );

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Calculate total pages
  const totalPages = Math.ceil(filteredCountries.length / countriesPerPage);

  // Generate page numbers
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    return pageNumbers;
  };

  // Helper function to get flag URL
  const getFlagUrl = (code) => {
    const lowerCode = code.toLowerCase();
    return `https://vectorflags.s3-us-west-2.amazonaws.com/flags/${lowerCode}-flag-01.png`;
  };

  if (loading) return <div className="loading">Loading countries...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <>
      <section className="plans-hero">
        <div className="hero-background-pattern"></div>
        <div className="plans-hero-container">
          <div className="plans-hero-content">
            <div className="hero-badge">
              <i className="fa-solid fa-globe"></i>
              <span>Global Coverage</span>
            </div>
            <h1 className="plans-hero-title">
              Stay Connected <span>Worldwide</span> with Our eSIM Network
            </h1>
            <p className="plans-hero-subtitle">
              Choose from {countries.length}+ destinations and enjoy seamless
              connectivity with our premium eSIM plans. No contracts, no roaming
              fees, instant activation.
            </p>
            <div className="search-container">
              <div className="search-box">
                <i className="fa-solid fa-search search-icon"></i>
                <input
                  type="text"
                  placeholder="Search by country name or code..."
                  value={searchTerm}
                  onChange={handleSearch}
                  className="search-input"
                />
                {searchTerm && (
                  <button
                    className="clear-search"
                    onClick={() => setSearchTerm("")}
                  >
                    <i className="fa-solid fa-times"></i>
                  </button>
                )}
              </div>
            </div>
            <div className="plans-hero-features">
              <div className="hero-feature">
                <span className="hero-feature-icon">
                  <i className="fa-solid fa-globe"></i>
                </span>
                <div className="hero-feature-text">
                  <span className="hero-feature-title">
                    {countries.length}+ Countries
                  </span>
                  <span className="hero-feature-desc">Global Coverage</span>
                </div>
              </div>
              <div className="hero-feature">
                <span className="hero-feature-icon">
                  <i className="fa-solid fa-bolt"></i>
                </span>
                <div className="hero-feature-text">
                  <span className="hero-feature-title">Ultra-Fast 5G</span>
                  <span className="hero-feature-desc">Premium Networks</span>
                </div>
              </div>
              <div className="hero-feature">
                <span className="hero-feature-icon">
                  <i className="fa-solid fa-mobile"></i>
                </span>
                <div className="hero-feature-text">
                  <span className="hero-feature-title">Device Compatible</span>
                  <span className="hero-feature-desc">iPhone & Android</span>
                </div>
              </div>
            </div>
            <div className="hero-cta">
              <button
  className="hero-button-outline"
  onClick={() => navigate("/how-it-works")}
>
  How It Works
</button>
            </div>
          </div>
          <div className="plans-hero-image">
            <div className="image-overlay-circle"></div>
            <img src={worldImage} alt="World Coverage Map" />
          </div>
        </div>
      </section>

      <section className="countries-section">
        <div className="countries-container">
          <div className="countries-header">
            <h2>Available Destinations</h2>
            <p className="countries-subtitle">
              Select your destination to view available eSIM plans
            </p>
          </div>
          <div className="countries-grid">
            {currentCountries && currentCountries.length > 0 ? (
              currentCountries.map((country) => (
                <div
                  key={country.id}
                  className="country-card"
                  onClick={() => handleCountryClick(country.code, country.name)}
                >
                  <div className="country-flag">
                    <img
                      src={getFlagUrl(country.code)}
                      alt={`${country.name} flag`}
                      className="country-flag-img"
                    />
                  </div>
                  <h3>{country.name}</h3>
                  <p className="country-code">{country.code.toUpperCase()}</p>
                  <div className="country-details">
                    <div className="network-badge">
                      <i className="fa-solid fa-signal"></i>
                      <span>5G/4G</span>
                    </div>
                    {country.active ? (
                      <span className="status active">Active</span>
                    ) : (
                      <span className="status inactive">Inactive</span>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="no-countries">
                {searchTerm
                  ? `No countries found matching "${searchTerm}"`
                  : "No countries available"}
              </div>
            )}
          </div>
          {filteredCountries.length > countriesPerPage && (
            <div className="pagination">
              <button
                className="pagination-button"
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
              >
                <i className="fa-solid fa-chevron-left"></i>
              </button>

              {getPageNumbers().map((number) => (
                <button
                  key={number}
                  className={`pagination-button ${
                    currentPage === number ? "active" : ""
                  }`}
                  onClick={() => paginate(number)}
                >
                  {number}
                </button>
              ))}

              <button
                className="pagination-button"
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                <i className="fa-solid fa-chevron-right"></i>
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Countries;
