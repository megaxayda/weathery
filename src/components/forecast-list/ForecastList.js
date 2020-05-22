import React, { Suspense, lazy } from 'react';
import Row from 'react-bootstrap/Row';
import PropTypes from 'prop-types';

const ForecastItem = lazy(() => import('./ForecastItem'));

function ForecastList({ forecastData }) {
  if (forecastData.length > 0) {
    return (
      <Row className="justify-content-md-center">
        <Suspense fallback={<></>}>
          {forecastData.map((e, i) => (
            <ForecastItem key={i} date={e?.applicable_date} min={e?.min_temp} max={e?.max_temp}></ForecastItem>
          ))}
        </Suspense>
      </Row>
    );
  }

  return null;
}

export default ForecastList;

ForecastList.propTypes = {
  forecastData: PropTypes.arrayOf(PropTypes.object),
};
