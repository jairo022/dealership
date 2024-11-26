import React, { useState, useEffect } from 'react';
import { Button, Form, Card } from 'react-bootstrap';
import { auth } from '../fireBaseConfig'; // Adjust the import path as needed
import { signInWithEmailAndPassword, browserLocalPersistence, browserSessionPersistence } from 'firebase/auth'; // Import both persistence methods
import { useNavigate } from 'react-router-dom';
import './Login.css'; // Import your CSS file

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false); // State for "Remember Me"
  const [errorMessage, setErrorMessage] = useState(''); // State for error message
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(''); // Clear any previous error message

    try {
      // Set Firebase Auth persistence based on "Remember Me" checkbox
      if (rememberMe) {
        await auth.setPersistence(browserLocalPersistence); // Persist session in localStorage for "Remember Me"
      } else {
        await auth.setPersistence(browserSessionPersistence); // Use session storage for "Don't Remember Me"
      }

      // Sign in with email and password
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/home');
    } catch (error) {
      console.error('Error logging in:', error);
      setErrorMessage(error.message); // Set error message to display to user
    }
  };

  // Check if email is saved in local storage on component mount
  useEffect(() => {
    const savedEmail = localStorage.getItem('email');
    if (savedEmail) {
      setEmail(savedEmail);
      setRememberMe(true); // Set "Remember Me" to true if an email is found
    }
  }, []);

  return (
    <div className="login-container">
      <Card className="login-card">
        <Card.Body>
          <h2 className="text-center mb-4">Log In</h2>
          <Form onSubmit={handleSubmit}>
            {errorMessage && <div className="alert alert-danger">{errorMessage}</div>} {/* Display error message */}
            <Form.Group className="mb-3">
              <Form.Label>Email:</Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password:</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Check
                type="checkbox"
                label="Remember Me"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
            </Form.Group>
            <Button type="submit" className="w-100" variant="primary">Log In</Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Login;
