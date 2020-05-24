import axios, { CancelToken } from 'axios';

import { BASE_URL, LIMIT } from './const';

// export const searchCitySource = CancelToken.source();

export const instance = axios.create({
  baseURL: BASE_URL,
  timeout: 60 * 3 * 1000,
});

export let cancelSearchCity;
export const searchCity = async (cityName) => {
  const res = await instance.get(`api/location/search/?query=${cityName}`, {
    cancelToken: new CancelToken(function executor(c) {
      cancelSearchCity = c;
    }),
  });
  return res?.data.slice(0, LIMIT);
};

export const getFiveDayForecast = async (cityId) => {
  const res = await instance.get(`api/location/${cityId}`);

  const data = res?.data?.consolidated_weather.slice(1, 6).map((e) => ({
    date: e.applicable_date,
    minTemp: e.min_temp,
    maxTemp: e.max_temp,
  }));
  //Get last 5 records in array
  return data;
};
