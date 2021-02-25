export const weatherMeasures = {
  "Average Temperature": {
    label: "Average Temperature",
    accessor: (d) => d.temp,
    default: true,
  },
  "Max Temperature": {
    label: "Max Temperature",
    accessor: (d) => d.tempMax,
  },
  "Min Temperature": {
    label: "Min Temperature",
    accessor: (d) => d.tempMin,
  },
  Rain: {
    label: "Rain",
    accessor: (d) => d.rain,
  },
  "Wind Speed": {
    label: "Wind Speed",
    accessor: (d) => d.wind,
  },
  Humidity: {
    label: "Humidity",
    accessor: (d) => d.humidity,
  },
  Pressure: {
    label: "Pressure",
    accessor: (d) => d.pressure,
  },
  Clouds: {
    label: "Clouds",
    accessor: (d) => d.clouds,
  },
};
