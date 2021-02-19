import { convertKelvinToCelcius } from "./utils.js";

export const weatherMeasures = {
  "Average Temperature": {
    label: "Average Temperature",
    accessor: (d) => convertKelvinToCelcius(d.main.temp),
    default: true,
  },
  "Max Temperature": {
    label: "Max Temperature",
    accessor: (d) => convertKelvinToCelcius(d.main.temp_max),
  },
  "Min Temperature": {
    label: "Min Temperature",
    accessor: (d) => convertKelvinToCelcius(d.main.temp_min),
  },
  Rain: {
    label: "Rain",
    accessor: (d) => d?.rain?.["1h"] ?? 0,
  },
  "Wind Speed": {
    label: "Wind Speed",
    accessor: (d) => d.wind.speed,
  },
  Humidity: {
    label: "Humidity",
    accessor: (d) => d.main.humidity,
  },
  Pressure: {
    label: "Pressure",
    accessor: (d) => d.main.pressure,
  },
  Clouds: {
    label: "Clouds",
    accessor: (d) => d?.clouds?.all ?? 0,
  },
};
