import React from 'react';
import AppNavbar from './Navbar';
import './MotorcyclePage.css'; // Import your CSS file

const Cruisers = () => {
  const motorcycles = [
    {
      id: 1,
      name: 'Cruiser Model 1',
      description: 'A stylish cruiser designed for long rides.',
      image: 'path/to/cruiser1.jpg', // Replace with actual image path
    },
    {
      id: 2,
      name: 'Cruiser Model 2',
      description: 'Comfort and performance combined in one motorcycle.',
      image: 'path/to/cruiser2.jpg',
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

export default Cruisers;
