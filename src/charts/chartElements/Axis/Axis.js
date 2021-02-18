import React from "react";
import PropTypes from "prop-types";
import * as d3 from "d3";
import { dimensionsPropsType } from "../../utils/utils";
// import { useChartDimensions } from "../../utils/useChartDimensions";
import "./axis.css";

const axisComponentsByDimension = {
  x: AxisHorizontal,
  y: AxisVertical,
};
const Axis = ({ dimensions, dimension, ...props }) => {
  const Component = axisComponentsByDimension[dimension];
  if (!Component) return null;

  return <Component dimensions={dimensions} {...props} />;
};

Axis.propTypes = {
  dimension: PropTypes.oneOf(["x", "y"]),
  dimensions: dimensionsPropsType,
  scale: PropTypes.func,
  label: PropTypes.string,
  formatTick: PropTypes.func,
};

Axis.defaultProps = {
  dimension: "x",
  scale: null,
  formatTick: d3.format(","),
};

export default Axis;

function AxisHorizontal({ dimensions, label, formatTick, scale, ...props }) {
  const numberOfTicks =
    dimensions.boundedWidth < 600
      ? dimensions.boundedWidth / 50
      : dimensions.boundedWidth / 100;

  const ticks = scale.ticks(numberOfTicks);

  return (
    <g
      className="Axis AxisHorizontal"
      transform={`translate(0, ${dimensions.boundedHeight})`}
      {...props}
    >
      <line className="Axis__line" x2={dimensions.boundedWidth} />

      {ticks.map((tick) => (
        <>
          <line
            className="Tick__line"
            y1={0}
            y2={5}
            x1={scale(tick)}
            x2={scale(tick)}
          />
          <text
            key={tick}
            className="Axis__tick"
            transform={`translate(${scale(tick)}, 25)`}
          >
            {formatTick(tick)}
          </text>
        </>
      ))}

      {label && (
        <text
          className="Axis__label"
          transform={`translate(${dimensions.boundedWidth / 2}, 50)`}
        >
          {label}
        </text>
      )}
    </g>
  );
}

AxisHorizontal.propTypes = {
  dimensions: dimensionsPropsType,
  scale: PropTypes.func,
  label: PropTypes.string,
  formatTick: PropTypes.func,
};

AxisHorizontal.defaultProps = {
  scale: null,
  formatTick: d3.format(","),
};

function AxisVertical({ dimensions, label, formatTick, scale, ...props }) {
  const numberOfTicks = dimensions.boundedHeight / 40;

  const ticks = scale.ticks(numberOfTicks);

  return (
    <g className="Axis AxisVertical" {...props}>
      <line className="Axis__line" y2={dimensions.boundedHeight} />

      {ticks.map((tick) => (
        <>
          <line
            className="Tick__line"
            y1={scale(tick)}
            y2={scale(tick)}
            x1={0}
            x2={-5}
          />
          <text
            key={tick}
            className="Axis__tick"
            transform={`translate(-16, ${scale(tick)})`}
          >
            {formatTick(tick)}
          </text>
        </>
      ))}

      {label && (
        <text
          className="Axis__label"
          style={{
            transform: `translate(-75px, ${
              dimensions.boundedHeight / 2
            }px) rotate(-90deg)`,
          }}
        >
          {label}
        </text>
      )}
    </g>
  );
}
AxisVertical.propTypes = {
  dimensions: dimensionsPropsType,
  scale: PropTypes.func,
  label: PropTypes.string,
  formatTick: PropTypes.func,
};

AxisVertical.defaultProps = {
  scale: null,
  formatTick: d3.format(","),
};
