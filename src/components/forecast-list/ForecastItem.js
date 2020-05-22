import React, { memo } from 'react';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import PropTypes from 'prop-types';

import './forecastItem.css';

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

function ForecastItem({ date, min, max }) {
  return (
    <Card className="custom_card">
      <Card.Body>
        <Card.Title>{days[new Date(date).getDay()]}</Card.Title>
        <Card.Text>Min: {min}</Card.Text>
        <Card.Text>Max: {max}</Card.Text>
      </Card.Body>
    </Card>
  );
}

export default memo(ForecastItem);

ForecastItem.propTypes = {
  date: PropTypes.string.isRequired,
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
};
