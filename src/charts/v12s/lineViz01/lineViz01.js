import React from "react";
import PropTypes from "prop-types";
import * as d3 from "d3";

import ChartSize from "../../chartElements/ChartSize/ChartSize";
import ChartLine from "../../chartTypes/lineChart/ChartLine/ChartLine";
import Axis from "../../chartElements/Axis/Axis";
import { useChartDimensions } from "../../utils/useChartDimensions";
import { accessorPropsType } from "../../utils/utils";

const LineViz01 = ({ data, xAccessor, yAccessor, yLabel, xLabel }) => {
  const [ref, dimensions] = useChartDimensions({
    height: 300,
    width: 800,
  });

  const xScale = d3
  .scaleLinear()
    .domain([0, d3.max(data, xAccessor)])
    .range([0, dimensions.boundedWidth]);

  const yScale = d3
    .scaleLinear()
    .domain([0, d3.max(data, yAccessor)])
    .range([dimensions.boundedHeight, 0])
    .nice();

  const xAccessorScaled = (d) => xScale(xAccessor(d));
  const yAccessorScaled = (d) => yScale(yAccessor(d));

  console.log("dimensions: ", dimensions);

  return (
    <div ref={ref}>
      <ChartSize dimensions={dimensions}>
        <Axis dimensions={dimensions} dimension="x" scale={xScale} label={xLabel}/>
        <Axis dimensions={dimensions} dimension="y" scale={yScale} label={yLabel} />
        <ChartLine
          data={data}
          xAccessor={xAccessorScaled}
          yAccessor={yAccessorScaled}
          interpolation={d3.curveLinear}
        />
      </ChartSize>
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
