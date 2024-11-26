import React, { useState, useEffect } from 'react';
import { Button, Form, Card } from 'react-bootstrap';
import { storage, database } from '../fireBaseConfig';
import { ref, push, set } from 'firebase/database'; // Realtime Database functions
import { getDownloadURL, ref as storageRef, uploadBytes } from 'firebase/storage';
import { useNavigate } from 'react-router-dom';

const AddVehicle = () => {
  const [formData, setFormData] = useState({
    category: 'motorcycle',  // Assuming you are adding motorcycles
    vehicleType: 'cruiser',  // Change based on the vehicle type
    model: '',
    year: '',
    transmission: '',
    description: '',
    image: null,
  });

  const [vehicleTypes, setVehicleTypes] = useState([]);
  const navigate = useNavigate();

  // Vehicle types based on category
  const vehicleTypeOptions = {
    car: ['sedan', 'suv', 'coupe'],
    motorcycle: ['cruiser', 'sport', 'touring'],
    truck: ['compact', 'midsize', 'fullsize'],
  };

  // Update vehicle types when category changes
  useEffect(() => {
    setVehicleTypes(vehicleTypeOptions[formData.category]);
    // Reset vehicle type if it’s not in the updated list
    if (!vehicleTypeOptions[formData.category].includes(formData.vehicleType)) {
      setFormData((prevData) => ({
        ...prevData,
        vehicleType: vehicleTypeOptions[formData.category][0], // Set to the first vehicle type
      }));
    }
  }, [formData.category]); // Re-run when category changes

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === 'category') {
      setFormData((prevData) => ({
        ...prevData,
        vehicleType: vehicleTypeOptions[value][0], // Reset to the first vehicle type for the new category
      }));
    }
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { category, vehicleType, model, year, transmission, description, image } = formData;

    if (!vehicleType) {
      alert("Please select a vehicle type.");
      return;
    }

    try {
      // Handle image upload to Firebase Storage
      const imageRef = storageRef(storage, `images/${category}/${image.name}`);
      await uploadBytes(imageRef, image);
      const imageUrl = await getDownloadURL(imageRef);

      // Create the vehicle data object
      const vehicleData = {
        vehicleType,
        model,
        year,
        description,
        imageUrl,
      };

      if (category !== 'motorcycle') {
        vehicleData.transmission = transmission;
      }

      // Reference the correct category in Realtime Database (cars, motorcycles, trucks)
      const vehicleRef = ref(database, `${category}s`);  // e.g., 'motorcycles', 'cars', 'trucks'
      const newVehicleRef = push(vehicleRef); // Create a new unique ID for the vehicle

      // Save the data to Realtime Database
      await set(newVehicleRef, vehicleData);

      // Navigate to the page after successful submission
      navigate(`/${category}s/${vehicleType}`);
    } catch (error) {
      console.error('Error adding vehicle:', error);
      alert("Error adding vehicle. Please try again.");
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
                <option value="motorcycle">Motorcycle</option>
                <option value="truck">Truck</option>
              </Form.Control>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Select Vehicle Type:</Form.Label>
              <Form.Control as="select" name="vehicleType" onChange={handleChange} value={formData.vehicleType}>
                {vehicleTypes.map((type) => (
                  <option key={type} value={type}>
                    {type.charAt(0).toUpperCase() + type.slice(1)} {/* Capitalize first letter */}
                  </option>
                ))}
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
