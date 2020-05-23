import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import PropTypes from 'prop-types';
import sinon from 'sinon';
import renderer from 'react-test-renderer';

import expectMissingProp from 'util/expectMissingProp';
import DropdownItem from './DropdownItem';

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
    render(<DropdownItem />, container);
  });

  sinon.assert.callCount(console.error, 3);
  expectMissingProp('title', 'DropdownItem');
  expectMissingProp('value', 'DropdownItem');
  expectMissingProp('onSelect', 'DropdownItem');
});

test('render DropdownItem', () => {
  const tree = renderer.create(<DropdownItem title={'Tokyo'} value={123} onSelect={() => {}} />).toJSON();
  expect(tree).toMatchSnapshot();
});
