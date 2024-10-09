// SignUp.js
import React, { useState } from 'react';
import { Button, Form, Card } from 'react-bootstrap';
import { auth, db } from '../fireBaseConfig'; // Import Firestore
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore'; // Import Firestore functions
import { useNavigate } from 'react-router-dom';
import './SignUp.css'; // Import the CSS file

const SignUp = () => {
  const [formData, setFormData] = useState({
    userType: 'normal', // Default to normal user
    fullName: '',
    phoneNumber: '',
    email: '',
    password: '',
    confirmPassword: '',
    businessName: '',
    businessPhone: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleUserTypeChange = (type) => {
    setFormData({ ...formData, userType: type });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password, userType, fullName, phoneNumber, businessName, businessPhone } = formData;

    if (password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      // Create user
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Save user data to Firestore
      const userDocRef = doc(db, 'users', user.uid);
      await setDoc(userDocRef, {
        userType,
        email,
        fullName: userType === 'normal' ? fullName : businessName,
        phoneNumber: userType === 'normal' ? phoneNumber : businessPhone,
      });

      // Automatically sign in the user
      await signInWithEmailAndPassword(auth, email, password);

      // Redirect to home page
      navigate('/home');
    } catch (error) {
      console.error('Error signing up:', error.message);
    }
  };

  return (
    <div className="signup-container">
      <Card className="signup-card">
        <Card.Body>
          <h2 className="text-center mb-4">Sign Up</h2>
          <div className="user-type-buttons mb-3">
            <Button
              variant={formData.userType === 'normal' ? 'primary' : 'secondary'}
              onClick={() => handleUserTypeChange('normal')}
            >
              Normal User
            </Button>
            <Button
              variant={formData.userType === 'business' ? 'primary' : 'secondary'}
              onClick={() => handleUserTypeChange('business')}
            >
              Business User
            </Button>
          </div>
          <Form onSubmit={handleSubmit}>
            {formData.userType === 'normal' ? (
              <>
                <Form.Group className="mb-3">
                  <Form.Label>Full Name:</Form.Label>
                  <Form.Control
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Phone Number:</Form.Label>
                  <Form.Control
                    type="text"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    placeholder="Enter your phone number"
                    required
                  />
                </Form.Group>
              </>
            ) : (
              <>
                <Form.Group className="mb-3">
                  <Form.Label>Business Name:</Form.Label>
                  <Form.Control
                    type="text"
                    name="businessName"
                    value={formData.businessName}
                    onChange={handleChange}
                    placeholder="Enter your business name"
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Business Phone Number:</Form.Label>
                  <Form.Control
                    type="text"
                    name="businessPhone"
                    value={formData.businessPhone}
                    onChange={handleChange}
                    placeholder="Enter your business phone number"
                    required
                  />
                </Form.Group>
              </>
            )}
            <Form.Group className="mb-3">
              <Form.Label>Email:</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email address"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password:</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Create a password (min. 8 characters)"
                required
                minLength="8"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Confirm Password:</Form.Label>
              <Form.Control
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Re-enter your password"
                required
              />
            </Form.Group>
            <Button type="submit" className="w-100" variant="primary">Sign Up</Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default SignUp;
