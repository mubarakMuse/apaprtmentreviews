// ReviewForm.js
import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import apartments from './apartments';


function ReviewForm() {
  const [apartment, setApartment] = useState('');
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState("");

  const airtableAPIKey = process.env.REACT_APP_AIRTABLE_API_KEY;
  const airtableBaseId = process.env.REACT_APP_AIRTABLE_BASE_ID;

  const airtableTable = 'Reviews';

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    try {
      const response = await axios.post(
        `https://api.airtable.com/v0/${airtableBaseId}/${airtableTable}`,
        {
          fields: {
            Apartment: apartment,
            Review: reviewText,
            Rating: rating,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${airtableAPIKey}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.status === 200) {
        console.log('Review submitted successfully:', response.data);
        // Optionally, you can navigate to a success page here

        // Navigate back to the home page
        navigate('/');
      }
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  };

  return (
    <Container>
      <h2 className="mt-4 mb-4">Submit a Review</h2>
      <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
          <Form.Label>Choose Apartment</Form.Label>
          <Form.Control
            as="select"
            value={apartment}
            onChange={(e) => setApartment(e.target.value)}
            required
          >
            <option value="">Select an apartment</option>
            {apartments.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Write Your Review</Form.Label>
          <Form.Control
            as="textarea"
            rows={4}
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            required // Mark this field as required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Rating</Form.Label>
          <Form.Control
            as="select"
            value={rating}
            onChange={(e) => setRating(parseInt(e.target.value))}
            required // Mark this field as required
          >
            <option value="">Select Rating</option>
            <option value={0}>0</option>
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
          </Form.Control>
        </Form.Group>
        <Button variant="success" type="submit">
          Submit Review
        </Button>
      </Form>
    </Container>
  );
}

export default ReviewForm;
