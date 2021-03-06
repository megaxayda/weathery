import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import PropTypes from 'prop-types';
import sinon from 'sinon';
import renderer from 'react-test-renderer';

import App from './App';

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

test('render App', () => {
  const tree = renderer.create(<App />).toJSON();
  expect(tree).toMatchSnapshot();
});

//TODO
//test lazy component
