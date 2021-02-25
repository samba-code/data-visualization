import React from "react";
import PropTypes from "prop-types";
import * as d3 from "d3";
import { accessorPropsType } from "../../../utils/utils";
import "./ChartLine.css";

const ChartLine = ({
  type,
  data,
  xAccessor,
  yAccessor,
  y0Accessor,
  interpolation,
  strokeColor,
  ...props
}) => {
  const lineGenerator = d3[type]()
    .x((d) => xAccessor(d))
    .y((d) => yAccessor(d))
    .curve(interpolation);

  if (type === "area") {
    lineGenerator.y0(y0Accessor).y1(yAccessor);
  }

  return (
    <path
      {...props}
      className="chart-line"
      d={lineGenerator(data)}
      strokeWidth="1"
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
  y0Accessor: accessorPropsType,
  interpolation: PropTypes.func,
  strokeColor: PropTypes.string,
};

ChartLine.defaultProps = {
  type: "line",
  y0Accessor: 0,
  interpolation: d3.curveMonotoneX,
  strokeColor: "black",
};

export default ChartLine;
