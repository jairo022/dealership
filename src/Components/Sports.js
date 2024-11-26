import React, { useEffect, useState } from 'react';
import AppNavbar from './Navbar';
import { database, storage } from '../fireBaseConfig';
import { ref as dbRef, get, remove } from 'firebase/database';
import { getDownloadURL, ref as storageRef } from 'firebase/storage';
import { Button, Card } from 'react-bootstrap';
import './MotorcyclePage.css';
import { useUser } from './UserContext';
import { useNavigate } from 'react-router-dom';

const Sport = () => {
  const [motorcycles, setMotorcycles] = useState([]);
  const { userRole, loading } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSportMotorcycles = async () => {
      try {
        const motorcyclesRef = dbRef(database, 'motorcycles');
        const snapshot = await get(motorcyclesRef);

        if (snapshot.exists()) {
          const sportBikesData = await Promise.all(
            Object.keys(snapshot.val()).map(async (key) => {
              const bike = snapshot.val()[key];
              if (bike.vehicleType === 'sport') {
                const imageUrl = await getDownloadURL(storageRef(storage, bike.imageUrl));
                return { ...bike, id: key, imageUrl };
              }
              return null;
            })
          );
          setMotorcycles(sportBikesData.filter(bike => bike !== null));
        } else {
          console.log("No data available for sport motorcycles.");
        }
      } catch (error) {
        console.error("Error fetching sport motorcycles:", error);
      }
    };

    fetchSportMotorcycles();
  }, []);

  const handleDelete = async (id) => {
    try {
      const bikeRef = dbRef(database, `motorcycles/${id}`);
      await remove(bikeRef);
      setMotorcycles(prevBikes => prevBikes.filter(bike => bike.id !== id));
    } catch (error) {
      console.error('Error deleting bike:', error);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <AppNavbar />
      <div className="motorcycle-container">
        {motorcycles.map(bike => (
          <Card key={bike.id} className="motorcycle-card mb-4">
            <Card.Img variant="top" src={bike.imageUrl} alt={bike.model} className="motorcycle-image" />
            <Card.Body>
              <Card.Title>{bike.model}</Card.Title>
              <Card.Text>
                <strong>Description:</strong> {bike.description}<br />
                <strong>Transmission:</strong> {bike.transmission}<br />
                <strong>Year:</strong> {bike.year}<br />
                <strong>Vehicle Type:</strong> {bike.vehicleType}
              </Card.Text>
              <div className="button-container">
                <Button variant="success" className="w-100 contact-button" onClick={() => navigate('/ContactDealership')}>
                  Contact Dealership
                </Button>
                {userRole === 'business' && (
                  <Button variant="danger" className="w-100 delete-button" onClick={() => handleDelete(bike.id)}>
                    Delete
                  </Button>
                )}
              </div>
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Sport;
