import React from "react";
import PropTypes from "prop-types";
import * as d3 from "d3";

import ChartSizer from "../../chartElements/ChartSizer/ChartSizer";
import ChartLine from "../../chartTypes/ChartLine/ChartLine/ChartLine";
import ChartWrapper from "../../chartElements/ChartWrapper/ChartWrapper";
import Axis from "../../chartElements/Axis/Axis";
import { useChartDimensions } from "../../utils/useChartDimensions";
import { accessorPropsType } from "../../utils/utils";

const LineChart = ({
  data,
  xAccessor,
  yAccessor,
  yLabel,
  xLabel,
  tickFormatY,
  tickFormatX,
  numberOfTicksX,
  numberOfTicksY,
  lineWidth,
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
  const xAccessorScaled = (d) => {
    const result = xScale(xAccessor(d));
    return result;
  };
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
            formatTick={tickFormatX}
            numberOfTicks={numberOfTicksX}
          />
          <Axis
            dimensions={dimensions}
            dimension="y"
            scale={yScale}
            label={yLabel}
            formatTick={tickFormatY}
            numberOfTicks={numberOfTicksY}
          />
          <ChartLine
            data={data}
            xAccessor={xAccessorScaled}
            yAccessor={yAccessorScaled}
            interpolation={d3.curveLinear}
            strokeColor="#00115C"
            lineWidth={lineWidth}
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
  tickFormatY: PropTypes.func,
  tickFormatX: PropTypes.func,
  lineWidth: PropTypes.number,
};

LineChart.defaultProps = {
  numberOfTicksY: 6,
  numberOfTicksX: 12,
  xAccessor: (d) => d.x,
  yAccessor: (d) => d.y,
  tickFormatY: (d) => d,
  tickFormatX: (d) => d,
};
export default LineChart;
