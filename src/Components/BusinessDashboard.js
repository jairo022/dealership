// BusinessDashboard.js
import React, { useState } from 'react';
import { Button, Form, Card } from 'react-bootstrap';
import './BusinessDashboard.css'; // Import CSS

const BusinessDashboard = () => {
  const [postData, setPostData] = useState({
    type: 'car', // Default type
    model: '',
    year: '',
    transmission: '',
    description: '',
    image: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPostData({ ...postData, [name]: value });
  };

  const handleImageChange = (e) => {
    setPostData({ ...postData, image: e.target.files[0] });
  };

  const handlePostSubmit = (e) => {
    e.preventDefault();
    // Handle post submission logic
    console.log('Post submitted:', postData);
  };

  return (
    <div className="dashboard-container">
      <h2>Business Dashboard</h2>
      <Form onSubmit={handlePostSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Select Type:</Form.Label>
          <Form.Select
            name="type"
            value={postData.type}
            onChange={handleChange}
          >
            <option value="car">Car</option>
            <option value="bike">Bike</option>
            <option value="truck">Truck</option>
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Model:</Form.Label>
          <Form.Control
            type="text"
            name="model"
            value={postData.model}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Year:</Form.Label>
          <Form.Control
            type="number"
            name="year"
            value={postData.year}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Transmission:</Form.Label>
          <Form.Control
            type="text"
            name="transmission"
            value={postData.transmission}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Description:</Form.Label>
          <Form.Control
            as="textarea"
            name="description"
            value={postData.description}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Upload Image:</Form.Label>
          <Form.Control
            type="file"
            name="image"
            onChange={handleImageChange}
            required
          />
        </Form.Group>
        <Button type="submit" className="w-100">Add Post</Button>
      </Form>

      {/* Section to display posts */}
      <div className="posts-section">
        <h3>Your Posts</h3>
        {/* Map through posts and display them */}
        {/* Example of a post card */}
        <Card className="post-card">
          <Card.Img variant="top" src="path/to/image.jpg" />
          <Card.Body>
            <Card.Title>Model Name</Card.Title>
            <Card.Text>Description of the vehicle.</Card.Text>
            <Button variant="primary">Edit</Button>
            <Button variant="danger">Delete</Button>
          </Card.Body>
        </Card>
        {/* Display message if no posts */}
        {/* <p>You haven't posted anything yet.</p> */}
      </div>
    </div>
  );
};

export default BusinessDashboard;
