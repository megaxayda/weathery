import React from 'react';
import Row from 'react-bootstrap/Row';
import PropTypes from 'prop-types';

import ForecastItem from './ForecastItem';

function ForecastList({ forecastData }) {
  if (Array.isArray(forecastData) && forecastData.length > 0) {
    return (
      <Row className="justify-content-md-center">
        {forecastData.map((e) => (
          <ForecastItem key={e.id} date={e?.applicable_date} min={e?.min_temp} max={e?.max_temp}></ForecastItem>
        ))}
      </Row>
    );
  }

  return null;
}

export default ForecastList;

ForecastList.propTypes = {
  forecastData: PropTypes.arrayOf(PropTypes.object),
};
