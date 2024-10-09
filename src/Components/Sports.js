import React from 'react';
import AppNavbar from './Navbar';
import './MotorcyclePage.css'; // Import your CSS file

const Sports = () => {
  const motorcycles = [
    {
      id: 1,
      name: 'Sport Bike Model 1',
      description: 'High-performance sport bike with advanced features.',
      image: 'path/to/sportbike1.jpg', // Replace with actual image path
    },
    {
      id: 2,
      name: 'Sport Bike Model 2',
      description: 'A powerful and agile sport bike for the thrill-seekers.',
      image: 'path/to/sportbike2.jpg',
    },
    // Add more motorcycle objects as needed
  ];

  return (
    <div>
      <AppNavbar />
      <div className="motorcycle-container">
        {motorcycles.map(bike => (
          <div key={bike.id} className="motorcycle-card">
            <img src={bike.image} alt={bike.name} className="motorcycle-image" />
            <h3>{bike.name}</h3>
            <p>{bike.description}</p>
            <button className="contact-button">Contact Dealership</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sports;
