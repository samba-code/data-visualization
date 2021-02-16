import React from "react";
import PropTypes from "prop-types";
import * as d3 from "d3";

import ChartSize from "../../chartElements/ChartSize/ChartSize";
import ChartLine from "../../chartTypes/lineChart/ChartLine/ChartLine";
// import Axis from "../../chartElements/axes/leftAxis";
import Gradient from "../../chartElements/Gradient/Gradient";
import { useChartDimensions } from "../../utils/useChartDimensions";
import { useUniqueId, accessorPropsType } from "../../utils/utils";

// const formatDate = d3.timeFormat("%-b %-d");
const gradientColors = ["rgb(226, 222, 243)", "#f8f9fa"];

const LineViz01 = ({ data, xAccessor, yAccessor }) => {
  const [ref, dimensions] = useChartDimensions({
    height: 500,
    width: 800,
  });
  const gradientId = useUniqueId("Timeline-gradient");

  const xScale = d3
    .scaleTime()
    .domain(d3.extent(data, xAccessor))
    .range([0, dimensions.boundedWidth]);

  const yScale = d3
    .scaleLinear()
    .domain(d3.extent(data, yAccessor))
    .range([dimensions.boundedHeight, 0])
    .nice();

  const xAccessorScaled = (d) => xScale(xAccessor(d));
  const yAccessorScaled = (d) => yScale(yAccessor(d));
  // const y0AccessorScaled = yScale(yScale.domain()[0]);

  return (
    <div className="Timeline" ref={ref}>
      <ChartSize dimensions={dimensions}>
        <defs>
          <Gradient id={gradientId} colors={gradientColors} x2="0" y2="100%" />
        </defs>
        {/* <Axis dimension="x" scale={xScale} formatTick={formatDate} />
        <Axis dimension="y" scale={yScale} label={label} /> */}
        {/* <ChartLine
          type="area"
          data={data}
          xAccessor={xAccessorScaled}
          yAccessor={yAccessorScaled}
          y0Accessor={y0AccessorScaled}
          style={{ fill: `url(#${gradientId})` }}
        /> */}
        <ChartLine
          data={data}
          xAccessor={xAccessorScaled}
          yAccessor={yAccessorScaled}
        />
      </ChartSize>
    </div>
  );
};

LineViz01.propTypes = {
  data: PropTypes.array,
  xAccessor: accessorPropsType,
  yAccessor: accessorPropsType,
  label: PropTypes.string,
};

LineViz01.defaultProps = {
  xAccessor: (d) => d.x,
  yAccessor: (d) => d.y,
};
export default LineViz01;
