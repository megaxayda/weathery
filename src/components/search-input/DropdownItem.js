import React, { memo } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import PropTypes from 'prop-types';

function DropdownItem({ title, value, onSelect }) {
  const _onSelect = () => {
    onSelect(title, value);
  };

  return <Dropdown.Item onClick={_onSelect}>{title}</Dropdown.Item>;
}

export default memo(DropdownItem);

DropdownItem.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  onSelect: PropTypes.func.isRequired,
};
