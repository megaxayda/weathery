import React, { useRef, useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';

import './App.css';
import { ERROR } from 'util/const';
import SearchInput from 'components/search-input/SearchInput';
import ForecastList from 'components/forecast-list/ForecastList';

function App() {
  const isFirstRun = useRef(true);
  const [cityId, setCityId] = useState('');
  const [fivedayData, setFiveDayData] = useState([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    //Ignore did mount
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }

    //Ignore when value === ""
    if (cityId === '') {
      setFiveDayData([]);
      return;
    }

    const callGetFiveDayAPI = async () => {
      try {
        setLoading(true);
        const res = await Axios.get(`https://dry-anchorage-71125.herokuapp.com/https://www.metaweather.com/api/location/${cityId}/`);
        setLoading(false);
        setFiveDayData(res?.data?.consolidated_weather.slice(1, 6));
      } catch (error) {
        console.log(error);
        setLoading(false);
        setFiveDayData([]);
        alert(ERROR.FORECAST);
      }
    };

    callGetFiveDayAPI();
  }, [cityId]);

  const onSelect = (cityId) => {
    console.log(cityId);
    setCityId(cityId);
  };

  return (
    <Container fluid>
      <h1 className="text-center">Weathery</h1>
      <SearchInput onSelect={onSelect}></SearchInput>
      {isLoading && (
        <Row className="justify-content-md-center">
          <Spinner className="text-center" animation="border" role="status"></Spinner>
        </Row>
      )}
      <ForecastList forecastData={fivedayData}></ForecastList>
    </Container>
  );
}

export default App;
