import React, { memo } from 'react';
import Row from 'react-bootstrap/Row';
import PropTypes from 'prop-types';

import ForecastItem from './ForecastItem';

function ForecastList({ forecastData }) {
  if (forecastData.length > 0) {
    return (
      <Row className="justify-content-md-center">
        {forecastData.map((e, i) => (
          <ForecastItem key={i} date={e?.applicable_date} min={e?.min_temp} max={e?.max_temp}></ForecastItem>
        ))}
      </Row>
    );
  }

  return null;
}

export default memo(ForecastList);

ForecastList.propTypes = {
  forecastData: PropTypes.arrayOf(PropTypes.object),
};
