import React, { createContext, useContext } from "react";
import PropTypes from "prop-types";
import { dimensionsPropsType } from "../../utils/utils";

import "./chart.css";

const ChartContext = createContext();
export const useChartDimensions = () => useContext(ChartContext);

const ChartSizer = ({ dimensions, children }) => (
  <ChartContext.Provider value={dimensions}>
    <svg className="Chart" width={dimensions.width} height={dimensions.height}>
      <g
        transform={`translate(${dimensions.marginLeft}, ${dimensions.marginTop})`}
      >
        {children}
      </g>
    </svg>
  </ChartContext.Provider>
);

ChartSizer.propTypes = {
  dimensions: dimensionsPropsType,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

ChartSizer.defaultProps = {
  dimensions: {},
};

export default ChartSizer;
