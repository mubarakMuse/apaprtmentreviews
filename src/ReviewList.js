import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Button } from 'react-bootstrap';
import { Typeahead } from 'react-bootstrap-typeahead';
import ReviewItem from './ReviewItem';
import apartments from './apartments';
import { Link } from 'react-router-dom';

function ReviewList() {
  const [reviews, setReviews] = useState([]);
  const [selectedApartment, setSelectedApartment] = useState('');
  const [filteredReviews, setFilteredReviews] = useState([]);
  const airtableAPIKey = process.env.REACT_APP_AIRTABLE_API_KEY;
  const airtableBaseId = process.env.REACT_APP_AIRTABLE_BASE_ID;

  const url = `https://api.airtable.com/v0/${airtableBaseId}/Reviews`;

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(url, {
          headers: { Authorization: `Bearer ${airtableAPIKey}` },
        });

        const fetchedReviews = response.data.records.map((record) => record);
        setReviews(fetchedReviews);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };

    fetchReviews();
    const interval = setInterval(fetchReviews, 600000); // Refresh every 10 minutes

    return () => clearInterval(interval);
  }, [url, airtableAPIKey]);

  useEffect(() => {
    if (selectedApartment) {
      const filtered = reviews.filter(
        (review) => review.fields.Apartment.toLowerCase() === selectedApartment.toLowerCase()
      );
      setFilteredReviews(filtered);
    } else {
      setFilteredReviews([]); // Set to an empty array to clear the displayed reviews
    }
  }, [selectedApartment, reviews]);

  return (
    <Container className="d-flex flex-column align-items-center py-5">
      <h2 className="mb-4">Apartment Reviews</h2>
      <Typeahead
        id="apartment-search"
        labelKey="Apartment"
        options={apartments}
        placeholder="Search by apartment name"
        onChange={(selected) => setSelectedApartment(selected[0] || '')}
        className="w-75"
      />

      {filteredReviews.length === 0 && selectedApartment !== '' && (
        <p className="text-center">No matching reviews found.</p>
      )}

      {filteredReviews.map((review) => (
        <ReviewItem key={review.id} review={review} />
      ))}

      <Button as={Link} to="/" variant="secondary" className="mt-3">
        Go Back to Home Page
      </Button>
    </Container>
  );
}

export default ReviewList;
