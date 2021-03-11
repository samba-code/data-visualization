import React from "react";
import { render } from "enzyme";

import Heading2 from "../Heading2";

describe("Heading2", () => {
  it("should match snapshot", () => {
    const wrapper = render(<Heading2 />);
    expect(wrapper).toMatchSnapshot();
  });
});
