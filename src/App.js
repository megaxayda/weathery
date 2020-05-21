import React, { useRef, useEffect } from 'react';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';

import './App.css';

import SearchInput from 'components/SearchInput';

function App() {
  return (
    <Container fluid>
      <h1 className="text-center">Weathery</h1>
      <SearchInput></SearchInput>
    </Container>
  );
}

export default App;
