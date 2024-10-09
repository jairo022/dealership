// UserProfile.js
import React from 'react';
import { Button, Form } from 'react-bootstrap';

const UserProfile = () => {
  return (
    <div className="profile-container">
      <h2>Your Profile</h2>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Company Name:</Form.Label>
          <Form.Control type="text" defaultValue="Your Company" />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Phone Number:</Form.Label>
          <Form.Control type="text" defaultValue="123-456-7890" />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Address:</Form.Label>
          <Form.Control type="text" defaultValue="123 Street, City" />
        </Form.Group>
        <Button type="submit">Update Profile</Button>
      </Form>
    </div>
  );
};

export default UserProfile;
