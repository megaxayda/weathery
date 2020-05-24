import React from 'react';
import Row from 'react-bootstrap/Row';
import PropTypes from 'prop-types';

import ForecastItem from './ForecastItem';

function ForecastList({ forecastData }) {
  if (Array.isArray(forecastData) && forecastData.length > 0) {
    return (
      <Row className="justify-content-md-center">
        {forecastData.map((e, index) => (
          <ForecastItem key={index} date={e?.date} min={e?.minTemp} max={e?.maxTemp}></ForecastItem>
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
