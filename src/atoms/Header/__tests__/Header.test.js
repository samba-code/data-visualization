import React from "react";
import { render } from "enzyme";

import Header from "../Header";

describe("Header", () => {
  it("should match snapshot", () => {
    const wrapper = render(<Header />);
    expect(wrapper).toMatchSnapshot();
  });
});
