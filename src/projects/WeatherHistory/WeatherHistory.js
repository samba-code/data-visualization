import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { parseISO, format, compareAsc } from "date-fns";
import Obfuscate from "react-obfuscate";
import { useSelector, useDispatch } from "react-redux";
import * as d3 from "d3";

import {
  selectLoading,
  selectData,
  getWeatherHistory,
  selectError,
} from "./weatherHistorySlice";
import { accessorPropsType } from "../../charts/utils/utils";
import { formatDate, convertDates } from "../../utils/utils";
import LineChart from "../../charts/v12s/LineChart/LineChart";
import Heading1 from "../../atoms/Heading1/Heading1";
import Heading2 from "../../atoms/Heading2/Heading2";
import Paragraph from "../../atoms/Paragraph/Paragraph";
import ErrorMessage from "../../atoms/ErrorMessage/ErrorMessage";
import PageWrapper from "../../atoms/PageWrapper/PageWrapper";
import MainContent from "../../atoms/MainContent/MainContent";
import Header from "../../atoms/Header/Header";
import NavBar from "../../atoms/NavBar/NavBar";
import Footer from "../../atoms/Footer/Footer";
import Logo from "../../atoms/Logo/Logo";
import LoadingSpinner from "../../atoms/LoadingSpinner/LoadingSpinner";
import {
  weatherMeasures,
  EARLIEST_DATE,
  LAST_DATE,
  MONTHS,
  YEARS,
} from "./constants.js";
import {
  IntroductionArea,
  Introduction,
  SelectBox,
  Controls,
  Label,
  InputContainer,
} from "../../styles/styledComponents";
import DatePicker from "../../molecules/DatePicker/DatePicker";

const defaultMeasure = Object.values(weatherMeasures).filter(
  (x) => x.default
)[0].label;

const DATE_ERROR = "Start date must be before end date";

const WeatherHistory = () => {
  const [currentMeasure, setCurrentMeasure] = useState(defaultMeasure);
  const [filteredChartData, setFilteredChartData] = useState([]);
  const [dateStart, setDateStart] = useState(parseISO(EARLIEST_DATE));
  const [dateEnd, setDateEnd] = useState(parseISO(LAST_DATE));
  const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useDispatch();
  const loading = useSelector(selectLoading);
  const data = useSelector(selectData);
  const error = useSelector(selectError);

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
    if (data.length === 0) {
      dispatch(getWeatherHistory());
    }
  }, []);
  useEffect(() => {
    const weatherDataBetweenDates = data.filter((d) => {
      const currentDate = new Date(convertDates(d.date));
      const startDate = dateStart;
      const endDate = dateEnd;
      return (
        currentDate.getTime() >= startDate.getTime() &&
        currentDate.getTime() <= endDate.getTime()
      );
    });
    setFilteredChartData(weatherDataBetweenDates);
  }, [dateStart, dateEnd, data]);

  const xAccessor = (d) => {
    const newDate = new Date(convertDates(d.date));
    return newDate;
  };

  const onSelectChange = (e) => {
    setCurrentMeasure(e.currentTarget.value);
  };

  const yAccessor = weatherMeasures[currentMeasure].accessor;
  const tickFormatY = weatherMeasures[currentMeasure].format;
  const yLabel = weatherMeasures[currentMeasure].label;

  const chartTitle = `${yLabel} in London between ${format(
    dateStart,
    "do MMMM yyyy"
  )} and ${format(dateEnd, "do MMMM yyyy")}`;

  return (
    <PageWrapper>
      <NavBar />
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
              years={YEARS}
              months={MONTHS}
              selectedDate={dateStart}
              onDateChange={changeStartDate}
              filter={isWithinDates}
            />
          </InputContainer>
          <InputContainer>
            <Label>End date</Label>
            <DatePicker
              years={YEARS}
              months={MONTHS}
              selectedDate={dateEnd}
              onDateChange={changeEndDate}
              filter={isWithinDates}
            />
          </InputContainer>
          <div>{errorMessage}</div>
        </Controls>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        {loading && (
          <LoadingSpinner id="loading">Loading weather data...</LoadingSpinner>
        )}
        {!loading && !error && (
          <LineChart
            data={filteredChartData}
            xAccessor={xAccessor}
            yAccessor={yAccessor}
            yLabel=""
            xLabel=""
            numberOfTicksX={12}
            numberOfTicksY={6}
            tickFormatY={tickFormatY}
            tickFormatX={formatDate}
            interpolation={d3.curveLinear}
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
