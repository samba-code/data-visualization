import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { accessorPropsType } from "../../charts/utils/utils";
import LineViz01 from "../../charts/v12s/LineViz01/LineViz01";
import Heading1 from "../../atoms/Heading1/Heading1";
import Loading from "../../atoms/Loading/Loading";
import { weatherMeasures } from "./constants.js";
import * as d3 from "d3";

const getWeatherHistory = async () => {
  // console.time("json");
  const weatherHistory = await d3.json("./weather-history.json");
  // console.timeEnd("json");
  return weatherHistory;
};

const defaultMeasure = Object.values(weatherMeasures).filter(
  (x) => x.default
)[0].label;
// const findMeasure = (label) =>
//   weatherMeasures.filter((x) => x.label === label)[0];

const WeatherHistory = () => {
  console.log("render");
  const [currentMeasure, setCurrentMeasure] = useState(defaultMeasure);
  const [chartData, setChartData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    getWeatherHistory().then((d) => {
      const yearData = d.slice(0, 364);
      // console.log(yearData);
      setChartData(yearData);
      setIsLoading(false);
    });
  }, []);
  const xAccessor = (d) => {
    var utcSeconds = d.dt;
    var weatherDate = new Date(0);
    weatherDate.setUTCSeconds(utcSeconds);
    // console.log(weatherDate);
    return weatherDate;
  };
  const onSelectChange = (e) => {
    // console.log("e.value: ", e.currentTarget.value);
    // setCurrentMeasure(e.currentTarget.value);
    setCurrentMeasure(e.currentTarget.value);
    [e.currentTarget.value];
  };
  console.log("chartData: ", chartData);
  console.log("currentMeasure: ", currentMeasure);
  console.log("weatherMeasures: ", weatherMeasures);
  const yAccessor = weatherMeasures[currentMeasure].accessor;
  return (
    <div>
      <Heading1>London Weather from 1980 to 2020</Heading1>
      {isLoading ? (
        <Loading id="loading">Loading weather data...</Loading>
      ) : (
        <LineViz01
          data={chartData}
          xAccessor={xAccessor}
          yAccessor={yAccessor}
          yLabel="Temperature in Celcius"
          xLabel=""
          numberOfTicksX={12}
          numberOfTicksY={6}
        />
      )}
      <select onChange={onSelectChange} value={currentMeasure}>
        {Object.values(weatherMeasures).map(({ label }) => {
          return <option key={label}>{label}</option>;
        })}
      </select>
      <input type="date" placeholder="dd-mm-yyyy" />
      <input type="date" placeholder="dd-mm-yyyy" />
    </div>
  );
};

WeatherHistory.propTypes = {
  data: PropTypes.array,
  xAccessor: accessorPropsType,
  yAccessor: accessorPropsType,
  label: PropTypes.string,
};

WeatherHistory.defaultProps = {
  xAccessor: (d) => d.x,
  yAccessor: (d) => d.y,
};

export default WeatherHistory;
