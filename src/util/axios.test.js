import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import { instance, searchCity, getFiveDayForecast } from './axios';

var mock = new MockAdapter(instance);

test('search wrong city', async () => {
  const data = [];

  mock.onGet('/api/location/search/?query=ascasc').reply(200, data);

  const res = await searchCity('ascasc');
  expect(res).toEqual(data);
});

test('search 1 city', async () => {
  const data = [{ title: 'Tokyo', location_type: 'City', woeid: 1118370, latt_long: '35.670479,139.740921' }];

  mock.onGet('/api/location/search/?query=tokyo').reply(200, data);

  const res = await searchCity('tokyo');
  expect(res).toEqual(data);
});

test('search 10 cities', async () => {
  const data = [
    { title: 'San Francisco', location_type: 'City', woeid: 2487956, latt_long: '37.777119, -122.41964' },
    { title: 'San Diego', location_type: 'City', woeid: 2487889, latt_long: '32.715691,-117.161720' },
    { title: 'San Jose', location_type: 'City', woeid: 2488042, latt_long: '37.338581,-121.885567' },
    { title: 'San Antonio', location_type: 'City', woeid: 2487796, latt_long: '29.424580,-98.494614' },
    { title: 'Santa Cruz', location_type: 'City', woeid: 2488853, latt_long: '36.974018,-122.030952' },
    { title: 'Santiago', location_type: 'City', woeid: 349859, latt_long: '-33.463039,-70.647942' },
    { title: 'Santorini', location_type: 'City', woeid: 56558361, latt_long: '36.406651,25.456530' },
    { title: 'Santander', location_type: 'City', woeid: 773964, latt_long: '43.461498,-3.810010' },
    { title: 'Busan', location_type: 'City', woeid: 1132447, latt_long: '35.170429,128.999481' },
    { title: 'Santa Cruz de Tenerife', location_type: 'City', woeid: 773692, latt_long: '28.46163,-16.267059' },
  ];
  mock.onGet('/api/location/search/?query=san').reply(200, data);

  const res = await searchCity('san');
  expect(res).toEqual(data);
});

test('get forecast', async () => {
  const data = {
    consolidated_weather: [
      {
        id: 6065274061062144,
        weather_state_name: 'Clear',
        weather_state_abbr: 'c',
        wind_direction_compass: 'WSW',
        created: '2020-05-24T10:08:03.151930Z',
        applicable_date: '2020-05-24',
        min_temp: 9.985,
        max_temp: 23.165,
        the_temp: 20.445,
        wind_speed: 3.9676087818552985,
        wind_direction: 248.1102912563975,
        air_pressure: 1018.5,
        humidity: 57,
        visibility: 13.641893839974548,
        predictability: 68,
      },
      {
        id: 4619011486646272,
        weather_state_name: 'Clear',
        weather_state_abbr: 'c',
        wind_direction_compass: 'NW',
        created: '2020-05-24T10:08:06.217058Z',
        applicable_date: '2020-05-25',
        min_temp: 11.09,
        max_temp: 27.535,
        the_temp: 25.505,
        wind_speed: 3.391155089957316,
        wind_direction: 304.17334016849117,
        air_pressure: 1015.0,
        humidity: 51,
        visibility: 14.586378052175297,
        predictability: 68,
      },
      {
        id: 5649354192846848,
        weather_state_name: 'Clear',
        weather_state_abbr: 'c',
        wind_direction_compass: 'SW',
        created: '2020-05-24T10:08:09.836736Z',
        applicable_date: '2020-05-26',
        min_temp: 13.825,
        max_temp: 28.41,
        the_temp: 27.17,
        wind_speed: 3.7797075713194945,
        wind_direction: 223.15741642665054,
        air_pressure: 1015.5,
        humidity: 49,
        visibility: 14.197089000238606,
        predictability: 68,
      },
      {
        id: 5145196369018880,
        weather_state_name: 'Clear',
        weather_state_abbr: 'c',
        wind_direction_compass: 'WSW',
        created: '2020-05-24T10:08:12.620460Z',
        applicable_date: '2020-05-27',
        min_temp: 13.48,
        max_temp: 26.994999999999997,
        the_temp: 26.21,
        wind_speed: 3.317693892391103,
        wind_direction: 247.5,
        air_pressure: 1015.0,
        humidity: 52,
        visibility: 13.609582537978207,
        predictability: 68,
      },
      {
        id: 5596081767317504,
        weather_state_name: 'Light Cloud',
        weather_state_abbr: 'lc',
        wind_direction_compass: 'WSW',
        created: '2020-05-24T10:08:15.056379Z',
        applicable_date: '2020-05-28',
        min_temp: 13.195,
        max_temp: 26.185000000000002,
        the_temp: 24.27,
        wind_speed: 4.514333864357486,
        wind_direction: 240.9831863722266,
        air_pressure: 1013.5,
        humidity: 59,
        visibility: 12.386413346059015,
        predictability: 70,
      },
      {
        id: 6216754269257728,
        weather_state_name: 'Light Cloud',
        weather_state_abbr: 'lc',
        wind_direction_compass: 'W',
        created: '2020-05-24T10:08:18.244062Z',
        applicable_date: '2020-05-29',
        min_temp: 13.52,
        max_temp: 24.924999999999997,
        the_temp: 27.7,
        wind_speed: 5.339431718762427,
        wind_direction: 277.0,
        air_pressure: 1016.0,
        humidity: 61,
        visibility: 9.999726596675416,
        predictability: 70,
      },
    ],
  };

  const res = [
    {
      date: '2020-05-25',
      minTemp: 11.09,
      maxTemp: 27.535,
    },
    {
      date: '2020-05-26',
      minTemp: 13.825,
      maxTemp: 28.41,
    },
    {
      date: '2020-05-27',
      minTemp: 13.48,
      maxTemp: 26.994999999999997,
    },
    {
      date: '2020-05-28',
      minTemp: 13.195,
      maxTemp: 26.185000000000002,
    },
    {
      date: '2020-05-29',
      minTemp: 13.52,
      maxTemp: 24.924999999999997,
    },
  ];

  mock.onGet('api/location/2488853').reply(200, data);

  const testRes = await getFiveDayForecast('2488853');
  expect(testRes).toEqual(res);
});
