// This is a node script to transform data from
// openweathermap to more simple format.
// It is intentionally not optimised for effiency
// because it only needs to be run once.

const d3 = require("d3");
const fs = require("fs");

var dateFormat = d3.timeFormat("%d-%m-%Y");

export const reshapeData = (data) => {
  const reshaped = data.map((d) => {
    const weatherDate = new Date(0);
    weatherDate.setUTCSeconds(d.dt);
    return {
      date: dateFormat(weatherDate),
      temp: d.main.temp,
      tempMin: d.main.temp_min,
      tempMax: d.main.temp_max,
      pressure: d.main.pressure,
      humidity: d.main.humidity,
      rain: d?.rain?.["1h"] ?? 0,
      snow: d?.snow?.["1h"] ?? 0,
      wind: d.wind.speed,
      clouds: d.clouds.all,
    };
  });
  const dataByDay = reshaped.reduce((acc, curr) => {
    let currentDateValue = acc[curr.date];
    if (!currentDateValue) {
      acc[curr.date] = [curr];
    } else {
      acc[curr.date] = [...currentDateValue, curr];
    }
    return acc;
  }, {});
  const dayValues = Object.values(dataByDay);
  const dayTotals = dayValues.map((d) => {
    return d.reduce((acc, curr, index) => {
      if (acc) {
        const {
          date,
          temp,
          tempMin,
          tempMax,
          pressure,
          humidity,
          rain,
          snow,
          wind,
          clouds,
        } = curr;
        const {
          temp: accTemp,
          tempMin: accTempMin,
          tempMax: accTempMax,
          pressure: accPressure,
          humidity: accHumidity,
          rain: accRain,
          snow: accSnow,
          wind: accWind,
          clouds: accClouds,
        } = acc;
        return {
          date,
          temp: temp + accTemp,
          tempMin: tempMin + accTempMin,
          tempMax: tempMax + accTempMax,
          pressure: pressure + accPressure,
          humidity: humidity + accHumidity,
          rain: rain + accRain,
          snow: snow + accSnow,
          wind: wind + accWind,
          clouds: clouds + accClouds,
          totalLength: index + 1,
        };
      } else {
        return curr;
      }
    });
  });

  const averagedData = dayTotals.map((d) => {
    const {
      date,
      temp,
      tempMin,
      tempMax,
      pressure,
      humidity,
      rain,
      snow,
      wind,
      clouds,
      totalLength = 1,
    } = d;
    return {
      date: date,
      temp: (temp / totalLength).toFixed(2),
      tempMin: (tempMin / totalLength).toFixed(2),
      tempMax: (tempMax / totalLength).toFixed(2),
      pressure: (pressure / totalLength).toFixed(2),
      humidity: (humidity / totalLength).toFixed(2),
      rain: (rain / totalLength).toFixed(2),
      snow: (snow / totalLength).toFixed(2),
      wind: (wind / totalLength).toFixed(2),
      clouds: (clouds / totalLength).toFixed(2),
    };
  });

  const resultJSON = JSON.stringify(averagedData);
  return resultJSON;
};

export const reshapeFile = (fileName) =>
  fs.readFile(fileName, "utf8", function (err, data) {
    if (err) throw err;
    const parsedData = JSON.parse(data);
    const outputJSON = reshapeData(parsedData);
    fs.writeFile("output.json", outputJSON, function (err) {
      if (err) return console.log(err);
    });
  });

// reshapeFile("weather-history.json");
