import React, { useEffect, useState } from 'react';
import AppNavbar from './Navbar';
import { database, storage } from '../fireBaseConfig';
import { ref, onValue, remove } from 'firebase/database';
import { getDownloadURL, ref as storageRef } from 'firebase/storage';
import { Button, Card } from 'react-bootstrap';
import './MotorcyclePage.css';
import { useUser } from './UserContext';
import { useNavigate } from 'react-router-dom';

const Cruisers = () => {
  const [motorcycles, setMotorcycles] = useState([]);
  const { userRole, loading } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onValue(ref(database, 'motorcycles'), async (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const cruisersData = await Promise.all(
          Object.keys(data).map(async (key) => {
            const bike = data[key];
            if (bike.vehicleType === 'cruiser') {
              try {
                const imageUrl = await getDownloadURL(storageRef(storage, bike.imageUrl));
                return { ...bike, id: key, imageUrl };
              } catch (error) {
                console.error(`Error fetching image for ${bike.model}:`, error);
                return null;
              }
            }
            return null;
          })
        );
        setMotorcycles(cruisersData.filter(bike => bike !== null));
      } else {
        setMotorcycles([]);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleDelete = async (id) => {
    try {
      const bikeRef = ref(database, `motorcycles/${id}`);
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
        {motorcycles.length > 0 ? (
          motorcycles.map(bike => (
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
          ))
        ) : (
          <div>No cruisers available.</div>
        )}
      </div>
    </div>
  );
};

export default Cruisers;
