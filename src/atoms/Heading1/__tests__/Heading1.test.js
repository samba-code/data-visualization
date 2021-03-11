import React from "react";
import { render } from "enzyme";

import Heading1 from "../Heading1";

describe("Heading1", () => {
  it("should match snapshot", () => {
    const wrapper = render(<Heading1 />);
    expect(wrapper).toMatchSnapshot();
  });
});
