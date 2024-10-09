import React from 'react';
import AppNavbar from './Navbar'; // Ensure this path is correct
import './HomePage.css'; // Import the CSS file
import Bmw from './Images/Bmw.mp4';

const HomePage = () => {
  return (
    <div className="home-container">
      <AppNavbar /> 
      <video className="background-video" autoPlay loop muted>
        <source src={Bmw} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default HomePage;
