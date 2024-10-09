import React, { useEffect, useState } from 'react';
import AppNavbar from './Navbar';
import { db, storage } from '../fireBaseConfig'; // Import Firestore
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore'; // Import necessary Firestore functions
import { getDownloadURL, ref } from 'firebase/storage'; // Import Storage functions
import { Link } from 'react-router-dom'; // Import Link for navigation
import { Button, Card } from 'react-bootstrap'; // Import React-Bootstrap components
import './CarPage.css'; // Import your CSS file

const Sedan = () => {
  const [cars, setCars] = useState([]); // State to hold car data
  const carsCollectionRef = collection(db, 'cars'); // Reference to 'cars' collection in Firestore

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const data = await getDocs(carsCollectionRef);
        const carsData = await Promise.all(
          data.docs.map(async (doc) => {
            const car = doc.data();
            const imageUrl = await getDownloadURL(ref(storage, car.imageUrl));
            return { ...car, id: doc.id, imageUrl };
          })
        );
        setCars(carsData);
      } catch (error) {
        console.error("Error fetching cars:", error);
      }
    };

    fetchCars();
  }, [carsCollectionRef]);

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, 'cars', id));
    setCars(cars.filter(car => car.id !== id)); // Update state to remove the deleted car
  };

  return (
    <div>
      <AppNavbar />
      <div className="car-container">
        {cars.map(car => (
          <Card key={car.id} className="car-card mb-4">
            <Card.Img variant="top" src={car.imageUrl} alt={car.model} className="car-image" />
            <Card.Body>
              <Card.Title>{car.model}</Card.Title>
              <Card.Text>
                <strong>Description:</strong> {car.description}<br />
                <strong>Transmission:</strong> {car.transmission}<br />
                <strong>Year:</strong> {car.year}<br />
                <strong>Vehicle Type:</strong> {car.vehicleType}
              </Card.Text>
              <div className="button-container">
                <Button variant="success" className="w-100 contact-button">
                  Contact Dealership
                </Button>
                <Link to={`/edit-vehicle/${car.id}`}>
                  <Button variant="info" className="w-100 modify-button">
                    Modify
                  </Button>
                </Link>
                <Button variant="danger" className="w-100 delete-button" onClick={() => handleDelete(car.id)}>
                  Delete
                </Button>
              </div>
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Sedan;

