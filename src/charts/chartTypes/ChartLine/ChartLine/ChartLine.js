import React from "react";
import PropTypes from "prop-types";
import * as d3 from "d3";
import { accessorPropsType } from "../../../utils/utils";

const defaultData = [
  {
    x: 0,
    y: 0,
  },
  {
    x: 100,
    y: 0,
  },
];

const ChartLine = ({
  type,
  data,
  xAccessor,
  yAccessor,
  interpolation,
  strokeColor,
  lineWidth,
  ...props
}) => {
  const lineGenerator = d3[type]()
    .x((d) => xAccessor(d))
    .y((d) => yAccessor(d))
    .curve(interpolation);

  return (
    <path
      {...props}
      className="chart-line"
      d={lineGenerator(data)}
      strokeWidth={lineWidth}
      stroke={strokeColor}
      fill="none"
    />
  );
};

ChartLine.propTypes = {
  type: PropTypes.oneOf(["line", "area"]),
  data: PropTypes.array,
  xAccessor: accessorPropsType,
  yAccessor: accessorPropsType,
  interpolation: PropTypes.func,
  strokeColor: PropTypes.string,
  lineWidth: PropTypes.number,
};

ChartLine.defaultProps = {
  type: "line",
  data: defaultData,
  xAccessor: (d) => d.x,
  yAccessor: (d) => d.y,
  interpolation: d3.curveMonotoneX,
  strokeColor: "black",
  lineWidth: 1,
};

export default ChartLine;
