import React from "react";
import PropTypes from "prop-types";
import { accessorPropsType } from "../../charts/utils/utils";
import LineViz01 from "../../charts/v12s/LineViz01/LineViz01";
import { data } from "./testData.js";

const TestProject = () => {
  return (
    <div className="testProject">
      <h1>Test Project 5</h1>
      <LineViz01
        data={data}
        xAccessor={(d) => d.x}
        yAccessor={(d) => d.y}
        yLabel="A Line Chart"
        xLabel="Some values"
      />
    </div>
  );
};

TestProject.propTypes = {
  data: PropTypes.array,
  xAccessor: accessorPropsType,
  yAccessor: accessorPropsType,
  label: PropTypes.string,
};

TestProject.defaultProps = {
  xAccessor: (d) => d.x,
  yAccessor: (d) => d.y,
};

export default TestProject;
