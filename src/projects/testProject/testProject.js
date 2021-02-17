import React from "react";
import PropTypes from "prop-types";
import { accessorPropsType } from "../../charts/utils/utils";
import LineViz01 from "../../charts/v12s/LineViz01/LineViz01";
import Heading1 from "../../atoms/Heading1/Heading1";
import data from "./weatherData.js";
import * as d3 from "d3";

const TestProject = () => {
  // const data = d3.json(data);
  const hourlyWeather = data.hourly;
  return (
    <div>
      <Heading1>Temperatures over time</Heading1>
      <LineViz01
        data={hourlyWeather}
        xAccessor={(d) => d.dt}
        yAccessor={(d) => d.temp}
        yLabel="A Line Chart"
        xLabel="Some values"
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
