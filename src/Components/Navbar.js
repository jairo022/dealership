import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, NavDropdown, Button } from 'react-bootstrap';
import { auth } from '../fireBaseConfig'; // Import Firebase auth
import { onAuthStateChanged, signOut } from 'firebase/auth'; // Import signOut
import { FaUserCircle } from 'react-icons/fa'; // Import user icon
import './Navbar.css'; // Import the CSS file

const AppNavbar = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe(); // Cleanup subscription on unmount
  }, []);

  const handleSignOut = () => {
    signOut(auth);
  };

  return (
    <Navbar variant="dark" expand="lg" className="navbar">
      <Navbar.Brand as={Link} to="/home" className="navbar-logo">WHEELS</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <NavDropdown title="Cars" id="cars-dropdown">
            <NavDropdown.Item as={Link} to="/cars/sedan">Sedans</NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/cars/suv">SUVs</NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/cars/coupe">Coupes</NavDropdown.Item>
          </NavDropdown>
          <NavDropdown title="Motorcycles" id="motorcycles-dropdown">
            <NavDropdown.Item as={Link} to="/motorcycles/sport">Sports</NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/motorcycles/cruiser">Cruisers</NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/motorcycles/touring">Touring</NavDropdown.Item>
          </NavDropdown>
          <NavDropdown title="Trucks" id="trucks-dropdown">
            <NavDropdown.Item as={Link} to="/trucks/compact">Compact</NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/trucks/midsize">MidSize</NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/trucks/fullsize">FullSize</NavDropdown.Item>
          </NavDropdown>
          <Nav.Link as={Link} to="/about">About</Nav.Link>
          <Nav.Link as={Link} to="/add-vehicle">Add Vehicle</Nav.Link>
        </Nav>
        <Nav className="d-flex align-items-center">
          {user ? (
            <>
              <FaUserCircle size={30} className="user-icon" />
              <span className="text-light ms-2">{user.displayName?.split(' ')[0]}</span>
              <Button variant="outline-light" className="ms-3" onClick={handleSignOut}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Nav.Item className="ml-2">
                <Button as={Link} to="/login" variant="outline-light">Login</Button>
              </Nav.Item>
              <Nav.Item className="ml-2">
                <Button as={Link} to="/signup" variant="primary">Signup</Button>
              </Nav.Item>
            </>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default AppNavbar;
