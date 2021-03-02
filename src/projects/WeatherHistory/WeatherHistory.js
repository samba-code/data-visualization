import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { parseISO, getYear, getMonth, format, compareAsc } from "date-fns";
import { range } from "lodash";
import styled from "styled-components";
import Obfuscate from "react-obfuscate";
import { rem, lighten } from "polished";

import { accessorPropsType } from "../../charts/utils/utils";
import LineChart from "../../charts/v12s/LineChart/LineChart";
import Heading1 from "../../atoms/Heading1/Heading1";
import Heading2 from "../../atoms/Heading2/Heading2";
import Paragraph from "../../atoms/Paragraph/Paragraph";
import PageWrapper from "../../atoms/PageWrapper/PageWrapper";
import MainContent from "../../atoms/MainContent/MainContent";
import Header from "../../atoms/Header/Header";
import Footer from "../../atoms/Footer/Footer";
import Logo from "../../atoms/Logo/Logo";
import Loading from "../../atoms/Loading/Loading";
import { weatherMeasures, EARLIEST_DATE, LAST_DATE } from "./constants.js";
import * as d3 from "d3";

import "./DatePicker.css";

const IntroductionArea = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background: ${(props) => lighten(0.2, props.theme.neutral)};
  width: 100%;
  padding: 10px 0 30px 0;
`;

const Introduction = styled.div`
  width: 90%;
  max-width: 1024px;
`;

const Controls = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  flex-wrap: wrap;
  margin: 10px 0 0 0;
`;

const Label = styled.label`
  display: block;
  font-size: ${rem("14px")};
  margin: 12px 12px 4px 0;
  font-family: "museo-sans", sans-serif;
  font-weight: 700;
  min-width: 80px;
`;

const InputContainer = styled.div`
  margin: 0 25px 6px 0;
`;

const SelectBox = styled.select`
  padding: 3px;
  font-size: ${rem("16px")};
  font-family: "museo-sans", sans-serif;
  font-weight: 300;
  border: 1px solid #aaa;
  border-radius: 6px;
  min-height: 20px;
`;

const years = range(
  getYear(parseISO(EARLIEST_DATE)),
  getYear(parseISO(LAST_DATE)) + 1,
  1
);
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
  "December",
];

const getWeatherHistory = async () => {
  const dataURL = "https://data.sambacode.net/weather-history-london.json";
  const weatherHistory = await d3.json(dataURL);
  return weatherHistory;
};

const defaultMeasure = Object.values(weatherMeasures).filter(
  (x) => x.default
)[0].label;

const convertDates = (dateString) => {
  // Convert from DD-MM-YYYY to YYYY-MM-DD
  const splitDate = dateString.split("-");
  return `${splitDate[2]}-${splitDate[1]}-${splitDate[0]}`;
};

const DATE_ERROR = "Start date must be before end date";

const WeatherHistory = () => {
  const [currentMeasure, setCurrentMeasure] = useState(defaultMeasure);
  const [chartData, setChartData] = useState([]);
  const [filteredChartData, setFilteredChartData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [dateStart, setDateStart] = useState(parseISO(EARLIEST_DATE));
  const [dateEnd, setDateEnd] = useState(parseISO(LAST_DATE));
  const [errorMessage, setErrorMessage] = useState("");

  const changeStartDate = (newStartDate) => {
    if (compareAsc(dateEnd, newStartDate) > 0) {
      setDateStart(newStartDate);
      setErrorMessage("");
    } else {
      setErrorMessage(DATE_ERROR);
    }
  };

  const changeEndDate = (newEndDate) => {
    if (compareAsc(newEndDate, dateStart) > 0) {
      setDateEnd(newEndDate);
      setErrorMessage("");
    } else {
      setErrorMessage(DATE_ERROR);
    }
  };

  const isWithinDates = (date) => {
    return (
      compareAsc(new Date(date), new Date(EARLIEST_DATE)) > -1 &&
      compareAsc(new Date(LAST_DATE), new Date(date)) > -1
    );
  };
  useEffect(() => {
    getWeatherHistory().then((d) => {
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

  const chartTitle = `${yLabel} in London between ${format(
    dateStart,
    "do MMMM yyyy"
  )} and ${format(dateEnd, "do MMMM yyyy")}`;

  return (
    <PageWrapper>
      <Header>
        <Heading1>LONDON WEATHER HISTORY 1980 - 2020</Heading1>
      </Header>
      <IntroductionArea>
        <Introduction>
          <Paragraph>
            This chart shows the weather history in London from 1980 to 2020.
            Use the weather data select to view the chart by weather type and
            the date pickers to select a date range. Data for this chart was
            sourced from{" "}
            <a
              href="https://openweathermap.org/"
              target="_blank"
              rel="noreferrer"
            >
              Open Weather
            </a>
            .
          </Paragraph>
          <Paragraph>
            If you need a custom interactive data visualisation for your project
            contact{" "}
            <Obfuscate
              email="hello@sambacode.net"
              aria-label="Email Samba Code"
            >
              hello@sambacode.net
            </Obfuscate>
            .
          </Paragraph>
        </Introduction>
      </IntroductionArea>
      <MainContent>
        <Heading2>{chartTitle}</Heading2>
        <Controls>
          <InputContainer>
            <Label htmlFor="weather-select">Weather data</Label>
            <SelectBox
              id="weather-select"
              onChange={onSelectChange}
              value={currentMeasure}
            >
              {Object.values(weatherMeasures).map(({ label }) => {
                return <option key={label}>{label}</option>;
              })}
            </SelectBox>
          </InputContainer>
          <InputContainer>
            <Label>Start date</Label>
            <DatePicker
              className="date-picker"
              locale="en-GB"
              renderCustomHeader={({
                date,
                changeYear,
                changeMonth,
                decreaseMonth,
                increaseMonth,
                prevMonthButtonDisabled,
                nextMonthButtonDisabled,
              }) => (
                <div
                  style={{
                    margin: 10,
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <button
                    onClick={decreaseMonth}
                    disabled={prevMonthButtonDisabled}
                  >
                    {"<"}
                  </button>
                  <select
                    value={getYear(date)}
                    onChange={({ target: { value } }) => changeYear(value)}
                  >
                    {years.map((option) => (
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
                    {months.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>

                  <button
                    onClick={increaseMonth}
                    disabled={nextMonthButtonDisabled}
                  >
                    {">"}
                  </button>
                </div>
              )}
              selected={dateStart}
              onChange={(date) => changeStartDate(date)}
              filterDate={isWithinDates}
            />
          </InputContainer>
          <InputContainer>
            <Label>End date</Label>
            <DatePicker
              className="date-picker"
              locale="en-GB"
              renderCustomHeader={({
                date,
                changeYear,
                changeMonth,
                decreaseMonth,
                increaseMonth,
                prevMonthButtonDisabled,
                nextMonthButtonDisabled,
              }) => (
                <div
                  style={{
                    margin: 10,
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <button
                    onClick={decreaseMonth}
                    disabled={prevMonthButtonDisabled}
                  >
                    {"<"}
                  </button>
                  <select
                    value={getYear(date)}
                    onChange={({ target: { value } }) => changeYear(value)}
                  >
                    {years.map((option) => (
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
                    {months.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>

                  <button
                    onClick={increaseMonth}
                    disabled={nextMonthButtonDisabled}
                  >
                    {">"}
                  </button>
                </div>
              )}
              selected={dateEnd}
              onChange={(date) => changeEndDate(date)}
              filterDate={isWithinDates}
            />
          </InputContainer>
          <div>{errorMessage}</div>
        </Controls>
        {isLoading ? (
          <Loading id="loading">Loading weather data...</Loading>
        ) : (
          <LineChart
            data={filteredChartData}
            xAccessor={xAccessor}
            yAccessor={yAccessor}
            yLabel=""
            xLabel=""
            numberOfTicksX={12}
            numberOfTicksY={6}
            tickFormat={tickFormat}
          />
        )}
      </MainContent>
      <Footer>
        <Logo />
      </Footer>
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
