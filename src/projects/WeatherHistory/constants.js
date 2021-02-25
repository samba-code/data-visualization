export const weatherMeasures = {
  "Average Temperature": {
    label: "Average Temperature",
    accessor: (d) => Number(d.temp),
    format: (d) => `${d}°C`,
    default: true,
  },
  "Max Temperature": {
    label: "Max Temperature",
    format: (d) => `${d}°C`,
    accessor: (d) => Number(d.tempMax),
  },
  "Min Temperature": {
    label: "Min Temperature",
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
  "Wind Speed": {
    label: "Wind Speed",
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

export const START_DATE = "1980-01-01";
export const END_DATE = "2020-12-31";
