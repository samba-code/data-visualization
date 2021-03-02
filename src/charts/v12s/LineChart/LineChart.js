import React from "react";
import PropTypes from "prop-types";
import * as d3 from "d3";

import ChartSizer from "../../chartElements/ChartSizer/ChartSizer";
import ChartLine from "../../chartTypes/ChartLine/ChartLine/ChartLine";
import ChartWrapper from "../../chartElements/ChartWrapper/ChartWrapper";
import Axis from "../../chartElements/Axis/Axis";
import { useChartDimensions } from "../../utils/useChartDimensions";
import { accessorPropsType } from "../../utils/utils";

console.log("Line update");

const formatDate = (time) => {
  const formattedTime = d3.timeFormat("%e/%m/%Y");
  return formattedTime(time);
};

const LineChart = ({
  data,
  xAccessor,
  yAccessor,
  yLabel,
  xLabel,
  tickFormat,
  numberOfTicksX,
  numberOfTicksY,
}) => {
  const [ref, dimensions] = useChartDimensions({
    height: 300,
  });

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

  return (
    <div ref={ref}>
      <ChartWrapper>
        <ChartSizer dimensions={dimensions}>
          <Axis
            dimensions={dimensions}
            dimension="x"
            scale={xScale}
            label={xLabel}
            formatTick={formatDate}
            numberOfTicks={numberOfTicksX}
          />
          <Axis
            dimensions={dimensions}
            dimension="y"
            scale={yScale}
            label={yLabel}
            formatTick={tickFormat}
            numberOfTicks={numberOfTicksY}
          />
          <ChartLine
            data={data}
            xAccessor={xAccessorScaled}
            yAccessor={yAccessorScaled}
            interpolation={d3.curveLinear}
            strokeColor="#00115C"
          />
        </ChartSizer>
      </ChartWrapper>
    </div>
  );
};

LineChart.propTypes = {
  data: PropTypes.array,
  xAccessor: accessorPropsType,
  yAccessor: accessorPropsType,
  xLabel: PropTypes.string,
  yLabel: PropTypes.string,
  numberOfTicksX: PropTypes.number,
  numberOfTicksY: PropTypes.number,
  tickFormat: PropTypes.func,
};

LineChart.defaultProps = {
  xAccessor: (d) => d.x,
  yAccessor: (d) => d.y,
  tickFormat: (d) => d,
};
export default LineChart;
