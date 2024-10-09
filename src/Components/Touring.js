import React from 'react';
import AppNavbar from './Navbar';
import './MotorcyclePage.css'; // Import your CSS file

const Touring = () => {
  const motorcycles = [
    {
      id: 1,
      name: 'Touring Model 1',
      description: 'Built for comfort on long journeys.',
      image: 'path/to/touring1.jpg', // Replace with actual image path
    },
    {
      id: 2,
      name: 'Touring Model 2',
      description: 'An ultimate touring bike with all the features you need.',
      image: 'path/to/touring2.jpg',
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

export default Touring;
