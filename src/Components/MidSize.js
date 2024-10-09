import React from 'react';
import AppNavbar from './Navbar';
import './TruckPage.css'; // Import your CSS file

const MidSize = () => {
  const trucks = [
    {
      id: 1,
      name: 'MidSize Truck Model 1',
      description: 'Perfect balance between size and power.',
      image: 'path/to/midsize1.jpg', // Replace with actual image path
    },
    {
      id: 2,
      name: 'MidSize Truck Model 2',
      description: 'Great for hauling and towing needs.',
      image: 'path/to/midsize2.jpg',
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

export default MidSize;
