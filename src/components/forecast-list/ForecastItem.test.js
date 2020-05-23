import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import PropTypes from 'prop-types';
import sinon from 'sinon';
import renderer from 'react-test-renderer';

import expectMissingProp from 'util/expectMissingProp';
import ForecastItem from './ForecastItem';

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

test('check props type', () => {
  act(() => {
    render(<ForecastItem />, container);
  });

  sinon.assert.callCount(console.error, 3);
  expectMissingProp('date', 'ForecastItem');
  expectMissingProp('min', 'ForecastItem');
  expectMissingProp('max', 'ForecastItem');
});

test('render forecast card', () => {
  const tree = renderer.create(<ForecastItem date={'2020-05-22'} min={12} max={30} />).toJSON();
  expect(tree).toMatchSnapshot();
});
