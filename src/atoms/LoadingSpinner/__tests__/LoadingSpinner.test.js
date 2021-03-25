import React from "react";
import { render } from "enzyme";

import LoadingSpinner from "../LoadingSpinner";

describe("LoadingSpinner", () => {
  it("should match snapshot", () => {
    const wrapper = render(<LoadingSpinner />);
    expect(wrapper).toMatchSnapshot();
  });
});
