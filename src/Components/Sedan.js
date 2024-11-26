import React, { useEffect, useState } from 'react';
import AppNavbar from './Navbar';
import { database } from '../fireBaseConfig'; // Ensure 'database' is correctly imported
import { get, ref, remove } from 'firebase/database'; // Added `remove` for delete functionality
import { Button, Card } from 'react-bootstrap';
import './CarPage.css';
import { useUser } from './UserContext'; // Ensure this context is properly set up
import { useNavigate } from 'react-router-dom';

const Sedan = () => {
  const [cars, setCars] = useState([]); // State to store sedan cars
  const { userRole, loading } = useUser(); // Fetch user role and loading status
  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    const fetchSedans = async () => {
      try {
        const sedansRef = ref(database, 'cars'); // Path to 'cars' in the Realtime Database
        const snapshot = await get(sedansRef);

        if (snapshot.exists()) {
          const carsData = [];
          const data = snapshot.val();

          // Filter for cars with the vehicle type 'sedan'
          for (const [key, car] of Object.entries(data)) {
            if (car.vehicleType === 'sedan') {
              carsData.push({ ...car, id: key }); // Include car ID for delete functionality
            }
          }

          setCars(carsData); // Update state with sedan cars
        } else {
          console.log("No sedans available");
        }
      } catch (error) {
        console.error("Error fetching sedans:", error);
      }
    };

    fetchSedans();
  }, []);

  const handleDelete = async (id) => {
    try {
      const carRef = ref(database, `cars/${id}`); // Reference to the car in the database
      await remove(carRef); // Remove the car from the database
      setCars(prevCars => prevCars.filter(car => car.id !== id)); // Update the state to remove the car
      console.log(`Car with ID: ${id} deleted successfully.`);
    } catch (error) {
      console.error('Error deleting car:', error);
    }
  };

  if (loading) return <div>Loading...</div>; // Display loading state

  return (
    <div>
      <AppNavbar />
      <div className="car-container">
        {cars.length > 0 ? (
          cars.map(car => (
            <Card key={car.id} className="car-card mb-4">
              <Card.Img variant="top" src={car.imageUrl} alt={car.model} className="car-image" />
              <Card.Body>
                <Card.Title>{car.model}</Card.Title>
                <Card.Text>
                  <strong>Description:</strong> {car.description}<br />
                  <strong>Transmission:</strong> {car.transmission || "N/A"}<br />
                  <strong>Year:</strong> {car.year}<br />
                  <strong>Vehicle Type:</strong> {car.vehicleType}
                </Card.Text>
                <div className="button-container">
                  <Button
                    variant="success"
                    className="w-100 contact-button"
                    onClick={() => navigate('/ContactDealership')}
                  >
                    Contact Dealership
                  </Button>
                  {userRole === 'business' && (
                    <Button
                      variant="danger"
                      className="w-100 delete-button"
                      onClick={() => handleDelete(car.id)}
                    >
                      Delete
                    </Button>
                  )}
                </div>
              </Card.Body>
            </Card>
          ))
        ) : (
          <div>No data available for sedans.</div>
        )}
      </div>
    </div>
  );
};

export default Sedan;
