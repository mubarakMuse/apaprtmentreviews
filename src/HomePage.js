// HomePage.js
import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Container } from 'react-bootstrap';
import spinningImage from './rms-logo.png';
import './styles.css';

function HomePage() {
  return (
    <Container className="d-flex flex-column align-items-center justify-content-center" style={{ minHeight: '80vh' }}>
      <img src={spinningImage} alt="Spinning" width="300" height="200" className="mb-4" />

      <h4 className="text-center font-weight-bold mb-4">#1 Apartment Review Database</h4>
      <div className="d-flex flex-column align-items-center">
        <Button as={Link} to="/submit" variant="primary" className="mb-3">
          Rate Your Apartment
        </Button>
        <Button as={Link} to="/search" variant="secondary">
          Find Apartment Reviews
        </Button>
      </div>
    </Container>
  );
}

export default HomePage;
