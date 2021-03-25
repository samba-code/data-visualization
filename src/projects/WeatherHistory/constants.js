import { parseISO, getYear } from "date-fns";
import { range } from "lodash";

export const weatherMeasures = {
  "Average temperature": {
    label: "Average temperature",
    accessor: (d) => Number(d.temp),
    format: (d) => `${d}°C`,
    default: true,
  },
  "Maximum temperature": {
    label: "Maximum temperature",
    format: (d) => `${d}°C`,
    accessor: (d) => Number(d.tempMax),
  },
  "Minimum temperature": {
    label: "Minimum temperature",
    format: (d) => `${d}°C`,
    accessor: (d) => Number(d.tempMin),
  },
  Rain: {
    label: "Rain",
    format: (d) => `${d}mm`,
    accessor: (d) => Number(d.rain),
  },
  Snow: {
    label: "Snow",
    format: (d) => `${d}mm`,
    accessor: (d) => Number(d.snow),
  },
  "Wind speed": {
    label: "Wind speed",
    format: (d) => `${d}m/s`,
    accessor: (d) => Number(d.wind),
  },
  Humidity: {
    label: "Humidity",
    format: (d) => `${d}%`,
    accessor: (d) => Number(d.humidity),
  },
  Pressure: {
    label: "Pressure",
    format: (d) => `${d} hPa`,
    accessor: (d) => Number(d.pressure),
  },
  Clouds: {
    label: "Clouds",
    format: (d) => `${d}%`,
    accessor: (d) => Number(d.clouds),
  },
};

export const EARLIEST_DATE = "1980-01-01";
export const LAST_DATE = "2020-12-31";
export const WEATHER_DATA_URL =
  "https://data.sambacode.net/weather-history-london.json";

export const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const YEARS = range(
  getYear(parseISO(EARLIEST_DATE)),
  getYear(parseISO(LAST_DATE)) + 1,
  1
);
