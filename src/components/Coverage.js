import React, { useState, useEffect } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
} from "react-simple-maps";
import { feature } from "topojson-client";
import "./styles/Coverage.css";
import plansImage from "../assets/plans.png";

// Corrected: country codes must be strings and match GeoJSON's ID format
const countriesWithCoverage = {
  "840": { color: "#ffffff", name: "United States", coverage: "Full Coverage" }, // USA
  "250": { color: "#ffffff", name: "France", coverage: "Full Coverage" },        // France
  "392": { color: "#ffffff", name: "Japan", coverage: "Full Coverage" },         // Japan
  "36":  { color: "#ffffff", name: "Australia", coverage: "Full Coverage" },     // Australia
  "710": { color: "#ffffff", name: "South Africa", coverage: "Full Coverage" },  // South Africa
};

const Coverage = () => {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [tooltipContent, setTooltipContent] = useState("");
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [geoData, setGeoData] = useState(null);

  useEffect(() => {
    fetch("https://unpkg.com/world-atlas@2.0.2/countries-50m.json")
      .then((response) => response.json())
      .then((topology) => {
        const { countries } = topology.objects;
        setGeoData(feature(topology, countries));
      })
      .catch((error) => {
        console.error("Error loading map data:", error);
      });
  }, []);

  const getCountryColor = (geo) => {
    const countryCode = String(geo.id);
    return countriesWithCoverage[countryCode]
      ? countriesWithCoverage[countryCode].color
      : "#432874";
  };

  const getTooltipContent = (geo) => {
    const countryCode = String(geo.id);
    if (countriesWithCoverage[countryCode]) {
      return `${countriesWithCoverage[countryCode].name} - ${countriesWithCoverage[countryCode].coverage}`;
    }
    return geo.properties.name;
  };

  return (
    <>
      <section className="coverage-hero">
        <div className="hero-background-pattern"></div>
        <div className="coverage-hero-container">
          <div className="coverage-hero-content">
            <div className="hero-badge">
              <i className="fa-solid fa-earth-americas"></i>
              <span>Global Network</span>
            </div>
            <h1 className="coverage-hero-title">
              Connect Anywhere with <span>Global Coverage</span>
            </h1>
            <p className="coverage-hero-subtitle">
              Stay connected across 200+ countries with premium network coverage
              and unbeatable speeds.
            </p>
            <div className="coverage-stats">
              <div className="stat-item">
                <div className="stat-icon">
                  <i className="fa-solid fa-globe"></i>
                </div>
                <div className="stat-text">
                  <span className="stat-number">5</span>
                  <span className="stat-label">Countries with Full Coverage</span>
                </div>
              </div>
              <div className="stat-item">
                <div className="stat-icon">
                  <i className="fa-solid fa-tower-broadcast"></i>
                </div>
                <div className="stat-text">
                  <span className="stat-number">500+</span>
                  <span className="stat-label">Networks</span>
                </div>
              </div>
              <div className="stat-item">
                <div className="stat-icon">
                  <i className="fa-solid fa-users"></i>
                </div>
                <div className="stat-text">
                  <span className="stat-number">1M+</span>
                  <span className="stat-label">Users</span>
                </div>
              </div>
            </div>
          </div>
          <div className="coverage-hero-image">
            <div className="image-overlay-circle"></div>
            <img src={plansImage} alt="Global Coverage" />
          </div>
        </div>
        <div className="wave-divider"></div>
      </section>

      <section className="coverage-map-section">
        <div className="coverage-container">
          <div className="map-header">
            <h2>Our Global Coverage</h2>
            <p>
              Explore our worldwide network coverage. White highlighted countries indicate full coverage areas.
            </p>
          </div>

          <div className="map-container">
            <div className="map-wrapper">
              <ComposableMap projection="geoMercator">
                <ZoomableGroup center={[0, 30]} zoom={1.2}>
                  {geoData ? (
                    <Geographies geography={geoData}>
                      {({ geographies }) =>
                        geographies.map((geo) => {
                          const countryCode = String(geo.id);
                          return (
                            <Geography
                              key={geo.rsmKey}
                              geography={geo}
                              onMouseEnter={(evt) => {
                                const tooltipText = getTooltipContent(geo);
                                setTooltipContent(tooltipText);
                                setTooltipPosition({
                                  x: evt.clientX,
                                  y: evt.clientY,
                                });
                                if (countriesWithCoverage[countryCode]) {
                                  setSelectedCountry(countryCode);
                                }
                              }}
                              onMouseLeave={() => {
                                setTooltipContent("");
                                setSelectedCountry(null);
                              }}
                              style={{
                                default: {
                                  fill: getCountryColor(geo),
                                  stroke: "#ad0fd8",
                                  strokeWidth: 0.5,
                                  outline: "none",
                                },
                                hover: {
                                  fill: countriesWithCoverage[countryCode]
                                    ? "#ffffff"
                                    : "#5a3a8a",
                                  stroke: "#ffffff",
                                  strokeWidth: 0.75,
                                  outline: "none",
                                },
                                pressed: {
                                  fill: countriesWithCoverage[countryCode]
                                    ? "#ffffff"
                                    : "#5a3a8a",
                                  stroke: "#ffffff",
                                  strokeWidth: 0.75,
                                  outline: "none",
                                },
                              }}
                            />
                          );
                        })
                      }
                    </Geographies>
                  ) : (
                    <div className="loading-map">Loading map data...</div>
                  )}
                </ZoomableGroup>
              </ComposableMap>
              {tooltipContent && (
                <div
                  className="map-tooltip"
                  style={{
                    left: tooltipPosition.x,
                    top: tooltipPosition.y,
                  }}
                >
                  {tooltipContent}
                </div>
              )}
            </div>

            <div className="region-info">
              <div className="coverage-legend">
                <h3>Coverage Legend</h3>
                <div className="legend-item">
                  <div className="color-box white"></div>
                  <span>Full Coverage</span>
                </div>
                <div className="legend-item">
                  <div className="color-box purple"></div>
                  <span>Coming Soon</span>
                </div>
              </div>
              <div className="covered-countries">
                <h3>Countries with Full Coverage</h3>
                <ul>
                  {Object.entries(countriesWithCoverage).map(([code, data]) => (
                    <li key={code} className={selectedCountry === code ? "selected" : ""}>
                      {data.name}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Coverage;
