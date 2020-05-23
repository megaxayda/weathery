import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import PropTypes from 'prop-types';
import sinon from 'sinon';
import renderer from 'react-test-renderer';

import expectMissingProp from 'util/expectMissingProp';
import SearchInput from './SearchInput';

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
    render(<SearchInput />, container);
  });

  sinon.assert.callCount(console.error, 1);
  expectMissingProp('onSelect', 'SearchInput');
});

test('render SearchInput', () => {
  const tree = renderer.create(<SearchInput onSelect={() => {}} />).toJSON();
  expect(tree).toMatchSnapshot();
});

//TODO
//test lazy component
