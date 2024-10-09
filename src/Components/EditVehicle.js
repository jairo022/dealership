import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { db } from '../fireBaseConfig';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { Button, Form, Card } from 'react-bootstrap';

const EditVehicle = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [carData, setCarData] = useState({
    model: '',
    description: '',
    transmission: '',
    year: '',
    vehicleType: '',
    imageUrl: ''
  });

  useEffect(() => {
    const fetchCarData = async () => {
      const carDocRef = doc(db, 'cars', id);
      const carDoc = await getDoc(carDocRef);
      if (carDoc.exists()) {
        setCarData(carDoc.data());
      }
    };
    fetchCarData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCarData({ ...carData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const carDocRef = doc(db, 'cars', id);
    await updateDoc(carDocRef, carData);
    navigate('/cars/sedan'); // Redirect back to the Sedan page
  };

  return (
    <div>
      <h2>Edit Vehicle</h2>
      <Card>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formModel">
              <Form.Label>Model</Form.Label>
              <Form.Control
                type="text"
                name="model"
                value={carData.model}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                name="description"
                value={carData.description}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formTransmission">
              <Form.Label>Transmission</Form.Label>
              <Form.Control
                type="text"
                name="transmission"
                value={carData.transmission}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formYear">
              <Form.Label>Year</Form.Label>
              <Form.Control
                type="number"
                name="year"
                value={carData.year}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formVehicleType">
              <Form.Label>Vehicle Type</Form.Label>
              <Form.Control
                type="text"
                name="vehicleType"
                value={carData.vehicleType}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formImageUrl">
              <Form.Label>Image URL</Form.Label>
              <Form.Control
                type="text"
                name="imageUrl"
                value={carData.imageUrl}
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
