import React, { useRef, useEffect, useState, Suspense, lazy } from 'react';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Spinner from 'react-bootstrap/Spinner';
import PropTypes from 'prop-types';

import './searchInput.css';
import useDebounce from 'hook/useDebounce';
import useOnClickOutside from 'hook/useOnClickOutside';
import { ERROR } from 'util/const';
import { cancelSearchCity, searchCity } from 'util/axios';

const DropdownItem = lazy(() => import('./DropdownItem'));

function SearchInput({ onSelect }) {
  const searchInputRef = useRef();
  const dropdownRef = useRef();
  const isFirstRun = useRef(true);
  const isSelecting = useRef(false);
  const [isOpenDropdown, setOpenDropdown] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const debouncedValue = useDebounce(searchValue, 250);

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
    if (isSelecting.current) {
      isSelecting.current = false;
      return;
    }

    //Ignore when searchValue === ""
    if (debouncedValue === '') {
      setSearchResult([]);
      return;
    }

    const callSearchCityAPI = async () => {
      try {
        setLoading(true);
        if (cancelSearchCity !== undefined) {
          cancelSearchCity('cancel');
        }
        const res = await searchCity(debouncedValue);
        setLoading(false);

        //get first {LIMIT: number} of array
        setSearchResult(res);

        setOpenDropdown(true);
      } catch (error) {
        if (error?.message === 'cancel') {
          return;
        }
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
    setSearchValue(e?.target?.value);
  };

  const onSelectCity = (title, value) => {
    isSelecting.current = true;
    setOpenDropdown(false);
    setSearchValue(title);
    onSelect(value);
  };

  return (
    <Row className="justify-content-md-center mb-5 mt-5">
      <Col xs lg="6">
        <InputGroup className="mb-0">
          <FormControl ref={searchInputRef} placeholder="Search city" aria-label="Search" value={searchValue} onChange={onChange} />
          {isLoading && <Spinner animation="border" role="status"></Spinner>}
        </InputGroup>

        <Suspense fallback={<></>}>
          {isOpenDropdown && searchResult.length > 0 && (
            <div className="custom_dropdown" ref={dropdownRef}>
              {searchResult.map((e, i) => (
                <DropdownItem key={i} title={e?.title} value={e?.woeid} onSelect={onSelectCity}></DropdownItem>
              ))}
            </div>
          )}
        </Suspense>
      </Col>
    </Row>
  );
}

export default SearchInput;

SearchInput.propTypes = {
  onSelect: PropTypes.func.isRequired,
};
