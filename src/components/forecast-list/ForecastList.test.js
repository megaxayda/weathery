import React, { Suspense, lazy } from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import PropTypes from 'prop-types';
import sinon from 'sinon';
import renderer from 'react-test-renderer';

import ForecastList from './ForecastList';

let container = null;

beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement('div');
  document.body.appendChild(container);
  sinon.stub(console, 'error');
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
  console.error.restore();
  PropTypes.resetWarningCache();
});

const mockForecast = [
  {
    id: 6399584249053184,
    weather_state_name: 'Light Cloud',
    weather_state_abbr: 'lc',
    wind_direction_compass: 'WSW',
    created: '2020-05-23T03:28:33.327743Z',
    applicable_date: '2020-05-24',
    min_temp: 14.934999999999999,
    max_temp: 20.915,
    the_temp: 21.89,
    wind_speed: 5.2997064362920545,
    wind_direction: 247.9521003781387,
    air_pressure: 1011.5,
    humidity: 58,
    visibility: 15.705467569394735,
    predictability: 70,
  },
  {
    id: 6153087636996096,
    weather_state_name: 'Clear',
    weather_state_abbr: 'c',
    wind_direction_compass: 'W',
    created: '2020-05-23T03:28:36.809778Z',
    applicable_date: '2020-05-25',
    min_temp: 15.855,
    max_temp: 22.990000000000002,
    the_temp: 23.415,
    wind_speed: 4.809795090696996,
    wind_direction: 266.78683798264336,
    air_pressure: 1012.5,
    humidity: 54,
    visibility: 15.69459357353058,
    predictability: 68,
  },
  {
    id: 6683680766427136,
    weather_state_name: 'Clear',
    weather_state_abbr: 'c',
    wind_direction_compass: 'WNW',
    created: '2020-05-23T03:28:39.397818Z',
    applicable_date: '2020-05-26',
    min_temp: 17.1,
    max_temp: 25.31,
    the_temp: 24.26,
    wind_speed: 5.20754134544129,
    wind_direction: 286.5561857110155,
    air_pressure: 1012.0,
    humidity: 49,
    visibility: 16.01739590789788,
    predictability: 68,
  },
  {
    id: 5091931795226624,
    weather_state_name: 'Clear',
    weather_state_abbr: 'c',
    wind_direction_compass: 'NW',
    created: '2020-05-23T03:28:42.917527Z',
    applicable_date: '2020-05-27',
    min_temp: 18.02,
    max_temp: 26.72,
    the_temp: 25.37,
    wind_speed: 3.7782705002783743,
    wind_direction: 308.5,
    air_pressure: 1012.0,
    humidity: 43,
    visibility: 9.999726596675416,
    predictability: 68,
  },
  {
    id: 5091931795226624,
    weather_state_name: 'Clear',
    weather_state_abbr: 'c',
    wind_direction_compass: 'NW',
    created: '2020-05-23T03:28:42.917527Z',
    applicable_date: '2020-05-27',
    min_temp: 18.02,
    max_temp: 26.72,
    the_temp: 25.37,
    wind_speed: 3.7782705002783743,
    wind_direction: 308.5,
    air_pressure: 1012.0,
    humidity: 43,
    visibility: 9.999726596675416,
    predictability: 68,
  },
];

test('check props type', () => {
  act(() => {
    render(<ForecastList />, container);
  });

  act(() => {
    render(<ForecastList forecastData={'abc'} />, container);
  });

  act(() => {
    render(<ForecastList forecastData={123} />, container);
  });

  act(() => {
    render(<ForecastList forecastData={[]} />, container);
  });

  sinon.assert.callCount(console.error, 2);
});

test('render forecast list', () => {
  const tree = renderer.create(<ForecastList forecastData={mockForecast} />).toJSON();
  expect(tree).toMatchSnapshot();
});
