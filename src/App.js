import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import ReviewList from './ReviewList';
import ReviewForm from './ReviewForm';
import HomePage from './HomePage'; // Import the HomePage component
import { Navbar } from 'react-bootstrap';
import spinningImage from './rms-logo.png'; // Replace with your spinning image

function App() {
  return (
    <Router>
      <Navbar bg="white" expand="lg">
        <Navbar.Brand as={Link} to="/">
          <img
            src={spinningImage} // Replace with the actual path to your logo image
            width="100"
            height="50"
            className="d-inline-block align-top"
            alt="Review My Spot Logo"
          />
        </Navbar.Brand>
        {/* ... Rest of the Navbar code ... */}
      </Navbar>
      <Routes>
        <Route path="/" element={<HomePage />} /> {/* Set the HomePage as the root route */}
        <Route path="/submit" element={<ReviewForm />} />
        <Route path="/search" element={<ReviewList />} />
      </Routes>
    </Router>
  );
}

export default App;
