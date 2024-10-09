import React from 'react';
import AppNavbar from './Navbar';
import './TruckPage.css'; // Import your CSS file

const Compact = () => {
  const trucks = [
    {
      id: 1,
      name: 'Compact Truck Model 1',
      description: 'A compact truck ideal for city driving.',
      image: 'path/to/compact1.jpg', // Replace with actual image path
    },
    {
      id: 2,
      name: 'Compact Truck Model 2',
      description: 'Fuel-efficient and easy to maneuver.',
      image: 'path/to/compact2.jpg',
    },
    // Add more truck objects as needed
  ];

  return (
    <div>
      <AppNavbar />
      <div className="truck-container">
        {trucks.map(truck => (
          <div key={truck.id} className="truck-card">
            <img src={truck.image} alt={truck.name} className="truck-image" />
            <h3>{truck.name}</h3>
            <p>{truck.description}</p>
            <button className="contact-button">Contact Dealership</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Compact;
