import React, { useEffect, useState } from 'react';
import AppNavbar from './Navbar';
import { database } from '../fireBaseConfig';
import { get, ref, remove } from 'firebase/database';
import { Button, Card } from 'react-bootstrap';
import './CarPage.css';
import { useUser } from './UserContext';
import { useNavigate } from 'react-router-dom';

const Compact = () => {
  const [trucks, setTrucks] = useState([]);
  const { userRole, loading } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTrucks = async () => {
      try {
        const trucksRef = ref(database, 'trucks');
        const snapshot = await get(trucksRef);

        if (snapshot.exists()) {
          const trucksData = [];
          const data = snapshot.val();

          for (const [key, truck] of Object.entries(data)) {
            if (truck.vehicleType === 'compact') {
              trucksData.push({ ...truck, id: key });
            }
          }

          setTrucks(trucksData);
        } else {
          console.log("No compact trucks available");
        }
      } catch (error) {
        console.error("Error fetching compact trucks:", error);
      }
    };

    fetchTrucks();
  }, []);

  const handleDelete = async (id) => {
    try {
      const truckRef = ref(database, `trucks/${id}`);
      await remove(truckRef);
      setTrucks(prevTrucks => prevTrucks.filter(truck => truck.id !== id));
      console.log(`Truck with ID: ${id} deleted successfully.`);
    } catch (error) {
      console.error('Error deleting truck:', error);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <AppNavbar />
      <div className="car-container">
        {trucks.length > 0 ? (
          trucks.map(truck => (
            <Card key={truck.id} className="car-card mb-4">
              <Card.Img variant="top" src={truck.imageUrl} alt={truck.model} className="car-image" />
              <Card.Body>
                <Card.Title>{truck.model}</Card.Title>
                <Card.Text>
                  <strong>Description:</strong> {truck.description}<br />
                  <strong>Transmission:</strong> {truck.transmission || "N/A"}<br />
                  <strong>Year:</strong> {truck.year}<br />
                  <strong>Vehicle Type:</strong> {truck.vehicleType}
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
                      onClick={() => handleDelete(truck.id)}
                    >
                      Delete
                    </Button>
                  )}
                </div>
              </Card.Body>
            </Card>
          ))
        ) : (
          <div>No data available for compact trucks.</div>
        )}
      </div>
    </div>
  );
};

export default Compact;
