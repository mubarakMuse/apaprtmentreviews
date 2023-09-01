// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import ReviewList from './ReviewList';
import ReviewForm from './ReviewForm';
import HomePage from './HomePage';
import { Navbar, Nav } from 'react-bootstrap'; // Import Nav component
import logo from './rms-logo.png';

function App() {
  return (
    <Router>
      <Navbar bg="white" expand="lg">
        <Navbar.Brand as={Link} to="/">
          <img
            src={logo}
            width="100"
            height="50"
            className="d-inline-block align-top"
            alt="Review My Spot Logo"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link as={Link} to="/submit">Submit Review</Nav.Link>
            <Nav.Link as={Link} to="/search">Search Reviews</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/submit" element={<ReviewForm />} />
        <Route path="/search" element={<ReviewList />} />
      </Routes>
    </Router>
  );
}

export default App;
