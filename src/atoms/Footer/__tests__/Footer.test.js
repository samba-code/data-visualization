import React from "react";
import { render } from "enzyme";

import Footer from "../Footer";

describe("Footer", () => {
  it("should match snapshot", () => {
    const wrapper = render(<Footer>Footer</Footer>);
    expect(wrapper).toMatchSnapshot();
  });
});
