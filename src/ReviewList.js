import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Card } from 'react-bootstrap';
import { Typeahead } from 'react-bootstrap-typeahead';
import { useNavigate } from 'react-router-dom';
import ReviewItem from './ReviewItem';
import apartments from './apartments';

function ReviewList() {
  const [reviews, setReviews] = useState([]);
  const [selectedApartment, setSelectedApartment] = useState('');
  const [filteredReviews, setFilteredReviews] = useState([]);
  const navigate = useNavigate(); // React Router's navigate function
  const airtableAPIKey = process.env.REACT_APP_AIRTABLE_API_KEY;
  const airtableBaseId = process.env.REACT_APP_AIRTABLE_BASE_ID;

  const url = `https://api.airtable.com/v0/${airtableBaseId}/Reviews`;
  const headers = {
    Authorization: `Bearer ${airtableAPIKey}`,
  };

  useEffect(() => {
    axios
      .get(url, { headers })
      .then((response) => {
        const fetchedReviews = response.data.records.map((record) => record.fields);
        setReviews(fetchedReviews);
      })
      .catch((error) => {
        console.error('Error fetching reviews:', error);
      });
  }, []);

  useEffect(() => {
    if (selectedApartment) {
      const filtered = reviews.filter(
        (review) => review.Apartment.toLowerCase() === selectedApartment.toLowerCase()
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
        className="w-75" // Adjust the width as needed

      />
      {filteredReviews.length === 0 && selectedApartment !== '' && (
        <p className="text-center">No matching reviews found.</p>
      )}

      {filteredReviews.map((review) => (
        <ReviewItem key={review.id} review={review} />
      ))}

    </Container>
  );
}

export default ReviewList;
