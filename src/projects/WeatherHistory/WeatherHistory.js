import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { parseISO, getYear, getMonth, format } from "date-fns";
import { range } from "lodash";
import styled from "styled-components";

import { accessorPropsType } from "../../charts/utils/utils";
import LineViz01 from "../../charts/v12s/LineViz01/LineViz01";
import Heading1 from "../../atoms/Heading1/Heading1";
import Heading2 from "../../atoms/Heading2/Heading2";
import Paragraph from "../../atoms/Paragraph/Paragraph";
import PageWrapper from "../../atoms/PageWrapper/PageWrapper";
import MainContent from "../../atoms/MainContent/MainContent";
import Header from "../../atoms/Header/Header";
import Footer from "../../atoms/Footer/Footer";
import Logo from "../../atoms/Logo/Logo";
import Loading from "../../atoms/Loading/Loading";
import { weatherMeasures, START_DATE, END_DATE } from "./constants.js";
import * as d3 from "d3";

const Controls = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`;

const Label = styled.label`
  margin: 12px 0 4px 0;
  font-family: "museo-sans", sans-serif;
  font-weight: 700;
`;

const years = range(getYear(parseISO(START_DATE)), getYear(parseISO(END_DATE)) + 1, 1);
const months = [
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
  "December"
];

const getWeatherHistory = async () => {
  const dataURL = "https://data.sambacode.net/weather-history-london.json";
  const weatherHistory = await d3.json(dataURL);
  return weatherHistory;
};

const defaultMeasure = Object.values(weatherMeasures).filter(
  (x) => x.default
)[0].label;

// TODO - find a nicer way to reformat dates
const convertDates = (dateString) => {
  const splitDate = dateString.split("-");
  return `${splitDate[1]}-${splitDate[0]}-${splitDate[2]}`;
};

const WeatherHistory = () => {
  const [currentMeasure, setCurrentMeasure] = useState(defaultMeasure);
  const [chartData, setChartData] = useState([]);
  const [filteredChartData, setFilteredChartData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [dateStart, setDateStart] = useState(parseISO(START_DATE));
  const [dateEnd, setDateEnd] = useState(parseISO(END_DATE));
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
      const startDate = dateStart;
      const endDate = dateEnd;
      return (
        currentDate.getTime() >= startDate.getTime() &&
        currentDate.getTime() <= endDate.getTime()
      );
    });
    setFilteredChartData(weatherDataBetweenDates);
  }, [dateStart, dateEnd]);
  const xAccessor = (d) => {
    const newDate = new Date(convertDates(d.date));
    return newDate;
  };
  const onSelectChange = (e) => {
    setCurrentMeasure(e.currentTarget.value);
  };

  const yAccessor = weatherMeasures[currentMeasure].accessor;
  const tickFormat = weatherMeasures[currentMeasure].format;
  const yLabel = weatherMeasures[currentMeasure].label;

  const chartTitle = `${yLabel} in London between ${format(dateStart, "MM/dd/yyyy")} and ${format(dateEnd, "MM/dd/yyyy")}`;

  return (
    <PageWrapper>
      <MainContent>
        <Header><Heading1>London Weather from 1980 to 2020</Heading1></Header>
        <div>
          <Paragraph>
            This chart shows the weather in London from 1980 to 2020. Use the weather data select dropdown to view the chart by weather type and the date pickers to select a date range. Data for this chart was sourced from <a href="https://openweathermap.org/" target="_blank" rel="noreferrer">Open Weather</a>. This chart was created using React and D3.
      </Paragraph>
          <Paragraph>
            If you need a custom interactive data visualisation for your project contact <a href="mailto:hello@sambacode.net" >hello@sambacode.net</a>.
      </Paragraph>
      <Heading2>{chartTitle}</Heading2>
        </div>
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
        <Controls>
        <Label htmlFor="weather-select">Select weather data</Label>
        <select id="weather-select" onChange={onSelectChange} value={currentMeasure}>
          {Object.values(weatherMeasures).map(({ label }) => {
            return <option key={label}>{label}</option>;
          })}
        </select>
        <Label>Select start date</Label>
        <DatePicker
          renderCustomHeader={({
            date,
            changeYear,
            changeMonth,
            decreaseMonth,
            increaseMonth,
            prevMonthButtonDisabled,
            nextMonthButtonDisabled
          }) => (
            <div
              style={{
                margin: 10,
                display: "flex",
                justifyContent: "center"
              }}
            >
              <button onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>
                {"<"}
              </button>
              <select
                value={getYear(date)}
                onChange={({ target: { value } }) => changeYear(value)}
              >
                {years.map(option => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>

              <select
                value={months[getMonth(date)]}
                onChange={({ target: { value } }) =>
                  changeMonth(months.indexOf(value))
                }
              >
                {months.map(option => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>

              <button onClick={increaseMonth} disabled={nextMonthButtonDisabled}>
                {">"}
              </button>
            </div>
          )}
          selected={dateStart}
          onChange={date => setDateStart(date)}
        />
        <Label>Select end date</Label>
        <DatePicker
          renderCustomHeader={({
            date,
            changeYear,
            changeMonth,
            decreaseMonth,
            increaseMonth,
            prevMonthButtonDisabled,
            nextMonthButtonDisabled
          }) => (
            <div
              style={{
                margin: 10,
                display: "flex",
                justifyContent: "center"
              }}
            >
              <button onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>
                {"<"}
              </button>
              <select
                value={getYear(date)}
                onChange={({ target: { value } }) => changeYear(value)}
              >
                {years.map(option => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>

              <select
                value={months[getMonth(date)]}
                onChange={({ target: { value } }) =>
                  changeMonth(months.indexOf(value))
                }
              >
                {months.map(option => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>

              <button onClick={increaseMonth} disabled={nextMonthButtonDisabled}>
                {">"}
              </button>
            </div>
          )}
          selected={dateEnd}
          onChange={date => setDateEnd(date)}
        />
        </Controls>
        <Footer>
        <Logo />
        </Footer>
      </MainContent>
    </PageWrapper>
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
