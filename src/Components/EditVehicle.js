import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { database } from '../fireBaseConfig'; // Ensure this points to your Firestore instance
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { Button, Form, Card, Alert } from 'react-bootstrap';

const EditVehicle = () => {
  const { id, vehicleType } = useParams(); // Get vehicle type from URL
  const navigate = useNavigate();
  const [vehicleData, setVehicleData] = useState({
    model: '',
    description: '',
    transmission: '',
    year: '',
    imageUrl: ''
  });
  const [error, setError] = useState(null); // For error handling
  const [loading, setLoading] = useState(true); // For loading state

  useEffect(() => {
    const fetchVehicleData = async () => {
      try {
        // Dynamically get the correct collection based on vehicleType
        const vehicleDocRef = doc(database, vehicleType, id); // vehicleType could be 'cars', 'motorcycles', 'trucks'
        const vehicleDoc = await getDoc(vehicleDocRef);
        if (vehicleDoc.exists()) {
          setVehicleData(vehicleDoc.data());
        } else {
          setError('Vehicle not found.');
        }
      } catch (err) {
        setError('Error fetching vehicle data.');
      } finally {
        setLoading(false);
      }
    };
    fetchVehicleData();
  }, [id, vehicleType]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVehicleData({ ...vehicleData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Dynamically get the correct collection based on vehicleType
      const vehicleDocRef = doc(database, vehicleType, id); // vehicleType could be 'cars', 'motorcycles', 'trucks'
      await updateDoc(vehicleDocRef, vehicleData);
      // Redirect back to the appropriate vehicle type page
      navigate(`/${vehicleType}/${vehicleData.model.toLowerCase()}`); // Update redirect URL dynamically
    } catch (err) {
      setError('Failed to update the vehicle.');
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h2>Edit Vehicle</h2>
      {error && <Alert variant="danger">{error}</Alert>} {/* Show error messages */}
      <Card>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formModel">
              <Form.Label>Model</Form.Label>
              <Form.Control
                type="text"
                name="model"
                value={vehicleData.model}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                name="description"
                value={vehicleData.description}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formTransmission">
              <Form.Label>Transmission</Form.Label>
              <Form.Control
                type="text"
                name="transmission"
                value={vehicleData.transmission}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formYear">
              <Form.Label>Year</Form.Label>
              <Form.Control
                type="number"
                name="year"
                value={vehicleData.year}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formImageUrl">
              <Form.Label>Image URL</Form.Label>
              <Form.Control
                type="text"
                name="imageUrl"
                value={vehicleData.imageUrl}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit">Update Vehicle</Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default EditVehicle;
