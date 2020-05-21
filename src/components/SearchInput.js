import React, { useRef, useEffect, useState } from 'react';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import PropTypes from 'prop-types';
import useDebounce from 'hook/useDebounce';
import Axios from 'axios';

function SearchInput({ onSelect }) {
  const searchInputRef = useRef();
  const [value, setValue] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const debouncedValue = useDebounce(value, 300);

  //Autofocus
  useEffect(() => {
    searchInputRef.current.focus();
  }, []);

  //Call API search city with debouncedValue
  useEffect(() => {
    const callSearchCityAPI = async () => {
      try {
        const res = await Axios.get(`https://www.metaweather.com/api/location/search/?query=${debouncedValue}`, {
          headers: { 'Access-Control-Allow-Origin': '*' },
        });
        console.log(res);
        setSearchResult(res);
      } catch (error) {
        console.error(error);
      }
    };

    if (debouncedValue !== '') {
      callSearchCityAPI();
    }
  }, [debouncedValue]);

  const onChange = (e) => {
    setValue(e?.target?.value);
  };

  return (
    <Row className="justify-content-md-center">
      <Col xs lg="6">
        <InputGroup className="mb-0">
          <FormControl ref={searchInputRef} placeholder="Search city" aria-label="Search" value={value} onChange={onChange} />
        </InputGroup>
        {searchResult.length > 0 &&
          searchResult.map((e, i) => (
            <Dropdown.Item key={i} eventKey={i}>
              {e?.title}
            </Dropdown.Item>
          ))}
      </Col>
    </Row>
  );
}

export default SearchInput;

SearchInput.propTypes = {
  onSelect: PropTypes.func.isRequired,
};
