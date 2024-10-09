import React from 'react';
import AppNavbar from './Navbar';
import './CarPage.css';

const Suvs = () => {
  const cars = [
    {
      id: 1,
      name: 'SUV Model 1',
      description: 'Description for SUV Model 1.',
      image: 'path/to/suv1.jpg',
    },
    {
      id: 2,
      name: 'SUV Model 2',
      description: 'Description for SUV Model 2.',
      image: 'path/to/suv2.jpg',
    },
    // Add more car objects as needed
  ];

  return (
    <div>
      <AppNavbar />
      <div className="car-container">
        {cars.map(car => (
          <div key={car.id} className="car-card">
            <img src={car.image} alt={car.name} className="car-image" />
            <h3>{car.name}</h3>
            <p>{car.description}</p>
            <button className="contact-button">Contact Dealership</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Suvs;
