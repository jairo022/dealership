import React, { useState } from 'react';
import { Button, Form, Card } from 'react-bootstrap';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { storage } from '../fireBaseConfig'; // Make sure this path is correct
import { ref, uploadBytes } from 'firebase/storage';
import { useNavigate } from 'react-router-dom';

const AddVehicle = () => {
  const [formData, setFormData] = useState({
    category: 'car', // Default vehicle type
    vehicleType: 'sedan', // Default vehicle type
    model: '',
    year: '',
    transmission: '',
    description: '',
    image: null,
  });

  const navigate = useNavigate();
  const db = getFirestore();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const {category, vehicleType, model, year, transmission, description, image } = formData;

    try {
      // Upload image to Firebase Storage
      const imageRef = ref(storage, `images/${image.name}`);
      await uploadBytes(imageRef, image);

      // Create a new vehicle document in Firestore
      const vehicleData = {
        vehicleType,
        model,
        year,
        transmission,
        description,
        imageUrl: imageRef.fullPath, // Store the path of the uploaded image
      };

      await addDoc(collection(db, `${category}s`), vehicleData); // Save to "cars", "bikes", or "trucks" collection

      // Redirect to the corresponding listing page
      navigate(`/${category}s/${vehicleType}`);
    } catch (error) {
      console.error('Error adding vehicle:', error);
    }
  };

  return (
    <div className="add-vehicle-container">
      <Card className="add-vehicle-card">
        <Card.Body>
          <h2 className="text-center mb-4">Add New Vehicle</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Select Category:</Form.Label>
              <Form.Control as="select" name="category" onChange={handleChange} value={formData.category}>
                <option value="car">Car</option>
                <option value="bike">Bike</option>
                <option value="truck">Truck</option>
              </Form.Control>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Select Vehicle type:</Form.Label>
              <Form.Control as="select" name="vehicleType" onChange={handleChange} value={formData.vehicleType}>
                <option value="sedan">Sedan</option>
                <option value="coupe">Coupe</option>
                <option value="suv">SUV</option>
              </Form.Control>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Model:</Form.Label>
              <Form.Control
                type="text"
                name="model"
                value={formData.model}
                onChange={handleChange}
                placeholder="Enter vehicle model"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Year:</Form.Label>
              <Form.Control
                type="number"
                name="year"
                value={formData.year}
                onChange={handleChange}
                placeholder="Enter vehicle year"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Transmission:</Form.Label>
              <Form.Control
                type="text"
                name="transmission"
                value={formData.transmission}
                onChange={handleChange}
                placeholder="Enter transmission type"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description:</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Enter vehicle description"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Upload Image:</Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                required
              />
            </Form.Group>
            <Button type="submit" className="w-100" variant="primary">Upload Vehicle</Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default AddVehicle;
