import React from "react";
import PropTypes from "prop-types";
import { accessorPropsType } from "../../charts/utils/utils";
import LineViz01 from "../../charts/v12s/LineViz01/LineViz01";

const data = [
  {
    x: 0,
    y: 0,
  },
  {
    x: 3,
    y: 4,
  },
  {
    x: 6,
    y: 7,
  },
  {
    x: 8,
    y: 9,
  },
  {
    x: 12,
    y: 5,
  },
  {
    x: 23,
    y: 3,
  },
  {
    x: 30,
    y: 7,
  },
  {
    x: 36,
    y: 9,
  },
  {
    x: 39,
    y: 10,
  },
  {
    x: 40,
    y: 0,
  },
];

const TestProject = () => {
  return (
    <div className="testProject">
      <h1>Test Project</h1>
      <LineViz01
        data={data}
        xAccessor={(d) => d.x}
        yAccessor={(d) => d.y}
        label="A Line Chart"
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
