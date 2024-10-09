import React from 'react';
import AppNavbar from './Navbar';
import './TruckPage.css'; // Import your CSS file

const FullSize = () => {
  const trucks = [
    {
      id: 1,
      name: 'FullSize Truck Model 1',
      description: 'The ultimate truck for heavy-duty tasks.',
      image: 'path/to/fullsize1.jpg', // Replace with actual image path
    },
    {
      id: 2,
      name: 'FullSize Truck Model 2',
      description: 'Maximum towing capacity and spacious.',
      image: 'path/to/fullsize2.jpg',
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

export default FullSize;
