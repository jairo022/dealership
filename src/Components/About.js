// About.js
import React from "react";
import "./About.css"; // Import the CSS file
import AppNavbar from "./Navbar";

const About = () => {
  return (
    <div>
      <AppNavbar />
      <div className="about-container">
        <h1>About Us</h1>
        <p>
          Welcome to WHEELS! We are dedicated to providing you with the best
          vehicles at unbeatable prices. Our mission is to help you find the
          perfect car, motorcycle, or truck that fits your needs and budget.
        </p>
        <p>
          Our team is passionate about vehicles and is here to assist you every
          step of the way. Whether you are a first-time buyer or an experienced
          enthusiast, we have the expertise to help you make an informed
          decision.
        </p>
        <p>Thank you for choosing WHEELS. We look forward to serving you!</p>
      </div>
    </div>
  );
};

export default About;
