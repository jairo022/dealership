import React, { useEffect, useState } from 'react';
import AppNavbar from './Navbar';
import { database, storage } from '../fireBaseConfig';
import { getDownloadURL, ref as storageRef } from 'firebase/storage';
import { get, ref, remove } from 'firebase/database';
import { Button, Card } from 'react-bootstrap';
import { useUser } from './UserContext';
import { useNavigate } from 'react-router-dom'; // Import for navigation
import './CarPage.css';

const Coupe = () => {
  const [cars, setCars] = useState([]); // State for cars
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const { userRole, loading } = useUser(); // User role and loading from context
  const navigate = useNavigate(); // Initialize navigate function

  useEffect(() => {
    const fetchCoupes = async () => {
      try {
        const coupeRef = ref(database, 'cars'); // Reference to 'cars'
        const snapshot = await get(coupeRef);

        if (snapshot.exists()) {
          const data = snapshot.val();
          const coupesData = await Promise.all(
            Object.keys(data)
              .filter(key => data[key].vehicleType === 'coupe') // Filter coupes
              .map(async (key) => {
                const car = data[key];
                const imageUrl = await getDownloadURL(storageRef(storage, car.imageUrl));
                return { ...car, id: key, imageUrl };
              })
          );
          setCars(coupesData);
        } else {
          console.error("No data found in 'cars' collection.");
        }
      } catch (error) {
        console.error("Error fetching Coupes:", error);
      } finally {
        setIsLoading(false); // Stop loading once fetching is complete
      }
    };

    fetchCoupes();
  }, []);

  const handleDelete = async (id) => {
    try {
      await remove(ref(database, `cars/${id}`)); // Delete from database
      setCars(prevCars => prevCars.filter(car => car.id !== id)); // Update state
    } catch (error) {
      console.error('Error deleting car:', error);
    }
  };

  if (loading || isLoading) return <div>Loading...</div>; // Show loading state

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
                  <strong>Transmission:</strong> {car.transmission}<br />
                  <strong>Year:</strong> {car.year}<br />
                  <strong>Vehicle Type:</strong> {car.vehicleType}
                </Card.Text>
                <div className="button-container">
                  <Button
                    variant="success"
                    className="w-100 contact-button"
                    onClick={() => navigate('/ContactDealership')} // Redirect on click
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
          <div>No Coupes Available</div>
        )}
      </div>
    </div>
  );
};

export default Coupe;
