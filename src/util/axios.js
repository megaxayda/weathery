import axios from 'axios';
import { BASE_URL } from './const';

const instance = axios.create({
  baseURL: BASE_URL,
});

export const searchCity = (cityName) => instance.get(`api/location/search/?query=${cityName}`);
export const getFiveDayForecast = (cityId) => instance.get(`api/location/${cityId}`);
