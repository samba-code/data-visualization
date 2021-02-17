import React from "react";
import PropTypes from "prop-types";
import * as d3 from "d3";

import ChartSize from "../../chartElements/ChartSize/ChartSize";
import ChartLine from "../../chartTypes/lineChart/ChartLine/ChartLine";
import ChartWrapper from "../../chartElements/ChartWrapper/ChartWrapper";
import Axis from "../../chartElements/Axis/Axis";
import { useChartDimensions } from "../../utils/useChartDimensions";
import { accessorPropsType } from "../../utils/utils";

const formatDate = d3.timeFormat("%H");

const formatTemp = (d) => `${(d -273.15).toFixed(2)}°C`;

const LineViz01 = ({ data, xAccessor, yAccessor, yLabel, xLabel }) => {
  const [ref, dimensions] = useChartDimensions({
    height: 300
  });

  const xScale = d3
  .scaleTime()
    .domain(d3.extent(data, xAccessor))
    .range([0, dimensions.boundedWidth])
    .nice();

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
      <ChartSize dimensions={dimensions}>
        <Axis dimensions={dimensions} dimension="x" scale={xScale} label={xLabel} formatTick={formatDate}/>
        <Axis dimensions={dimensions} dimension="y" scale={yScale} label={yLabel} formatTick={formatTemp}/>
        <ChartLine
          data={data}
          xAccessor={xAccessorScaled}
          yAccessor={yAccessorScaled}
          interpolation={d3.curveCardinal}
        />
      </ChartSize>
    </ChartWrapper>
    </div>
  );
};

LineViz01.propTypes = {
  data: PropTypes.array,
  xAccessor: accessorPropsType,
  yAccessor: accessorPropsType,
  xLabel: PropTypes.string,
  yLabel: PropTypes.string,
};

LineViz01.defaultProps = {
  xAccessor: (d) => d.x,
  yAccessor: (d) => d.y,
};
export default LineViz01;
