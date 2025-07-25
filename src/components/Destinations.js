import React from "react";
import { Link } from "react-router-dom";
import "./styles/Destinations.css";

function Destinations() {
  const destinations = [
    {
      name: "Europe",
      countries: 28,
      price: 4.5,
      image:
        "https://images.pexels.com/photos/705764/pexels-photo-705764.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      name: "Asia Pacific",
      countries: 19,
      price: 2.5,
      image:
        "https://images.pexels.com/photos/1366957/pexels-photo-1366957.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      name: "Americas",
      countries: 35,
      price: 3.5,
      image:
        "https://images.pexels.com/photos/290386/pexels-photo-290386.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      name: "Middle East",
      countries: 18,
      price: 6.5,
      image:
        "https://images.pexels.com/photos/3243028/pexels-photo-3243028.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
  ];

  return (
    <section className="destinations">
      <div className="container">
        <p className="section-note">
          Explore over 200+ global international destinations
        </p>
        <div className="destinations-grid">
          {destinations.map((destination, index) => (
            <Link to="/countries" className="destination-card" key={index}>
              <div
                className="destination-image"
                style={{ backgroundImage: `url(${destination.image})` }}
              >
                <div className="destination-info">
                  <h3>{destination.name}</h3>
                  <p>{destination.countries} Countries</p>
                  <div className="discover-more">Discover More →</div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Destinations;
