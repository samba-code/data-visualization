import React, { createContext, useContext } from "react";
import PropTypes from "prop-types";
import { dimensionsPropsType } from "../../utils/utils";

import "./chart.css";

const ChartContext = createContext();
export const useChartDimensions = () => useContext(ChartContext);

const ChartSize = ({ dimensions, children }) => (
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

ChartSize.propTypes = {
  dimensions: dimensionsPropsType,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

ChartSize.defaultProps = {
  dimensions: {},
};

export default ChartSize;
