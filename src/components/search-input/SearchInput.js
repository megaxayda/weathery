import React, { useRef, useEffect, useState } from 'react';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Spinner from 'react-bootstrap/Spinner';
import PropTypes from 'prop-types';
import Axios from 'axios';

import './searchInput.css';
import DropdownItem from './DropdownItem';
import useDebounce from 'hook/useDebounce';
import useOnClickOutside from 'hook/useOnClickOutside';
import { ERROR } from 'util/const';

function SearchInput({ onSelect }) {
  const searchInputRef = useRef();
  const dropdownRef = useRef();
  const isFirstRun = useRef(true);
  const [isOpenDropdown, setOpenDropdown] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [isSelecting, setSelecting] = useState(false);
  const [value, setValue] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const debouncedValue = useDebounce(value, 250);

  //Autofocus
  useEffect(() => {
    searchInputRef.current.focus();
  }, []);

  useOnClickOutside(dropdownRef, () => setOpenDropdown(false));

  //Call API search city with debouncedValue
  useEffect(() => {
    //Ignore did mount
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }

    //Ignore when selecting from dropdown
    if (isSelecting) {
      setSelecting(false);
      return;
    }

    //Ignore when value === ""
    if (value === '') {
      setSearchResult([]);
      return;
    }

    const callSearchCityAPI = async () => {
      try {
        setLoading(true);
        const res = await Axios.get(
          `https://dry-anchorage-71125.herokuapp.com/https://www.metaweather.com/api/location/search/?query=${debouncedValue}`
        );
        setLoading(false);
        setSearchResult(res?.data.slice(0, 10));
        setOpenDropdown(true);
      } catch (error) {
        console.log(error.status);
        setLoading(false);
        setSearchResult([]);
        setOpenDropdown(false);
        alert(ERROR.CITY);
      }
    };

    callSearchCityAPI();
  }, [debouncedValue]);

  const onChange = (e) => {
    setOpenDropdown(false);
    setValue(e?.target?.value);
  };

  const onSelectCity = (title, value) => {
    setOpenDropdown(false);
    setValue(title);
    setSelecting(true);
    onSelect(value);
  };

  return (
    <Row className="justify-content-md-center mb-5 mt-5">
      <Col xs lg="6">
        <InputGroup className="mb-0">
          <FormControl ref={searchInputRef} placeholder="Search city" aria-label="Search" value={value} onChange={onChange} />
          {isLoading && <Spinner animation="border" role="status"></Spinner>}
        </InputGroup>

        {isOpenDropdown && searchResult.length > 0 && (
          <div className="custom_dropdown" ref={dropdownRef}>
            {searchResult.map((e, i) => (
              <DropdownItem key={i} title={e?.title} value={e?.woeid} onSelect={onSelectCity}></DropdownItem>
            ))}
          </div>
        )}
      </Col>
    </Row>
  );
}

export default SearchInput;

SearchInput.propTypes = {
  onSelect: PropTypes.func.isRequired,
};
