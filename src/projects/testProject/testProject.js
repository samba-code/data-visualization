import React from "react";
import PropTypes from "prop-types";
import { accessorPropsType } from "../../charts/utils/utils";
import LineViz01 from "../../charts/v12s/LineViz01/LineViz01";
import Heading1 from "../../atoms/Heading1/Heading1";
import data from "./weatherData.js";

const TestProject = () => {
  const hourlyWeather = data.hourly;
  console.log("hourly: ", hourlyWeather);
  const xAccessor = (d) => {
    var utcSeconds = d.dt;
    var weatherDate = new Date(0);
    weatherDate.setUTCSeconds(utcSeconds);
    console.log("date: ", weatherDate);
    return weatherDate;
  };
  const yAccessor = (d) => d.temp;
  return (
    <div>
      <Heading1>Temperatures over time</Heading1>
      <LineViz01
        data={hourlyWeather}
        xAccessor={xAccessor}
        yAccessor={yAccessor}
        yLabel="Temperature in Celcius"
        xLabel=""
      />
    </div>
  );
};

TestProject.propTypes = {
  data: PropTypes.array,
  xAccessor: accessorPropsType,
  yAccessor: accessorPropsType,
  label: PropTypes.string,
};

TestProject.defaultProps = {
  xAccessor: (d) => d.x,
  yAccessor: (d) => d.y,
};

export default TestProject;
