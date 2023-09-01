import React from 'react';
import { Card } from 'react-bootstrap';

function ReviewItem({ review }) {
  return (
    <Card className="mt-4 w-75">
      <Card.Body>
        <Card.Text>
          <strong>Review:</strong> {review.fields.Review}
        </Card.Text>
        <Card.Text>
          <strong>Rating:</strong> {review.fields.Rating} out of 5
        </Card.Text>
        <Card.Text>
          <strong>Time:</strong> {new Date(review.createdTime).toLocaleString()}
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default ReviewItem;
