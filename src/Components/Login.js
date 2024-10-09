// Login.js
import React, { useState, useEffect } from 'react';
import { Button, Form, Card } from 'react-bootstrap';
import { auth } from '../fireBaseConfig';
import { signInWithEmailAndPassword, setPersistence, browserLocalPersistence, browserSessionPersistence } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { doc, getDoc, setDoc, getFirestore } from 'firebase/firestore'; // Firestore imports
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false); // State for remember me checkbox
  const navigate = useNavigate();

  // Firestore database instance
  const db = getFirestore();

  // Check Firestore for "Remember Me" preference on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      if (email) {
        try {
          const userDocRef = doc(db, 'users', email);
          const userDoc = await getDoc(userDocRef);

          if (userDoc.exists()) {
            const userData = userDoc.data();
            if (userData.rememberMe !== undefined) {
              setRememberMe(userData.rememberMe);
            }
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };

    fetchUserData();
  }, [email, db]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Set persistence based on the "Remember Me" value from Firestore or checkbox
      const persistenceType = rememberMe ? browserLocalPersistence : browserSessionPersistence;

      await setPersistence(auth, persistenceType);

      // Sign in with email and password
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Store or update the user's "Remember Me" preference in Firestore
      await setDoc(doc(db, 'users', user.uid), {
        email: user.email,
        lastLogin: new Date(),
        rememberMe: rememberMe, // Save the current state of "Remember Me"
      }, { merge: true });

      // Redirect to home page
      navigate('/home');
    } catch (error) {
      console.error('Error logging in:', error.message);
    }
  };

  return (
    <div className="login-container">
      <Card className="login-card">
        <Card.Body>
          <h2 className="text-center mb-4">Login</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Email:</Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
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
            <Form.Group className="mb-3 d-flex align-items-center">
              <Form.Check
                type="checkbox"
                label="Remember me"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
              />
            </Form.Group>
            <Button type="submit" className="w-100" variant="primary">Login</Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Login;
