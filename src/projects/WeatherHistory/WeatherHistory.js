import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { accessorPropsType } from "../../charts/utils/utils";
import LineViz01 from "../../charts/v12s/LineViz01/LineViz01";
import Heading1 from "../../atoms/Heading1/Heading1";
import Loading from "../../atoms/Loading/Loading";
import { weatherMeasures, START_DATE, END_DATE } from "./constants.js";
import * as d3 from "d3";

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const getWeatherHistory = async () => {
  // console.time("json");
  // const dataURL = "https://data.sambacode.net/weather-data-london.json";
  const dataURL = "./weather-history-london.json";
  const weatherHistory = await d3.json(dataURL);
  await delay(3000);
  // console.timeEnd("json");
  return weatherHistory;
};

const defaultMeasure = Object.values(weatherMeasures).filter(
  (x) => x.default
)[0].label;
// const findMeasure = (label) =>
//   weatherMeasures.filter((x) => x.label === label)[0];

// TODO - find a nicer way to reformat dates
const convertDates = (dateString) => {
  const splitDate = dateString.split("-");
  return `${splitDate[1]}-${splitDate[0]}-${splitDate[2]}`;
};

const convertDatesYMD = (dateString) => {
  const splitDate = dateString.split("-");
  return `${splitDate[1]}-${splitDate[2]}-${splitDate[0]}`;
};

const WeatherHistory = () => {
  // console.log("render");
  const [currentMeasure, setCurrentMeasure] = useState(defaultMeasure);
  const [chartData, setChartData] = useState([]);
  const [filteredChartData, setFilteredChartData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [dateStart, setDateStart] = useState("1980-01-01");
  const [dateEnd, setDateEnd] = useState("2020-12-31");
  useEffect(() => {
    getWeatherHistory().then((d) => {
      console.log("get weather data");
      setChartData(d);
      setFilteredChartData(d);
      setIsLoading(false);
    });
  }, []);
  useEffect(() => {
    const weatherDataBetweenDates = chartData.filter((d) => {
      const currentDate = new Date(convertDates(d.date));
      const startDate = new Date(convertDatesYMD(dateStart));
      const endDate = new Date(convertDatesYMD(dateEnd));
      // console.log("currentDate: ", currentDate.getTime());
      // console.log("startDate: ", startDate.getTime());
      // console.log("endDate: ", endDate.getTime());
      // console.log(
      //   currentDate.getTime() >= startDate.getTime() &&
      //     currentDate.getTime() <= endDate.getTime()
      // );
      return (
        currentDate.getTime() >= startDate.getTime() &&
        currentDate.getTime() <= endDate.getTime()
      );
    });
    setFilteredChartData(weatherDataBetweenDates);
  }, [dateStart, dateEnd]);
  const xAccessor = (d) => {
    // console.log("d.date: ", d.date);
    // console.log("new Date(d.date): ", new Date(convertDates(d.date)));
    const newDate = new Date(convertDates(d.date));
    return newDate;
  };
  const onSelectChange = (e) => {
    // console.log("e.value: ", e.currentTarget.value);
    // setCurrentMeasure(e.currentTarget.value);
    setCurrentMeasure(e.currentTarget.value);
    // [e.currentTarget.value];
  };
  const onDateStartChange = (e) => {
    // console.log("e.value: ", e.currentTarget.value);
    // setCurrentMeasure(e.currentTarget.value);
    // console.log("start date changed: ", e.currentTarget.value);
    setDateStart(e.currentTarget.value);
    // [e.currentTarget.value];
  };
  const onDateEndChange = (e) => {
    // console.log("e.value: ", e.currentTarget.value);
    // setCurrentMeasure(e.currentTarget.value);
    // console.log("end date changed: ", e.currentTarget.value);
    setDateEnd(e.currentTarget.value);
    // [e.currentTarget.value];
  };
  // console.log("chartData: ", chartData);
  // console.log("currentMeasure: ", currentMeasure);
  // console.log("weatherMeasures: ", weatherMeasures);
  const yAccessor = weatherMeasures[currentMeasure].accessor;
  const tickFormat = weatherMeasures[currentMeasure].format;
  const yLabel = weatherMeasures[currentMeasure].label;
  return (
    <div>
      <Heading1>London Weather from 1980 to 2020</Heading1>
      {isLoading ? (
        <Loading id="loading">Loading weather data...</Loading>
      ) : (
        <LineViz01
          data={filteredChartData}
          xAccessor={xAccessor}
          yAccessor={yAccessor}
          yLabel={yLabel}
          xLabel=""
          numberOfTicksX={12}
          numberOfTicksY={6}
          tickFormat={tickFormat}
        />
      )}
      <select onChange={onSelectChange} value={currentMeasure}>
        {Object.values(weatherMeasures).map(({ label }) => {
          return <option key={label}>{label}</option>;
        })}
      </select>
      <input
        type="date"
        placeholder="dd-mm-yyyy"
        onChange={onDateStartChange}
        value={dateStart}
        min={START_DATE}
        max={END_DATE}
      />
      <input
        type="date"
        placeholder="dd-mm-yyyy"
        onChange={onDateEndChange}
        value={dateEnd}
        min={START_DATE}
        max={END_DATE}
      />
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
