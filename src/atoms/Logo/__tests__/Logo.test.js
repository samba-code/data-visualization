import React from "react";
import { render } from "enzyme";

import Logo from "../Logo";

describe("Logo", () => {
  it("should match snapshot", () => {
    const wrapper = render(<Logo />);
    expect(wrapper).toMatchSnapshot();
  });
});
